// ..........................add event listener on input button inputByUser function works................................

document.getElementById('addInput').addEventListener('click',()=>inputByUser());

// .........................load  all the list which is saved in local storage on page load.........................

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
    listEl.innerHTML=`<p class="listContent"><input type="checkbox" class="checkBox" ${isComplete?'checked':''}>
    <span class="span">${value}</span></p><i class="fa-solid fa-xmark remover"></i>`;
    listContainer.appendChild(listEl);
// .............adding line through class if the li item is checked...............................................
    let text=listEl.querySelector('.span');
    if(isComplete===true){
        text.classList.add('line-through');
    }

    // ...........................adding event listener to the remove icon..........................
    const removeIcon=listEl.querySelector('.remover');
        removeIcon.addEventListener('click',()=>{
        removeEl(listEl);
        savedItem();
});
// ...............................adding event listener to checkbox checked or unchecked..........................
    const checkBox=listEl.querySelector(".checkBox");
    checkBox.addEventListener('change',(e)=>{
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
    const textSpan=listEl.querySelector('.span');
    if(e.target.checked){
        textSpan.classList.add('line-through');
    }else{
        textSpan.classList.remove('line-through');
    };
}


//  ..............................add function to save data in local storage.........................


    function savedItem(){
    const listItem=[];
    document.querySelectorAll('.listEl').forEach(listEl=>{
        const text=listEl.querySelector('.span').innerText;
        const isComplete=listEl.querySelector('.checkBox').checked;
        listItem.push({text,isComplete});
    });
    localStorage.setItem('todolist',JSON.stringify(listItem));
}

//  ........................... add function to load data ......................................
    function loadSavedData(){
    const savedItem=JSON.parse(localStorage.getItem('todolist')) ||[];
    savedItem.forEach(item=>{
        creatingList(item.text,item.isComplete);
})
}
