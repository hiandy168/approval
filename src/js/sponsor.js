// slideout
var slideout = new Slideout({
	'panel': document.getElementById('panel'),
	'menu': document.getElementById('menu'),
	'padding': 256,
	'tolerance': 100,
	'touch': true
});

function Approval() {
	this.switchStr = true; //面包屑点击switch
	this.expenseImageUrl = []; //报销凭证url
	this.expenseImageName = []; //报销凭证name
	this.num = 0; //添加报销num
	this.flag = true; //防重复提交标志位
	this.touchflag = false; //滑动标志位，未滑入加载区
	this.vpHeight = document.documentElement.clientHeight; //获取设备高度
	this.pagenum = 0; //页码
	this.dataCount = ''; //项目/部门总页数

	this.config = {
		productType: document.querySelector("#productType"),
		myModal: document.querySelector("#myModal"),
		addBtn: document.querySelector("#addBtn"),
		inWrap: document.querySelector("#inWrap"),
		cashierWrap: document.querySelector("#cashierWrap"),
		bankAccount: document.querySelector("#bankAccount"),
		accountName: document.querySelector("#accountName"),
		accounNumber: document.querySelector("#accounNumber"),
		expenseTotal: document.querySelector("#expenseTotal"),
		epUserWrap: document.querySelector("#epUserWrap"),
		departmentWrap: document.querySelector("#departmentWrap"),
		breadcrumb: document.querySelector("#breadcrumb"),
		approverWrap: document.querySelector("#approverWrap"),
		uploadBtn: document.querySelector("#uploadBtn"),
		myFile: document.querySelector("#myFile"),
		uploadWrap: document.querySelector("#uploadWrap"),
		// departWrapID: document.querySelector("#departWrapID"),
		addApprover: document.querySelector("#addApprover"),
		closeBtn: document.querySelector("#closeBtn"),
		// closeBtn_depart: document.querySelector("#closeBtn_depart"),
		menu: document.querySelector("#menu"),
		// departSearch: document.querySelector("#departSearch"),
		// departmentContent: document.querySelector("#departmentContent"),
		jobNum: document.querySelector("#jobNum"),
		groupWrap: document.querySelector("#groupWrap"),
		searchApprovalInput: document.querySelector("#searchApprovalInput"),
		companyList: document.querySelector("#companyList"),
		companyID: document.querySelector("#companyID"),
		businessList: document.querySelector("#businessList"),
		business: document.querySelector("#business"),
		subDepartID: document.querySelector("#subDepartID"),
		closeBtn_subDepart: document.querySelector("#closeBtn_subDepart"),
		subDepartWrap: document.querySelector("#subDepartWrap"),
		subDepartWrapID: document.querySelector("#subDepartWrapID"),
		subDepartInput: document.querySelector("#subDepartInput"),
		loadingWrap: document.querySelector("#loadingWrap"),
		subDepartContent: document.querySelector("#subDepartContent")
	}
}

