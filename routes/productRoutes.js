const express = require("express");
const productController = require("../controllers/productController");
const cacheMiddleware = require("../middleware/cacheMiddleware");

const router = express.Router();

router.get("/", cacheMiddleware, productController.listProducts);
router.post("/", productController.createProduct);
router.get("/:id", cacheMiddleware, productController.getProductById);
router.put("/:id", productController.replaceProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
