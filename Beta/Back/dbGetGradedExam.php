<?php

// this file will get the graded exam to both the student and the instructor

include_once 'dbh.php';

$ucid = $data['UCID'];
$role = $data['Role'];

if($role == "instructor"){
  $sql = "SELECT UCID, E.EID, Auto_Grade, ETitle FROM EStatus AS S, Exam AS E WHERE Auto_Grade IS NOT NULL AND Status = 0 AND E.EID = S.EID";
  $result = $conn->query($sql);
  //after you ge the result this makes the JSON string
  $JSON_result = "{\"Graded_Exam_List\" :[ ";
  $i = 0;
  if ($result->num_rows > 0) {
          // output data of each row
	  while($row = $result->fetch_assoc()) {
		  //makes the JSON string
		  $ucid = $row["UCID"];
		  $eid = $row["EID"];
		  $agrade = $row["Auto_Grade"];
      $etitle = $row["ETitle"];
		  $JSON_result = $JSON_result."{\"UCID\" : \"$ucid\" ,
		  \"EID\": \"$eid\" , 
      \"ETitle\": \"$etitle\" ,
		  \"Grade\" : \"$agrade\"} ";

		  $i++;
		  if($i != $result->num_rows)
			  $JSON_result = $JSON_result. " , ";

	  }

	//close the JSON string and send it back
	$JSON_result = $JSON_result." ]}";
	echo $JSON_result;

  }
  //if you get no matches, you get this
  else {
    echo "0 results in i";
  } 
}
//TODO add the student part of the function
else if($role == "student"){
  $sql = "SELECT E.ETitle, E.EID, Final_Grade FROM EStatus S, Exam E WHERE UCID = '$ucid' AND Status = 1 AND E.EID = S.EID";
  $result = $conn->query($sql);
  //after you ge the result this makes the JSON string
  $JSON_result = "{\"Graded_Exam_List\" :[ ";
  $i = 0;

  if ($result->num_rows > 0) {
          // output data of each row
	  while($row = $result->fetch_assoc()) {
		  //makes the JSON string
		  $title = $row["ETitle"];
		  $eid = $row["EID"];
		  $fgrade = $row["Final_Grade"];
		  $JSON_result = $JSON_result."{\"ETitle\" : \"$title\" ,
		  \"EID\": \"$eid\" , 
		  \"Grade\" : \"$fgrade\"} ";

		  $i++;
		  if($i != $result->num_rows)
			  $JSON_result = $JSON_result. " , ";

	  }

	//close the JSON string and send it back
	$JSON_result = $JSON_result." ]}";
	echo $JSON_result;

  }
  //if you get no matches, you get this
  else {
    echo "0 results";
  } 

}

else{
  echo "unknown role";
}

//close your mysql connection
$conn->close();