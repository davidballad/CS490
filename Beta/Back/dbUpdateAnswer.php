<?php

//this file will update an exam taken by a student and graded by middle

include_once'dbh.php';

$ucid = $data['UCID'];
$qid = $data['QID'];
$eid = $data['EID'];
//$answer = $data['SAnswer'];
//$ansewr = addslashes($ansewr);
$points = $data['QPoints'];
$fb = $data['Feedback'];

//$sql = "UPDATE EAnswer SET Points = '$points', Answer = '$answer', Feedback = '$fb' WHERE UCID ='$ucid' AND QID = '$qid' AND EID = '$eid'";
$sql = "UPDATE EAnswer SET Points = '$points', Feedback = '$fb' WHERE UCID ='$ucid' AND QID = '$qid' AND EID = '$eid'";
if ($conn->query($sql) === TRUE) {	
	echo "{ \"A_update\" : \"Answer updated\" }";	
}

else {
        $e = mysqli_error($conn);
        echo "{ \"A_update\" : \"Answer failed to be updated: $e\" }";
}


//close your mysql connection
$conn->close(); 