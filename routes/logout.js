const { Router } = require('express')

const router = Router()
router.get('/', (req, res, next) => {
  //#region 旧有方案
  // const {next:nextTo} = req.query
  // res.redirect(`${nextTo}`) 
  //#endregion
  res.clearCookie('loginUser')
  res.clearCookie('gender')
  res.redirect(req.get('referer'))
})


module.exports = router
