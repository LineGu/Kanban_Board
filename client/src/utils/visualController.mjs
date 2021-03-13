export const visualController = {
  show(elem) {
    elem.classList.remove('hidden');
  },

  hide(elem) {
    elem.classList.add('hidden');
  },

  go(path) {
    window.location.href = path;
  },
};
