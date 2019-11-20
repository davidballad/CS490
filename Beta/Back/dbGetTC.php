<?php 

// this file will be get be returning the test caases

include_once 'dbh.php';


$qid = $data['QID'];

$sql = "SELECT Con_For, Pen_For, Con_While, Pen_While, Con_Print, Pen_Print FROM Question_Bank WHERE QID = '$qid'";

$result = $conn->query($sql);
$row = $result->fetch_assoc();

$cf = $row["Con_For"];
$pf = $row["Pen_For"];

$cw = $row["Con_While"];
$pw = $row["Pen_While"];

$cp = $row["Con_Print"];
$pp = $row["Pen_Print"];

$sql = "SELECT * FROM Test_Case WHERE QID = '$qid'";

$result = $conn->query($sql);

//$JSON_result = "{ \"CF\" : $cf , \"PF\" : $pf , \"CW\" : $cw , \"PW\" : $pw , \"CP\" : $cp , \"PP\" : $pp , \"TC_List\" :[ ";
$JSON_result = array(
"CF"=>$cf, 
"PF"=>$pf, 
"CW"=>$cw, 
"PW"=>$pw, 
"CP"=>$cp, 
"PP"=>$pp, 
"TC_List"=>array()
);

if ($result->num_rows > 0) {
        // output data of each row
       
	while($row = $result->fetch_assoc()) {
		//makes the JSON string
   
		$var1 = $row["Var1"];
		$answer = $row["Answer"];
		
    $rowdata = array(
     "v1"=>$var1,
     "a"=>$answer
    );
		
    array_push($JSON_result['TC_List'], $rowdata);
    
	 }
   
	echo json_encode($JSON_result);
 
  }
  
else {
	 echo "0 results";
}

//close your mysql connection
$conn->close();
