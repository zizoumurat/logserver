// server.js
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

const LOG_FILE = "tokens.log";

// Daha önce kaydedilen t değerlerini oku
let tokens = new Set();
if (fs.existsSync(LOG_FILE)) {
  const lines = fs.readFileSync(LOG_FILE, "utf-8").split("\n").filter(Boolean);
  lines.forEach(line => tokens.add(line));
}

app.get("/", (req, res) => {
  const t = req.query.t;

  if (!t) {
    return res.status(400).send("t parametresi gerekli");
  }

  if (tokens.has(t)) {
    return res.send("Bu token daha önce loglanmış");
  }

  tokens.add(t);
  fs.appendFileSync(LOG_FILE, t + "\n");

  res.send(`Yeni token loglandı: ${t}`);
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor http://localhost:${PORT}`);
});
