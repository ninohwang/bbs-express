const express = require('express')
const sqlite = require('sqlite'), sqlite3 = require('sqlite3')
const path = require('path')
const cookieParser = require('cookie-parser')
const sessionMiddleware = require('./middleWare/session-middleware')
const signedCookieMountReq = require('./middleWare/signed-cookie-mount-req')

const {
  registerRouter,
  login,
  logout,
  post_comments: commentsRouter,
  all_comments: allcmtsRouter,
  add_post: addPostRouter,
  captcha,
  userDetail,
  edit_profile: editProfile,
  pwdForgotRouter,
  pwdResetRouter,
  activateEmailRouter,
  delPostRouter,
}
  = require('./routes')

/* temp */ const { PORT, IPADD, PAGE_SIZE, map4vm } = require('./constant')

let db
let dbPromise = sqlite.open({
  filename: path.resolve(__dirname, './data/bbs.db'),
  driver: sqlite3.Database,
})
  ; (async function () {
    db = await dbPromise
  })()

const app = express()

/* 隐藏服务端搭建框架 */
app.set('x-powered-by', false)

/* 声明模板引擎文件所在文件夹 */
app.set('views', path.resolve(__dirname, 'templates'))
app.locals.pretty = true

//#region 另一模板引擎hbs的使用 (未声明路径的情况下，也去声明的模板引擎文件所在文件夹下找)
const hbs = require('hbs')
app.engine('hbs', hbs.__express)
app.get('/demo4hbs', (req, res, next) => {
  res.render('test.hbs', { name: 'kiki', favor: 'piano and lol' })
})
//#endregion

/* 如下两行 对请求体做解析的 */
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // 让其能解析扩展URL编码的

/* 允许服务端解析Cookie; gz: 感觉这个第三方库一方面是能够解析签了名的cookie,同时也允许通过形参处的字符串而实现对cookie的签名 */
app.use(cookieParser('secret4cookie'))

/* 声明【静态文件】位置 */
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/upload', express.static(path.resolve(__dirname, 'upload')))
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.use('/public/stylesheets', express.static(path.resolve(__dirname, 'public/stylesheets')))
app.use('/public/javascripts', express.static(path.resolve(__dirname, 'public/javascripts')))

//#region 如下的静态文件发送暂时失败
// TODO 
// app.get('/demo', (req, res) => {
//   res.sendFile('demo.html')
// })
//#endregion

app.use((req, res, next) => {
  console.log('------------------▼▼▼---------------------');
  console.log(`[req]cookies:`, req.cookies) /* 未签名和签名的cookie是分开的 */
  console.log(`[req]signedCookies:`, req.signedCookies);
  console.log('[req]method:', req.method, '; url:', req.url, '; host:', req.get('HOST'));
  req.method === 'POST' ? console.log(`---[req]body:`, req.body) : null

  // /* temp 挂上db到请求体 */ req.database = db
  next()
})

//#region 旧：将sessionID自定义中间件写在主函数中
// const {nanoid} = require('nanoid')
// const {MAX_AGE_SESSION} = require('./constant')
// /* sessionMap 作为全局对象的必要性： 对于不同的req实例，都能通过req.session=sessionMap[sid]访问到同份映射 */
// const sessionMap = Object.create(null)/* session 存储的服务端的原理由此一瞥，服务端维护一份sessionMap(sid 与(...如captcha)的映射) */
// app.use( (req, res, next) => {
//   if (req.cookies.sessionID) { //一般用于埋sessionID 的下发cookie，不需签名
//     const sid = req.cookies.sessionID
//     if (!sessionMap[sid]) sessionMap[sid] = {} /* TODO 每次重启服务端时，sessionMap即重建 */
//     req.session = sessionMap[sid]
//   } else {
//     const sid = nanoid()
//     res.cookie('sessionID', sid, {
//       maxAge: MAX_AGE_SESSION,
//     })
//     req.session = sessionMap[sid] = {} /*vital： 也挂在req.session上,而后便于访问 */
//   }
//   next()
// })
//#endregion
app.use(sessionMiddleware())

