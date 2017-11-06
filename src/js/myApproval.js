function Approval() {
	this.dataCount = ""; //分页总条数
	this.sessionArr_myApproval = []; //获取数据存session
	this.isEnd = 0; // 首次加载数据，是否到底
}

Approval.prototype = {
	throttle: function(method, context) { //点击节流
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
		}, 200);
	},
	touchThrottle: function(method, delay, duration) { //滑动节流
		var timer = null,
			begin = new Date();
		return function() {
			var context = this,
				args = arguments,
				current = new Date();
			clearTimeout(timer);
			if (current - begin >= duration) {
				method.apply(context, args);
				begin = current;
			} else {
				timer = setTimeout(function() {
					method.apply(context, args);
				}, delay);
			}
		}
	},
	getData: function(userID, pageNum, pageSize) {
		var self = this;
		$.ajax({
			url: getRoothPath + '/ddExpenses/expenseInfo/myExpenseList.do',
			data: {
				"userID": userID, //用户ID
				"pageNum": pageNum, //页码(首页为0）
				"pageSize": pageSize, //页大小
			},
			success: function(data) {
				console.log(data);
				if (JSON.stringify(data) !== "{}") {
					var status = data.status;

					switch (status) {
						case "true":
							var info = data.info;
							self.dataCount = info.dataCount; //总条数
							localStorage.setItem("dataCount_myApproval", info.dataCount);

							if (JSON.stringify(info) !== "{}") {
								var dataArr = info.data;
								if (dataArr.length) {
									if (dataArr.length < pageSize) {
										$(".loading").hide();
										$my.lodingText.classList.add("lodingText_show");
									} else {
										self.isEnd = 1;
									};

									Array.prototype.push.apply(self.sessionArr_myApproval, dataArr);
									localStorage.setItem("sessionTouchData_myApproval", JSON.stringify(self.sessionArr_myApproval));
									localStorage.setItem('isEnd_myApproval', self.isEnd);

									self.renderElement(dataArr);
								} else {
									$(".loading").hide();
									$my.messageInfo.html("暂无信息").fadeIn("fast").delay("1000").fadeOut("slow");
									return;
								};

							} else {
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
				} else {
					$my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow");
					return false;
				};
			}
		})
	},
	renderElement: function(data) {
		var str = "";
		var judgeStr = "";
		var judgeIcon = "";
		var backlogClass = "";

		// for (var i = data.length - 1; i >= 0; i--) {
		// 	var status = data[i].expenseState;
		// 	var backlogStatus = data[i].reviewType;

		// 	switch(status){
		// 		case "审核中":
		// 			judgeStr = '<li class="underReview" data-detailid='+data[i].id+' data-reviewid='+data[i].reviewID+'>';
		// 			judgeIcon = '<p class="status"><span class="glyphicon glyphicon-exclamation-sign my-icon"></span>&nbsp;&nbsp;<span>'+status+'</span></p>';
		// 			break;
		// 		case "已通过":
		// 			judgeStr = '<li class="passed" data-detailid='+data[i].id+' data-reviewid='+data[i].reviewID+'>';
		// 			judgeIcon = '<p class="status"><span class="iconfont icon-tongguo my-icon"></span>&nbsp;&nbsp;<span>'+status+'</span></p>';
		// 			break;
		// 		case "已拒绝":
		// 			judgeStr = '<li class="refused" data-detailid='+data[i].id+' data-reviewid='+data[i].reviewID+'>';
		// 			judgeIcon = '<p class="status"><span class="iconfont icon-ttpodicon my-icon"></span>&nbsp;&nbsp;<span>'+status+'</span></p>';
		// 			break;
		// 		default:
		// 			judgeStr = '<li>';
		// 			judgeIcon = '<p>&nbsp;&nbsp;</p>'
		// 			break;
		// 	}

		// 	switch(backlogStatus){
		// 		case "待我审批":
		// 			backlogClass = "backlog";
		// 			break;
		// 		case "":
		// 			backlogClass = "";
		// 			break;
		// 		default:
		// 			backlogClass = "";
		// 			break;
		// 	}

		// 	str += ''+judgeStr+'';
		// 	str += '<div class="container-fluid myContainer">';
		// 	str += '<div class="row my-row">';
		// 	str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col '+backlogClass+'">';
		// 	str += '<span class="peopleName nowrap text-center">'+data[i].ExpenseUserName+'</span>';
		// 	str += '</div>';
		// 	str += '<div class="col-xs-6 col-sm-6 col-md-6 my-col">';
		// 	str += '<div class="inTop">';
		// 	str += '<p class="nowrap">'+data[i].itemName+'&nbsp;</p>';
		// 	str += '</div>';
		// 	str += '<div class="inBottom">';
		// 	str += '<p class="count">￥<span>'+data[i].expenseTotal+'</span></p>';
		// 	str += '</div>';
		// 	str += '</div>';
		// 	str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col text-right">';
		// 	str += '<div class="inTop">';
		// 	str += ''+judgeIcon+'';
		// 	str += '</div>';
		// 	str += '<div class="inBottom">';
		// 	str += '<span>'+data[i].updateTime.substring(6)+' <span></span></span>';
		// 	str += '</div></div></div></div></li>';
		// };

		for (var i = 0; i < data.length; i++) {
			var status = data[i].expenseState;
			var backlogStatus = data[i].reviewType;

			switch (status) {
				case "审核中":
					judgeStr = '<li class="underReview" data-detailid=' + data[i].id + ' data-reviewid=' + data[i].reviewID + '>';
					judgeIcon = '<p class="status"><span class="glyphicon glyphicon-exclamation-sign my-icon"></span>&nbsp;&nbsp;<span>' + status + '</span></p>';
					break;
				case "待出款":
					judgeStr = '<li class="underReview" data-detailid=' + data[i].id + ' data-reviewid=' + data[i].reviewID + '>';
					judgeIcon = '<p class="status"><span class="glyphicon glyphicon-exclamation-sign my-icon"></span>&nbsp;&nbsp;<span>' + status + '</span></p>';
					break;
				case "已通过":
					judgeStr = '<li class="passed" data-detailid=' + data[i].id + ' data-reviewid=' + data[i].reviewID + '>';
					judgeIcon = '<p class="status"><span class="iconfont icon-tongguo my-icon"></span>&nbsp;&nbsp;<span>' + status + '</span></p>';
					break;
				case "已拒绝":
					judgeStr = '<li class="refused" data-detailid=' + data[i].id + ' data-reviewid=' + data[i].reviewID + '>';
					judgeIcon = '<p class="status"><span class="iconfont icon-ttpodicon my-icon"></span>&nbsp;&nbsp;<span>' + status + '</span></p>';
					break;
				default:
					judgeStr = '<li>';
					judgeIcon = '<p>&nbsp;&nbsp;</p>'
					break;
			}

			switch (backlogStatus) {
				case "待我审批":
					backlogClass = "backlog";
					break;
				case "":
					backlogClass = "";
					break;
				default:
					backlogClass = "";
					break;
			}

			str += '' + judgeStr + '';
			str += '<div class="container-fluid myContainer">';
			str += '<div class="row my-row">';
			str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col ' + backlogClass + '">';
			str += '<span class="peopleName nowrap text-center">' + data[i].ExpenseUserName + '</span>';
			str += '</div>';
			str += '<div class="col-xs-6 col-sm-6 col-md-6 my-col">';
			str += '<div class="inTop">';
			str += '<p class="nowrap">' + data[i].itemName + '&nbsp;</p>';
			str += '</div>';
			str += '<div class="inBottom">';
			str += '<p class="count">￥<span>' + data[i].expenseTotal + '</span></p>';
			str += '</div>';
			str += '</div>';
			str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col text-right">';
			str += '<div class="inTop">';
			str += '' + judgeIcon + '';
			str += '</div>';
			str += '<div class="inBottom">';
			str += '<span>' + data[i].updateTime.substring(5) + ' <span></span></span>';
			str += '</div></div></div></div></li>';
		};

		$($my.inWrap).append(str);
		$my.flag = false;
	},
	scrollEvent: function() { //滑动事件
		var self = this;
		var rect = $my.loadingWrap.getBoundingClientRect();

		if (!$my.flag) {
			if (rect.top < $my.vpHeight && rect.bottom >= 0) {
				$my.flag = true;
				$my.num++;
				if ($my.num > parseInt(approval.dataCount / pageSize) || ($my.num == parseInt(approval.dataCount / pageSize) && approval.dataCount % pageSize == 0)) {
					$(".loading").hide();
					$my.lodingText.classList.add("lodingText_show");
					self.isEnd = 0;
					localStorage.setItem('isEnd_myApproval', self.isEnd);
					return false;
				} else {
					localStorage.setItem("pageNum_myApproval", $my.num);
					approval.getData($my.userID, $my.num, pageSize);
					self.isEnd = 1;
					localStorage.setItem('isEnd_myApproval', self.isEnd);
				};
			} else {
				return;
			}
		}
	},
	viewDetail: function() {
		var _getDetailid = function() {
			var detailid = this.dataset["detailid"];
			var reviewid = this.dataset["reviewid"];
			var status = "";

			if (this.querySelector(".backlog")) {
				status = "1";
			} else {
				status = "0";
			};

			window.location.href = "bbsp.html?detailid=" + detailid + "&reviewid=" + reviewid + "&status=" + status;
		}

		$($my.inWrap).on('click', 'li', function(event) {
			event.preventDefault();
			event.stopPropagation();

			approval.throttle(_getDetailid, this);
		});
	}
}

var approval = new Approval();

$(function() {
	window.$my = {
		messageInfo: $(".messageInfo"),
		userID: sessionStorage.getItem("ddUserID"),
		loadingWrap: document.querySelector("#loadingWrap"),
		lodingText: document.querySelector("#lodingText"),
		inWrap: document.querySelector(".inWrap"),
		wrap: document.querySelector(".wrap"),
		vpHeight: document.documentElement.clientHeight, //获取设备高度
		num: 0, //页码
		flag: false //滑动标志位，未滑入加载区
	}

	// 默认数据加载
	var sessionTouchData_myApproval = localStorage.getItem("sessionTouchData_myApproval");
	var pageNum_myApproval = localStorage.getItem("pageNum_myApproval");
	var dataCount_myApproval = localStorage.getItem("dataCount_myApproval");
	var isEnd_myApproval = localStorage.getItem("isEnd_myApproval");

	if (sessionTouchData_myApproval != null && sessionTouchData_myApproval != "null" && pageNum_myApproval != null && pageNum_myApproval != "null" && dataCount_myApproval != null && dataCount_myApproval != "null") {
		sessionTouchData_myApproval = JSON.parse(sessionTouchData_myApproval);

		$my.num = pageNum_myApproval;
		approval.dataCount = dataCount_myApproval;
		approval.sessionArr_myApproval = sessionTouchData_myApproval;
		approval.renderElement(sessionTouchData_myApproval);
	} else {
		console.log("x")
		approval.getData($my.userID, 0, pageSize);
		localStorage.setItem("pageNum_myApproval", $my.num);
	};

	if (isEnd_myApproval != null && isEnd_myApproval != "null") {
		if (isEnd_myApproval == '0') {
			$(".loading").hide();
			$my.lodingText.classList.add("lodingText_show");
		}
	}

	//下滑加载更多事件
	window.addEventListener("touchmove", approval.touchThrottle(approval.scrollEvent, 500, 1000));

	approval.viewDetail(); //查看详细

});

dd.ready(function() {
	// ios控制返回按钮
	dd.biz.navigation.setLeft({
		control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
		text: '', //控制显示文本，空字符串表示显示默认文本
		onSuccess: function(result) {},
		onFail: function(err) {}
	});
})