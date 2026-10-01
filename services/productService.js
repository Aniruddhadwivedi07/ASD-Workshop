const { readProducts, writeProducts } = require("../database/productStore");

async function listProducts() {
  return readProducts();
}

async function findProductById(id) {
  const productId = Number(id);
  const products = await readProducts();
  return products.find((product) => product.id === productId) ?? null;
}

async function createProduct(productData) {
  const products = await readProducts();
  const nextId =
    products.reduce(
      (highestId, product) => Math.max(highestId, Number(product.id) || 0),
      0,
    ) + 1;
  const product = { ...productData, id: nextId };

  products.push(product);
  await writeProducts(products);
  return product;
}

async function replaceProduct(id, productData) {
  const productId = Number(id);
  const products = await readProducts();
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );

  if (productIndex === -1) {
    return null;
  }

  const product = { ...productData, id: productId };
  products[productIndex] = product;
  await writeProducts(products);
  return product;
}

async function updateProduct(id, productData) {
  const productId = Number(id);
  const products = await readProducts();
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );

  if (productIndex === -1) {
    return null;
  }

  const product = { ...products[productIndex], ...productData, id: productId };
  products[productIndex] = product;
  await writeProducts(products);
  return product;
}

async function deleteProduct(id) {
  const productId = Number(id);
  const products = await readProducts();
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );

  if (productIndex === -1) {
    return null;
  }

  const [product] = products.splice(productIndex, 1);
  await writeProducts(products);
  return product;
}

module.exports = {
  listProducts,
  findProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
