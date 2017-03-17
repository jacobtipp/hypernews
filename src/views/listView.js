const { h } = require('hyperapp')
const Stories = require('../components/stories')

const listView = module.exports = (type) => (model, actions) => {
  return (
    <Stories
      loading={model.loading}
      items={model.items[type]}
      actions={actions}
      page={+model.router.params.page || 1}
      type={type}
    />
  )
}
