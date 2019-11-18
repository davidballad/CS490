
window.onload=function(){
	stuLogged();
	examRequestList();
	reviewExamRequest();
};

var examDB = [];

function examRequestList(){
	var data = '{"mode":"GetCE", "UCID":"'+ window.localStorage.getItem('user')+'"}';		//Exam to take
	var request = new XMLHttpRequest();

	request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");		//json
	request.send(data);

	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;

/////////////////////////////////////////
								var obj = {"ETitle": "Exam 1", "EID": "4"};		//testing
		var response = JSON.stringify(obj);
///////////////////////////////////////////////////
			takeExamDisplay(response);
		} else {
			alert("NO PHP response");
		}
	};
}

function takeExamDisplay(response){
	var readyExam = JSON.parse(response);
	var myExamName = readyExam.ETitle;
	var myExamId = readyExam.EID;
				console.log(myExamId);


	var table = document.getElementById("takeTable");

	var tr = document.createElement("tr");
	var examNameCell = document.createElement("td");
	var examName = document.createTextNode(myExamName);
	examNameCell.appendChild(examName);

	var edit_td = document.createElement("td");
	edit_td.innerHTML = '<div><input type="button" value="Take" onClick="takeExam('+myExamId+', \''+myExamName+'\')"></div>';

	tr.appendChild(examNameCell);
	tr.appendChild(edit_td)
	table.appendChild(tr);

}



function reviewExamRequest(){
	var data = '{"mode":"GetGradedExam", "UCID":"'+ window.localStorage.getItem('user')+'", "Role": "student"}';		//student, instructor
	var request = new XMLHttpRequest();

	request.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");		//json
	request.send(data);

	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;

			if (response == "\n0 results\n") {
				document.getElementById("examTable").innerHTML = "Nothing to Review Yet";
			} else {
				//////////////////////////////////////////////////
					var obj = {"Graded_Exam_List" :[ {"ETitle" : "testExamTitle" ,
		"EID": "4" ,
		"Grade" : "20"}, {"ETitle" : "Exam2test" ,
		"EID": "5" ,
		"Grade" : "90"}, {"ETitle" : "Exam3 test" ,
		"EID": "6" ,
		"Grade" : "100"} ]};
				var response = JSON.stringify(obj);
		///////////////////////////////////////////////////
					reviewExamDisplay(response);
			}


		} else {
			console.log("NO PHP response");
		}
	};
}




function reviewExamDisplay(response){
  var examDB = JSON.parse(response);
  var table = document.getElementById("examTable");
	var examDB2 = examDB.Graded_Exam_List;

	for (var i in examDB2) {
		var tr = document.createElement("tr");

		var exam_name_td = document.createElement("td");
		exam_name_td.id = examDB2[i].ETitle;
		var exam_name = document.createTextNode(examDB2[i].ETitle);
		exam_name_td.appendChild(exam_name);

		var exam_grade_td = document.createElement("td");
		var exam_grade = document.createTextNode(examDB2[i].Grade);
		exam_grade_td.appendChild(exam_grade);

		var edit_td = document.createElement("td");
		edit_td.innerHTML = '<div><input type="button" value="Results" onClick="reviewExam('+examDB2[i].EID+', \''+examDB2[i].ETitle+'\')"></div>';

		tr.appendChild(exam_name_td);
		tr.appendChild(exam_grade_td);
		tr.appendChild(edit_td);
		table.appendChild(tr);
	}

}


function takeExam(examID, eName){
	window.localStorage.setItem('UCID', window.localStorage.getItem('user'));
	window.localStorage.setItem("EID", examID);
	window.localStorage.setItem('examName', eName);
	goTo('takeExam.html');
}
function reviewExam(examID, eName){
	window.localStorage.setItem('UCID', window.localStorage.getItem('user'));
	window.localStorage.setItem("EID", examID);
	window.localStorage.setItem('examName', eName);
	goTo('reviewExam.html');
}
