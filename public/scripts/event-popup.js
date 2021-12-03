$(document).ready(function () {
  $('.popup').hide()
  $('#createdURL').hide();
  $('.fa-clipboard').hide();
  $('#event-form').submit(function (event) {
    //post the data to the form
    const $data = $(this).serialize();
    event.preventDefault();
    console.log('YOOOOOOOO', $data)
    $.ajax({
      url: "/new-event",
      data: $data,
      method: "POST",
      success: function (result) {
        console.log('RESULT GOES HERE>>>', result)
        $('#new-event').hide();
        $('.popup').show();
        $('#createdURL').show();
        $('.fa-clipboard').show();
        $('#createdURL').text(` Click here to be redirected to the event!, or press the clipboard to copy`)
        $('#createdURL').attr('href', `/invite/${result.data}`)
        req.session.url = result.data;
        console.log('>>>>>>>>>>>>>>HELLO WORLD', $('#createdURL').text());
      },
      error: function (error) {
      }
    })
  })

  $('.fa-clipboard').click(function () {
    document.execCommand("copy");
  })
});
