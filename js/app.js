'use strict';
let timeCount= 2;
let imgsPaths=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
// console.log(imgsPaths);
let productsNames=[];

let imgLeft=document.getElementById('imgL');
let lblLeft=document.getElementById('pL');
let imgMid=document.getElementById('imgM');
let lblMid=document.getElementById('pM');
let imgRight=document.getElementById('imgR');
let lblRight=document.getElementById('pR');
let imgCont=document.getElementById('imgs');



/********Func. Randon Number************/
function gitRandNum(maxNum,minNum){
  let randNum= Math.floor(Math.random()*(Number(maxNum)-(Number(minNum))+1))+(Number(minNum));
  // console.log(randNum);
  return randNum;}
/**********************************/
/***********Git products Names***********/
for (let i=0;i<(imgsPaths.length);i++){
  productsNames.push(imgsPaths[i].split('.')[0]);
}
/**********************************/

/***********Products Constructor***********/
const Products = function(productName,imgPath,id){
  this.id=id,
  this.productName=productName,
  this.imgPath=imgPath,
  this.likes=0,
  this.show=0;
  Products.all.push(this);
};
Products.all=[];
/***************************************/
/***********dif products***********/
function defineProd(){
  for (let i=0;i<productsNames.length;i++){
    new Products(productsNames[i],`./assets/${imgsPaths[i]}`,i);
  // console.log(Products.all[i]);
  }
}
defineProd();

/************************************/
/***********pick 3 products randomly***********/
function pickProducts(){
  let pickedProdId=[];
  let randomProdId=(gitRandNum(imgsPaths.length-1,0));
  for(let i=0;i<3;i++){
    if(pickedProdId.includes(randomProdId)){
      randomProdId=(gitRandNum(imgsPaths.length-1,0));
      i--;}
    else{
      pickedProdId.push(randomProdId);

      randomProdId=(gitRandNum(imgsPaths.length-1,0));
    }}

  return pickedProdId;
}
/************************************/
let randProdId=[];
// console.log(Products.all);
function render (){
  randProdId=pickProducts();
  imgLeft.src=Products.all[randProdId[0]].imgPath;
  lblLeft.textContent=Products.all[randProdId[0]].productName;
  Products.all[randProdId[0]].show++;
  imgMid.src=Products.all[randProdId[1]].imgPath;
  lblMid.textContent=Products.all[randProdId[1]].productName;
  Products.all[randProdId[1]].show++;
  imgRight.src=Products.all[randProdId[2]].imgPath;
  lblRight.textContent=Products.all[randProdId[2]].productName;
  Products.all[randProdId[2]].show++;
  timeCount--;
  if(timeCount===-1){
    btnViewResults.style.display='flex';
  }
// console.log(Products.all[randProdId[0]].productName+'///'+Products.all[randProdId[0]].imgPath);
}
render ();
/************************************/
/***********event***********/
imgCont.addEventListener('click',likeProd);
function likeProd (event){
  if(event.target.id==='imgL'){
    Products.all[randProdId[0]].likes++;
    x ();
  }else if(event.target.id==='imgM'){
    Products.all[randProdId[1]].likes++;
    x ();
  }else if(event.target.id==='imgR'){
    Products.all[randProdId[2]].likes++;
    x ();
  }
  function x (){
    console.table(Products.all);
    pickProducts();
    render();}
}
let btnViewResults =document.getElementById('btnViewResults');
btnViewResults.addEventListener('click',insertResult);
function insertResult(event){
  removeLi ();
  event.preventDefault();
  let ulEl=document.getElementById('ulResult');
  for(let i=0;i<Products.all.length;i++){
    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent=Products.all[i].productName+' had '+Products.all[i].likes +'votes, and was seen '+Products.all[i].show+' times.';
  }
}
function removeLi (){
  let ulElRemove=document.getElementById('ulResult');
  ulElRemove.innerHTML = '';
}


