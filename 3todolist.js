// ..........................adding function for taking input from user in to-do-list on click of submit button.................................

document.getElementById('addInput').addEventListener('click',()=>inputByUser());
// .........................loading  all the dom content before the submit button or  any activity.........................
document.addEventListener('DOMContentLoaded',()=>loadSavedData());



// ........................creating function for taking input by user and adding that with creatingList function ................

function inputByUser(){
    const inputEl=document.getElementById('input');
    const inputElValue=inputEl.value.trim();
    if(!inputElValue){
        alert('please fill the input filed ');
        return;
    };
    creatingList(inputElValue,false);
    inputEl.value='';
    savedItem();
}
// ..........................creating list for inputValue which has been given by user..............................................

function  creatingList(value,isComplete){
    const listContainer=document.getElementById('list');
    const listEl= document.createElement('li');
    listEl.classList.add('listEl');
    listEl.innerHTML=`<p class="listContent"><input type="checkbox" class="checkBox" ${isComplete?'checked':''}><span>${value}</span></p><i class="fa-solid fa-xmark remover"></i>`;
    listContainer.appendChild(listEl);
    
    const removeIcon=listEl.querySelector('.remover');
    const checkBoxs=listEl.querySelector(".checkBox");
    // ...........................adding event listener to the remove icon..........................
   removeIcon.addEventListener('click',()=>{
    removeEl(listEl);
    savedItem();
});
// ...............................adding event listener to checkbox checked or unchecked..........................
   checkBoxs.addEventListener('change',(e)=>{
    toggleChecked(e,listEl);
    savedItem();

   });
}

// ...........................function removing the list element if clicked on the x mark................
function removeEl(listEl){
    listEl.remove();
    savedItem();
   }


//    ...................function for toggle checklist.......................................
   function toggleChecked(e,listEl){
    const textSpan=listEl.querySelector('span');
    if(e.target.checked){
        textSpan.classList.add('line-through');
        
    }else{
        textSpan.classList.remove('line-through');
        
    };
    savedItem();
    
 }


//  ..............................add function to save data in local storage.........................
 function savedItem(){
    const listItem=[];
    document.querySelectorAll('.listEl').forEach(listEl=>{
        const text=listEl.querySelector('span').innerText;
        const isComplete=listEl.querySelector('.checkBox').checked;
        listItem.push({text,isComplete});
    });
    localStorage.setItem('todolist',JSON.stringify(listItem));

 }

//  ........................... add function to load data ......................................
 function loadSavedData(){
    const savedItems=JSON.parse(localStorage.getItem('todolist')) ||[];
    savedItems.forEach(item=>{
        creatingList(item.text,item.isComplete);

    })

 }
