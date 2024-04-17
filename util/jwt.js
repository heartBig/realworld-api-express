const jwt = require('jsonwebtoken')
const { promisify } = require('util')
// const 

exports.sign = promisify(jwt.sign)
exports.verify = promisify(jwt.verify)
exports.decode = promisify(jwt.decode)


