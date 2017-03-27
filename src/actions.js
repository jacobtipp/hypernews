const database = require('./database')
const ttl = 1000 * 60 * 15

const reducers = module.exports = {
  toggleLoading: (model) => ({
    loading: !model.loading
  }),

  cacheIds: (model, { ids, type } ) => ({
    ids: Object.assign({}, model.ids, { [type]: ids })
  }),

  cacheItems: (model, items) => ({
    items: Object.assign({}, model.items, items)
  }),

  fetchItems: (model, ids, actions) => {
    const items = ids.map(actions.fetchItem)

    return Promise.all(items)
      .then(items => {
        return items.reduce((a, b) => {
          if (b) {
            a[b.id] = b
          }
          return a
        }, {})
      })
  },

  fetchItem: (model, id, actions) => new Promise(resolve => {
    const item = model.items[id]

    if (item && item._timestamp + ttl > Date.now()) {
      resolve(item)
    } else {
      database.child(`item/${id}`).once('value', snapshot => {
        const item = snapshot.val()

        if (item) {
          item._timestamp = Date.now()
          actions.cacheItems({ [item.id]: item })
        }
        resolve(item)
      })
    }
  }),

  fetchStory: (model, type, actions) => new Promise(resolve => {
    database.child(`${type}stories`).once('value', snapshot => {
      const ids = snapshot.val()

      actions.fetchItems(ids)
        .then(items => {
          actions.cacheIds({ type, ids: ids.filter(id => items[id]) })
          resolve()
        })
    })
  }),

  fetchComments: (model, item, actions) => {
    if (item.kids) {
      return actions.fetchItems(item.kids)
        .then(items => Promise.all(item.kids.map(id => {
          return actions.fetchComments(items[id])
        })))

    }
  },

  fetchIds: ({ ids, loading }, type, actions) => {
    actions.toggleLoading()
    actions.fetchStory(type)
      .then(actions.toggleLoading)
  },

  fetchItemAndComments: ({ loading }, id, actions) => {
    actions.toggleLoading() 
    actions.fetchItem(id)
      .then(actions.fetchComments)
      .then(actions.toggleLoading)
  },

  popstate: (model, _, actions) => {
    const re = /new|job|ask|show|top/
    const path = location.pathname
    const match = path.match(re)

    if (!match) {
      actions.fetchIds('top')
      return
    }

    if (match) {
      actions.fetchIds(match[0])
    }
  }
}
