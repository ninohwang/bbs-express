
// 以下功能： 通过签名cookie 从数据库里查询到匹配用户
//#region  如下为原本写到主函数app.js 里的， 然后解耦为如下自定义中间件
// app.use(async (req, res, next) => {
//   const { loginUser } = req.signedCookies
//   if (loginUser) {
//     req.user = await db.get(`
//       SELECT rowid AS id, * FROM users
//       WHERE email = ?
//     `, loginUser)
//   } else {
//     req.user = null
//   }
//   next()
// })
//#endregion

/* 从数据库里找到匹配条目，并挂载到请求实例req上 */

/* 实际想和不同的数据库解耦 */

//#region ver3 app.database 【but: express 给app初始化完成后挂载的属性 如何传递给中间件， 使其能够访问到app.Field?】
// module.exports = function (options/* tableName ,cookieField, reqField */) {
//   const {tableName, cookieField, reqField} = options
//   /* how 2 access app.locals.database??? */
//   return async (req, res, next) => {
//     const search = req.signedCookies[cookieField] /* no! 解耦还是不彻底 */
//     if (search) {
//       // TODO  Cannot read property 'get' of undefined
//       req[reqField] = await database.get(`
//         SELECT rowid AS id, * FROM ${tableName}
//         WHERE email = ?
//       `, search)
//     } else {
//       req[reqField] = null
//     }
//     next()
//   }
// }
//#endregion

//#region  ver2 数据库的promise对象
module.exports = function (dbPromise, options/* tableName ,cookieField, reqField */) {
  const {tableName, cookieField, reqField, dbvalues} = options
  
  if(!dbvalues) dbvalues = '*'

  return async (req, res, next) => {
    const database = await dbPromise
    const search = req.signedCookies[cookieField] /* no! 解耦还是不彻底 */
    if (search) {
      req[reqField] = await database.get(`
        SELECT rowid AS id, ${dbvalues} FROM ${tableName}
        WHERE email = ?
      `, search)
    } else {
      req[reqField] = null
    }
    next()
  }
}
//#endregion

//#region  ver1 数据库挂在req上的
// module.exports = function (options) {
//   const {tableName, cookieField, reqField} = options
//   // const database = await dbPromise()
//   return async (req, res, next) => {
//     const {database} = req
//     const search = req.signedCookies[cookieField] /* no! 解耦还是不彻底 */
//     if (search) {
//       // TODO  Cannot read property 'get' of undefined
//       req[reqField] = await database.get(`
//         SELECT rowid AS id, * FROM ${tableName}
//         WHERE email = ?
//       `, search)
//     } else {
//       req[reqField] = null
//     }
//     next()
//   }
// }
//#endregion
