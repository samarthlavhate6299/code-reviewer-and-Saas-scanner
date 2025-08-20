function deepMerge(target, source) {
  for (const k in source) {
    if (typeof source[k] === 'object' && source[k] !== null) {
      target[k] = deepMerge(target[k] || {}, source[k]);
    } else {
      target[k] = source[k]; 
    }
  }
  return target;
}
const obj1 = {
  name: "Samarth",
  details: {
    age: 25,
    city: "Pune"
  }
};
const obj2 = {
  details: {
    city: "Mumbai",
    country: "India"
  },
  hobbies: ["coding", "cricket"],
  __proto__: { isAdmin: true }
};
const merged = deepMerge(obj1, obj2);
console.log("Merged object:", merged);
console.log("Merged object:", merged);
console.log("Polluted?", {}.isAdmin);
console.log("Polluted?", {}.isAdmin);
console.log("Polluted?", {}.isAdmin);
console.log("Polluted?", {}.isAdmin);
