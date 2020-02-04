/*
David Balladares
Front End Developer
Instructor Create Exam JS
*/

var random = Math.floor(Math.random()*100);

window.onload=function(){
	teachLogged();
	questionDBRequest();
};

var question_count = 0;
var questionDB = {};
var questions_added =[];
//var baseURL = "https://web.njit.edu/~gdb6/bLogTest/";
//var baseURL = "https://web.njit.edu/~gfn4/Projectdb/";

function questionDBRequest(){
	var data = '{"mode":"GetQuest"}';
	var request = new XMLHttpRequest();

	request.open("POST", 'https://web.njit.edu/~gdb6/btest/front.php', true); 		//baseURL+'dbGetQuestion.php'
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");   //x-www-form-urlencoded
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			displayQDB(response);
		} else {
			console.log("failed to recieve questionBank")
		}
	};
}

function displayQDB(response){
	questionDB = JSON.parse(response);
	var table = document.getElementById("question_table");
  table.innerHTML="";
	var questionDB2= questionDB.Question_List;
	for (var i in questionDB2){

		var tr = document.createElement("tr");
		tr.classList.add("questionRow");

		var question_id_td = document.createElement("td");
		var question_id = document.createTextNode(i);
		question_id.id = "id_" + questionDB2[i];
		question_id_td.appendChild(question_id);

		var questionNameCell = document.createElement("td");
		var question_name = document.createTextNode(questionDB2[i].Title);
		questionNameCell.appendChild(question_name);

		var difficultyCell = document.createElement("td");
		difficultyCell.classList.add("diff_class");
		var difficulty = document.createTextNode(questionDB2[i].Difficulty);
		difficultyCell.appendChild(difficulty);

		var categoryCell = document.createElement("td");
		categoryCell.classList.add("cat_class");
		var topic = document.createTextNode(questionDB2[i].Cat);
		categoryCell.appendChild(topic);

		var problemCell = document.createElement("td");
		problemCell.classList.add("problem_class");
		var problem = document.createTextNode(questionDB2[i].Problem);
		problemCell.appendChild(problem);

		var addcell = document.createElement("td");
		addcell.innerHTML = '<div class="text-center" ><input type="button" value="Add" onClick="addQuestion('+i+')" id="addingQuestion'+i+'"></div>'

		tr.appendChild(question_id_td);
		tr.appendChild(questionNameCell);
		tr.appendChild(difficultyCell);
		tr.appendChild(categoryCell);
		tr.appendChild(problemCell);
		tr.appendChild(addcell);

		table.appendChild(tr);
	}
}

// function XmmlRequestFunction(data, callback) {
// 	var request = new XMLHttpRequest();
//
// 	request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
// 	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
// 	request.send(data);
//
// 	if (request.status >= 200 && request.status < 400) {
// 		var response = request.responseText;
// 		console.log(response)
// 		callback(response);
// 	} else {
// 		console.log("NO PHP response")
//
// 	}
//
// }

function submitExam(event){
	event.preventDefault();
 
 	var examtitle = document.getElementById("Title").value;
	var examCStatus = document.getElementById("createStatus");

	if(question_count == 0){
		document.getElementById("status").innerHTML = "Nothing slected. Please select questions to Add to your exam";
		examCStatus.innerHTML = "** See Error Message Above **";
	}
		else if (examtitle == "") {
			document.getElementById("status").innerHTML = "Please enter an EXAM TITLE to continue";
			examCStatus.innerHTML = "** See Error Message Above **";
		} 

   else {
			document.getElementById("status").innerHTML = "";
			examCStatus.innerHTML = "Creating Exam...";
			createExamRequest(examtitle);

			}
}

function addQuestion(id){
	var actualID = questionDB.Question_List[id].QID;
	var question_name = questionDB.Question_List[id].Title;

	document.getElementById("addingQuestion"+id).disabled = true;
	question_count = question_count + 1;
	var questionBlock = document.getElementById("question-block")
	var new_div = document.createElement("div")
	new_div.classList.add("question-block")
	new_div.id = "listId"+id

	new_div.innerHTML = `<div>
	<div><label id="listId`+id+`">Title`+question_count+`: `+question_name+`</label></div>
	<div><label id="label_points_`+id+`">Points: </label><input style ="width: 25px" type="text" id="points_`+actualID+`"></input></div>
	<div style="margin-top: `+5+`px"> <label><input onClick="deleteQuestion(`+id+`)" type="button" value="Remove" style="height: 20px; width: 25%"></label></div>
											</div><hr>`

	questions_added.push(actualID);
	questionBlock.appendChild(new_div);

	document.getElementById("status").innerHTML = "Great! You are now creating an exam";
	document.getElementById("createStatus").innerHTML = "Adding Questions...";
}

