<?php
  /**
  * 
  */
  class mysql
  {
  	private static $_instance;  //保存类实例的私有静态成员变量
	private $dsn;				//主机和库名
	private $db_user;			//用户名
	private $db_pwd;			//密码
	private $code;				//编码
	private $dbh;				//POD变量保存
	//私有化构造函数，避免外部赋值
  	private function __construct($dsn='mysql:host=localhost;dbname=test',$db_user='root',$db_pwd='',$code = 'utf8')
  	{
  		$this->dsn = $dsn;
  		$this->db_user = $db_user;
  		$this->db_pwd = $db_pwd;
  		$this->code = $code;
  		try{
  			$this->dbh = new PDO(
  				$this->dsn,
  				$this->db_user,
  				$this->db_pwd,
				array(PDO::MYSQL_ATTR_INIT_COMMAND =>"SET NAMES '$this->code'")
				);
  		}
  		catch (PDOException $e){
  			print "Error </br>";
  			die();
  		}
  	}
  	//后门
  	public static function getInstance(){
  		if(!(self::$_instance instanceof self)){
  			self::$_instance = new self();
  		}
  		return self::$_instance;
  	}
  	//转换，去掉不合法字符  安全
  	public function test_input($data){
  		//通过 PHP trim() 函数,去除用户输入数据中不必要的字符（多余的空格、制表符、换行)
  		$data = trim($data);
  		//通过 PHP stripslashes() 函数,删除用户输入数据中的反斜杠（\）
  		$data = stripcslashes($data);
  		//htmlspecialchars() 函数把特殊字符转换为 HTML 实体
  		$data = htmlspecialchars($data);
  		return $data;
  	}
  	public function regist($name,$password){
  		$hasNames = $this->dbh->prepare("SELECT `name` FROM `user` where `name` = :name");
  		$hasNames -> bindParam(':name',$name);
  		$nowNames = $hasNames->execute();
  		$nowNames = $hasNames->fetchAll(PDO::FETCH_OBJ);
  		if($nowNames){
  			$have = $nowNames[0] -> name;
  		}
  		else{
  			$have=false;
  		}
  		if(!$have){
  			echo "$name";
  			$addInfo = $this->dbh->prepare("INSERT INTO `user` (name,password) VALUES (:name,:password)");
  			$addInfo -> bindParam(':name',$name);
  			$addInfo -> bindParam(':password',$password);
  			$addInfo -> execute();
  		}	
  	}
  	public function login($name,$password){
  		$loginInfo = $this->dbh->prepare("SELECT * FROM `user` where `name` = :name");
  		$loginInfo -> bindParam(':name',$name);
  		$getInfo = $loginInfo->execute();
  		$getInfo = $loginInfo->fetchAll(PDO::FETCH_OBJ);
  		if($getInfo){
  			$getPassword = md5(md5($getInfo[0]->password));
  			$getName = $getInfo[0]->name;
  			$getId = $getInfo[0]->user_id;
  			if($getPassword===$password){
  				// $_SESSION['password'] = $getPassword;
  				// $_SESSION['name'] = $getName;
  				// $_SESSION['login'] = true;
  				$_SESSION['username'] = $name;
          // setcookie(session_name(),session_id(),time()+24*3600);
          // setcookie('username',$name,time()+24*3600);
          // setcookie("password",$getPassword,time()+24*3600);
  				return 'true';
  			}
  			else{
  				return "密码错误";
  			}
   		}
  		else{
  			return "用户不存在，请先注册";
  		}
  	}
  	function __destruct(){
  		$this->dbh = null;
  	}
  	
  }
  // $DB = mysql::getInstance();
?>