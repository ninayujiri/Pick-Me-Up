let orderData;


function generateTableRow(orderObj){
  const $row          = $("<tr>").addClass("table-success");
  const $orderNumber  = $("<td>").text(orderObj.id);
  const $customerName = $("<td>").text(orderObj.name);
  const $phoneNumber  = $("<td>").text(orderObj.phone_number);
  const $timePlaced   = $("<td>").text(moment(orderObj.created_at).format('MMMM Do YYYY, h:mm:ss a'));
  const $dishName     = $("<td>").text(orderObj.dish_name);
  const $quantity     = $("<td>").text(orderObj.quantity);
  const $status       = $("<td>").append($("<span>").addClass("status").text("Pending"));
  const $button       = $("<button>").css("height", "60px");

  $row.append($orderNumber, $customerName, $phoneNumber, $timePlaced, $dishName, $quantity, $status);
  return $row;
};

function checkIsClient(orderObj){

}

function renderRows(orderData){
  $.each(orderData, function(index, value){
    $("tbody").append(generateTableRow(value))
  })
}


$.get("/restaurants/1/orders/fetch", function(res){
  orderData = res;
  console.log(orderData);
})
.done(function(){
  $(function(){
    renderRows(orderData);
  });
})
.fail(function(err){
  console.log(err);
})

