const { h } = require('hyperapp')
const classnames = require('classnames')
const Container = require('../components/container')

const itemView = module.exports = (model, actions) => {
  const id = model.router.params.id
  const item = model.items[id]
  const { loading } = model

  const onCreate = e => {
    actions.fetchItemAndComments(id)
  }

  const Comment = ({ item }) => (
    <div>
      <p>{item.type === 'comment' && item.text}</p>
      <br />
      {item.kids && item.kids.map(id => model.items[id] && <Comment item={model.items[id]} />)}
    </div>
  )

  const Header = ({ item, loading }) => (
    <div>
      <Comment item={item} />
    </div>
  )

  return (
    <Container actions={actions} type={null} loading={model.loading}>
      <div class='item' onCreate={onCreate}>
        {!loading && item && <Header item={item} loading={loading} />}
        {loading && <div class={classnames({ loading })} />}
      </div>
    </Container>
  )
}
