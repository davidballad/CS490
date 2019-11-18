<?php

//this file is responsible for inserting a question and returning a fail or successful INSERT querry

//connects to db
include_once 'dbh.php';

$title = $data['qtitle'];
$problem = $data['problem'];
$diff = $data['diffculty'];
$tag = $data['cat'];

$tc1var1 = $data['tc1var1'];
$tc1answer = $data['tc1answer'];
	
$tc2var1 = $data['tc2var1'];
$tc2answer = $data['tc2answer'];

$tc3var1 = $data['tc3var1'];
$tc3answer = $data['tc3answer'];
	
$tc4var1 = $data['tc4var1'];
$tc4answer = $data['tc4answer'];

$tc5var1 = $data['tc5var1'];
$tc5answer = $data['tc5answer'];
	
$tc6var1 = $data['tc6var1'];
$tc6answer = $data['tc6answer'];

$con = $data['constrain'];
$pen = $data['penalty'];

//echo "$title $problem $diff $tag $con $pen ($tc1var1, $tc1answer) ($tc2var1, $tc2answer) ($tc3var1, $tc3answer) ($tc4var1, $tc4answer) ($tc5var1, $tc5answer) ($tc6var1, $tc6answer)";

//if the constraint is for
if($con == "for"){
  if($pen == NULL){ //checks if the penelty should be the default
    $pen = 3;
  }
  $sql = "INSERT INTO Question_Bank (Title, Problem, Difficulty, Tag, Con_For, Pen_For)
VALUES ('$title', '$problem', '$diff', '$tag', '1', '$pen' )";
}

//if the constraint is while
else if($con == "while"){
  if($pen == NULL){ //checks if the penelty should be the default
    $pen = 3;
  }
  $sql = "INSERT INTO Question_Bank (Title, Problem, Difficulty, Tag, Con_While, Pen_While)
VALUES ('$title', '$problem', '$diff', '$tag', '1', '$pen' )";
}

// if the constraint is print
else if($con == "print"){

  if($pen == NULL){ //checks if the penelty should be the default
    $pen = 5;
  }
  $sql = "INSERT INTO Question_Bank (Title, Problem, Difficulty, Tag, Con_Print, Pen_Print)
VALUES ('$title', '$problem', '$diff', '$tag', '1', '$pen' )";
}

//if there is no constraint 
else{
$sql = "INSERT INTO Question_Bank (Title, Problem, Difficulty, Tag)
VALUES ('$title', '$problem', '$diff', '$tag')";
}
//echo $sql;

if ($conn->query($sql) === TRUE) {
	//echo "made q";
	$JSON_result = "{\"q_insert\" : \"question made\" , ";

	//gets the newly created questions QID
	$sql2 = "SELECT MAX(QID) AS NQID FROM Question_Bank";
	
	$result = $conn->query($sql2);
	$row = $result->fetch_assoc();
	$nqid = $row["NQID"];
	//insert the two test cases
	//echo "$nqid <br>";
  
  //tc1 
	$sql3 = "INSERT INTO Test_Case (QID, Var1, Answer) VALUES('$nqid', '$tc1var1', '$tc1answer')";
	if ($conn->query($sql3) === TRUE) {
		$JSON_result = $JSON_result. "\"tc1\" : \"testcase 1 made\" , ";
 	}
 	else{ 
		$JSON_result = $JSON_result. "\"tc1\" : \"testcase 1 rejected\" , ";
 	}
  //tc3
	$sql4 = "INSERT INTO Test_Case (QID, Var1, Answer) VALUES('$nqid', '$tc2var1', '$tc2answer')";
	if ($conn->query($sql4) === TRUE) {
		$JSON_result = $JSON_result. "\"tc2\" : \"testcase 2 made\" ";
 	}
  	else {
		$JSON_result = $JSON_result. "\"tc2\" : \"testcase 2 rejected\" }";
	}
 
 //tc3

  if( $tc3answer != NULL){
    $sql5 = "INSERT INTO Test_Case (QID, Var1, Answer) VALUES('$nqid', '$tc3var1', '$tc3answer')";
	if ($conn->query($sql5) === TRUE) {
		$JSON_result = $JSON_result. ", \"tc3\" : \"testcase 3 made\" ";
 	}
  	else {
		$JSON_result = $JSON_result. ",\"tc3\" : \"testcase 3 rejected\" }";
  }	
}
  
// tc4
  if( $tc4answer != NULL){
    $sql6 = "INSERT INTO Test_Case (QID, Var1, Answer) VALUES('$nqid', '$tc4var1', '$tc4answer')";
	  if ($conn->query($sql6) === TRUE) {
		  $JSON_result = $JSON_result. ", \"tc4\" : \"testcase 4 made\" ";
 	  }
  	else {
		  $JSON_result = $JSON_result. ",\"tc4\" : \"testcase 4 rejected\" }";
    }	
}
  
// tc5
if( $tc5answer != NULL){
    $sql7 = "INSERT INTO Test_Case (QID, Var1, Answer) VALUES('$nqid', '$tc5var1', '$tc5answer')";
	if ($conn->query($sql7) === TRUE) {
		$JSON_result = $JSON_result. ", \"tc5\" : \"testcase 5 made\" ";
 	}
  	else {
		$JSON_result = $JSON_result. ",\"tc5\" : \"testcase 5 rejected\" }";
  }	
}

// tc6
if( $tc6answer != NULL){
    $sql8 = "INSERT INTO Test_Case (QID, Var1, Answer) VALUES('$nqid', '$tc6var1', '$tc6answer')";
	if ($conn->query($sql8) === TRUE) {
		$JSON_result = $JSON_result. ", \"tc6\" : \"testcase 6 made\" }";
 	}
  	else {
		$JSON_result = $JSON_result. ",\"tc6\" : \"testcase 6 rejected\" }";
  }	
}
else{
  $JSON_result = $JSON_result."}";  
}
}
	else {
		$JSON_result = "{ \"q_insert\" : \"question rejected\" }";
	}

echo $JSON_result;

$conn->close(); 
