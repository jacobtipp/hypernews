const { h } = require('hyperapp')

const navLink = module.exports = ({ loading, active, name, type, actions }) => {
  const onClick = e => {
    e.preventDefault()

    if (loading) {
      return
    }

    actions.router.go(`/${name}`)

    if (name === 'jobs') {
      name = 'job'
    }

    actions.fetchIds(name)
    window.scrollTo(0, 0)
  }

  return (
    <a 
      href={`/${name}`}
      class={active && 'active'}
      onclick={onClick}
    >{`${name[0].toUpperCase()}${name.slice(1)}`}
    </a>
  )
}
