<?php
require_once('db.php');

$result = $db->Read($_POST['todo'], $_POST['select'], $_POST['where'], $_POST['join']);

$todos = json_encode($result);
echo $todos;