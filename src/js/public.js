/*
* @Author: Administrator
* @Date:   2017-05-24 13:45:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-13 17:40:10
*/

'use strict';

var getRoothPath = "";

var pageSize = 10; //分页大小

var clouddnImgStr = ""; //上传图片返回拼接域名

//设置全局ajax
$.ajaxSetup({
    type : 'POST',
    dataType : 'json',
    timeout : 5000,
    error: function(){
        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
    },
    complete : function(XMLHttpRequest,status){ 
　　　　if(status === 'timeout'){//超时,status还有success,error等值的情况
　　　　　  $my.messageInfo.html("连接超时,请刷新页面").fadeIn("fast").delay("1000").fadeOut("slow");
　　　　}
　　}
});
