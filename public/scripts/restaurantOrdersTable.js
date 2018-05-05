// let orderData;

// Generate Orders Table
function generateTableRow(orderObj){
  // console.log(orderObj);
  const $row          = $("<tr>").addClass("table-white");
  const $orderNumber  = $("<td>").append($("<a>").text(orderObj.id).attr("href",`http://localhost:8080/restaurants/1/orders/${orderObj.id}`));
  const $customerName = $("<td>").text(orderObj.name);
  const $phoneNumber  = $("<td>").text(orderObj.phone_number);
  const $timePlaced   = $("<td>").text(moment(orderObj.created_at).format('MM/DD, h:mm a'));

  $row.append($orderNumber, $customerName, $phoneNumber, $timePlaced);
  return $row;
};


function renderRows(orderData){
  $.each(orderData, function(index, value){
    $("tbody").append(generateTableRow(value))
  })
}


$.get("/restaurants/1/orders/fetch", function(res){
  orderData = res;
  // console.log(orderData);
})
.done(function(){
  $(function(){
    renderRows(orderData);

  });
})
.fail(function(err){
  console.log(err);
})



// $(()=>{
//   console.log("works")
//       monitorEvents(document);
//   $("tbody").on("click", "button", function(){
//     console.log("clicked")
//     $.get("restaurants/1/orders/1")
//   })

// })


