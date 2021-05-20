const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const {
  register,
  login,
  logout,
  post_comments: commentsRouter,
  all_comments: allcmtsRouter,
}
  = require('./routes')


/* temp */ const { PORT, IPADD } = require('./constant')
/* temp */ const { users, posts } = require('./temp/data')
const app = express()

/* 隐藏服务端搭建框架 */
app.set('x-powered-by', false)

/* 声明模板引擎 */
app.set('views', path.resolve(__dirname, 'templates'))

/* 如下两行 对请求体做解析的 */
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // 让其能解析扩展URL编码的

/* 允许服务端解析Cookie; gz: 感觉这个第三方库一方面是能够解析签了名的cookie,同时也允许通过形参处的字符串而实现对cookie的签名 */
app.use(cookieParser('secret4cookie'))

//#region 如下的静态文件发送暂时失败
app.use(express.static(path.resolve(__dirname, 'static')))
app.get('/demo', (req, res) => {
  res.sendFile('demo.html')
})
//#endregion

app.use((req, res, next) => {
  console.log('------------------▼▼▼---------------------');
  console.log(`[req]cookies:`, req.cookies) /* 未签名和签名的cookie是分开的 */
  console.log(`[req]signedCookies:`, req.signedCookies);
  console.log('[req]method:', req.method, '; url:', req.url, '; host:', req.get('HOST'));
  req.method === 'POST' ? console.log(`[req]body:`, req.body) : null
  next()
})

app.get('/', (req, res, next) => {
  const { loginUser } = req.signedCookies
  let html = posts.map(
    post =>
      `<li>
        <a href='/posts/${post.id}'>
          ✨${post.title}--${post.content}
        </a>
      </li>`
  ).join('')

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

app.use('/register', register)
app.use('/login', login)
app.use('/logout', logout)
app.use('/posts', commentsRouter)
app.use('/allcmts', allcmtsRouter)




app.use((err, req, res, next) => {
  console.log("@err@", err)
})


const server = app.listen(PORT, IPADD, () => {
  const { address, port } = server.address()
  console.log(`listening --> http://${address}:${port}`);
})
