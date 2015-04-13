/**
 * Created by zxy on 2015/3/21.
 */
 // (function(){
 // 	var login=document.getElementsByClassName('show_login');
 // 	var show=document.getElementsByClassName('show');
	// login[0].ondragstart=function(e){  //拖拽开始，绑定要拖动的元素
	// 	// alert(0);
	//     var target,top,left;
	//     target= e.srcElement||e.target;
	//     top=target.style.top||'0px';
	//     left=target.style.left||'0px';
	//     e.dataTransfer.setData("text/plain",top+';'+left); //写入数据
	//     // alert(e.dataTransfer.getData("text/plain"));
	// };
	// show[0].ondragover=function(e){
	// 	e.preventDefault();  //取消默认行为
	// }
	// show[0].ondrop=function(e){   //拖拽结束，绑定目标元素
	// 	// alert(0);
	// 	var target,top,left,date;
	// 	target= e.srcElement||e.target;
	// 	date=e.dataTransfer.getData("text/plain");  //读取数据
	// 	date=date.split(';');
	// 	top=date[0];
	// 	left=date[1];
	// 	alert(top);
	// 	target.style.top=top||'0px';
	// 	target.style.left=left||'0px';
	// }
 // })();


(function(){
	//绑定事件，兼容
    var bind=function(target,type,listener,useCapture){
        var useCapture = useCapture||false;
        if(document.addEventListener){
            target.addEventListener(type,listener,useCapture);
        }
        else{
            type='on'+type;
            target.attachEvent(type,listener,useCapture);
        }
    };
    //解绑事件，兼容
    var unbind=function(target,type,listener){
        if(document.addEventListener){
            target.removeEventListener(type,listener);
        }
        else{
            type='on'+type;
            target.detachEvent(type,listener);
        }
    };
    var drog_e=(function(){
    	//拖动触发元素，进行移动的元素（默认为触发拖动元素）
        var Drog=function(target,drog_ele){
            if(typeof target==="string"){
                this.target=document.getElementById(target);
            }
            else{
                this.target=target;
            }

            if(drog_ele===undefined){
                this.drog_ele=target;
            }
            else if(typeof drog_ele==="string"){
                this.drog_ele=document.getElementById(drog_ele);
            }
            else{
                this.drog_ele=drog_ele;
            }
            this.page=page;
        };
//	var login=document.getElementsByClassName('show_login')[0];
        var page = {
            get_page:function(e){
                var e=e||window.event;
                //获取鼠标距离窗口左上角的绝对坐标
                var pX= e.pageX||(e.clientX + document.body.scrollLeft - document.body.clientLeft);
                var pY = e.pageY || (e.clientY + document.body.scrollLeft - document.body.clientLeft);
                var pageArry=[pX,pY];
                return pageArry;
            }

            // get_css:function(e){
            // 	//位置坐标
            //     var oldP=page.get_page(e);
            //     //css值（relative）
            //     var startX=parseInt(drog_ele.style.left)||0;
            //     var startY=parseInt(drog_ele.style.top)||0;
            // },
            // is_add:function(){
            // 	if(document.addEventListener){
            // 		return true;
            // 	}
            // 	else{
            // 		return false;
            // 	}	
            // },
            // move:function(e,ele){
            // 	this.get_css(e);
            // 	//移动距离=移动位置坐标-初始位置坐标
            //     var x=newP[0]-oldP[0];
            //     var y=newP[1]-oldP[1];
            //     //移动css值=初始css值+移动距离
            //     ele.style.left=(x+startX)+'px';
            //     ele.style.top=(y+startY)+'px';
            // }
//                    getX:function(e){
//                    	var e = e || window.event;
//                    	var pX = e.pageX || (e.clientX + document.body.scrollLeft - document.body.clientLeft);
//                    	var lX = e.layerX || e.offsetX;
//                    	return pX - lX;
//                    },
//                    getY:function(e){
//                    	var e = e || window.event;
//                    	var pY = e.pageY || (e.clientY + document.body.scrollLeft - document.body.clientLeft);
//                    	var lY = e.layerY || e.offsetY;
//                    	return pY - lY;
//                    }
        };
        Drog.prototype.run=function(){
            var target=this.target;
            var drog_ele=this.drog_ele;
            // var get_css=this.get_css;
            // var up=this.up;
            // var move=this.move;
            bind(target,'mousedown',function(e){
            	//初始位置坐标
                var oldP=page.get_page(e);
                //初始css值（relative）
                var startX=parseInt(drog_ele.style.left)||0;
                var startY=parseInt(drog_ele.style.top)||0;
                var move=function(e){
                	//移动位置坐标
                    var newP=page.get_page(e);
                    // console.log(newP);
                    //移动距离=移动位置坐标-初始位置坐标
                    var x=newP[0]-oldP[0];
                    var y=newP[1]-oldP[1];
                    //移动css值=初始css值+移动距离
                    drog_ele.style.left=(x+startX)+'px';
                    drog_ele.style.top=(y+startY)+'px';
                };
                var up=function(){
//                    document.removeEventListener('mousemove',move);
                	unbind(document,'mousemove',move);
                	unbind(document,'mouseup',up);
                };
//                document.addEventListener('mousemove',move);
//                document.addEventListener('mouseup',up);
                bind(document,'mousemove',move);
                bind(document,'mouseup',up);
            });
        };
        return Drog;
    })();
    var drogLogin=new drog_e('drogLogin','login');
    drogLogin.run();
    var drogRegist=new drog_e('drogRegist','regist');
    drogRegist.run();

//    if (dv.setCapture) {
//                    dv.setCapture();
//                }
//                else if (window.captureEvents) {
//                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
//                }
//    d.onmousemove = function (e) {
//                    var tx = page.pageX(e) - x;
//                    var ty = page.pageY(e) - y;
//                    dv.style.left = tx + "px";
//                    dv.style.top = ty + "px";
//                }
//                d.onmouseup = function () {
//                    if (dv.releaseCapture) {
//                        dv.releaseCapture();
//                    }
//                    else if (window.releaseEvents) {
//                        window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
//                    }
//                    d.onmousemove = null;
//                    d.onmouseup = null;
//                }
})();
