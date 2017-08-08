import { h } from 'hyperapp';
import { Stories } from '../components/stories';

export const listView = (type) => (model, actions) => (
  <Stories
    loading={ model.loading }
    actions={ actions }
    page={ +model.router.params.page || 1 }
    type={ type }
    ids={ model.ids[type] }
    items={ model.items }
  />
);
