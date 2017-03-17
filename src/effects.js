const database = require('./database')

const cache = require('lscache')

const cacheStory = (story) => new Promise(resolve => {
  database.child(story).once('value', snapshot => {
    const val = snapshot.val()
    cache.set(story, val, 1)
    return resolve(val)
  })
})

const fetch = (model, actions, { _type, page }) => {
  fetchStoryIds(_type)
    .then(story => {
      const min = page * 30
      const max = (page * 30) + 30
      const ids = story.slice(min, max)

      if (!ids.length) {
        let path = location.pathname
        let newPath = path.slice(0, path.lastIndexOf('/') + 1)
        return actions.setLocation(newPath)
      }

      return Promise.all(ids.map(id => fetchItem(id)))
        .then(items => actions.updateItems(items))
    })
}




const fetchStoryIds = _type => new Promise(resolve => {
  const name = `${_type}stories`
  const top = cache.get(name)

  if (top) {
    return resolve(top)
  } else {
    return resolve(cacheStory(name))
  }
})

const fetchItem = (id) => {
  const cached = cache.get(id)
  return new Promise(resolve => {
    if (cached) {
      return resolve(cached)
    } else {
      database.child(`item/${id}`).once('value', snapshot => {
        cache.set(`${id}`, snapshot.val(), 1)
        return resolve(snapshot.val())
      })
    }
  })
}

const effects = module.exports = {
  fetch
}
