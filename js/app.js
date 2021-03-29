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
  this.likes=0,
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

/************************************/
/***********pick 3 Product randomly***********/
function pickProduct(){
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
        Product.all[randProdId[0]].likes++;
      }else if(event.target.id==='imgM'){
        Product.all[randProdId[1]].likes++;
      }else if(event.target.id==='imgR'){
        Product.all[randProdId[2]].likes++;
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
    liEl.textContent=Product.all[i].productName+' had '+Product.all[i].likes +' votes, and was seen '+Product.all[i].show+' times.';
  }
}
function removeLi (){
  let ulElRemove=document.getElementById('ulResult');
  ulElRemove.innerHTML = '';
}


