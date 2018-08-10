import { h } from 'hyperapp';
import classnames from 'classnames';
import { Container } from '../components/container';

export const itemView = (state, actions) => {
  const id = state.router.params.id;
  const item = state.items[id];
  const { loading } = state;

  const onCreate = e => {
    actions.fetchItemAndComments(id);
  };

  const Comment = ({ item, collapsed }) =>
    <div class="comment">
      <span class="min">
        <a onclick={() => actions.toggleCollapse(item.id)}>
          {collapsed ? `[+${(item.kids && item.kids.length) || ''}]` : '[-]'}
        </a>
      </span>
      <span class="by">
        by: {item.by}
      </span>
      <br />
      <div class={classnames('child-comments', { hide: collapsed })}>
        <span class="text" oncreate={e => (e.innerHTML = item.text)} />
        {item.kids &&
          item.kids.map(id => {
            const item = state.items[id];
            return (
              item &&
              !item.deleted &&
              <Comment collapsed={!!state.collapsed[item.id]} item={item} />
            );
          })}
      </div>
    </div>

  const Title = ({ item, loading }) =>
    <section>
      <div class="title">
        <span class="url">
          <a href={item.url || `/item/${item.id}`}>
            {item.title}
          </a>
        </span>
        <br />
        <span class="score">
          score: {item.score}
        </span>
        <span class="by">
          by: {item.by}
        </span>
      </div>
      <div class={classnames('comments', { hide: loading })}>
        {item.kids &&
          item.kids.map(id => {
            const item = state.items[id];
            return (
              item &&
              !item.deleted &&
              <Comment collapsed={!!state.collapsed[item.id]} item={item} />
            );
          })}
      </div>
      {loading && <div class={classnames({ loading })} />}
    </section>;

  return (
    <Container actions={actions} type={null} loading={state.loading}>
      <section class="item centered" oncreate={e => onCreate(e)}>
        {item && <Title item={item} loading={loading} />}
      </section>
    </Container>
  );
};
