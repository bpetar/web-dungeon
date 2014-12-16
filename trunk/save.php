<?php

$headers = getallheaders();

if ($headers["Content-type"] === "application/json")
{
    $save_data = json_decode(file_get_contents("php://input"), true) ?: [];
	
	//store save_data to database here!
	
	echo $save_data["inventory"][0];
}

?>