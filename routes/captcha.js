/* 为login 界面提供验证码功能 */
const svgCaptcha = require('svg-captcha')
const { Router } = require('express')

with (svgCaptcha.options) {
  width = 100
  height = 38
  fontsize = 20
  charPreset = '0123456789'
}

const router = Router()
router.get('/', (req, res, next) => {
  let captcha = svgCaptcha.create({
    ignoreChars: '0o1iIl8B',  
    /* temp */size:1, noise: 3,
  })
  req.session.captcha = captcha.text
  res.status(200).type('svg').send(captcha.data)
})

module.exports = router
