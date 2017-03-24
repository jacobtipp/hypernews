const { h } = require('hyperapp')
const classnames = require('classnames')

const itemView = module.exports = (model, actions) => {
  const id = model.router.params.id
  const item = model.items[id]
  const { loading } = model

  const Comment = ({ item }) => (
    <div>
        <p>{item.type === 'comment' && item.text}</p>
        <br />
        {item.kids && item.kids.map(id => <Comment item={model.items[id]} />)}
    </div>
  )

  const Header = ({ item, loading }) => (
    <div>
      {!loading && item && <Comment item={item} />}
    </div>
  )

  return (
    <div onCreate={() => actions.fetchItemAndComments(id) }>
      {!loading && item && <Header item={item} loading={loading} />}
      {loading && <div class={classnames({ loading: loading })} />}
    </div>
  )
}
