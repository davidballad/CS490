
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
$grade = $points;




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


$cf = $DBdata['CF']; #constraint for 
$pf = $DBdata['PF']; #penalty for
$cw = $DBdata['CW']; #constrain while
$pw = $DBdata['PW']; #penalty while
$cp = $DBdata['CP']; #constraint print
$pp = $DBdata['PP']; #penalty print






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

#IF 1 then print should be used
if($cp == 1){
#checking if print exists in student answer
$printCheck = strpos($answer,"print");
#if print doesnt exist
if($printCheck ==""){
#take points away
  $outComment.=" Print statement was not included in $QID -$pp pts; ";
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
  $grade = $grade - 5;
  
  $fpos = strpos($answer, '$functionTrimmed');
  $bpos = strpos($answer, '(');
  
  $diff = $bpos - $fpos;
  
  $answer = substr_replace($answer, $function_name, $fpos, $diff);

 //expected $function_name 

}



if($cp==1){

#test cases from DB 
$testCases = $DBdata['TC_List'];
$val = 1;
foreach( $testCases as $tc){
#variables
$vars = $tc['v1'];
$trimVars = trim($vars);
#expected answer
$ans = $tc['a'];
$time = date("Ymd_His").$val;
$val++;
$fileInfo = "$UCID$QID$time.py"; 
$studentFile = fopen("$fileInfo", "a") or die("Unable to Open File");
$stuFile = "$fileInfo";
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
 $outComment.=" Expected output $run was correct for $QID Test case $trimVars ; ";
}
else {
  $outComment.=" Your answer $run did not match expected output $ans for $QID Test case $trimVars -3pts ; ";
  $grade = $grade-3;
}
//UNLINK FILES
unlink($fileInfo);
}
}
else{


#test cases from DB 
$testCases = $DBdata['TC_List'];
$val = 1;
foreach( $testCases as $tc){
#variables
$vars = $tc['v1'];
$trimVars = trim($vars);
#expected answer
$ans = $tc['a'];
$time = date("Ymd_His").$val;
$val++;
$fileInfo = "$UCID$QID$time.py"; 
$studentFile = fopen("$fileInfo", "a") or die("Unable to Open File");
$stuFile = "$fileInfo";
fwrite($studentFile, "\n#Question ID: $QID\n");
fwrite($studentFile, "#The EID:  $EID\n");
fwrite($studentFile, "#Question Worth: $points pts\n");
fwrite($studentFile, "#Expected Function Name: $function_name\n");
fwrite($studentFile, "#Grade at this Point is : $grade/$total\n");
fwrite($studentFile, "#TestCase:  $trimVars\n");
fwrite($studentFile, "#Answers: $ans\n");
fwrite($studentFile, $answer); //STUDENT ANSWER / INPUT
fwrite($studentFile, "\n");
fwrite($studentFile, "print($function_name($vars))\n");// CALLS THE FUNCTION // change later if wrong
fclose($studentFile);
$run = exec("python $fileInfo");
//CHECKS THE OUTPUT 
if ($ans == $run){
 $outComment.=" Expected output $run was correct for $QID Test case $trimVars ; ";
}
else {
  $outComment.=" Your answer $run did not match expected output $ans for $QID Test case $trimVars -3pts ; ";
  $grade = $grade-3;
}
//UNLINK FILES
unlink($fileInfo);
}

}#end of else



$outFile = fopen("output.py", "a") or die("Unable to open outPut File");
fwrite($outFile , "Output for question: $QID : $run\n");
fwrite($outFile , "Comments: $outComment\n");
fwrite($outFile , "\n");
fwrite($outFile , "Answer: \n $answer\n");
fwrite($outFile , "\n");
fwrite($outFile , "\n");
fwrite($outFile, "PRINT THE WEIRD ANSWER: $ans");
fwrite($outFile , "\n");
fwrite($outFile , "GRADE PRINTED $grade");
fwrite($outFile, "cf  $cf , pf $pf , cw  $cw, pw $pw , cp $cp , pp $pp");
fwrite($outFile , "\n");
fwrite($outFile, "DBDATA : print_r($DBdata)"); 
fclose($outFile);

#setting up to send to DB 
$rowdata = array(
"UCID"=>$UCID,
"QID"=>$QID,
"EID"=>$EID,
"SAnswer"=>$answer,
"QPoints"=>$grade,
"Comments"=>$outComment
);


#if grade is negative number set to zero 
if($grade <0){
  $grade = 0; 
  
}


$jsonResult = json_encode($rowdata);

//send the data to the DB
$furl = 'https://web.njit.edu/~gfn4/Projectdb/dbGradeAnswer.php';
$f = curl_init($furl);
curl_setopt($f, CURLOPT_POSTFIELDS, $jsonResult);
curl_setopt($f, CURLOPT_RETURNTRANSFER, true);
curl_setopt($f, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
$fResult = curl_exec($f);
curl_close($f);

echo($fResult);






?>
