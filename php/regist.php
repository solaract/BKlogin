<?php 
	require_once('mysql.class.php');
	$DB = mysql::getInstance();//单例模式
	$name = $DB -> test_input($_POST["name"]);
	$password = $DB -> test_input($_POST["password"]);
	$DB -> regist($name,$password);
 ?>