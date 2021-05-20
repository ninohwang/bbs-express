/* 如下，可尝试把这个封装到自定义的合乎express框架的中间件（函数）里 */

const path = require('path')
const { nanoid } = require('nanoid')
const { MAX_AGE_SESSION } = require(path.join(__dirname, '../constant/'))
/* sessionMap 作为全局对象的必要性： 对于不同的req实例，都能通过req.session=sessionMap[sid]访问到同份映射 */
const sessionMap = Object.create(null)/* session 存储的服务端的原理由此一瞥，服务端维护一份sessionMap(sid 与(...如{captcha:1234})的映射) */

module.exports = function (req, res, next) {
  // /* temp */console.log('[server_sessionMap]:', sessionMap);
  if (req.cookies.sessionID) { 
    /* TODO - vital: 每次重启服务端时，尽管服务端维护的sessionMap即重建，
    但是客户端可能是个长时间有效的cookies.sessionID，那么当即为其创建一份映射，逻辑上无需再分配sessionID */
    const sid = req.cookies.sessionID
    if (!sessionMap[sid]) sessionMap[sid] = {} 
    req.session = sessionMap[sid]
  } else {
    const sid = nanoid()
    res.cookie('sessionID', sid, {//一般用于埋sessionID 的下发cookie，不需签名
      maxAge: MAX_AGE_SESSION,
    })
    req.session = sessionMap[sid] = {} /*vital： 也挂在req.session上,而后便于访问 */
  }
  next()
}
