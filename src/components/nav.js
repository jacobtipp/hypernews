const { h } = require('hyperapp')
const NavLink = require('./navLink')
const links = ['top', 'new', 'show', 'ask', 'jobs']

const Nav = module.exports = ({ actions, type }) => {
  return (  
    <header>
      <nav class='centered'>
        {links.map(story => (
          <NavLink 
            actions={actions} 
            name={story} 
            active={type === story || `${type}s` === story} />
          ))}
        </nav>
      </header>
  )
}
