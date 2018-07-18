import { h } from 'hyperapp';
import { Stories } from '../components/stories';

export const listView = type => (state, actions) =>
  <Stories
    loading={state.loading}
    actions={actions}
    page={+state.router.params.page || 1}
    type={type}
    ids={state.ids[type]}
    items={state.items}
  />
