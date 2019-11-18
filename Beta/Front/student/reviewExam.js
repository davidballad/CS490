
var examName ="";
var studentName ="";
var question_ids = [];
var questionDB = [];

window.onload = function(){
	stuLogged();
	examName = window.localStorage.getItem('examName');
				//examName = "Exam 1";
				studentName = "gfn4";
				//examId = "4";
	//studentName = window.localStorage.getItem('UCID');
	examId = window.localStorage.getItem('EID');
	teacherReview(studentName, examId);
	document.getElementById('exam_name').innerHTML = examName;
};



function displayExam(response){

	var questionDB = JSON.parse(response).Answer_List;
	console.log(questionDB);

	for (var i in questionDB) {
		var exam_node = document.getElementById("question-list");
		var new_div = document.createElement("div");
		new_div.id = "question_wrapper_"+i;

		if (questionDB[i]['Comments']==null){
    questionDB[i]['Comments'] = "";
    }

		new_div.innerHTML =  `

			<form>
			<div class="container-title">
				<div class="caption">
					<span class="caption-title" id="question_name_`+i+`">`+questionDB[i]['Problem']+`</span>
					<p>Question ID: `+questionDB[i]['QID']+`</p>
					<span class="caption-explain" id="point_worth_`+i+`"> Points: </span>
					<input type="text" disabled id="student_score_`+i+`" style="width: 20px;" value=`+questionDB[i]['Points']+`><span>/`+questionDB[i]['Max_Points']+`</span>
				</div>
			</div>

			<div class="review-body">
				<div class="answerbox">
					<h4>  Student Answer: </h4>
					<div>
						<textarea disabled class="reviewanswer" id="student_answer_`+i+`">`+questionDB[i]['Answer']+`</textarea>
					</div>
				</div>
				<div class="teacherNotes">
					<h4>  Feedback: </h4>
					<textarea disabled class="teacheranswer" id="teacher_notes_`+i+`">`+questionDB[i]['Comments']+`</textarea>
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
			<hr>
			</form>

				`;
		exam_node.appendChild(new_div);
		question_ids.push(i);

// EXAM GRADING NOTES
		var table = document.getElementById("mid_grade_"+i);
		var notes = questionDB[i]['Feedback'].split(";");			//midAutoGrading

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



function teacherReview(username, examId){

	var data = '{"mode":"GetAns", "UCID":"'+username+'" ,"EID":'+examId+'}';
	var request = new XMLHttpRequest();
	console.log(data);

	request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");			//x-www-form-urlencoded
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;

			////////////////////////////////////////////////
			var obj = {"Answer_List" :[ {"QID" : 39 ,
"Title" : "pyadder" ,
"Answer" : "test enter test" ,
"Problem" : "Create a Python function that adds x and y and return the sum" ,
"Comments" : "teach said" ,
"Feedback" : "I auto-review this exam; x is wrong",
"Points" : 10 ,
"Max_Points" : 10} , {"QID" : 40 ,
"Title" : "samefinder" ,
"Answer" : "test enter test" ,
"Problem" : "Create a Python function that compares two variables and returns true if they are the same" ,
"Comments" : "do better" ,
"Feedback" : "I auto-review this exam; a is wrong",
"Points" : 10 ,
"Max_Points" : 10} , {"QID" : 41 ,
"Title" : "differencefinder" ,
"Answer" : "test enter test" ,
"Problem" : "Create a Python function that compares two variables and returns true if they are different" ,
"Comments" : "" ,
"Feedback" : "I auto-review this exam; y is wrong",
"Points" : 10 ,
"Max_Points" : 10} , {"QID" : 42 ,
"Title" : "pymult" ,
"Answer" : "test enter test" ,
"Problem" : "Create a Python function that multiplies two variables by each other and returns the product" ,
"Comments" : "" ,
"Feedback" : "I auto-review this exam; z is wrong",
"Points" : 10 ,
"Max_Points" : 10} ]};
		var response = JSON.stringify(obj);
			///////////////////////////////////////////////

			displayExam(response);
		} else {
			console.log("No PHP response")
		}
	};
}
