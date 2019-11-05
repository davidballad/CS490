<?php
header("Access-Control-Allow-Origin: *");
error_reporting(E_ERROR | E_PARSE);
$array = json_decode($HTTP_RAW_POST_DATA,true);
//echo $HTTP_RAW_POST_DATA;
//echo $array;

$curl = curl_init("https://web.njit.edu/~jw532/miTransfer.php"); //'https://web.njit.edu/~jw532/miGetExam.php'
//curl_setopt($curl, CURLOPT_POST, $HTTP_RAW_POST_DATA);
//curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~jw532/miTransfer.php');     //changePathAfterTesting
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $HTTP_RAW_POST_DATA);
//curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$response = curl_exec($curl);
curl_close($curl);

echo $response;

//$c = curl_init($url);
//curl_setopt($c, CURLOPT_POSTFIELDS, $HTTP_RAW_POST_DATA);
//curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
//curl_setopt($c, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
//$cResult = curl_exec($c);
//curl_close($c);
//echo $cResult;
?>
