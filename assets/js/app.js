counter()
// THIS FCT COUTS HOW MANY TASKS WE HAVE IN EVERY STATUS
function counter(){
    let todoCount=document.getElementsByClassName('todoCounter');
    let inprogressCount=document.getElementsByClassName('inprogressCounter');
    let doneCount=document.getElementsByClassName('doneCounter');
    document.getElementById('to-do-tasks-count').innerText=todoCount.length;
    document.getElementById('in-progress-tasks-count').innerText=inprogressCount.length;
    document.getElementById('done-tasks-count').innerText=doneCount.length;
}

// ADD TASK TARGETED MODAL
function showAddTaskModel()
{  
    $(document).ready(function(){
        $("#modal-task").modal("show");
    });
}


let indexOpened
// SHOWS A MODAL THAT SHOES THE INPUT DETAILS AND CONTAINS THE EDIT AND DELETE BUTTONS
function fullViewOfTheTask(x) {
    indexOpened=x;
    let title=document.getElementById("title"+x.slice(6)).getAttribute("data-title");
    document.getElementById('fullViewHeader').innerText=title;
    document.getElementsByName("title-edit")[0].value=title; 

    let creation=document.getElementById("creation"+x.slice(6)).getAttribute("data-creation");
    document.getElementById('creationDateSpan').innerText=creation;

    let deadline=document.getElementById("creation"+x.slice(6)).getAttribute("data-deadline");
    document.getElementById('deadlineSpan').innerText=deadline;
    document.getElementById("date-edit").value=deadline; 

    let priority=document.getElementById("priority"+x.slice(6)).getAttribute("data-priority");
    document.getElementById('prioritySpan').innerText=priority;
    if(priority=="Low")
    {
        priority=1;
    }
    else if(priority=="Medium")
    {
        priority=2;
    }
    else
    {
        priority=3;
    }
    document.getElementById('priority-edit').value=priority;

    let type=document.getElementById("type"+x.slice(6)).getAttribute("data-type");
    document.getElementById('typeSpan').innerText=type;
    document.getElementById(type+"-edit").checked=true; 

    let status=document.getElementById("title"+x.slice(6)).getAttribute("data-status");
    document.getElementById('statusSpan').innerText=status;
    if(status=="To Do")
    {
        status=1;
    }
    else if(status=="In Progress")
    {
        status=2;
    }
    else
    {
        status=3;
    }
    document.getElementById("status-edit").value=status; 

    let description=document.getElementById("description"+x.slice(6)).getAttribute("data-description");
    document.getElementById('descriptionSpan').innerText=description;
    document.getElementById("Description-edit").value=description; 

    let btn=document.querySelector('[name="indexToDelete"]');
    btn.setAttribute('value',indexOpened.slice(6));
    
    let updateBtn=document.querySelector('[name="indexToUpdate"]');
    updateBtn.setAttribute('value',indexOpened.slice(6));
    $(document).ready(function(){
        $("#fullView").modal("show");
    });
}
//SHOW THE EDIT MODEL AND GET THE OLD USERS INPUT FROM THE ARRAY ,ACCEPTS THE ID OF THE BUTTON THAT CONTAINS THE IDEX AT IT FIRST PNE OR TWO CHAR
function showEditModel() 
{   
    $(document).ready(function(){
        $("#modal-edit").modal("show");
    });
    $('#fullView').modal('hide')
    
}
