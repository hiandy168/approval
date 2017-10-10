/*
 * @Author: Administrator
 * @Date:   2017-05-24 13:45:39
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-10 10:30:59
 */

'use strict';

var getRoothPath = "http://192.168.1.75:8080";
// var getRoothPath = "http://www.ehaofangwang.com";
// var getRoothPath = "http://192.168.1.58:8080";

var pageSize = 10; //分页大小

var clouddnImgStr = "http://oitvtdaml.bkt.clouddn.com"; //上传图片返回拼接域名

//设置全局ajax
$.ajaxSetup({
	type: 'POST',
	dataType: 'json',
	timeout: 5000,
	error: function() {
		$my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	},
	complete: function(XMLHttpRequest, status) {　　　　
		if (status === 'timeout') { //超时,status还有success,error等值的情况
			　　　　　
			$my.messageInfo.html("连接超时,请刷新页面").fadeIn("fast").delay("1000").fadeOut("slow");　　　　
		}　　
	}
});

if (/Android [4-6]/.test(navigator.appVersion)) { // 解决软键盘弹出遮盖bug
	window.addEventListener('resize', function() {
		if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
			window.setTimeout(function() {
				document.activeElement.scrollIntoViewIfNeeded()
			}, 0)
		}
	})
}