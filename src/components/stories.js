const { h } = require('hyperapp')
const Container = require('./container')
const Items = require('./items')

const Stories = module.exports = ({ items, ids, type, page, actions, loading }) => (
  <Container loading={loading} actions={actions} type={type}>
    <Items
      loading={loading}
      page={page}
      type={type}
      actions={actions}
      ids={ids}
      items={items}
    />
  </Container>
)
