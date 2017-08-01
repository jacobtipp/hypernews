import { h, app, Router } from 'hyperapp';
import { subscriptions } from './subscriptions';
import { actions } from './actions';
import { view } from './views/view';

app({
  model: {
    loading: false,
    items: {},
    collapsed: {},
    ids: {
      top: [],
      new: [],
      show: [],
      ask: [],
      job: []
    }
  },
  Router,
  view,
  plugins: [Router],
  actions: actions,
  subscriptions
})
