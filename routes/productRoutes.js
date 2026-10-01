const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.listProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.replaceProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
