<?php

$dbuser = 'u_corevalu';
$dbpass = 'F40FvNw0';
$dbname = 'corevalue_com_ua';
$dbhost = 'localhost';

try
{
	$db = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
}
catch (PDOException $e)
{
	exit('There was an error connecting to database');
}