function TransExpense(){this.switchStr=!0,this.expenseReviewID="",this.transUserID="",this.config={breadcrumb:document.querySelector("#breadcrumb"),departmentWrap:document.querySelector("#departmentWrap"),searchApprovalInput:document.querySelector("#searchApprovalInput"),imgModal:document.querySelector("#imgModal"),confirmBtn:document.querySelector("#confirmBtn"),cancleBtn:document.querySelector("#cancleBtn")}}TransExpense.prototype={constructor:TransExpense,throttle:function(e,t){var a=null;return function(){var r=this,n=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(r,n)},t)}},_renderDepartSP:function(e){var t="",a=e.listUser,r=e.listDepart;if(r.length)for(var n=0,s=r.length;n<s;n++)t+='<div class="row my-row" data-departID='+r[n].departID+">",t+='<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">',t+='<span class="departName">'+r[n].departName+"</span>",t+="</div>",t+='<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">',t+="<p><i>"+r[n].userCount+'</i>&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></p>',t+="</div>",t+="</div>";if(a.length)for(var n=0,s=a.length;n<s;n++)t+='<div class="row my-row" data-departUserID='+a[n].departUserID+">",t+='<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">',t+='<span class="departUserName">'+a[n].departUserName+"</span>",t+="</div>",t+='<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">',t+="<p></p>",t+="</div>",t+="</div>";this.config.departmentWrap.innerHTML=t,this.switchStr=!0},getArg:function(){var e=window.location.href;if(-1==e.indexOf("expenseReviewID"))throw $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow"),new Error("url错误");this.expenseReviewID=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t);return null!=a?unescape(a[2]):null}("expenseReviewID")},getDepart:function(e){var t=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/getDepartOrUser.do",data:{departmentID:e},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var a=e.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");t._renderDepartSP(a);break;case"failure":$my.messageInfo.html("部门及人员获取错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},crumbsEvent:function(){var e=this;$(breadcrumb).on("click","li",function(t){if(t.preventDefault(),t.stopPropagation(),e.switchStr&&this.classList.contains("active")){this.classList.remove("active"),e.switchStr=!1;var a="",r=this.dataset.departmentid,n=$(this).index(),s=this.parentNode.querySelectorAll("li");s=Array.prototype.slice.apply(s),s=s.slice(0,n+1);for(var i=0,o=s.length;i<o;i++)a+=s[i].outerHTML;e.config.breadcrumb.innerHTML=a,e.getDepart(r)}})},asyncGetDepart:function(){var e=this;$(e.config.departmentWrap).on("click",".row",function(t){t.preventDefault(),t.stopPropagation();var a=document.createElement("li"),r=this.dataset.departid,n="";if(this.querySelector(".departName"))n=this.querySelector(".departName").innerHTML,a="<li data-departmentID="+r+'><a href="javascript:;">'+n+"</a></li>",e.getDepart(r),$(e.config.breadcrumb).append(a);else{var s="",i="";i=this.dataset.departuserid,s=this.querySelector(".departUserName").innerHTML,s.indexOf("-")>=0&&(s=s.substring(0,s.indexOf("-"))),e.transUserID=i,$(e.config.imgModal).modal("show")}var o=e.config.breadcrumb.querySelectorAll("li");o=Array.prototype.slice.call(o),o.pop();for(var c=0,l=o.length;c<l;c++)o[c].classList.add("active")})},searchApprovalEvent:function(){var e=this,t=!0,a=function(){var a=this.value.trim();t&&(a?$.post(getRoothPath+"/ddExpenses/userController/userLike.do",{name:a},function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var r=a.data;if(!r.length)return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");for(var n="",s=0,i=r.length;s<i;s++)n+='<div class="row my-row" data-departuserid='+r[s].id+">",n+='<div class="col-xs-12 col-sm-12 col-md-12 my-col nowrap">',n+='<span class="departUserName">'+r[s].userName+"-"+r[s].departName+"</span>",n+="</div>",n+="</div>";e.config.departmentWrap.innerHTML=n;break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}):e.getDepart(0))};e.config.searchApprovalInput.addEventListener("compositionstart",function(){t=!1}),e.config.searchApprovalInput.addEventListener("compositionend",function(){t=!0}),e.config.searchApprovalInput.addEventListener("input",e.throttle(a,1e3),!1)},transEvent:function(){var e=this;e.config.confirmBtn.addEventListener("click",function(t){if(t.stopPropagation(),t.preventDefault(),!e.transUserID)return void $my.messageInfo.html("移交人ID获取异常").fadeIn("fast").delay("1000").fadeOut("slow");$.ajax({url:getRoothPath+"/ddExpenses/review/transExpense.do",data:{expenseReviewID:e.expenseReviewID,userID:$my.userID,transUserID:e.transUserID},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case 1:$my.messageInfo.html("移交成功").fadeIn("fast").delay("1000").fadeOut("slow"),setTimeout(function(){window.location.href="index.html"},1300);break;case 0:$my.messageInfo.html("移交失败").fadeIn("fast").delay("1000").fadeOut("slow")}}})}),e.config.cancleBtn.addEventListener("click",function(t){t.stopPropagation(),t.preventDefault(),$(e.config.imgModal).modal("hide")})},init:function(){this.getArg(),this.getDepart(0),this.asyncGetDepart(),this.searchApprovalEvent(),this.crumbsEvent(),this.transEvent()}};var transExpense=new TransExpense;$(function(){window.$my={messageInfo:$(".messageInfo"),userID:sessionStorage.getItem("ddUserID")},transExpense.init()});