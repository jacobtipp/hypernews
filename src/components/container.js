const { h } = require('hyperapp')
const Nav = require('./nav')
const classnames = require('classnames')

const Container = module.exports = ({ actions, type }, children) => (
  <div class='container'>
    <Nav 
      actions={actions} 
      type={type} />
    {children}
  </div>
)
