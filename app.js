'use strict';

Product.imgOne = document.getElementById('prodOne');
Product.imgTwo = document.getElementById('prodTwo');
Product.imgThree = document.getElementById('prodThree');



Product.allNames = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
Product.all = [];
Product.click = 0;
Product.current = [];
Product.previous = [];


function Product(name){
  this.name = name;
  this.source = 'image/' + this.name + '.jpg';
  this.timesShown = 0;
  Product.all.push(this);
}


for(var i = 0;i < Product.allNames.length; i++){
  new Product(Product.allNames[i]);
}




function randomProd(){
  var randomIndex = Math.floor(Math.random() * Product.allNames.length);
  // Product.all[randomIndex].timesShown += 1;
  return Product.all[randomIndex];

}


document.getElementById('prodOne').addEventListener('click',handleClick);
document.getElementById('prodTwo').addEventListener('click',handleClick);
document.getElementById('prodThree').addEventListener('click',handleClick);


function handleClick(e){
  Product.current = [];
  Product.click++;
  for(var i = 0; i < Product.all.length; i++){
    if(e.target.alt === Product.all[i].name){
      Product.all[i].timesShown++;
    }
  }
  runSurvey();
}


function testObj(obj,a) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}



function runSurvey(){
  if(Product.click < 25){
    runOne();
    runSecond();
    runThird();
    Product.previous = Product.current;

  } else{
    document.getElementById('prodOne').removeEventListener('click',randomProd);
    document.getElementById('prodTwo').removeEventListener('click',randomProd);
    document.getElementById('prodThree').removeEventListener('click',randomProd);
    console.log(Product.click);
  }
}





function runOne(){
  var first = randomProd();
  if(!testObj(first,Product.previous)){
    Product.imgOne.src = first.source;
    Product.imgOne.alt = first.name;
    Product.current.push(first);
  }
}

function runSecond(){
  var second = randomProd();
  if(!testObj(second,Product.current) && !testObj(second,Product.previous)){
    Product.imgTwo.src = second.source;
    Product.imgTwo.alt = second.name;
    Product.current.push(second);
  } else{
    runSecond();
  }
}

function runThird(){
  var third = randomProd();
  if(!testObj(third,Product.current) && !testObj(third,Product.previous)){
    Product.imgThree.src = third.source;
    Product.imgThree.alt = third.name;
    Product.current.push(third);
  } else{
    runThird();
  }
}







runSurvey();
