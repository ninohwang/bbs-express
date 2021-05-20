const { Router } = require('express')
const path = require('path')
const sqlite = require('sqlite'), sqlite3 = require('sqlite3')
const router = Router()

let db
(async function () {
  db = await sqlite.open({
    filename: path.join(__dirname, '../data/bbs.db'),
    driver: sqlite3.Database
  })
})()

// 主要是为了给用户评论初始化 (userId 可以通过 一开始给req 挂上的user属性获取到)
router.post('/', async (req, res, next) => {
  const { /* content , */postId, richtextcmt: content } = req.body
  if (!req.user) {
    res.send(`<h3>你的post请求被拒绝，登录后才允许提交评论</h3>`)
  } else {
    await db.run(`
      INSERT INTO comments VALUES
      (?, ?, ?, ?)`,
      content,
      req.user.id,
      postId,
      Date.now()
    )
    res.status(200).json({
      msg: '发表评论成功'
    })
    /* 更新权重 */
    const post = await db.get(`
      SELECT * FROM posts 
      WHERE posts.rowid = ?
    `, postId)
    await db.run(`
      UPDATE posts SET weight = ? , lastCmtStamp = ?
      WHERE posts.rowid = ?;
    `, ++post.weight, Date.now(), postId)
  }
})

module.exports = router
