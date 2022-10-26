
// ADD TASK TARGETED MODAL
function showAddTaskModel()
{
    $(document).ready(function(){
        $("#modal-task").modal("show");
    });
}

//SHOW THE EDIT MODEL AND GET THE OLD USERS INPUT FROM THE ARRAY ,ACCEPTS THE ID OF THE BUTTON THAT CONTAINS THE IDEX AT IT FIRST PNE OR TWO CHAR
function showEditModel(ID) 
{   
    $(document).ready(function(){
        $("#modal-edit").modal("show");
    });
    $('#fullView').modal('hide')
    
}




// SHOWS A MODAL THAT SHOES THE INPUT DETAILS AND CONTAINS THE EDIT AND DELETE BUTTONS
function fullViewOfTheTask(ID) {
    $(document).ready(function(){
        $("#fullView").modal("show");
    });
};

// ALLOWS THE DROP INTO IT ELEMENT CALLED IN
function allowDrop(e){
    e.preventDefault();
}
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

