const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { User } = require('../model')
const md5 = require('../util/md5')

exports.register = validate([
  body('user.username').notEmpty().withMessage('用户名不能为空')
    .custom(async (username) => {
      const user = await User.findOne({ username })
      if (user) {
        return Promise.reject('用户名已存在')
      }
    }),
  body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确')
    .bail()
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        return Promise.reject('邮箱已被注册')
      }
    }),
  body('user.password').notEmpty().withMessage('密码不能为空')
])

exports.login = [
  validate([
    body('user.email').notEmpty().withMessage('邮箱不能为空'),
    body('user.password').notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    body('user.email').custom(async (email, { req }) => {
      const user = await User.findOne({ email })
        .select(['bio', 'image', 'username', 'email', 'password'])
      if (!user) {
        return Promise.reject('用户不存在')
      }

      // 将数据挂载到请求对象中，后续的中间件都可以通过 req.user 获取到当前登录用户
      req.user = user
    })
  ]),
  validate([
    body('user.password').custom(async (password, { req }) => {
      console.log(req)
      if (md5(password) !== req.user.password) {
        return Promise.reject('密码错误')
      }
    })
  ]),
]