const express = require('express')
const path = require('path')
const { MAX_AGE, handleMd5 } = require('../constant')
const md5 = require('md5')

const sqlite = require('sqlite'), sqlite3 = require('sqlite3')
let db
(async function () {
  db = await sqlite.open({
    filename: path.resolve(__dirname, '../data/bbs.db'),
    driver: sqlite3.Database,
  })
})()

const router = express.Router()

router.route('/')
  .get((req, res, next) => {
    let referer = req.get('referer')
    if (/\w+\/(register|login)(\/)?$/.test(referer)) referer = '/' /* 考虑边缘情况如 注册后登录&登录失败后重新登录 */
    res.render('login.pug', { referer })
  })

  .post(async (req, res, next) => {
    const loginInfo = req.body
    if (loginInfo.captcha !== req.session.captcha) {
      res.send('<h2>验证码填写错误，请<a href="/login">重试</a></h2>')
      return
    }
    const emailMatchOne = await db.get(/* sqlite插件的有效防止SQL注入 */
      `SELECT rowid AS id, * FROM users 
      WHERE email = ?`,
      loginInfo.email)
    if (emailMatchOne) {
      /* 找到匹配邮箱后，再作密码的判断，————如果直接对req.pwd作密码md5计算，一定程度浪费算力 */
      if (emailMatchOne.pwd !== handleMd5(md5, loginInfo.pwd, emailMatchOne.salt)) {
        res.type('html').end('<h2>抱歉，登录失败，请再次<a href="/login">尝试</a>🤔</h2>')
        return
      }
      /* 登陆成功，则下发cookie */
      res.cookie('loginUser', emailMatchOne.email, {
        httpOnly: true,
        maxAge: MAX_AGE,
        signed: true,
      })
      res.cookie('gender', emailMatchOne.gender, {
        // httpOnly: true,
        maxAge: MAX_AGE,
      })
      res.redirect(loginInfo.next)

    } else {

    }
  })

module.exports = router
