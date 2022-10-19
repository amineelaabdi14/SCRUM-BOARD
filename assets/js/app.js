/**
 * In this file app.js you will find all CRUD functions name.
 * 
 */

readTask();
function saveTask(){
    $(document).ready(function(){
        $("#modal-task").modal("show");
    });
    // FORM VALIDATION
    if(document.getElementsByClassName('titleInput')[0].value.trim()!=0)
    { 
        let Temp =[{
            title         :   '',
            type          :   '',
            priority      :   '',
            status        :   '',
            deadLine      :   '',
            creation      :   '',
            description   :   ``}];
            Temp.status="To-Do";
        Temp.title = document.getElementsByClassName('titleInput')[0].value;
        Temp.title = Temp.title .charAt(0).toUpperCase() + Temp.title .toLowerCase().slice(1);
        if (document.getElementsByClassName('featureInput')[0].checked){
            Temp.type=document.getElementsByClassName('featureInput')[0].value;
        }
        else if (document.getElementsByClassName('bugInput')[0].checked){
            Temp.type=document.getElementsByClassName('bugInput')[0].value;
        }
        Temp.priority =document.getElementsByClassName('priorityInput')[0].value;
        Temp.description =document.getElementsByClassName("DescriptionInput")[0].value;
        let shortDescription;
        if(Temp.description.length>30)
        {
            shortDescription = Temp.description.slice(0,30)+"...";
        }
        else
        {
            shortDescription = Temp.description;
        } 
        
        Temp.deadLine =document.getElementsByClassName('dateInput')[0].value;
        Temp.creation = Date().slice(0,21);
        
        // ADD TO THE ARRR
        tasks.push(Temp);
        // FORM RESET
        document.getElementsByClassName('hamidInput')[0].reset();
        $('#modal-task').modal('hide')
        document.getElementsByClassName('inputErrorInput')[0].innerText="";    
    }
    else{
        document.getElementsByClassName('inputErrorInput')[0].innerText='Please fill out this field!';
    }
    
}

function saveChanges(){

   // FORM VALIDATION
   if(document.getElementsByClassName('titleInput')[1].value.trim()!=0)
   { 
       let Temp =[{
           title         :   '',
           type          :   '',
           priority      :   '',
           status        :   '',
           deadLine      :   '',
           creation      :   '',
           description   :   ``}];
       Temp.status=document.getElementsByClassName('statusInput')[0].value;
       Temp.title = document.getElementsByClassName('titleInput')[1].value;
       Temp.title = Temp.title .charAt(0).toUpperCase() + Temp.title .toLowerCase().slice(1);
       if (document.getElementsByClassName('featureInput')[1].checked){
           Temp.type=document.getElementsByClassName('featureInput')[0].value;
       }
       else if (document.getElementsByClassName('bugInput')[1].checked){
           Temp.type=document.getElementsByClassName('bugInput')[0].value;
       }
       Temp.priority =document.getElementsByClassName('priorityInput')[1].value;
       Temp.description =document.getElementsByClassName("DescriptionInput")[1].value;
       let shortDescription;
       if(Temp.description.length>30)
       {
           shortDescription = Temp.description.slice(0,30)+"...";
       }
       else
       {
           shortDescription = Temp.description;
       } 
       
       Temp.deadLine =document.getElementsByClassName('dateInput')[1].value;
       Temp.creation = Date().slice(0,21);
       
       // ADD TO THE ARRR
    //    tasks[indexToEdit]=Temp;
       tasks.splice(indexToEdit, 1,Temp);
       // FORM RESET
       document.getElementsByClassName('hamidInput')[1].reset();
       $('#modal-edit').modal('hide')
       
       document.getElementsByClassName('inputErrorInput')[1].innerText="";    
   }
   else{
       document.getElementsByClassName('inputErrorInput')[1].innerText='Please fill out this field!';
   } 
   
   // CLEAR
   clearTask();

   // READ
   readTask();
}

function clearTask(){
    document.getElementById('doneCard').innerHTML="";
    document.getElementById('inProgessCard').innerHTML="";
    document.getElementById('toDoCard').innerHTML="";
}

