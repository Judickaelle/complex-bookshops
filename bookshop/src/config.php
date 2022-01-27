<?php
header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$username = "G09";
$password = "ws21roge";
$dbname = "g09";

try{
    $bdd = new mysqli($servername, $username, $password);
    $userData = mysqli_query($bdd,"select * from g09.buecher1");

    $response = array();

    while($row = mysqli_fetch_assoc($userData)){
        $response[] = $row;
    }

    echo json_encode($response);
    exit;
}catch(Exception $e){
    $error = die('Error : ' . $e->getMessage());
    debug_to_console($error);
}
?>