function deepMerge(target, source) {
  for (const key in source) {
    // ❌ No validation of key (Prototype Pollution risk)
    if (typeof source[key] === "object" && source[key] !== null) {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key]; // Noncompliant
    }
  }
  return target;
}

// Example usage
const obj1 = {};
const obj2 = JSON.parse('{"__proto__":{"polluted":"yes"}}'); // ⚠️ Attacker payload

deepMerge(obj1, obj2);

console.log("Polluted?", {}.polluted); // → "yes"
