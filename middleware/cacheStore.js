const entries = new Map();

function getCache(key) {
  return entries.get(key);
}

function setCache(key, response) {
  entries.set(key, response);
}

function clearCache() {
  entries.clear();
}

module.exports = { getCache, setCache, clearCache };
