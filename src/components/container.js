const { h } = require('hyperapp')
const Nav = require('./nav')
const classnames = require('classnames')

const Container = module.exports = ({ loading, actions, type }, children) => (
  <div class='container'>
    <Nav 
      loading={loading} 
      actions={actions} 
      type={type} />
    {children}
  </div>
)
