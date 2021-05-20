//- debugger
$("#post2allCmts").submit(function (event) {
  // event.preventDefault();/* 效果等价末行的return false */
  const $form = $(this)
  const url = $form.attr('action')

  //#region 原本错误写法
  //- let richTextSerialize = encodeURI(`richtextcmt=${($('.ck-content')[0].innerHTML).toString()}`)
  // let richTextSerialize = encodeURI(`richtextcmt=${window.editor.getData()}`)
  // let data2server = $form.serialize() + '&' + richTextSerialize
  // console.log(data2server)

  //- $.post(url, data2server)
  //-   .then( () => {
  //-     $(".comments-list").append(`
  //-       <li class="list-group-item">
  //-         <div class="row mb-3">
  //-           <a class="col flex-grow-0 flex-shrink-0" href="/users/5">
  //-             <img class="post-avatar rounded-circle" style="border:3px solid ${nowLoginUser.bdcolor}" width="30" height="30" src="/upload/user_avatar/${nowLoginUser.avatar}"/>
  //-           </a>
  //-           <div class="col">
  //-             <small><a href="/users/1">${nowLoginUser.nickname}</a> 回复于 ${new Date().toLocaleString()}</small>
  //-             <br/>
  //-             <div class="rich-text">
  //-               ${$('.ck-content')[0].innerHTML}
  //-             <div>
  //-           </div>
  //-         </div>
  //-       </li>
  //-     `)
  //-     // $cmtInp.val('')
  //-     $('.ck-content')[0].innerHTML = '<p><br data-cke-filler="true"></p>'
  //-   } )
  //#endregion

  const richtextcmt =  window.editor.getData()

  const dataInJson = `{"postId":"${$('#postId').val()}", "richtextcmt":"${richtextcmt}"}`

  /* 如下禁止提交空评论 */
  richtextcmt && $.ajax({
    url,
    type: 'post',
    cache: false,
    processData: false,
    // contentType: false, /* 如此 请求体数据 或需要由第三方库如multer解析出请求体 */
    contentType: 'application/json',
    dataType: 'json',
    data: dataInJson,
  }).then(() => { /* 后端有响应status(200) 也才会触发此回调 */
    $(".comments-list").append(`
        <li class="list-group-item">
          <div class="row mb-3">
            <a class="col flex-grow-0 flex-shrink-0" href="/users/5">
              <img class="post-avatar rounded-circle" style="border:3px solid ${nowLoginUser.bdcolor}" width="30" height="30" src="/upload/user_avatar/${nowLoginUser.avatar}"/>
            </a>
            <div class="col">
              <small><a href="/users/1">${nowLoginUser.nickname}</a> 回复于 ${new Date().toLocaleString()}</small>
              <br/>
              <div class="rich-text">
                ${richtextcmt}
              <div>
            </div>
          </div>
        </li>
  `)
    window.editor.setData("")
  })
  return false
})
