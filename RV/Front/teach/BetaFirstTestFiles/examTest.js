//jshint esversion: 6

var random = Math.floor(Math.random()*100);


window.onload=function(){
	teachLogged();
	questionDBRequest();
};

var question_count = 0;
var questionDB = {};
var questions_added =[];
//var baseURL = "https://web.njit.edu/~gdb6/bLogTest/";
var baseURL = "https://web.njit.edu/~gfn4/Projectdb/";

function displayQDB(response){
	questionDB = JSON.parse(response);
	var table = document.getElementById("question_table");
	var questionDB2= questionDB.Question_List;
	for (var i in questionDB2){

		var tr = document.createElement("tr");

		var question_id_td = document.createElement("td");
		var question_id = document.createTextNode(i);
		question_id.id = "id_" + questionDB2[i];
		question_id_td.appendChild(question_id);

		var questionNameCell = document.createElement("td");
		var question_name = document.createTextNode(questionDB2[i].Title);
		questionNameCell.appendChild(question_name);

		var difficultyCell = document.createElement("td");
		var difficulty = document.createTextNode(questionDB2[i].Difficulty);
		difficultyCell.appendChild(difficulty);

		var categoryCell = document.createElement("td");
		var topic = document.createTextNode(questionDB2[i].Cat);
		categoryCell.appendChild(topic);

		var problemCell = document.createElement("td");
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
	if(question_count == 0){
		document.getElementById("status").innerHTML = "Nothing slected. Please select questions to Add to your exam";
	}
		else if (examtitle == "") {
			document.getElementById("status").innerHTML = "Please enter an EXAM TITLE to continue";
		} else {
			createExamRequest(examtitle);
			}
}

function addQuestion(id){
	var actualID = questionDB.Question_List[id].QID;
	//var default_point = 20;
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
	<div style="width: 12% ;margin-bottom: `+20+`px"> <label><input onClick="deleteQuestion(`+id+`)" type="button" value="Remove" style="height: 20px; width: 80%"></label></div>
											</div>`

	questions_added.push(actualID);
	questionBlock.appendChild(new_div);

	document.getElementById("status").innerHTML = "Great! you are now creating an exam";
}

function remove(array, element) {
    var index = array.indexOf(element);
		array.splice(index, 1);

    // if (index !== -1) {
    //     array.splice(index, 1);
    // }
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

var data = '{"mode":"CreateExam","etitle":"'+examtitle+'"}';


var request = new XMLHttpRequest();

request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
request.setRequestHeader("Content-Type", "application/json");
request.send(data);

request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		var response = request.responseText;
		console.log(response);
		sendQuestions();
	} else {
		console.log("No PHP response");
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


var request = new XMLHttpRequest();

request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
request.send(data);

if (request.status >= 200 && request.status < 400) {
	var response = request.responseText;
	console.log(response)
	assign(response);
} else {
	console.log("NO PHP response")
	}
}
      function assign(){
      	console.log("assign run");
      	var data = '{"mode":"AssignExam"}';
      	var request = new XMLHttpRequest();
      	request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
      	request.setRequestHeader("Content-Type", "application/json");
      	request.send(data);
      
      	if (request.status >= 200 && request.status < 400) {
      		var response = request.responseText;
      		console.log(response);
      	} else {
      		console.log("NO PHP response");
      		}
      }
	//XmmlRequestFunction(data, assign);
}



function questionDBRequest(){
	var data = '{"mode":"GetQuest"}';
	var request = new XMLHttpRequest();

	request.open("POST", 'https://web.njit.edu/~gdb6/btest/front.php', true); 						//gfn4/Projectdb/dbGetQuestion.php//baseURL+'dbGetQuestion.php'
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







///future work
function createTestAttempt(response){
	var responseJSON = JSON.parse(response);
	if(responseJSON =="fail"){
		document.getElementById("status").innerHTML = "Failed";
	}
	if(responseJSON=="success"){
		document.getElementById("status").innerHTML = "Successfully Created Exam";
	}
}




// var idList = "";
// 	for(var i in questions_added){
//    	idList = idList + questions_added[i]  + ",";
//  	}
//  	idList = idList.slice(0,-1);
//  	console.log(idList);
 // 	var gradeList = "";
//
//  	for (var i in questions_added){
 // 		var point = questions_added[i];
//  		gradeList = gradeList + document.getElementById('points_'+point).value + ",";
//  	}
 // 		gradeList = gradeList.slice(0,-1);
//
 // var data = 'jData={"etitle":"'+examtitle+'","QID":"'+idList+'","points":"'+gradeList+'"}'
 // var request = new XMLHttpRequest();
//
 // request.open("POST", "../addExam.php", true);
 // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
 // request.send(data);
