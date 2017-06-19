// slideout
var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70,
    'touch': false
});

function Approval(){
	this.switchStr = true; //面包屑点击switch
	this.expenseImageUrl = []; //报销凭证url
	this.expenseImageName = []; //报销凭证name
	this.detailid = ""; //详情id

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
		uploadWrap: document.querySelector("#uploadWrap"),
		myFile: document.querySelector("#myFile"),
		deleteApproverWrap: document.querySelector("#deleteApproverWrap"),
		cancleBtn: document.querySelector("#cancleBtn"),
		confirmBtn: document.querySelector("#confirmBtn"),
		imgModal: document.querySelector("#imgModal"),
		cancleBtn_img: document.querySelector("#cancleBtn_img"),
		confirmBtn_img: document.querySelector("#confirmBtn_img")
	}
}

Approval.prototype = {
	throttle: function(method, context) { //点击节流
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
		}, 200);
	},
	getDetailed: function(){ //获取详情id
		var url = window.location.href;
		var self = this;
		if (url.indexOf("detailid") != -1) {
		    var detailidStr = window.location.search;

		    self.detailid = detailidStr.split("=")[1];
		} else {
		    $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
		    throw new Error("url错误");
		};
	},
	getSessionData: function(){ //获取session数据
		var productType = JSON.parse(sessionStorage.getItem("productType")), //获取报销类型信息
			expenseUser = JSON.parse(sessionStorage.getItem("expenseUser")), //获取审批人
			accountName = sessionStorage.getItem("accountName"), //开户人姓名
			accounNumber = sessionStorage.getItem("accounNumber"), //开户人账号
			bankAccount = sessionStorage.getItem("bankAccount"), //开户行
			expenseTotal = sessionStorage.getItem("expenseTotal"), //总计金额
			imgArr = sessionStorage.getItem("imgArr"), //图片数组
			imageNameArr = sessionStorage.getItem("imageNameArr"), //图片名集合
			str = "",
			text = '',
			approverStr = "",
			imgStr = "";

		this.config.accountName.value = accountName;
		this.config.accounNumber.value = accounNumber;
		this.config.bankAccount.value = bankAccount;
		this.config.expenseTotal.value = expenseTotal;

		if (productType) {
			$my.productTypeLength = productType.length-1;
			if (productType.length) {
				for (var i = 0,len = productType.length; i < len; i++) {
					switch(i){
						case 0:
							text = "报销一";
							break;
						case 1:
							text = "报销二";
							break;
						case 2:
							text = "报销三";
							break;
						default:
							break;
					}

					str += '<div id="appendChild" class="appendChild" data-index='+i+'>';
					str += '<p class="titleMessage">'+text+'</p>';
					str += '<div class="container-fluid myContainer inputFile">';
					str += '<div class="row my-row">';
					str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col">';
					str += '<span>报销类型</span>';
					str += '</div>';
					str += '<div class="col-xs-9 col-sm-9 col-md-9 my-col">';
					str += '<input type="text" class="product" data-productid='+productType[i].producttypeID+' value='+productType[i].productTypeName+' readonly="readonly" data-toggle="modal" data-target="#myModal" placeholder="请输入">';
					str += '</div>';
					str += '</div>';
					str += '<div class="row my-row">';
					str += '<div class="col-xs-4 col-sm-4 col-md-4 my-col">';
					str += '<span>报销金额(￥)</span>';
					str += '</div>';
					str += '<div class="col-xs-8 col-sm-8 col-md-8 my-col">';
					str += '<input type="number" class="itemAlltotals" data-count='+productType[i].itemAlltotal+' value='+productType[i].itemAlltotal+' placeholder="请输入">';
					str += '</div>';
					str += '</div>';
					str += '<div class="row my-row special-row">';
					str += '<div class="col-xs-3 col-sm-3 col-md-3 my-col">';
					str += '<span>费用说明</span>';
					str += '<span class="limit">(150字)</span>';
					str += '</div>'; 
					str += '<div class="col-xs-9 col-sm-9 col-md-9 my-col">';
					str += '<textarea class="remarks" placeholder="请输入" maxlength="150">'+productType[i].remark+'</textarea>';
					str += '</div>';
					str += '</div>';
					str += '</div>';
					str += '</div>';
				};
				this.config.inWrap.innerHTML = str;
			};
		};
		
		if (expenseUser) {
			if (expenseUser.length) {
				for (var i = 0,len = expenseUser.length; i < len; i++) {
					approverStr += '<li class="nowrap addPeople deleteApprover" data-userid='+expenseUser[i].expenseUserID+' data-toggle="modal" data-target="#deleteApprover">'+expenseUser[i].expenseUserName+'</li>';
				};
				this.config.approverWrap.insertAdjacentHTML('afterBegin', approverStr);
			};
		};	

		if (imgArr) {
			imgArr = imgArr.split(",");
			imageNameArr = imageNameArr.split(",");

			if (imgArr.length) {
				for (var i = 0,len = imgArr.length; i < len; i++) {
					imgStr += '<li class="myImg" data-toggle="modal" data-target="#imgModal">';
					imgStr += '<img data-src='+imgArr[i]+' src='+imgArr[i]+'?imageView2/1/w/200/h/200 alt='+imageNameArr[i]+'>';
					imgStr += '</li>';
				};
				this.config.uploadWrap.insertAdjacentHTML('afterBegin', imgStr);
			};
		};	
		// sessionStorage.removeItem("productType");
		// sessionStorage.removeItem("expenseUser");
		// sessionStorage.removeItem("accountName");
		// sessionStorage.removeItem("accounNumber");
		// sessionStorage.removeItem("bankAccount");
		// sessionStorage.removeItem("expenseTotal");
		// sessionStorage.removeItem("imgArr");
		// sessionStorage.removeItem("imageNameArr");
	},
	getProductType: function(){ //获取报销类型
		var self = this;
		$.ajax({
		    url: getRoothPath+'/ddExpenses/userController/reviewType',
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
									str += '<li class="list-group-item" data-producttypeid='+dataArr[i].productTypeID+'>'+dataArr[i].productTypeName+'</li>';
								};

								self.config.productType.innerHTML = str;
								self.selectProductType();
							} else{
								$my.messageInfo.html("报销类型为空").fadeIn("fast").delay("1000").fadeOut("slow");
								return false;
							};

	                   	} else{
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
		        } else
		        {
		            $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow");
		            return false;
		        };
		    }
		})
	},
	selectProductType: function(){ //报销类型选择事件
		var self = this;
		var num = ""; //点击下标
		var productTypeList = this.config.productType.querySelectorAll("li");
		productTypeList = Array.prototype.slice.apply(productTypeList);

		$(self.config.inWrap).on('touchend',".product", function(event) {
			event.preventDefault();
			event.stopPropagation();

			num = parseInt($(this).parents("#appendChild")[0].dataset["index"]);
			$(myModal).modal("show");
		});
		
		for (var i = 0,len = productTypeList.length; i < len; i++) {			
			productTypeList[i].addEventListener("click", function(event){
				event.preventDefault();
				event.stopPropagation();

				var val = this.innerHTML;
				var productid = this.dataset["producttypeid"];

				var domArr = self.config.inWrap.querySelectorAll(".appendChild");
				Array.prototype.forEach.call(domArr,function(item,index){
					if (num === index) {
						item.querySelector(".product").value = val;
						item.querySelector(".product").dataset["productid"] = productid;
					};
				})

				$(myModal).modal("hide"); //手动关闭模态框
			}, false);
		};
	},
	addEvents: function(){ //添加报销
		if($my.productTypeLength === undefined){
			$my.productTypeLength = -1
		};

		var num = $my.productTypeLength;
		var str = "";
		var text = "";
		var self = this;

		self.config.addBtn.addEventListener("click", function(){
			num++;
			if (num > 2) {
				// alert("最多添加2个报销")
				$my.messageInfo.html("最多添加2个报销").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			} else{

				switch(num){
					case 0:
						text = "报销一";
						break;
					case 1:
						text = "报销二";
						break;
					case 2:
						text = "报销三";
						break;
					default:
						break;
				}
				str += '<div id="appendChild" class="appendChild" data-index='+num+'>';
				str += '<p class="titleMessage">'+text+'</p>';
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
	getCashierUser: function(){ //获取出纳人
		var self = this;
		$.ajax({
		    url: getRoothPath+'/ddExpenses/userController/cashierUser',
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
										str += '<li class="cashier text-center" data-cashierUserID='+dataArr[i].cashierUserID+'>';
										str += '<div class="wating text-center progressBar">出纳</div>';
										str += '<p class="name">'+dataArr[i].cashierUserName+'</p>';
										str += '</li>';
									};

									self.config.cashierWrap.innerHTML = str;
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
	},
	calcExpenseTotal: function(){ //计算总金额
		var self = this;
		var reg = /^\d+(\.\d+)?$/; //非负浮点数
		$(self.config.inWrap).on('keyup',".itemAlltotals", function(event) {
			var totalCount = 0;
			event.preventDefault();
			event.stopPropagation();
			
			if (this.value != "") {
				if (reg.test(this.value)) {

					if (parseFloat(this.value) <= 1000000) {					
						this.dataset["count"] = this.value;
					} else{
						$my.messageInfo.html("单个报销金额最大100万").fadeIn("fast").delay("1500").fadeOut("slow"); 
						this.value = "";
						this.dataset["count"] = 0;
						// return;
					};					
				} else{
					$my.messageInfo.html("请输入非负浮点数").fadeIn("fast").delay("1000").fadeOut("slow"); 
					return;
				};
			}else if(this.value == ""){
				this.dataset["count"] = 0;
			};	

			//计算总金额
			var itemAlltotalsList = $(this).parents("#inWrap")[0].querySelectorAll(".itemAlltotals");
			Array.prototype.forEach.call(itemAlltotalsList,function(item){
				totalCount += parseFloat(item.dataset["count"]);
			});

			self.config.expenseTotal.value = totalCount.toFixed(4);
		});
	},
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
	_renderDepart: function(info){ //渲染获取部门及联系人
		var str = "";
		var listUserArr = info.listUser;
		var listDepartArr = info.listDepart;

		if (listDepartArr.length) {
			for (var i = 0,len = listDepartArr.length; i < len; i++) {
				str += '<div class="row my-row" data-departID='+listDepartArr[i].departID+'>';
				str += '<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">';
				str += '<span class="departName">'+listDepartArr[i].departName+'</span>';
				str += '</div>';
				str += '<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">';
				str += '<p><i>'+listDepartArr[i].userCount+'</i>&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></p>';
				str += '</div>';
				str += '</div>';
			};
		};

		if (listUserArr.length) {
			for (var i = 0,len = listUserArr.length; i < len; i++) {
				str += '<div class="row my-row" data-departUserID='+listUserArr[i].departUserID+'>';
					str += '<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">';
						str += '<span class="departUserName">'+listUserArr[i].departUserName+'</span>';
					str += '</div>';
					str += '<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">';
						str += '<p><span class="glyphicon glyphicon-ok my-icon" aria-hidden="true"></span></p>';
					str += '</div>';
				str += '</div>';
			};
		};

		this.config.departmentWrap.innerHTML = str;
		this.switchStr = true;
	},
	getDepart: function(departmentID){ //获取部门及联系人
		var self = this;
		$.ajax({
		    url: getRoothPath+'/ddExpenses/userController/getDepartOrUser',
		    // async: false, //同步
		    data: {"departmentID": departmentID},
		    success:function(data){
		        console.log(data)
		        if (JSON.stringify(data) !== "{}") 
		        {
		            var status = data.status;

		            switch(status){
		                case "true":
	                   		var info = data.info;
	                   		
							if (JSON.stringify(info) !== "{}") {
								self._renderDepart(info)
							} else{
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
		        } else
		        {
		            $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow");
		            return false;
		        };
		    }
		})
	},
	asyncGetDepart: function(){ //异步加载部门及联系人&选择审批人
		var self = this;
		$(departmentWrap).on('click', '.row', function(event) {
			event.preventDefault();
			event.stopPropagation();

			var str = document.createElement("li");
			var departid = this.dataset["departid"];
			var departStr = '';

			if (this.querySelector(".departName")) {
				departStr = this.querySelector(".departName").innerHTML;

				str = '<li data-departmentID='+departid+'><a href="javascript:;">'+departStr+'</a></li>';
				self.getDepart(departid);

				$(self.config.breadcrumb).append(str);
			}else{ //选择审批人
				var departUserName = ""; //选择审批人名
				var userid = ""; //选择审批人id
				var approverStr = "";

				departUserName = this.querySelector(".departUserName").innerHTML;
				userid = this.dataset["departuserid"];

				var approverList = self.config.approverWrap.querySelectorAll("li");

				if (approverList.length >= 10) {
					$my.messageInfo.html("审批人最多添加9名").fadeIn("fast").delay("1000").fadeOut("slow");
					return;
				};

				Array.prototype.forEach.call(approverList,function(item){
					if (userid == item.dataset["userid"]) {
						$my.messageInfo.html("该审批人已在列表中").fadeIn("fast").delay("1000").fadeOut("slow");
						throw new Error("该审批人已在列表中");
					};
				});
				this.querySelector(".my-icon").classList.add("hasselect");
				approverStr = '<li class="nowrap addPeople" data-userid='+userid+'>'+departUserName+'</li>';
				self.config.approverWrap.insertAdjacentHTML('afterBegin', approverStr);
				slideout.close();
			};		

			var breadcrumbList = self.config.breadcrumb.querySelectorAll("li");
			breadcrumbList = Array.prototype.slice.call(breadcrumbList);
			breadcrumbList.pop();
			
			for (var i = 0,len = breadcrumbList.length; i < len; i++) {
				breadcrumbList[i].classList.add("active");
			};
		});
	},
	crumbsEvent: function(){ //面包屑点击事件
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
					breadcrumbList = breadcrumbList.slice(0, num+1);
					
					for (var i = 0,len = breadcrumbList.length; i < len; i++) {
						str += breadcrumbList[i].outerHTML;				
					};
					self.config.breadcrumb.innerHTML = str;
					self.getDepart(departmentid);
				};
			};			
		});
	},
	selectEpUser: function(){ //常用审批人点击事件
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
			Array.prototype.forEach.call(approverList,function(item){
				if (userid == item.dataset["userid"]) {
					$my.messageInfo.html("该审批人已在列表中").fadeIn("fast").delay("1000").fadeOut("slow");
					throw new Error("该审批人已在列表中");
				};
			});

			approverStr = '<li class="nowrap addPeople" data-userid='+userid+'>'+departUserName+'</li>';
			self.config.approverWrap.insertAdjacentHTML('afterBegin', approverStr);
			slideout.close();
		});
	},
	submitEvent: function(){ //提交保存事件
		var imageUrlArr = [],
			expenseTotal = approval.config.expenseTotal.value,
			bankAccount = approval.config.bankAccount.value,
			accountName = approval.config.accountName.value,
			accounNumber = approval.config.accounNumber.value,
			producttypeIDs = [],
			itemAlltotals = [],
			remarks = [],
			expensesUserID = [],
			cashierUserID = approval.config.cashierWrap.querySelector("li.cashier").dataset["cashieruserid"],
			producttypeDomArr = approval.config.inWrap.querySelectorAll(".product"),
			itemAlltotalDomArr = approval.config.inWrap.querySelectorAll(".itemAlltotals"),
			remarksDomArr = approval.config.inWrap.querySelectorAll(".remarks"),
			expensesUserDomArr = approval.config.approverWrap.querySelectorAll(".nowrap"),
			oldImgDomArr = approval.config.uploadWrap.querySelectorAll(".myImg"),
			oldImageUrlArr = [],
			oldImageNameArr = [];

		producttypeDomArr = Array.prototype.slice.apply(producttypeDomArr);
		itemAlltotalDomArr = Array.prototype.slice.apply(itemAlltotalDomArr);
		remarksDomArr = Array.prototype.slice.apply(remarksDomArr);
		oldImgDomArr = Array.prototype.slice.apply(oldImgDomArr);	

		Array.prototype.forEach.call(expensesUserDomArr,function(item){
			expensesUserID .push(item.dataset["userid"]);
		})

		for (var i = 0,len = oldImgDomArr.length; i < len; i++) {
			oldImageUrlArr.push(oldImgDomArr[i].querySelector("img").dataset["src"]);
			oldImageNameArr.push(oldImgDomArr[i].querySelector("img").getAttribute("alt"));
		};

		for (var i = 0,len = producttypeDomArr.length; i < len; i++) {
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

		if (approval.expenseImageUrl == "" && oldImgDomArr.length === 0) {
			$my.messageInfo.html("请完善报销凭证").fadeIn("fast").delay("1000").fadeOut("slow"); 
			return;
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

		for (var i = 0,len = approval.expenseImageUrl.length; i < len; i++) {//拼接图片域名
			imageUrlArr.push(clouddnImgStr+"/"+approval.expenseImageUrl[i]);
		};

		$.ajax({
		    url: getRoothPath+'/ddExpenses/expense/updata',
		    // async: false, //同步
		    data: {
		    	"expenseID": approval.detailid,
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
		    	"expenseImageUrl": imageUrlArr.concat(oldImageUrlArr).join(),
		    	"expenseImageName": approval.expenseImageName.concat(oldImageNameArr).join()
		    },
		    success:function(data){
		        console.log(data)
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
		                	$my.messageInfo.html("保存失败").fadeIn("fast").delay("1000").fadeOut("slow"); 
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

		+function(){ // 释放内存
			imageUrlArr = null;
			producttypeIDs = null;
			itemAlltotals = null;
			remarks = null;
			expensesUserID = null;
			oldImageUrlArr = null;
			oldImageNameArr = null;
		}();
	},
	addImage: function(){ //添加图片
		var self = this;

		self.config.uploadBtn.addEventListener("click", function(){ // 添加照片trigger
			$(myFile).trigger('click');
		}, false);

		//图片预览FileReader
		var handleImageFile = function(file) {
	        var img = document.createElement('img');
	        var li = document.createElement("li");
	        // li.setAttribute("data-toggle","modal");
	        // li.dataset.target = "#imgModal";
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

		self.config.myFile.addEventListener("change", function(e){
			e.stopPropagation();
			e.preventDefault();

			var formdata = new FormData();
			var files = this.files;

			if (files.length <= 9) {
				var hasSelectLength = self.config.uploadWrap.querySelectorAll("li");
				hasSelectLength = Array.prototype.slice.apply(hasSelectLength);

				if (files.length <= 10-hasSelectLength.length) {

					for(var i = 0,len = files.length; i < len; i++) {
					    var file = files[i];
					   var type = file.name.replace(/.+\./,"").toLowerCase();
					    
					    if (type !== "jpg" && type !== "jpeg" && type !== "png") {
					    	$my.messageInfo.html("请选择扩展名.jpg/.jpeg/.png图片").fadeIn("fast").delay("1500").fadeOut("slow"); 
					    	return;
					    };

					    if (file.size > 5*1024*1024) {
					    	$my.messageInfo.html("单张图片大小不可超过5M").fadeIn("fast").delay("1000").fadeOut("slow"); 
					    	return;
					    };
					    formdata.append('files', file);
					    handleImageFile(file);
					}

					if (files.length != 0) {
					    $.ajax({ 
					        url: 'http://www.ehaofangwang.com/publicshow/qiniuUtil/fileToQiniu',  
					        type: 'POST',  
					        data: formdata, 
					        timeout: "", 
					        dataType: "json",
					        // async: false,  
					        cache: false,  
					        contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
					        processData: false,  // 告诉jQuery不要去处理发送的数据
					        beforeSend: function(){
					        	$("#imgModalWrap").modal("show");
					        	$('#imgModalWrap').modal({backdrop: 'static', keyboard: false});
					        },
					        success: function (data) {  
					            console.log(data);
			        	        if (JSON.stringify(data) !== "{}") 
			        	        {
			        	            var status = data.statas;
			        	            var imageUrl = "";
			        	            var imageNmae = "";
			        	            switch(status){
			        	                case "true":
	            	                   		imageUrl = data.pathUrls.split(",");
	            	                   		imageNmae = data.fileNames.split(",");

	            	                   		Array.prototype.push.apply(self.expenseImageUrl,imageUrl);
	            	                   		Array.prototype.push.apply(self.expenseImageName,imageNmae);

			                           		$my.messageInfo.html(data.message).fadeIn("fast").delay("1000").fadeOut("slow"); 

			        	                	break;
			        	                case "false":
			        	                	$my.messageInfo.html("上传失败,请重新上传").fadeIn("fast").delay("1500").fadeOut("slow"); 
			        	                	formdata = null;
			        	                	imageUrl = [];
			        	                	imageNmae = [];
			        	                	$(self.config.uploadWrap).find('li.newUploadImg').remove();
			        	                	break;
			        	                default:
			        	                    break;
			        	            }           
			        	        } else
			        	        {
			        	            $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");
			        	            return;
			        	        };
					        },
					        complete: function(){
					        	$("#imgModalWrap").modal("hide");
					        },
					        error: function (returndata) {  
					        	$("#imgModalWrap").modal("hide");
					        	formdata = null;
					            $(self.config.uploadWrap).find('li.newUploadImg').remove(); 
					        }  
					    });
					};
				
				} else{
					$my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow"); 
					return;
				};
			} else{
				$my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow"); 
				return;
			};
			
		}, false);
	},
	deleteApprover: function(){ //删除审批人
		var self = this;
		var num = ""; //获取点击下标

		$(self.config.approverWrap).on('click', '.nowrap', function(event) {
			event.preventDefault();
			event.stopPropagation();

			num = $(this).index();
			$(self.config.deleteApproverWrap).modal("show"); //手动显示模态框
		});

		self.config.cancleBtn.addEventListener("touchend", function(){
			$(self.config.deleteApproverWrap).modal("hide"); //手动关闭模态框
		}, false);

		self.config.confirmBtn.addEventListener("touchend", function(){
			var approverList = self.config.approverWrap.querySelectorAll(".nowrap");
			[].forEach.call(approverList, function(item,index){
				if (num == index) {
					item.parentNode.removeChild(item);
				};
			});

			$(self.config.deleteApproverWrap).modal("hide"); //手动关闭模态框
		}, false);
	},
	deleteOldImg: function(){ //删除旧图片
		var self = this;
		var num = ""; //获取点击下标

		$(self.config.uploadWrap).on('click', '.myImg', function(event) {
			event.preventDefault();
			event.stopPropagation();

			var newUploadImgList = self.config.uploadWrap.querySelectorAll(".newUploadImg");
			
			num = $(this).index() - newUploadImgList.length;
			$(self.config.imgModal).modal("show"); //手动显示模态框
		});

		self.config.cancleBtn_img.addEventListener("touchend", function(){
			$(self.config.imgModal).modal("hide"); //手动关闭模态框
		}, false);

		self.config.confirmBtn_img.addEventListener("touchend", function(){
			var imgList = self.config.uploadWrap.querySelectorAll(".myImg");
			[].forEach.call(imgList, function(item,index){
				if (num == index) {
					item.parentNode.removeChild(item);
				};
			});

			$(self.config.imgModal).modal("hide"); //手动关闭模态框
		}, false);
	},
	deleteNewImg: function(){ //删除新图片
		var self = this;
		$(self.config.uploadWrap).on('click', 'li.newUploadImg', function(event) {
			event.preventDefault();
			event.stopPropagation();

			var nowIndex = $(this).index();
			var fileName = $(this).children('img').attr("alt");
			var imgName = fileName.substring(0,fileName.lastIndexOf(".")); //获取点击删除图片的文件名(不包含后缀名)

			for (var i = 0,len = self.expenseImageName.length; i < len; i++) {
				if (self.expenseImageName[i] === imgName) {
					console.log(self.expenseImageName[i]);
					self.expenseImageName.splice(i, 1);
					deleteUrl(i);
				};
			};

			function deleteUrl(i){
				return function(){
					self.expenseImageUrl.splice(i, 1);
				}(i);
			};

			$(this).remove();
		});
	},
	init: function(){ //init封装
		this.getSessionData(); //获取session数据
		this.getDetailed(); //获取详情id
		this.getProductType(); //获取报销类型
		this.getCashierUser(); //获取出纳人
		this.addEvents(); //添加报销事件
		this.calcExpenseTotal(); //计算总金额
		this.getDepart(0); // 默认获取部门及联系人
		this.asyncGetDepart(); //异步加载部门及联系人
		this.getEpUser($my.userID); //获取常用审批人
		this.crumbsEvent(); //面包屑点击事件
		this.selectEpUser(); //常用审批人点击事件
		this.addImage(); //添加图片
		this.deleteApprover(); //删除审批人
		this.deleteOldImg(); //删除旧图片
		this.deleteNewImg(); //删除新图片
	}
}

var approval = new Approval();


$(function() {
	window.$my = {
	    messageInfo: $(".messageInfo"),
	    userID: sessionStorage.getItem("ddUserID"),
	}

	approval.init(); //调用init

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

	// open slideout
	var addApprover = document.querySelector("#addApprover");
	addApprover.addEventListener("click", function(event){
		event.preventDefault();
		event.stopPropagation();

		slideout.open();		
	}, false);

	// close slideout
	var closeBtn = document.querySelector("#closeBtn");
	closeBtn.addEventListener("touchend",function(event){
		event.preventDefault();
		event.stopPropagation();

		slideout.close();	
	},false);

	 //提交保存事件
	var submitBtn = document.querySelector("#submitBtn");
	submitBtn.addEventListener("click", function(event){
		event.preventDefault();
		event.stopPropagation();

		approval.throttle(approval.submitEvent, this);
	}, false);

});

	