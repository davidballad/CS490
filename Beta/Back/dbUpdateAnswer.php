<?php

//this file will update an exam taken by a student and graded by middle

include_once'dbh.php';

$ucid = $data['UCID'];
$qid = $data['QID'];
$eid = $data['EID'];
$answer = $data['SAnswer'];
$points = $data['QPoints'];
$fb = $data['Feedback'];

$sql = "UPDATE EAnswer SET Points = '$points', Answer = '$answer', Feedback = '$fb' WHERE UCID ='$ucid' AND QID = '$qid' AND EID = '$eid'";
if ($conn->query($sql) === TRUE) {	
	echo "{ \"E_final\" : \"Exam finalised\" }";	
}

else {
        echo "{ \"E_graded\" : \"Exam failed to be finalised\" }";
}


//close your mysql connection
$conn->close(); 