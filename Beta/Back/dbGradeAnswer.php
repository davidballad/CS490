<?php

//this file will update an exam taken by a student and graded by middle

include_once'dbh.php';

$ucid = $data['UCID'];
$qid = $data['QID'];
$eid = $data['EID'];
$ansewr = $data['SAnswer'];
$points = $data['QPoints'];
$comments =$data['Comments'];
//echo $ansewr;
echo "$ucid, $qid, $eid, $ansewr, $points, $comments";

$sql = "INSERT INTO EAnswer(UCID, QID, EID, Answer, Points, Comments)
VALUES ('$ucid', '$qid', '$eid', '$ansewr', '$points', '$comments')";

if ($conn->query($sql) === TRUE) {
	
	echo "{ \"A_insert\" : \"Answer saved\" }";	
}

else {
        $e = mysqli_error($conn);
        echo "{ \"A_insert\" : \"Answer couldn't be saved: $e, $qid\" }";
}

//close your mysql connection
$conn->close(); 