function remove(array, element) {
    var index = array.indexOf(element);
		array.splice(index, 1);
}

function deleteQuestion(id){

	var deleteFromList = document.getElementById('listId'+id)
	deleteFromList.remove()
	document.getElementById("addingQuestion"+id).disabled = false;
	var arr = questionDB.Question_List[id].QID;

	question_count = question_count - 1;
	remove(questions_added, arr);
}


function createExamRequest(examtitle){

var data = '{"mode":"CreateExam","etitle": "'+examtitle+'"}';


var request = new XMLHttpRequest();

request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
request.setRequestHeader("Content-Type", "application/json"); //x-www-form-urlencoded
request.send(data);

request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		var response = request.responseText;
		console.log(response);
		sendQuestions();
	} else {
		console.log("No PHP response 1");
		}
	};

	//XmmlRequestFunction(data, sendQuestions);
}


function sendQuestions(){
for(var i in questions_added)	{
var questID = questions_added[i];
var num = parseFloat(i)+1;		//QID
var points = document.getElementById("points_"+questID).value;

var data = '{"mode":"AddEQ","QID":"'+questID+'","num":"'+num+'","grade":"'+points+'"}';
//alert(data);

var request = new XMLHttpRequest();

request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
request.setRequestHeader("Content-Type", "application/json");
request.send(data);

if (request.status >= 200 && request.status < 400) {
	var response = request.responseText;
	console.log(response)
	//assign();
} else {
	console.log("NO PHP response 2");
	}
}
assign();
}

function assign(){
	console.log("assign run");
	var data = '{"mode":"AssignExam"}';
	var request = new XMLHttpRequest();
	request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(data);

	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			document.getElementById("status").innerHTML = "Exam Successfully Created";
			document.getElementById("createStatus").innerHTML = "Success!"
			console.log(response);
		} else {
			console.log("NO PHP response");
			}
	};
}

function diffSearch(){
  var input, filter, listing, txtValue, grid, p;
  input = document.getElementById("myDiffInput");
  filter = input.value.toUpperCase();
  grid = document.getElementById("question_table");
  questionTable = grid.getElementsByClassName("questionRow");

  for (var i = 0; i < questionTable.length; i++) {
    p = questionTable[i].getElementsByTagName("td")[2];
    txtValue = p.textContent || p.innerText;
    if (txtValue.toUpperCase().indexOf(filter)> -1) {
      questionTable[i].style.display = "";

    } else {
      questionTable[i].style.display = "none";
    }
  }
}

function catSearch(){
  var input, filter, listing, txtValue, grid, p;
  input = document.getElementById("myCatInput");
	filter = input.value.toUpperCase();
  grid = document.getElementById("question_table");
  questionTable = grid.getElementsByClassName("questionRow");

	for (var i = 0; i < questionTable.length; i++) {
    p = questionTable[i].getElementsByTagName("td")[3];
    txtValue = p.textContent || p.innerText;
    if (txtValue.toUpperCase().indexOf(filter)> -1) {
      questionTable[i].style.display = "";

    } else {
      questionTable[i].style.display = "none";
    }
  }
}

function probSearch(){
  var input, filter, listing, txtValue, grid, p;
  input = document.getElementById("myProbInput");
	filter = input.value.toUpperCase();
  grid = document.getElementById("question_table");
  questionTable = grid.getElementsByClassName("questionRow");

	for (var i = 0; i < questionTable.length; i++) {
    p = questionTable[i].getElementsByTagName("td")[4];
    txtValue = p.textContent || p.innerText;
    if (txtValue.toUpperCase().indexOf(filter)> -1) {
      questionTable[i].style.display = "";

    } else {
      questionTable[i].style.display = "none";
    }
  }
}



document.getElementById("srch").addEventListener("submit", function(event){
	event.preventDefault();
	if (keyCode === 13) {
		searchTool()
	}
});


function searchTool(){
	var catt = document.getElementById("catt").value;
	var diff = document.getElementById("diff").value;

	var filterData = '{"mode":"GetQuest","cat": \"'+catt+'\","diff": \"'+diff+'\"}';
	console.log(filterData);

if (catt == "" && diff == "") {
	questionDBRequest();
} else{
	searchDBRequestion(filterData);
}
}

function searchDBRequestion(filtdata){
	var filterArray = filtdata;
	var req = new XMLHttpRequest();

	req.open("POST", 'https://web.njit.edu/~gdb6/btest/front.php', true); 		//baseURL+'dbGetQuestion.php'
	req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");   //x-www-form-urlencoded
	req.send(filterArray);

	req.onload = function() {
		if (req.status >= 200 && req.status < 400) {
			var res = req.responseText;
			displayQDB(res);
		} else {
			console.log("failed to recieve questionBank")
		}
};
}