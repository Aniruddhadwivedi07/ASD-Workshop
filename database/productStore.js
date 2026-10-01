const fs = require("fs/promises");
const path = require("path");

const filepath = path.join(__dirname, "..", "db.json");

async function readProducts() {
  const data = await fs.readFile(filepath, "utf8");
  return JSON.parse(data);
}

async function writeProducts(products) {
  await fs.writeFile(filepath, `${JSON.stringify(products, null, 2)}\n`);
}

module.exports = { readProducts, writeProducts };
