const { h } = require('hyperapp')

const More = module.exports = ({ page, actions, type }) => {
  const url = `/${type}/${page + 1}`

  return (
    <span className='more'>
      <a
        href={url}
        onclick={e => {
          e.preventDefault()
          actions.router.go(url)
          window.scrollTo(0, 0)
        }}
      >
        more
      </a>
    </span>
  )
}

