<?php 
	require_once('mysql.class.php');
	$DB = mysql::getInstance();//单例模式
	$name = $_POST["name"]||'';
	//输入用户名
	// $name = $DB -> test_input($_POST["name"]);
	// $have = $DB->test_name($name);
	// if($have){
	// 	echo $have;
	// }
	// else{
	// 	echo "用户名可用";
	// }
	if($name){
		$name = $DB -> test_input($_POST["name"]);
		$have = $DB->test_name($name);
		//用户名是否被注册
		if($have){
			echo $have;
		}
		//未被注册
		else{
			$password = $_POST["password"]||'';
			//输入密码
			if($password){
				$password = $DB -> test_input($_POST["password"]);
				$DB->regist($name,$password);
			}
			//返回用户未被注册信息
			else{
				echo "用户名可用";
			}
		}
	}
	
	
	// $name = '123';
	// $password = '321';
	// $password = md5(md5($password));
	
	// echo "123";
 ?>