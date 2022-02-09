<?php
require_once('db.php');

$db->Update('`todo_lists`', "name = '".$_POST['update']."'", "id = ".$_POST['id']);