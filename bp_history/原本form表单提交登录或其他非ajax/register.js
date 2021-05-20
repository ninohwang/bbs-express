const express = require('express');
const { nanoid } = require('nanoid');
// const formidable = require('formidable')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const md5 = require('md5')
const {handleMd5} = require('../constant')

const sqlite = require('sqlite'), sqlite3 = require('sqlite3')
let db
(async function () {
  db = await sqlite.open({
    filename: path.resolve(__dirname, '../data/bbs.db'),
    driver: sqlite3.Database,
  })
})()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../upload/user_avatar'))
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname) )
  }
})

const upload = multer({
  // dest: path.join(__dirname, '../upload/user_avatar'),
  limits: { fileSize: 2 * 1024 * 1024, },
  storage,
}).single('avatar')

/* temp 处理email 邮箱的昵称 */ const reg4email = /^([a-zA-Z0-9_-]+)@/

/* 基于multer中间件 */
router.route('/')
  .get((req, res, next) => {
    res.render('register.pug')
  })
  .post( (req, res, next) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError && err.message == 'File too large') {
        res.send(`<h3>🤔上传头像太大！建议2Mb以内，建议重新<a href='/register'>尝试</a></h3>`)
        return
      }
      const { email, pwd, gender, bdcolor,nickname } = req.body
      const salt = Math.random().toString(16).slice(2, 10)
      const avatar = req.file
      console.log(req.file);
      /* TODO 图片先上传到服务端，而再发现邮箱已经注册过，那么用户已经上传的无效图片如何删除 */
      /* 猜想： 可能先更新数据库除avatar头像的一列，先确定是否已经注册过？？不过感觉还是不行 */
      try {
        await db.run(/* email(primary key) */`
          INSERT INTO users (email, pwd, gender, createAt, avatar, salt, bdcolor,nickname) 
          VALUES  (?,?,?,?,?,?,?,?)`,
          email,
          handleMd5(md5, pwd, salt) , /* 数据库规避存储用户明文密码 */
          gender,
          new Date().toISOString(),
          avatar.filename,
          salt,
          bdcolor,
          nickname || email.match(reg4email)[1]
        )
        res.redirect('/login')/* TODO 细节是期望 弹出`😘注册成功`再回到登录页 */
      } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          res.send(`<h3>🤔该邮箱地址已经注册过，试试<a href='/login'>登录</a>, 或者重新<a href='register'>注册</a></h3>`)
        }
        next(err)
      }
    })


  })

module.exports = router
