const { h } = require('hyperapp')
const classnames = require('classnames')

const itemView = module.exports = (model, actions) => {
  const item = model.items[model.router.params.id]

  const Comment = ({ item }) => (
    <div>
      <p>{item.type === 'comment' && item.text}</p>
      <br />
      {item.kids && item.kids.map(id => <Comment item={model.items[id]} />)}
    </div>
  )

  return (
    <div>
      {!model.loading && <Comment item={item} />}
      {model.loading && <div class={classnames({ loading: model.loading })} />}
    </div>
  )
}
