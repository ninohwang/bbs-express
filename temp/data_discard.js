exports.users = [{
  id: 1,
  email: 'a@163.com',
  pwd: '1111',
  gender: 'f',
  avatar: 'a.png',
}, {
  id: 2,
  email: 'b@163.com',
  pwd: '2222',
  gender: 'm',
  avatar: 'b.png',
}]

exports.posts = [{
  id: 1,
  userId: 1,
  title: 'foo',
  content: 'foobarfoo',
  timestamp: 234234234234,
  postUser: 'a@163.com',
}, {
  id: 2,
  userId: 2,
  title: '好玩吗？',
  content: '这个菜好吃吗',
  timestamp: 234234234234,
  postUser: 'b@163.com',
}, {
  id: 3,
  userId: 1,
  title: '我的发帖没有评论',
  content: 'null comment',
  timestamp: 24234234242342,
  postUser: 'a@163.com',
}]

exports.comments = [{
  id: 1,
  content: 'foo---bar---foo',
  userId: 1,
  postId: 1,
  timestamp: 234234234,
}, {
  id: 2,
  content: '好吃的。。。',
  userId: 1,
  postId: 2,
  timestamp: 2234234234,
}, {
  id: 3,
  content: '不好吃',
  userId: 2 ,
  postId: 2,
  timestamp: 2234234234,
}]
