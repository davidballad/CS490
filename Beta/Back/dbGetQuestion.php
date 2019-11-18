<?php 

// this file will be get be returning questions and filtered questuions

include_once 'dbh.php';

$tag = $data['cat'];
$difficulty = $data['diff'];

//changes the query depending on what is sent
if($tag == NULL && $difficulty == NULL){
	$sql = "SELECT * FROM Question_Bank";
}
else if($tag == NULL){
	$sql = "SELECT * FROM Question_Bank WHERE Difficulty = '$difficulty'";
}

else if($difficulty == NULL){
	$sql = "SELECT * FROM Question_Bank WHERE Tag = '$tag'";
}

else{
$sql = "SELECT * FROM Question_Bank WHERE Difficulty = '$difficulty' AND Tag = '$tag'";
}

$result = $conn->query($sql);

//after you ge the result this makes the JSON string
$JSON_result = "{\"Question_List\" :[ ";
$i = 0;
if ($result->num_rows > 0) {
        // output data of each row
	while($row = $result->fetch_assoc()) {
		//makes the JSON string
		$qid = $row["QID"];
		$title = $row["Title"];
		$problem = $row["Problem"];
		$diff = $row["Difficulty"];
		$tag = $row["Tag"];
		$JSON_result = $JSON_result."{\"QID\" : $qid ,
		\"Title\": \"$title\" , 
		\"Problem\" : \"$problem\" , 
		\"Difficulty\" : \"$diff\" ,
		\"Cat\": \"$tag\"}" ;

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
	 echo "0 results $HTTP_RAW_POST_DATA";
}
//close your mysql connection
$conn->close();
