const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ❌ Vulnerable deep merge (Prototype Pollution)
function deepMerge(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      target[key] = deepMerge(target[key] || {}, source[key]); // Noncompliant (S5693)
    } else {
      target[key] = source[key]; // Noncompliant (S5693)
    }
  }
  return target;
}

// 🚨 Untrusted user input from request body
app.post("/merge", (req, res) => {
  const base = {};
  const merged = deepMerge(base, req.body); // Vulnerability
  res.json({ merged, polluted: {}.isAdmin });
});

app.listen(3000, () => console.log("Server running on 3000"));
