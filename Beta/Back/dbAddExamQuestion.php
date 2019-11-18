<?php

//this program will get the newly created exam and insert questions into it

include_once 'dbh.php';

$qid = $data['QID'];
$num = $data['num'];
$points = $data['grade'];
//get the last added examID
$sql = "SELECT MAX(EID) AS NEID FROM Exam";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$neid = $row["NEID"];

//all elements got, time to insert

$sql ="INSERT INTO EQuestion (EID, QID, Num, Points) VALUES('$neid', '$qid', '$num', '$points')";
//test to see if it is inserted
if ($conn->query($sql) === TRUE) {
  echo "{\"q_add\" : \"question added into Exam\" }";
}
else{ 
  echo "{\"q_add\" : \"question didnt add to Exam\"}";
}

$conn->close(); 
