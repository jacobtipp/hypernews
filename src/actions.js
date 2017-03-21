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

  fetchItems: (model, { type, ids }, actions) => {
    const items = ids.map(actions.fetchItem)

    return Promise.all(items)
      .then(items => {
        items = items.reduce((a, b) => {
          if (b) {
            a[b.id] = b
          }
          return a
        }, {})
        ids = ids.filter(id => items[id])
        return { type, items, ids }
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
      resolve({ type, ids })
    })
  }),

  fetchIds: ({ ids, loading }, type, actions) => {
    if (loading) {
      return 
    }

    actions.toggleLoading()
    actions.fetchStory(type)
      .then(actions.fetchItems)
      .then(({ items, type, ids }) => {
        actions.updateItems(items)
        actions.updateIds({ type, ids })
        actions.toggleLoading()
      })
  }
}
