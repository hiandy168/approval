function Approval(){this.switchStr=!0,this.expenseImageUrl=[],this.expenseImageName=[],this.num=0,this.flag=!0,this.config={productType:document.querySelector("#productType"),myModal:document.querySelector("#myModal"),addBtn:document.querySelector("#addBtn"),inWrap:document.querySelector("#inWrap"),cashierWrap:document.querySelector("#cashierWrap"),bankAccount:document.querySelector("#bankAccount"),accountName:document.querySelector("#accountName"),accounNumber:document.querySelector("#accounNumber"),expenseTotal:document.querySelector("#expenseTotal"),epUserWrap:document.querySelector("#epUserWrap"),departmentWrap:document.querySelector("#departmentWrap"),breadcrumb:document.querySelector("#breadcrumb"),approverWrap:document.querySelector("#approverWrap"),uploadBtn:document.querySelector("#uploadBtn"),myFile:document.querySelector("#myFile"),uploadWrap:document.querySelector("#uploadWrap"),departWrapID:document.querySelector("#departWrapID"),addApprover:document.querySelector("#addApprover"),closeBtn:document.querySelector("#closeBtn"),closeBtn_depart:document.querySelector("#closeBtn_depart"),menu:document.querySelector("#menu"),departSearch:document.querySelector("#departSearch"),departmentContent:document.querySelector("#departmentContent"),jobNum:document.querySelector("#jobNum"),groupWrap:document.querySelector("#groupWrap"),searchApprovalInput:document.querySelector("#searchApprovalInput"),companyList:document.querySelector("#companyList"),companyID:document.querySelector("#companyID")}}var slideout=new Slideout({panel:document.getElementById("panel"),menu:document.getElementById("menu"),padding:256,tolerance:70,touch:!1});Approval.prototype={throttle:function(e,a){var t=null;return function(){var n=this,s=arguments;clearTimeout(t),t=setTimeout(function(){e.apply(n,s)},a)}},throttleInput:function(e,a,t){var n=null,s=new Date;return function(){var r=this,o=arguments,i=new Date;clearTimeout(n),i-s>=t?(e.apply(r,o),s=i):n=setTimeout(function(){e.apply(r,o)},a)}},getProductType:function(){var e=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/reviewType.do",success:function(a){if("{}"===JSON.stringify(a))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(a.status){case"true":var t=a.info;if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无报销类型").fadeIn("fast").delay("1000").fadeOut("slow"),!1;var n=t.data;if(!n.length)return $my.messageInfo.html("报销类型为空").fadeIn("fast").delay("1000").fadeOut("slow"),!1;for(var s="",r=0,o=n.length;r<o;r++)s+='<li class="list-group-item" data-producttypeid='+n[r].productTypeID+">"+n[r].productTypeName+"</li>";e.config.productType.innerHTML=s,e.selectProductType();break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},selectProductType:function(){var e=this,a="",t=this.config.productType.querySelectorAll("li");t=Array.prototype.slice.apply(t),$(e.config.inWrap).on("touchend",".product",function(e){e.preventDefault(),e.stopPropagation(),a=parseInt($(this).parents(".bx_appendChild")[0].dataset.index),$(myModal).modal("show")});for(var n=0,s=t.length;n<s;n++)t[n].addEventListener("click",function(t){t.preventDefault(),t.stopPropagation();var n=this.innerHTML,s=this.dataset.producttypeid,r=e.config.inWrap.querySelectorAll(".bx_appendChild");Array.prototype.forEach.call(r,function(e,t){a===t&&(e.querySelector(".product").value=n,e.querySelector(".product").dataset.productid=s)}),$(myModal).modal("hide")},!1)},addEvents:function(){var e="",a="",t=this;t.config.addBtn.addEventListener("click",function(){if(++t.num>2)return $my.messageInfo.html("最多添加2个报销").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.num){case 1:a="报销二";break;case 2:a="报销三"}e+='<div class="appendChild bx_appendChild" data-index='+t.num+">",e+='<p class="titleMessage clearfix">'+a+' <i class="iconfont icon-ttpodicon deleteIcon pull-right"></i></p>',e+='<div class="container-fluid myContainer inputFile">',e+='<div class="row my-row">',e+='<div class="col-xs-3 col-sm-3 col-md-3 my-col">',e+="<span>报销类型</span>",e+="</div>",e+='<div class="col-xs-9 col-sm-9 col-md-9 my-col">',e+='<input type="text" class="product" data-productid="" readonly="readonly" data-toggle="modal" data-target="#myModal" placeholder="请输入">',e+="</div>",e+="</div>",e+='<div class="row my-row">',e+='<div class="col-xs-4 col-sm-4 col-md-4 my-col">',e+="<span>报销金额(￥)</span>",e+="</div>",e+='<div class="col-xs-8 col-sm-8 col-md-8 my-col">',e+='<input type="number" class="itemAlltotals" data-count="0" placeholder="请输入">',e+="</div>",e+="</div>",e+='<div class="row my-row special-row">',e+='<div class="col-xs-3 col-sm-3 col-md-3 my-col">',e+="<span>费用说明</span>",e+='<span class="limit">(150字)</span>',e+="</div>",e+='<div class="col-xs-9 col-sm-9 col-md-9 my-col">',e+='<textarea class="remarks" placeholder="请输入" maxlength="150"></textarea>',e+="</div>",e+="</div>",e+="</div>",e+="</div>",$(t.config.inWrap).append(e),e=""},!1)},getCashierUser:function(){var e=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/cashierUser.do",success:function(a){if("{}"===JSON.stringify(a))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(a.status){case"true":var t=a.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=t.data;if(n.length){for(var s="",r=0,o=n.length;r<o;r++)s+='<li class="cashier text-center" data-cashierUserID='+n[r].cashierUserID+">",s+='<div class="wating text-center progressBar">出纳</div>',s+='<p class="name">'+n[r].cashierUserName+"</p>",s+="</li>";e.config.cashierWrap.innerHTML=s}else e.config.cashierWrap.innerHTML="<span style='font-weight:normal'>暂无出纳人信息</span>";break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},getOldBank:function(e){var a=this;if(null==e||"null"==e)return void $my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow");$.ajax({url:getRoothPath+"/ddExpenses/userController/getOldBank.do",data:{userID:e},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var t=e.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=t.data;n.length&&(a.config.bankAccount.value=n[0].bankAccount,a.config.accountName.value=n[0].accountName,a.config.accounNumber.value=n[0].accounNumber);break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},calcExpenseTotal:function(){var e=this,a=/^\d+(\.\d+)?$/;$(e.config.inWrap).on("keyup",".itemAlltotals",function(t){var n=0;if(t.preventDefault(),t.stopPropagation(),""!=this.value){if(!a.test(this.value))return void $my.messageInfo.html("请输入非负浮点数").fadeIn("fast").delay("1000").fadeOut("slow");parseFloat(this.value)<=1e6?this.dataset.count=this.value:($my.messageInfo.html("单个报销金额最大100万").fadeIn("fast").delay("1500").fadeOut("slow"),this.value="",this.dataset.count=0)}else""==this.value&&(this.dataset.count=0);var s=$(this).parents("#inWrap")[0].querySelectorAll(".itemAlltotals");Array.prototype.forEach.call(s,function(e){n+=parseFloat(e.dataset.count)}),e.config.expenseTotal.value=n.toFixed(2)})},getEpUser:function(e){var a=this;if(null==e||"null"==e)return $my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/ddExpenses/userController/oldExpensesUser.do",data:{userID:e},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var t=e.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=t.data;if(n.length){for(var s="",r=0,o=n.length;r<o;r++)s+='<li class="nowrap text-center" data-oldEpUserID='+n[r].oldEpUserID+">"+n[r].oldEpUserUserName+"</li>";a.config.epUserWrap.innerHTML=s}else 0==n.length&&(a.config.epUserWrap.innerHTML="<span style='font-weight:normal'>暂无常用审批人</span>");break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},_renderDepartSP:function(e){var a="",t=e.listUser,n=e.listDepart;if(n.length)for(var s=0,r=n.length;s<r;s++)a+='<div class="row my-row" data-departID='+n[s].departID+">",a+='<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">',a+='<span class="departName">'+n[s].departName+"</span>",a+="</div>",a+='<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">',a+="<p><i>"+n[s].userCount+'</i>&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></p>',a+="</div>",a+="</div>";if(t.length)for(var s=0,r=t.length;s<r;s++)a+='<div class="row my-row" data-departUserID='+t[s].departUserID+">",a+='<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">',a+='<span class="departUserName">'+t[s].departUserName+"</span>",a+="</div>",a+='<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">',a+="<p></p>",a+="</div>",a+="</div>";this.config.departmentWrap.innerHTML=a,this.switchStr=!0},_deleteProductType:function(){var e=this;$(e.config.inWrap).on("touchend",".deleteIcon",function(a){a.preventDefault(),a.stopPropagation();var t=$(this).parents(".bx_appendChild").attr("data-index");switch($(this).parents("#inWrap").find(".bx_appendChild").length){case 2:$(this).parents(".bx_appendChild").next(".bx_appendChild").attr("data-index","1"),e.num=0;break;case 3:"1"===t?($(this).parents(".bx_appendChild").next(".bx_appendChild").attr("data-index","1").children(".titleMessage").html("报销二 <i class='iconfont icon-ttpodicon deleteIcon pull-right'></i>"),e.num=1):"2"===t&&(e.num=1);break;default:$my.messageInfo.html("异常错误").fadeIn("fast").delay("1500").fadeOut("slow")}$(this).parents(".bx_appendChild").remove();var n=0,s=e.config.inWrap.querySelectorAll(".itemAlltotals");Array.prototype.forEach.call(s,function(e){n+=parseFloat(e.dataset.count)}),e.config.expenseTotal.value=n.toFixed(4)})},getDepart:function(e){var a=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/getDepartOrUser.do",data:{departmentID:e},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var t=e.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");a._renderDepartSP(t);break;case"failure":$my.messageInfo.html("部门及人员获取错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},asyncGetDepart:function(){var e=this;$(departmentWrap).on("click",".row",function(a){a.preventDefault(),a.stopPropagation();var t=document.createElement("li"),n=this.dataset.departid,s="";if(this.querySelector(".departName"))s=this.querySelector(".departName").innerHTML,t="<li data-departmentID="+n+'><a href="javascript:;">'+s+"</a></li>",e.getDepart(n),$(e.config.breadcrumb).append(t);else{var r="",o="",i="";o=this.dataset.departuserid,r=this.querySelector(".departUserName").innerHTML,r.indexOf("-")>=0&&(r=r.substring(0,r.indexOf("-")));var l=e.config.approverWrap.querySelectorAll("li");if(l.length>=10)return void $my.messageInfo.html("审批人最多添加9名").fadeIn("fast").delay("1000").fadeOut("slow");Array.prototype.forEach.call(l,function(e){if(o==e.dataset.userid)throw $my.messageInfo.html("该审批人已在列表中").fadeIn("fast").delay("1000").fadeOut("slow"),new Error("该审批人已在列表中")}),i='<li class="nowrap addPeople" data-userid='+o+">"+r+"</li>",e.config.addApprover.insertAdjacentHTML("beforeBegin",i),slideout.close()}var d=e.config.breadcrumb.querySelectorAll("li");d=Array.prototype.slice.call(d),d.pop();for(var c=0,u=d.length;c<u;c++)d[c].classList.add("active")})},crumbsEvent:function(){var e=this;$(breadcrumb).on("click","li",function(a){if(a.preventDefault(),a.stopPropagation(),e.switchStr&&this.classList.contains("active")){this.classList.remove("active"),e.switchStr=!1;var t="",n=this.dataset.departmentid,s=$(this).index(),r=this.parentNode.querySelectorAll("li");r=Array.prototype.slice.apply(r),r=r.slice(0,s+1);for(var o=0,i=r.length;o<i;o++)t+=r[o].outerHTML;e.config.breadcrumb.innerHTML=t,e.getDepart(n)}})},selectEpUser:function(){var e=this,a="",t="",n="";$(this.config.epUserWrap).on("click","li",function(s){s.preventDefault(),s.stopPropagation(),t=this.dataset.oldepuserid,a=this.innerHTML;var r=e.config.approverWrap.querySelectorAll("li");Array.prototype.forEach.call(r,function(e){if(t==e.dataset.userid)throw $my.messageInfo.html("该审批人已在列表中").fadeIn("fast").delay("1000").fadeOut("slow"),new Error("该审批人已在列表中")}),n='<li class="nowrap addPeople" data-userid='+t+">"+a+"</li>",e.config.addApprover.insertAdjacentHTML("beforeBegin",n),slideout.close()})},submitEvent:function(){if(approval.flag){var e=[],a=approval.config.expenseTotal.value,t=approval.config.bankAccount.value,n=approval.config.accountName.value,s=approval.config.accounNumber.value,r=approval.config.departWrapID.dataset.departmentinputid,o=[],i=[],l=[],d=[],c=approval.config.cashierWrap.querySelector("li.cashier").dataset.cashieruserid,u=approval.config.inWrap.querySelectorAll(".product"),f=approval.config.inWrap.querySelectorAll(".itemAlltotals"),p=approval.config.inWrap.querySelectorAll(".remarks"),m=approval.config.approverWrap.querySelectorAll(".nowrap"),h=approval.config.jobNum.value,g=approval.config.companyID.dataset.reimbursementid;u=Array.prototype.slice.apply(u),f=Array.prototype.slice.apply(f),p=Array.prototype.slice.apply(p),Array.prototype.forEach.call(m,function(e){d.push(e.dataset.userid)});for(var y=0,v=u.length;y<v;y++){if(""==u[y].dataset.productid)return void $my.messageInfo.html("请完善报销类型").fadeIn("fast").delay("1000").fadeOut("slow");if(""==f[y].value)return void $my.messageInfo.html("请完善报销金额").fadeIn("fast").delay("1000").fadeOut("slow");o.push(u[y].dataset.productid),i.push(f[y].value),""==p[y].value&&(p[y].value=" "),l.push(p[y].value)}if(""==r)return void $my.messageInfo.html("请选择报销部门").fadeIn("fast").delay("1000").fadeOut("slow");if(""==t||""==n||""==s)return void $my.messageInfo.html("请完善收款信息").fadeIn("fast").delay("1000").fadeOut("slow");if(""==a)return void $my.messageInfo.html("报销总金额为空").fadeIn("fast").delay("1000").fadeOut("slow");if(0===approval.expenseImageUrl.length)return void $my.messageInfo.html("请完善报销凭证").fadeIn("fast").delay("1000").fadeOut("slow");if(""==g)return void $my.messageInfo.html("请完善所属公司").fadeIn("fast").delay("1000").fadeOut("slow");if(0===d.length)return void $my.messageInfo.html("请完善审批人").fadeIn("fast").delay("1000").fadeOut("slow");if(""==c)return void $my.messageInfo.html("出纳人信息为空").fadeIn("fast").delay("1000").fadeOut("slow");if(""==h)return void $my.messageInfo.html("请完善报销人工号").fadeIn("fast").delay("1000").fadeOut("slow");if(!/^\d{7}$/.test(h))return void $my.messageInfo.html("报销人工号不合法").fadeIn("fast").delay("1000").fadeOut("slow");o=o.join(),i=i.join(),l=l.join(),d=d.join();for(var y=0,v=approval.expenseImageUrl.length;y<v;y++)e.push(clouddnImgStr+"/"+approval.expenseImageUrl[y]);$.ajax({url:getRoothPath+"/ddExpenses/expense/save.do",data:{departmentID:r,expenseTotal:a,submitUserID:$my.userID,bankAccount:t,accountName:n,accounNumber:s,producttypeIDs:o,itemAlltotals:i,remarks:l,expensesUserIDs:d,cashierUserID:c,expenseImageUrl:e.join(),expenseImageName:approval.expenseImageName.join(),loginName:h,reimbursementID:g},beforeSend:function(){approval.flag=!1},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case 1:var a=null;$my.messageInfo.html(e.msg).fadeIn("fast").delay("1000").fadeOut("slow"),function(){localStorage.removeItem("sessionTouchData_mySponser"),localStorage.removeItem("pageNum_mySponser"),localStorage.removeItem("dataCount_mySponser"),localStorage.removeItem("sessionTouchData_myApproval"),localStorage.removeItem("pageNum_myApproval"),localStorage.removeItem("dataCount_myApproval")}(),clearTimeout(a),a=setTimeout(function(){window.location.href="index.html"},1200);break;case 0:approval.flag=!0,$my.messageInfo.html("保存失败").fadeIn("fast").delay("1000").fadeOut("slow")}}}),function(){e=null,o=null,i=null,l=null,d=null}()}},addImage:function(){var e=this;e.config.uploadBtn.addEventListener("click",function(){$(myFile).trigger("click")},!1);var a=function(a){var t=document.createElement("img"),n=document.createElement("li");n.classList.add("newUploadImg"),t.setAttribute("alt",a.name),t.file=a,n.appendChild(t),$(e.config.uploadWrap).prepend(n);var s=new FileReader;s.onload=function(e){return function(a){e.src=a.target.result}}(t),s.readAsDataURL(a)};e.config.myFile.addEventListener("change",function(t){t.stopPropagation(),t.preventDefault();var n=new FormData,s=this.files;if(!(s.length<=9))return void $my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow");var r=e.config.uploadWrap.querySelectorAll("li");if(r=Array.prototype.slice.apply(r),!(s.length<=10-r.length))return void $my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow");for(var o=0,i=s.length;o<i;o++){var l=s[o],d=l.name.replace(/.+\./,"").toLowerCase();if("jpg"!==d&&"jpeg"!==d&&"png"!==d)return void $my.messageInfo.html("请选择扩展名.jpg/.jpeg/.png图片").fadeIn("fast").delay("1500").fadeOut("slow");if(l.size>5242880)return void $my.messageInfo.html("单张图片大小不可超过5M").fadeIn("fast").delay("1000").fadeOut("slow");n.append("files",l),a(l)}0!=s.length&&$.ajax({url:"http://www.ehaofangwang.com/publicshow/qiniuUtil/fileToQiniu.do",type:"POST",data:n,timeout:"",dataType:"json",cache:!1,contentType:!1,processData:!1,beforeSend:function(){$("#imgModalWrap").modal("show"),$("#imgModalWrap").modal({backdrop:"static",keyboard:!1}),$("#imgModalWrap").on("touchmove",function(e){e.preventDefault(),e.stopPropagation()})},success:function(a){if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var t=a.statas,s="",r="";switch(t){case"true":s=a.pathUrls.split(","),r=a.fileNames.split(","),Array.prototype.unshift.apply(e.expenseImageUrl,s),Array.prototype.unshift.apply(e.expenseImageName,r),$my.messageInfo.html(a.message).fadeIn("fast").delay("1000").fadeOut("slow");break;case"false":$my.messageInfo.html("上传失败,请重新上传").fadeIn("fast").delay("2000").fadeOut("slow"),n=null,s=[],r=[],$(e.config.uploadWrap).find("li.newUploadImg").remove()}},complete:function(){$("#imgModalWrap").modal("hide")},error:function(a){$("#imgModalWrap").modal("hide"),n=null,$(e.config.uploadWrap).find("li.newUploadImg").remove()}})},!1)},deleteEpUser:function(){var e=this,a=function(e){return function(){this.parentNode.removeChild(this)}};slideout.on("close",function(){new Promise(function(a,t){a(e.config.approverWrap.querySelectorAll(".nowrap"))}).then(function(e){e=Array.prototype.slice.call(e);for(var t=0;t<e.length;t++)e[t].onclick=a()}).catch(function(e){$my.messageInfo.html("异常错误:"+e).fadeIn("fast").delay("2000").fadeOut("slow")})})},deleteImg:function(){var e=this;$(e.config.uploadWrap).on("click","li.newUploadImg",function(a){a.preventDefault(),a.stopPropagation();for(var t=($(this).index(),$(this).children("img").attr("alt")),n=t.substring(0,t.lastIndexOf(".")),s=0,r=e.expenseImageName.length;s<r;s++)e.expenseImageName[s]===n&&(e.expenseImageName.splice(s,1),function(a){(function(){e.expenseImageUrl.splice(a,1)})()}(s));$(this).remove()})},expenseDepart:function(e){var a=this;if(null==e||"null"==e)return $my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/ddExpenses/userController/expenseDepart.do",data:{userID:e},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var t=e.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=t.data;n.length&&(a.config.departWrapID.value=n[0].departName,a.config.departWrapID.dataset.departmentinputid=n[0].departmentID);break;case"failure":$my.messageInfo.html("报销部门查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},_renderDepart:function(e,a){var t=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/expenseDepartSearch.do",data:{name:e,parentID:a},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var a=e.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=a.data,s="";if(n.length&&0!=n.length){for(var r=0,o=n.length;r<o;r++)s+='<div class="row my-row" data-departmentwrapid='+n[r].departmentID+" data-type="+n[r].type+">",s+='<div class="col-xs-9 col-sm-9 col-md-9 my-col nowrap searchDepartName">',s+="<span>"+n[r].departName+"</span>",s+="</div>",s+='<div class="col-xs-3 col-sm-3 col-md-3 my-col text-right departConfirmBtn">',s+='<p><span class="glyphicon glyphicon-ok my-icon" aria-hidden="true"></span></p>',s+="</div>",s+="</div>";t.config.departmentContent.innerHTML=s}else s+='<div class="row my-row">',s+='<div class="col-xs-9 col-sm-9 col-md-9 my-col nowrap">',s+="<span>查询信息为空</span>",s+="</div>",s+='<div class="col-xs-3 col-sm-3 col-md-3 my-col text-right">',s+="<p></p>",s+="</div>",s+="</div>",t.config.departmentContent.innerHTML=s;break;case"failure":$my.messageInfo.html("报销部门查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}},complete:function(){if(t.config.departmentContent.querySelectorAll(".row"))var e=t.config.departmentContent.querySelectorAll(".row");t.expenseDepartEvent(e)}})},expenseDepartSearch:function(){var e=this,a=function(){var a=this.value;e._renderDepart(a)};e.config.departSearch.addEventListener("input",e.throttleInput(a,500,1e3),!1)},expenseDepartEvent:function(e){var a=this,t=function(e,a){if(-1!==e.className.indexOf("my-col"))return e;if(e==a)return!1;for(;-1===e.className.indexOf("my-col");)e=e.parentNode;return e},n=function(e,a){return new RegExp("(^| )"+a+"( |$)","gi").test(e.className)};e&&[].forEach.call(e,function(e){e.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation();var s=this.dataset.type,r=this.dataset.departmentwrapid,o="";this.querySelector(".searchDepartName")&&(o=this.querySelector(".searchDepartName").querySelector("span").innerHTML);var i=this,l=e.target,d=t(l,i);if(d){if(n(d,"searchDepartName"))switch(s){case"0":break;case"1":a._renderDepart("",r)}else{if(i.querySelector(".departConfirmBtn")){var c=approval.config.departmentContent.querySelectorAll(".departConfirmBtn");[].forEach.call(c,function(e){e.querySelector(".my-icon").classList.remove("hasselect")}),i.querySelector(".departConfirmBtn").querySelector(".my-icon").classList.add("hasselect")}o&&r&&(a.config.departWrapID.value=o,a.config.departWrapID.dataset.departmentinputid=r),slideout.close()}}},!1)})},asideEvent:function(){var e=this;e.config.addApprover.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation(),e.config.menu.getElementsByClassName("content")[0].classList.remove("hide"),e.config.menu.getElementsByClassName("content")[0].classList.add("show"),e.config.menu.querySelector(".depart").classList.remove("show"),e.config.menu.querySelector(".depart").classList.add("hide"),slideout.open()},!1),e.config.departWrapID.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation(),e.config.menu.getElementsByClassName("content")[0].classList.remove("show"),e.config.menu.getElementsByClassName("content")[0].classList.add("hide"),e.config.menu.querySelector(".depart").classList.remove("hide"),e.config.menu.querySelector(".depart").classList.add("show"),slideout.open()},!1),e.config.closeBtn.addEventListener("touchend",function(e){e.preventDefault(),e.stopPropagation(),slideout.close()},!1),e.config.closeBtn_depart.addEventListener("touchend",function(e){e.preventDefault(),e.stopPropagation(),slideout.close()},!1)},jobNumEvent:function(){var e=this,a=/^[0-9]*$/,t=/^\d{7}$/,n=function(){if(!a.test(this.value))return $my.messageInfo.html("输入不合法").fadeIn("fast").delay("1000").fadeOut("slow"),void(this.value="");if(!t.test(this.value))return void $my.messageInfo.html("请输入7位数字").fadeIn("fast").delay("1000").fadeOut("slow");var n=this.value;$.ajax({url:getRoothPath+"/ddExpenses/userController/expenseUser.do",data:{loginName:n},success:function(a){if("{}"===JSON.stringify(a))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(a.status){case"true":var t=a.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=t.data;if(!n.length)return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1500").fadeOut("slow");e.config.bankAccount.value=n[0].bankAccount,e.config.accountName.value=n[0].accountName,e.config.accounNumber.value=n[0].accounNumber;break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})};e.config.jobNum.addEventListener("input",e.throttle(n,1500),!1)},expenseAName:function(){var e=this,a=/^[\u4e00-\u9fa5]{0,}$/,t=!0,n=e.config.groupWrap.querySelector("#inGroupWrap"),s=function(){var s=this.value;if(""==s&&(n.innerHTML="",e.config.groupWrap.classList.remove("show"),e.config.groupWrap.classList.add("hide")),t){if(!a.test(s))return void $my.messageInfo.html("请输入中文汉字").fadeIn("fast").delay("1500").fadeOut("slow");s.length>=2&&$.ajax({url:getRoothPath+"/ddExpenses/userController/expenseAName.do",data:{name:s},success:function(a){if("{}"===JSON.stringify(a))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(a.status){case"true":var t=a.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var s=t.data;if(!s.length)return $my.messageInfo.html("返回信息为空,请重新输入").fadeIn("fast").delay("1500").fadeOut("slow"),n.innerHTML="",e.config.groupWrap.classList.remove("show"),void e.config.groupWrap.classList.add("hide");for(var r="",o=0,i=s.length;o<i;o++)r+='<li class="list-group-item" data-accountnameid='+s[o].id+">"+s[o].accountName+"</li>";n.innerHTML=r,e.config.groupWrap.classList.remove("hide"),e.config.groupWrap.classList.add("show");break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})}};e.config.accountName.addEventListener("compositionstart",function(){n.innerHTML="",e.config.groupWrap.classList.remove("show"),e.config.groupWrap.classList.add("hide"),t=!1},!1),e.config.accountName.addEventListener("compositionend",function(){t=!0},!1),e.config.accountName.addEventListener("input",e.throttle(s,1e3),!1),e.config.accountName.addEventListener("blur",function(){n.innerHTML="",e.config.groupWrap.classList.add("hide")},!1)},expenseANameEvent:function(){var e=this,a=e.config.groupWrap.querySelector("#inGroupWrap");$(a).on("touchend","li",function(a){a.preventDefault(),a.stopPropagation(),e.config.groupWrap.classList.remove("show"),e.config.groupWrap.classList.add("hide");var t=this.dataset.accountnameid,n=this.innerHTML;e.config.accountName.value=n,$.ajax({url:getRoothPath+"/ddExpenses/userController/expenseBank.do",data:{id:t},success:function(a){if("{}"===JSON.stringify(a))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(a.status){case"true":var t=a.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=t.data;if(!n.length)return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1500").fadeOut("slow");e.config.bankAccount.value=n[0].bankAccount,e.config.accounNumber.value=n[0].accounNumber,e.config.jobNum.value=n[0].loginName;break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})})},searchApprovalEvent:function(){var e=this,a=!0,t=function(){var t=this.value.trim();a&&(t?$.post(getRoothPath+"/ddExpenses/userController/userLike.do",{name:t},function(a){if("{}"===JSON.stringify(a))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(a.status){case"true":var t=a.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=t.data;if(!n.length)return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");for(var s="",r=0,o=n.length;r<o;r++)s+='<div class="row my-row" data-departuserid='+n[r].id+">",s+='<div class="col-xs-12 col-sm-12 col-md-12 my-col nowrap">',s+='<span class="departUserName">'+n[r].userName+"-"+n[r].departName+"</span>",s+="</div>",s+="</div>";e.config.departmentWrap.innerHTML=s;break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}):e.getDepart(0))};e.config.searchApprovalInput.addEventListener("compositionstart",function(){a=!1}),e.config.searchApprovalInput.addEventListener("compositionend",function(){a=!0}),e.config.searchApprovalInput.addEventListener("input",e.throttle(t,1e3),!1)},getCompany:function(){var e=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/company.do",success:function(a){if("{}"===JSON.stringify(a))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(a.status){case"true":var t=a.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=t.data;if(n.length){for(var s="",r=0,o=n.length;r<o;r++)s+='<li class="list-group-item nowrap" data-reimbursementid='+n[r].reimbursementID+">"+n[r].companyName+"</li>";e.config.companyList.innerHTML=s}else e.config.companyList.innerHTML="<span style='font-weight:normal'>暂无公司信息</span>";break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},selectCompany:function(){var e=this;e.config.companyList.addEventListener("click",function(a){var a=a||window.event,t=a.target||a.srcElement;"li"===t.tagName.toLowerCase()&&(e.config.companyID.value=t.innerHTML,e.config.companyID.dataset.reimbursementid=t.dataset.reimbursementid,$("#companyModal").modal("hide"))})},init:function(){this.getProductType(),this.getCashierUser(),this.getOldBank($my.userID),this.addEvents(),this.calcExpenseTotal(),this.getDepart(0),this.asyncGetDepart(),this.getEpUser($my.userID),this.crumbsEvent(),this.selectEpUser(),this.addImage(),this.deleteEpUser(),this.deleteImg(),this._deleteProductType(),this.asideEvent(),this.expenseDepart($my.userID),this.expenseDepartSearch(),this.expenseDepartEvent(),this.jobNumEvent(),this.expenseAName(),this.expenseANameEvent(),this._renderDepart("",""),this.searchApprovalEvent(),this.getCompany(),this.selectCompany()}};var approval=new Approval;$(function(){window.$my={messageInfo:$(".messageInfo"),userID:sessionStorage.getItem("ddUserID")},approval.init(),$("#imgModalWrap").on("show.bs.modal",function(){var e=$(this),a=e.find(".modal-dialog");e.css("display","block"),a.css({"margin-top":Math.max(0,($(window).height()-a.height())/2)})}),document.querySelector("#submitBtn").addEventListener("click",approval.throttle(approval.submitEvent,200),!1)});