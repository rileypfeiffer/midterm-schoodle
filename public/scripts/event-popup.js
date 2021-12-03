$(document).ready(function(){
  $('#createdURL').hide();
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
             $('#url-slidedown').text(result.data);
             $('#createdURL').show();
            //  $('#url-slidedown').text(`URL CREATED, localhost:8080/invite/${result.data}`);
            //  $('#url-slidedown').css({"visibility":"visible","display":"block"});
             $('#createdURL').text(`URL CREATED, COPY TO SHARE, OR CLICK HERE TO BE REDIRECTED`)
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
});
