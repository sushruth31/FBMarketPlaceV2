export default function deepCopy(obj) {
  let target = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    let value = obj[key];
    if (value && typeof value === "object") {
      target[key] = deepCopy(obj[key]);
    } else {
      target[key] = value;
    }
  }

  return target;
}
