<?php
//INCLUDE DATABASE FILE
include('db-connection.php');

//SESSSION IS A WAY TO STORE DATA TO BE USED ACROSS MULTIPLE PAGES
session_start();



//ROUTING
if(isset($_POST['save']))        saveTask();
if(isset($_POST['update']))      updateTask();
if(isset($_POST['delete']))      deleteTask();

// THIS FCT INPORTS THE DATABASE INTO AN ARRAY AND PRINTF ITS ELEMENT INTO THE HTML
function getTasks($divStatus){   
   
    $MyData=array();             //EVERY INDEX CONATAINS AN ASS ARRAY/ROW IN THE DATABASE

    //FETCHING DATABASE INTO A MULTIDIM ARRAY =>
    include('db-connection.php');
    $MyDB=" SELECT tasks.id ,tasks.title, types.name as type_name , priorities.name as priority_name , statuses.name as status_name ,tasks.          task_datetime, tasks.description, tasks.task_creation from tasks 
            INNER JOIN types on types.id=tasks.type_id
            INNER JOIN priorities on priorities.id = tasks.priority_id
            INNER JOIN statuses on statuses.id = tasks.status_id";
    $result =  mysqli_query($conn,$MyDB);
    if ($result->num_rows > 0) 
    {   
        // OUTPUT DATA OF EACH ROW
        foreach($result as $row){
            $MyData[$row['id']-1]=$row; // assigning every row in the database as an ass array into an index
        }
    } 
    else {
        die("No Data");
    }
    
    $conn->close();
    foreach($MyData as  $Mybutton)
    {	
        $id=$Mybutton['id'];
        $title=$Mybutton['title'];
        $type=$Mybutton['type_name'];
        $priority=$Mybutton['priority_name'];
        $status=$Mybutton['status_name'];
        $description=$Mybutton['description'];
        $task_creation=$Mybutton['task_creation'];
        if($divStatus=="To Do")
        {
            $icon="bi bi-question-square text-green fs-18px";
        }
        else if($divStatus=="In Progress")
        {
            $icon="bi bi-pencil-square text-green fs-18px";
        }
        else
        {
            $icon="bi bi-check2-square text-green fs-19px";
        }
        if($status==$divStatus)
        {
            echo '<button id="'.$id.'" class="list-group-item-action mx-0 border row align-items-center  pb-4px lalala" onclick="fullViewOfTheTask('.$id.')" draggable="true" ondrag="drag(event)">
                <div class="col-1">
                <i class="'.$icon.'"></i> 
                </div>
                <div class="col-11">
                <div class="text-dark fw-bolder fs-5 ">'.$title.'</div>
                <div class="">
                <div class="text-muted fs-5">#'.$id.' Created in '.$task_creation.'</div>
                <div class="mt-2 fs-5" title="'.$description.'">'.substr($description,0,60).'...</div>
                </div>
                <div class="mt-1">
                <span class="bg-primary fs-13px text-white fw-bold" style="letter-spacing:1.3px;border-radius:8px; padding: 2px 4.5px 2px 5px;">'.$priority.'</span>
                <span class=" fs-13px text-dark fw-bold"style="letter-spacing:1.3px;  background-color: rgb(202, 202, 202); border-radius:8px; padding: 2px 4.5px 2px 5px;">'.$type.'</span>
                </div>
                </div></button>';
        }
        
    }
}


function saveTask(){
    //CODE HERE
    //SQL INSERT
    $_SESSION['message'] = "Task has been added successfully !";
    header('location: index.php');
}

function updateTask(){
    //CODE HERE
    //SQL UPDATE
    $_SESSION['message'] = "Task has been updated successfully !";
    header('location: index.php');
}

function deleteTask(){
    //CODE HERE
    //SQL DELETE
    $_SESSION['message'] = "Task has been deleted successfully !";
    header('location: index.php');
}

?>