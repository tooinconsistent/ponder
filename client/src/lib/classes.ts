export const classes = (
  ...classes: Array<string | null | undefined>
): string => {
  return classes.filter(Boolean).join(" ");
};
