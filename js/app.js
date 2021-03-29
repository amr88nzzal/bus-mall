'use strict';
let timeCount= 25;
let imgsPaths=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
// console.log(imgsPaths);
let ProductNames=[];

let imgLeft=document.getElementById('imgL');
let lblLeft=document.getElementById('pL');
let imgMid=document.getElementById('imgM');
let lblMid=document.getElementById('pM');
let imgRight=document.getElementById('imgR');
let lblRight=document.getElementById('pR');
let imgCont=document.getElementById('imgs');
let prodLike=[];
let prodShow=[];
let prevShow=[];

/********Func. Randon Number************/
function gitRandNum(maxNum,minNum){
  let randNum= Math.floor(Math.random()*(Number(maxNum)-(Number(minNum))+1))+(Number(minNum));
  // console.log(randNum);
  return randNum;}
/**********************************/
/***********Git Product Names***********/
for (let i=0;i<(imgsPaths.length);i++){
  ProductNames.push(imgsPaths[i].split('.')[0]);
}
/**********************************/

/***********Product Constructor***********/
const Product = function(productName,imgPath,id){
  this.id=id,
  this.productName=productName,
  this.imgPath=imgPath,
  this.like=0,
  this.show=0;
  Product.all.push(this);
};
Product.all=[];
/***************************************/
/***********dif Product***********/
function defineProd(){
  for (let i=0;i<ProductNames.length;i++){
    new Product(ProductNames[i],`./assets/${imgsPaths[i]}`,i);
  // console.log(Product.all[i]);
  }
}
defineProd();

/*********************************prevShow***/
/***********pick 3 Product randomly***********/
function pickProduct(){
  // debugger;
  let pickedProdId=[];
  let randomProdId;
  for(let i=0;i<3;i++){
    while (pickedProdId.length<3){
      randomProdId=(gitRandNum(imgsPaths.length-1,0));
      if(!(prevShow.includes(randomProdId))&&!(pickedProdId.includes(randomProdId))){
        pickedProdId.push(randomProdId);
      }
    }
  }

  return pickedProdId;
}
/************************************/
let randProdId=[];
// console.log(Product.all);
function render (){
  randProdId=pickProduct();
  imgLeft.src=Product.all[randProdId[0]].imgPath;
  lblLeft.textContent=Product.all[randProdId[0]].productName;
  Product.all[randProdId[0]].show++;
  imgMid.src=Product.all[randProdId[1]].imgPath;
  lblMid.textContent=Product.all[randProdId[1]].productName;
  Product.all[randProdId[1]].show++;
  imgRight.src=Product.all[randProdId[2]].imgPath;
  lblRight.textContent=Product.all[randProdId[2]].productName;
  Product.all[randProdId[2]].show++;
  timeCount--;
  prevShow=randProdId;
// console.log(Product.all[randProdId[0]].productName+'///'+Product.all[randProdId[0]].imgPath);
}
render ();
/************************************/
/***********event***********/
imgCont.addEventListener('click',likeProd);
function likeProd (event){
  if(event.target.id!=='imgs'&& event.target.id!=='pL'&& event.target.id!=='pM'&& event.target.id!=='pR' ){
    // debugger;
    if(timeCount>=0){
      if(event.target.id==='imgL'){
        Product.all[randProdId[0]].like++;
      }else if(event.target.id==='imgM'){
        Product.all[randProdId[1]].like++;
      }else if(event.target.id==='imgR'){
        Product.all[randProdId[2]].like++;
      }
      if(timeCount>0){
        newRender ();
      }
      else{
        btnViewResults.style.display='flex';
        imgCont.removeEventListener('click',likeProd);
      }
      console.log(timeCount);
    }
    else {
      console.log(5555);
      imgCont.removeEventListener('click',likeProd);
    }
  }
}
function newRender (){
  console.table(Product.all);
  pickProduct();
  render();}

let btnViewResults =document.getElementById('btnViewResults');
btnViewResults.addEventListener('click',insertResult);
function insertResult(event){
  removeLi ();
  event.preventDefault();
  let ulEl=document.getElementById('ulResult');
  for(let i=0;i<Product.all.length;i++){
    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent=Product.all[i].productName+' had '+Product.all[i].like +' votes, and was seen '+Product.all[i].show+' times.';
    prodLike.push(Product.all[i].like);
    prodShow.push(Product.all[i].show);
  }
  chartProd();
}
function removeLi (){
  let ulElRemove=document.getElementById('ulResult');
  ulElRemove.innerHTML = '';
}


function chartProd(){
  let charCont= document.getElementById("charts");
  let ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-undef
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: ProductNames,
      datasets: [{
        label: 'Like Product Report',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: prodLike
      },{
        label: 'Show Product Report',
        backgroundColor: 'rgb(99, 99, 132)',
        borderColor: 'rgb(10, 99, 132)',
        data: prodShow
      }]
    },

    // Configuration options go here
    options: {}
  });
  charCont.style.display='flex';
}
