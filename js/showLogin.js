/**
 * Created by zxy on 2014/10/18.
 */

//ajax组件
// ajaxObj{
//     success:  ....,
//     type:  "...",
//     url:  "...",
//     postSend:  ...， 
//     setRH:{
//          header:"...",
//          value:"..."
//      }    
// }
function makeAjax(ajaxObj){
    var xmlhttp;
    // if (str=="")
    //   {
    //   document.getElementById("txtHint").innerHTML="";
    //   return;
    //   }
    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    //ajax回调函数  
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
        var response = xmlhttp.responseText||xmlhttp.responseXML;
        if(typeof(ajaxObj.success)==='function')ajaxObj.success(response);
        else return;
      }
      else{
        if(typeof(ajaxObj.fail)==='function')ajaxObj.fail();
        else return;
      }

    };
    //ajaxObj.type默认值
    if(typeof(ajaxObj.type)!=='string')ajaxObj.type='Get';
    xmlhttp.open(ajaxObj.type,ajaxObj.url,true);
    // xmlhttp.open("POST","ajax_test.asp",true);
    // xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // xmlhttp.send("fname=Bill&lname=Gates");
    // setRequestHeader(header,value);向请求添加http头部
    // application/x-www-form-urlencoded：窗体数据被编码为名称/值对。这是标准的编码格式。
    // multipart/form-data：窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
    // text/plain：窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符
    if(typeof(ajaxObj.setRH)==='object')xmlhttp.setRequestHeader(ajaxObj.setRH.header,ajaxObj.setRH.value);
    ajaxObj.postSend=ajaxObj.postSend||null;
    xmlhttp.send(ajaxObj.postSend);
}
//切换登陆栏和用户栏
function switch_user(main,n_json){
    var user_1=document.getElementById('user_1');
    var user_2=document.getElementById('user_2');
    var user_name=document.getElementById('user_name');
    if(main=='user_1'){
        user_1.style.display='block';
        user_2.style.display='none';
    }
    else{
        user_1.style.display='none';
        user_2.style.display='block';
        // var username=cookie_get('username');
        var username=n_json.c_value;
        user_name.innerText=username||'未知';
        document.getElementById('show_1').style.display='none';
    }
}
// //设置cookie值
// function cookie_set(c_name,c_value,freeTime){
//     var time = new Date();
//     if(!freeTime)freeTime=3600*1000;
//     time.setTime(time.getTime()+freeTime);
//     if(c_name!=''||c_name!=null){
//         document.cookie=c_name+'='+c_value+';expires='+time.toUTCString();
//     }
// }
// //获取cookie值,没有则返回空值
// function cookie_get(c_name){
//     var cookie = document.cookie;
//     if(cookie.length>0){
//         var c_start = document.cookie.indexOf(c_name);
//         if(c_start!=-1){
//            c_start += c_name.length+1;
//             var c_end = cookie.indexOf(';',c_start);
//             if(c_end!=-1)return cookie.substring(c_start,c_end);
//             else{
//                 return cookie.substring(c_start);
//             }  
//         }   
        
