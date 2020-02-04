window.onload=function(){
	stuLogged();
	examRequestList();
};

var examDB = [];

function examListRequest(){
	var data = 'jData={"header":"stuExamReq", "user":"'+ window.localStorage.getItem('user') +'"}'
	var request = new XMLHttpRequest();

	request.open("POST", "../examListRequest.php", true);   ///change path after testing
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	request.send(data);

	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			examDisplay(response);
		} else {
			alert("failed to get php");
		}
	};
}

function examDisplay(response){
  var examDB = JSON.parse(response);
  var table = document.getElementById("examTable");

	for (var i in examDB) {
		var tr = document.createElement("tr");

		var exam_name_td = document.createElement("td");
		exam_name_td.id = examDB[i].etitle;
		var exam_name = document.createTextNode(examDB[i].etitle);
		exam_name_td.appendChild(exam_name);

		var edit_td = document.createElement("td");
		switch(examDB[i].status){
			case 'assigned':
				edit_td.innerHTML = '<div><input type="button" value="Take" onClick="takeExam('+i+')"></div>';
				break;
			case 'submitted':
				edit_td.innerHTML = '<div><p>Wait for Results</p></div>';
				break;
			case 'released':
				edit_td.innerHTML = '<div><input type="button" value="Results" onClick="reviewExam('+i+')"></div>';
				break;
			default:
				 edit_td.innerHTML = '<div><p>Try Later</p></div>'
				}
		tr.appendChild(exam_name_td);
		tr.appendChild(edit_td);
		table.appendChild(tr);
	}

}


function takeExam(examID){
	window.localStorage.setItem('etitle', examDB[examID].etitle);
	goTo('takeExam.html');		//// TODO: create
}
function reviewExam(examID){
	window.localStorage.setItem('etitle', examDB[examID].etitle);
	window.localStorage.setItem("user", window.localStorage.getItem('user'));
	goTo('reviewExam.html')
}
