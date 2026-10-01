const entries = new Map();
const TTL_MS = 60_000;

function getCache(key) {
  const entry = entries.get(key);
  if (!entry) {
    return undefined;
  }

  if (Date.now() >= entry.expiresAt) {
    entries.delete(key);
    return undefined;
  }

  return entry.response;
}

function setCache(key, response) {
  entries.set(key, { response, expiresAt: Date.now() + TTL_MS });
}

function clearCache() {
  entries.clear();
}

module.exports = { getCache, setCache, clearCache, TTL_MS };
