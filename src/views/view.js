import { h } from 'hyperapp';
import { listView } from './listView';
import { itemView } from './itemView';

const matchAll = () => {
  return '404';
}

export const view = [
  ['/', listView('top')],
  ['/top', listView('top')],
  ['/top/:page', listView('top')],
  ['/new', listView('new')],
  ['/new/:page', listView('new')],
  ['/show', listView('show')],
  ['/show/:page', listView('show')],
  ['/ask', listView('ask')],
  ['/ask/:page', listView('ask')],
  ['/jobs', listView('job')],
  ['/jobs/:page', listView('job')],
  ['/item/:id', itemView],
  ['*', matchAll]
];
