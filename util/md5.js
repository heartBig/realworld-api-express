const crypto = require('crypto')

// 获取 crypto 支持的散列算法

// console.log(crypto.getHashes())

module.exports = str => {
  return crypto.createHash('md5')
    .update('la' + str)
    .digest('hex')
}