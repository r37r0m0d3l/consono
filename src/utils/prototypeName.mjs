/**
 * @param {*} value
 * @returns {string}
 */
export default function prototypeName(value) {
  return Object.prototype.toString.call(value);
}