//#region [db 使用时机]
/* 对上面的中间件封装，不过暂时报错 
猜想： 其余各处能正常执行db.get/run 是因为express中间接到的是个函数，而不是一个返回（req,res,next）函数的中间件函数调用，
前者尽管函数体里有db（database）, 不过可能【使用时机】是在 express框架 最后把各个use 都整合成一个 原生node 的http.createServer(cb)才使用其db。
？？那么有办法为中间件函数传入可使用的db吗 ——
  1，直接把数据库挂到app上 （后续通过相关字段访问到）；
  2，把sqlite.open()的promise对象传递过去;
  3 , db挂到req上 (缺陷：不过数据库一般很大，如果挂在请求体上....)
*/
//#endregion
app.use(signedCookieMountReq(dbPromise, {
  tableName: 'users',
  cookieField: 'loginUser', /* 作用： 查询到loginUser邮箱匹配到的数据库的条目， 分配到req.user上 */
  reqField: 'user',
  dbvalues: 'email, avatar, createAt, bdcolor, nickname, salt',
}))

app.use((req,res, next) => {
  if (!req.cookies.vm) res.cookie('vm', 'h', {})
  next()
})

/* TODO - app.get('/:category') 以类别浏览 */
app.get('/', async (req, res, next) => {
  let page = +(req.query.p ?? '1')
  let vm = req.query.vm ?? 'h'
  if (vm == 'undefined') vm='h'
  
  res.cookie('vm', vm,{}) /* 如此可能不是规范操作，因为频繁的跟新cookie */
  
  console.log('[req-query!!！]',req.query);
  console.log("req.cookies",req.cookies);
  /* 浏览最多排最前 ORDER BY p.clicks DESC*/let hotView = req.query.hot
  const posts = await db.all(`
    SELECT p.rowid AS id,  * FROM posts p 
    LEFT JOIN users u
    ON p.userId = u.rowid
    ORDER BY ${map4vm[vm]} DESC
    LIMIT ?, ?`,
    (+page - 1) * PAGE_SIZE, PAGE_SIZE
  )
  const postsCou = await db.get(`SELECT count(rowid) as cou FROM posts `)

  

  res.render('index.pug', {
    posts,
    user: req.user,
    pageInfo: {
      curPage : page,
      pagesCou: Math.ceil(postsCou.cou / PAGE_SIZE)
    },
    vm: req.cookies.vm ?? 'h'
  })
})

app.get('/tnr', (req, res, next) => {
  const { loginUser } = req.signedCookies
  let html = '<h1>hello WORLD</h1>'

  res.type('html')
  res.write(`<nav>
    <a href='/'>首页</a>
    ${!loginUser ?
      `<a href='/login'>登录</a>
        <a href='/register'>注册</a>` :
      `<span>hi, ${loginUser}</span><a href='/logout/?next=${req.originalUrl}'>登出</a>`
    }
  </nav>`)
  res.end(html) /* 用send发送数据比end更规范，但前面有type/write，这里用end收尾才能不报错 */
})

app.post('/tnr', (req, res, next) => {
  const {name, age} = req.body
  res.status(200).json({
    reply: `fuck off! ${name} ---> ${age}`,
    code: 42,
  })
})

/*实际如此使用 router 中间件不合规范！！*/
app.use('/register', registerRouter)
app.use('/active-email', activateEmailRouter)
app.use('/login', login)
app.use('/logout', logout)
app.use('/posts', commentsRouter) /* 删除操作也在此 del posts/:id */
app.use('/allcmts', allcmtsRouter)
app.use('/addpost', addPostRouter)
app.use('/captcha', captcha)
app.use('/users', userDetail)
app.use('/edit-profile', editProfile)
app.use('/pwd-forgot', pwdForgotRouter)
app.use('/pwd-reset', pwdResetRouter)

app.use((err, req, res, next) => { //错误的捕获；若无此，可能输出一大片报错
  console.log("@err@", err)
})


const server = app.listen(PORT, IPADD, () => {

  /* TODO temp db挂到App上 */ dbPromise.then(db => app.locals.database = db)
  const { address, port } = server.address()
  console.log(`listening --> http://${address}:${port}`);
})
