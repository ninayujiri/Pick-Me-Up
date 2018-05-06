$( document ).ready(function(){
  let foods = new Object();

  /* start cart processing on click */
  $(document).on("click",".add-foods",function(){
  const data      = $(this).data();
  const quantity  = $(data.id).val();
  const sub_total = Math.round(data.price * quantity);

  // reset same menu
  foods[data.number] = new Object();
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
    const cartContents = getCartContents(foods);

    //add html elements to the top of the cart
    $("#foods-list").html(cartContents);

    // reset cart items and name/phone# fields
    $('#reset').on('click', function(){
      setReset();
      foods = new Object();
    });
  }

  /* place an order */
  $('#order').on('click',function(e){
    e.preventDefault();
    const user = $('#user').val();
    const phoneNum = $('#phoneNum').val();
    if(!foods || !user || !phoneNum){
      processError();
    } else {
      const output = getCartInfo(foods, user, phoneNum);
      $.ajax({
        url: '/orders',
        method: 'PUT',
        cache: false,
        data: output,
        success: function(data, status, jqXHR){
          if (status !== 'success') {
            $errorMsg = 'There was an error. Please try again.';
            throw 'Request was not a success';
          } else {
            window.location.href = '/confirmation';
          }
        }
      })
    }
  });
});

function getCartContents(dishes) {
  const $cart = $('<ul id="cart-contents" class="list-group mb-3">');
  let total = 0;
  for (let key in dishes) {
    const $li = $('<li class="list-group-item d-flex justify-content-between lh-condensed">').appendTo($cart);//text(comma (total) )
    const $div = $('<div>').appendTo($li);
    const $h6 = $('<h6 class="my-0">').text(dishes[key].name).appendTo($div);
    const $br = $('<br />').appendTo($h6);
    const $small = $('<small class="text-muted">').text('Quantity: ' + dishes[key].quantity).appendTo($h6);
    const $span = $('<span class="text-muted">').text('$ ' + comma( dishes[key].sub_total )).appendTo($li);
    total += dishes[key].sub_total;
  }
  const $li2 = $('<li class="list-group-item d-flex justify-content-between">').appendTo($cart);
  const $span2 = $('<span>').text('Total (USD)').appendTo($li2);
  const $strong2 = $('<strong>').text('$ ' + comma( total )).appendTo($li2);
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
  output = {
    'userName': user,
    'phone_number': phone,
    'dishes': orderInfo
  }
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
  $('.error').fadeOut();
}

function setComplete(){
  setReset();
  $('#cart-detail').fadeOut();
  $('p.success').fadeIn();
  $(document).fadeOut();
}

function comma(num) {
  return num.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,' );
}