Approval.prototype = {
	// throttle: function(method, context) { //点击节流
	// 	clearTimeout(method.tId);
	// 	method.tId = setTimeout(function() {
	// 		method.call(context);
	// 	}, 200);
	// },
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
	// throttleInput: function(method, delay, duration) { //input节流
	// 	var timer = null,
	// 		begin = new Date();
	// 	return function() {
	// 		var context = this,
	// 			args = arguments,
	// 			current = new Date();;
	// 		clearTimeout(timer);
	// 		if (current - begin >= duration) {
	// 			method.apply(context, args);
	// 			begin = current;
	// 		} else {
	// 			timer = setTimeout(function() {
	// 				method.apply(context, args);
	// 			}, delay);
	// 		}
	// 	}
	// },
	throttleInput: function(func, wait) {
		var context, args;
		var previous = 0;

		return function() {
			var now = +new Date();
			context = this;
			args = arguments;
			if (now - previous > wait) {
				func.apply(context, args);
				previous = now;
			}
		}
	},
	getProductType: function() { //获取报销类型
		var self = this;
		$.ajax({
			url: getRoothPath + '/ddExpenses/userController/reviewType.do',
			// async: false, //同步
			success: function(data) {
				console.log(data)
				if (JSON.stringify(data) !== "{}") {
					var status = data.status;

					switch (status) {
						case "true":
							var info = data.info;
							if (JSON.stringify(info) !== "{}") {
								var dataArr = info.data;
								if (dataArr.length) {
									var str = "";

									for (var i = 0, len = dataArr.length; i < len; i++) {
										str += '<li class="list-group-item" data-producttypeid=' + dataArr[i].productTypeID + '>' + dataArr[i].productTypeName + '</li>';
									};

									self.config.productType.innerHTML = str;
									self.selectProductType();
								} else {
									$my.messageInfo.html("报销类型为空").fadeIn("fast").delay("1000").fadeOut("slow");
									return false;
								};

							} else {
								$my.messageInfo.html("暂无报销类型").fadeIn("fast").delay("1000").fadeOut("slow");
								return false;
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
	selectProductType: function() { //报销类型选择事件
		var self = this;
		var num = ""; //点击下标
		var productTypeList = this.config.productType.querySelectorAll("li");
		productTypeList = Array.prototype.slice.apply(productTypeList);

		$(self.config.inWrap).on('click', ".product", function(event) {
			event.preventDefault();
			event.stopPropagation();

			num = parseInt($(this).parents(".bx_appendChild")[0].dataset["index"]);

			$(myModal).modal("show");
		});

		for (var i = 0, len = productTypeList.length; i < len; i++) {
			productTypeList[i].addEventListener("click", function(event) {
				event.preventDefault();
				event.stopPropagation();

				var val = this.innerHTML;
				var productid = this.dataset["producttypeid"];

				var domArr = self.config.inWrap.querySelectorAll(".bx_appendChild");
				Array.prototype.forEach.call(domArr, function(item, index) {
					if (num === index) {
						item.querySelector(".product").value = val;
						item.querySelector(".product").dataset["productid"] = productid;
					};
				})

				$(myModal).modal("hide"); //手动关闭模态框
			}, false);
		};
	},
	addEvents: function() { //添加报销
		// var num = 0;
		var str = "";
		var text = "";
		var self = this;

		self.config.addBtn.addEventListener("click", function() {
			self.num++;
			if (self.num > 2) {
				$my.messageInfo.html("最多添加2个报销").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			} else {

				switch (self.num) {
					case 1:
						text = "报销二";
						break;
					case 2:
						text = "报销三";
						break;
					default:
						break;
				}
				str += '<div class="appendChild bx_appendChild" data-index=' + self.num + '>';
				str += '<p class="titleMessage clearfix">' + text + ' <i class="iconfont icon-ttpodicon deleteIcon pull-right"></i></p>';
				str += '<div class="container-fluid myContainer inputFile">';
				str += '<div class="row my-row">';
				str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col">';
				str += '<span>报销类型</span>';
				str += '</div>';
				str += '<div class="col-xs-9 col-sm-9 col-md-9 my-col">';
				str += '<input type="text" class="product" data-productid="" readonly="readonly" data-toggle="modal" data-target="#myModal" placeholder="请输入">';
				str += '</div>';
				str += '</div>';
				str += '<div class="row my-row">';
				str += '<div class="col-xs-4 col-sm-4 col-md-4 my-col">';
				str += '<span>报销金额(￥)</span>';
				str += '</div>';
				str += '<div class="col-xs-8 col-sm-8 col-md-8 my-col">';
				str += '<input type="number" class="itemAlltotals" data-count="0" placeholder="请输入">';
				str += '</div>';
				str += '</div>';
				str += '<div class="row my-row special-row">';
				str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col">';
				str += '<span>费用说明</span>';
				str += '<span class="limit">(150字)</span>';
				str += '</div>';
				str += '<div class="col-xs-9 col-sm-9 col-md-9 my-col">';
				str += '<textarea class="remarks" placeholder="请输入" maxlength="150"></textarea>';
				str += '</div>';
				str += '</div>';
				str += '</div>';
				str += '</div>';

				$(self.config.inWrap).append(str);
				str = "";
			}
		}, false);
	},
	getCashierUser: function() { //获取出纳人
		var self = this;
		$.ajax({
			url: getRoothPath + '/ddExpenses/userController/cashierUser.do',
			// async: false, //同步
			success: function(data) {
				console.log(data)
				if (JSON.stringify(data) !== "{}") {
					var status = data.status;

					switch (status) {
						case "true":
							var info = data.info;

							if (JSON.stringify(info) !== "{}") {
								var dataArr = info.data;
								if (dataArr.length) {
									var str = "";

									for (var i = 0, len = dataArr.length; i < len; i++) {
										str += '<li class="cashier text-center" data-cashierUserID=' + dataArr[i].cashierUserID + '>';
										str += '<div class="wating text-center progressBar">出纳</div>';
										str += '<p class="name">' + dataArr[i].cashierUserName + '</p>';
										str += '</li>';
									};

									self.config.cashierWrap.innerHTML = str;
								} else {
									self.config.cashierWrap.innerHTML = "<span style='font-weight:normal'>暂无出纳人信息</span>";
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
	getOldBank: function(userID) { //获取历史收款信息
		var self = this;

		if (userID != null && userID != "null") {
			$.ajax({
				url: getRoothPath + '/ddExpenses/userController/getOldBank.do',
				// data: {"userID":userID},
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

								if (JSON.stringify(info) !== "{}") {
									var dataArr = info.data;
									if (dataArr.length) {
										self.config.bankAccount.value = dataArr[0].bankAccount;
										self.config.accountName.value = dataArr[0].accountName;
										self.config.accounNumber.value = dataArr[0].accounNumber;
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
		} else {
			$my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return;
		};
	},
	calcExpenseTotal: function() { //计算总金额
		var self = this;
		var reg = /^\d+(\.\d+)?$/; //非负浮点数
		$(self.config.inWrap).on('keyup', ".itemAlltotals", function(event) {
			var totalCount = 0;
			event.preventDefault();
			event.stopPropagation();

			if (this.value != "") {
				if (reg.test(this.value)) {

					if (parseFloat(this.value) <= 1000000) {
						this.dataset["count"] = this.value;
					} else {
						$my.messageInfo.html("单个报销金额最大100万").fadeIn("fast").delay("1500").fadeOut("slow");
						this.value = "";
						this.dataset["count"] = 0;
						// return;
					};
				} else {
					$my.messageInfo.html("请输入非负浮点数").fadeIn("fast").delay("1000").fadeOut("slow");
					return;
				};
			} else if (this.value == "") {
				this.dataset["count"] = 0;
			};

			//计算总金额
			var itemAlltotalsList = $(this).parents("#inWrap")[0].querySelectorAll(".itemAlltotals");
			Array.prototype.forEach.call(itemAlltotalsList, function(item) {
				totalCount += parseFloat(item.dataset["count"]);
			});

			self.config.expenseTotal.value = totalCount.toFixed(2);
		});
	},
	getEpUser: function(userID) { //获取常用审批人
		var self = this;
		if (userID != null && userID != "null") {
			$.ajax({
				url: getRoothPath + '/ddExpenses/userController/oldExpensesUser.do',
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

								if (JSON.stringify(info) !== "{}") {
									var dataArr = info.data;
									if (dataArr.length) {
										var str = "";

										for (var i = 0, len = dataArr.length; i < len; i++) {
											str += '<li class="nowrap text-center" data-oldEpUserID=' + dataArr[i].oldEpUserID + '>' + dataArr[i].oldEpUserUserName + '</li>';
										};

										self.config.epUserWrap.innerHTML = str;
									} else if (dataArr.length == 0) {
										self.config.epUserWrap.innerHTML = "<span style='font-weight:normal'>暂无常用审批人</span>";
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
		} else {
			$my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
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
	_deleteProductType: function() { //删除报销类型
		var self = this;

		$(self.config.inWrap).on('touchend', '.deleteIcon', function(event) {
			event.preventDefault();
			event.stopPropagation();

			var index = $(this).parents(".bx_appendChild").attr("data-index");
			var length = $(this).parents("#inWrap").find('.bx_appendChild').length;

			switch (length) {
				case 2:
					$(this).parents(".bx_appendChild").next(".bx_appendChild").attr('data-index', '1');
					self.num = 0;
					break;
				case 3:
					if (index === "1") {
						$(this).parents(".bx_appendChild").next(".bx_appendChild").attr('data-index', '1').children('.titleMessage').html("报销二 <i class='iconfont icon-ttpodicon deleteIcon pull-right'></i>");
						self.num = 1;
					} else if (index === "2") {
						self.num = 1;
					};
					break;
				default:
					$my.messageInfo.html("异常错误").fadeIn("fast").delay("1500").fadeOut("slow");
					break;
			};

			$(this).parents(".bx_appendChild").remove();

			//计算总金额
			var totalCount = 0;
			var itemAlltotalsList = self.config.inWrap.querySelectorAll(".itemAlltotals");
			Array.prototype.forEach.call(itemAlltotalsList, function(item) {
				totalCount += parseFloat(item.dataset["count"]);
			});

			self.config.expenseTotal.value = totalCount.toFixed(2);
		});
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
	asyncGetDepart: function() { //异步加载部门及联系人&选择审批人
		var self = this;
		$(departmentWrap).on('click', '.row', function(event) {
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
				var approverStr = "";

				userid = this.dataset["departuserid"];
				departUserName = this.querySelector(".departUserName").innerHTML;

				if (departUserName.indexOf("-") >= 0) {
					departUserName = departUserName.substring(0, departUserName.indexOf("-"));
				};

				var approverList = self.config.approverWrap.querySelectorAll("li");

				if (approverList.length >= 10) {
					$my.messageInfo.html("审批人最多添加9名").fadeIn("fast").delay("1000").fadeOut("slow");
					return;
				};

				Array.prototype.forEach.call(approverList, function(item) {
					if (userid == item.dataset["userid"]) {
						$my.messageInfo.html("该审批人已在列表中").fadeIn("fast").delay("1000").fadeOut("slow");
						throw new Error("该审批人已在列表中");
					};
				});
				// this.querySelector(".my-icon").classList.add("hasselect");
				approverStr = '<li class="nowrap addPeople" data-userid=' + userid + '>' + departUserName + '</li>';
				// self.config.approverWrap.insertAdjacentHTML('afterBegin', approverStr);
				self.config.addApprover.insertAdjacentHTML('beforeBegin', approverStr);

				slideout.close();
			};

			var breadcrumbList = self.config.breadcrumb.querySelectorAll("li");
			breadcrumbList = Array.prototype.slice.call(breadcrumbList);
			breadcrumbList.pop();

			for (var i = 0, len = breadcrumbList.length; i < len; i++) {
				breadcrumbList[i].classList.add("active");
			};
		});
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
	selectEpUser: function() { //常用审批人点击事件
		var self = this;
		var departUserName = ""; //选择审批人名
		var userid = ""; //选择审批人id
		var approverStr = "";

		$(this.config.epUserWrap).on('click', 'li', function(event) {
			event.preventDefault();
			event.stopPropagation();

			userid = this.dataset["oldepuserid"];
			departUserName = this.innerHTML;

			var approverList = self.config.approverWrap.querySelectorAll("li");
			Array.prototype.forEach.call(approverList, function(item) {
				if (userid == item.dataset["userid"]) {
					$my.messageInfo.html("该审批人已在列表中").fadeIn("fast").delay("1000").fadeOut("slow");
					throw new Error("该审批人已在列表中");
				};
			});

			approverStr = '<li class="nowrap addPeople" data-userid=' + userid + '>' + departUserName + '</li>';
			// self.config.approverWrap.insertAdjacentHTML('afterBegin', approverStr);
			self.config.addApprover.insertAdjacentHTML('beforeBegin', approverStr);
			slideout.close();
		});
	},
	submitEvent: function() { //提交保存事件
		if (approval.flag) {
			var imageUrlArr = [],
				expenseTotal = approval.config.expenseTotal.value,
				bankAccount = approval.config.bankAccount.value,
				accountName = approval.config.accountName.value,
				accounNumber = approval.config.accounNumber.value,
				departmentID = approval.config.business.value, //事业部value
				departmentSubID = approval.config.subDepartID.value, //项目/部门value
				producttypeIDs = [],
				itemAlltotals = [],
				remarks = [],
				expensesUserID = [],
				cashierUserID = approval.config.cashierWrap.querySelector("li.cashier").dataset["cashieruserid"],
				producttypeDomArr = approval.config.inWrap.querySelectorAll(".product"),
				itemAlltotalDomArr = approval.config.inWrap.querySelectorAll(".itemAlltotals"),
				remarksDomArr = approval.config.inWrap.querySelectorAll(".remarks"),
				expensesUserDomArr = approval.config.approverWrap.querySelectorAll(".nowrap"),
				loginName = approval.config.jobNum.value,
				reimbursementID = approval.config.companyID.value; //所属公司value

			producttypeDomArr = Array.prototype.slice.apply(producttypeDomArr);
			itemAlltotalDomArr = Array.prototype.slice.apply(itemAlltotalDomArr);
			remarksDomArr = Array.prototype.slice.apply(remarksDomArr);

			Array.prototype.forEach.call(expensesUserDomArr, function(item) {
				expensesUserID.push(item.dataset["userid"]);
			})

			for (var i = 0, len = producttypeDomArr.length; i < len; i++) {
				if (producttypeDomArr[i].dataset["productid"] == "") {
					$my.messageInfo.html("请完善报销类型").fadeIn("fast").delay("1000").fadeOut("slow");
					return;
				};

				if (itemAlltotalDomArr[i].value == "") {
					$my.messageInfo.html("请完善报销金额").fadeIn("fast").delay("1000").fadeOut("slow");
					return;
				};

				producttypeIDs.push(producttypeDomArr[i].dataset["productid"]);
				itemAlltotals.push(itemAlltotalDomArr[i].value);

				if (remarksDomArr[i].value == "") {
					remarksDomArr[i].value = " ";
				};
				remarks.push(remarksDomArr[i].value);
			};

			if (bankAccount == "" || accountName == "" || accounNumber == "") {
				$my.messageInfo.html("请完善收款信息").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};

			if (expenseTotal == "") {
				$my.messageInfo.html("报销总金额为空").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};

			if (approval.expenseImageUrl.length === 0) {
				$my.messageInfo.html("请完善报销凭证").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};

			if (reimbursementID == '' || reimbursementID == undefined || reimbursementID == "undefined") {
				$my.messageInfo.html("请完善所属公司").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};

			if (departmentID == "" || departmentID == undefined || departmentID == "undefined") {
				$my.messageInfo.html("请选择事业部").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};

			if (departmentSubID == "" || departmentSubID == undefined || departmentSubID == "undefined" || departmentSubID == "null" || departmentSubID == null) {
				$my.messageInfo.html("请选择项目/部门").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};

			if (loginName == "") {
				$my.messageInfo.html("请完善报销人工号").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			} else {
				var reg = /^\d{7}$/;
				if (!reg.test(loginName)) {
					$my.messageInfo.html("报销人工号不合法").fadeIn("fast").delay("1000").fadeOut("slow");
					return;
				};
			};

			if (expensesUserID.length === 0) {
				$my.messageInfo.html("请完善审批人").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};

			if (cashierUserID == "") {
				$my.messageInfo.html("出纳人信息为空").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};

			producttypeIDs = producttypeIDs.join();
			itemAlltotals = itemAlltotals.join();
			remarks = remarks.join();
			expensesUserID = expensesUserID.join();

			for (var i = 0, len = approval.expenseImageUrl.length; i < len; i++) { //拼接图片域名
				imageUrlArr.push(clouddnImgStr + "/" + approval.expenseImageUrl[i]);
			};

			$.ajax({
				url: getRoothPath + '/ddExpenses/expense/save.do',
				// async: false, //同步
				data: {
					"departmentID": departmentID,
					"departmentSubID": departmentSubID,
					"expenseTotal": expenseTotal,
					"submitUserID": $my.userID,
					"bankAccount": bankAccount,
					"accountName": accountName,
					"accounNumber": accounNumber,
					"producttypeIDs": producttypeIDs,
					"itemAlltotals": itemAlltotals,
					"remarks": remarks,
					"expensesUserIDs": expensesUserID,
					"cashierUserID": cashierUserID,
					"expenseImageUrl": imageUrlArr.join(),
					"expenseImageName": approval.expenseImageName.join(),
					"loginName": loginName,
					"reimbursementID": reimbursementID
				},
				beforeSend: function() {
					approval.flag = false;
				},
				success: function(data) {
					console.log(data)
					if (JSON.stringify(data) !== "{}") {
						var status = data.status;

						switch (status) {
							case 1:
								var timer = null;
								$my.messageInfo.html(data.msg).fadeIn("fast").delay("1000").fadeOut("slow");

								! function() {
									localStorage.removeItem("sessionTouchData_mySponser");
									localStorage.removeItem("pageNum_mySponser");
									localStorage.removeItem("dataCount_mySponser");
									localStorage.removeItem("sessionTouchData_myApproval");
									localStorage.removeItem("pageNum_myApproval");
									localStorage.removeItem("dataCount_myApproval");
								}();

								clearTimeout(timer);
								timer = setTimeout(function() {
									window.location.href = "index.html?control=true";
								}, 1200);
								break;
							case 0:
								approval.flag = true;
								$my.messageInfo.html("保存失败").fadeIn("fast").delay("1000").fadeOut("slow");
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

			+ function() { // 释放内存
				imageUrlArr = null;
				producttypeIDs = null;
				itemAlltotals = null;
				remarks = null;
				expensesUserID = null;
			}();
		};
	},
	addImage: function() { //添加图片
		var self = this;

		self.config.uploadBtn.addEventListener("click", function() { // 添加照片trigger
			$(myFile).trigger('click');
		}, false);

		//图片预览FileReader
		var handleImageFile = function(file) {
			var img = document.createElement('img');
			var li = document.createElement("li");

			li.classList.add("newUploadImg");
			img.setAttribute("alt", file.name);

			img.file = file;
			li.appendChild(img);
			$(self.config.uploadWrap).prepend(li);

			var reader = new FileReader();
			reader.onload = (function(aImg) {
				return function(e) {
					aImg.src = e.target.result;
				}
			})(img);
			reader.readAsDataURL(file);
		}

		self.config.myFile.addEventListener("change", function(e) {
			e.stopPropagation();
			e.preventDefault();

			var formdata = new FormData();
			var files = this.files;
			if (files.length <= 9) {
				var hasSelectLength = self.config.uploadWrap.querySelectorAll("li");
				hasSelectLength = Array.prototype.slice.apply(hasSelectLength);

				if (files.length <= 10 - hasSelectLength.length) {
					for (var i = 0, len = files.length; i < len; i++) {
						var file = files[i];
						var type = file.name.replace(/.+\./, "").toLowerCase();
						if (type !== "jpg" && type !== "jpeg" && type !== "png") {
							$my.messageInfo.html("请选择扩展名.jpg/.jpeg/.png图片").fadeIn("fast").delay("1500").fadeOut("slow");
							return;
						};

						if (file.size > 5 * 1024 * 1024) {
							$my.messageInfo.html("单张图片大小不可超过5M").fadeIn("fast").delay("1000").fadeOut("slow");
							return;
						};
						formdata.append('files', file);
						handleImageFile(file);
					}

					if (files.length != 0) {
						$.ajax({
							url: imgUploadURL,
							type: 'POST',
							data: formdata,
							timeout: "",
							dataType: "json",
							// async: false,  
							cache: false,
							contentType: false, // 告诉jQuery不要去设置Content-Type请求头
							processData: false, // 告诉jQuery不要去处理发送的数据
							beforeSend: function() {
								$("#imgModalWrap").modal("show");
								$('#imgModalWrap').modal({
									backdrop: 'static',
									keyboard: false
								});
								$("#imgModalWrap").on('touchmove', function(event) {
									event.preventDefault();
									event.stopPropagation();
								});
							},
							success: function(data) {
								console.log(data);
								if (JSON.stringify(data) !== "{}") {
									var status = data.statas;
									var imageUrl = "";
									var imageNmae = "";
									switch (status) {
										case "true":
											imageUrl = data.pathUrls.split(",");
											imageNmae = data.fileNames.split(",");

											Array.prototype.unshift.apply(self.expenseImageUrl, imageUrl);
											Array.prototype.unshift.apply(self.expenseImageName, imageNmae);

											$my.messageInfo.html(data.message).fadeIn("fast").delay("1000").fadeOut("slow");
											break;
										case "false":
											$my.messageInfo.html("上传失败,请重新上传").fadeIn("fast").delay("2000").fadeOut("slow");
											formdata = null;
											imageUrl = [];
											imageNmae = [];
											$(self.config.uploadWrap).find('li.newUploadImg').remove();
											break;
										default:
											break;
									}
								} else {
									$my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");
									return;
								};
							},
							complete: function() {
								$("#imgModalWrap").modal("hide");
							},
							error: function(returndata) {
								$my.messageInfo.html("上传失败,请重新上传").fadeIn("fast").delay("1500").fadeOut("slow");
								$("#imgModalWrap").modal("hide");
								formdata = null;
								$(self.config.uploadWrap).find('li.newUploadImg').remove();
							}
						});
					};

				} else {
					$my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow");
					return;
				};
			} else {
				$my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};

		}, false);
	},
	deleteEpUser: function() { //删除已选审批人
		var self = this;
		var getIndex = function(i) {
			return function() {
				this.parentNode.removeChild(this);
			};
		};

		slideout.on("close", function() {
			new Promise(function(resolve, reject) {
				resolve(self.config.approverWrap.querySelectorAll(".nowrap"));
			}).then(function(epUserList) {
				epUserList = Array.prototype.slice.call(epUserList);
				for (var i = 0; i < epUserList.length; i++) {
					epUserList[i].onclick = getIndex(i);
				};
			}).catch(function(err) {
				$my.messageInfo.html("异常错误:" + err).fadeIn("fast").delay("2000").fadeOut("slow");
			});
		});
	},
	deleteImg: function() { //删除图片
		var self = this;
		$(self.config.uploadWrap).on('click', 'li.newUploadImg', function(event) {
			event.preventDefault();
			event.stopPropagation();

			var nowIndex = $(this).index();
			var fileName = $(this).children('img').attr("alt");
			var imgName = fileName.substring(0, fileName.lastIndexOf(".")); //获取点击删除图片的文件名(不包含后缀名)

			for (var i = 0, len = self.expenseImageName.length; i < len; i++) {
				if (self.expenseImageName[i] === imgName) {
					console.log(self.expenseImageName[i]);
					self.expenseImageName.splice(i, 1);
					deleteUrl(i);
				};
			};

			function deleteUrl(i) {
				return function() {
					self.expenseImageUrl.splice(i, 1);
				}(i);
			};

			$(this).remove();
		});
	},
	asideEvent: function() { //slideout
		var self = this;
		// open slideout
		self.config.addApprover.addEventListener("click", function(event) {
			event.preventDefault();
			event.stopPropagation();

			self.config.menu.getElementsByClassName("content")[0].classList.remove("hide");
			self.config.menu.getElementsByClassName("content")[0].classList.add("show");
			// self.config.menu.querySelector(".depart").classList.remove("show");
			// self.config.menu.querySelector(".depart").classList.add("hide");
			self.config.menu.querySelector(".subDepart").classList.remove("show");
			self.config.menu.querySelector(".subDepart").classList.add("hide");
			slideout.open();
		}, false);

		// self.config.departWrapID.addEventListener("click", function(event) {
		// 	event.preventDefault();
		// 	event.stopPropagation();

		// 	self.config.menu.getElementsByClassName("content")[0].classList.remove("show");
		// 	self.config.menu.getElementsByClassName("content")[0].classList.add("hide");
		// 	self.config.menu.querySelector(".depart").classList.remove("hide");
		// 	self.config.menu.querySelector(".depart").classList.add("show");
		// 	self.config.menu.querySelector(".subDepart").classList.remove("show");
		// 	self.config.menu.querySelector(".subDepart").classList.add("hide");
		// 	slideout.open();
		// }, false);

		self.config.subDepartID.addEventListener("click", function(event) {
			event.preventDefault();
			event.stopPropagation();

			self.config.menu.getElementsByClassName("content")[0].classList.remove("show");
			self.config.menu.getElementsByClassName("content")[0].classList.add("hide");
			// self.config.menu.querySelector(".depart").classList.remove("show");
			// self.config.menu.querySelector(".depart").classList.add("hide");
			self.config.menu.querySelector(".subDepart").classList.remove("hide");
			self.config.menu.querySelector(".subDepart").classList.add("show");

			slideout.open();
		}, false)

		// close slideout
		self.config.closeBtn.addEventListener("touchend", function(event) {
			event.preventDefault();
			event.stopPropagation();

			slideout.close();
		}, false);

		// self.config.closeBtn_depart.addEventListener("touchend", function(event) {
		// 	event.preventDefault();
		// 	event.stopPropagation();

		// 	slideout.close();
		// }, false);

		self.config.closeBtn_subDepart.addEventListener('touchend', function(event) {
			event.preventDefault();
			event.stopPropagation();

			slideout.close();
		}, false)
	},
	jobNumEvent: function() { //报销人工号输入
		var self = this,
			reg = /^[0-9]*$/,
			reg2 = /^\d{7}$/,
			inputFn = function() {
				if (reg.test(this.value)) {
					if (!reg2.test(this.value)) {
						$my.messageInfo.html("请输入7位数字").fadeIn("fast").delay("1000").fadeOut("slow");
						return;
					} else {
						var loginName = this.value;
						$.ajax({
							url: getRoothPath + '/ddExpenses/userController/expenseUser.do',
							data: {
								"loginName": loginName
							},
							// async: false, //同步
							success: function(data) {
								console.log(data)
								if (JSON.stringify(data) !== "{}") {
									var status = data.status;

									switch (status) {
										case "true":
											var info = data.info;

											if (JSON.stringify(info) !== "{}") {
												var dataArr = info.data;
												if (dataArr.length) {
													self.config.bankAccount.value = dataArr[0].bankAccount;
													self.config.accountName.value = dataArr[0].accountName;
													self.config.accounNumber.value = dataArr[0].accounNumber;
												} else {
													$my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1500").fadeOut("slow");
													// self.config.jobNum.value = "";
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
					};
				} else {
					$my.messageInfo.html("输入不合法").fadeIn("fast").delay("1000").fadeOut("slow");
					this.value = "";
					return;
				}
			};

		self.config.jobNum.addEventListener("input", self.throttle(inputFn, 1500), false);
	},
	expenseAName: function() { //检索开户名
		var self = this,
			reg = /^[\u4e00-\u9fa5]{0,}$/,
			flag = true,
			inGroupWrap = self.config.groupWrap.querySelector("#inGroupWrap");

		var inputFn = function() {
			var val = this.value;
			if (val == "") {
				inGroupWrap.innerHTML = "";
				self.config.groupWrap.classList.remove("show");
				self.config.groupWrap.classList.add("hide");
			};

			if (flag) {
				if (reg.test(val)) {
					var len = val.length;
					if (len >= 2) {
						$.ajax({
							url: getRoothPath + '/ddExpenses/userController/expenseAName.do',
							data: {
								"name": val
							},
							// async: false, //同步
							success: function(data) {
								console.log(data)
								if (JSON.stringify(data) !== "{}") {
									var status = data.status;
									switch (status) {
										case "true":
											var info = data.info;

											if (JSON.stringify(info) !== "{}") {
												var dataArr = info.data;
												if (dataArr.length) {
													var str = "";
													for (var i = 0, len = dataArr.length; i < len; i++) {
														str += '<li class="list-group-item" data-accountnameid=' + dataArr[i].id + '>' + dataArr[i].accountName + '</li>';
													};

													inGroupWrap.innerHTML = str;
													self.config.groupWrap.classList.remove("hide");
													self.config.groupWrap.classList.add("show");
												} else {
													$my.messageInfo.html("返回信息为空,请重新输入").fadeIn("fast").delay("1500").fadeOut("slow");
													inGroupWrap.innerHTML = "";
													self.config.groupWrap.classList.remove("show");
													self.config.groupWrap.classList.add("hide");
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
					};
				} else {
					$my.messageInfo.html("请输入中文汉字").fadeIn("fast").delay("1500").fadeOut("slow");
					// this.value = "";
					return;
				};
			};

		};

		self.config.accountName.addEventListener("compositionstart", function() {
			console.log("开始");
			inGroupWrap.innerHTML = "";
			self.config.groupWrap.classList.remove("show");
			self.config.groupWrap.classList.add("hide");
			flag = false;
		}, false);

		self.config.accountName.addEventListener("compositionend", function() {
			console.log("结束");
			flag = true;
		}, false);

		self.config.accountName.addEventListener("input", self.throttle(inputFn, 1000), false);

		self.config.accountName.addEventListener("blur", function() {
			inGroupWrap.innerHTML = "";
			self.config.groupWrap.classList.add("hide");
		}, false);
	},
	expenseANameEvent: function() { //开户名检索账号
		var self = this;
		var inGroupWrap = self.config.groupWrap.querySelector("#inGroupWrap");
		// 怂了，用jQuery了 ^-^
		$(inGroupWrap).on('touchend', 'li', function(event) {
			event.preventDefault();
			event.stopPropagation();

			self.config.groupWrap.classList.remove("show");
			self.config.groupWrap.classList.add("hide");

			var accountnameid = this.dataset.accountnameid;
			var val = this.innerHTML;

			self.config.accountName.value = val;

			$.ajax({
				url: getRoothPath + '/ddExpenses/userController/expenseBank.do',
				data: {
					"id": accountnameid
				},
				// async: false, //同步
				success: function(data) {
					console.log(data)
					if (JSON.stringify(data) !== "{}") {
						var status = data.status;
						switch (status) {
							case "true":
								var info = data.info;

								if (JSON.stringify(info) !== "{}") {
									var dataArr = info.data;
									if (dataArr.length) {
										self.config.bankAccount.value = dataArr[0].bankAccount;
										self.config.accounNumber.value = dataArr[0].accounNumber;
										self.config.jobNum.value = dataArr[0].loginName;
									} else {
										$my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1500").fadeOut("slow");
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
	getCompany: function() { //获取公司
		var self = this;
		$.ajax({
			url: getRoothPath + '/ddExpenses/userController/company.do',
			// async: false, //同步
			success: function(data) {
				console.log(data)
				if (JSON.stringify(data) !== "{}") {
					var status = data.status;

					switch (status) {
						case "true":
							var info = data.info;

							if (JSON.stringify(info) !== "{}") {
								var dataArr = info.data;
								if (dataArr.length) {
									var str = "";

									for (var i = 0, len = dataArr.length; i < len; i++) {
										str += '<li class="list-group-item nowrap" data-reimbursementid=' + dataArr[i].reimbursementID + '>' + dataArr[i].companyName + '</li>'
									};

									self.config.companyList.innerHTML = str;
								} else {
									self.config.companyList.innerHTML = "<span style='font-weight:normal'>暂无公司信息</span>";
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
	selectCompany: function() { //选择公司
		var self = this;
		self.config.companyList.addEventListener('click', function(event) {
			var event = event || window.event;
			var target = event.target || event.srcElement;

			if (target.tagName.toLowerCase() === 'li') {
				self.config.companyID.value = target.innerHTML;
				self.config.companyID.dataset.reimbursementid = target.dataset.reimbursementid;
				$('#companyModal').modal('hide');
			}
		})
	},
	getBusiness: function() { //获取事业部
		var self = this;
		$.ajax({
			url: getRoothPath + '/ddExpenses/userController/business.do',
			// async: false, //同步
			success: function(data) {
				console.log(data)
				if (JSON.stringify(data) !== "{}") {
					var status = data.status;

					switch (status) {
						case "true":
							var info = data.info;

							if (JSON.stringify(info) !== "{}") {
								var dataArr = info.data;
								if (dataArr.length) {
									var str = "";

									for (var i = 0, len = dataArr.length; i < len; i++) {
										str += '<li class="list-group-item nowrap" data-businessid=' + dataArr[i].departmentID + '>' + dataArr[i].departmentName + '</li>'
									};

									self.config.businessList.innerHTML = str;
								} else {
									self.config.businessList.innerHTML = "<span style='font-weight:normal'>暂无事业部信息</span>";
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
	selectBusiness: function() { //选择事业部
		var self = this;
		self.config.businessList.addEventListener('click', function(event) {
			var event = event || window.event;
			var target = event.target || event.srcElement;

			if (target.tagName.toLowerCase() === 'li') {
				self.config.business.value = target.innerHTML;
				self.config.business.dataset.businessid = target.dataset.businessid;
				$('#businessModal').modal('hide');
			}
		})
	},
	commonSubDepart: function() { //常用项目
		var self = this;

		$.ajax({
			url: getRoothPath + '/ddExpenses/userController/commonSubDepart.do',
			data: {
				"userID": $my.userID
			},
			// async: false, //同步
			success: function(data) {
				console.log(data)
				if (JSON.stringify(data) !== "{}") {
					var status = data.status;
					switch (status) {
						case "true":
							var info = data.info;
							if (JSON.stringify(info) !== "{}") {
								var dataArr = info.data;
								if (dataArr.length) {
									var str = "";

									for (var i = 0, len = dataArr.length; i < len; i++) {
										str += '<li class="nowrap text-center" data-cdepartmentsubid=' + dataArr[i].cDepartmentSubID + '>' + dataArr[i].cDepartmentSubName + '</li>';
									};

									self.config.subDepartWrap.innerHTML = str;
								} else {
									self.config.subDepartWrap.innerHTML = "<span style='font-weight:normal'>暂无常用审批项目</span>";
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
	sCommonSubDepart: function() { //常用项目点击
		var self = this;
		self.config.subDepartWrap.addEventListener('click', function(event) {
			var event = event || window.event;
			var target = event.target || event.srcElement;

			if (target.tagName.toLowerCase() === 'li') {
				self.config.subDepartID.value = target.innerHTML;
				self.config.subDepartID.dataset["subdepartid"] = target.dataset["cdepartmentsubid"];
				slideout.close();
			}
		}, false);
	},
	_renderSubDepartList: function(dataArr) { //部门/项目分页数据渲染
		var str = "",
			self = this;

		for (var i = 0, len = dataArr.length; i < len; i++) {
			str += '<div class="row my-row" data-departmentsubid=' + dataArr[i].departmentSubID + ' data-departmentsubname=' + dataArr[i].departmentSubName + '>';
			str += '<div class="col-xs-12 col-sm-12 col-md-12 my-col">';
			str += '<span>' + dataArr[i].departmentSubName + '</span>';
			str += '</div>';
			str += '</div>';
		};

		$(self.config.subDepartWrapID).append(str);
		self.touchflag = false;
	},
	getsubDepartList: function(search, pageNum) { //获取部门/项目分页数据
		var self = this;
		$.ajax({
			url: getRoothPath + '/ddExpenses/userController/subDepartList.do',
			data: {
				"search": search,
				"pageNum": pageNum,
				"pageSize": pageSize
			},
			// async: false, //同步
			success: function(data) {
				console.log(data)
				if (JSON.stringify(data) !== "{}") {
					var status = data.status;
					switch (status) {
						case "true":
							var info = data.info;
							if (JSON.stringify(info) !== "{}") {
								self.dataCount = info.dataCount;
								var dataArr = info.data;

								if (dataArr.length) {
									if (dataArr.length < pageSize) {
										$(".loading").hide();
										self.config.loadingWrap.querySelector('#lodingText').classList.remove("lodingText_hide");
										self.config.loadingWrap.querySelector('#lodingText').classList.add("lodingText_show");
									};

									self._renderSubDepartList(dataArr);
								} else {
									self.config.subDepartWrapID.innerHTML = '';
									$my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");
									$(".loading").hide();
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
	searchSubDepart: function() { //部门/项目分页搜索
		var self = this,
			flag = true;
		var _searchsubDepartBuffer = function() {
			var val = this.value.trim();
			if (flag) {
				self.pagenum = 0;
				self.config.loadingWrap.querySelector('#lodingText').classList.remove("lodingText_show");
				self.config.loadingWrap.querySelector('#lodingText').classList.add("lodingText_hide");
				$(".loading").show();
				self.config.subDepartWrapID.innerHTML = '';
				if (val) {
					self.getsubDepartList(val, 0);
				} else {
					self.getsubDepartList('', 0);
				};
			};
		}

		self.config.subDepartInput.addEventListener('compositionstart', function() {
			flag = false;
		})

		self.config.subDepartInput.addEventListener('compositionend', function() {
			flag = true;
		})

		self.config.subDepartInput.addEventListener("input", self.throttle(_searchsubDepartBuffer, 1000), false);
	},
	scrollEvent: function() { //部门/项目分页滑动事件
		var self = this,
			rect = self.config.loadingWrap.getBoundingClientRect();

		var _scrollEvent = function() {
			if (!self.touchflag) {
				if (rect.top < self.vpHeight && rect.bottom >= 0) {
					self.touchflag = true;
					self.pagenum++;
					if (self.pagenum > parseInt(self.dataCount / pageSize) || (self.pagenum == parseInt(self.dataCount / pageSize) && self.dataCount % pageSize == 0)) {
						$(".loading").hide();
						self.config.loadingWrap.querySelector('#lodingText').classList.remove("hide");
						self.config.loadingWrap.querySelector('#lodingText').classList.add("lodingText_show");
						return false;
					} else {
						self.getsubDepartList(self.config.subDepartInput.value, self.pagenum);
					};
				} else {
					return;
				}
			}
		}


		// self.config.subDepartContent.addEventListener("touchmove", self.throttleInput(_scrollEvent, 500, 1000));
		self.config.subDepartContent.addEventListener("touchmove", self.throttleInput(_scrollEvent, 800));
	},
	_getTarget: function(target, that, className) { //获取target
		if (target.className.indexOf(className) !== -1) {
			return target;
		}
		if (target == that) {
			return false;
		}
		while (target.className.indexOf(className) === -1) {
			target = target.parentNode;
		}
		return target;
	},
	subDepartListEvent: function() { //部门/项目分页点击事件
		var self = this;
		self.config.subDepartWrapID.addEventListener('click', function(event) {
			var event = event || window.event;
			var target = event.target || event.srcElement;
			var that = this;

			var targetNode = self._getTarget(target, that, 'my-row');
			var targetSubDepartID = targetNode.dataset["departmentsubid"];
			var targetSubDepartName = targetNode.dataset["departmentsubname"];

			self.config.subDepartID.value = targetSubDepartName;
			self.config.subDepartID.setAttribute('data-subdepartid', targetSubDepartID);

			slideout.close();
			event.stopPropagation();
			event.preventDefault();
		}, false)
	},
	init: function() { //init封装
		this.getProductType(); //获取报销类型
		this.getCashierUser(); //获取出纳人	
		this.getOldBank($my.userID); //获取历史收款信息	
		this.addEvents(); //添加报销事件
		this.calcExpenseTotal(); //计算总金额
		this.getDepart(0); // 默认获取部门及联系人
		this.asyncGetDepart(); //异步加载部门及联系人
		this.getEpUser($my.userID); //获取常用审批人
		this.crumbsEvent(); //面包屑点击事件
		this.selectEpUser(); //常用审批人点击事件
		this.addImage(); //添加图片
		this.deleteEpUser(); //删除审批人
		this.deleteImg(); //删除图片
		this._deleteProductType(); //删除报销类型
		this.asideEvent(); //slideout
		// this.expenseDepart($my.userID); //默认获取报销部门
		// this.expenseDepartSearch(); //搜索查询报销部门
		// this.expenseDepartEvent(); //报销部门点击事件
		this.jobNumEvent(); //报销人工号输入
		this.expenseAName(); //检索开户名
		this.expenseANameEvent(); //开户名检索账号
		// this._renderDepart('', ''); //页面主动加载报销部门
		this.searchApprovalEvent(); //审核人模糊查询
		this.getCompany(); //获取公司
		this.selectCompany(); //选择公司
		this.getBusiness(); //获取事业部
		this.selectBusiness(); //选择事业部
		this.commonSubDepart(); //常用项目
		this.sCommonSubDepart(); //选择事业部
		this.getsubDepartList('', 0); //默认获取部门/项目分页数据
		this.searchSubDepart(); //部门/项目分页搜索
		this.scrollEvent(); //部门/项目分页滑动事件
		this.subDepartListEvent(); //部门/项目分页点击事件
	}
}

var approval = new Approval();


$(function() {
	window.$my = {
		messageInfo: $(".messageInfo"),
		userID: sessionStorage.getItem("ddUserID")
	}

	approval.init(); //调用init

	$(".modal").on('show.bs.modal', function() { // 模态框打开，禁止通过触摸事件打开slideout
		slideout.disableTouch();
	})

	$(".modal").on('hidden.bs.modal', function() { // 模态框关闭后，启用slideout的touch
		slideout.enableTouch();
	})

	var footerEle = document.getElementsByClassName("footer")[0];
	slideout.on('beforeopen', function() {
		$(footerEle).hide();
	});

	slideout.on('close', function() {
		$(footerEle).show();
	});

	// 加载进度模态框居中
	var $modal = $('#imgModalWrap');
	$modal.on('show.bs.modal', function() {
		var $this = $(this);
		var $modal_dialog = $this.find('.modal-dialog');
		// 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
		$this.css('display', 'block');
		$modal_dialog.css({
			'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)
		});
	});

	//提交保存事件
	var submitBtn = document.querySelector("#submitBtn");
	// submitBtn.addEventListener("click", function(event){
	// 	event.preventDefault();
	// 	event.stopPropagation();

	// 	approval.throttle(approval.submitEvent, 200);
	// }, false);

	submitBtn.addEventListener("click", approval.throttle(approval.submitEvent, 200), false);
});

dd.ready(function() {
	// 安卓控制返回按钮
	document.addEventListener('backbutton', function(e) {
		var isOpen = slideout.isOpen();
		if (isOpen) {
			slideout.close();
			e.preventDefault(); //backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现
		} else {
			dd.device.notification.confirm({
				message: "您确定要退出吗",
				title: "提示",
				buttonLabels: ['取消', '确定'],
				onSuccess: function(result) {
					var buttonIndex = result.buttonIndex;
					switch (buttonIndex) {
						case 1:
							dd.biz.navigation.goBack({
								onSuccess: function(result) {},
								onFail: function(err) {}
							})
							break;
						case 0:
							break;
						default:
							break;
					}

				},
				onFail: function(err) {}
			});
			e.preventDefault();
		}
	});

	// ios控制返回按钮
	dd.biz.navigation.setLeft({
		control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
		text: '', //控制显示文本，空字符串表示显示默认文本
		onSuccess: function(result) {
			var isOpen = slideout.isOpen();
			if (isOpen) {
				slideout.close();
			} else {
				dd.device.notification.confirm({
					message: "您确定要退出吗",
					title: "提示",
					buttonLabels: ['取消', '确定'],
					onSuccess: function(result) {
						var buttonIndex = result.buttonIndex;
						switch (buttonIndex) {
							case 1:
								dd.biz.navigation.goBack({
									onSuccess: function(result) {},
									onFail: function(err) {}
								})
								break;
							case 0:
								break;
							default:
								break;
						}
					},
					onFail: function(err) {}
				});
			}
		},
		onFail: function(err) {
			alert(err)
		}
	});
});