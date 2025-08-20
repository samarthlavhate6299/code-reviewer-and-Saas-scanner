
const { exec } = require("child_process");
const express = require("express");
const app = express();

app.get("/run", (req, res) => {
  // ❌ Security Hotspot: use of eval()
  eval("console.log('Eval is dangerous')");

  // ❌ Security Hotspot: use of Function constructor
  const fn = new Function("a", "b", "return a + b;");
  console.log(fn(2, 3));

  // ❌ Security Hotspot: command injection risk with child_process.exec
  const userInput = req.query.cmd;
  exec(userInput, (err, stdout) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.send(`Output: ${stdout}`);
    }
  });
});

// ❌ Hardcoded credentials (will be flagged)
const dbPassword = "SuperSecret123!";

app.listen(3000, () => console.log("App running on 3000"));
