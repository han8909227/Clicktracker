'use strict';

Product.imgEl = document.getElementById('prod1');
// Product.pic2 = document.getElementById('pic2');
// Product.pic3 = document.getElementById('pic3');



Product.allNames = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
Product.all = [];


function Product(name){
  this.name = name;
  this.source = 'image/' + this.name + '.jpg';
  Product.all.push(this);
}




for(var i = 0;i < Product.allNames.length; i++){
  new Product(Product.allNames[i]);
}

// new Product('banana');


function randomProd(){
  var randomIndex = Math.floor(Math.random() * Product.allNames.length);
  Product.imgEl.src = Product.all[randomIndex].source;
  Product.imgEl.alt = Product.all[randomIndex].name;
  Product.all[randomIndex].timesShown += 1;

}

document.getElementById('prod1').addEventListener('click',randomProd);
randomProd();
