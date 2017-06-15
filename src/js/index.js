function Approval(){
	this.mySponsoredCount = ""; //我发起的数量
	this.myExpenseCount = ""; //我审批的数量

	Object.defineProperty(this,"mySponsoredCount",{ 
	    get: function(){
	    	var reg = /^[0-9]*$/;
	    	if (reg.test(mySponsoredCount) && mySponsoredCount != "") 
	    	{
	    		return mySponsoredCount;
	    	} else
	    	{
	    		return mySponsoredCount = "--";
	    	};	        
	    },
	    set: function(value){
	    	if (value > 99) {
	    		mySponsoredCount = "99+";
	    	} else if(value >= 0 && value <= 99){
	    		mySponsoredCount = value;
	    	};
	    }
	});

	Object.defineProperty(this,"myExpenseCount",{ 
	    get: function(){
	    	var reg = /^[0-9]*$/;
	    	if (reg.test(myExpenseCount) && myExpenseCount != "") 
	    	{
	    		return myExpenseCount;
	    	} else
	    	{
	    		return myExpenseCount = "--";
	    	};	        
	    },
	    set: function(value){
	    	if (value > 99) {
	    		myExpenseCount = "99+";
	    	} else if(value >= 0 && value <= 99){
	    		myExpenseCount = value;
	    	};
	    }
	});

	this.config = {
		mySponsoredCount: document.querySelector("#mySponsoredCount"),
		myExpenseCount: document.querySelector("#myExpenseCount"),
		content: document.getElementById("content"),
		footer: document.querySelector(".footer")
	}
}

Approval.prototype = {
	throttle: function(method, context) { //点击节流
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
		}, 200);
	},
	bindDom: function(){ //绑定DOM
		this.config.mySponsoredCount.innerHTML = this.mySponsoredCount;
		this.config.myExpenseCount.innerHTML = this.myExpenseCount;
	},
	getUnreadNum: function(ddUserID){ //获取“未读消息”数量
		var self = this;
		if (ddUserID != null && ddUserID != "null") {
			$.ajax({
			    url: getRoothPath+'/ddExpenses/expenseInfo/sum',
			    data: { "userID": ddUserID},
			    // async: false, //同步
			    success:function(data){
			        console.log(data)
			        if (JSON.stringify(data) !== "{}") 
			        {
			            var status = data.status;

			            switch(status){
			                case "true":
			                   var info = data.info;
			                   var myExpenseCount = info.myExpenseCount;
			                   var mySponsoredCount = info.mySponsoredCount;

			                   self.myExpenseCount = myExpenseCount;
			                   self.mySponsoredCount = mySponsoredCount;
			                   self.bindDom();

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
			return;
		};
	},
	buffer: function(){
		var index = $(this).index();
		switch(index){
			case 0:
				window.location.href = "myApproval.html";
				break;
			case 1:
				window.location.href = "mySponser.html";
				break;
			default:
				break;
		}
	},
	bindEvents: function(){ //点击事件
		var self = this;
		var liList = self.config.content.querySelectorAll("li");
		var turnSponsorPage = function(){
			window.location.href = "sponsor.html";
		}
		
		Array.prototype.forEach.call(liList,function(item,index){
			item.addEventListener("touchend", function(event){
				event.preventDefault();
				event.stopPropagation();

				self.throttle(self.buffer, this);				
			}, false);
		});

		this.config.footer.addEventListener("touchend", function(event){
			event.preventDefault();
			event.stopPropagation();

			self.throttle(turnSponsorPage, this);
		}, false);
	}
}

var approval = new Approval(); //实例化approval

$(function() {
	window.$my = {
	    messageInfo: $(".messageInfo"),
	    ddUserID: sessionStorage.getItem("ddUserID")
	}

	approval.getUnreadNum($my.ddUserID); //获取“未读信息”数量
	
	approval.bindEvents(); // 绑定点击事件
});