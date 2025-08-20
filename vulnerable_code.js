/**
 * @file vulnerable-deep-merge-test.js
 * @description A test case demonstrating the prototype pollution vulnerability
 * in the provided deepMerge function.
 */

// --------------------------------------------------------------------------------
// VULNERABLE FUNCTION
// --------------------------------------------------------------------------------
// This is the original function provided. It is unsafe due to the lack of
// a check to ensure that the iterated keys are direct properties of the
// source object.
function deepMerge(target, source) {
  // ❌ No validation of key (Prototype Pollution risk)
  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key]; // Noncompliant
    }
  }
  return target;
}

// --------------------------------------------------------------------------------
// TEST CASE
// --------------------------------------------------------------------------------

// Step 1 & 2: Set up the payload.
// We'll create a malicious object that uses the __proto__ key to
// inject a new property onto the global Object prototype.
const attackerPayload = JSON.parse('{"__proto__":{"polluted":"yes"}}');

// Step 3: Call the vulnerable function.
// The function will blindly copy the '__proto__' key and its value.
console.log("--- Starting Prototype Pollution Test ---");
console.log("Calling vulnerable deepMerge with a malicious payload...");

deepMerge({}, attackerPayload);

// Step 4: Check for the pollution.
// We will create a completely new, empty object and check for the 'polluted'
// property. If the prototype was successfully polluted, this new object
// will now inherit that property.
const newEmptyObject = {};

// Step 5: Log the outcome.
// The console.assert will fail if the test does not expose the vulnerability.
console.assert(
  newEmptyObject.polluted === "yes",
  "❌ FAILED: The prototype was not polluted as expected."
);

console.log("✅ PASSED: The prototype was successfully polluted.");
console.log(`- Check on a new object: {}.polluted is "${newEmptyObject.polluted}"`);
console.log("--- Test Complete ---");
