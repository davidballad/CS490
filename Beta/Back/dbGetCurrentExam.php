<?php

// this file will be getting the current examtitle the student needs to take

include_once 'dbh.php';

$ucid = $data['UCID'];
$sql = "SELECT MIN(EID) AS NEID FROM EStatus WHERE UCID = '$ucid' AND Auto_Grade IS NULL";

$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $neid = $row["NEID"];

  $sql = "SELECT ETitle FROM Exam WHERE EID = '$neid'";

  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $etitle = $row["ETitle"];

  //create the JSON to send back the Etitle

  $JSON_return = "{ \"ETitle\" : \"$etitle\" , \"EID\" : $neid }";
}
else{
  $JSON_return = "{ \ETitle\" : \"No Exam Assigned\" , \"EID\" : \"\" }";
}

echo $JSON_return;

//close your mysql connection
$conn->close();