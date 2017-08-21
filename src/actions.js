import { database } from './database';

const ttl = 1000 * 60 * 15;

export const actions = {
  toggleLoading: (state) => ({
    loading: !state.loading
  }),

  toggleCollapse: ({ collapsed }, _, id) => {
    collapsed[id] = !collapsed[id];
    return { collapsed };
  },

  cacheIds: ({ ids }, _, { cacheIds, type } ) => {
    ids[type] = cacheIds;
    return { ids };
  },

  cacheItem: ({ items }, _, item) => {
    items[item.id] = item;
    return { items };
  },

  fetchItems: (state, actions, ids) => {
    const items = ids.map(actions.fetchItem);

    return Promise.all(items)
      .then(items => {
        return items.reduce((a, b) => {
          if (b) {
            a[b.id] = b;
          }
          return a;
        }, {})
      })
  },

  fetchItem: (state, actions, id) => new Promise(resolve => {
    const item = state.items[id];

    if (item && item._timestamp + ttl > Date.now()) {
      resolve(item);
    } else {
      database.child(`item/${id}`).once('value', snapshot => {
        const item = snapshot.val();

        if (item) {
          item._timestamp = Date.now();
          actions.cacheItem(item);
        }
        resolve(item);
      })
    }
  }),

  fetchStory: (state, actions, type) => new Promise(resolve => {
    database.child(`${type}stories`).once('value', snapshot => {
      const ids = snapshot.val();

      actions.fetchItems(ids)
        .then(items => {
          actions.cacheIds({ type, cacheIds: ids.filter(id => items[id]) });
          resolve();
        });
    })
  }),

  fetchComments: (state, actions, item) => {
    if (item && item.kids) {
      return actions.fetchItems(item.kids)
        .then(items => Promise.all(item.kids.map(id => {
          return actions.fetchComments(items[id]);
        })));

    }
  },

  fetchIds: ({ ids, loading }, actions, type) => {
    actions.toggleLoading();
    return actions.fetchStory(type)
      .catch(console.error)
      .then(actions.toggleLoading);
  },

  fetchItemAndComments: ({ loading }, actions, id) => {
    actions.toggleLoading();
    return actions.fetchItem(id)
      .then(actions.fetchComments)
      .catch(console.error)
      .then(actions.toggleLoading);
  },

  popstate: (state, actions) => {
    const re = /new|job|ask|show|top|item/;
    const path = location.pathname;
    const match = path.match(re);

    if (!match && !state.ids['top'].length) {
      actions.fetchIds('top');
      return;
    }

    if (match) {
      let type = match[0];

      if (type === 'item') {
        return;
      }

      if (!state.ids[type].length) {
        actions.fetchIds(type);
      }
    }
  }
};
