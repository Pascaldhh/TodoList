<?php
require_once('db.php');

$value = str_replace("'", "''", $_POST['todo']);

$db->Create('`to_dos`', '`id`, `todo`, `state`', "NULL, '".$value."', '1'");