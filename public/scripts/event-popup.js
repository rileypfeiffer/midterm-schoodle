$(document).ready(function(){
  $('.popup').hide()
  $('#createdURL').hide();
  $('.fa-clipboard').hide();
  $('#event-form').submit(function(event) {
          //post the data to the form
      const $data = $(this).serialize();
      event.preventDefault();
      console.log($data)
      $.ajax({
          url:"/new-event",
          data: $data,
          method: "POST",
          success: function(result){
             console.log(result)
            //  $('#url-slidedown').text(result.data);
            $('#new-event').hide();
            // $('#event-form').hide();
            // $('#create-event-label').hide();
            // $('#create-event-button').hide();
             $('.popup').show();
             $('#createdURL').show();
             $('.fa-clipboard').show();
            //  $('#url-slidedown').text(`URL CREATED, localhost:8080/invite/${result.data}`);
            //  $('#url-slidedown').css({"visibility":"visible","display":"block"});
             $('#createdURL').text(`URL CREATED! Press here to be redirected, or press the clipboard to copy`)
             $('#createdURL').attr('href', `/invite/${result.data}`)
             console.log('>>>>>>>>>>>>>>HELLO WORLD', $('#createdURL').text());
            // setTimeout(() => {
            //   window.location.href = `/invite/${result.data}`
            // }, 5000)
          },
          error: function(error){

          }


      })
  })

    $('.fa-clipboard').click(function(){

    })
});
