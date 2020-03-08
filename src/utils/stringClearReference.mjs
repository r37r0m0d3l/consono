export default function stringClearReference(text) {
  return text.length < 12 ? text : (" " + text).slice(1);
}
