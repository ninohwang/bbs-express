const { Router } = require('express')
const path = require('path')
const router = Router()
const sqlite = require('sqlite'), sqlite3 = require('sqlite3')

const dbPromise = sqlite.open({
  filename: path.join(__dirname, '../data/bbs.db'),
  driver: sqlite3.Database,
})
let db
  ; (async function () {
    db = await dbPromise
  })()

router.get('/:id', async (req, res, next) => {
  const userSearchId = req.params.id
  const userOne = await db.get(`
    SELECT *, rowid AS id FROM users u
    WHERE u.rowid = ?
  `, userSearchId)

  if (userOne) {
    const posts = await db.all(`
    SELECT p.rowid AS id, * FROM posts p
    JOIN users u
    WHERE p.userId = ? 
    AND p.userId = u.rowid
  `, userSearchId)

    const comments = await db.all(`
    SELECT *, p.title AS post_title, 
    c.postId AS comm_postId,
    c.content AS comm_content
    FROM comments c 
    JOIN posts p
    ON c.userId = ?
    AND c.postId = p.rowid
  `, userSearchId)

    res.render('user_detail.pug', {
      /* 正在查看的用户的信息、 该用户发过的帖子和回过的评论 */
      userOne,
      posts,
      comments,
      user: req.user, /* ★ 这一行有必要带上，headerPug处渲染需要 */
      vm: req.cookies.vm/* 服务于header.pug */
    })
  } else {
    res.type('html').status(404).end('<h3><strong>404</strong> 查询用户不存在，<a href="/">返回首页</a><h3>')
  }
})

module.exports = router
