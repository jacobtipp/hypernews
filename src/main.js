const { h, app, Router } = require('hyperapp')
const subscriptions = require('./subscriptions')
const actions = require('./actions')
const view = require('./views')
console.log('test')

app({
  model: {
    loading: false,
    items: {
      top: [],
      new: [],
      show: [],
      ask: [],
      job: []
    }
  },
  Router,
  view,
  plugins: [Router],
  actions: actions,
  subscriptions
})
