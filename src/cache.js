const EE = require('events')
const { inherits } = require('util')
const cache = require('memory-cache')
const noop = function () {}

function Cache () {
  if(!(this instanceof Cache)) {
    return new Cache()
  }
  EE.call(this)
  this.cache = cache
}

inherits(Cache, EE)

Cache.prototype.put = function (key, value, time, cb) {
  const self = this
  const callback = function (key, value) {
    if (cb) {
      cb(key, value)
    }

    self.emit('expires', key)
    return self
  }

  if (!time) {
    self.cache.put(key, value)
  } else {
    self.cache.put(key, value, time, callback)
  }

  self.emit('put', key, value)

  return self
}

Cache.prototype.get = function (key) {
  return this.cache.get(key)
}

module.exports = new Cache()
