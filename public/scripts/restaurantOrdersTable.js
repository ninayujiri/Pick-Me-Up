// Generate Orders Table
function generateTableRow(orderObj) {
  const $row          = $("<tr>").addClass("table-white");
  const $orderNumber  = $("<td>").append($("<a>").text(orderObj.id).attr("href",`http://localhost:8080/restaurants/1/orders/${orderObj.id}`));
  const $customerName = $("<td>").text(orderObj.name);
  const $phoneNumber  = $("<td>").text(orderObj.phone_number);
  const $timePlaced   = $("<td>").text(moment(orderObj.created_at).format('MM/DD, h:mm A'));
  const $button       = $("<button>").addClass("btn-sm btn-secondary mt-2 ml-2").text("Send SMS");


  $row.append($orderNumber, $customerName, $phoneNumber, $timePlaced, $button);
  return $row;
};


// Render the new rows in the table
function renderRows(orderData) {
  $.each(orderData, function(index, value) {
    $("tbody").append(generateTableRow(value))
  })
}

//Fetch the orders from the DB
// $.get("/restaurants/1/orders/fetch", function(res) {
//   orderData = res;
// })
// .done(function(){
//   $(function(){
//     renderRows(orderData);
//   });
// })
// .fail(function(err){
//   console.log(err);
// })


//Load the orders from database
function loadOrders() {
  $.get("/restaurants/1/orders/fetch", function(res) {
    orderData = res;
  })
  .done(function(){
    $(function(){
      renderRows(orderData);
    });
  })
  .fail(function(err){
    console.log(err);
  })
}


function reloadPage() {
  location.reload();
}

$(document).ready(function(){
  loadOrders();

  $('div').on('click', 'button', function (event) {

    $(this).parent().remove();
  });
});





// $(document).ready(function(){
//   $('tbody').on('click', 'button', function (event) {
//     let phone_number = $(this).parent().find(".phone_number").text();
//     event.preventDefault();
//       $.ajax({
//           method: 'PUT',
//           url: '/:restaurantID/orders/ready',
//           data: {"phone_number": phone_number}
//         }).done(function () {
//           console.log('done');
//       });
//     $(this).parent().remove();
//   });
// });



