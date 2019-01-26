const testHook = (name: string) =>
  process.env.NODE_ENV !== 'production' ? { 'data-test': name } : {};
export default testHook;

export const selectorForTestHook = (name: string, element: string = '') =>
  `${element}[data-test="${name}"]`;
