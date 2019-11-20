<?php
header("Access-Control-Allow-Origin: *");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate"); // HTTP/1.1
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache"); // HTTP/1.0
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
//connect to the mysql server
$dbServername = "sql.njit.edu";
$dbUsername = "gfn4";
$dbPassword = "QADU39Js";
$dbName = "gfn4";

$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$data = json_decode( $HTTP_RAW_POST_DATA, true);

//echo "THIS IS THE BACKEND $HTTP_RAW_POST_DATA";