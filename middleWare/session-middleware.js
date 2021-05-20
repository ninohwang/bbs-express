const { nanoid } = require('nanoid')
const { MAX_AGE_SESSION } = require('../constant/')

/* req.session（.captcha） 在 captcha.js 及login.js中都有体现*/
/* ★★★ gz: sessionId 在本项目中体现就是对未登录用户的唯一标识
通过对未登录用户下发cookie即埋入sessionID,而再由服务端维护一份全局的sessionMap,不同浏览器（不同sid）和各自验证码的对应
另， 同时一般会借助到 req.session字段
 */
module.exports = function () {
  const sessionMap = Object.create(null)
  return (req, res, next) => {
    console.log('[session-map]', sessionMap)
    if (req.cookies.sessionID) { 
      const sid = req.cookies.sessionID
      if (!sessionMap[sid]) sessionMap[sid] = {}
      req.session = sessionMap[sid]
    } else {
      const sid = nanoid()
      res.cookie('sessionID', sid, {
        maxAge: MAX_AGE_SESSION,
      })
      req.session = sessionMap[sid] = {} 
    }
    next()
  }
}
