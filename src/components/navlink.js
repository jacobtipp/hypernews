import { h } from 'hyperapp';

export const NavLink = ({ loading, active, name, type, actions }) => {
  const onClick = e => {
    e.preventDefault();

    actions.fetchIds(name === 'jobs' ? 'job' : name);
    actions.router.go(`/${name}`);
  };

  return (
    <a href={`/${name}`} class={active && 'active'} onclick={onClick}>
      {`${name[0].toUpperCase()}${name.slice(1)}`}
    </a>
  );
};
