const { h } = require('hyperapp')
const Item = require('./item')
const More = require('./more')
const classnames = require('classnames')

const Items = module.exports = ({ items, ids, actions, type, page, loading }) => {
  const limit = 30
  const max = page * limit
  const min = max - limit
  const sliced = ids.slice(min, max)

  return (
    <main 
      onCreate={() => actions.fetchIds(type)}
      class='centered'>
      <div class={classnames({ hide: loading })}>
        <ul>
          {sliced.map((id, i)=> (
            <Item
              index={i}
              item={items[id]}
              page={page}
              actions={actions}
            />
            ))}
          </ul>
          </div>
          {(!loading && sliced.length === limit) && 
            <More 
              page={page} 
              actions={actions} 
              type={type}
            />}
            {<div class={classnames({ loading })}></div>}
        </main>
  )
}
