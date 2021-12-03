// $(document).ready(function(){
//   $('.response-list').hide();
//   $('#response-submit').submit(function(event) {
//           //post the data to the form
//       const $data = $(this).serialize();
//       event.preventDefault();
//       console.log($data)
//       $.ajax({
//           url:`/invite`,
//           data: $data,
//           method: "POST",
//           success: function(result){
//              console.log(result)
//              event.preventDefault();
//              $('.response-list').show();
//              window.location.reload();
//              console.log('>>>>>>>>>>>>>>HELLO WORLD', result.data);
//             // setTimeout(() => {
//             //   window.location.href = `/invite/${result.data}`
//             // }, 5000)
//           },
//           error: function(error){

//           }


//       })
//   })

//     $('.fa-clipboard').click(function(){

//     })
// });

