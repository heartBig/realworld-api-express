const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
const { dbUrl } = require('./config/config.default')
require('./model')

const app = express()

// 日志输出
app.use(morgan('dev'))
// 解析请求体
app.use(express.json())
// 为客户端提供跨域资源请求
app.use(cors())

const PORT = process.env.PORT || 3000

// 挂载路由
app.use('/api', router)
// 挂载统一处理服务端错误中间件
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
  console.log(`MongoDB connected to ${dbUrl}`)
})



// mongodb 数据库启动命令 
// "F:\Program Files\mongodb-win32-x86_64-windows-7.0.7\bin\mongod.exe" --dbpath="F:\Program Files\mongodb-win32-x86_64-windows-7.0.7\data\db"
// mongod.exe  地址