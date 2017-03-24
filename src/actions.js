const database = require('./database')

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
    database.child(`item/${id}`).once('value', snapshot => {
      const item = snapshot.val()

      if (item) {
        actions.cacheItems({ [item.id]: item })
      }
      resolve(item)
    })
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
    if (loading) {
      return 
    }

    actions.toggleLoading()
    actions.fetchStory(type)
      .then(actions.toggleLoading)
  },

  fetchItemAndComments: ({ loading }, id, actions) => {
    actions.toggleLoading() 
    actions.fetchItem(id)
      .then(actions.fetchComments)
      .then(actions.toggleLoading)
  }
}
