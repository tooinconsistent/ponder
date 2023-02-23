export const classes = (
  ...classes: Array<string | null | undefined | boolean>
): string => {
  return classes.filter(Boolean).join(" ");
};
