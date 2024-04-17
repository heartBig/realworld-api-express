const { Article, User } = require('../model')

// 获取文章列表
exports.getArticles = async (req, res, next) => {
  try {
    const { 
      offset = 0,
      limit = 10,
      tag,
      author
    } = req.query

    const filter = {}

    if (tag) {
      filter.tagList = tag
    }

    if (author) {
      const user = await User.findOne({ username: author })

      filter.author = user ? user._id : null
    }

    const articles = await Article.find(filter)
      .skip(Number.parseInt(offset))  // 跳过多少条
      .limit(Number.parseInt(limit)) // 取多少条
      .sort({ 
        favoritesCount: -1,
        commentCount: -1,
        // -1 倒叙   1 升序
        createdAt: -1 
      })
    
    const total = await Article.countDocuments()

    res.status(200).json({ 
      articles,
      total
    })
  } catch(err) {
    next(err)
  }
}

// 获取用户关注的作者文章列表
exports.getFeedArticles = async (req, res, next) => {
  try {
    res.send('getFeedArticles')
  } catch(err) {
    next(err)
  }
}

// 获取文章
exports.getArticle = async (req, res, next) => {
  try {
    // res.send('getArticle')
    const article = await Article.findById(req.params.articleId).
      populate('author')        // 把 user 表中的数据 映射到 article 中
    if (!article) {
      return res.status(404).end()
    }

    res.status(200).json({ article })
  } catch(err) {
    next(err)
  }
}

// 创建文章
exports.createArticle = async (req, res, next) => {
  try {
    // res.send('createArticle')
    const article = new Article(req.body.article)
    article.author = req.user._id

    // 把 user 表中的数据 映射到 article 中
    article.populate('author')
      // .exec()  

    await article.save()
    console.log(article)
    res.status(201).json({
      article
    })
  } catch(err) {
    next(err)
  }
}

// 更新文章
exports.updateArticle = async (req, res, next) => {
  try {
    const article = req.article
    const updateBody = req.body.article
    article.title = updateBody.title || article.title
    article.description = updateBody.description || article.description
    article.body = updateBody.body || article.body

    await article.save()

    res.status(200).json({
      article
    })
  } catch(err) {
    next(err)
  }
}

// 删除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = req.article
    console.log(article)

    await article.deleteOne()

    res.status(200).end()
  } catch(err) {
    next(err)
  }
}

// 添加文章评论
exports.createArticleComment = async (req, res, next) => {
  try {
    res.send('createArticleComment')
  } catch(err) {
    next(err)
  }
}


// 获取文章评价列表
exports.getArticleComments = async (req, res, next) => {
  try {
    res.send('getArticleComments')
  } catch(err) {
    next(err)
  }
}


// 删除文章评论
exports.deleteArticleComment = async (req, res, next) => {
  try {
    res.send('deleteArticleComment')
  } catch(err) {
    next(err)
  }
}
