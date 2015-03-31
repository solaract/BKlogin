<?php
	// name:cookie 名称
	// value:可选，cookie 值
	// expire:可选，过期时间，时间戳格式
	// path:可选，服务器端有效路径，/ 表示整个域名有效，默认为当前设置 cookie 时页面的路径
	// domain:可选，该 cookie 有效的域名
	// setcookie(name, value, expire, path, domain);

	session_start();//开启session
	// header('Content-Type: text/xml');
	// header("Cache-Control: no-cache, must-revalidate");
	// date_default_timezone_set('prc');
	// $time = time();
	// echo "$time";
	class c_obj {
		public $is_cookie;
		public $c_value;
		function __construct($bool,$value){
			$this->is_cookie = $bool;
			$this->c_value = $value;
		}
		// 把有中文值的对象转成json
		function to_json(){
			$this->c_value = urlencode($this->c_value);
			$str_json = json_encode($this);
			$this->c_value = urldecode($this->c_value);
			return urldecode($str_json);
		}
	};
	if(isset($_SESSION['name'])){
		$username=$_SESSION['name'];
		// echo "$username";
		setcookie('username',$username,time()+50);
		$c_jsont = new c_obj(true,$username);
		$c_jsont = $c_jsont->to_json();
		echo $c_jsont;
		exit();
	}
	if(isset($_POST["testLogin"])){
		exit();
	}
	require_once('mysql.class.php');

	$DB = mysql::getInstance();//单例模式
	$name = $DB -> test_input($_POST["name"]);
	$password = $DB -> test_input($_POST["password"]);
	if(strlen($name)<=6||!$DB->reg_test($name)){
		echo "请正确输入账号";
		exit();
	};
	if(strlen($password)<=6||!$DB->reg_test($password)){
		echo "请输入密码";
		exit();
	};
	// $password = md5(md5($password));
	$response = $DB->login($name,$password);
	// $_SESSION['username'] = $name;
	// //有中文值的json编码
	// function to_json() {
 //        //url编码,避免json_encode将中文转为unicode
 //        $this->item2 = urlencode($this->item2);
 //        //对象json编码
 //        $str_json = json_encode($this);
 //        //url解码,转完json后将各属性返回,确保对象属性不变
 //        $this->item2 = urldecode($this->item2);
 //        return urldecode($str_json);
 //    }
	
	// $c_jsont = new c_obj($response,$name);
	// $c_jsont = json_encode($c_jsont);
	// echo $c_jsont;
	if($response===true){
		setcookie('username',$name,time()+50);
		$c_jsont = new c_obj($response,$name);
		$c_jsont = $c_jsont->to_json();
		echo $c_jsont;
	}
	else{
		$c_jsonf = new c_obj(false,$response);
		$c_jsonf = $c_jsonf->to_json();
		echo $c_jsonf;
	}
	// echo "$response";
	// echo "$_COOKIE[username]";
	// echo $_SESSION['username'];
	// echo $_SESSION['user_id'];
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