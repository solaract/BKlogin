<?php
	session_start();
	$act = $_GET['act'];
	if($act=='exit'){
		if(isset($_SESSION['name'])){
			unset($_SESSION['name']);
			unset($_COOKIE['name']);
		}	
	}
	// echo "$_SESSION['name']";
	header("Location:http://localhost/test/talk.html");
?>