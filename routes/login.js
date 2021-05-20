const express = require('express')
const path = require('path')
const { MAX_AGE, handleMd5, SELF_STATCODE } = require('../constant')
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
    if (/\/(register|login|pwd\-reset)(\/|\w|\-|\_)*$/.test(referer)) referer = '/' /* 考虑边缘情况如 注册后登录&登录失败后重新登录 */
    res.render('login.pug', { referer, vm: req.cookies.vm/* 服务于header.pug */ })
  })

  .post(async (req, res, next) => {
    const loginInfo = req.body
    if (loginInfo.captcha !== req.session.captcha) {
      // 这里因为前端是Ajax登录，所以这里后端响应体返回JSon数据为宜
      res.status(401).json({
        code: SELF_STATCODE.ERR_CAPTCHA,
        msg: '验证码错误,请修改对应处。'
      })
      return
    }
    const emailMatchOne = await db.get(/* sqlite插件的有效防止SQL注入 */
      `SELECT rowid AS id, * FROM users 
      WHERE email = ?`,
      loginInfo.email)
    if (emailMatchOne) {
      /* TODO 先确定是否邮箱已经激活 */
      if (emailMatchOne.activation !== 1) {
        res.status(401).json({
          code: SELF_STATCODE.ACCOUNT_NO_ACTIVATION,
          msg: '该账号尚未通过注册邮箱完成激活，请先激活再尝试登陆',
        })
        return 
      }
      /* 找到匹配邮箱后，再作密码的判断，————如果直接对req.pwd作密码md5计算，一定程度浪费算力 */
      if (emailMatchOne.pwd !== handleMd5(md5, loginInfo.pwd, emailMatchOne.salt)) {
        res.status(401).json({
          code: SELF_STATCODE.ERR_LOGIN,
          msg: '用户名或密码错误,请修改对应处。',
        })
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
      // res.redirect(loginInfo.next)
      res.status(200).json({
        next: loginInfo.next
      })

    } else {
      res.status(401).json({
        code: SELF_STATCODE.ERR_LOGIN,
        msg: '用户名或密码错误,请修改对应处。',
      })
    }
  })

module.exports = router
