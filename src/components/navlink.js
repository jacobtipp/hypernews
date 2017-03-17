const { h } = require('hyperapp')

const navLink = module.exports = ({ loading, actions, active, name }) => {
  const parsedName = `${name[0].toLowerCase()}${name.slice(1)}`
  return (
    <a 
      class={active && 'active'}
      href={`/${parsedName}`}
      onclick={e => {
        e.preventDefault()

        if (loading) {
          return false
        }

        actions.router.go(`/${parsedName}/1`)
        window.scrollTo(0, 0)
      }}
    >{`${name[0].toUpperCase()}${name.slice(1)}`}
    </a>
  )
}
