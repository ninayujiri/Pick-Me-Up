$( document ).ready(function(){
  var foods = new Object();
  /* start processing on click */
 $(document).on("click",".add-foods",function(){
   var data      = $(this).data();          // defined data in button
   var quantity  = $(data.id).val();        // selected quqntity
   var sub_total = Math.round(data.price*quantity);  // price x quantity
    // define obj
    console.log('PRICE: ',data.price);
    console.log('QTY: ',quantity);
    console.log('SUB TTL: ', (data.price * quantity));
   foods[data.number] = new Object();  // reset same menu
   foods[data.number] = {
      'name':data.name,
      'price':data.price,
      'quantity': quantity,
      'sub_total':sub_total
   };
   cart_open();
  });

  /* create html for the contents of the cart */
  var cart_open = function(){
    $("#food_list").html('');

    var html = '<ul class="list-group mb-3">';
    var key;
    var total = 0;
    for (key in foods){
      html  += '<li class="list-group-item d-flex justify-content-between lh-condensed"><div><h6 class="my-0">'+foods[key].name+' <br /><small class="text-muted">Quantity:'+foods[key].quantity+'</small></div><span class="text-muted"> $'+comma( foods[key].sub_total )+'</span></li>';
      total += foods[key].sub_total;
    }
    html += '<li class="list-group-item d-flex justify-content-between"><span>Total (USD)</span><strong>$'+comma( total )+'</strong></li>';
    html += '</ul>';

    // It's an obj and cannot POST - change it to JSON here.
    var data = JSON.stringify(foods);
    $("#foods_list").html(html); //add html to the top of the cart.
    $("#cart_detail").show();    //open the cart.
    $("#data").val(data);        //set POST[data] with cart contents

  }
    /* POST the form */
    $(document).on('click',"#go_cart a",function(){
      document.form.submit();
    });

  /* Close the cart */
    $(document).on('click',"#close_cart span",function(){
      $("#cart_detail").hide();
    });
    // http://studio-key.com/1792.html
});

function comma(num) {
      return num.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,' );
}


