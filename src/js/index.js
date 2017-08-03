function Approval() {
	this.mySponsoredCount = ""; //我发起的数量
	this.myExpenseCount = ""; //我审批的数量
	this.ddUserID = ""; //ddUserID

	Object.defineProperty(this, "mySponsoredCount", {
		get: function() {
			var reg = /^[0-9]*$/;
			if (reg.test(mySponsoredCount) && mySponsoredCount != "") {
				return mySponsoredCount;
			} else {
				return mySponsoredCount = "--";
			};
		},
		set: function(value) {
			if (value > 99) {
				mySponsoredCount = "99+";
			} else if (value >= 0 && value <= 99) {
				mySponsoredCount = value;
			};
		}
	});

	Object.defineProperty(this, "myExpenseCount", {
		get: function() {
			var reg = /^[0-9]*$/;
			if (reg.test(myExpenseCount) && myExpenseCount != "") {
				return myExpenseCount;
			} else {
				return myExpenseCount = "--";
			};
		},
		set: function(value) {
			if (value > 99) {
				myExpenseCount = "99+";
			} else if (value >= 0 && value <= 99) {
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
	get_ddUserID: function() { //获取ddUserID
		var url = window.location.href;

		if (url.indexOf("ddUserID") != -1) {
			var ddUserID = window.location.search;
			ddUserID = ddUserID.split("=")[1];
			// $my.ddUserID = ddUserID;
			this.ddUserID = ddUserID;
		} else {
			$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			throw new Error("url错误");
		};
	},
	verification: function() { //验证登录
		var self = this;
		if (self.ddUserID != "" && self.ddUserID != null && self.ddUserID != "null") {
			$.ajax({
				url: getRoothPath + '/ddExpenses/userController/login.do',
				data: {
					"ddUserID": self.ddUserID
				},
				// async: false, //同步
				success: function(data) {
					console.log(data)
					if (JSON.stringify(data) !== "{}") {
						var status = data.status;

						switch (status) {
							case "true":
								var info, userID;

								info = data.info;
								if (info.length) {
									userID = info[0].userID;
									sessionStorage.setItem("ddUserID", userID);

									self._getUnreadNum(userID);
									// window.location.href = "dist/html/index.html"; //正式;
									// window.location.href = "src/html/index.html"; //测试
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
					} else {
						$my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow");
						return false;
					};
				}
			})
		} else {
			$my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return;
		};
	},
	bindDom: function() { //绑定DOM
		this.config.mySponsoredCount.innerHTML = this.mySponsoredCount;
		this.config.myExpenseCount.innerHTML = this.myExpenseCount;
	},
	_getUnreadNum: function(userID) { //获取“未读消息”数量
		var self = this;
		if (userID != "" && userID != null && userID != "null") {
			$.ajax({
				url: getRoothPath + '/ddExpenses/expenseInfo/sum.do',
				data: {
					"userID": userID
				},
				// async: false, //同步
				success: function(data) {
					console.log(data)
					if (JSON.stringify(data) !== "{}") {
						var status = data.status;

						switch (status) {
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
					} else {
						$my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow");
						return false;
					};
				}
			})
		} else {
			$my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return;
		};
	},
	buffer: function() {
		var index = $(this).index();
		switch (index) {
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
	bindEvents: function() { //点击事件
		var self = this;
		var liList = self.config.content.querySelectorAll("li");
		var turnSponsorPage = function() {
			window.location.href = "sponsor.html";
		}

		Array.prototype.forEach.call(liList, function(item, index) {
			item.addEventListener("touchend", function(event) {
				event.preventDefault();
				event.stopPropagation();

				self.throttle(self.buffer, this);
			}, false);
		});

		this.config.footer.addEventListener("touchend", function(event) {
			event.preventDefault();
			event.stopPropagation();

			self.throttle(turnSponsorPage, this);
		}, false);
	},
	init: function() {
		this.get_ddUserID();
		this.verification();
		// this.getUnreadNum();
		this.bindEvents();
	}
}

var approval = new Approval(); //实例化approval

$(function() {
	window.$my = {
		messageInfo: $(".messageInfo")
	}

	approval.init();

	! function() {
		localStorage.removeItem("sessionTouchData_mySponser");
		localStorage.removeItem("pageNum_mySponser");
		localStorage.removeItem("dataCount_mySponser");
		localStorage.removeItem("sessionTouchData_myApproval");
		localStorage.removeItem("pageNum_myApproval");
		localStorage.removeItem("dataCount_myApproval");
	}();
});