'use strict';

Product.imgOne = document.getElementById('prodOne');
Product.imgTwo = document.getElementById('prodTwo');
Product.imgThree = document.getElementById('prodThree');
Product.resultTable = document.getElementById('result');
Product.resultList = document.getElementById('list');



Product.allNames = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
Product.all = [];
Product.click = 0;
Product.current = [];
Product.previous = [];


function Product(name){
  this.name = name;
  this.source = 'image/' + this.name + '.jpg';
  this.timesClick = 0;
  this.shown = 0;
  Product.all.push(this);
}



function createObj(){
  for(var i = 0;i < Product.allNames.length; i++){
    new Product(Product.allNames[i]);
  }
}


function randomProd(){
  var randomIndex = Math.floor(Math.random() * Product.allNames.length);
  return Product.all[randomIndex];

}


//listeners
document.getElementById('prodOne').addEventListener('click',handleClick);
document.getElementById('prodTwo').addEventListener('click',handleClick);
document.getElementById('prodThree').addEventListener('click',handleClick);


function handleClick(e){
  Product.current = [];
  Product.click++;
  for(var i = 0; i < Product.all.length; i++){
    if(e.target.alt === Product.all[i].name){
      Product.all[i].timesClick++;
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
  obj.shown++;
  return false;

}



function runSurvey(){
  if(Product.click < 25){
    runOne();
    runSecond();
    runThird();

  } else{
    document.getElementById('prodOne').removeEventListener('click',randomProd);
    document.getElementById('prodTwo').removeEventListener('click',randomProd);
    document.getElementById('prodThree').removeEventListener('click',randomProd);
    console.log(Product.click);
    // renderTable();
    renderList();
  }
}





function runOne(){
  var first = randomProd();
  Product.imgOne.src = first.source;
  Product.imgOne.alt = first.name;
  Product.current.push(first);
}

function runSecond(){
  var second = randomProd();
  if(!testObj(second,Product.current)){
    Product.imgTwo.src = second.source;
    Product.imgTwo.alt = second.name;
    Product.current.push(second);
  } else{
    runSecond();
  }
}

function runThird(){
  var third = randomProd();
  if(!testObj(third,Product.current)){
    Product.imgThree.src = third.source;
    Product.imgThree.alt = third.name;
    Product.current.push(third);
  } else{
    runThird();
  }
}

function renderList(){

  for(var i = 0; i < Product.all.length; i++){

    var liEl = document.createElement('li');
    liEl.textContent = Product.all[i].timesClick + ' votes for the ' + Product.all[i].name;
    Product.resultList.appendChild(liEl);

  }
}



// function renderTable(){
//   var trEl = document.createElement('tr');
//
//   var thEl = document.createElement('th');
//   thEl.textContent = 'NAME';
//   trEl.appendChild(thEl);
//
//   thEl = document.createElement('th');
//   thEl.textContent = '# OF TIME CLICKED'
//   trEl.appendChild(thEl);
//
//   thEl = document.createElement('th');
//   thEl.textContent = 'RATIO';
//   trEl.appendChild(thEl);
//
//   Product.resultTable.appendChild(trEl);
//
//   for(i = 0; i < Product.all.length; i++){
//     trEl = document.createElement('tr');
//     var tdEl = document.createElement('td');
//     tdEl.textContent = Product.all[i].name;
//     trEl.appendChild(tdEl);
//
//     tdEl = document.createElement('td');
//     tdEl.textContent = Product.all[i].timesClick;
//     trEl.appendChild(tdEl);
//
//     Product.resultTable.appendChild(trEl);
//   }
//
// };






createObj();
runSurvey();
