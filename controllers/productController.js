const productService = require("../services/productService");
const { clearCache } = require("../middleware/cacheStore");

function hasValidId(id) {
  return Number.isInteger(Number(id)) && Number(id) > 0;
}

function hasObjectBody(req) {
  return (
    req.body !== null &&
    typeof req.body === "object" &&
    !Array.isArray(req.body)
  );
}

async function listProducts(req, res, next) {
  try {
    const products = await productService.listProducts();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

async function getProductById(req, res, next) {
  if (!hasValidId(req.params.id)) {
    return res
      .status(400)
      .json({ error: "Product ID must be a positive integer" });
  }

  try {
    const product = await productService.findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

async function createProduct(req, res, next) {
  if (!hasObjectBody(req)) {
    return res.status(400).json({ error: "Request body must be an object" });
  }

  try {
    const product = await productService.createProduct(req.body);
    clearCache();
    return res.status(201).location(`/products/${product.id}`).json(product);
  } catch (error) {
    return next(error);
  }
}

async function replaceProduct(req, res, next) {
  if (!hasValidId(req.params.id)) {
    return res
      .status(400)
      .json({ error: "Product ID must be a positive integer" });
  }

  if (!hasObjectBody(req)) {
    return res.status(400).json({ error: "Request body must be an object" });
  }

  try {
    const product = await productService.replaceProduct(
      req.params.id,
      req.body,
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    clearCache();
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  if (!hasValidId(req.params.id)) {
    return res
      .status(400)
      .json({ error: "Product ID must be a positive integer" });
  }

  if (!hasObjectBody(req)) {
    return res.status(400).json({ error: "Request body must be an object" });
  }

  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    clearCache();
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(req, res, next) {
  if (!hasValidId(req.params.id)) {
    return res
      .status(400)
      .json({ error: "Product ID must be a positive integer" });
  }

  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    clearCache();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
