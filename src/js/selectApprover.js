function EpUser(){
	this.config = {
		epUserWrap: document.querySelector("#epUserWrap")
	}
}

EpUser.prototype = {
	getEpUser: function(userID){ //获取常用审批人
		var self = this;
		if (userID != null && userID != "null") {
			$.ajax({
			    url: getRoothPath+'/ddExpenses/userController/oldExpensesUser',
			    // data: {"userID":userID},
			    data: {"userID":userID},
			    // async: false, //同步
			    success:function(data){
			        console.log(data)
			        if (JSON.stringify(data) !== "{}") 
			        {
			            var status = data.status;

			            switch(status){
			                case "true":
		                   		var info = data.info;
		                   		
								if (JSON.stringify(info) !== "{}") {
									var dataArr = info.data;
									if (dataArr.length) {
										var str = "";

										for (var i = 0,len = dataArr.length; i < len; i++) {
											str += '<li class="nowrap text-center" data-oldEpUserID='+dataArr[i].oldEpUserID+'>'+dataArr[i].oldEpUserUserName+'</li>';
										};

										self.config.epUserWrap.innerHTML = str;
									} else{
										$my.messageInfo.html("出纳人信息为空").fadeIn("fast").delay("1000").fadeOut("slow"); 
										return;
									};

								} else{
									$my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow"); 
									return;
								};
			                	break;
			                case "failure":
			                	$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow"); 
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
            return false;
		};	
	},
	selectEpUser: function(){ //选择常用审批人
		$(epUserWrap).on('click', 'li', function(event) {
			event.preventDefault();
			event.stopPropagation();

			// var userAgent = navigator.userAgent;
			// if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
			//    window.location.href="sponsor.html";
			// }else if(userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1){
			//    window.opener=null;window.open('sponsor.html','_self','').close();
			// }else {
			//    window.opener = null;
			//    window.open("sponsor.html", "_self");
			//    window.close();
			// };
		});
	}
}

var epUser = new EpUser;


$(function() {
	window.$my = {
	    messageInfo: $(".messageInfo"),
	    userID: sessionStorage.getItem("ddUserID")
	}

	epUser.getEpUser($my.userID);
	epUser.selectEpUser($my.userID);


	var allConcat = $("#allConcat");
	allConcat.on("click",".row",function(){
		window.location.href = "allApprover.html";
	});
});