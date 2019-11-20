<?php

//this file will update an exam taken by a student and graded by middle

include_once'dbh.php';

$ucid = $data['UCID'];
$eid = $data['EID'];

$sql = "SELECT SUM(Points) AS ETotal FROM `EAnswer` WHERE UCID = '$ucid' AND EID = '$eid'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$total = $row["ETotal"];

$sql = "UPDATE EStatus SET Auto_Grade = '$total' WHERE UCID = '$ucid' AND EID = '$eid'";
if ($conn->query($sql) === TRUE) {	
	echo "{ \"E_graded\" : \"Exam Graded: $ucid, $eid, $total\" }";	
}

else {
        $e = mysqli_error($conn);
        echo "{ \"E_graded\" : \"Exam failed to be graded: $ucid, $eid, $total\", \"error\" : \"$e\" }";
}

$conn->close(); 