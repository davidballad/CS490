<?php

// this file will be getting the ungraded exam, and deploying it to the students

include_once 'dbh.php';

$ucid = $data['UCID'];
$neid = $data['EID'];
//TODO send back the Question title
$sql = "SELECT Title, Problem, Points, Q.QID FROM Question_Bank Q, EQuestion E WHERE Q.QID = E.QID AND E.EID = '$neid' ORDER BY Num";
$result = $conn->query($sql);

//$JSON_result = "{\"Exam_Question\" :[ ";
$JSON_result = array("Exam_Question"=>array());

if ($result->num_rows > 0) {
        // output data of each row
	while($row = $result->fetch_assoc()) {
		//makes the JSON string
		$qid = $row["QID"];
		$problem = $row["Problem"];
		$points = $row["Points"];
    $title = $row["Title"];
	  $rowdata = array(
     "QID"=>$qid,
     "Title"=>$title,
     "Problem"=>$problem,
     "Points"=>$points
   );	
    
    array_push($JSON_result['Exam_Question'], $rowdata);
    
	}

	//close the JSON string and send it back
	echo json_encode($JSON_result);

}
//if you get no matches, you get this
else {
	 echo "0 results";
}

//close your mysql connection
$conn->close();
