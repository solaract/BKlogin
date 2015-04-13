<?php
	session_start();
	require_once('mysql.class.php');
	$DB = mysql::getInstance();//单例模式
	if(!isset($_SESSION['name'])){
		echo "请先登录！";
		exit();
	}
	else{
		$username = $_SESSION['name'];
		if(!isset($_GET['content'])||$_GET['content']===''){
			echo "评论不能为空！";
			exit();
		}
		else{
			$content = $_GET['content'];
			$content = $DB->test_input($content);
			$codeLen = $DB->strCodeLen($content);
			if($codeLen>=376){
				echo "评论超出限定长度！";
				exit();
			}
			else{
				$respond = $DB->addCom($username,$content);
				echo "$respond";
			};
		};
	};
?>