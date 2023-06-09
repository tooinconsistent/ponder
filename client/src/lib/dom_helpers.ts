export const isChildInView = (
  child: Element,
  parent: Element | null
): boolean => {
  const childBounding = child.getBoundingClientRect();
  const parentBounding = parent ? parent.getBoundingClientRect() : null;

  if (parentBounding) {
    return (
      childBounding.top >= parentBounding.top &&
      childBounding.left >= parentBounding.left &&
      childBounding.bottom <= parentBounding.bottom &&
      childBounding.right <= parentBounding.right
    );
  }
  return (
    childBounding.top >= 0 &&
    childBounding.left >= 0 &&
    childBounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    childBounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};
