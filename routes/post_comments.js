const express = require('express')
const path = require('path')
const sqlite = require('sqlite'), sqlite3 = require('sqlite3')
const {SELF_STATCODE} = require('../constant')
let db
(async function() {
  db = await sqlite.open({
    filename: path.join(__dirname, '../data/bbs.db'),
    driver: sqlite3.Database,
  })
})()


const router = express.Router()


router.get('/:id', async (req, res, next) => {

  const {loginUser} = req.signedCookies /* 这里实际是设计为登录用户的邮箱作签名cookie */
  const {id:postId} = req.params
  let post = await db.get(` 
    SELECT p.rowid AS id, * FROM posts p
    JOIN users u
    ON id = ? AND p.userId = u.rowid
  `, postId)
  if (post) {
    /* ★★★ 这里实际可以用上连表查询 , 从而把匹配的用户头像也传递过去*/
    var cmtsOfCurPost = await db.all(`
      SELECT c.rowid AS id, * FROM comments c 
      JOIN users u
      ON c.postId = ? AND c.userId = u.rowid
    `, postId)
  }
  // /* temp */console.log('当前帖子评论', cmtsOfCurPost,/* '所有帖子', comments */);
  post ?
    res.render('post_comments.pug', {post, comments: cmtsOfCurPost, loginUser, user: req.user, vm: req.cookies.vm/* 服务于header.pug */})
    :
    res.status(404).render('notfound.pug')

  /* 更新帖子的历史浏览量 clicks */
  let result = await db.run(`
    UPDATE posts SET clicks = ? 
    WHERE posts.rowid = ?
  `, ++post.clicks, postId)
  console.log('[update post-clicks]', result);
})

router.delete('/:postId', async (req, res, next) => {
  const {postId} = req.params
  if (!req.user) {
    res.status(401).json({
      msg: '登陆后才允许执行删除自己评论的操作',
      code: SELF_STATCODE.ERR_LOGIN,
    })
    return 
  }
  const post = await db.get(`
    SELECT * FROM posts WHERE rowid = ?
  `, postId)
  if (!post || post.userId !== req.user.id) {
    res.status(401).json({
      msg: '无此删除权限',
    })
  }
  await db.run(`
    DELETE FROM posts WHERE rowid = ?
  `, postId)
  res.end()
})

module.exports = router
