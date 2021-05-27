const {Router} = require('express');
const { nanoid } = require('nanoid');
// const formidable = require('formidable')
const multer = require('multer')
const path = require('path')
const md5 = require('md5')
const nodemailer = require('nodemailer')
const MakeActiEmailHtml = require('../email-html/make-reset-pwd-html')

const {handleMd5, SELF_STATCODE, IPADD, PORT, EMAIL_SERVER} = require('../constant')

const registerRouter = Router()
/* 处理邮件激活的路由中间件 */
const activateEmailRouter = Router()

/* gz : 另一种常见的账号激活逻辑为：注册页除了注册按钮外，还有个通过邮件 获取激活码的按钮，此必填，之后才可完成注册，如此优点是不必提前把条目加入到数据库中，而是确认了邮箱所属后才执行*/

const transporter = nodemailer.createTransport({
  host: 'smtp.163.com', 
  secure: true,
  requireTLS: true,
  auth: {
    user: EMAIL_SERVER,
    pass: 'LYTOOKSVZGKJVXQJ'
  }
})
const emailActiveCodeMap = new Map()

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
registerRouter.route('/')
  .get((req, res, next) => {
    res.render('register.pug', {vm: req.cookies.vm/* 服务于header.pug */})
  })
  .post( (req, res, next) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError && err.message == 'File too large') {
        res.status(401).json({
          code: SELF_STATCODE.FILE_TOO_LARGE,
          msg: '🤔上传头像太大！建议2Mb以内，可以重新上传，或者使用默认头像',
        })
        return
      }
      const { email, pwd, gender, bdcolor,nickname } = req.body
      const salt = Math.random().toString(16).slice(2, 10)
      const avatar = req.file
      /* TODO 图片先上传到服务端，而再发现邮箱已经注册过，那么用户已经上传的无效图片如何删除 */

      const code4activation = nanoid()
      emailActiveCodeMap.set(code4activation, email)

      try {
        await db.run(/* email(primary key) */`
          INSERT INTO users (email, pwd, gender, createAt, avatar, salt, bdcolor,nickname, activation, code4activation) 
          VALUES  (?,?,?,?,?,?,?,?,?,?)`,
          email,
          handleMd5(md5, pwd, salt) , /* 数据库规避存储用户明文密码 */
          gender,
          new Date().toISOString(),
          avatar?.filename || 'default.png',
          salt,
          bdcolor,
          nickname || email.match(reg4email)[1],
          0,
          code4activation,
        )

        // const url = `http://${IPADD}:${PORT}/active-email/${code4activation}`
        
        const mailOptions = {
          from: EMAIL_SERVER,
          to: email,
          subject: '[BBSMINI😘]账号激活链接',
          // html: `<h3> 点击链接地址，以完成邮箱激活。<strong>（10分钟内有效）</strong> <br/><a href="${url}" target='_blank'>${url}</a></h3>`
          html: MakeActiEmailHtml(code4activation, false)
        }
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.status(500).json({
              code: SELF_STATCODE.EMAIL_SEND_FAILED,
              msg: '服务器太忙，请重试以再次发送激活邮件',
            })
            return console.log('[send-mail-err]:',err.message)
          }

          res.status(200).json({
            next: '/', // 逻辑上, 注册页面跳到登录页面，交互效果最好，不过自己的实现方案是另个链接到的网页来实现激活。
            msg: '😘我们已向你的注册邮箱中发送激活账号链接<strong>（10分钟内有效）</strong>，请尽快完成账号激活，过期需要重新注册！激活后即可登录发帖\n点击页面任意位置回到首页~', // msg: "😘注册成功，点击页面任意位置立刻跳转到登录页" 
          })
          console.log('[pwdreset-msg-sent]:', info.response);
          setTimeout(async () => {
            emailActiveCodeMap.delete(code4activation)
            /* 如果一定时间内没激活，则删除对应条目。也方便重新注册，因为email 是primary-key */
            let isActivated = await db.get(`
              SELECT activation FROM users WHERE email = ?
            `, email)
            if (!isActivated.activation) {
              await db.run(`
                DELETE FROM users WHERE email = ?
              `, email)
            }
          }, 1000 * 60 * 10); /* TODO 测试限时内没激活则删除条目... */
        })

      } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          res.status(401).json({
            msg: '🤔该邮箱地址已经注册过，试试登录, 或者重新注册',
            code: SELF_STATCODE.EMAIL_EXIST_ALREADY
          })
        }
        next(err)
      }
    })


  })


  /* 账号激活的路由也定义在这里 */
activateEmailRouter.get('/:token', async (req, res, next) => {
  const {token} = req.params
  if (!emailActiveCodeMap.has(token)) {
    res.status(401).type('html').end('<h3>链接已失效, 跳转到<a href="/">主页</a></h3>')
    return
  }
  await db.run(`
    UPDATE users SET activation = 1
    WHERE email = ?
  `, emailActiveCodeMap.get(token))
  res.status(200).type('html').end('<h3>邮箱验证通过, 跳转到<a href="/login">登录页</a></h3>')
})


module.exports = {
  registerRouter,
  activateEmailRouter,
}
