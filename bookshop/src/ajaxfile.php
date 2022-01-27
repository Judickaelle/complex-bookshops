<?php

include "config.php";

$userData = mysqli_query($bdd,"select * from g09.buecher1");

$response = array();

while($row = mysqli_fetch_assoc($userData)){

    $response[] = $row;
}

echo json_encode($response);
exit;
