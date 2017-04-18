const { h } = require('hyperapp')
const NavLink = require('./navlink')
const links = ['top', 'new', 'show', 'ask', 'jobs']

const Nav = module.exports = ({ loading, actions, type }) => {
  return (  
    <header>
      <nav class='centered'>
        {links.map(story => (
          <NavLink 
            type={type}
            name={story}
            actions={actions}
            loading={loading}
            active={`${type}s` === story || story === type}
          />
          ))}
        </nav>
      </header>
  )
}
