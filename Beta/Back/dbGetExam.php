<?php

// this file will be getting the ungraded exam, and deploying it to the students

include_once 'dbh.php';

$ucid = $data['UCID'];
$neid = $data['EID'];
//TODO send back the Question title
$sql = "SELECT Title, Problem, Points, Q.QID FROM Question_Bank Q, EQuestion E WHERE Q.QID = E.QID AND E.EID = '$neid' ORDER BY Num";
$result = $conn->query($sql);

$JSON_result = "{\"Exam_Question\" :[ ";
$i = 0;
if ($result->num_rows > 0) {
        // output data of each row
	while($row = $result->fetch_assoc()) {
		//makes the JSON string
		$qid = $row["QID"];
		$problem = $row["Problem"];
		$points = $row["Points"];
    $title = $row["Title"];
		$JSON_result = $JSON_result."{\"QID\" : $qid , 
		\"Title\" : \"$title\" ,
    \"Problem\" : \"$problem\" ,
		\"Points\" : $points }" ;

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

//close your mysql connection
$conn->close();
