const express = require('express');
const { nanoid } = require('nanoid');
// const formidable = require('formidable')
const multer = require('multer')
const router = express.Router()
const path = require('path')

const sqlite = require('sqlite'), sqlite3 = require('sqlite3')
let db
(async function () {
  db = await sqlite.open({
    filename: path.resolve(__dirname, '../data/bbs.db'),
    driver: sqlite3.Database,
  })
})()

const upload = multer({
  dest: path.join(__dirname, '../upload/user_avatar'),
  limits: { fileSize: 2 * 1024 * 1024, } /* 当图片体积太大，会页面进入pending状态，直至重新上传图片 */
})



//#region  基于formidable 中间件
// const form = formidable({
//   multiple: true,
//   uploadDir: path.join(__dirname, '../upload'),
//   keepExtensions: true,
//   maxFileSize: 2 * 1024 * 1024, //1mb
// })

// router.route('/')
//   .get((req, res, next) => {
//     // res.sendFile('demo.html') /* 暂时不会静态文件 */
//     res.render('register.pug')
//   })
//   .post(async (req, res, next) => {

//     form.parse(req, async (err, fields, files) => {
//       console.log(fields, files);
//       const {email, pwd, gender} = fields
//       const {avatar} = files
//       try {
//         await db.run(/* email(primary key) */`
//           INSERT INTO users (email, pwd, gender, createAt, avatar) 
//           VALUES  (?,?,?,?,?)`,
//           email,
//           pwd,
//           gender,
//           new Date().toISOString(),
//           avatar.name
//         )
//         res.redirect('/login')/* TODO 细节是期望 弹出`😘注册成功`再回到登录页 */
//       } catch (err) {
//         if (err.code === 'SQLITE_CONSTRAINT') {
//           res.send(`<h3>🤔该邮箱地址已经注册过，试试<a href='/login'>登录</a>, 或者重新<a href='register'>注册</a></h3>`)
//         }
//         next(err)
//       }
//     })

//   })
//#endregion

/* 基于multer中间件 */
router.route('/')
  .get((req, res, next) => {
    res.render('register.pug')
  })
  .post(/* 连续的中间件使用示例 */upload.single('avatar'), async (req, res, next) => {
    const { email, pwd, gender } = req.body
    const avatar = req.file
    /* TODO 图片先上传到服务端，而再发现邮箱已经注册过，那么用户已经上传的无效图片如何删除 */
    try {
      await db.run(/* email(primary key) */`
          INSERT INTO users (email, pwd, gender, createAt, avatar) 
          VALUES  (?,?,?,?,?)`,
        email,
        pwd,
        gender,
        new Date().toISOString(),
        avatar.originalname
      )
      res.redirect('/login')/* TODO 细节是期望 弹出`😘注册成功`再回到登录页 */
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        res.send(`<h3>🤔该邮箱地址已经注册过，试试<a href='/login'>登录</a>, 或者重新<a href='register'>注册</a></h3>`)
      }
      next(err)
    }
  })

module.exports = router
