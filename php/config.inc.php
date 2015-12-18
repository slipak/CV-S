<?php

$dbuser = 'malkosua_beta';
$dbpass = '$em0cleW$';
$dbname = 'malkosua_beta';
$dbhost = 'localhost';

try
{
	$db = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
}
catch (PDOException $e)
{
	exit('There was an error connecting to database');
}