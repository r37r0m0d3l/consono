export default function objectClass(value) {
  if (value && "constructor" in value && "name" in value.constructor) {
    return value.constructor.name;
  }
  return "";
}
