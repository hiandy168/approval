function Approval(){this.expenseID="",this.flag=!0,this.expenseImageUrl=[],this.expenseImageName=[],this.userID=sessionStorage.getItem("ddUserID"),this.config={passedBtn:document.querySelector("#passedBtn"),inputContent:document.querySelector("#inputContent"),uploadBtn:document.querySelector("#uploadBtn"),myFile:document.querySelector("#myFile"),uploadWrap:document.querySelector("#uploadWrap")}}Approval.prototype={constructor:Approval,throttle:function(e,a){clearTimeout(e.tId),e.tId=setTimeout(function(){e.call(a)},1e3)},getUrlArguments:function(){var e=window.location.href;if(-1==e.indexOf("expenseID"))throw $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow"),new Error("url错误");this.expenseID=function(e){var a=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),t=window.location.search.substr(1).match(a);return null!=t?unescape(t[2]):null}("expenseID")},_passedFn:function(){if(approval.flag){var e=[],a=approval.config.inputContent.value;if(0!==approval.expenseImageUrl.length)for(var t=0,n=approval.expenseImageUrl.length;t<n;t++)e.push(clouddnImgStr+"/"+approval.expenseImageUrl[t]);if(""==a)return approval.flag=!0,void $my.messageInfo.html("请输入审批内容").fadeIn("fast").delay("1500").fadeOut("slow");$.ajax({url:getRoothPath+"/ddExpenses/review/comment.do",data:{expenseID:approval.expenseID,userID:approval.userID,expenselog:a,expenseImageUrl:e.join(),expenseImageName:approval.expenseImageName.join()},beforeSend:function(){approval.flag=!1},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case 1:var a=null;$my.messageInfo.html(e.msg).fadeIn("fast").delay("1000").fadeOut("slow"),clearTimeout(a),a=setTimeout(function(){window.location.href="index.html"},1200);break;case 0:approval.flag=!0,$my.messageInfo.html("提交失败").fadeIn("fast").delay("1500").fadeOut("slow")}}})}},addImage:function(){var e=this;e.config.uploadBtn.addEventListener("click",function(){$(myFile).trigger("click")},!1);var a=function(a){var t=document.createElement("img"),n=document.createElement("li");n.classList.add("newUploadImg"),t.setAttribute("alt",a.name),t.file=a,n.appendChild(t),$(e.config.uploadWrap).prepend(n);var o=new FileReader;o.onload=function(e){return function(a){e.src=a.target.result}}(t),o.readAsDataURL(a)};e.config.myFile.addEventListener("change",function(t){t.stopPropagation(),t.preventDefault();var n=new FormData,o=this.files;if(!(o.length<=9))return void $my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow");var s=e.config.uploadWrap.querySelectorAll("li");if(s=Array.prototype.slice.apply(s),!(o.length<=10-s.length))return void $my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow");for(var l=0,i=o.length;l<i;l++){var r=o[l],p=r.name.replace(/.+\./,"").toLowerCase();if("jpg"!==p&&"jpeg"!==p&&"png"!==p)return void $my.messageInfo.html("请选择扩展名.jpg/.jpeg/.png图片").fadeIn("fast").delay("1500").fadeOut("slow");if(r.size>5242880)return void $my.messageInfo.html("单张图片大小不可超过5M").fadeIn("fast").delay("1000").fadeOut("slow");n.append("files",r),a(r)}0!=o.length&&$.ajax({url:"http://www.ehaofangwang.com/publicshow/qiniuUtil/fileToQiniu.do",type:"POST",data:n,timeout:"",dataType:"json",cache:!1,contentType:!1,processData:!1,beforeSend:function(){$("#imgModalWrap").modal("show"),$("#imgModalWrap").modal({backdrop:"static",keyboard:!1}),$("#imgModalWrap").on("touchmove",function(e){e.preventDefault(),e.stopPropagation()})},success:function(a){if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var t=a.statas,o="",s="";switch(t){case"true":o=a.pathUrls.split(","),s=a.fileNames.split(","),Array.prototype.unshift.apply(e.expenseImageUrl,o),Array.prototype.unshift.apply(e.expenseImageName,s),$my.messageInfo.html(a.message).fadeIn("fast").delay("1000").fadeOut("slow");break;case"false":$my.messageInfo.html("上传失败,请重新上传").fadeIn("fast").delay("2000").fadeOut("slow"),n=null,o=[],s=[],$(e.config.uploadWrap).find("li.newUploadImg").remove()}},complete:function(){$("#imgModalWrap").modal("hide")},error:function(a){$("#imgModalWrap").modal("hide"),n=null,$(e.config.uploadWrap).find("li.newUploadImg").remove()}})},!1)},deleteImg:function(){var e=this;$(e.config.uploadWrap).on("click","li.newUploadImg",function(a){a.preventDefault(),a.stopPropagation();for(var t=($(this).index(),$(this).children("img").attr("alt")),n=t.substring(0,t.lastIndexOf(".")),o=0,s=e.expenseImageName.length;o<s;o++)e.expenseImageName[o]===n&&(e.expenseImageName.splice(o,1),function(a){(function(){e.expenseImageUrl.splice(a,1)})()}(o));$(this).remove()})},submitEvent:function(){var e=this;e.config.passedBtn.addEventListener("click",function(a){if(a.preventDefault(),a.stopPropagation(),!e.userID)return void $my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1500").fadeOut("slow");e.throttle(e._passedFn,this)},!1)},init:function(){this.getUrlArguments(),this.submitEvent(),this.addImage(),this.deleteImg()}};var approval=new Approval;$(function(){window.$my={messageInfo:$(".messageInfo")},approval.init(),$("#imgModalWrap").on("show.bs.modal",function(){var e=$(this),a=e.find(".modal-dialog");e.css("display","block"),a.css({"margin-top":Math.max(0,($(window).height()-a.height())/2)})})});