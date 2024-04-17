const express = require('express')

const router = express.Router()

// 获取用户资料
router.get('/tags', async(req, res, next) => {
  try {
    res.send('get /tags')
  } catch(err) {
    next(err)
  }
})

module.exports = router