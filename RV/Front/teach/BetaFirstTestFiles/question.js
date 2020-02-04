window.onload = function(){
	teachLogged();
};

document.querySelector("#createQForm").addEventListener("submit", function(e){
	//alert("submitting");
	e.preventDefault();

});

function submitQuestion(){
	//alert("calling");
	var title = document.getElementById("qtitle").value;
	var problem = document.getElementById("problem").value;
	var tc1Val1 = document.getElementById("tc1var1").value;
	var tc1Val2 = document.getElementById("tc1var2").value;
	var result1 = document.getElementById("tc1answer").value;
	var tc2Val1 = document.getElementById("tc2var1").value;
	var tc2Val2 = document.getElementById("tc2var2").value;
	var result2 = document.getElementById("tc2answer").value;
	var catObj = document.getElementById("cat");
	var category =  catObj.options[catObj.selectedIndex].value;

	var difficultyObj = document.getElementById("difficulty");
	var difficulty =  difficultyObj.options[difficultyObj.selectedIndex].value;

	var array = '{"mode":"CreateQuest","qtitle":"'+title+'", "problem":"'+problem+'","tc1var1":"'+tc1Val1+'", "tc1var2":"'+tc1Val2+'","tc2var1":"'+tc2Val1+'", "tc2var2":"'+tc2Val2+'","tc1answer":"'+result1+'", "tc2answer":"'+result2+'","diffculty":"'+difficulty+'", "cat":"'+category+'"}';
//alert(array);

	addQuestion(array);
}


function addQuestion(questionInfo){
	var data = questionInfo;
	var ajax = new XMLHttpRequest();
alert(data);
	ajax.open("POST", "https://web.njit.edu/~gdb6/btest/front.php", true);   		//TODO: create PHP file//DONE!
	ajax.setRequestHeader("Content-type", "application/json");   //json
	ajax.send(data);

	ajax.onload = function(){
 		if (ajax.status >=200 && ajax.status < 400) {
			var response = ajax.responseText;
			alert("status: " + response);
			addStatus(response);
		} else {
			alert("cannot get a php");
		}
	};
}




///future work
function addStatus(response){
	var res = JSON.parse(response);
	if(res =="fail"){
		document.getElementById("questionStatus").innerHTML = "Failed";
	}
	if(res=="success"){
		document.getElementById("questionStatus").innerHTML = "Success";

	}
}
