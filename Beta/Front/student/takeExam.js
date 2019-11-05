
var examName ="";
var username ="";
var question_ids = [];
var questionDB = [];

window.onload=function(){
	stuLogged();
							examName = "Exam 1";
							examId = "4";
							username = "gdb6";
	//username = window.localStorage.getItem('user');
	//examId = window.localStorage.getItem('EID');
	//examName = window.localStorage.getItem('examName');
	callExamQuestions(examId, username);
	document.getElementById('exam_name').innerHTML = examName;
};

function callExamQuestions(examName, username){

	var data = '{"mode":"GetExam", "UCID":"'+username+'", "EID": "'+examId+'"}';
	var request = new XMLHttpRequest();
	//console.log(data);

	request.open('POST', 'https://web.njit.edu/~gdb6/btest/front.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');		//x-www-form-urlencoded
	request.send(data);


	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			console.log(response);
			///////////////////////////////////////////////
			var obj = {"Exam_Question" :[ {"QID" : 40 ,
"Title" : "samefinder" ,
"Problem" : "Create a Python function that compares two variables and returns true if they are the same" ,
"Points" : 10 } , {"QID" : 39 ,
"Title" : "pyadder" ,
"Problem" : "Create a Python function that adds x and y and return the sum" ,
"Points" : 10 } , {"QID" : 41 ,
"Title" : "differencefinder" ,
"Problem" : "Create a Python function that compares two variables and returns true if they are different" ,
"Points" : 10 } , {"QID" : 42 ,
"Title" : "pymult" ,
"Problem" : "Create a Python function that multiplies two variables by each other and returns the product" ,
"Points" : 10 } ]};
		var response = JSON.stringify(obj);

			///////////////////////////////////////////////
			displayQuestions(response);
		} else {
			console.log("NO PHP response")
		}
	};
}

function displayQuestions(response){
    questionDB = JSON.parse(response).Exam_Question;
    console.log(questionDB);

	for (var i in questionDB){
		var actualID = questionDB[i].QID;
		var examDiv = document.getElementById("question-list");
		var new_div = document.createElement("div");
		new_div.id = "question_wrapper_"+i;
		new_div.innerHTML = `
			<form>
						<span id="question_name_`+i+`">`+questionDB[i]['Problem']+` </span>
						<span id ="point_worth_`+i+`"> <h4>Points: `+questionDB[i]['Points']+`</h4></span>

				<div class="question-body">
						<h4 id="question_id_`+i+`"> Function Name: `+questionDB[i]['Title']+` </h4>

						<h4> Your Answer: </h4>
							<textarea rows="5" cols="70" class="answer" id="student_answer_`+i+`"></textarea>
				</div>
			</form>
<hr>
							`
		examDiv.appendChild(new_div);
		question_ids.push(actualID);
	}
}

function submitExam() {
	var flag = false

	for (var i in question_ids){
		if(String(document.getElementById("student_answer_"+i).value)==""){
			flag = true;
			break;
		}
	}
	if(flag == true){
		document.getElementById("status").innerHTML = "Please Answer ALL Questions Before Submitting";
	} else{


		var array= {
		"UCID": username,
		"etitle": examName,
		};
		for(var j in question_ids){
			var id = question_ids[j];
			var answer = document.getElementById("student_answer_"+j).value;
			array = {
				"UCID": username,
				"EID": examId,
				"Title": questionDB[j]['Title'],
				"QID":questionDB[j]['QID'],
				"SAnswer":answer,
				"QPoints":questionDB[j]['Points']
				}

				console.log(array);
			fields = JSON.stringify(array);
			storeAnswers(fields);
		//	fields = fields.replace(/\+/g,"%2B");
    //  console.log(fields);
			}

		}

}
function storeAnswers(fields){

	var data = fields;
	console.log(data);

	var request = new XMLHttpRequest();

	request.open('POST', 'https://web.njit.edu/~jw532/miAutoGrader.php', true);			//midAutograder
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');				//x-www-form-urlencoded
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			document.getElementById("status").innerHTML = "** Submitted **";
			console.log(response)
		} else {
			console.log("NO PHP response")
		}
	};

	/////SEND grade exam {UCID, EID}/// what is this doing?
	/////////////////////////////////////
	function sendExam(){
		console.log("Sending finished Exam");
		var data = '{"mode":"sendStudentExam"}';
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

}
