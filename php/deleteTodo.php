<?php
require_once('db.php');



if($_POST['db'] == 'to_dos')
{
    $value = str_replace("'", "''", $_POST['deleteTodo']);
    $db->Delete('`to_dos`', "`todo` = '".$value."' AND `list_id` = '".$_POST['id']."'");
}
    
if($_POST['db'] == 'todo_lists')
{
    $db->Delete('`todo_lists`', "`id` = '".$_POST['id']."'");
    $db->Delete('`to_dos`', "`list_id` = '".$_POST['id']."'");
}
    