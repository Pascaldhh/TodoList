<?php
require_once('db.php');

$value = str_replace("'", "''", $_POST['todo']);

if($_POST['dbname'] == 'to_dos')
    $db->Create('`to_dos`', '`id`, `list_id`, `todo`, `state`', "'NULL', '".$_POST['id']."', '".$value."', '1'");

if($_POST['dbname'] == 'todo_lists')
    $db->Create('`todo_lists`', '`id`, `name`', "'NULL', '".$_POST['todo']."'");