//     }
//     return '';
// }
// //删除cookie
// function cookie_del(c_name){
//     var time = new Date();
//     time.setTime(time.getTime()-1000);
//     if(c_name!=''||c_name!=null){
//         var c_value = cookie_get(c_name);
//         document.cookie=c_name+'='+c_value+';expires='+time.toUTCString();
//     }
// }
//切换导航user栏
function cookie_setUser(){
    var username = cookie_getUser('username');
    if(username != null&&username!=''){
        switch_user('user_2',username);
    }
}
//登陆界面
function showLogin(){
    //界面功能
    var error =document.getElementById('login_error');
    var username= document.getElementById("username");
    var password=  document.getElementById("password");
    //数字字母和下划线
    var reg=/\w+/;
    document.getElementById('login_close').onclick=function(){
        document.getElementById('show_1').style.display='none';
        //关闭时重置
        error.innerText='';
        error.style.visibility='hidden';
        username.value='账号';
        password.value='密码';
        password.type='text';
    };
    username.onfocus=function(){
        if(this.value=='账号'){
            this.value='';
        }

    };
    username.onblur=function(){
        if(this.value==''){
            this.value='账号';
        }
        //账号格式不对时显示错误信息
        else if(username.value.length<=6||!reg.test(username.value)){
           // alert('请正确输入账号');
            error.innerText='请正确输入账号';
            error.style.visibility='visible';
            // return false;
        }
    };
    password.onfocus=function(){
        if(this.value=='密码')
            this.value='';
        //输入时改为密文
            this.type='password';
    };
    password.onblur=function(){
        if(this.value==''){          
            this.value='密码';
            //未输入时改为明文
            this.type='text';
        }
        //密码格式不对时显示错误信息
        if(password.value.length<=6||!reg.test(password.value)){
            error.innerText='请输入密码';
            error.style.visibility='visible';
        }
        // else if(username.value.length>6||username.value!='账号'||reg.test(username.value)){
        //     error.style.visibility='visible';
        // }
    };
    // 登录表单验证
    document.getElementById("form_login").onsubmit=function(){
//        var error =document.getElementById('login_error');
//        var username=document.getElementById("username");
//        var password=document.getElementById("password");
        // var reg=/[0-9]+/;
        //submit前检查账号密码是否规范，return false中止submit
        if(username.value.length<=6||!reg.test(username.value)){
//            alert('请正确输入账号');
            error.innerText='请正确输入账号';
            error.style.visibility='visible';
            return false;
        }
        else if(password.value.length<=6||!reg.test(username.value)){
//            alert('请输入密码');
            error.innerText='请输入密码';
            error.style.visibility='visible';
            return false;
        }
       
        else {  
            sendValue = 'name='+username.value+'&'+'password='+password.value;
            // alert(sendValue);
            makeAjax({
                success:function(response){
                    // response=eval('('+response+')');兼容性较好但安全性较差
                    response=JSON.parse(response);//ECMAScript5,低版本json.js支持
                    // JSON.stringify(obj); //将JSON对象转化为JSON字符，ECMAScript5,低版本json.js支持
                   // console.log(response);
                   // document.write(response);
                   //判断是否登陆成功
                    if(response.is_cookie){
                        // cookie_set('username',response.c_value);
                        //切换到已登录状态
                        switch_user('user_2',response);
                    }
                    //否则显示返回的错误信息
                    else{
                        var error =document.getElementById('login_error');
                        error.innerText=response.c_value;
                        error.style.visibility='visible';
                    }
                },
                type:"post",
                url:"php/login.php",
                postSend:sendValue,
                setRH:{
                    header:"Content-type",
                    //发送格式为form默认格式
                    value:"application/x-www-form-urlencoded"
                }
            });
//            alert(sendValue);
        //取消默认提交方式
            return false;
        }
       
    };
}
//注册界面
function showRegist(){
    //界面功能
    var username= document.getElementById("re_username");
    var password=  document.getElementById("re_password");
    var error =document.getElementById('regist_error');
    var reg=/\w+/;
    document.getElementById('register_close').onclick=function(){
        //关闭时重置
        document.getElementById('show_2').style.display='none';
        error.innerText='';
        error.style.visibility='hidden';
        username.value='账号';
        password.value='密码';
        password.value='text';
    };
    username.onfocus=function(){
        if(this.value=='账号'){
            this.value='';
        }

    };
    username.onblur=function(){
        if(this.value==''){
            this.value='账号';
        }
        else if(username.value.length<=6||!reg.test(username.value)){
//            alert('请正确输入账号');
            error.innerText='请正确输入账号';
            error.style.visibility='visible';
            // return false;
        }
        //查询用户名是否可用
        else{
            //重置error
            error.style.visibility='hidden';
            error.innerText='';
            // alert(1);
            sendValue = 'name='+username.value;
            makeAjax({
               success:function(response){
                   // response=JSON.parse(response);//ECMAScript5,低版本json.js支持
                   //显示错误信息，注册失败
                   if(response){
                        // alert(response); 
                        // document.write(response);
                        var error =document.getElementById('regist_error'); 
                        error.innerText=response;
                        error.style.visibility='visible';
                   }
               },
                type:"post",
                url:"php/regist.php",
                postSend:sendValue,
                setRH:{
                    header:"Content-type",
                    //发送格式为form默认格式
                    value:"application/x-www-form-urlencoded"
                }
            });
        }
    };
    password.onfocus=function(){
        if(this.value=='密码')
            this.value='';
            //输入时改为密文
            this.type='password';
    };
    password.onblur=function(){
        if(this.value==''){
            this.value='密码';
            //未输入时改为明文
            this.type='text';
        }
        else if(password.value.length<=6||!reg.test(password.value)){
            error.innerText='请输入密码';
            error.style.visibility='visible';
        }
        else if(username.value.length>6||username.value!='账号'||reg.test(username.value)){
            error.style.visibility='visible';
        }
    };
    // 注册表单验证
    document.getElementById("form_regist").onsubmit=function(){
       var error =document.getElementById('regist_error');
       var username=document.getElementById("re_username");
       var password=document.getElementById("re_password");
        var reg=/[0-9]+/;
        // submit前检查账号密码是否规范，return false中止submit
        if(username.value.length<=6||!reg.test(username.value)){
//            alert('请正确输入账号');
            error.innerText='请正确输入账号';
            error.style.visibility='visible';
            return false;
        }
        else if(password.value.length<=6||!reg.test(username.value)){
//            alert('请输入密码');
            error.innerText='请输入密码';
            error.style.visibility='visible';
            return false;
        }

        else {
            sendValue = 'name='+username.value+'&'+'password='+password.value;
            makeAjax({
               success:function(response){
                   // response=eval('('+response+')');兼容性较好但安全性较差
                   // response=JSON.parse(response);//ECMAScript5,低版本json.js支持
                   // JSON.stringify(obj); //将JSON对象转化为JSON字符，ECMAScript5,低版本json.js支持
                   // console.log(response);
                   // document.write(response);
                   if(response){
                        // alert(response);
                        // document.write(response);
                        var error =document.getElementById('regist_error');
                        error.innerText=response;
                        error.style.visibility='visible';
                       // cookie_set('username',response.c_value);
                       // switch_user('user_2',response);
                   }
                   // else{
                   //     var error =document.getElementById('login_error');
                   //     error.innerText=response.c_value;
                   //     error.style.visibility='visible';
                   // }
               },
                type:"post",
                url:"php/regist.php",
                postSend:sendValue,
                setRH:{
                    header:"Content-type",
                    value:"application/x-www-form-urlencoded"
                }
            });
            // alert(sendValue);
            //取消默认提交方式
            return false;
        }

    };
}
//作品上传表单验证
function upFile(){
    var up_txt=document.getElementById('up_txt');
    document.getElementById('up_file').onchange=function(){
        var file=this.value;
        var doc=file.match(/[^\\]+.doc/);
        var zip=file.match(/[^\\]+.zip/);
        var rar=file.match(/[^\\]+.rar/);
        if(doc!=null){
            up_txt.innerHTML=doc[0];
        }
        else if(zip!=null){
            up_txt.innerHTML=zip[0];
        }
        else if(rar!=null){
            up_txt.innerHTML=rar[0];
        }
        else{
            alert('请选择正确的文件格式')
        }
    };
    document.getElementById('up_form').onsubmit=function(){
        if(up_txt.innerHTML==''||up_txt.innerHTML==null){
            alert('请先选择文件');
            return false;
        }
    };
    
}
// document.getElementById('user_quit').onclick=function(){
//     cookie_del('username');
// };
//打开、关闭作品上传界面
document.getElementById('user_upload').onclick=function(){
    document.getElementById('upload').style.display='block';
    upFile();
};
document.getElementById('close_2').onclick=function(){
    document.getElementById('upload').style.display='none';
};

//打开登陆界面
document.getElementById('user_login').onclick=function(){
    document.getElementById('show_1').style.display='block';
    showLogin();
};
//打开注册界面
document.getElementById('user_register').onclick=function(){
    document.getElementById('show_2').style.display='block';
    showRegist();
};


