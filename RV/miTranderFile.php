
<?php

header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate"); // HTTP/1.1
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache"); // HTTP/1.0
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
header("Access-Control-Allow-Origin: *");
$array = json_decode($HTTP_RAW_POST_DATA,true);

$mode = $array["mode"];



switch($mode){

	case "AddEQ":
   	 $url = 'https://web.njit.edu/~gfn4/Projectdb/dbAddExamQuestion.php';
	break;	

	case "AssignExam":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbAssignExam.php';
	break;

	case "CreateExam":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbCreateExam.php';
	break;

	case "CreateQuest":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbCreateQuestion.php';
	break;

	case "GradeAns":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbGradeAnswer.php';
	break;

	case "GetExam":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbGetExam.php';
	break;

	case "GetGradedExam":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbGetGradedExam.php';
	break;

	case "GetQuest":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbGetQuestion.php';
	break;

	case "GetTC":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbGetTC.php';
	break;

	case "GetAns":
	$url ='https://web.njit.edu/~gfn4/Projectdb/dbGetAnswer.php';
	break;

	case "GradeExam":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbGradeExam.php';
	break;

	case "GradeFin":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbGradeFinal.php';
	break;

	case "Verify":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbVerify.php';
	break;
	
	case "GetCE":
	$url = 'https://web.njit.edu/~gfn4/Projectdb/dbGetCurrentExam.php';
	break;
 
  case "GradeAns":
  $url = 'https://web.njit.edu/~gfn4/Projectdb/dbGradeAnswer.php';
  break;
  
  case "UpdateAns":
  $url = 'https://web.njit.edu/~gfn4/Projectdb/dbUpdateAnswer.php';
  break;
  
  
	 default:
	 echo("Error mode: $mode $HTTP_RAW_POST_DATA");



}



$c = curl_init($url); 
curl_setopt($c, CURLOPT_POSTFIELDS, $HTTP_RAW_POST_DATA);    
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
curl_setopt($c, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
$cResult = curl_exec($c);
curl_close($c);
echo $cResult;

?>

