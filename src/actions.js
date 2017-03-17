const database = require('./database')

const reducers = module.exports = {
  toggleLoading: (model) => ({
    loading: !model.loading
  }),

  updateItems: (model, { type, items }) => ({
    items: Object.assign({}, model.items, { [type]: items })
  }),

  fetchItems: (model, { type, ids }, actions) => {
    const items = ids.map(actions.fetchItem)

    return Promise.all(items)
      .then(items => {
        items = items.filter(item => !!item)
        return { type, items }
      })
  },

  fetchItem: (model, id) => new Promise(resolve => {
    database.child(`item/${id}`).once('value', snapshot => {
      resolve(snapshot.val())
    })
  }),

  fetchStory: (model, type) => new Promise(resolve => {
    database.child(`${type}stories`).once('value', snapshot => {
      const ids = snapshot.val()
      resolve({ type, ids })
    })
  }),

  fetchStories: (model, type, actions) => {
    return actions.fetchStory(type)
      .then(actions.fetchItems)
  },

  subscribeStories: (model, _, actions) => {
    const stories = ['top', 'new', 'show', 'ask', 'job']

    actions.toggleLoading()
    Promise.all(stories.map(actions.fetchStories))
      .then(items => {
        items.forEach(item => {
          actions.updateItems(item)
        })
        actions.toggleLoading()
      })
  }
}
