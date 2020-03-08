export default function objectPick(object, keys) {
  if (!keys.length || !Object.keys(object).length) {
    return {};
  }
  return keys.reduce((accumulator, key) => {
    accumulator[key] = object[key];
    return accumulator;
  }, {});
}
