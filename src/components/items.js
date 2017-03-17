const { h } = require('hyperapp')
const Item = require('./item')
const More = require('./more')
const classnames = require('classnames')

const Items = module.exports = ({ actions, type, page, items, loading }) => {
  const limit = 30
  const max = page * limit
  const min = max - limit
  const sliced = items.slice(min, max)

  return (
    <main
      class='centered'>
      <div class={classnames({ hide: loading })}>
        <ul>
          {sliced.map((item, i)=> (
            <Item
              index={i}
              item={item}
              page={page}
            />
            ))}
          </ul>
          </div>
          {(sliced.length === limit) && 
            <More 
              page={page} 
              actions={actions} 
              type={type}
            />}
          <div class={classnames({ loading })}></div>
        </main>
  )
}
