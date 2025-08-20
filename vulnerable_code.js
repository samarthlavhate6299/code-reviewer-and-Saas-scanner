function deepMerge(target, source) {
  for (const k in source) {
    if (typeof source[k] === 'object' && source[k] !== null) {
      target[k] = deepMerge(target[k] || {}, source[k]);
    } else {
      target[k] = source[k]; // __proto__ can poison objects
    }
  }
  return target;
}

// Dummy objects
const obj1 = {
  name: "Samarth",
  details: {
    age: 25,
    city: "Pune"
  }
};

const obj2 = {
  details: {
    city: "Mumbai",   // overwrite
    country: "India"  // new key
  },
  hobbies: ["coding", "cricket"]
};

// Merge
const merged = deepMerge(obj1, obj2);

console.log("Merged object:", merged);
