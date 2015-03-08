/**
 * Created by zxy on 2014/10/20.
 */
//作品上传界面
document.getElementById('user_upload').onclick=function(){
    document.getElementById('upload').style.display='block';
};
document.getElementById('close_2').onclick=function(){
    document.getElementById('upload').style.display='none';
};
//作品上传表单验证
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