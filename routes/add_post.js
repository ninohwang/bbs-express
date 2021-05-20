const { Router } = require('express')
const path = require('path')
const sqlite = require('sqlite'), sqlite3 = require('sqlite3')

let db
(async function () {
  db = await sqlite.open({
    filename: path.join(__dirname, '../data/bbs.db'),
    driver: sqlite3.Database,
  })
})()

const router = Router()

router.route('/')
  .get((req, res, next) => {
    res.render('add_post.pug', { user: req.user,vm: req.cookies.vm/* 服务于header.pug */ })
  })
  .post(async (req, res, next) => {
    if (req.user) {
      const { title, content, userId } = req.body
      const stmt = await db.run(`
        INSERT INTO posts VALUES (?,?,?,?,?,?,?)`,
        title,
        content,
        userId,
        Date.now(),
        0,
        0,
        0,
      )
      res.redirect(`/posts/${stmt.lastID}`)
    } else {
      res.send('<h3>未登录情况下，拒绝该发帖的post请求，请登录后发帖</h3>')
    }
  })

module.exports = router
