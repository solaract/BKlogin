/**
 * Created by zxy on 2015/3/21.
 */
var login=document.getElementsByClassName('show_login');
login.ondragstart=function(e){
    var target,top,left;
    target= e.srcElement||e.target;
    top=target.offsetTop;
    left=target.offsetLeft;
    e.dataTransfer.setData("text/plain",top+'px;'+left+'px');
    alert(e.dataTransfer.getData("text/plain"));
};