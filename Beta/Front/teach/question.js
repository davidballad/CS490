window.onload = function(){
	teachLogged();
	document.getElementById("penalty").disabled = true;
};

function changetextbox(){
	var constrainCheck = document.getElementById("constrain").value;
	var penaltyText = document.getElementById("penalty");
	if (constrainCheck == "") {
		penaltyText.value = "";
		penaltyText.disabled = true;
	} else{
		penaltyText.disabled = false;
	}
}

document.querySelector("#createQForm").addEventListener("submit", function(e){
	//alert("submitting");
	e.preventDefault();

});

function submitQuestion(){
	var title = document.getElementById("qtitle").value;
	var problem = document.getElementById("problem").value;

	var tc1Val1 = document.getElementById("tc1var1").value;
	var result1 = document.getElementById("tc1answer").value;

	var tc2Val1 = document.getElementById("tc2var1").value;
	var result2 = document.getElementById("tc2answer").value;

	var tc3Val1 = document.getElementById("tc3var1").value;
	var result3 = document.getElementById("tc3answer").value;

	var tc4Val1 = document.getElementById("tc4var1").value;
	var result4 = document.getElementById("tc4answer").value;

	var tc5Val1 = document.getElementById("tc5var1").value;
	var result5 = document.getElementById("tc5answer").value;

	var tc6Val1 = document.getElementById("tc6var1").value;
	var result6 = document.getElementById("tc6answer").value;

	var catObj = document.getElementById("cat");
	var category = catObj.options[catObj.selectedIndex].value;

	var constObj = document.getElementById("constrain");
	var constrain = constObj.options[constObj.selectedIndex].value;


	var difficultyObj = document.getElementById("difficulty");
	var difficulty =  difficultyObj.options[difficultyObj.selectedIndex].value;

	var penalty = document.getElementById("penalty").value;

//	var array = '{"mode":"CreateQuest", "qtitle":"'+title+'", "problem":"'+problem+'", "tc1var1":"'+tc1Val1+'", "tc2var1":"'+tc2Val1+'", "tc3var1":"'+tc3Val1+'", "tc4var1":"'+tc4Val1+'", "tc5var1":"'+tc5Val1+'", "tc6var1":"'+tc6Val1+'", "tc1answer":"'+result1+'", "tc2answer":"'+result2+'", "tc3answer":"'+result3+'", "tc4answer":"'+result4+'", "tc5answer":"'+result5+'", "tc6answer":"'+result6+'", "diffculty":"'+difficulty+'", "cat":"'+category+'", "constrain":"'+constrain+'", "penalty":"'+penalty+'"}';

 var array = {"mode":"CreateQuest", "qtitle":title, "problem":problem, "tc1var1":tc1Val1, "tc2var1":tc2Val1, "tc3var1":tc3Val1, "tc4var1":tc4Val1, "tc5var1":tc5Val1, "tc6var1":tc6Val1, "tc1answer":result1, "tc2answer":result2, "tc3answer":result3, "tc4answer":result4, "tc5answer":result5, "tc6answer":result6, "diffculty":difficulty, "cat":category, "constrain":constrain, "penalty":penalty};

 	//array = array.replace(/\\/g, "\\u005C").replace(/"/g, '\\u0022').replace(/'/g, "\\u0027");
  array = JSON.stringify(array);
  //array = JSON.stringify(String(array));
	addQuestion(array);
}


function addQuestion(questionInfo){
	var data = questionInfo;
 	//data = data.replace("\"", "\\\"");

	var ajax = new XMLHttpRequest();
		//	alert(data);
	ajax.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);
	ajax.setRequestHeader("Content-type", "application/json; charset=UTF-8");   //json
	ajax.send(data);

	ajax.onload = function(){
 		if (ajax.status >=200 && ajax.status < 400) {
			var response = ajax.responseText;
			console.log("status: " + response);
			document.getElementById("status").innerHTML = "Question Created Succesfully";
			var formReset = document.getElementById("createQForm");
			formReset.reset();
			//addStatus(response);
		} else {
			console.log("NO PHP response");
			document.getElementById("status").innerHTML = "Something went Wrong, Try Again";
		}
	};
}




///future work
function addStatus(response){
	var res = response;
	if(res =="question rejected"){
		document.getElementById("status").innerHTML = "Failed to Create this Question";
	} else if(res=="question inserted"){
		document.getElementById("status").innerHTML = "Success insertion";
	} else {
		document.getElementById("status").innerHTML = "Something went Wrong, Try Again";
	}
}
