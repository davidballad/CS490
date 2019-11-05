
var examName ="";
var studentName ="";
var question_ids = [];
var questionDB = [];

window.onload=function(){
	teachLogged();
	examName = "Exam 2";
	studentName = "theo";
	examId = 4;
	// examName = window.localStorage.getItem('examName');
	// examId = window.localStorage.getItem('examId');
	// studentName = window.localStorage.getItem('UCID');
	callExamReview(studentName, examId);
	document.getElementById('exam_name').innerHTML = examName;
};

function examDisplay(response){

	var questionDB = JSON.parse(response).Answer_List;
			console.log(questionDB);

	for (var i in questionDB) {
		var exam_node = document.getElementById("question-list");
		var new_div = document.createElement("div");
		new_div.id = "question_wrapper_"+i;
		new_div.className="review-container";

    // if (questionDB[i]['feedback'] == null){
    // questionDB[i]['feedback'] = "";
    // }
		new_div.innerHTML =  `

			<form>
			<div class="container-title">
				<div class="caption">
					<span class="caption-title" id="question_name_`+i+`">`+questionDB[i]['Problem']+`</span>
					<span class="caption-explain" id="point_worth_`+i+`"> Points: </span>
					<input type="text" id="student_score_`+i+`" style="width: 20px;" value=`+questionDB[i]['Points']+`><span>/`+questionDB[i]['Max_Points']+`</span>
				</div>
			</div>

			<div class="review-body">
				<div class="question">
					<h4 id="question_id_`+i+`"> Function Title: `+questionDB[i]['Title']+` </h4>
					<p id="question_`+i+`">`+questionDB[i]['QID']+`</p>
				</div>
				<div class="answerbox">
					<h4>  Student Answer: </h4>
					<div>
						<textarea disabled class="reviewanswer" id="student_answer_`+i+`">`+questionDB[i]['Answer']+`</textarea>
					</div>
				</div>
				<div class="teacherNotes">
					<h4>  Feedback: </h4>
					<textarea class="teacheranswer" id="teacher_notes_`+i+`">`+questionDB[i]['Comments']+`</textarea>
				</div>
				<div class="autoNotes">
					<table>
						<thead>
							<tr>
								<th>Auto Grading Notes</th>
							</tr>
						</thead>
						<tbody id="mid_grade_`+i+`">
						</tbody>
					</table>
				</div>
			</div>
			</form>
<hr>
				`;
		exam_node.appendChild(new_div);
		question_ids.push(i);

// EXAM GRADING NOTES
		var table = document.getElementById("mid_grade_"+i);
		var notes = questionDB[i]['Comments'].split(";");

		for(var j in notes){
			var tr = document.createElement("tr");
			var autoNotes_td = document.createElement("td")
			var autoNotes = document.createTextNode(notes[j]);
			autoNotes_td.id="note_"+j;
      autoNotes_td.appendChild(autoNotes);
			tr.appendChild(autoNotes_td);
			table.appendChild(tr);
		}

	}

}

function updateStudentExam(){
	for (var i in question_ids){
			var id = question_ids[i];
			var grade =  document.getElementById("student_score_"+id).value;
			var teacherNotes = document.getElementById("teacher_notes_"+id).value;

			array = {
				"mode": "GradeFin",
				"UCID": studentName,
				"EID": examName,
				"QID":question_ids.QID,
				"Grade":grade,
				"Feedback": teacherNotes
				}

			fields = JSON.stringify(array);
      console.log(fields);
			updateExamCall(fields);
	}
}


function updateExamCall(fields){

	var data = fields;
	var request = new XMLHttpRequest();

	request.open('POST', 'https://web.njit.edu/~gdb6/btest/front.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			console.log(response);

	      if(response=="success"){
					document.getElementById("status").innerHTML = "Update Complete";
	      } else {
				document.getElementById("status").innerHTML = "Something Went Wrong, Please try Again";
				console.log("NO PHP response")
				}
		};
	}
}


function callExamReview(username, examId){

	var data = '{"mode":"GetAns","UCID":"'+username+'","EID":"'+examId+'"}';
	var request = new XMLHttpRequest();
	console.log(data);

	request.open('POST', 'https://web.njit.edu/~gdb6/btest/front.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
      console.log(response);

			//////////////////////////////////////
							var obj = {"Answer_List" :[ {"Title" : "pyadder" ,
				"Answer" : "test enter test" ,
				"Problem" : "Create a Python function that adds x and y and return the sum" ,
				"Comments" : "" ,
				"Points" : "10" ,
				"Max_Points" : "10"} , {"Title" : "samefinder" ,
				"Answer" : "test enter test" ,
				"Problem" : "Create a Python function that compares two variables and returns true if they are the same" ,
				"Comments" : "" ,
				"Points" : "10" ,
				"Max_Points" : "10"} , {"Title" : "differencefinder" ,
				"Answer" : "test enter test" ,
				"Problem" : "Create a Python function that compares two variables and returns true if they are different" ,
				"Comments" : "" ,
				"Points" : "10" ,
				"Max_Points" : "10"} , {"Title" : "pymult" ,
				"Answer" : "test enter test" ,
				"Problem" : "Create a Python function that multiplies two variables by each other and returns the product" ,
				"Comments" : "" ,
				"Points" : "10" ,
				"Max_Points" : "10"} ]};
						var response = JSON.stringify(obj);
			///////////////////////////////////////
			examDisplay(response);
		} else {
			console.log("NO PHP response")
		}
	};
}
