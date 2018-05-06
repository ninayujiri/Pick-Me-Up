// let detailsData;

// function generateDetails(orderObj){

//   const $row        = $("<tr>").addClass("table-details");
//   const $dishName   = $("<td>").text(orderObj.dish_name);
//   const $quantity   = $("<td>").text(orderObj.quantity);
//   const $button     = $("<button>").addClass("btn btn-secondary").text('Send SMS');

//   $row.append($dishName, $quantity, $button);

//   return $row;
// };


// function renderDetails(detailsData){
//   const username = Object.keys(detailsData)[0];
//   $.each(detailsData[username].dishes, function(index, value){
//     $("tbody").append(generateDetails(value));
//   })
// }



// $.get("/restaurants/1/orders/1/fetch", function(res){
//   detailsData = res;
//   // console.log(detailsData);
// })
// .done(function(){
//   $(function(){
//     renderDetails(detailsData);
//   });
// })
// .fail(function(err){
//   console.log(err);
// })

