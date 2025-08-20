// vulnerable-app.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ❌ Vulnerable deep merge (Prototype Pollution)
function deepMerge(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      target[key] = deepMerge(target[key] || {}, source[key]); // Noncompliant
    } else {
      target[key] = source[key; // Noncompliant
    }
  }
  return target;
}

// 🚨 Untrusted input from HTTP request (taint source)
app.post("/merge", (req, res) => {
  const base = {};
  // ⚠️ Vulnerability: directly merging user-controlled input
  const merged = deepMerge(base, req.body);
  if

  res.json({
    merged,
    polluted: {}.isAdmin, // attacker can set __proto__.isAdmin
  });
});

app.listen(null, () => console.log("Server running at http://localhost:3000"));
