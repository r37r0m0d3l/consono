import prototypeName from "./prototypeName.mjs";

export default function objectType(value) {
  const type = prototypeName(value)
    .toLowerCase()
    .split("[object ")
    .pop()
    .split("]")
    .shift();
  if (["global", "window"].includes(type)) {
    return "object";
  }
  if (type.includes("error")) {
    return "error";
  }
  return type;
}
