const express = require('express')
const userCtrl = require('../controller/user')
const { register, login } = require('../validator/user')
const auth = require('../middleware/auth')

const router = express.Router()

// 用户登录
router.post('/users/login',login, userCtrl.login)

// 用户注册
 //1. 配置验证规则   2. 判断验证结果判断验证结果
router.post('/users', register, userCtrl.register)  // 3. 验证通过，执行具体的控制器处理

// 获取当前登录用户
router.get('/user', auth, userCtrl.getCurrentUser)

// 更新当前登录用户
router.put('/user', auth, userCtrl.updateCurrentUser)

module.exports = router