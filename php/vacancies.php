<?php

include('config.inc.php');

$sth = $db->query('SELECT v.*, o.name as office_name FROM vacancies v INNER JOIN offices o ON (o.id = v.office_id) WHERE v.status = 1 ORDER BY v.office_id');

$values = array();

while($value = $sth->fetch(PDO::FETCH_ASSOC)) {
	if (!isset($values[$value['office_name']]))
	{
		$values[$value['office_name']] = array();
	}
	
	$values[$value['office_name']][] = array(
		'title' => $value['title'],
		'content' => utf8_encode($value['content'])
	);
}

header('Content-Type: application/json');
echo json_encode($values);