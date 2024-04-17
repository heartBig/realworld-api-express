const { body, param } = require('express-validator')
const validate = require('../middleware/validate')
const mongoose = require('mongoose')
const { Article } = require('../model')

exports.createArticle = validate([
  body('article.title').notEmpty().withMessage('标题不能为空'),
  body('article.description').notEmpty().withMessage('描述不能为空'),
  body('article.body').notEmpty().withMessage('内容不能为空'),
])

exports.getArticle = validate([
  validate.isValidObjectId(['params'], 'articleId')
  // param('articleId').custom(async value => {
  //   if (!mongoose.isValidObjectId(value)) {
  //     // 返回一个失败状态的 promise
  //     return Promise.reject('文章ID类型错误')

  //     // 同步: 失败状态
  //     // throw new Error('文章ID类型错误')
  //   }
  //   // 同步：成功状态
  //   // return true
  // })
])

exports.updateArticle = [
  validate([
    // param('articleId').custom(async value => {})
    validate.isValidObjectId(['params'], 'articleId')
  ]),
  
  // 检验文章是否存在
  async (req, res, next) => {
    const articleId = req.params.articleId
    const article = await Article.findById(articleId)
    req.article = article
    if (!article) {
      return res.status(404).end()
    }
    next()
  },

  // 修改文章的作者是否是当前登录用户
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      return res.status(404).end()
    }
    next()
  }
]

exports.deleteArticle = exports.updateArticle