const { Router } = require('express')
const path = require('path')
const router = Router()
const sqlite = require('sqlite'), sqlite3 = require('sqlite3')
const multer = require('multer')
const {nanoid} = require('nanoid')

const md5 = require('md5')
const { handleMd5, SELF_STATCODE } = require('../constant')

const dbPromise = sqlite.open({
  filename: path.join(__dirname, '../data/bbs.db'),
  driver: sqlite3.Database,
})
let db
  ; (async function () {
    db = await dbPromise
  })()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../upload/user_avatar'))
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
})

/* TODO 也可实现同ajax登录 页面局部刷新的效果  */
const upload = multer({
  // dest: path.join(__dirname, '../upload/user_avatar'),
  limits: { fileSize: 2 * 1024 * 1024, },
  storage,
}).single('avatar')


router.route('/')
  .get((req, res, next) => {
    if (req.user) {
      res.render('edit_profile.pug', {
        user: req.user,
        vm: req.cookies.vm/* 服务于header.pug */
      })
    } else {
      res.type('html').end(`<h3>
        请<a href='/login'>登录</a>,
        或者返回<a href='/'>首页</a>
      <h3>`)
    }
  })
  .post((req, res, next) => {
    if (!req.user) {
      res.type('html').end(`<h3>你的post请求被拒绝，登录后才允许相关操作</h3>`)
      return 
    }

    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError && err.message == 'File too large') {
        // res.send(`<h3>🤔上传头像太大！建议2Mb以内，建议重新<a href='/register'>尝试</a></h3>`)
        res.status(401).json({
          code: SELF_STATCODE.FILE_TOO_LARGE,
          msg: '上传图片体积太大，请重新上传',
        })
        return
      }
      const { pwd_old, pwd_new, pwd_certain, nickname } = req.body
      const avatar = req.file
      const { salt } = req.user

      const {pwd: trulyPwd} = await db.get(`
        SELECT pwd FROM users u
        WHERE u.email = ?
      `, req.user.email)


      if (handleMd5(md5, pwd_old, salt) !== trulyPwd /* req.user.pwd 这里没有把 pwd挂在req.user上了*/) {
        // res.type('html').end(`<h3>密码输入错误，请<a href='/edit-profile'>重试</a></h3>`)
        res.status(401).json({
          code: SELF_STATCODE.ERR_AUTHORIZATION,
          msg: '密码输入错误，请重试'
        })
        return

      }

      
      /* TODO 实际新旧密码不一致在前端即可验证！！ */
      if (pwd_new !== pwd_certain) {
        // res.type('html').end(`<h3>新密码两次输入不一致，请<a href='/edit-profile'>重试</a></h3>`)
        res.status(401).json({
          code: SELF_STATCODE.ERR_AUTHORIZATION,
          msg: '新密码两次输入不一致，请重试'
        })
        return
      }

      /* 更新数据库 */
      await db.run(`
        UPDATE users set pwd=?, nickname=?, avatar=?
        WHERE users.rowid = ?
        `,
        handleMd5(md5, pwd_new, salt),
        nickname,
        avatar ? avatar.filename : req.user.avatar,
        req.user.id
      )
      res.status(200).json({
        next: `/users/${req.user.id}`,
        msg: "信息修改成功，点击页面任意位置回到用户详情页"
      })
    })
  })

module.exports = router
