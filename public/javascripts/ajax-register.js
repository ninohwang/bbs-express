window.onload = function () {
  /* Bootstrap Alert Style */
  function getBsAlert(alertClass, msg) {
    return `
      <div id='alert1' class="alert ${alertClass} alert-dismissible fade show" role="alert">
        <strong>${msg}!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
  }

  $("#registerForm").submit(function (e) {
    const $form = $(this)
    const url = $form.attr('action')

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
        document.onclick = () => {
          window.location.href = res.next
        }
        return new Promise(() => { })
      })
      .catch(rej => {
        const { code, msg } = rej.responseJSON
        let alertClass = 'alert-secondary'
        if (code === 10013) alertClass = 'alert-danger'
        $("#myAlert").append(getBsAlert(alertClass, msg))
        $("#submit-btn").addClass('disabled')
      })
      .then(() => {
        const alertOne = new bootstrap.Alert($('#alert1')[0]) /* `$('#alert1')[0]`返回实际的DOM元素 */
        let inputs = $form.find('input')
        for (let inp of inputs) {
          $(inp).focus(() => {
            alertOne.close()
            $('#submit-btn').removeClass('disabled') /* 登录按钮不要连续点击，有点小bug */
          })
        }
      })
    return false
  })

}
