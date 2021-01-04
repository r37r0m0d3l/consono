import TAG from "../const/tag.js";
import prototypeName from "./prototypeName.js";

function looseClone(object) {
  if (object == null || typeof object !== "object") {
    return object;
  }
  const inExactInstance = new object.constructor();
  for (let key in object) {
    inExactInstance[key] = looseClone(object[key]);
  }
  return inExactInstance;
}

export default function objectDeCycle(object) {
  const objects = [];
  const paths = [];
  return (function deReCycle(value, path) {
    let index;
    let name;
    let newIterable;
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Boolean) &&
      !(value instanceof Date) &&
      !(value instanceof Number) &&
      !(value instanceof RegExp) &&
      !(value instanceof String)
    ) {
      for (index = 0; index < objects.length; index += 1) {
        if (objects[index] === value) {
          return { "&circularReference": paths[index] };
        }
      }
      objects.push(value);
      paths.push(path);
      if (prototypeName(value) === TAG.ARRAY) {
        newIterable = [];
        for (index = 0; index < value.length; index += 1) {
          newIterable[index] = deReCycle(value[index], `${path}["${index}"]`);
        }
      } else {
        if (Object.isFrozen(object)) {
          newIterable = looseClone(object);
        } else {
          newIterable = Object.create(object);
        }
        for (name in value) {
          if (Object.prototype.hasOwnProperty.call(value, name)) {
            newIterable[name] = deReCycle(value[name], `${path}[${JSON.stringify(name)}]`);
          }
        }
      }
      return newIterable;
    }
    return value;
  })(object, "&");
}
