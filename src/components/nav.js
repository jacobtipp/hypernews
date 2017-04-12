const { h } = require('hyperapp')
const NavLink = require('./navlink')
const links = ['top', 'new', 'show', 'ask', 'jobs']

const Nav = module.exports = ({ actions, type }) => {
  return (  
    <header>
      <nav class='centered'>
        {links.map(story => (
          <NavLink 
            type={type}
            name={story}
            actions={actions}
            active={`${type}s` === story || story === type}
          />
          ))}
        </nav>
      </header>
  )
}
