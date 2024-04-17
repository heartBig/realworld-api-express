const { validationResult, buildCheckFunction  } = require('express-validator');
const { isValidObjectId } = require('mongoose')

// sequential processing, stops running validations chain if the previous one fails.
exports = module.exports  = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    // 判断验证结果
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

exports.isValidObjectId = (location, fields) => {
  return buildCheckFunction(location)(fields).custom(async value => {
    if (!isValidObjectId(value)) {
      return Promise.reject('ID 不是一个有效的 ObjectId ')
    }
  })
}