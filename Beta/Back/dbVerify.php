<?php

include_once 'dbh.php';

//getting POST data 
$username = $data['ucid'];
$password = $data['pass'];
$hp = $hashed = hash('sha512', $password);

//mysql query
$sql = "SELECT * FROM user WHERE UCID = '$username' AND Password = '$hp'" ;
$result = $conn->query($sql);

mysqli_close($conn);

//test if query is correct
if($result->num_rows > 0){
	
	//query turned up a result
	$row = $result->fetch_assoc();
	$usr = $row["UCID"];
	$role = $row["Role"];
	$verify = "{ \"verify\" : true , \"user\" : \"$usr\" , \"role\" : \"$role\"}";
	echo $verify;
	
}

else{
	// failed login
	$verify = "{ \"verify\" : false , \"user\" : \"\" , \"role\" : \"\" }";
	echo $verify;
}
