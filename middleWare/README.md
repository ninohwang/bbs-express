自定义的合乎express框架的中间件（函数）

基于 cookie 的情况1：登陆成功后下发的签名cookie;
情况2：无论登陆成功与否，标识不同浏览器的sessionID (有服务端维护一份sessionMap);

---
更规范写法： 
  中间件这些，并不要有大写字母，参考第三方库的命名要求（npm不允许大写）
  session-middleware 对于cookieSessionId有适当修改
  
  且体现在 express框架中：
  前者 `app.use(session-middleware())` 
  后者 `app.use(cookieSessionId)`
  实际前者更合适
