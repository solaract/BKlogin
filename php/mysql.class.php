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
    public function reg_test($str){
      $reg='/\w+/';
      $result=preg_match($reg,$str);
      return $result;
    }
    //计算字符串编码长度（中文=2，英文=1）
    public function strCodeLen($str){
      // mb_strlen($str,'utf-8');utf-8下字符串长度，如'速度'的长度为2
      //字符串长度  utf-8中文占3位，GBK中文占2位  如'速度'的长度为6
      $len = strlen($str);
      for($count = 0,$i = 0;$i<$len;){
        //将i索引处的字符转成ASCII码
        $code = ord($str{$i});
        if($code>=0&&$code<=128){
          $count+=1;
          $i+=1;
        } 
        else{
          $count+=2;
          //utf-8中文占3位，
          $i+=3;
        };
      };
      return $count;
    }
    //检查数据库中是否有这个用户
    public function test_name($name){
      // 预加载
      $hasNames = $this->dbh->prepare("SELECT `name` FROM `user` where `name` = :name");
      $hasNames->bindParam(':name',$name);
      $nowNames = $hasNames->execute();
      $nowNames = $hasNames->fetchAll(PDO::FETCH_OBJ);
      // 数据库中是否有这个用户
      if($nowNames){
        $have = true;
      }
      else{
        $have=false;
      }
      return $have;
    }
    // 注册
  	public function regist($name,$password){
      
      // 把用户名和密码添加进数据库
  			// echo "$name";
      $password = md5(md5($password).'zxy');
        // echo "$password";
  		$addInfo = $this->dbh->prepare("INSERT INTO `user` (name,password) VALUES (:name,:password)");
  		$addInfo -> bindParam(':name',$name);
  		$addInfo -> bindParam(':password',$password);
  		$addInfo -> execute();
  	}
    //登陆
  	public function login($name,$password){
      //预加载
  		$loginInfo = $this->dbh->prepare("SELECT * FROM `user` where `name` = :name");
      // 赋值
  		$loginInfo->bindParam(':name',$name);
      // 执行
  		$loginInfo->execute();
  		$getInfo = $loginInfo->fetchAll(PDO::FETCH_OBJ);
  		if($getInfo){
        // 加密后对比数据库
  			$getPassword = $getInfo[0]->password;
  			$getName = $getInfo[0]->name;
  			$getId = $getInfo[0]->user_id;
        $password = md5(md5($password).'zxy');
  			if($getPassword===$password){
  				// $_SESSION['password'] = $getPassword;
          // 创建session
  				$_SESSION['name'] = $getName;
  				// $_SESSION['login'] = true;
  				// $_SESSION['username'] = $name;
          // setcookie(session_name(),session_id(),time()+24*3600);
          // setcookie('username',$name,time()+24*3600);
          // setcookie("password",$getPassword,time()+24*3600);
  				return true;
  			}
  			else{
  				return "密码错误";
  			}
   		}
  		else{
  			return "用户不存在，请先注册";
  		}
  	}
    //添加评论
    public function addCom($name,$str){
      // date_default_timezone_set("Asia/Shanghai");
      //查询用户ID
      //预加载
      $idInfo = $this->dbh->prepare("SELECT user_id FROM `user` where `name` = :name");
      // 赋值
      $idInfo->bindParam(':name',$name);
      // 执行
      $idInfo->execute();
      $getIdInfo = $idInfo->fetchAll(PDO::FETCH_OBJ);
      if($getIdInfo){
        //向表中添加评论
        $getId = $getIdInfo[0]->user_id;
        // $time = date("Y-n-d H:i:sa");
        $addInfo = $this->dbh->prepare("INSERT INTO comment (content,uid) VALUES (:content,:uid)");
        $addInfo->bindParam(':content',$str);
        $addInfo->bindParam(':uid',$getId);
        $addInfo->execute();
        return "评论成功";
      }
      else{
        return "用户不存在，请先注册";
      }
    }
    public function page(){
      //预加载
      $comInfo = $this->dbh->prepare("SELECT * FROM `comment`");
      // 执行
      $comInfo->execute();
      $getComInfo = $comInfo->fetchAll(PDO::FETCH_OBJ);
      $all = count($getComInfo);
      $page = ceil($all/5);
      return $page;
    }
    public function getCom($page,$num){
      $index = ($page-1)*$num;
      var_dump($index);
      //预加载
      $comInfo = $this->dbh->prepare("SELECT * FROM `comment` LIMIT :index,:num");
      // 赋值
      $comInfo->bindParam(':index',$index);
      var_dump($index);
      $comInfo->bindParam(':num',$num);
      // 执行
      $comInfo->execute();
      $getComInfo = $comInfo->fetchAll(PDO::FETCH_OBJ);
      return $getComInfo;
    }
  	function __destruct(){
  		$this->dbh = null;
  	}
  }
  // $DB = mysql::getInstance();
?>