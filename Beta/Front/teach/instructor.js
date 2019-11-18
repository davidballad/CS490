
/*David Balladares
Front-End Instructor-Main JS*/
window.onload=function(){
	teachLogged();
	examRequest();
};

var createQu = document.getElementById("btnQ");
createQu.addEventListener("click", function(){
  var page = "createQuestion.html";
  goTo(page);
});

var createEx = document.getElementById("btnE");
createEx.addEventListener("click", function(){
  var page2 = "createExam.html";
  goTo(page2);
});

var examDB = [];

function examRequest(){
  var data = '{"mode":"GetGradedExam", "UCID":"'+ window.localStorage.getItem('user')+'", "Role": "instructor"}';
  var ajax = new XMLHttpRequest();
//alert(data);
  ajax.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
  ajax.setRequestHeader("Content-type", "application/json");		//x-www-form-urlencoded
	ajax.send(data);

  ajax.onload = function(){
    if (ajax.status >= 200 && ajax.status < 400) {
      var response = ajax.responseText;
      if (response == "\n0 results in i\n") {
				document.getElementById("examTable").innerHTML = "Nothing to Review Yet";
			} else {
			///////////////////////////////////
//			var obj = {"Graded_Exam_List" :[ {"ETitle" : "testExam" ,
//"EID": "4" ,
//"Grade" : "20"} ]};
//		var response = JSON.stringify(obj);
			//////////////////////////////////

			console.log(response);
      examDisplay(response);
}
    } else {
			console.log("NO PHP response")
		}
  };
}


function examDisplay(response){
  var examDB = JSON.parse(response).Graded_Exam_List;
  var examT = document.getElementById("examTable");

  for (var i in examDB) {
		var tr = document.createElement("tr");

		var exam_name_td = document.createElement("td");
		var exam_name = document.createTextNode(examDB[i].ETitle);
		exam_name_td.appendChild(exam_name);
		exam_name_td.id = "test_id_"+examDB[i].UCID;

		var autograde = document.createElement("td");
		var exam_grade = document.createTextNode(examDB[i].Grade);
		autograde.appendChild(exam_grade);


		var review_td = document.createElement("td");
		review_td.innerHTML = '<div"><input type="button" value="Review" onClick="reviewExams('+examDB[i].EID+', \''+examDB[i].UCID+'\')"></div>'

		tr.appendChild(exam_name_td);
		tr.appendChild(autograde)
		tr.appendChild(review_td);

		examT.appendChild(tr);
  }
}


function reviewExams(examID, studID){
	window.localStorage.setItem('UCID', studID);
	window.localStorage.setItem("EID", examID);
	window.localStorage.setItem('examName', document.getElementById("test_id_"+studID).innerHTML);
	goTo("modify.html");
}
