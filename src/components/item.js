import { h } from 'hyperapp';

export const Item = ({ actions, page, item, index }) => {
  index = ((page * 30) - 30) + (++index);

  const onClick = e => {
    e.preventDefault();

    actions.router.go(`/item/${item.id}`);
    window.scrollTo(0, 0);
  }

  return (
    <li>
      <span class='index'>
        { index }
      </span>
      <span class='url'>
        <a
          href={ item.url || `/item/${ item.id }` }
        >
          { item.title }
        </a>
      </span>
      <br />
      <span class='score'>
        { `score: ${item.score}` }
      </span>
      <span class='by'>
        by: { item.by }
      </span>
      <span class='comment-link'>
        <a
          href={ `/item/${item.id}` }
          onclick={ onClick }
        >{ item.hasOwnProperty('descendants') && `comments: ${ item.descendants }`}
        </a>
      </span>
    </li>
  );
};
