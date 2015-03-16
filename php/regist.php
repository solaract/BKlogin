<?php 
	require_once('mysql.class.php');
	$DB = mysql::getInstance();//单例模式
	$name = $DB -> test_input($_POST["name"]);
	$password = $DB -> test_input($_POST["password"]);
	// $name = '123';
	// $password = '321';
	// $password = md5(md5($password));
	$response = $DB->regist($name,$password);
	// echo "123";
 ?>