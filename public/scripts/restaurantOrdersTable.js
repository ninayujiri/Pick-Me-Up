// Generate Orders Table
function generateTableRow(orderObj) {
  const $row          = $("<tr>").addClass("table-white");
  const $orderNumber  = $("<td>").addClass("order_id").append($("<a>").text(orderObj.id).attr("href",`http://localhost:8080/restaurants/1/orders/${orderObj.id}`));
  const $customerName = $("<td>").text(orderObj.name);
  const $phoneNumber  = $("<td>").addClass("phone_number").text(orderObj.phone_number);
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


// function reloadPage() {
//   location.reload();
// }

// $(document).ready(function(){
//   loadOrders();

//   $('div').on('click', 'button', function (event) {

//     $(this).parent().remove();
//   });
// });


// setInterval(function(){
//  location.reload();
// }, 10000);



$(document).ready(function(){
  loadOrders();

  $('tbody').on('click', 'button', function (event) {
    let phone_number = $(this).parent().find('.phone_number').text();
    let order_id = $(this).parent().find('.order_id').text();

    event.preventDefault();

      $.ajax({
          method: 'PUT',
          url: 'http://localhost:8080/restaurants/1/orders/ready',
          data: { "phone_number": phone_number, "order_id": order_id }
        })
        .done(function (data) {
          console.log('sent');
      });

    $(this).parent().remove();
  });


  $('.reload').on('click', function (event) {
    const orderIdCells = $(this).parents().find('.order_id');
    const order_ids = [];

    $.each(orderIdCells, function(index,value){
      order_ids.push(Number($(value).text()));
    })

    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/restaurants/1/orders/refresh',
        data: { "order_id": order_ids}
      })
      .done(function (data) {
        console.log('sent');
    });

  });

});





