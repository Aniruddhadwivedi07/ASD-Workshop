const express = require("express");
const { readProducts } = require("./database/productStore");
const app = express();
const port = 3000;

app.get("/products", async (req, res) => {
  let key = req.url;
  let value = cache[key];
  try {
    if (value) {
      return res.json(value);
    }

    let products = await readProducts();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    let id = Number(req.params.id);
    let products = await readProducts();
    let data = products.find((item) => item.id === id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("Server running...");
});
