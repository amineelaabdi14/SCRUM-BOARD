
// READS THE TASKS WHEN VISITING THE PAGE FOR THE FIRST TIME
readTask();

// ADD TASK TARGETED MODAL
function showAddTaskModel()
{
    $(document).ready(function(){
        $("#modal-task").modal("show");
    });
}

// GETS THE USERS INPUT AND PUSH IT IN THE TASKS ARRAY
function saveTask(){
    
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


// GETS THE USERS INPUT AND OVERWRITES THE OLD INFOS
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

       const creationDateInTasks = tasks[indexToEdit].creation;
       Temp.creation =creationDateInTasks;

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


// CLEARS THE INNER HTML
function clearTask(){
    document.getElementById('doneCard').innerHTML="";
    document.getElementById('inProgessCard').innerHTML="";
    document.getElementById('toDoCard').innerHTML="";
}


// ADDS THE TASKS CONTENT TO OUR HTML
function readTask()
{   

    let button;
    let shortDescription;
    let toDoCount=0, doneCount=0, inProgessCount=0;
    for(let i =0 ;i<tasks.length;i++)

    {   
        let isLast = false;
        while(!(i in tasks))
        {   if(i!=tasks.length-1)
            {
                i++;    
            }
            else
            { 
                isLast = true;
                break
            }
        }
        if(isLast)
        {
            break;
        }
 

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

        
        button = `<button id="${"myButton"+i}" class="list-group-item-action mx-0 border row align-items-center  pb-4px lalala" onclick="fullViewOfTheTask(this.id)" draggable="true" ondrag="drag(event)">

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


// SaVE => CLEAR => READ
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

//SHOW THE EDIT MODEL AND GET THE OLD USERS INPUT FROM THE ARRAY ,ACCEPTS THE ID OF THE BUTTON THAT CONTAINS THE IDEX AT IT FIRST PNE OR TWO CHAR
function showEditModel(ID) 
{   // DELETE
    if(ID.length==5){
        indexToEdit=ID.slice(0,1);
    }
    else 
    {
        indexToEdit = ID.slice(0,2);
    }
    document.getElementsByClassName('titleInput')[1].value=tasks[indexToEdit].title;
    document.getElementById(tasks[indexToEdit].type).checked= true;
    document.getElementsByClassName('priorityInput')[1].value=tasks[indexToEdit].priority;
    document.getElementsByClassName('dateInput')[1].value=tasks[indexToEdit].deadLine;
    document.getElementsByClassName('DescriptionInput')[1].value=tasks[indexToEdit].description;
    document.getElementsByClassName('statusInput')[0].value=tasks[indexToEdit].status;

    $(document).ready(function(){
        $("#modal-edit").modal("show");
    });
    $('#fullView').modal('hide')
    
}


// SAVECHANGES => CLEAR => READ
function editTask(ID)
{   
    // SAVE
    saveTask();
    // CLEAR
    clearTask();
    // READ
    readTask();
}


//DELETES THE USERS WANTED INDEX/ID ANd KEEPS ITS INdEX EMPTY TO AVOID ID REPETITION, ACCEPTS THE DELETE BUTTON ID THAT CONTAINS THE THE INDEX TO DELETE AT THE FIRST 1 OR 2 CHARS
function deleteTask(ToDelete) {
    
    // DELETE
    if(ToDelete.length==7){
        indexToDelete = ToDelete.slice(0,1);
    }
    else 
    {
        indexToDelete = ToDelete.slice(0,2);
    }
    // tasks.splice(indexToDelete,1);
    delete tasks[indexToDelete];

    // CLEAR
    clearTask();
    // READ
    readTask();
}


// SHOWS A MODAL THAT SHOES THE INPUT DETAILS AND CONTAINS THE EDIT AND DELETE BUTTONS
function fullViewOfTheTask(ID) {
    $(document).ready(function(){
        $("#fullView").modal("show");
    });

    let index;
    if(ID.length==9){
        index=ID.slice(-1);
    }
    else if(ID.length>9){
        index=ID.slice(-2);
    }

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

// ALLOWS THE DROP INTO IT ELEMENT CALLED IN
function allowDrop(e){
    e.preventDefault();
}

// Global Variable: 
let indexToMove;
// GETS THE ID OF THE DRAGED ELEMENT
function drag(e)
{
    e.preventDefault();         
    indexToMove= e.target.id.slice(8);
}

// THIS Fct GETS TRIG IF THE ELEMENT CALLED IN WAS THE DROP TARGET
function dropedInProgress(e)
{
    tasks[indexToMove].status = "In-Progress";
    clearTask();
    readTask();
}

// THIS Fct GETS TRIG IF THE ELEMENT CALLED IN WAS THE DROP TARGET
function dropedToDo(e)
{
    tasks[indexToMove].status = "To-Do";
    clearTask();
    readTask();
}

// THIS Fct GETS TRIG IF THE ELEMENT CALLED IN WAS THE DROP TARGET
function dropedDone(e)
{
    tasks[indexToMove].status = "Done";
    clearTask();
    readTask();
}

