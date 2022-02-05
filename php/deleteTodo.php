<?php
require_once('db.php');

$value = str_replace("'", "''", $_POST['deleteTodo']);

$db->Delete('`to_dos`', "`todo` = '".$value."'");