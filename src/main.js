const { h, app, Router } = require('hyperapp')
const subscriptions = require('./subscriptions')
const actions = require('./actions')
const view = require('./views')

app({
  model: {
    loading: false,
    items: {},
    ids: {
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
