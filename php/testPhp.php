<?php
	require_once('mysql.class.php');
	$DB = mysql::getInstance();//单例模式
	$com = $DB->getCom(1,5);
    print_r($com)
?>