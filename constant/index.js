
const SELF_STATCODE = Object.create(null)

;(o => {
  o[o.ERR_CAPTCHA = 10010] = "ERR_CAPTCHA"
  o[o.ERR_LOGIN = 10011] = "ERR_LOGIN"
  o[o.ERR_AUTHORIZATION = 10012] = "ERR_AUTHORIZATION"
  o[o.EMAIL_EXIST_ALREADY = 10013] = "EMAIL_EXIST_ALREADY"
  o[o.FILE_TOO_LARGE = 10021] = "FILE_TOO_LARGE"
  o[o.EMAIL_SEND_FAILED = 10031] = "EMAIL_SEND_FAILED"
  o[o.ACCOUNT_NO_ACTIVATION = 10041] = 'ACCOUNT_NO_ACTIVATION'

})(SELF_STATCODE)

/* 主要用于帖子的浏览模式的选择 */
map4vm = Object.create(null)
map4vm.t = 'p.timestamp'
map4vm.w = 'p.weight'
map4vm.r = 'p.lastCmtStamp'
map4vm.h = 'p.clicks'

module.exports = {
  PORT: 8355,
  DOMAIN: 'bbs.h3xgiii.site', 
  IPADD: '10.0.0.172', /* host: ts.miao.com */   //'127.0.0.55',
  // IPADD: '127.0.0.55', /* host: ts.miao.com */   //'127.0.0.55',
  EMAIL_SERVER: /* YOUR SMTP EMAIL */'YOUR SMTP EMAIL',
  PAGE_SIZE: 7, //每页显示帖子数目
  MAX_AGE: 3 * 60 * 60 * 1000,
  MAX_AGE_SESSION: 7 * 24 * 60 * 60 * 1000, /* 7 days */
  handleMd5(hashAlgorithm, pwd, salt) {
    return hashAlgorithm(hashAlgorithm(pwd) + hashAlgorithm(salt))
  },

  SELF_STATCODE,
  map4vm,
}
