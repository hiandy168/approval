function Approval() {
	this.expenseLog = []; //评论集合
	this.expenseUser = []; //审核信息
	// this.departName = ""; //报销部门
	// this.departmentID = ""; //报销部门id
	this.accountName = ""; //开户人姓名
	this.accounNumber = ""; //银行账号
	this.bankAccount = ""; //开户行
	this.expenseTotal = ""; //总金额
	this.imgArr = []; //图片
	this.imageNameArr = []; //图片名
	this.productType = []; //报销类型集合
	this.cashier = {}; //出纳人
	this.jobNum = ''; //报销人工号
	this.userName = ''; //报销人姓名
	this.companyName = ''; //公司名
	this.reimbursementid = ''; //所属公司id
	this.business = ''; //所属事业部
	this.businessid = ''; //所属事业部id
	this.subDepart = ''; //项目/部门
	this.subDepartid = ''; //项目/部门id

	this.config = {
		expenseLogWrap: document.querySelector("#expenseLogWrap"),
		expenseUserWrap: document.querySelector("#expenseUserWrap"),
		uploadWrap: document.querySelector("#uploadWrap"),
		productTypeWrap: document.querySelector("#productTypeWrap"),
		accountName: document.querySelector("#accountName"),
		accounNumber: document.querySelector("#accounNumber"),
		bankAccount: document.querySelector("#bankAccount"),
		expenseTotal: document.querySelector("#expenseTotal"),
		cashier: document.querySelector("#cashier"),
		// departName: document.querySelector("#departName"),
		jobNum: document.querySelector("#jobNum"),
		companyID: document.querySelector("#companyID"),
		business: document.querySelector("#business"),
		subDepart: document.querySelector('#subDepart')
	}
}

