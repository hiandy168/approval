/*
* @Author: Administrator
* @Date:   2017-06-08 10:24:12
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-14 16:34:55
*/

'use strict';
function Approval(){
	this.expenseID = ""; //报销id
	this.expenseReviewID = ""; //审核明细id

	this.config = {
		passedBtn: document.querySelector("#passedBtn"),
		inputContent: document.querySelector("#inputContent")
	}
}

Approval.prototype = {
	constructor: Approval,
	throttle: function(method, context) { //点击节流
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
		}, 200);
	},
	getUrlArguments: function(){
		var url = window.location.href;
		var getParam = function(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		}

		if (url.indexOf("expenseID") != -1 && url.indexOf("expenseReviewID") != -1) {
		    this.expenseID = getParam("expenseID");
		    this.expenseReviewID = getParam("expenseReviewID");
		} else {
		    $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
		    throw new Error("url错误");
		};
	},
	_passedFn: function(){
		var reviewType = approval.config.passedBtn.dataset["reviewtype"];
		var expenselog = approval.config.inputContent.value;

		$.ajax({
		    url: getRoothPath+'/ddExpenses/review/updataExpenseReview',
		    data: { 
		        "expenseID": approval.expenseID,
		        "expenseReviewID": approval.expenseReviewID,
		        "reviewType": reviewType,
		        "expenselog": expenselog
		    },
		    success:function(data){
		        console.log(data);
    	        if (JSON.stringify(data) !== "{}") 
    	        {
    	            var status = data.status;

    	            switch(status){
    	                case 1:
    	                	var timer = null;
                       		$my.messageInfo.html(data.msg).fadeIn("fast").delay("1000").fadeOut("slow");

                       		!function(){
                       		    localStorage.removeItem("sessionTouchData_mySponser");
                       		    localStorage.removeItem("pageNum_mySponser");
                       		    localStorage.removeItem("dataCount_mySponser");
                       		    localStorage.removeItem("sessionTouchData_myApproval");
                       		    localStorage.removeItem("pageNum_myApproval");
                       		    localStorage.removeItem("dataCount_myApproval");
                       		}();

                       		clearTimeout(timer);
                       		timer = setTimeout(function(){
                       			window.location.href = "index.html";
                       		}, 1200);
    	                	break;
    	                case 0:
    	                	$my.messageInfo.html("提交失败").fadeIn("fast").delay("1500").fadeOut("slow"); 
    	                	break;
    	                default:
    	                    break;
    	            }           
    	        } else
    	        {
    	            $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow");
    	            return false;
    	        };
		    }
		})
	},
	submitEvent: function(){
		var self = this;

		self.config.passedBtn.addEventListener("click", function(event){
			event.preventDefault();
			event.stopPropagation();

			self.throttle(self._passedFn, this);
		}, false);
	}
}

var approval = new Approval();

$(function() {
	window.$my = {
		messageInfo: $(".messageInfo")
	}

	approval.getUrlArguments();
	approval.submitEvent();
});