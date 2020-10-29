export default function funcNameExtract(func) {
  if (func.name) {
    return func.name;
  }
  const result = /^function\s+([\w]+)\s*\(/.exec(func.toString());
  return result ? result[1] : "";
}