Approval.prototype = {
	constructor: Approval,
	getDetailid: function() { //获取详情id和status
		var url = window.location.href;
		if (url.indexOf("detailid") != -1 && url.indexOf("status") != -1) {
			var detailid = window.location.search;
			var status = window.location.hash;

			detailid = detailid.split("=")[1];
			status = status.split("=")[1];

			$my.detailid = detailid;
			$my.status = status;
		} else {
			$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			throw new Error("url错误");
		};
	},
	getData: function() {
		var self = this;
		$.ajax({
			url: getRoothPath + '/ddExpenses/expenseInfo/expenseDetail.do',
			data: {
				"id": $my.detailid
			},
			success: function(data) {
				console.log(data);
				if (JSON.stringify(data) !== "{}") {
					var status = data.status;

					switch (status) {
						case "true":
							var info = data.info;
							if (JSON.stringify(info) !== "{}") {
								var expenseInfoData = info.expenseInfo; //报销信息

								if (expenseInfoData.length) {
									self.accountName = expenseInfoData[0].accountName;
									self.accounNumber = expenseInfoData[0].accounNumber;
									self.bankAccount = expenseInfoData[0].bankAccount;
									self.expenseTotal = expenseInfoData[0].expenseTotal;
									// self.departName = expenseInfoData[0].departName;
									// self.departmentID = expenseInfoData[0].departmentID;
									self.jobNum = expenseInfoData[0].loginName;
									self.userName = expenseInfoData[0].userName;
									self.companyName = expenseInfoData[0].companyName;
									self.reimbursementid = expenseInfoData[0].reimbursementID;
									self.business = expenseInfoData[0].departName;
									self.businessid = expenseInfoData[0].departmentID;
									self.subDepart = expenseInfoData[0].departmentSubName;
									self.subDepartid = expenseInfoData[0].departmentSubID;

									if (expenseInfoData[0].imageUrl != null && expenseInfoData[0].imageUrl != "null") {
										self.imgArr = expenseInfoData[0].imageUrl.split(",");
									};

									if (expenseInfoData[0].imageName != null && expenseInfoData[0].imageName != "null") {
										self.imageNameArr = expenseInfoData[0].imageName.split(",");
									};

								} else {
									$my.messageInfo.html("收款信息为空").fadeIn("fast").delay("1500").fadeOut("slow");
								};

								self.expenseLog = info.expenseLog;
								self.expenseUser = info.expenseUser;
								var cashierArr = info.expenseUser;
								self.productType = info.productType;

								self._renderExpenseLog();
								self._renderExpenseUser();
								self._bindDom();
								self._renderImg();
								self._renderProductType();

								self.cashier = cashierArr.pop();
								self._renderCashier();

								if ($my.status === "2") {
									// 存入sessionStorage
									sessionStorage.setItem("productType", JSON.stringify(info.productType));
									sessionStorage.setItem("expenseUser", JSON.stringify(info.expenseUser));
									// sessionStorage.setItem("departName", self.departName);
									// sessionStorage.setItem("departmentID", self.departmentID);
									sessionStorage.setItem("accountName", self.accountName);
									sessionStorage.setItem("accounNumber", self.accounNumber);
									sessionStorage.setItem("bankAccount", self.bankAccount);
									sessionStorage.setItem("jobNum", self.jobNum);
									sessionStorage.setItem("expenseTotal", self.expenseTotal);
									sessionStorage.setItem("companyName", self.companyName);
									sessionStorage.setItem("reimbursementid", self.reimbursementid);
									sessionStorage.setItem("imgArr", self.imgArr);
									sessionStorage.setItem("imageNameArr", self.imageNameArr);

									sessionStorage.setItem('business', self.business);
									sessionStorage.setItem('businessid', self.businessid);
									sessionStorage.setItem('subDepart', self.subDepart);
									sessionStorage.setItem('subDepartid', self.subDepartid);
								}
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
	_renderExpenseLog: function() { //render评论
		if (this.expenseLog.length) {
			var str = "";

			for (var i = 0, len = this.expenseLog.length; i < len; i++) {
				var imgStr = "";
				var logImgArr = null;
				var logImgNameArr = null;
				var time = this.expenseLog[i].creatTime;
				time = time.substring(5);

				if (this.expenseLog[i].url) {
					logImgArr = this.expenseLog[i].url.split(",");
					logImgNameArr = this.expenseLog[i].fileName.split(",");

					if (logImgArr != null && logImgArr.length) {
						for (var s = 0, length = logImgArr.length; s < length; s++) {
							imgStr += '<li class="logimg"><img data-src=' + logImgArr[s] + ' src=' + logImgArr[s] + '?imageView2/1/w/200/h/200 alt=' + logImgNameArr[s] + '></li>';
						};
					};
				};

				str += '<div class="row my-row">';
				str += '<div class="col-xs-9 col-sm-9 col-md-9">';
				str += '<p>';
				str += '<span class="commentName">' + this.expenseLog[i].expenseName + ':</span>&nbsp;&nbsp;<textarea readonly=readonly class="commentContent">' + this.expenseLog[i].expenselog + '</textarea>';
				str += '</p>';
				str += '</div>';
				str += '<div class="col-xs-3 col-sm-3 col-md-3 text-right nowrap time">';
				str += '<span>' + time + '</span>';
				str += '</div>';
				str += '<div class="col-xs-12 col-sm-12 col-md-12">';
				str += '<ul class="imgContent clearfix">';
				str += imgStr;
				str += '</ul>';
				str += '</div>';
				str += '</div>';
			};

			this.config.expenseLogWrap.innerHTML = str;
		} else {
			this.config.expenseLogWrap.innerHTML = "<p style='padding-left:0.3rem; margin-bottom:0.3rem; font-weight: normal'>暂无评论信息</p>";
		};
	},
	_renderExpenseUser: function() { //render审批人
		if (this.expenseUser.length) {
			var str = "";
			var judgeStr = "";
			var iconStr = "";
			var timeStr = "";

			for (var i = 0, len = this.expenseUser.length - 1; i < len; i++) {
				var status = this.expenseUser[i].reviewState;

				switch (status) {
					case 0:
						judgeStr = '<li class="text-center refused" data-expenseuserid=' + this.expenseUser[i].expenseUserID + '>';
						timeStr = '<p class="time">' + this.expenseUser[i].expenseTime.substring(0, 10) + '</p>';
						iconStr = '<div class="wating text-center progressBar special_progressBar"><span class="iconfont icon-ttpodicon my-icon"></span></div>';
						break;
					case 1:
						judgeStr = '<li class="text-center" data-expenseuserid=' + this.expenseUser[i].expenseUserID + '>';
						timeStr = '<p class="time">&nbsp;</p>'
						iconStr = '<div class="wating text-center progressBar">等待</div>';
						break;
					case 2:
						judgeStr = '<li class="text-center passed" data-expenseuserid=' + this.expenseUser[i].expenseUserID + '>';
						timeStr = '<p class="time">' + this.expenseUser[i].expenseTime.substring(0, 10) + '</p>';
						iconStr = '<div class="wating text-center progressBar special_progressBar"><span class="iconfont icon-tongguo my-icon"></span></div>';
						break;
					default:
						break;
				}

				str += '' + judgeStr + '';
				str += '' + timeStr + '';
				str += '' + iconStr + '';
				str += '<p class="name">' + this.expenseUser[i].expenseUserName + '</p>';
			};

			this.config.expenseUserWrap.innerHTML = str;
		} else {
			var str = "";
			str += '<span style="font-weight:normal">暂无审批信息</span>';
			this.config.expenseUserWrap.innerHTML = str;
		};
	},
	_renderCashier: function() { //出纳人
		if (JSON.stringify(this.cashier) !== "{}" && this.cashier !== undefined) {
			var str = "";

			switch (this.cashier.reviewState) {
				case 0:
					str += "<li class='cashier text-center refused' data-expenseuserid=" + this.cashier.expenseUserID + ">";
					str += "<p class='time'>" + this.cashier.expenseTime.substring(0, 10) + "&nbsp;</p>";
					str += "<div class='wating text-center progressBar'><span class='iconfont icon-ttpodicon my-icon'></span></div>";
					break;
				case 1:
					str += "<li class='cashier text-center' data-expenseuserid=" + this.cashier.expenseUserID + ">";
					str += "<p class='time'>&nbsp;</p>";
					str += "<div class='wating text-center progressBar'>出纳</div>";
					break;
				case 2:
					str += "<li class='cashier text-center passed' data-expenseuserid=" + this.cashier.expenseUserID + ">";
					str += "<p class='time'>" + this.cashier.expenseTime.substring(0, 10) + "&nbsp;</p>";
					str += "<div class='wating text-center progressBar'><span class='iconfont icon-tongguo my-icon'></span></div>";
					break;
				default:
					str += "<li class='cashier text-center' data-expenseuserid=" + this.cashier.expenseUserID + ">";
					str += "<p class='time'>&nbsp;</p>";
					str += "<div class='wating text-center progressBar'>出纳</div>";
					break;
			}

			str += "<p class='name'>" + this.cashier.expenseUserName + "</p>";
			str += "</li>";

			this.config.cashier.innerHTML = str;
		} else {
			this.config.cashier.innerHTML = "<span style='font-weight:normal'>暂无出纳人信息</span>";
		};
	},
	_bindDom: function() {
		this.config.accountName.value = this.accountName;
		this.config.accounNumber.value = this.accounNumber;
		this.config.bankAccount.value = this.bankAccount;
		this.config.expenseTotal.value = this.expenseTotal;
		// this.config.departName.value = this.departName;
		this.config.jobNum.value = this.userName;
		// this.config.departName.dataset.departmentid = this.departmentID;
		this.config.companyID.value = this.companyName;
		this.config.companyID.dataset.reimbursementid = this.reimbursementid;
		this.config.business.value = this.business;
		this.config.business.setAttribute('data-businessid', this.businessid);
		this.config.subDepart.value = this.subDepart;
		this.config.subDepart.setAttribute('data-subDepartid', this.subDepartid);
	},
	_renderImg: function() { //render报销凭证
		var str = "";
		if (this.imgArr.length) {
			for (var i = 0, len = this.imgArr.length; i < len; i++) {
				str += '<li class="responseImg">';
				str += '<img data-src=' + this.imgArr[i] + ' src=' + this.imgArr[i] + '?imageView2/1/w/200/h/200 alt=' + this.imageNameArr[i] + '>';
				str += '</li>';
			};

			this.config.uploadWrap.innerHTML = str;
		} else {
			str += '<span style="font-weight: normal">暂无报销凭证信息</span>'
			this.config.uploadWrap.innerHTML = str;
		};
	},
	_renderProductType: function() { //render报销类型
		if (this.productType.length) {
			var str = '';
			var indexStr = "";
			var statusStr = "";

			for (var i = 0, len = this.productType.length; i < len; i++) {
				switch (i) {
					case 0:
						indexStr = "报销一";
						break;
					case 1:
						indexStr = "报销二";
						break;
					case 2:
						indexStr = "报销三";
						break;
					default:
						break;
				}

				str += '<div class="appendChild compactWrap">';
				str += '<p class="titleMessage clearfix">';
				str += '<span class="pull-left">' + indexStr + '</span>';
				str += '' + statusStr + '';
				str += '</p>';
				str += '<div class="container-fluid myContainer inputFile">';
				str += '<div class="row my-row">';
				str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col">';
				str += '<span>报销类型</span>';
				str += '</div>';
				str += '<div class="col-xs-9 col-sm-9 col-md-9 my-col lighter">';
				str += '<input type="text" readonly="readonly" value=' + this.productType[i].productTypeName + '>';
				str += '</div>';
				str += '</div>';
				str += '<div class="row my-row">';
				str += '<div class="col-xs-4 col-sm-4 col-md-4 my-col">';
				str += '<span>报销金额(￥)</span>';
				str += '</div>';
				str += '<div class="col-xs-8 col-sm-8 col-md-8 my-col redColor lighter">';
				str += '<input type="text" readonly="readonly" value=' + this.productType[i].itemAlltotal + '>';
				str += '</div>';
				str += '</div>';
				str += '<div class="row my-row special-row">';
				str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col">';
				str += '<span>费用说明</span>';
				str += '</div>';
				str += '<div class="col-xs-9 col-sm-9 col-md-9 my-col lighter">';
				str += '<textarea readonly="readonly">' + this.productType[i].remark + '</textarea>';
				str += '</div></div></div></div>';
			};

			this.config.productTypeWrap.innerHTML = str;

		} else {
			var str = "";
			str += '<div class="appendChild">';
			str += '<p class="titleMessage clearfix">';
			str += '<span class="pull-left" style="font-weight:normal; font-size:.32rem">暂无报销类型数据</span>';
			str += '';
			str += '</p>';

			this.config.productTypeWrap.innerHTML = str;
		};

		autosize($('textarea')); // textarea自适应高度
	},
	viewLargeImg: function(str) { //查看大图
		var self = this;
		var targetDom = '';
		targetDom = str === "uploadWrap" ? self.config.uploadWrap : self.config.expenseLogWrap;

		targetDom.addEventListener("click", function() {
			var event = event || window.event;
			var target = event.target || event.srcElement;

			event.preventDefault();
			if (target.nodeName.toLowerCase() === "img") {
				var key = '',
					targetDataset = target.dataset["src"],
					urlList = [],
					newArr = target.parentNode.parentNode.querySelectorAll("img");
				newArr = Array.prototype.slice.call(newArr);

				for (var i = 0, len = newArr.length; i < len; i++) {
					var src = '';
					src = newArr[i].dataset["src"];

					if (src === targetDataset) {
						key = i;
					};
					urlList.push(src);
				};

				urlList = JSON.stringify(urlList);
				sessionStorage.setItem("urlList", urlList);
				window.location.href = "zoomImg.html?index=" + key;
				urlList = null;
			}
		}, false);
	}
}

var approval = new Approval();

$(function() {
	window.$my = {
		messageInfo: $(".messageInfo")
	}
	var footer = document.querySelector("footer");

	approval.getDetailid(); //获取详情id和status

	if ($my.status === "2") { //底部修改按钮显示
		var refusedBtn = footer.querySelector(".refusedBtn");
		refusedBtn.classList.remove("hide");
	};

	approval.getData();
	approval.viewLargeImg();
	approval.viewLargeImg("uploadWrap");
	approval.viewLargeImg("expenseLogWrap");

	// 跳转修改页面
	var editBtn = footer.querySelector("#editBtn");
	editBtn.addEventListener("click", function(event) {
		event.preventDefault();
		event.stopPropagation();

		window.location.href = "edit.html?detailid=" + $my.detailid;
	}, false);

	// 跳转评论页面
	var commentBtn = document.querySelector("#commentBtn");
	commentBtn.addEventListener('click', function(event) {
		event.stopPropagation();
		event.preventDefault();

		window.location.href = 'comment.html?expenseID=' + $my.detailid;
	});
});

dd.ready(function() {
	// ios控制返回按钮
	dd.biz.navigation.setLeft({
		control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
		text: '', //控制显示文本，空字符串表示显示默认文本
		onSuccess: function(result) {},
		onFail: function(err) {}
	});
});