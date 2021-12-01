$(document).ready(function(){

    $('#url-slidedown').hide();
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
               $('#url-slidedown').show();
            },
            error: function(error){

            }
        })
    })
});

