const express = require('express')

const router = express.Router()

// 获取用户资料
router.get('/:username', async(req, res, next) => {
  try {
    res.send('post /users/login')
  } catch(err) {
    next(err)
  }
})

// 关注用户
router.post('/:username/follow', async(req, res, next) => {
  try {
    res.send('post /users/login')
  } catch(err) {
    next(err)
  }
})

// 取消关注用户
router.delete('/:username/follow', async(req, res, next) => {
  try {
    res.send('post /users/login')
  } catch(err) {
    next(err)
  }
})

module.exports = router