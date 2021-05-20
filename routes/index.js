
const login = require('./login')
const {registerRouter, activateEmailRouter,} = require('./register')
const post_comments = require('./post_comments')
const all_comments = require('./all_comments')
const logout = require('./logout')
const add_post = require('./add_post')
const captcha = require('./captcha')
const userDetail = require('./user_detail')
const edit_profile = require('./edit_profile')
const {pwdForgotRouter, pwdResetRouter} = require('./pwd-forgot-reset')

module.exports = {
  login,
  logout,
  registerRouter, activateEmailRouter,
  post_comments,
  all_comments,
  add_post,

  captcha,
  userDetail,
  edit_profile,

  pwdForgotRouter,
  pwdResetRouter,
}
