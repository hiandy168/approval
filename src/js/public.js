/*
 * @Author: Administrator
 * @Date:   2017-05-24 13:45:39
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-16 09:58:33
 */

'use strict';

var getRoothPath = "http://192.168.1.78:8080";
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

function control(BankNo) { // 开户账号输入模拟银行卡输入效果
	if (BankNo.value == "") return;
	var accounNumber = new String(BankNo.value);
	accounNumber = accounNumber.substring(0, 22); /*帐号的总数, 包括空格在内 */
	if (accounNumber.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
		/* 对照格式 */
		if (accounNumber.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
				".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
			var accounNumberNumeric = "",
				accounNumberChar = "",
				i;
			for (i = 0; i < accounNumber.length; i++) {
				accounNumberChar = accounNumber.substr(i, 1);
				if (!isNaN(accounNumberChar) && (accounNumberChar != " ")) accounNumberNumeric = accounNumberNumeric + accounNumberChar;
			}
			accounNumber = "";
			for (i = 0; i < accounNumberNumeric.length; i++) { /* 可将以下空格改为-,效果也不错 */
				if (i == 4) accounNumber = accounNumber + " "; /* 帐号第四位数后加空格 */
				if (i == 8) accounNumber = accounNumber + " "; /* 帐号第八位数后加空格 */
				if (i == 12) accounNumber = accounNumber + " "; /* 帐号第十二位后数后加空格 */
				accounNumber = accounNumber + accounNumberNumeric.substr(i, 1)
			}
		}
	} else {
		accounNumber = " " + accounNumber.substring(1, 5) + " " + accounNumber.substring(6, 10) + " " + accounNumber.substring(14, 18) + "-" + accounNumber.substring(18, 25);
	}
	if (accounNumber != BankNo.value) BankNo.value = accounNumber;
}

function paste(e) { // 开户账号监测粘贴内容
	setTimeout(function() {
		e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
	}, 0)
}