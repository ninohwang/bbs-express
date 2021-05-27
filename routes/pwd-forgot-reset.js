const { Router } = require('express')
const { nanoid } = require('nanoid')
const md5 = require('md5')
const path = require('path')
const nodemailer = require('nodemailer')
const { IPADD, PORT, handleMd5, EMAIL_SERVER, SELF_STATCODE} = require('../constant/')
const MakeResetPwdHtml = require('../email-html/make-reset-pwd-html')

const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  secure: true,
  requireTLS: true,
  auth: {
    user: EMAIL_SERVER,
    pass: 'LYTOOKSVZGKJVXQJ'
  }
})

const sqlite = require('sqlite'), sqlite3 = require('sqlite3')
const dbPromise = sqlite.open({
  filename: path.join(__dirname, '../data/bbs.db'),
  driver: sqlite3.Database,
})

let db
dbPromise.then(database => db = database)

const pwdForgotRouter = Router()
const pwdResetRouter = Router()

/* 这里定义的算作全局吗？ */
const emailTokenMap = new Map()

pwdForgotRouter.get('/', (req, res, next) => {
  res.render('pwd-forgot.pug', {
    vm: req.cookies.vm
  })
})

pwdForgotRouter.post('/', async (req, res, next) => {
  const { email, captcha } = req.body

  const existUser = await db.get(`
    SELECT email, rowid as id FROM users
    WHERE users.email = ?
  `, email)

  if (req.session.captcha !== captcha) {
    res.status(401).type('html').end(`<h3>验证码填写错误！请重新<a href="${req.originalUrl}">尝试</a></h3>`)
    return
  }

  if (!existUser) {
    res.status(401).type('html').end(`<h3>该邮箱地址尚未注册！请重新<a href="${req.originalUrl}">尝试</a>，或直接<a href='/register'>注册</a>。</h3>`)
    // res.status(401).json({
    //   code: xxx,
    //   msg: '该邮箱地址尚未注册！请重新尝试，或直接注册。'/* 4ajax */
    // })
    return
  }

  const token = nanoid()
  emailTokenMap.set(token, email)

  const url = `http://${IPADD}:${PORT}/pwd-reset/${token}`
  console.log('[reset-pwd-url]:', url);

  // await sendEmailTo(url)(email)
  const mailOptions = {
    from: EMAIL_SERVER,
    to: email,
    subject: '[BBSMINI😘]重置密码的方式如下',
    // html: `<h3>重置密码: <a href="${url}" target='_blank'>${url}</a>，请及时前往修改</h3>`
    html: MakeResetPwdHtml(token)
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json({
        code: SELF_STATCODE.EMAIL_SEND_FAILED,
        msg: '服务器太忙，请重试以再次发送邮件',
      })
      return console.log('[send-mail-err]:', err.message)
    }
    res.status(200).type('html').end(`<h3>已发送重置密码的<a href="${url}" target='_blank'>链接<small>（演示用）</small></a>，请及时确认</h3>`)
    console.log('[pwdreset-msg-sent]:', info.response);
  })

  setTimeout(() => {
    console.log(`已重置 token: ${token} for ${email}`);
    emailTokenMap.delete(token)
  }, 1000 * 60 * 5);
})


pwdResetRouter.get('/:token', async (req, res, next) => {
  const { token } = req.params
  const email = emailTokenMap.get(token)
  // const user = await db.get(`
  //   SELECT email FROM users
  //   WHERE users.email = ?
  // `, email)
  if (emailTokenMap.has(token)) {
    res.render('pwd-reset.pug', { email })
  } else {
    res.status(401).type('html').end(`<h3>链接已失效，请重试, 或返回<a href='/'>首页</a></h3>`)
    // res.status(401).json({
    //   msg: '链接已失效，请重试',
    // })
  }
})

pwdResetRouter.post('/:token', async (req, res, next) => {
  const { token } = req.params

  if (!emailTokenMap.has(token)) {
    res.status(401).type('html').end(`<h3>链接已失效，请重试, 或返回<a href='/'>首页</a></h3>`)
    // res.status(401).json({
    //   msg: '链接已失效，请重试'
    // })
    return
  }

  const { pwd_new } = req.body
  const email = emailTokenMap.get(token)

  const salt = Math.random().toString(16).slice(2, 10)

  await db.run(`
    UPDATE users SET pwd=?, salt=?
    WHERE email = ?
  `, handleMd5(md5, pwd_new, salt), salt, email)

  res.status(200).type('html').end(`<h3>密码重设成功，立即<a href='/login'>登录</a>发帖吧~</h3>`)
  // res.status(200).json({
  //   msg: '密码重设成功，立即登录发帖吧~'
  // })
})

module.exports = {
  pwdForgotRouter,
  pwdResetRouter,
}
