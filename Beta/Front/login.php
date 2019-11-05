<?php
//$array = json_decode($_POST['jData']);
//echo $array;
$curl = curl_init("https://web.njit.edu/~gfn4/Projectdb/dbVerify.php");
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
