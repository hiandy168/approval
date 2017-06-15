/*
* @Author: Administrator
* @Date:   2017-05-24 14:52:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-14 16:30:47
*/

'use strict';
function Expenses(){               
}

Expenses.prototype = {
    get_ddUserID: function(){ //获取ddUserID
        var url = window.location.href;

        if (url.indexOf("ddUserID") != -1) {
            var ddUserID = window.location.search;
            ddUserID = ddUserID.split("=")[1];
            $my.ddUserID = ddUserID;
        } else {
            $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
            throw new Error("url错误");
        };  
    },
    verification: function(ddUserID){
    	if (ddUserID != null && ddUserID != "null") {
    		$.ajax({
    		    url: getRoothPath+'/ddExpenses/userController/login',
    		    data: { "ddUserID":ddUserID},
    		    // async: false, //同步
    		    success:function(data){
    		        console.log(data)
    		        if (JSON.stringify(data) !== "{}") 
    		        {
    		            var status = data.status;

                        switch (status) {
                            case "true":
                                var info,userID;
                                
                                info = data.info;
                                if (info.length) {
                                    userID = info[0].userID;
                                    sessionStorage.setItem("ddUserID", userID);

                                    // window.location.href = "dist/html/index.html"; //正式
                                    window.location.href = "./src/html/index.html"; //测试
                                } else {
                                    $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");
                                    return;
                                };

                                break;
                            case "failure":
                                $my.messageInfo.html("登录错误").fadeIn("fast").delay("1000").fadeOut("slow");
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
    	} else{
    		$my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow");
    		return;
    	};
    }
}

var expenses = new Expenses();

$(function() {
    window.$my = {
        messageInfo: $(".messageInfo")
    }

    !function(){
        localStorage.removeItem("sessionTouchData_mySponser");
        localStorage.removeItem("pageNum_mySponser");
        localStorage.removeItem("dataCount_mySponser");
        localStorage.removeItem("sessionTouchData_myApproval");
        localStorage.removeItem("pageNum_myApproval");
        localStorage.removeItem("dataCount_myApproval");
    }();

    expenses.get_ddUserID();
    expenses.verification($my.ddUserID);
});