function TransExpense() {
	this.switchStr = true; //面包屑点击switch
	this.expenseReviewID = "";
	this.expenseTotal = '';
	this.transUserID = '';

	this.config = {
		breadcrumb: document.querySelector("#breadcrumb"),
		departmentWrap: document.querySelector("#departmentWrap"),
		searchApprovalInput: document.querySelector("#searchApprovalInput"),
		imgModal: document.querySelector('#imgModal'),
		confirmBtn: document.querySelector("#confirmBtn"),
		cancleBtn: document.querySelector("#cancleBtn")
	}
}

TransExpense.prototype = {
	constructor: TransExpense,
	throttle: function(method, delay) { //节流
		var timer = null;
		return function() {
			var context = this,
				args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function() {
				method.apply(context, args);
			}, delay);
		}
	},
	_renderDepartSP: function(info) { //渲染获取部门及联系人
		var str = "";
		var listUserArr = info.listUser;
		var listDepartArr = info.listDepart;

		if (listDepartArr.length) {
			for (var i = 0, len = listDepartArr.length; i < len; i++) {
				str += '<div class="row my-row" data-departID=' + listDepartArr[i].departID + '>';
				str += '<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">';
				str += '<span class="departName">' + listDepartArr[i].departName + '</span>';
				str += '</div>';
				str += '<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">';
				str += '<p><i></i>&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></p>';
				str += '</div>';
				str += '</div>';
			};
		};

		if (listUserArr.length) {
			for (var i = 0, len = listUserArr.length; i < len; i++) {
				str += '<div class="row my-row" data-departUserID=' + listUserArr[i].departUserID + '>';
				str += '<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">';
				str += '<span class="departUserName">' + listUserArr[i].departUserName + '</span>';
				str += '</div>';
				str += '<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">';
				str += '<p></p>';
				str += '</div>';
				str += '</div>';
			};
		};

		this.config.departmentWrap.innerHTML = str;
		this.switchStr = true;
	},
	getArg: function() { //获取url参数
		var url = window.location.href;
		var getParam = function(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		}

		if (url.indexOf("expenseReviewID") != -1 && url.indexOf("expenseTotal")) {
			this.expenseReviewID = getParam("expenseReviewID");
			this.expenseTotal = getParam("expenseTotal");
		} else {
			$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			throw new Error("url错误");
		};
	},
	getDepart: function(departmentID) { //获取部门及联系人
		var self = this;
		$.ajax({
			url: getRoothPath + '/ddExpenses/userController/getDepartOrUser.do',
			// async: false, //同步
			data: {
				"departmentID": departmentID
			},
			success: function(data) {
				console.log(data)
				if (JSON.stringify(data) !== "{}") {
					var status = data.status;

					switch (status) {
						case "true":
							var info = data.info;

							if (JSON.stringify(info) !== "{}") {
								self._renderDepartSP(info)
							} else {
								$my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");
								return;
							};
							break;
						case "failure":
							$my.messageInfo.html("部门及人员获取错误").fadeIn("fast").delay("1000").fadeOut("slow");
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
	crumbsEvent: function() { //面包屑点击事件
		var self = this;
		$(breadcrumb).on('click', 'li', function(event) {
			event.preventDefault();
			event.stopPropagation();

			if (self.switchStr) {
				if (this.classList.contains("active")) { //hasclass
					this.classList.remove("active"); //当前点击移除active
					self.switchStr = false;

					var str = "";
					var departmentid = this.dataset["departmentid"];
					var num = $(this).index();
					var breadcrumbList = this.parentNode.querySelectorAll("li");
					breadcrumbList = Array.prototype.slice.apply(breadcrumbList);
					breadcrumbList = breadcrumbList.slice(0, num + 1);

					for (var i = 0, len = breadcrumbList.length; i < len; i++) {
						str += breadcrumbList[i].outerHTML;
					};
					self.config.breadcrumb.innerHTML = str;
					self.getDepart(departmentid);
				};
			};
		});
	},
	asyncGetDepart: function() { //异步加载部门及联系人&选择审批人
		var self = this;
		$(self.config.departmentWrap).on('click', '.row', function(event) {
			event.preventDefault();
			event.stopPropagation();

			var str = document.createElement("li");
			var departid = this.dataset["departid"];
			var departStr = '';

			if (this.querySelector(".departName")) {
				departStr = this.querySelector(".departName").innerHTML;

				str = '<li data-departmentID=' + departid + '><a href="javascript:;">' + departStr + '</a></li>';
				self.getDepart(departid);

				$(self.config.breadcrumb).append(str);
			} else { //选择审批人
				var departUserName = ""; //选择审批人名
				var userid = ""; //选择审批人id

				userid = this.dataset["departuserid"];
				departUserName = this.querySelector(".departUserName").innerHTML;

				if (departUserName.indexOf("-") >= 0) {
					departUserName = departUserName.substring(0, departUserName.indexOf("-"));
				};
				self.transUserID = userid;
				// self.transEvent();
				$(self.config.imgModal).modal('show');
			};

			var breadcrumbList = self.config.breadcrumb.querySelectorAll("li");
			breadcrumbList = Array.prototype.slice.call(breadcrumbList);
			breadcrumbList.pop();

			for (var i = 0, len = breadcrumbList.length; i < len; i++) {
				breadcrumbList[i].classList.add("active");
			};
		});
	},
	searchApprovalEvent: function() { //审核人模糊查询
		var self = this,
			flag = true;
		var _searchApprovalBuffer = function() {
			var val = this.value.trim();

			if (flag) {
				if (val) {
					$.post(getRoothPath + '/ddExpenses/userController/userLike.do', {
							"name": val
						},
						function(data) {
							console.log(data)
							if (JSON.stringify(data) !== "{}") {
								var status = data.status;
								switch (status) {
									case "true":
										var info = data.info;
										if (JSON.stringify(info) !== "{}") {
											var dataArr = info.data;
											if (dataArr.length) {
												console.log(dataArr)
												var str = '';
												for (var i = 0, len = dataArr.length; i < len; i++) {
													str += '<div class="row my-row" data-departuserid=' + dataArr[i].id + '>';
													str += '<div class="col-xs-12 col-sm-12 col-md-12 my-col nowrap">';
													str += '<span class="departUserName">' + dataArr[i].userName + '-' + dataArr[i].departName + '</span>';
													str += '</div>';
													// str += '<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">';
													// str += '<p></p>';
													// str += '</div>';
													str += '</div>';
												};

												self.config.departmentWrap.innerHTML = str;

											} else {
												$my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");
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
						});
				} else {
					self.getDepart(0);
				}
			};
		}

		self.config.searchApprovalInput.addEventListener('compositionstart', function() {
			flag = false;
		})

		self.config.searchApprovalInput.addEventListener('compositionend', function() {
			flag = true;
		})

		self.config.searchApprovalInput.addEventListener("input", self.throttle(_searchApprovalBuffer, 1000), false);
	},
	transEvent: function() { //移交事件
		var self = this;

		self.config.confirmBtn.addEventListener("click", function(event) {
			event.stopPropagation();
			event.preventDefault();

			if (self.transUserID) {
				$.ajax({
					url: getRoothPath + '/ddExpenses/review/transExpense.do',
					// async: false, //同步
					data: {
						"expenseReviewID": self.expenseReviewID,
						"userID": $my.userID,
						"transUserID": self.transUserID,
						"money": self.expenseTotal
					},
					success: function(data) {
						console.log(data)
						if (JSON.stringify(data) !== "{}") {
							var status = data.status;

							switch (status) {
								case 2:
									$my.messageInfo.html("你已提交过该审批").fadeIn("fast").delay("1000").fadeOut("slow");
									setTimeout(function() {
										window.location.href = 'index.html?control=true';
									}, 1300);
									break;
								case 1:
									$my.messageInfo.html("移交成功").fadeIn("fast").delay("1000").fadeOut("slow");
									setTimeout(function() {
										window.location.href = 'index.html?control=true';
									}, 1300);
									break;
								case 0:
									$my.messageInfo.html("移交失败").fadeIn("fast").delay("1000").fadeOut("slow");
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
				$my.messageInfo.html("移交人ID获取异常").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};
		})

		self.config.cancleBtn.addEventListener('click', function(event) {
			event.stopPropagation();
			event.preventDefault();

			$(self.config.imgModal).modal('hide');
		})
	},
	init: function() {
		this.getArg();
		this.getDepart(0);
		this.asyncGetDepart();
		this.searchApprovalEvent();
		this.crumbsEvent();
		this.transEvent();
	}
}

var transExpense = new TransExpense();

$(function() {
	window.$my = {
		messageInfo: $(".messageInfo"),
		userID: sessionStorage.getItem("ddUserID")
	}

	transExpense.init();

});