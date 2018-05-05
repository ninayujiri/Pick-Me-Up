// let detailsData;

function generateDetails(orderObj){

// console.log(orderObj.dishes[0].dish_name);

  const $row        = $("<tr>").addClass("table-details");
  const $dishName   = $("<td>").text(orderObj.dish_name);
  const $quantity   = $("<td>").text(orderObj.quantity);
  const $button     = $("<button>").addClass("btn btn-secondary").text('Send SMS');

  $row.append($dishName, $quantity, $button);

  return $row;
};


function renderDetails(detailsData){
  // console.log(detailsData['Elrich Bachman'].dishes);
  const username = Object.keys(detailsData)[0];
  console.log(username);
  $.each(detailsData[username].dishes, function(index, value){
    $("tbody").append(generateDetails(value));
  })
}


$.get("/restaurants/1/orders/1/fetch", function(res){
  detailsData = res;
  // console.log(detailsData);
})
.done(function(){
  $(function(){

    renderDetails(detailsData);
    // renderDetails(detailsData.dishes[0]);
  });
})
.fail(function(err){
  console.log(err);
})
