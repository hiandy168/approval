function TransExpense(){this.switchStr=!0,this.config={breadcrumb:document.querySelector("#breadcrumb"),departmentWrap:document.querySelector("#departmentWrap"),searchApprovalInput:document.querySelector("#searchApprovalInput"),imgModal:document.querySelector("#imgModal")}}TransExpense.prototype={constructor:TransExpense,throttle:function(e,t){var a=null;return function(){var r=this,s=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(r,s)},t)}},_renderDepartSP:function(e){var t="",a=e.listUser,r=e.listDepart;if(r.length)for(var s=0,n=r.length;s<n;s++)t+='<div class="row my-row" data-departID='+r[s].departID+">",t+='<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">',t+='<span class="departName">'+r[s].departName+"</span>",t+="</div>",t+='<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">',t+="<p><i>"+r[s].userCount+'</i>&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></p>',t+="</div>",t+="</div>";if(a.length)for(var s=0,n=a.length;s<n;s++)t+='<div class="row my-row" data-departUserID='+a[s].departUserID+">",t+='<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">',t+='<span class="departUserName">'+a[s].departUserName+"</span>",t+="</div>",t+='<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">',t+="<p></p>",t+="</div>",t+="</div>";this.config.departmentWrap.innerHTML=t,this.switchStr=!0},getDepart:function(e){var t=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/getDepartOrUser.do",data:{departmentID:e},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var a=e.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");t._renderDepartSP(a);break;case"failure":$my.messageInfo.html("部门及人员获取错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},crumbsEvent:function(){var e=this;$(breadcrumb).on("click","li",function(t){if(t.preventDefault(),t.stopPropagation(),e.switchStr&&this.classList.contains("active")){this.classList.remove("active"),e.switchStr=!1;var a="",r=this.dataset.departmentid,s=$(this).index(),n=this.parentNode.querySelectorAll("li");n=Array.prototype.slice.apply(n),n=n.slice(0,s+1);for(var i=0,o=n.length;i<o;i++)a+=n[i].outerHTML;e.config.breadcrumb.innerHTML=a,e.getDepart(r)}})},asyncGetDepart:function(){var e=this;$(e.config.departmentWrap).on("click",".row",function(t){t.preventDefault(),t.stopPropagation();var a=document.createElement("li"),r=this.dataset.departid,s="";if(this.querySelector(".departName"))s=this.querySelector(".departName").innerHTML,a="<li data-departmentID="+r+'><a href="javascript:;">'+s+"</a></li>",e.getDepart(r),$(e.config.breadcrumb).append(a);else{var n="";this.dataset.departuserid,n=this.querySelector(".departUserName").innerHTML,n.indexOf("-")>=0&&(n=n.substring(0,n.indexOf("-"))),$(e.config.imgModal).modal("show")}var i=e.config.breadcrumb.querySelectorAll("li");i=Array.prototype.slice.call(i),i.pop();for(var o=0,c=i.length;o<c;o++)i[o].classList.add("active")})},searchApprovalEvent:function(){var e=this,t=!0,a=function(){var a=this.value.trim();t&&(a?$.post(getRoothPath+"/ddExpenses/userController/userLike.do",{name:a},function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var r=a.data;if(!r.length)return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");for(var s="",n=0,i=r.length;n<i;n++)s+='<div class="row my-row" data-departuserid='+r[n].id+">",s+='<div class="col-xs-12 col-sm-12 col-md-12 my-col nowrap">',s+='<span class="departUserName">'+r[n].userName+"-"+r[n].departName+"</span>",s+="</div>",s+="</div>";e.config.departmentWrap.innerHTML=s;break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}):e.getDepart(0))};e.config.searchApprovalInput.addEventListener("compositionstart",function(){t=!1}),e.config.searchApprovalInput.addEventListener("compositionend",function(){t=!0}),e.config.searchApprovalInput.addEventListener("input",e.throttle(a,1e3),!1)},init:function(){this.getDepart(0),this.asyncGetDepart(),this.searchApprovalEvent(),this.crumbsEvent()}};var transExpense=new TransExpense;$(function(){window.$my={messageInfo:$(".messageInfo"),userID:sessionStorage.getItem("ddUserID")},transExpense.init()});