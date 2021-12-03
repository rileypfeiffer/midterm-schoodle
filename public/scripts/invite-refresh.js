$(document).ready(function(){
  $('.response-list').hide();
  $('#response-submit').submit(function(event) {
          //post the data to the form
      const $data = $(this).serialize();
      event.preventDefault();
      console.log($data)
      $.ajax({
          url:"/invite",
          data: $data,
          method: "POST",
          success: function(result){
             console.log(result)

             $('.response-list').show();
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

