<?php

//this file will update an exam looked at by the instructor, then will publish to the student

include_once'dbh.php';

$ucid = $data['UCID'];
$eid = $data['EID'];

$sql = "SELECT SUM(Points) AS ETotal FROM `EAnswer` WHERE UCID = '$ucid' AND EID = '$eid'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$total = $row["ETotal"];

$sql = "UPDATE EStatus SET Final_Grade = '$total', Status = '1' WHERE UCID = '$ucid' AND EID = '$eid'";
if ($conn->query($sql) === TRUE) {	
	echo "{ \"E_final\" : \"Exam Final Grade: $total\" }";	
}

else {
        $e = mysqli_error($conn);
        echo "{ \"E_final\" : \"Exam failed to be graded: $e\" }";
}

//close your mysql connection
$conn->close(); 