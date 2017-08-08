import { h } from 'hyperapp';
import { Nav } from './nav';
import classnames from 'classnames';

export const Container = ({ loading, actions, type }, children) => (
  <div class='container'>
    <Nav 
      loading={ loading } 
      actions={ actions } 
      type={ type }
    />
    { children }
  </div>
);
