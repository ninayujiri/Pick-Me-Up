// $(function(){
//   console.log("clicked!");
 //  var foods = new Object();
 //  /* start processing on click */
 // $('.card-body button').on('click',".add-foods",function(){
 //   var data      = $(this).data();          //defined data in button
 //   var quantity  = $(data.id).val();        //selected quqntity
 //   var sub_total = data.price * quantity;  //price x quantity

 // // define obj
 //   foods[data.number] = new Object();  //同じ商品を初期化 reset same menu
 //   foods[data.number] = {
 //      'name':data.name,
 //      'price':data.price,
 //      'sub_total':sub_total
 //   };
 //   cart_open();

 //  });

 //  /* create html for the contents of the cart */
 //  var cart_open = function(){
 //    $("#food_list").html('');

 //    var html = '<ul>';
 //    var key;
 //    var total = 0;
 //    for (key in foods){
 //      html  += '<li>'+foods[key].name+' QTY:'+foods[key].quantity+' &nbsp;&nbsp;'+comma( foods[key].sub_total )+'Total(USD)</li>';
 //      total += foods[key].sub_total;
 //    }
 //    html += '</ul>';
 //    html += '<div id="total">Total: (USD)'+comma( total )+'</div>';

 //    // It's an obj and cannot POST - change it to JSON here.
 //    var data = JSON.stringify(foods);

 //    $("#foods_list").html(html); //add html into top the cart.
 //    $("#cart_detail").show();    //open the cart.
 //    $("#data").val(data);        //set POST[data] with cart contents

 //  }
 //    /* POST the form */
 //    $(document).on('click',"#go_cart a",function(){
 //      document.form.submit();
 //    });

 //  /* Close the cart */
 //    $(document).on('click',"#close_cart span",function(){
 //      $("#cart_detail").hide();
 //    });

// });

// function comma(num) {
//       return num.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,' );
// }


