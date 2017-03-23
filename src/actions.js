const database = require('./database')

const reducers = module.exports = {
  toggleLoading: (model) => ({
    loading: !model.loading
  }),

  updateIds: (model, { ids, type } ) => ({
    ids: Object.assign({}, model.ids, { [type]: ids })
  }),

  updateItems: (model, items) => ({
    items: Object.assign({}, model.items, items)
  }),

  fetchItems: (model, ids, actions) => {
    const items = ids.map(actions.fetchItem)

    return Promise.all(items)
      .then(items => {
        items = items.reduce((a, b) => {
          if (b) {
            a[b.id] = b
          }
          return a
        }, {})
        return items
      })
  },

  fetchItem: (model, id) => new Promise(resolve => {
    database.child(`item/${id}`).once('value', snapshot => {
      resolve(snapshot.val())
    })
  }),

  fetchStory: (model, type, actions) => new Promise(resolve => {
    database.child(`${type}stories`).once('value', snapshot => {
      const ids = snapshot.val()

      actions.fetchItems(ids)
        .then(items => {
          actions.updateItems(items)
          actions.updateIds({ type, ids: ids.filter(id => items[id]) })
          resolve()
        })
    })
  }),

  fetchComments: (model, item, actions) => {
    if (item.kids) {
      return actions.fetchItems(item.kids)
        .then(items => {
          actions.updateItems(items)
          return items
        })
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
  }
}
