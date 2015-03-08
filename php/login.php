<?php
	// session_start();
	require_once('mysql.class.php');

	$DB = mysql::getInstance();//单例模式
	$name = $DB -> test_input($_POST["name"]);
	$password = $DB -> test_input($_POST["password"]);
	$password = md5(md5($password));
	$DB->login($name,$password);
	// echo $_SESSION['login'];
	echo $_SESSION['user_id'];
	// echo "$_SESSION['name']";
	// echo "success";
	//非单例模式连接数据库方法
	// $DB = new mysql();
	// echo "zxy";
	 // try{
  //       $pdo=new PDO("mysql:host=localhost;dbname=test", "root", "");
  //       echo "成功";
  //   }catch(PDOException $e){
  //       echo "数据库连接失败：".$e->getMessage();//如果连接失败就抛出一个异常提示
  //       exit;
  //   }
	// $people = $DB->rand();
	
	// print_r($people);
	// echo $people[0]->stu_tzsh;
	// echo $people[0]->username;
	// echo $people[0]->user_num;
	//echo $people['num'];
	



	// // session_start();
	// // $_SESSION['test'] = 123;
	// // $_SESSION['test1'] = 123;
	// // //unset($_SESSION['test']); 
	
	// // session_destroy();
	// $value = '123';
	// setcookie('cook',$value,time()-3600);

	// $_COOKIE["cook"];

	// $HTTP_COOKIE_VARS[""]
?>