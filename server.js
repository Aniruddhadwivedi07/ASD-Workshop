const express = require("express");
const productRoutes = require("./routes/productRoutes");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/products", productRoutes);

app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

app.use((error, req, res, next) => {
  const requestedStatus = Number(error.status || error.statusCode);
  const statusCode =
    Number.isInteger(requestedStatus) &&
    requestedStatus >= 400 &&
    requestedStatus < 500
      ? requestedStatus
      : 500;
  const message = statusCode < 500 ? error.message : "Internal server error";

  return res.status(statusCode).json({ error: message });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log("Server running...");
  });
}

module.exports = app;
