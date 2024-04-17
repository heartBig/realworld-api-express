const mongoose = require('mongoose');
const { dbUrl } = require('../config/config.default')

// 连接 MongoDB 数据库
// mongoose 7.x 写法
main()
  .then(() => console.log('连接成功'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

// mongoose 5.x 写法
// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection

// db.on('connected', () => console.log('连接开启'));
// db.once('open', () => console.log('连接成功'));
// db.on('error', err => console.error('连接错误', err));
// db.on('disconnected', () => console.log('连接断开'));


// 创建了一个模型
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// 组织导出模型类
module.exports = {
  User: mongoose.model('User', require('./user')),
  Article: mongoose.model('Article', require('./article')),
  // Comment: mongoose.model('Comment', require('./comment')),
}