/**
 * Created by zxy on 2015/3/21.
 */
 (function(){
 	var login=document.getElementsByClassName('show_login');
 	var show=document.getElementsByClassName('show');
	login[0].ondragstart=function(e){
		// alert(0);
	    var target,top,left;
	    target= e.srcElement||e.target;
	    top=target.style.top||'0px';
	    left=target.style.left||'0px';
	    e.dataTransfer.setData("text/plain",top+';'+left);
	    // alert(e.dataTransfer.getData("text/plain"));
	};
	show[0].ondragover=function(e){
		e.preventDefault();
	}
	show[0].ondrop=function(e){
		// alert(0);
		var target,top,left,date;
		target= e.srcElement||e.target;
		date=e.dataTransfer.getData("text/plain");
		date=date.split(';');
		top=date[0];
		left=date[1];
		alert(top);
		target.style.top=top||'0px';
		target.style.left=left||'0px';
	}
 })();
