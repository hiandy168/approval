/*
 * @Author: Administrator
 * @Date:   2017-06-08 10:24:12
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-07-28 11:36:42
 */

'use strict';

function Approval() {
	this.expenseID = ""; //报销id
	this.expenseReviewID = ""; //审核明细id
	this.flag = true; //防重提交标志位
	this.expenseImageUrl = []; //报销凭证url
	this.expenseImageName = []; //报销凭证name

	this.config = {
		passedBtn: document.querySelector("#passedBtn"),
		inputContent: document.querySelector("#inputContent"),
		uploadBtn: document.querySelector("#uploadBtn"),
		myFile: document.querySelector("#myFile"),
		uploadWrap: document.querySelector("#uploadWrap")
	}
}

Approval.prototype = {
	constructor: Approval,
	throttle: function(method, context) { //点击节流
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
		}, 1000);
	},
	getUrlArguments: function() {
		var url = window.location.href;
		var getParam = function(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		}

		if (url.indexOf("expenseID") != -1 && url.indexOf("expenseReviewID") != -1) {
			this.expenseID = getParam("expenseID");
			this.expenseReviewID = getParam("expenseReviewID");
		} else {
			$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			throw new Error("url错误");
		};
	},
	_passedFn: function() {
		if (approval.flag) {
			var imageUrlArr = [];
			var reviewType = approval.config.passedBtn.dataset["reviewtype"];
			var expenselog = approval.config.inputContent.value;

			if (approval.expenseImageUrl.length !== 0) {
				for (var i = 0, len = approval.expenseImageUrl.length; i < len; i++) { //拼接图片域名
					imageUrlArr.push(clouddnImgStr + "/" + approval.expenseImageUrl[i]);
				};
			};

			if (expenselog != "") {
				$.ajax({
					url: getRoothPath + '/ddExpenses/review/updataExpenseReview.do',
					data: {
						"expenseID": approval.expenseID,
						"expenseReviewID": approval.expenseReviewID,
						"reviewType": reviewType,
						"expenselog": expenselog,
						"expenseImageUrl": imageUrlArr.join(),
						"expenseImageName": approval.expenseImageName.join()
					},
					beforeSend: function() {
						approval.flag = false;
					},
					success: function(data) {
						console.log(data);
						if (JSON.stringify(data) !== "{}") {
							var status = data.status;

							switch (status) {
								case 1:
									var timer = null;
									$my.messageInfo.html(data.msg).fadeIn("fast").delay("1000").fadeOut("slow");

									clearTimeout(timer);
									timer = setTimeout(function() {
										// window.location.href = "index.html";
									}, 1200);
									break;
								case 0:
									approval.flag = true;
									$my.messageInfo.html("提交失败").fadeIn("fast").delay("1500").fadeOut("slow");
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
				approval.flag = true;
				$my.messageInfo.html("请输入审批内容").fadeIn("fast").delay("1500").fadeOut("slow");
				return;
			};
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
							url: 'http://www.ehaofangwang.com/publicshow/qiniuUtil/fileToQiniu.do',
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
	submitEvent: function() {
		var self = this;
		self.config.passedBtn.addEventListener("click", function(event) {
			event.preventDefault();
			event.stopPropagation();

			self.throttle(self._passedFn, this);
		}, false);
	},
	init: function() {
		this.getUrlArguments();
		this.submitEvent();
		this.addImage();
		this.deleteImg();
	}
}

var approval = new Approval();

$(function() {
	window.$my = {
		messageInfo: $(".messageInfo")
	}

	approval.init();

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
});