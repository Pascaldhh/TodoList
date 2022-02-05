<?php
require_once('db.php');

$result = $db->Read($_POST['todo'], '*', '1', 'INNER JOIN to_dos ON todo_lists.id = to_dos.list_id');

$todos = json_encode($result);
echo $todos;