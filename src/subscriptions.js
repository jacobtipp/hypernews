export const subscriptions = [
  (model, actions) => {
    window.addEventListener('popstate', e => {
      actions.popstate()
    })
  }
];
