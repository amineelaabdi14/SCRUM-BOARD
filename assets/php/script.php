<?php
//INCLUDE DATABASE FILE
include('db-connection.php');

//ROUTING
if(isset($_POST['save-create']))        saveTask();
if(isset($_POST['update']))      updateTask();
if(isset($_POST['deleteTaskBtn']))      deleteTask();

// THIS FCT INPORTS THE DATABASE INTO AN ARRAY AND PRINTF ITS ELEMENT INTO THE HTML
function getTasks($divStatus)
{   

    //EVERY INDEX CONATAINS AN ASSO ARRAY/ROW IN THE DATABASE
    $MyData=array();
    global $conn;

    //FETCHING DATABASE INTO A MULTIDIM ARRAY =>
    $MyDB=" SELECT tasks.id ,tasks.title, types.name as type_name , priorities.name as priority_name , statuses.name as status_name ,tasks.task_datetime, tasks.description, tasks.task_creation from tasks 
    INNER JOIN types on types.id=tasks.type_id
    INNER JOIN priorities on priorities.id = tasks.priority_id
    INNER JOIN statuses on statuses.id = tasks.status_id order by id asc";
    
    $result =  mysqli_query($conn,$MyDB);
    
    if ($result->num_rows > 0)
    {   
        foreach($result as $row)
        {
            $MyData[$row['id']-1]=$row; // assigning every row in the database as an ass array into an index
        }
    } 
    else 
    {
        die("No Data");
    }
    
    foreach($MyData as  $Mybutton)
    {	
        $id=$Mybutton['id'];
        $title=$Mybutton['title'];
        $type=$Mybutton['type_name'];
        $priority=$Mybutton['priority_name'];
        $status=$Mybutton['status_name'];
        $description=$Mybutton['description'];
        $task_creation=$Mybutton['task_creation'];
        $task_deadline=$Mybutton['task_datetime'];
        if($divStatus=="To Do")
        {
            $icon="bi bi-question-square text-green fs-18px";
            $Counter="todoCounter";
        }
        else if($divStatus=="In Progress")
        {
            $icon="bi bi-pencil-square text-green fs-18px";
            $Counter="inprogressCounter";
        }
        else
        {
            $icon="bi bi-check2-square text-green fs-19px";
            $Counter="doneCounter";
        }
        if($status==$divStatus)
        {
            echo '<button id="button'.$id.'" class="list-group-item-action setTheHover mx-0 border row align-items-center  pb-4px '.$Counter.'" onclick="fullViewOfTheTask(this.id)">
                <div class="col-1">
                <i class="'.$icon.'"></i> 
                </div>
                <div class="col-11">
                <div id="title'.$id.'" class="text-dark fw-bolder fs-5 " data-title="'.$title.'" data-status="'.$status.'">'.$title.'</div>
                <div class="">
                <div id="creation'.$id.'" class="text-muted fs-5" data-creation="'.$task_creation.'" data-deadline="'.$task_deadline.'">#'.$id.' Created in '.$task_creation.'</div>
                <div id="description'.$id.'" class="mt-2 fs-5 text-dark" title="'.$description.'" data-description="'.$description.'">'.substr($description,0,30).'...</div>
                </div>
                <div class="mt-1">
                <span id="priority'.$id.'" class="bg-primary fs-12px text-white fw-bold" style="letter-spacing:1.3px;border-radius:8px; padding: 2.5px 5px 2.5px 5px;" data-priority="'.$priority.'">'.$priority.'</span>
                <span id="type'.$id.'" class=" fs-12px text-dark fw-bold"style="letter-spacing:1.3px;  background-color: rgb(202, 202, 202); border-radius:8px; padding: 2.5px 5px 2.5px 5px;" data-type="'.$type.'">'.$type.'</span>
                </div>
                </div></button>';
        }
        
    }
}

// THIS FCT GETS THE USER'S INPUT AND INSERTS IT INTO THE DATABASE TABLE'S
function saveTask(){
    //CODE HERE
    global $conn;
    $title=$_POST['title-create'];
    $type=$_POST['type-create']; 
    $priority=$_POST['priority-create'];
    $deadline=$_POST['date-create'];
    $description=$_POST['Description-create'];
    $creationDate=date('Y-m-d H:i:s');
    //SQL INSERT
    $sql = "INSERT INTO tasks (title,type_id, priority_id , status_id,task_datetime,description,task_creation)
    VALUES ('$title', $type, $priority,1,'$deadline','$description','$creationDate')";
    if (!mysqli_query($conn, $sql)) {
        echo "Error: ";
      }
    
    header('location: /SCRUM-BOARD-YouCode/index.php');
}

// THIS FCT GETS THE USER'S CHANGES AND INSERTS IT INTO THE DATABASE TABLE'S WHERE THE IDs ARE ==
function updateTask(){
    global $conn;
    //CODE HERE
    $title=$_POST['title-edit'];
    $type=$_POST['type-edit']; 
    $priority=$_POST['priority-edit'];
    $deadline=$_POST['date-edit'];
    $description=$_POST['Description-edit'];
    $status=$_POST['status-edit'];
    $idToUpdate=$_POST['indexToUpdate'];
    //SQL UPDATE
    $sql="UPDATE tasks SET id = '$idToUpdate',title = '$title', description = '$description', type_id = '$type', priority_id = '$priority', status_id = '$status', task_datetime = '$deadline' WHERE id = '$idToUpdate'";
    mysqli_query($conn, $sql);
    
    if (!mysqli_query($conn, $sql)) {
        die ("Error:");
    }
    
    header('location: /SCRUM-BOARD-YouCode/index.php');
}

//THINS FCT DELETES THE WANTED ROW WHERE THE IDs ARE ==
function deleteTask(){
    //CODE HERE
    $test=$_POST['indexToDelete'];
    include('db-connection.php');
    //SQL DELETE
    $sql="DELETE from tasks where id=$test";
    if (!mysqli_query($conn, $sql)) {
        die ("Error:"); 
      }
    header('location: /SCRUM-BOARD-YouCode/index.php');
}

