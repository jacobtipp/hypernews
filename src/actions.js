const database = require('./database')

const reducers = module.exports = {
  toggleLoading: (model) => ({
    loading: !model.loading
  }),

  updateIdsandItems: (model, { type, items, ids }) => ({
    ids: Object.assign({}, model.ids, { [type]: ids }),
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
    if (loading || ids[type].length) {
      return 
    }

    actions.toggleLoading()
    actions.fetchStory(type)
      .then(actions.fetchItems)
      .then(_ => {
        actions.updateIdsandItems(_)
        actions.toggleLoading()
      })
  }
}
