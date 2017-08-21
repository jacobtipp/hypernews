import { h, app } from 'hyperapp';
import { Router } from '@hyperapp/router';
import { subscriptions } from './subscriptions';
import { actions } from './actions';
import { view } from './views/view';

app({
  state: {
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
  view: view,
  mixins: [Router],
  actions: actions,
  events: {
    load(state, actions) {
      window.addEventListener('popstate', e => {
        actions.popstate()
      });
      actions.popstate();
    },
    resolve(state, actions, result) {
      if (result && typeof result.then === 'function') {
        return update => result.then(update) && result;
      }
    }
  }
});
