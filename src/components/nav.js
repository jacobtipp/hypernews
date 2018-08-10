import { h } from 'hyperapp';
import { NavLink } from './navlink';

const links = ['top', 'new', 'show', 'ask', 'jobs'];

export const Nav = ({ loading, actions, type }) =>
  <header>
    <nav class="centered">
      {links.map(story =>
        <NavLink
          type={type}
          name={story}
          actions={actions}
          loading={loading}
          active={`${type}s` === story || story === type}
        />
      )}
    </nav>
  </header>
