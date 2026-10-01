const { getCache, setCache } = require("./cacheStore");

function cacheMiddleware(req, res, next) {
  if (req.method !== "GET") {
    return next();
  }

  const key = `GET:${req.originalUrl}`;
  const cachedResponse = getCache(key);

  if (cachedResponse) {
    res.set("X-Cache", "HIT");
    return res.status(cachedResponse.statusCode).json(cachedResponse.body);
  }

  res.set("X-Cache", "MISS");
  const sendJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      setCache(key, { statusCode: res.statusCode, body });
    }
    return sendJson(body);
  };

  return next();
}

module.exports = cacheMiddleware;
