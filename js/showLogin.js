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
function switch_user(main,username){
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
        var username=cookie_get('username');
        user_name.innerText=username||'未知';
        document.getElementById('show').style.display='none';
    }
}
//设置cookie值
function cookie_set(c_name,c_value,freeTime){
    var time = new Date();
    if(!freeTime)freeTime=3600*1000;
    time.setTime(time.getTime()+freeTime);
    if(c_name!=''||c_name!=null){
        document.cookie=c_name+'='+c_value+';expires='+time.toUTCString();
    }
}
//获取cookie值,没有则返回空值
function cookie_get(c_name){
    var cookie = document.cookie;
    if(cookie.length>0){
        var c_start = document.cookie.indexOf(c_name);
        if(c_start!=-1){
           c_start += c_name.length+1;
            var c_end = cookie.indexOf(';',c_start);
            if(c_end!=-1)return cookie.substring(c_start,c_end);
            else{
                return cookie.substring(c_start);
            }  
        }   
        
    }
    return '';
}
//删除cookie
function cookie_del(c_name){
    var time = new Date();
    time.setTime(time.getTime()-1000);
    if(c_name!=''||c_name!=null){
        var c_value = cookie_get(c_name);
        document.cookie=c_name+'='+c_value+';expires='+time.toUTCString();
    }
}
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
    document.getElementById('close').onclick=function(){
        document.getElementById('show').style.display='none';
    };
    document.getElementById("username").onfocus=function(){
        if(this.value=='账号'){
            this.value='';
        }

    };
    document.getElementById("username").onblur=function(){
        if(this.value==''){
            this.value='账号';
        }

    };
    document.getElementById("password").onfocus=function(){
        if(this.value=='密码')
        this.value='';
    };
    document.getElementById("password").onblur=function(){
        if(this.value==''){
            this.value='密码';
        }

    };
    // 登录表单验证
    document.getElementById("form_login").onsubmit=function(){
        var error =document.getElementById('login_error');
        var username=document.getElementById("username");
        var password=document.getElementById("password");
        // var reg=/[0-9]+/;
        if(username.value==''||username.value=='账号'){
//            alert('请正确输入账号');
            error.innerText='请正确输入账号';
            error.style.visibility='visible';
            return false;
        }
        else if(password.value==''||password.value=='密码'){
//            alert('请输入密码');
            error.innerText='请输入密码';
            error.style.visibility='visible';
            return false;
        }
       
        else {  
            sendValue = 'name='+username.value+'&'+'password='+password.value;
            makeAjax({
                success:function(response){
                    response=eval('('+response+')');
//                    console.log(response);
                   // document.write(response);
                    if(response.is_cookie){
                        cookie_set('username',response.c_value);
                        switch_user('user_2');
                    }
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
                    value:"application/x-www-form-urlencoded"
                }
            });
//            alert(sendValue);

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
    document.getElementById('show').style.display='block';
    showLogin();
};



