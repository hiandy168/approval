function Approval(){this.expenseLog=[],this.expenseUser=[],this.departName="",this.departmentID="",this.accountName="",this.accounNumber="",this.bankAccount="",this.expenseTotal="",this.imgArr=[],this.imageNameArr=[],this.productType=[],this.cashier={},this.jobNum="",this.config={expenseLogWrap:document.querySelector("#expenseLogWrap"),expenseUserWrap:document.querySelector("#expenseUserWrap"),uploadWrap:document.querySelector("#uploadWrap"),productTypeWrap:document.querySelector("#productTypeWrap"),accountName:document.querySelector("#accountName"),accounNumber:document.querySelector("#accounNumber"),bankAccount:document.querySelector("#bankAccount"),expenseTotal:document.querySelector("#expenseTotal"),cashier:document.querySelector("#cashier"),departName:document.querySelector("#departName"),jobNum:document.querySelector("#jobNum")}}Approval.prototype={constructor:Approval,getDetailid:function(){var e=window.location.href;if(-1==e.indexOf("detailid")||-1==e.indexOf("status"))throw $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow"),new Error("url错误");var s=window.location.search,t=window.location.hash;s=s.split("=")[1],t=t.split("=")[1],$my.detailid=s,$my.status=t},getData:function(){var e=this;$.ajax({url:getRoothPath+"/ddExpenses/expenseInfo/expenseDetail.do",data:{id:$my.detailid},success:function(s){if("{}"===JSON.stringify(s))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(s.status){case"true":var t=s.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var a=t.expenseInfo;a.length?(e.accountName=a[0].accountName,e.accounNumber=a[0].accounNumber,e.bankAccount=a[0].bankAccount,e.expenseTotal=a[0].expenseTotal,e.departName=a[0].departName,e.departmentID=a[0].departmentID,e.jobNum=a[0].loginName,null!=a[0].imageUrl&&"null"!=a[0].imageUrl&&(e.imgArr=a[0].imageUrl.split(",")),null!=a[0].imageName&&"null"!=a[0].imageName&&(e.imageNameArr=a[0].imageName.split(","))):$my.messageInfo.html("收款信息为空").fadeIn("fast").delay("1500").fadeOut("slow"),e.expenseLog=t.expenseLog,e.expenseUser=t.expenseUser;var n=t.expenseUser;e.productType=t.productType,e._renderExpenseLog(),e._renderExpenseUser(),e._bindDom(),e._renderImg(),e._renderProductType(),e.cashier=n.pop(),e._renderCashier(),"2"===$my.status&&(sessionStorage.setItem("productType",JSON.stringify(t.productType)),sessionStorage.setItem("expenseUser",JSON.stringify(t.expenseUser)),sessionStorage.setItem("departName",e.departName),sessionStorage.setItem("departmentID",e.departmentID),sessionStorage.setItem("accountName",e.accountName),sessionStorage.setItem("accounNumber",e.accounNumber),sessionStorage.setItem("bankAccount",e.bankAccount),sessionStorage.setItem("jobNum",e.jobNum),sessionStorage.setItem("expenseTotal",e.expenseTotal),sessionStorage.setItem("imgArr",e.imgArr),sessionStorage.setItem("imageNameArr",e.imageNameArr));break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},_renderExpenseLog:function(){if(this.expenseLog.length){for(var e="",s=0,t=this.expenseLog.length;s<t;s++){var a="",n=null,r=null,i=this.expenseLog[s].creatTime;if(i=i.substring(5),this.expenseLog[s].url&&(n=this.expenseLog[s].url.split(","),r=this.expenseLog[s].fileName.split(","),null!=n&&n.length))for(var o=0,c=n.length;o<c;o++)a+='<li class="logimg"><img data-src='+n[o]+" src="+n[o]+"?imageView2/1/w/200/h/200 alt="+r[o]+"></li>";e+='<div class="row my-row">',e+='<div class="col-xs-8 col-sm-8 col-md-8">',e+='<p class="nowrap">',e+='<span class="commentName">'+this.expenseLog[s].expenseName+'</span>:&nbsp;&nbsp;<span class="commentContent">'+this.expenseLog[s].expenselog+"</span>",e+="</p>",e+="</div>",e+='<div class="col-xs-4 col-sm-4 col-md-4 text-right nowrap time">',e+="<span>"+i+"</span>",e+="</div>",e+='<div class="col-xs-12 col-sm-12 col-md-12">',e+='<ul class="imgContent clearfix">',e+=a,e+="</ul>",e+="</div>",e+="</div>"}this.config.expenseLogWrap.innerHTML=e}else this.config.expenseLogWrap.innerHTML="<p style='padding-left:0.3rem; margin-bottom:0.3rem; font-weight: normal'>暂无评论信息</p>"},_renderExpenseUser:function(){if(this.expenseUser.length){for(var e="",s="",t="",a="",n=0,r=this.expenseUser.length-1;n<r;n++){switch(this.expenseUser[n].reviewState){case 0:s='<li class="text-center refused" data-expenseuserid='+this.expenseUser[n].expenseUserID+">",a='<p class="time">'+this.expenseUser[n].expenseTime.substring(0,10)+"</p>",t='<div class="wating text-center progressBar special_progressBar"><span class="iconfont icon-ttpodicon my-icon"></span></div>';break;case 1:s='<li class="text-center" data-expenseuserid='+this.expenseUser[n].expenseUserID+">",a='<p class="time">&nbsp;</p>',t='<div class="wating text-center progressBar">等待</div>';break;case 2:s='<li class="text-center passed" data-expenseuserid='+this.expenseUser[n].expenseUserID+">",a='<p class="time">'+this.expenseUser[n].expenseTime.substring(0,10)+"</p>",t='<div class="wating text-center progressBar special_progressBar"><span class="iconfont icon-tongguo my-icon"></span></div>'}e+=""+s,e+=""+a,e+=""+t,e+='<p class="name">'+this.expenseUser[n].expenseUserName+"</p>"}this.config.expenseUserWrap.innerHTML=e}else{var e="";e+='<span style="font-weight:normal">暂无审批信息</span>',this.config.expenseUserWrap.innerHTML=e}},_renderCashier:function(){if("{}"!==JSON.stringify(this.cashier)&&void 0!==this.cashier){var e="";switch(this.cashier.reviewState){case 0:e+="<li class='cashier text-center refused' data-expenseuserid="+this.cashier.expenseUserID+">",e+="<p class='time'>"+this.cashier.expenseTime+"&nbsp;</p>",e+="<div class='wating text-center progressBar'><span class='iconfont icon-ttpodicon my-icon'></span></div>";break;case 1:e+="<li class='cashier text-center' data-expenseuserid="+this.cashier.expenseUserID+">",e+="<p class='time'>&nbsp;</p>",e+="<div class='wating text-center progressBar'>出纳</div>";break;case 2:e+="<li class='cashier text-center passed' data-expenseuserid="+this.cashier.expenseUserID+">",e+="<p class='time'>"+this.cashier.expenseTime+"&nbsp;</p>",e+="<div class='wating text-center progressBar'><span class='iconfont icon-tongguo my-icon'></span></div>";break;default:e+="<li class='cashier text-center' data-expenseuserid="+this.cashier.expenseUserID+">",e+="<p class='time'>&nbsp;</p>",e+="<div class='wating text-center progressBar'>出纳</div>"}e+="<p class='name'>"+this.cashier.expenseUserName+"</p>",e+="</li>",this.config.cashier.innerHTML=e}else this.config.cashier.innerHTML="<span style='font-weight:normal'>暂无出纳人信息</span>"},_bindDom:function(){this.config.accountName.value=this.accountName,this.config.accounNumber.value=this.accounNumber,this.config.bankAccount.value=this.bankAccount,this.config.expenseTotal.value=this.expenseTotal,this.config.departName.value=this.departName,this.config.jobNum.value=this.jobNum,this.config.departName.dataset.departmentid=this.departmentID},_renderImg:function(){var e="";if(this.imgArr.length){for(var s=0,t=this.imgArr.length;s<t;s++)e+='<li class="responseImg">',e+="<img data-src="+this.imgArr[s]+" src="+this.imgArr[s]+"?imageView2/1/w/200/h/200 alt="+this.imageNameArr[s]+">",e+="</li>";this.config.uploadWrap.innerHTML=e}else e+='<span style="font-weight: normal">暂无报销凭证信息</span>',this.config.uploadWrap.innerHTML=e},_renderProductType:function(){if(this.productType.length){for(var e="",s="",t=0,a=this.productType.length;t<a;t++){switch(t){case 0:s="报销一";break;case 1:s="报销二";break;case 2:s="报销三"}e+='<div class="appendChild">',e+='<p class="titleMessage clearfix">',e+='<span class="pull-left">'+s+"</span>",e+="",e+="</p>",e+='<div class="container-fluid myContainer inputFile">',e+='<div class="row my-row">',e+='<div class="col-xs-3 col-sm-3 col-md-3 my-col">',e+="<span>报销类型</span>",e+="</div>",e+='<div class="col-xs-9 col-sm-9 col-md-9 my-col lighter">',e+='<input type="text" readonly="readonly" value='+this.productType[t].productTypeName+">",e+="</div>",e+="</div>",e+='<div class="row my-row">',e+='<div class="col-xs-4 col-sm-4 col-md-4 my-col">',e+="<span>报销金额(￥)</span>",e+="</div>",e+='<div class="col-xs-8 col-sm-8 col-md-8 my-col redColor lighter">',e+='<input type="text" readonly="readonly" value='+this.productType[t].itemAlltotal+">",e+="</div>",e+="</div>",e+='<div class="row my-row special-row">',e+='<div class="col-xs-3 col-sm-3 col-md-3 my-col">',e+="<span>费用说明</span>",e+="</div>",e+='<div class="col-xs-9 col-sm-9 col-md-9 my-col lighter">',e+='<textarea readonly="readonly">'+this.productType[t].remark+"</textarea>",e+="</div></div></div></div>"}this.config.productTypeWrap.innerHTML=e}else{var e="";e+='<div class="appendChild">',e+='<p class="titleMessage clearfix">',e+='<span class="pull-left" style="font-weight:normal; font-size:.32rem">暂无报销类型数据</span>',e+="",e+="</p>",this.config.productTypeWrap.innerHTML=e}},viewLargeImg:function(){var e=this,s=[];(function(s){return new Promise(function(t,a){setTimeout(function(){t(e.config.uploadWrap.querySelectorAll("li"))},s)})})(1500).then(function(e){[].forEach.call(e,function(e,t){s.push(e.querySelector("img").dataset.src),e.addEventListener("click",function(e){e.stopPropagation(),e.preventDefault(),s=JSON.stringify(s),sessionStorage.setItem("urlList",s),window.location.href="zoomImg.html?index="+t},!1)})}).catch(function(e){$my.messageInfo.html(e).fadeIn("fast").delay("1000").fadeOut("slow")})},logLargeImg:function(){(function(e){return new Promise(function(s,t){setTimeout(function(){s(document.querySelectorAll(".imgContent"))},e)})})(1500).then(function(e){Array.prototype.forEach.call(e,function(e,s){var t=null;t=e.querySelectorAll("li"),Array.prototype.forEach.call(t,function(e,s){e.addEventListener("click",function(e){e.stopPropagation(),e.preventDefault();for(var t=[],a=Array.prototype.slice.call(this.parentNode.querySelectorAll("img")),n=0,r=a.length;n<r;n++){var i="";i=a[n].dataset.src,t.push(i)}t=JSON.stringify(t),sessionStorage.setItem("urlList",t),window.location.href="zoomImg.html?index="+s})})})}).catch(function(e){$my.messageInfo.html(error).fadeIn("fast").delay("1000").fadeOut("slow")})}};var approval=new Approval;$(function(){window.$my={messageInfo:$(".messageInfo")};var e=document.querySelector("footer");if(approval.getDetailid(),"2"===$my.status){e.querySelector(".refusedBtn").classList.remove("hide")}approval.getData(),approval.viewLargeImg(),approval.logLargeImg(),e.querySelector("#editBtn").addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),window.location.href="edit.html?detailid="+$my.detailid},!1)});