function readTask()
{
    let button;
    let shortDescription;
    let toDoCount=0, doneCount=0, inProgessCount=0;
    for(let i =0 ;i<tasks.length;i++)
    {
        if(tasks[i].description.length>30)
        {
            shortDescription = tasks[i].description.slice(0,30)+"...";
        }
        else
        {
            shortDescription = tasks[i].description;
        }
        let icon;
        if(tasks[i].status=="To-Do")
        {
            icon="bi bi-question-square text-green fs-18px";
        }
        else if(tasks[i].status=="In-Progress")
        {
            icon="bi bi-pencil-square text-green fs-18px";
        }
        else if(tasks[i].status=="Done")
        {
            icon="bi bi-check2-square text-green fs-19px";
        }  
        button = `<button id="${"myButton"+i}" class="list-group-item-action mx-0 border row align-items-center bg-white pb-4px" onclick="fullViewOfTheTask(this.id)">
        <div class="col-1">
        <i class="${icon}"></i> 
        </div>
        <div class="col-11">
        <div class="text-dark fw-bolder fs-5 ">${tasks[i].title}</div>
        <div class="">
        <div class="text-muted fs-5">#${i+1} Created in ${tasks[i].creation}</div>
        <div class="mt-2 fs-5" title="${tasks[i].description}">${shortDescription}</div>
        </div>
        <div class="mt-1">
        <span class="bg-primary fs-13px text-white fw-bold" style="letter-spacing:1.3px;border-radius:8px; padding: 2px 4.5px 2px 5px;">${tasks[i].priority}</span>
        <span class=" fs-13px text-dark fw-bold"style="letter-spacing:1.3px;  background-color: rgb(202, 202, 202); border-radius:8px; padding: 2px 4.5px 2px 5px;">${tasks[i].type}</span>
        </div>
        </div></button>` 
        if(tasks[i].status=="To-Do")
        {
            document.getElementById('toDoCard').innerHTML+=button;
            toDoCount++;
        }
        else if(tasks[i].status=="In-Progress")
        {
            document.getElementById('inProgessCard').innerHTML+=button;
            inProgessCount++;
        }
        else if(tasks[i].status=="Done")
        {
            document.getElementById('doneCard').innerHTML+=button;
            doneCount++;
        }
         
    }
    document.getElementById('to-do-tasks-count').innerText=toDoCount;
    document.getElementById('in-progress-tasks-count').innerText=inProgessCount;
    document.getElementById('done-tasks-count').innerText=doneCount;
    
}

function CreateTask() {

    // SAVE
    saveTask();

    // CLEAR
    clearTask();

    // READ
    readTask();
}

// Global Variable:    
let indexToEdit;

function showEditModel(ID) 
{   
    let index=ID.slice(0,1);
    indexToEdit=index;
    document.getElementsByClassName('titleInput')[1].value=tasks[index].title;

    

    document.getElementById(tasks[indexToEdit].type).checked= true;
    
    document.getElementsByClassName('priorityInput')[1].value=tasks[index].priority;
    document.getElementsByClassName('dateInput')[1].value=tasks[index].deadLine;
    document.getElementsByClassName('DescriptionInput')[1].value=tasks[index].description;
    document.getElementsByClassName('statusInput')[0].value=tasks[index].status;
    $(document).ready(function(){
        $("#modal-edit").modal("show");
    });
    $('#fullView').modal('hide')
    
}

function editTask(ID)
{   
    // SAVE
    saveTask();
    // CLEAR
    clearTask();
    // READ
    readTask();
}

function deleteTask(ToDelete) {
    // DELETE
    indexToDelete = ToDelete.slice(0,1);
    tasks.splice(indexToDelete,1);
    // CLEAR
    clearTask();
    // READ
    readTask();
}

function fullViewOfTheTask(ID) {
    $(document).ready(function(){
        $("#fullView").modal("show");
    });
    let index=ID.slice(-1);
    document.getElementById('creationDateSpan').innerText=tasks[index].creation;
    document.getElementById('deadlineSpan').innerText=tasks[index].deadLine;
    document.getElementById('prioritySpan').innerText=tasks[index].priority;
    document.getElementById('descriptionSpan').innerText=tasks[index].description;
    document.getElementById('typeSpan').innerText=tasks[index].type;
    document.getElementById('statusSpan').innerText=tasks[index].status;
    document.getElementById('fullViewHeader').innerText=tasks[index].title;
    let btn=document.querySelector('[name="deleteTaskBtn"]');
    btn.setAttribute('id',index+"Delete");
    document.querySelector('[name="editTaskBtn"]').setAttribute('id',index+"Edit");
};
