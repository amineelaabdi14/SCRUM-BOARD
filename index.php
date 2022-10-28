<?php 
		include('assets/php/script.php');
?>
<!DOCTYPE html>
<html lang="en" >
<head>
	<meta charset="utf-8" />
	<title>YouCode | Scrum Board</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!-- ================== BEGIN core-css ================== -->
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
	<link href="assets/css/vendor.min.css" rel="stylesheet" />
	<!-- ________________________________ -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<!-- _____________________ -->
	<link href="assets/css/default/app.min.css" rel="stylesheet" />
	<link href="assets/css/style.css" rel="stylesheet" />
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
		</style>
		
	<!-- ================== END core-css ================== -->
</head>
<body> 
	<!-- BEGIN #app -->
	<div id="app" class="app-without-sidebar">
		<!-- BEGIN #content -->
		<div id="content" class="app-content main-style">
			<div class="navbar pt-1px">
				<div class="">
					<ol class="breadcrumb fs-15px" style="color: #18222D;">
						<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
						<li class="breadcrumb-item active">Scrum Board </li>
					</ol>
					<!-- BEGIN page-header -->
					<h1 class="page-header fs-30px" style="letter-spacing: 0.125rem;color: #18222D;">
						Scrum Board 
					</h1>
					<!-- END page-header -->
				</div>
				
				<div class="">
					
					<button class="btn btn-lg btn-info shadow-sm text-white fs-15px" type="button" onclick="showAddTaskModel()">

						<i class="bi bi-plus-lg text-white"></i> Add Task</button>
					
				</div>
			</div>
			 
			<div id="cardsHolder" class=" d-flex flex-lg-row flex-xlg-wrap justify-content-xl-around overflow-auto rounded"  style=" margin: auto;margin-top: 4vw;">
				     

				<div  class="myCard m-2 shadow-sm" style="width:50vw;border-radius:7px;">
					<div class=" h-35px align " style="padding-left:20px;background-color: #2d353c;border-top-left-radius:7px;border-top-right-radius:7px;">
						<h4 class="fs-16px text-white fw-normal text-left shadow pt-8px " >To Do (<span id="to-do-tasks-count"></span>)</h4>
					</div>
					<div class="tasksCard overflow-auto list-group " style="box-sizing: border-box;max-height:460px;border-bottom-left-radius:17px;border-bottom-right-radius:17px;">
						<!-- TO DO TASKS GOES HERE -->
						<?php	
							getTasks("To Do");	
						?>
					</div>
				</div>


				<div  class="myCard m-2 shadow-sm " style="width:50vw;border-radius:7px;">
					<div class="h-35px align" style="padding-left:20px;background-color: #2d353c;border-top-left-radius:7px;border-top-right-radius:7px;">
						<h4 class="fs-17px text-white fw-normal text-left shadow pt-8px " >In Progress (<span id="in-progress-tasks-count"></span>)</h4>
					</div>
					<div class="tasksCard overflow-auto list-group" style="box-sizing: border-box;max-height:460px;border-bottom-left-radius:17px;border-bottom-right-radius:17px;">

						<!-- IN PROGRESS TASKS GOES HERE -->
						<?php	
							getTasks("In Progress")
						?>
					</div>
				</div>
				

				<div  class="myCard m-2 shadow-sm " style="width:50vw;border-radius:7px;">
					<div class=" h-35px align " style="padding-left:20px;background-color: #2d353c;border-top-left-radius:7px;border-top-right-radius:7px;">
						<h4 class="fs-17px text-white fw-normal text-left shadow pt-8px " >Done (<span id="done-tasks-count"></span>)</h4>
					</div>
					<div class="tasksCard overflow-auto list-group" style="box-sizing: border-box;max-height:460px;border-bottom-left-radius:17px;border-bottom-right-radius:17px;">

						<!-- DONE TASKS GOES HERE -->
						<?php	
							getTasks("Done")
						?>
					</div>
				</div>
			</div>
			
		</div>
		<!-- END #content -->
	</div>
	<!-- END #app -->
	
	<!-- TASK MODAL -->
	<div class="modal fade" id="modal-task">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
			  <div class="modal-header">
				<div class="h2">Add Task</div>
			  </div>
			  <div class="modal-body">
				<!--begin form-->
				<form  class="form" action="./assets/php/script.php" method="POST">
					<div class="form-group">
						<label  for="title-add" class="text-dark fw-bold fs-5" >Title<span class="text-danger">*</span></label>
						<input id="title-add" type="text" class="inputChecker form-control form-control-lg titleInput" name="title-create" maxlength="37" required>
					</div>

					<label  class="mt-3 text-dark fw-bold fs-5">Type</label> <br>
					<div class="form-check">
						<input id="feature-create" type="radio" name="type-create" value="1" class="fs-5 featureInput" checked>
						<label for="feature-create" class="fs-6 text-secondary" >Feature&emsp;</label> 
						<input id="bug-create" type="radio" name="type-create" value="2" class="fs-5 bugInput"	>
						<label for="bug-create" class="fs-6 text-secondary">Bug</label>
					</div>
					<div class="mt-3 form-group">
						<label for="priority-create" class="text-dark fw-bold fs-5">Priority</label>
						<select id="priority-create" name="priority-create" class="form-select form-select-lg text-secondary fw-light priorityInput" >
							<option selected value="1">Low</option>
							<option value="2">Medium </option>
							<option value="3">High</option>
						</select>
					</div>
					 
					<div class="mt-3 form-group">
						<label for="date-create" class="text-dark fw-bold fs-5">Deadline<span class="text-danger">*</span></label>
						<input id="date-create" type="date" class="form-control form-control-lg text-secondary dateInput" name="date-create" required>
					</div>  
					
					<div class="mt-3 form-group">
						<label  for="Description-create" class="text-dark fw-bold fs-5">Description<span class="text-danger">*</span></label> <br>
						<textarea  rows="5" id="Description-create" name="Description-create" class="form-control form-control-lg DescriptionInput" maxlength="255" required></textarea>
					</div>  
					<div class="modal-footer">
					<button id="close-create" type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
					<button id="save" type="submit" class="btn text-white" style="background-color: #0864cc;" name="save-create" >Create
					</button>
					</div>
				</form>
				
				<!--end form-->
			  </div>
			</div>
			</div>
	</div>

	<!-- BUTTON MODAL -->

	<div class="modal fade " id="fullView" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content" style="min-width:345px;">

				<div class="modal-header">
					<div id="fullViewHeader" class="h3"></div>
					<button onclick="showEditModel()" name="editTaskBtn" type="button" class="btn" style="background-color:#0864cc;"><i class="bi bi-pencil-fill fs-6 text-white"></i></button>
				</div>

				<div class="modal-body pb-0">
					<div class="row">
						<h4 class="text-dark col-4 fs-16px  " style="padding-right: 0px;">Created on&#160;&#160;:</h4>
						<span id="creationDateSpan" class="text-muted fs-15px col-8"></span>
					</div>                             
					
					<div class="row mt-15px">
						<h4 class="text-dark col-4 fs-16px">Deadline&#160;&#160;&#160;&#160;&#160;&#160;:</h4>
						<span id="deadlineSpan" class="text-danger fs-15px col-8"></span>
					</div>
					<div class="row mt-15px">
						<h4 class="text-dark col-4 fs-16px">Priority&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;:</h4>
						<span id="prioritySpan" class="text-muted fs-15px col-8"></span>
					</div>
					<div class="row mt-15px">
						<h4 class="text-dark col-4 fs-16px">Type&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;:</h4>
						<span id="typeSpan" class="text-muted fs-15px col-8"></span>
					</div>
					<div class="row mt-15px">
						<h4 class="text-dark col-4 fs-16px">Status&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;:</h4>
						<span id="statusSpan" class="text-muted fs-15px col-8"></span>
					</div>
					<div class="mt-15px">		
						<h4 class="text-dark fs-16px ">Description&#160;:</h4>
						<span id="descriptionSpan" class="text-muted fs-15px" ></span>
					</div>
					<div class="modal-footer mt-20px" style="padding-right: 0px;">
						<form action="./assets/php/script.php" method="POST">
							<input name="indexToDelete" type="text" style="display:none;" value="">
							<button name="deleteTaskBtn" type="submit" class="btn btn-danger " data-bs-dismiss="modal">Delete <i class="bi bi-trash3 fs-6"></i></button>
						</form>
						
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- EDIT-TASK MODAL -->
	<div class="modal fade" id="modal-edit">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
			  <div class="modal-header">
				<div id="editHeader" class="h2">Editing</div>
			  </div>
			  <div class="modal-body">
				<!--begin form-->
				<form  class="form" action="./assets/php/script.php" method="POST">
					<div class="form-group">
						<label  class="text-dark fw-bold fs-5" >New title <span class="text-danger">*</span> </label>
						<input  type="text" class="inputChecker form-control form-control-lg titleInput" name="title-edit" maxlength="37" required>
					</div>

					<label  class="mt-3 text-dark fw-bold fs-5">Type</label> <br>
					<div class="form-check">
						<input id="Feature-edit" type="radio" name="type-edit" value="1" class="fs-5 featureInput" >
						<label  for="Feature-edit" class="fs-6 text-secondary" >Feature&emsp;</label> 
						<input id="Bug-edit" type="radio" name="type-edit" value="2" class="fs-5 bugInput">
						<label for="Bug-edit" class="fs-6 text-secondary">Bug</label>
					</div>
					<div class="mt-3 form-group">
						<label for="priority-edit" class="text-dark fw-bold fs-5">Priority</label>
						<select name="priority-edit" id="priority-edit" class="form-select form-select-lg text-secondary fw-light priorityInput" >
							<option selected value="1">Low</option>
							<option value="2">Medium </option>
							<option value="3">High</option>
						</select>
					</div>
					<div class="mt-3 form-group">
						<label for="status-edit" class="text-dark fw-bold fs-5">Status</label>
						<select name="status-edit" id="status-edit" class="form-select form-select-lg text-secondary fw-light statusInput" >
							<option selected value="1">To-Do</option>
							<option value="2">In-Progress </option>
							<option value="3">Done</option>
						</select>
					</div>
					 
					<div class="mt-3 form-group">
						<label for="date-edit" class="text-dark fw-bold fs-5">Deadline</label>
						<input type="date" id="date-edit" name="date-edit" class="form-control form-control-lg text-secondary dateInput">
					</div>  
					
					<div class="mt-3 form-group">
						<label  for="Description-edit" class="text-dark fw-bold fs-5">Description</label><br>
						<textarea id="Description-edit" name="Description-edit" rows="4" class="form-control form-control-lg DescriptionInput" ></textarea>
					</div>  
					<input name="indexToUpdate" type="text" style="display:none;" value="">
					<div class="modal-footer">
					<button id="close" type="button" class="btn btn-danger" data-bs-dismiss="modal">Discard</button>
					<button id="update" name="update" type="submit" class="btn  text-white" style="background-color: #0060cc;">Save changes
					</button>
				</div>
				</form>
				
				<!--end form-->
			  </div>
			</div>
			</div>
	</div>
	<!-- <script>alert('hi');</script> -->

	<!-- ================== BEGIN core-js ================== -->
	<script src="assets/js/vendor.min.js"></script>
	<script src="assets/js/app.min.js"></script>
	<script src="assets/js/app.js"></script>
	<!-- ================== END core-js ================== -->
	
</body>
</html>



