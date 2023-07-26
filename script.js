const addBtn=document.getElementById('add-btn');
const itemInput= document.getElementById('itemInput');
const itemList=document.getElementById('item-listt');
const allClear=document.getElementById('removeAll');

const itemFilter=document.getElementById('filter');
const itemContainer=document.getElementsByClassName('item-container');
const filterInput=document.getElementById('filterInp');





function displayItems(){
 let itemsFromStorage=getItemStr();
  itemsFromStorage.forEach((item)=> addtoUI(item))
  checkUI();
}



function addToUI(item){

  const li=  document.createElement('li');
  itemList.appendChild(li);
  li.appendChild(document.createTextNode(item));
 
  li.className='item-card';
  console.log(li)
  

  const closeBtn=document.createElement('button');
  closeBtn.className='delete ';
  closeBtn.textContent='x'
  li.appendChild(closeBtn);


}




function addItem(e){
    
    const newItem = itemInput.value;
   
    if( newItem === '' ){
        // alert('Please add item');
        return;
    }
 addToUI(newItem);
 console.log(newItem)


 itemInput.value=""; 

 addToLocalStr(newItem);
 checkUI();
 
  
  

}

//clear item
function onClickItem(e){
  if(e.target.classList.contains('delete')) {

    
    if (confirm('Are you sure?')){
      e.target.parentElement.remove();
     removeItemStr();
  
    }
  
  }

    checkUI();
}





function removeItemStr(item){
   let itemsFromStorage= getItemStr();
   console.log(itemsFromStorage)
  itemsFromStorage = itemsFromStorage.filter((i)=> i !== item) ;
 
}


//all clear
function clearAll(){
  console.log('cliiiiick');
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }


 localStorage.removeItem('items');

  checkUI();
  // itemContainer.innerHTML="";

}

function checkUI(){
  const items=itemList.querySelectorAll('li');
  console.log(items.length)
  if(items.length === 0 ){

    allClear.style.display='none';
    itemFilter.style.display='none';

  }
  else{
    allClear.style.display='block';
    itemFilter.style.display='block';

  }
 
}


function filterItems(e){
  const items=itemList.querySelectorAll('li');
  const text= e.target.value.toLowerCase();
  console.log(text);

  items.forEach((item) => {
    const itemName=item.firstChild.textContent.toLowerCase();
    if(itemName.indexOf(text)!=-1)
    {
      item.style.display='flex';
     
    }
    else{
      item.style.display='none';
      
    }
  });

}

// addItem();
// checkUI();


function addToLocalStr(item){
  const itemsFromStorage=getItemStr()

 itemsFromStorage.push(item);

 localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function getItemStr(){
  let itemsFromStorage;

  if(localStorage.getItem('items') === null ){
    itemsFromStorage=[];
  }
  else{
    itemsFromStorage=JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;

}
function init (){
addBtn.addEventListener("click",addItem);
itemList.addEventListener("click",onClickItem);
allClear.addEventListener("click",clearAll);
filterInput.addEventListener("input",filterItems);
document.addEventListener('DOMContentLoaded',displayItems);
checkUI();

}
 init();