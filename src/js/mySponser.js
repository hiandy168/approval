function Approval() {
	this.dataCount = ""; //分页总条数
	this.sessionArr_mySponser = []; //获取数据存session
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
				current = new Date();;
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
			url: getRoothPath + '/ddExpenses/expenseInfo/mySponsoredList.do',
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
							localStorage.setItem("dataCount_mySponser", info.dataCount);

							if (JSON.stringify(info) !== "{}") {
								var dataArr = info.data;
								if (dataArr.length) {
									if (dataArr.length < pageSize) {
										$(".loading").hide();
										$my.lodingText.classList.add("lodingText_show");
									};

									Array.prototype.push.apply(self.sessionArr_mySponser, dataArr);
									localStorage.setItem("sessionTouchData_mySponser", JSON.stringify(self.sessionArr_mySponser));

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
		var unreadClass = "";

		// for (var i = data.length - 1; i >= 0; i--) {
		// 	var status = data[i].expenseState;

		// 	switch(status){
		// 		case "审核中":
		// 			judgeStr = '<li class="underReview" data-detailid='+data[i].id+' data-status=0>';
		// 			judgeIcon = '<p class="status"><span class="glyphicon glyphicon-exclamation-sign my-icon"></span>&nbsp;&nbsp;<span>'+status+'</span></p>';
		// 			// unreadClass = "unread";
		// 			break;
		// 		case "已通过":
		// 			judgeStr = '<li class="passed" data-detailid='+data[i].id+' data-status=1>';
		// 			judgeIcon = '<p class="status"><span class="iconfont icon-tongguo my-icon"></span>&nbsp;&nbsp;<span>'+status+'</span></p>';
		// 			break;
		// 		case "已拒绝":
		// 			judgeStr = '<li class="refused" data-detailid='+data[i].id+' data-status=2>';
		// 			judgeIcon = '<p class="status"><span class="iconfont icon-ttpodicon my-icon"></span>&nbsp;&nbsp;<span>'+status+'</span></p>';
		// 			break;
		// 		default:
		// 			judgeStr = '<li>';
		// 			judgeIcon = '<p>&nbsp;&nbsp;</p>';
		// 			break;
		// 	}

		// 	str += ''+judgeStr+'';
		// 	str += '<div class="container-fluid myContainer">';
		// 	str += '<div class="row my-row">';
		// 	str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col '+unreadClass+'">';
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

			switch (status) {
				case "审核中":
					judgeStr = '<li class="underReview" data-detailid=' + data[i].id + ' data-status=0>';
					judgeIcon = '<p class="status"><span class="glyphicon glyphicon-exclamation-sign my-icon"></span>&nbsp;&nbsp;<span>' + status + '</span></p>';
					// unreadClass = "unread";
					break;
				case "待出款":
					judgeStr = '<li class="underReview" data-detailid=' + data[i].id + ' data-status=3>';
					judgeIcon = '<p class="status"><span class="glyphicon glyphicon-exclamation-sign my-icon"></span>&nbsp;&nbsp;<span>' + status + '</span></p>';
					// unreadClass = "unread";
					break;
				case "已通过":
					judgeStr = '<li class="passed" data-detailid=' + data[i].id + ' data-status=1>';
					judgeIcon = '<p class="status"><span class="iconfont icon-tongguo my-icon"></span>&nbsp;&nbsp;<span>' + status + '</span></p>';
					break;
				case "已拒绝":
					judgeStr = '<li class="refused" data-detailid=' + data[i].id + ' data-status=2>';
					judgeIcon = '<p class="status"><span class="iconfont icon-ttpodicon my-icon"></span>&nbsp;&nbsp;<span>' + status + '</span></p>';
					break;
				default:
					judgeStr = '<li>';
					judgeIcon = '<p>&nbsp;&nbsp;</p>';
					break;
			}

			str += '' + judgeStr + '';
			str += '<div class="container-fluid myContainer">';
			str += '<div class="row my-row">';
			str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col ' + unreadClass + '">';
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
			str += '<span>' + data[i].updateTime.substring(6) + ' <span></span></span>';
			str += '</div></div></div></div></li>';
		};

		$($my.inWrap).append(str);
		$my.flag = false;
	},
	scrollEvent: function() { //滑动事件
		var rect = $my.loadingWrap.getBoundingClientRect();
		if (!$my.flag) {
			if (rect.top < $my.vpHeight && rect.bottom >= 0) {
				$my.flag = true;
				$my.num++;
				if ($my.num > parseInt(approval.dataCount / pageSize) || ($my.num == parseInt(approval.dataCount / pageSize) && approval.dataCount % pageSize == 0)) {
					$(".loading").hide();
					$my.lodingText.classList.add("lodingText_show");
					return false;
				} else {
					localStorage.setItem("pageNum_mySponser", $my.num);
					approval.getData($my.userID, $my.num, pageSize);
				};
			} else {
				return;
			}
		}
	},
	viewDetail: function() {
		var _getDetailid = function() {
			var detailid = this.dataset["detailid"];
			var status = this.dataset["status"];
			window.location.href = "detail_approval.html?detailid=" + detailid + "#status=" + status;
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
	var sessionTouchData_mySponser = localStorage.getItem("sessionTouchData_mySponser");
	var pageNum_mySponser = localStorage.getItem("pageNum_mySponser");
	var dataCount_mySponser = localStorage.getItem("dataCount_mySponser");

	if (sessionTouchData_mySponser != null && sessionTouchData_mySponser != "null" && pageNum_mySponser != null && pageNum_mySponser != "null" && dataCount_mySponser != null && dataCount_mySponser != "null") {
		sessionTouchData_mySponser = JSON.parse(sessionTouchData_mySponser);

		$my.num = pageNum_mySponser;
		approval.dataCount = dataCount_mySponser;
		approval.sessionArr_mySponser = sessionTouchData_mySponser;
		approval.renderElement(sessionTouchData_mySponser);
	} else {
		approval.getData($my.userID, 0, pageSize);
		localStorage.setItem("pageNum_mySponser", $my.num);
	};



	// 默认数据加载
	// approval.getData($my.userID,0,pageSize);
	// localStorage.setItem("pageNum",$my.num);

	//下滑加载更多事件
	window.addEventListener("touchmove", approval.touchThrottle(approval.scrollEvent, 500, 1000));

	approval.viewDetail(); //查看详细
});