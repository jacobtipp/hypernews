import { h } from 'hyperapp';
import { Item } from './item';
import { More } from './more';
import classnames from 'classnames';

export const Items = ({ items, ids, actions, type, page, loading }) => {
  const limit = 30;
  const max = page * limit;
  const min = max - limit;
  const sliced = ids.slice(min, max);

  const onCreate = e => {
    if (!ids.length && !loading) {
      actions.fetchIds(type);
    }
  };

  return (
    <main oncreate={onCreate} class="centered">
      <div class={classnames({ hide: loading })}>
        <ul>
          {sliced.map((id, i) =>
            <Item index={i} item={items[id]} page={page} actions={actions} />
          )}
        </ul>
      </div>
      {!loading &&
        sliced.length === limit &&
        <More page={page} actions={actions} type={type} />}

      {loading && <div class={classnames({ loading })} />}
    </main>
  );
};
