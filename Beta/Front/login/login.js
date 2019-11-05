
document.querySelector("#form").addEventListener("submit", function(e){
	e.preventDefault();
	//making a call user userLogin()
	userLogg()
});

function userLogg(){
  var ucid = document.getElementById('ucid');
	var pass = document.getElementById('pass');

	log(ucid.value, pass.value);
}

function log(user, password){
    document.getElementById("state").innerHTML = "Authenticating..";

  var data = '{"mode":"Verify","ucid":"'+user+'","pass":"'+password+'"}';
	var request = new XMLHttpRequest();

	request.open('POST', 'https://web.njit.edu/~gdb6/btest/front.php', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			console.log(response);
			loggin(response, user);
		} else {
			console.log(response);
		}
  };
}

function loggin(response, user){
  var getRes = JSON.parse(response);
	if(getRes =="fail"){
		console.log("failed");
	}
	else{
    var usRole = getRes.role;
		window.localStorage.setItem('user', user);
		window.localStorage.setItem('role', usRole);

		if(usRole == "student"){
			alert("Welcome Student, " + user);
			window.location.replace("../student/student.html");
		}
		else if(usRole == "instructor"){
			alert("Welcome Professor, " + user);
			window.location.replace("../teach/instructor.html");
		}
	}
}



//var authpress = document.getElementById("auth");
//authpress.addEventListener("click", log);



////////////////////////
function process(){
  //alert("called p");
  window.location.replace("../teach/instructor.html");
}

var auth_2 = document.getElementById("auth2");
auth_2.addEventListener("click", process);
