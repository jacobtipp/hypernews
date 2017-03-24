const subscriptions = module.exports = [
  (model, actions) => {
    window.addEventListener('popstate', e => {
      const re = /new|job|ask|show|top|item/
      const match = window.location.pathname.match(re)

      if (!match) {
        actions.fetchIds('top')
        return
      }

      if (match[0] === 'item') {
        actions.fetchItemAndComments(model.router.params.id)
      } else {
        actions.fetchIds(match[0])
      }
    })
  }
]
