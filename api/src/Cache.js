const LruCache = require('lru-cache');
const { CACHE_DURATION } = require('./constants');

let _cache;

class Cache {
  static getCache() {
    if (!_cache) {
      _cache = new LruCache();
    }

    return _cache;
  }

  static set(key, value, maxAge = CACHE_DURATION) {
    return Cache.getCache().set(key, value, maxAge);
  }

  static get(key) {
    return Cache.getCache().get(key);
  }
}

module.exports = Cache;
