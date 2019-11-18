<?php

//this program will get the newly created exam and assign it to the students

include_once 'dbh.php';

$sql = "SELECT MAX(EID) AS NEID FROM Exam";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$neid = $row["NEID"];

$sql = "SELECT UCID FROM user WHERE Role = 'student'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
        // output data of each row
	while($row = $result->fetch_assoc()) {
		$ucid = $row["UCID"];
		$sql = "INSERT INTO EStatus(UCID, EID) VALUES('$ucid', '$neid')";
    if ($conn->query($sql) === TRUE) {
		  echo "{\"e_assign\" : \"Exam assigned to $ucid\"}";
 	  }
      
   	else{
      echo "{\"e_assign\" : \"Exam faild to assign to $ucid\"}";
    } 
  }
}

else {
	 echo "{\"e_assign\" : \"Could find no students\"}";
}

$conn->close(); 
