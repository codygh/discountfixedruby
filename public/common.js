var app_url = '4d5eaf917cd3.ngrok.io';
var discounts = false;
$(document).ready(function(){
  //product page
  if(window.location.href.indexOf('/products/') >= 0){
    //send request to server to get discount list
    getDiscounts(product).then( result => {
      discounts = result;
      modifyProductPage();
    });
  }
  //cart page
  else if(window.location.href.indexOf('/cart') >= 0){
    //modify checkout button 
    $('input[name=checkout]').attr('type','button');
    $('input[name=checkout]').click(()=>{
        //send request to server to calculate and generate discount
        getCart().then(cart => {
          console.log(cart);
          checkout(cart).then(result => {
            console.log(result);
            if(result.discount_code != undefined){
              $(location).attr('href','/checkout?discount='+result.discount_code);
            }else{
              $(location).attr('href','/checkout');
            }
          });
        })
    });
  }
});

function modifyProductPage(){
  if(discounts.length == 0){
    return;
  }

  var container = $(document.createElement('div'));
  container.css('background','rgba(192,188,182,0.1)');
  container.insertBefore('.product-single__description');

  var text = $(document.createElement('p'));
  text.text('This is the dynamic section add by custom app:');
  container.append(text);

  text = $(document.createElement('p'));
  text.text('Offer only for you if you buy this product:');
  container.append(text);

  for (let i = 0; i < discounts.length; i++) {
    const discount = discounts[i];
    for (let j = 0; j < discount.get_products.length; j++) {
      const get_product = discount.get_products[j];
      text = $(document.createElement('p'));
      text.text('- ' + get_product.title +" - $"+ discount.offer_value + ' off.');
      container.append(text);
    }
  }
}

function getDiscounts(product){
  return new Promise(
    (resolve, reject) => {
      fetch('https://'+app_url +'/api/client/discounts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: product.id})
      }).then((resp) => {
        resolve(resp.json())
      }).catch((error) => {
        reject(error)
      })
    }
  )
};

function checkout(cart){
  return new Promise(
    (resolve, reject) => {
      fetch('https://'+app_url +'/api/client/checkout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
      }).then((resp) => {
        resolve(resp.json())
      }).catch((error) => {
        reject(error)
      })
    }
  )
};

getCart = ()=>{
  return new Promise(
    (resolve, reject) => {
      fetch('/cart.js', {
        method: 'GET',
        credentials: 'same-origin',
      }).then((resp) => {
        resolve(resp.json())
      }).catch((error) => {
        reject(error)
      })
    }
  )
};