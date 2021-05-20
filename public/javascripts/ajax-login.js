// 至于这里为什么用 jquery ,而不用axios, 一方面练习下jQuery的使用，另一方面如果使用axios,则还另外需要dom元素form表单的默认行为的阻止
$('#loginForm').submit(function (event) {
  // event.preventDefault()
  const $form = $(this)
  const url = $form.attr('action')
  $.post(url, $form.serialize())
    .then((res) => {
      // window.history.back()/* 这里不能简单地history.back() ，如果从注册页跳转到登录页 */
      window.location.href = res.next /* 登陆成功如此实现跳转 */
      return new Promise(() => { }) /* 缺陷，并不能确定这里能否 阻断后面的then调用链，可能不是按照Promise的理解 */
    })
    .catch((rej) => { /* 401 等状态 在jquery 设计下即进入此 */
      const {code, msg} = rej.responseJSON
      let alertClass = 'alert-warning'
      if (code == 10011) alertClass = 'alert-danger'
      $("#myAlert").append(`
      <div id='alert1' class="alert ${alertClass} alert-dismissible fade show" role="alert">
        <strong>${msg}!</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `)
      $('#submit-btn').addClass('disabled')/* 登录按钮不要连续点击，有点小bug */
      $form.find('img#captcha-img').attr('src', `/captcha/?t=${Date.now()}`)
    })
    .then( () => {
      // 官方的 bootstrap.Alert.getInstance(node).close() 并不生效
      // let alertNode = $("#alert1")[0]
      // bootstrap.Alert.getInstance(alertNode).close()
      const alertOne = new bootstrap.Alert($('#alert1')[0]) /* `$('#alert1')[0]`返回实际的DOM元素 */
      let $inputs = [$('#inputEmail1'), $('#password1'), $('#captcha')]
      $inputs.forEach( $inp => {
        $inp.focus( () => {
          alertOne.close()
          $('#submit-btn').removeClass('disabled') /* 登录按钮不要连续点击，有点小bug */
        } )
      } )
    })
  return false
})
