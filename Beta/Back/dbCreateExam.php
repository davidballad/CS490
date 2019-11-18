<?php

// this file will be responcible for Incerting an Exam into the database

include_once 'dbh.php';

//inserts the exam title to make the new Exam ID
$title = $data['etitle'];
$sql = "INSERT INTO Exam(ETitle) VALUES ('$title')";

if ($conn->query($sql) === TRUE) {
	
	echo "{ \"E_insert\" : true }";	
}

else {
        $e = mysqli_error($conn);
        echo "{ \"E_insert\" : false , \"error_msg\" : \"$e\" }";
}
$conn->close(); 