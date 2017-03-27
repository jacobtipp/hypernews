const { h } = require('hyperapp')

const navLink = module.exports = ({ loading, active, name, type, actions }) => {
  const onClick = e => {
    e.preventDefault()

    actions.router.go(`/${name}`)
    actions.fetchIds(name === 'jobs' ? 'job' : name)
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
