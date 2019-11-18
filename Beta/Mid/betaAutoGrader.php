

<?php

header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate"); // HTTP/1.1
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache"); // HTTP/1.0
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
header("Access-Control-Allow-Origin: *");

$jsonData = json_decode( $HTTP_RAW_POST_DATA, true);
//Get Data from Front


$answer = $jsonData['SAnswer'];
$QID = $jsonData['QID'];
$UCID = $jsonData['UCID'];
$EID = $jsonData['EID'];
$points = $jsonData['QPoints'];
$function_name = $jsonData['Title'];
$outComment = "";//set comment that will be delivered

$cf = $jsonData['CF']; #constraint for 
$pf = $jsonData['PF']; #penalty for
$cw = $jsonData['CW']; #constrain while
$pw = $jsonData['PW']; #penalty while
$cp = $jsonData['CP']; #constraint print
$pp = $jsonData['PP']; #penalty print



//get test cases from DB 
$url= 'https://web.njit.edu/~gfn4/Projectdb/dbGetTC.php';
$c = curl_init($url);
curl_setopt($c, CURLOPT_POSTFIELDS, $HTTP_RAW_POST_DATA); 
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
curl_setopt($c, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
$cResult = curl_exec($c);
curl_close($c);



$DBdata = json_decode($cResult, true);
//print DB data

$testCases = $DBdata['TC_List'];
foreach( $testCases as $tc){
$vars = $tc['v1'];
$trimVars = trim($vars);
$ans = $tc['a'];
}




//Total of All Points
$total = $total+$points; 



//MUST TEST FOR : HERE OR EXPLODE BELOW WILL NOT WORK 

$colonMatch = $answer;


$pos1 = strpos($colonMatch, ')');
$pos2 = strpos($colonMatch, ':', $pos1+1);

if($pos2 == $pos1 + 1){

$outComment.="Colon was found for $QID;";

}else{

$replacement = ':';

$outComment.="Colon was missing for $QID -3pts;";
$answer = substr_replace($answer, $replacement, $pos1+1, 0);
$grade = $grade -3;

}

//CHECKS FOR looping 
if($cf == 1){

$forCheck = strpos($answer,"for");

  if($forCheck ==""){

  $outComment.= " \"For\" loop was not included in $QID -$pf pts; ";
  $grade = $grade - $pf; 
  }

}

//CHECKS for WHILE loop
if($cw == 1){

$whileCheck = strpos($answer,"while");

  if($whileCheck ==""){

  $outComment.= " \"While\" loop was not included in $QID -$pw pts; ";
  $grade = $grade - $pw; 
  }

}


//CHECKS FOR PRINT

if($cp == 1){

$printCheck = strpos($answer,"print");

if($printCheck ==""){

  $outComment.=" Print statement was not included in $QID -$pp pts; ";
  $grade = $grade - $pp;

}

} else{

  $printCheck = strpos($answer, "print");
  if($printCheck != ""){
  
  $outComment.= " Print statement was used instead of return in $QID -$pp pts; ";
  $grade = $grade - $pp; 
  
  }
}







// TESTING FUNCTION NAME 
$functionExtracting = $answer;
$functionExtract = explode(':',$functionExtracting);
$functionExt = explode('(', $functionExtract[0]); // def functionName
$functionKey = explode(" ",$functionExt[0]); // seperate both 
$functionName = $functionKey[1]; //Function alone functionKey[0] is "def" 
$functionTrimmed = trim($functionName); //trimming spaces
$function_Name = trim($function_name); //trimming spaces



//CHECKS IF FUNCTION NAME IS CORRECT 
if (strtolower($functionTrimmed) == strtolower($function_Name)){

 $outComment.="Function name, $function_Name was Correct for $QID; ";
 

} else{

 	$outComment.= "Function name $functionTrimmed was incorrect for $QID -5pts; ";
	$grade = $grade + $points - 5;
  
  $fpos = strpos($answer, '$functionTrimmed');
  $bpos = strpos($answer, '(');
  
  $diff = $bpos - $fpos;
  
  $answer = substr_replace($answer, $function_name, $fpos, $diff);

 //expected $function_name 

}


$fileInfo = "$UCID$QID.py"; 
$studentFile = fopen("$fileInfo", "a") or die("Unable to Open File");
$stuFile = "$fileInfo";


//TESTING OUTPUTS 


fwrite($studentFile, "\n#Question ID: $QID\n");
fwrite($studentFile, "#The EID:  $EID\n");
fwrite($studentFile, "#Question Worth: $points pts\n");
fwrite($studentFile, "#Expected Function Name: $function_name\n");
fwrite($studentFile, "#Grade at this Point is : $grade/$total\n");
fwrite($studentFile, "#TestCase:  $trimVars\n");
fwrite($studentFile, "#Answers: $ans\n");
fwrite($studentFile, $answer); //STUDENT ANSWER / INPUT
fwrite($studentFile, "\n");
fwrite($studentFile, "$function_name($vars)\n");// CALLS THE FUNCTION // change later if wrong
fclose($studentFile);

$run = exec("python $fileInfo");


//CHECKS THE OUTPUT 
if ($ans == $run){
 $outComment.=" Expected output was correct for $QID; ";
}
else {
  $outComment.=" Did not match expected output for $QID -3pts ; ";
  $grade = $grade-3;
}


$outFile = fopen("output.py", "a") or die("Unable to Open File");
fwrite($outFile , "Output for question: $QID : $run\n");
fwrite($outFile , "Comments: $outComment\n");
fwrite($outFile , "\n");
fwrite($outFile , "Answer: \n $answer\n");
fwrite($outFile , "\n");
fwrite($outFile , "\n");
fwrite($outFile , "\n");
fwrite($outFile , "\n");
fclose($outFile);


//UNLINK FILES
unlink($fileInfo);


$answerString = "$answer";
$anString1 = trim(preg_replace('/\s\s+/', ' ', $answerString));
 
$jsonResponse =   "{\"UCID\": \"$UCID\", \"QID\":$QID, \"EID\":$EID,\"SAnswer\":\"$anString1\", \"QPoints\":$points,\"Comments\":\"$outComment\"}";


//send the data to the DB
$furl = 'https://web.njit.edu/~gfn4/Projectdb/dbGradeAnswer.php';
$f = curl_init($furl);
curl_setopt($f, CURLOPT_POSTFIELDS, $jsonResponse);
curl_setopt($f, CURLOPT_RETURNTRANSFER, true);
curl_setopt($f, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
$fResult = curl_exec($f);
curl_close($f);


?>
