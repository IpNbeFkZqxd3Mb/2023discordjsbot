export const snakeToCamel = (s: string) => {
  return s.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
};
