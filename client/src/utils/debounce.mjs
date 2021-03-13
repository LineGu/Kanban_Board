export const debounce = (elem, func, event) => {
  elem.addEventListener(event, () => {
    const timer = setTimeout(func, 500);
    elem.addEventListener(event, () => {
      clearTimeout(timer);
    });
  });
};
