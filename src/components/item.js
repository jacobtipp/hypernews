const { h } = require('hyperapp')

const Item = module.exports = ({ actions, page, item, index }) => {
  index = ((page * 30) - 30) + (++index)

  const onClick = e => {
    e.preventDefault()

    actions.router.go(`/item/${item.id}`)
  }

  return (
    <li>
      <span className='index'>
        {index}
      </span>
      <span className='url'>
        <a
          href={item.url || `/item/${item.id}`}
        >
          {item.title}
        </a>
      </span>
      <br />
      <span className='score'>
        {`score: ${item.score}`}
      </span>
      <span className='by'>
        by: {item.by}
      </span>
      <span className='comment-link'>
        <a
          href={`/item/${item.id}`}
          onclick={onClick}
        >{item.hasOwnProperty('descendants') && `comments: ${item.descendants}`}
        </a>
      </span>
    </li>
  )
}
