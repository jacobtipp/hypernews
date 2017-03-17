const { h } = require('hyperapp')
const Container = require('./container')
const Items = require('./items')

const Stories = module.exports = ({ type, page, actions, loading, items }) => (
  <Container loading={loading} actions={actions} type={type}>
    <Items
      loading={loading}
      items={items}
      page={page}
      type={type}
      actions={actions}
    />
  </Container>
)
