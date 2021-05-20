// $().submit(function(evt) {
//   const $form = $(this)
//   const url = $form.attr('action')
//   console.log('@@@@');
//   window.localStorage.setItem('client_vm', $('#vm').val() ?? 't')
// })

//- 借助此（实际localStorage） 让view-mode的select框 在请求到页面时框内就能够实时显示 帖子排序模式 （可通过注释下行看效果！）
window.onload = function() {
  $('#postsViewModeForm').submit(function(evt) {
    localStorage.client_vm = $('#vm').val()
  })
  $('#vm').val(`${localStorage.client_vm ?? 'disabled'}`)
}
