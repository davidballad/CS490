<?php
//Checks in the databse
$url = 'https://web.njit.edu/~gfn4/Projectdb/dbh.php';
$ch = curl_init($url); 
curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);    
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$cResult = curl_exec($ch);
curl_close($ch);
//echo $cResult;

//Checks using NJIT website
$url2 = 'https://aevitepr2.njit.edu/MyHousing/login.cfm';    
$nj = curl_init($url2);
curl_setopt($nj, CURLOPT_POSTFIELDS, $_POST);
curl_setopt($nj, CURLOPT_RETURNTRANSFER, true);
curl_setopt($nj, CURLOPT_FOLLOWLOCATION, true);
$nResult = curl_exec($nj);
curl_close($nj);    


$findAccept = 'Please Select a System to Sign Into'; 
     
$pos = strpos($nResult, $findAccept);
if($pos == false) { 
            $result2 = " \"middle\" : \"NJIT  doesnt recognize you\" }";
  echo $cResult.$result2;
 } 
else {
  $result2 = " \"middle\" : \"NJIT recognizes you\" }";
  echo $cResult.$result2;
}


