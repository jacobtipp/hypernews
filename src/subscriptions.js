const subscriptions = module.exports = [
  (model, actions) => {
    window.addEventListener('popstate', e => {
      actions.popstate()
    })
  }
]
