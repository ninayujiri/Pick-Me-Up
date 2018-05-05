$( document ).ready(function(){

  let foods = new Object();
  $('#reset').on('click', function(){
    setReset();
    foods = new Object();
  });

  /* start processing on click */
  $(document).on("click",".add-foods",function(){
  const data      = $(this).data();          // defined data in button
  const quantity  = $(data.id).val();        // selected quqntity
  const sub_total = Math.round(data.price * quantity);  // price x quantity
  foods[data.number] = new Object();  // reset same menu
  foods[data.number] = {
      'name':data.name,
      'price':data.price,
      'quantity': quantity,
      'sub_total':sub_total,
      'id':data.number
   };
   cart_open();

  });

  /* create html for the contents of the cart */
    const cart_open = function(){
    //$("#foods-list").html('');
    let html = '<ul id="cart-contents" class="list-group mb-3">';
    let key;
    let total = 0;
    for (key in foods){
      html  += '<li class="list-group-item d-flex justify-content-between lh-condensed"><div><h6 class="my-0">'+foods[key].name+' <br /><small class="text-muted">Quantity: '+foods[key].quantity+'</small></div><span class="text-muted"> $'+comma( foods[key].sub_total )+'</span></li>';
      total += foods[key].sub_total;
    }
    html += '<li class="list-group-item d-flex justify-content-between"><span>Total (USD)</span><strong>$'+comma( total )+'</strong></li>';
    html += '</ul>';

    const cartContents = getCartContents(foods);
    $("#foods-list").html(html); //add html to the top of the cart.
    //$("#cart-detail").fadeIn();    //open the cart.
    //$("#data").val(data);        //set POST[data] with cart contents

    $('#order').on('click',function(e){
      e.preventDefault();
      let validation = false;
      const user = $('#user').val();
      const phoneNum = $('#phoneNum').val();

      if(!user || !phoneNum){
        processError();
      } else {
        const output = getCartInfo(foods, user, phoneNum);
        $.ajax({
          url: '/orders',
          method: 'PUT',
          data: output,
          success: function(data, status, jqXHR){
            if (status !== 'success') {
              $errorMsg = 'There was an error. Please try again.';
              throw 'Request was not a success';
            } else {
              $('#go-cart').fadeout();
            }
          }
        })
      }
    });
  }

});

function comma(num) {
  return num.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,' );
}

  function getCartContents(dishes) {
    const $cart = $('<ul id="cart-contents" class="list-group mb-3">');
    let total = 0;
    for (let key in dishes) {
      const $li = $('<li class="list-group-item d-flex justify-content-between lh-condensed">').text(comma (total) ).appendTo($cart);
      const $div = $('<div>').appendTo($li);
      const $h6 = $('<h6 class="my-0">').text(dishes[key].name).appendTo($div);
      const $br = $('<br />').appendTo($h6);
      const $small = $('<small class="text-muted">').text('Quantity: ' + dishes[key].quantity).appendTo($h6);
      const $span = $('<span class="text-muted">').text(comma( dishes[key].sub_total ));
      total += dishes[key].sub_total;
    }
    const $li2 = $('<li class="list-group-item d-flex justify-content-between">').appendTo($cart);
    const $span2 = $('<span>').text('Total (USD)').appendTo($li2);
    const $strong2 = $('<strong>').text(comma( total )).appendTo($li2);
    return $cart;
  }

  function getCartDefault() {
    const $cart = $('<ul id="cart-default" class="list-group mb-3">');
    const $li = $('<li class="list-group-item d-flex justify-content-between lh-condensed">').appendTo($cart);
    const $div = $('<div>').appendTo($li);
    const $h6 = $('<h6 class="my-0">').text('No dish selected').appendTo($div);
    const $br = $('<br />').appendTo($h6);
    const $small = $('<small class="text-muted">').text('Quantity: 0').appendTo($h6);
    const $span = $('<span class="text-muted">').text('$0').appendTo($li);
    const $li2 = $('<li class="list-group-item d-flex justify-content-between">').appendTo($cart);
    const $span2 = $('<span>').text('Total (USD)').appendTo($li2);
    const $strong2 = $('<strong>').text('$0').appendTo($li2);
    return $cart;
  }

  function getCartInfo(menu, user, phone){
    let output = {};
    let orderInfo = [];
    for (let key in menu) {
      orderInfo.push({'dish_id': parseInt(menu[key].id),'quantity': parseInt(menu[key].quantity)});
    }
    //console.log(orderInfo);
    output = {
      'userName': user,
      'phone_number': phone,
      'dishes': orderInfo
    }
    console.log(output);
    return output;
  }

  function processError(){
    //$('.form-group').addClass('has-warning');
    $('.error').fadeIn(1000);
    $('#user, #phoneNum').on('keyup', function(){
      $('.error').fadeOut();
    });
  }

  function setReset(){
      const cartDefault = getCartDefault();
      $('#cart-contents').replaceWith(cartDefault);
      $('#user, #phoneNum').val('');
      $('#cart-contents').empty();
  }

