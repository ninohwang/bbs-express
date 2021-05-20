window.onload = function () {
  /* Bootstrap Alert Style */
  function getBsAlert(alertClass, msg) {
    return `
      <div id='alert1' class="alert ${alertClass} alert-dismissible fade show" role="alert">
        <strong>${msg}!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
  }

  $("#editProfileForm").submit(function (e) {
    const $form = $(this)
    const url = $form.attr('action')

    let $inputs = [
      $('#nickName'),
      $('#pwd-old'),
      $('#pwd-new'),
      $('#pwd-certain'),
      $('#avatar')
    ]
    
    /* 其实也可以在前端作用户名或新密码合法性验证 */

    //#region $.post 不适用于文件上传
    // const formData = new FormData($form[0])
    // $.post(url, formData /* $form.serialize() */)
    //   .then(res => {

    //     console.log(data??101);
    //     console.log('@res',res.slice(0,19));
    //   })
    //   .catch(rej => {
    //     console.log("@rej",rej.responseJSON);
    //   })
    //#endregion

    /* 前端判断逻辑 */
    if ($("#pwd-certain").val()!==$("#pwd-new").val()) {
      console.log('交由前端判断的...');
      $('#myAlert').append(getBsAlert('alert-danger', '新密码两次输入不一致，请重试 '))
      $("#submit-btn").addClass('disabled')

      let alertOne = new bootstrap.Alert($('#alert1')[0])
      $inputs.forEach($inp => {
        $inp.focus(() => {
          alertOne.close()
          $('#submit-btn').removeClass('disabled')
        })
      })

      return false
    }

    const formData = new FormData($form[0])
    $.ajax({
      url,
      type: 'post',
      processData: false,
      contentType: false,
      cache: false,    //上传文件不需要缓存
      data: formData,
    })
      .then(res => {
        $("#submit-btn").addClass('disabled')
        $('#myAlert').append(getBsAlert('alert-success', res.msg))
        document.onclick = () =>{
          window.location.href = res.next
        }
        return new Promise(() => { })
      })
      .catch(rej => {
        const { code, msg } = rej.responseJSON
        let alertClass = 'alert-secondary'
        if (code === 10012) alertClass = 'alert-danger'
        $("#myAlert").append(getBsAlert(alertClass, msg))
        $("#submit-btn").addClass('disabled')
      })
      .then(() => {
        let alertOne = new bootstrap.Alert($('#alert1')[0]) /* `$('#alert1')[0]`返回实际的DOM元素 */
        $inputs.forEach($inp => {
          $inp.focus(() => {
            alertOne.close()
            $('#submit-btn').removeClass('disabled') /* 登录按钮不要连续点击，有点小bug */
          })
        })
      })
    return false
  })

}
