import { h } from 'hyperapp';
import { Container } from './container';
import { Items } from './items';

export const Stories = ({ items, ids, type, page, actions, loading }) => (
  <Container loading={ loading } actions={ actions } type={ type }>
    <Items
      loading={ loading }
      page={ page }
      type={ type }
      actions={ actions }
      ids={ ids }
      items={ items }
    />
  </Container>
);
