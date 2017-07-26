'use strict';

Product.imgOne = document.getElementById('prodOne');
Product.imgTwo = document.getElementById('prodTwo');
Product.imgThree = document.getElementById('prodThree');
Product.resultList = document.getElementById('list');
Product.imgSection = document.getElementById('imgSection')


Product.allNames = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
Product.all = [];
Product.click = 0;
Product.current = [];
Product.previous = [];
Product.clickedTimes = [];
Product.chartDrawn = false;
var prodChat;


function Product(name){
  this.name = name;
  this.source = 'image/' + this.name + '.jpg';
  this.timesClick = 0;
  this.shown = 0;
  Product.all.push(this);
}

if(localStorage.locStore || localStorage.locStore === ""){

  var get = JSON.parse(localStorage.getItem('locStore'));
  Product.all = get;

  var click = JSON.parse(localStorage.getItem('click'));
  Product.click = click;

  updateChartArrays();  //updates clickedTimes array with localStorage one

} else{
  for(var i = 0;i < Product.allNames.length; i++){
    new Product(Product.allNames[i]);
  }

}


function randomProd(){
  var randomIndex = Math.floor(Math.random() * Product.allNames.length);
  return Product.all[randomIndex];
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


function runOne(){
  var first = randomProd();
  if(!testObj(first,Product.previous)){
    Product.imgOne.src = first.source;
    Product.imgOne.alt = first.name;
    Product.current.push(first);
  } else{
    runOne();
  }

}

function runSecond(){
  var second = randomProd();
  if(!testObj(second,Product.current) && (!testObj(second,Product.previous)) ){
    Product.imgTwo.src = second.source;
    Product.imgTwo.alt = second.name;
    Product.current.push(second);
  } else{
    runSecond();
  }
}


function runThird(){
  var third = randomProd();
  if(!testObj(third,Product.current) && (!testObj(third,Product.previous))){
    Product.imgThree.src = third.source;
    Product.imgThree.alt = third.name;
    Product.current.push(third);
  } else{
    runThird();
  }
}


function runSurvey(){
  if(Product.click < 25){
    runOne();
    runSecond();
    runThird();
    Product.previous = Product.current;

  } else{
    document.getElementById('imgSection').removeEventListener('click',randomProd);
    renderChart();
    // renderList();
  }
}

function resetSurvey(){
  localStorage.clear();
  Product.click = 0;
}


function handleClick(e){
  Product.current = [];
  Product.click++;
  for(var i = 0; i < Product.all.length; i++){
    if(e.target.alt === Product.all[i].name){
      Product.all[i].timesClick++;
      updateChartArrays();
    }
  }
  runSurvey();
}

// function renderList(){
//   for(var i = 0; i < Product.all.length; i++){
//     var liEl = document.createElement('li');
//     liEl.textContent = Product.all[i].name + ' has been clicked ' + Product.all[i].timesClick + ' times and shown ' + Product.all[i].shown + ' times. ';
//     Product.resultList.appendChild(liEl);
//   }
// }

function updateChartArrays(){
  for(var i = 0; i < Product.allNames.length; i++){
    Product.clickedTimes[i] = Product.all[i].timesClick;
  }
  localStorage.setItem('locStore',JSON.stringify(Product.all));
  localStorage.setItem('click',JSON.stringify(Product.click));
}


function renderChart(){
  var ctx = document.getElementById('barChart').getContext('2d');
  Product.imgSection.replaceWith(ctx);

  prodChat = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.allNames,
      datasets: [
        {
          label: 'Votes (num)',
          backgroundColor: ['#86f6b0','#e7ff67','#fbe45d','#3e95cd','#d1f46e','#8e5ea2','#3cba9f','#e8c3b9','#c45850','#86f6b0','#e7ff67','#fbe45d','#3e95cd','#d1f46e','#8e5ea2','#3cba9f','#e8c3b9','#c45850'],
          data: Product.clickedTimes //updated with localStorage
        }        ]
    },
    options: {
      scales: {
        yAxes:[{
          ticks:{
            beginAtZero: true,
            min:0,
            max:10
          }

        }]
      },
      legend: { display: false },
      title: {
        display: true,
        text: 'BusMall Product Popularity'
      },
      events:[]
    }
  });
  Product.chartDrawn = true;
}

//listeners
document.getElementById('imgSection').addEventListener('click',handleClick);
document.getElementById('reset').addEventListener('click',resetSurvey);

if(Product.chartDrawn){
  prodChat.update();
}

runSurvey();
