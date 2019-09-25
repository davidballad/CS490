<?php

//header("Content-type: application/json; charset=UTF-8");
// $username = $_POST['ucid'];s
// $password = $_POST['pass'];

$curl = curl_init("https://web.njit.edu/~jw532/middleEnd.php");
//$info = array('username' => $username,'password' => $password);
//curl_setopt($curl, CURLOPT_POST, true);
//curl_setopt($curl, CURLOPT_URL, 'afsaccess1.njit.edu/~gfn4/.php');
//curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $_POST);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);
curl_close($curl);
echo $response;
?>
