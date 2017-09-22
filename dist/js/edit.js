function Approval(){this.switchStr=!0,this.expenseImageUrl=[],this.expenseImageName=[],this.detailid="",this.flag=!0,this.touchflag=!1,this.vpHeight=document.documentElement.clientHeight,this.pagenum=0,this.dataCount="",this.config={productType:document.querySelector("#productType"),myModal:document.querySelector("#myModal"),addBtn:document.querySelector("#addBtn"),inWrap:document.querySelector("#inWrap"),cashierWrap:document.querySelector("#cashierWrap"),bankAccount:document.querySelector("#bankAccount"),accountName:document.querySelector("#accountName"),accounNumber:document.querySelector("#accounNumber"),expenseTotal:document.querySelector("#expenseTotal"),epUserWrap:document.querySelector("#epUserWrap"),departmentWrap:document.querySelector("#departmentWrap"),breadcrumb:document.querySelector("#breadcrumb"),approverWrap:document.querySelector("#approverWrap"),uploadBtn:document.querySelector("#uploadBtn"),uploadWrap:document.querySelector("#uploadWrap"),myFile:document.querySelector("#myFile"),deleteApproverWrap:document.querySelector("#deleteApproverWrap"),cancleBtn:document.querySelector("#cancleBtn"),confirmBtn:document.querySelector("#confirmBtn"),imgModal:document.querySelector("#imgModal"),cancleBtn_img:document.querySelector("#cancleBtn_img"),confirmBtn_img:document.querySelector("#confirmBtn_img"),addApprover:document.querySelector("#addApprover"),closeBtn:document.querySelector("#closeBtn"),menu:document.querySelector("#menu"),jobNum:document.querySelector("#jobNum"),groupWrap:document.querySelector("#groupWrap"),searchApprovalInput:document.querySelector("#searchApprovalInput"),companyList:document.querySelector("#companyList"),companyID:document.querySelector("#companyID"),businessList:document.querySelector("#businessList"),business:document.querySelector("#business"),subDepart:document.querySelector("#subDepart"),closeBtn_subDepart:document.querySelector("#closeBtn_subDepart"),subDepartWrap:document.querySelector("#subDepartWrap"),subDepartWrapID:document.querySelector("#subDepartWrapID"),subDepartInput:document.querySelector("#subDepartInput"),loadingWrap:document.querySelector("#loadingWrap")}}var slideout=new Slideout({panel:document.getElementById("panel"),menu:document.getElementById("menu"),padding:256,tolerance:70,touch:!1});Approval.prototype={throttle:function(e,t){var a=null;return function(){var s=this,n=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(s,n)},t)}},throttleInput:function(e,t,a){var s=null,n=new Date;return function(){var o=this,r=arguments,i=new Date;clearTimeout(s),i-n>=a?(e.apply(o,r),n=i):s=setTimeout(function(){e.apply(o,r)},t)}},getDetailed:function(){var e=window.location.href,t=this;if(-1==e.indexOf("detailid"))throw $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow"),new Error("url错误");var a=window.location.search;t.detailid=a.split("=")[1]},getSessionData:function(){var e=JSON.parse(sessionStorage.getItem("productType")),t=JSON.parse(sessionStorage.getItem("expenseUser")),a=sessionStorage.getItem("business"),s=sessionStorage.getItem("businessid"),n=sessionStorage.getItem("subDepart"),o=sessionStorage.getItem("subDepartid"),r=sessionStorage.getItem("accountName"),i=sessionStorage.getItem("accounNumber"),l=sessionStorage.getItem("bankAccount"),d=sessionStorage.getItem("expenseTotal"),c=sessionStorage.getItem("jobNum"),u=sessionStorage.getItem("companyName"),p=sessionStorage.getItem("reimbursementid"),f=sessionStorage.getItem("imgArr"),m=sessionStorage.getItem("imageNameArr"),g="",h="",v="",y="";if(this.config.business.value=a,this.config.business.setAttribute("data-businessid",s),this.config.subDepart.value=n,this.config.subDepart.setAttribute("data-subdepartid",o),this.config.accountName.value=r,this.config.accounNumber.value=i,this.config.bankAccount.value=l,this.config.expenseTotal.value=d,this.config.jobNum.value=c,this.config.companyID.value=u,this.config.companyID.dataset.reimbursementid=p,e&&($my.productTypeLength=e.length-1,e.length)){for(var I=0,w=e.length;I<w;I++){switch(I){case 0:h="报销一";break;case 1:h="报销二";break;case 2:h="报销三"}g+='<div id="appendChild" class="appendChild" data-index='+I+">",g+='<p class="titleMessage">'+h+"</p>",g+='<div class="container-fluid myContainer inputFile">',g+='<div class="row my-row">',g+='<div class="col-xs-3 col-sm-3 col-md-3 my-col">',g+="<span>报销类型</span>",g+="</div>",g+='<div class="col-xs-9 col-sm-9 col-md-9 my-col">',g+='<input type="text" class="product" data-productid='+e[I].producttypeID+" value="+e[I].productTypeName+' readonly="readonly" data-toggle="modal" data-target="#myModal" placeholder="请输入">',g+="</div>",g+="</div>",g+='<div class="row my-row">',g+='<div class="col-xs-4 col-sm-4 col-md-4 my-col">',g+="<span>报销金额(￥)</span>",g+="</div>",g+='<div class="col-xs-8 col-sm-8 col-md-8 my-col">',g+='<input type="number" class="itemAlltotals" data-count='+e[I].itemAlltotal+" value="+e[I].itemAlltotal+' placeholder="请输入">',g+="</div>",g+="</div>",g+='<div class="row my-row special-row">',g+='<div class="col-xs-3 col-sm-3 col-md-3 my-col">',g+="<span>费用说明</span>",g+='<span class="limit">(150字)</span>',g+="</div>",g+='<div class="col-xs-9 col-sm-9 col-md-9 my-col">',g+='<textarea class="remarks" placeholder="请输入" maxlength="150">'+e[I].remark+"</textarea>",g+="</div>",g+="</div>",g+="</div>",g+="</div>"}this.config.inWrap.innerHTML=g}if(t&&t.length){for(var I=0,w=t.length;I<w;I++)v+='<li class="nowrap addPeople deleteApprover" data-userid='+t[I].expenseUserID+' data-toggle="modal" data-target="#deleteApprover">'+t[I].expenseUserName+"</li>";this.config.approverWrap.insertAdjacentHTML("afterBegin",v)}if(f&&(f=f.split(","),m=m.split(","),f.length)){for(var I=0,w=f.length;I<w;I++)y+='<li class="myImg" data-toggle="modal" data-target="#imgModal">',y+="<img data-src="+f[I]+" src="+f[I]+"?imageView2/1/w/200/h/200 alt="+m[I]+">",y+="</li>";this.config.uploadWrap.insertAdjacentHTML("afterBegin",y)}},getProductType:function(){var e=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/reviewType.do",success:function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return $my.messageInfo.html("暂无报销类型").fadeIn("fast").delay("1000").fadeOut("slow"),!1;var s=a.data;if(!s.length)return $my.messageInfo.html("报销类型为空").fadeIn("fast").delay("1000").fadeOut("slow"),!1;for(var n="",o=0,r=s.length;o<r;o++)n+='<li class="list-group-item" data-producttypeid='+s[o].productTypeID+">"+s[o].productTypeName+"</li>";e.config.productType.innerHTML=n,e.selectProductType();break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},selectProductType:function(){var e=this,t="",a=this.config.productType.querySelectorAll("li");a=Array.prototype.slice.apply(a),$(e.config.inWrap).on("touchend",".product",function(e){e.preventDefault(),e.stopPropagation(),t=parseInt($(this).parents("#appendChild")[0].dataset.index),$(myModal).modal("show")});for(var s=0,n=a.length;s<n;s++)a[s].addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var s=this.innerHTML,n=this.dataset.producttypeid,o=e.config.inWrap.querySelectorAll(".appendChild");Array.prototype.forEach.call(o,function(e,a){t===a&&(e.querySelector(".product").value=s,e.querySelector(".product").dataset.productid=n)}),$(myModal).modal("hide")},!1)},addEvents:function(){void 0===$my.productTypeLength&&($my.productTypeLength=-1);var e=$my.productTypeLength,t="",a="",s=this;s.config.addBtn.addEventListener("click",function(){if(++e>2)return $my.messageInfo.html("最多添加2个报销").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e){case 0:a="报销一";break;case 1:a="报销二";break;case 2:a="报销三"}t+='<div id="appendChild" class="appendChild" data-index='+e+">",t+='<p class="titleMessage">'+a+"</p>",t+='<div class="container-fluid myContainer inputFile">',t+='<div class="row my-row">',t+='<div class="col-xs-3 col-sm-3 col-md-3 my-col">',t+="<span>报销类型</span>",t+="</div>",t+='<div class="col-xs-9 col-sm-9 col-md-9 my-col">',t+='<input type="text" class="product" data-productid="" readonly="readonly" data-toggle="modal" data-target="#myModal" placeholder="请输入">',t+="</div>",t+="</div>",t+='<div class="row my-row">',t+='<div class="col-xs-4 col-sm-4 col-md-4 my-col">',t+="<span>报销金额(￥)</span>",t+="</div>",t+='<div class="col-xs-8 col-sm-8 col-md-8 my-col">',t+='<input type="number" class="itemAlltotals" data-count="0" placeholder="请输入">',t+="</div>",t+="</div>",t+='<div class="row my-row special-row">',t+='<div class="col-xs-3 col-sm-3 col-md-3 my-col">',t+="<span>费用说明</span>",t+='<span class="limit">(150字)</span>',t+="</div>",t+='<div class="col-xs-9 col-sm-9 col-md-9 my-col">',t+='<textarea class="remarks" placeholder="请输入" maxlength="150"></textarea>',t+="</div>",t+="</div>",t+="</div>",t+="</div>",$(s.config.inWrap).append(t),t=""},!1)},getCashierUser:function(){var e=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/cashierUser.do",success:function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var s=a.data;if(!s.length)return void $my.messageInfo.html("出纳人信息为空").fadeIn("fast").delay("1000").fadeOut("slow");for(var n="",o=0,r=s.length;o<r;o++)n+='<li class="cashier text-center" data-cashierUserID='+s[o].cashierUserID+">",n+='<div class="wating text-center progressBar">出纳</div>',n+='<p class="name">'+s[o].cashierUserName+"</p>",n+="</li>";e.config.cashierWrap.innerHTML=n;break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},calcExpenseTotal:function(){var e=this,t=/^\d+(\.\d+)?$/;$(e.config.inWrap).on("keyup",".itemAlltotals",function(a){var s=0;if(a.preventDefault(),a.stopPropagation(),""!=this.value){if(!t.test(this.value))return void $my.messageInfo.html("请输入非负浮点数").fadeIn("fast").delay("1000").fadeOut("slow");parseFloat(this.value)<=1e6?this.dataset.count=this.value:($my.messageInfo.html("单个报销金额最大100万").fadeIn("fast").delay("1500").fadeOut("slow"),this.value="",this.dataset.count=0)}else""==this.value&&(this.dataset.count=0);var n=$(this).parents("#inWrap")[0].querySelectorAll(".itemAlltotals");Array.prototype.forEach.call(n,function(e){s+=parseFloat(e.dataset.count)}),e.config.expenseTotal.value=s.toFixed(2)})},getEpUser:function(e){var t=this;if(null==e||"null"==e)return $my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/ddExpenses/userController/oldExpensesUser.do",data:{userID:e},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var a=e.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var s=a.data;if(s.length){for(var n="",o=0,r=s.length;o<r;o++)n+='<li class="nowrap text-center" data-oldEpUserID='+s[o].oldEpUserID+">"+s[o].oldEpUserUserName+"</li>";t.config.epUserWrap.innerHTML=n}break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},_renderDepartWrap:function(e){var t="",a=e.listUser,s=e.listDepart;if(s.length)for(var n=0,o=s.length;n<o;n++)t+='<div class="row my-row" data-departID='+s[n].departID+">",t+='<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">',t+='<span class="departName">'+s[n].departName+"</span>",t+="</div>",t+='<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">',t+="<p><i>"+s[n].userCount+'</i>&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></p>',t+="</div>",t+="</div>";if(a.length)for(var n=0,o=a.length;n<o;n++)t+='<div class="row my-row" data-departUserID='+a[n].departUserID+">",t+='<div class="col-xs-8 col-sm-8 col-md-8 my-col nowrap">',t+='<span class="departUserName">'+a[n].departUserName+"</span>",t+="</div>",t+='<div class="col-xs-4 col-sm-4 col-md-4 my-col text-right">',t+="<p></p>",t+="</div>",t+="</div>";this.config.departmentWrap.innerHTML=t,this.switchStr=!0},getDepart:function(e){var t=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/getDepartOrUser.do",data:{departmentID:e},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var a=e.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");t._renderDepartWrap(a);break;case"failure":$my.messageInfo.html("部门及人员获取错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},asyncGetDepart:function(){var e=this;$(departmentWrap).on("click",".row",function(t){t.preventDefault(),t.stopPropagation();var a=document.createElement("li"),s=this.dataset.departid,n="";if(this.querySelector(".departName"))n=this.querySelector(".departName").innerHTML,a="<li data-departmentID="+s+'><a href="javascript:;">'+n+"</a></li>",e.getDepart(s),$(e.config.breadcrumb).append(a);else{var o="",r="",i="";r=this.dataset.departuserid,o=this.querySelector(".departUserName").innerHTML,o.indexOf("-")>=0&&(o=o.substring(0,o.indexOf("-")));var l=e.config.approverWrap.querySelectorAll("li");if(l.length>=10)return void $my.messageInfo.html("审批人最多添加9名").fadeIn("fast").delay("1000").fadeOut("slow");Array.prototype.forEach.call(l,function(e){if(r==e.dataset.userid)throw $my.messageInfo.html("该审批人已在列表中").fadeIn("fast").delay("1000").fadeOut("slow"),new Error("该审批人已在列表中")}),i='<li class="nowrap addPeople" data-userid='+r+">"+o+"</li>",e.config.addApprover.insertAdjacentHTML("beforeBegin",i),slideout.close()}var d=e.config.breadcrumb.querySelectorAll("li");d=Array.prototype.slice.call(d),d.pop();for(var c=0,u=d.length;c<u;c++)d[c].classList.add("active")})},crumbsEvent:function(){var e=this;$(breadcrumb).on("click","li",function(t){if(t.preventDefault(),t.stopPropagation(),e.switchStr&&this.classList.contains("active")){this.classList.remove("active"),e.switchStr=!1;var a="",s=this.dataset.departmentid,n=$(this).index(),o=this.parentNode.querySelectorAll("li");o=Array.prototype.slice.apply(o),o=o.slice(0,n+1);for(var r=0,i=o.length;r<i;r++)a+=o[r].outerHTML;e.config.breadcrumb.innerHTML=a,e.getDepart(s)}})},selectEpUser:function(){var e=this,t="",a="",s="";$(this.config.epUserWrap).on("click","li",function(n){n.preventDefault(),n.stopPropagation(),a=this.dataset.oldepuserid,t=this.innerHTML;var o=e.config.approverWrap.querySelectorAll("li");Array.prototype.forEach.call(o,function(e){if(a==e.dataset.userid)throw $my.messageInfo.html("该审批人已在列表中").fadeIn("fast").delay("1000").fadeOut("slow"),new Error("该审批人已在列表中")}),s='<li class="nowrap addPeople" data-userid='+a+">"+t+"</li>",e.config.addApprover.insertAdjacentHTML("beforeBegin",s),slideout.close()})},submitEvent:function(){if(approval.flag){var e=[],t=approval.config.expenseTotal.value,a=approval.config.bankAccount.value,s=approval.config.accountName.value,n=approval.config.accounNumber.value,o=approval.config.business.value,r=approval.config.subDepart.value,i=[],l=[],d=[],c=[],u=approval.config.cashierWrap.querySelector("li.cashier").dataset.cashieruserid,p=approval.config.inWrap.querySelectorAll(".product"),f=approval.config.inWrap.querySelectorAll(".itemAlltotals"),m=approval.config.inWrap.querySelectorAll(".remarks"),g=approval.config.approverWrap.querySelectorAll(".nowrap"),h=approval.config.uploadWrap.querySelectorAll(".myImg"),v=[],y=[],I=approval.config.jobNum.value,w=approval.config.companyID.value;p=Array.prototype.slice.apply(p),f=Array.prototype.slice.apply(f),m=Array.prototype.slice.apply(m),h=Array.prototype.slice.apply(h),Array.prototype.forEach.call(g,function(e){c.push(e.dataset.userid)});for(var b=0,S=h.length;b<S;b++)v.push(h[b].querySelector("img").dataset.src),y.push(h[b].querySelector("img").getAttribute("alt"));for(var b=0,S=p.length;b<S;b++){if(""==p[b].dataset.productid)return void $my.messageInfo.html("请完善报销类型").fadeIn("fast").delay("1000").fadeOut("slow");if(""==f[b].value)return void $my.messageInfo.html("请完善报销金额").fadeIn("fast").delay("1000").fadeOut("slow");i.push(p[b].dataset.productid),l.push(f[b].value),""==m[b].value&&(m[b].value=" "),d.push(m[b].value)}if(""==a||""==s||""==n)return void $my.messageInfo.html("请完善收款信息").fadeIn("fast").delay("1000").fadeOut("slow");if(""==t)return void $my.messageInfo.html("报销总金额为空").fadeIn("fast").delay("1000").fadeOut("slow");if(""==approval.expenseImageUrl&&0===h.length)return void $my.messageInfo.html("请完善报销凭证").fadeIn("fast").delay("1000").fadeOut("slow");if(""==w||void 0==w||"undefined"==w)return void $my.messageInfo.html("请完善所属公司").fadeIn("fast").delay("1000").fadeOut("slow");if(""==o||void 0==o||"undefined"==o)return void $my.messageInfo.html("请选择事业部").fadeIn("fast").delay("1000").fadeOut("slow");if(""==r||void 0==r||"undefined"==r||"null"==r||null==r)return void $my.messageInfo.html("请选择项目/部门").fadeIn("fast").delay("1000").fadeOut("slow");if(""==I)return void $my.messageInfo.html("请完善报销人工号").fadeIn("fast").delay("1000").fadeOut("slow");if(!/^\d{7}$/.test(I))return void $my.messageInfo.html("报销人工号不合法").fadeIn("fast").delay("1000").fadeOut("slow");if(0===c.length)return void $my.messageInfo.html("请完善审批人").fadeIn("fast").delay("1000").fadeOut("slow");if(""==u)return void $my.messageInfo.html("出纳人信息为空").fadeIn("fast").delay("1000").fadeOut("slow");i=i.join(),l=l.join(),d=d.join(),c=c.join();for(var b=0,S=approval.expenseImageUrl.length;b<S;b++)e.push(clouddnImgStr+"/"+approval.expenseImageUrl[b]);$.ajax({url:getRoothPath+"/ddExpenses/expense/updata.do",data:{departmentID:o,departmentSubID:r,expenseID:approval.detailid,expenseTotal:t,submitUserID:$my.userID,bankAccount:a,accountName:s,accounNumber:n,producttypeIDs:i,itemAlltotals:l,remarks:d,expensesUserIDs:c,cashierUserID:u,expenseImageUrl:e.concat(v).join(),expenseImageName:approval.expenseImageName.concat(y).join(),loginName:I,reimbursementID:w},beforeSend:function(){approval.flag=!1},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case 1:var t=null;$my.messageInfo.html(e.msg).fadeIn("fast").delay("1000").fadeOut("slow"),function(){localStorage.removeItem("sessionTouchData_mySponser"),localStorage.removeItem("pageNum_mySponser"),localStorage.removeItem("dataCount_mySponser"),localStorage.removeItem("sessionTouchData_myApproval"),localStorage.removeItem("pageNum_myApproval"),localStorage.removeItem("dataCount_myApproval")}(),clearTimeout(t),t=setTimeout(function(){window.location.href="index.html"},1200);break;case 0:approval.flag=!0,$my.messageInfo.html("保存失败").fadeIn("fast").delay("1000").fadeOut("slow")}}}),function(){e=null,i=null,l=null,d=null,c=null,v=null,y=null}()}},addImage:function(){var e=this;e.config.uploadBtn.addEventListener("click",function(){$(myFile).trigger("click")},!1);var t=function(t){var a=document.createElement("img"),s=document.createElement("li");s.classList.add("newUploadImg"),a.setAttribute("alt",t.name),a.file=t,s.appendChild(a),$(e.config.uploadWrap).prepend(s);var n=new FileReader;n.onload=function(e){return function(t){e.src=t.target.result}}(a),n.readAsDataURL(t)};e.config.myFile.addEventListener("change",function(a){a.stopPropagation(),a.preventDefault();var s=new FormData,n=this.files;if(!(n.length<=9))return void $my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow");var o=e.config.uploadWrap.querySelectorAll("li");if(o=Array.prototype.slice.apply(o),!(n.length<=10-o.length))return void $my.messageInfo.html("单次图片最多上传9张").fadeIn("fast").delay("1000").fadeOut("slow");for(var r=0,i=n.length;r<i;r++){var l=n[r],d=l.name.replace(/.+\./,"").toLowerCase();if("jpg"!==d&&"jpeg"!==d&&"png"!==d)return void $my.messageInfo.html("请选择扩展名.jpg/.jpeg/.png图片").fadeIn("fast").delay("1500").fadeOut("slow");if(l.size>5242880)return void $my.messageInfo.html("单张图片大小不可超过5M").fadeIn("fast").delay("1000").fadeOut("slow");s.append("files",l),t(l)}0!=n.length&&$.ajax({url:"http://www.ehaofangwang.com/publicshow/qiniuUtil/fileToQiniu.do",type:"POST",data:s,timeout:"",dataType:"json",cache:!1,contentType:!1,processData:!1,beforeSend:function(){$("#imgModalWrap").modal("show"),$("#imgModalWrap").modal({backdrop:"static",keyboard:!1})},success:function(t){if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var a=t.statas,n="",o="";switch(a){case"true":n=t.pathUrls.split(","),o=t.fileNames.split(","),Array.prototype.push.apply(e.expenseImageUrl,n),Array.prototype.push.apply(e.expenseImageName,o),$my.messageInfo.html(t.message).fadeIn("fast").delay("1000").fadeOut("slow");break;case"false":$my.messageInfo.html("上传失败,请重新上传").fadeIn("fast").delay("1500").fadeOut("slow"),s=null,n=[],o=[],$(e.config.uploadWrap).find("li.newUploadImg").remove()}},complete:function(){$("#imgModalWrap").modal("hide")},error:function(t){$("#imgModalWrap").modal("hide"),s=null,$(e.config.uploadWrap).find("li.newUploadImg").remove()}})},!1)},deleteApprover:function(){var e=this,t="";$(e.config.approverWrap).on("click",".nowrap",function(a){a.preventDefault(),a.stopPropagation(),t=$(this).index(),$(e.config.deleteApproverWrap).modal("show")}),e.config.cancleBtn.addEventListener("touchend",function(){$(e.config.deleteApproverWrap).modal("hide")},!1),e.config.confirmBtn.addEventListener("touchend",function(){var a=e.config.approverWrap.querySelectorAll(".nowrap");[].forEach.call(a,function(e,a){t==a&&e.parentNode.removeChild(e)}),$(e.config.deleteApproverWrap).modal("hide")},!1)},deleteOldImg:function(){var e=this,t="";$(e.config.uploadWrap).on("click",".myImg",function(a){a.preventDefault(),a.stopPropagation();var s=e.config.uploadWrap.querySelectorAll(".newUploadImg");t=$(this).index()-s.length,$(e.config.imgModal).modal("show")}),e.config.cancleBtn_img.addEventListener("touchend",function(){$(e.config.imgModal).modal("hide")},!1),e.config.confirmBtn_img.addEventListener("touchend",function(){var a=e.config.uploadWrap.querySelectorAll(".myImg");[].forEach.call(a,function(e,a){t==a&&e.parentNode.removeChild(e)}),$(e.config.imgModal).modal("hide")},!1)},deleteNewImg:function(){var e=this;$(e.config.uploadWrap).on("click","li.newUploadImg",function(t){t.preventDefault(),t.stopPropagation();for(var a=($(this).index(),$(this).children("img").attr("alt")),s=a.substring(0,a.lastIndexOf(".")),n=0,o=e.expenseImageName.length;n<o;n++)e.expenseImageName[n]===s&&(e.expenseImageName.splice(n,1),function(t){(function(){e.expenseImageUrl.splice(t,1)})()}(n));$(this).remove()})},asideEvent:function(){var e=this;e.config.addApprover.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),e.config.menu.getElementsByClassName("content")[0].classList.remove("hide"),e.config.menu.getElementsByClassName("content")[0].classList.add("show"),e.config.menu.querySelector(".subDepart").classList.remove("show"),e.config.menu.querySelector(".subDepart").classList.add("hide"),slideout.open()},!1),e.config.subDepart.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),e.config.menu.getElementsByClassName("content")[0].classList.remove("show"),e.config.menu.getElementsByClassName("content")[0].classList.add("hide"),e.config.menu.querySelector(".subDepart").classList.remove("hide"),e.config.menu.querySelector(".subDepart").classList.add("show"),slideout.open()},!1),e.config.closeBtn.addEventListener("touchend",function(e){e.preventDefault(),e.stopPropagation(),slideout.close()},!1),e.config.closeBtn_subDepart.addEventListener("touchend",function(e){e.preventDefault(),e.stopPropagation(),slideout.close()},!1)},jobNumEvent:function(){var e=this,t=/^[0-9]*$/,a=/^\d{7}$/,s=function(){if(!t.test(this.value))return $my.messageInfo.html("输入不合法").fadeIn("fast").delay("1000").fadeOut("slow"),void(this.value="");if(!a.test(this.value))return void $my.messageInfo.html("请输入7位数字").fadeIn("fast").delay("1000").fadeOut("slow");var s=this.value;$.ajax({url:getRoothPath+"/ddExpenses/userController/expenseUser.do",data:{loginName:s},success:function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var s=a.data;if(!s.length)return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1500").fadeOut("slow");e.config.bankAccount.value=s[0].bankAccount,e.config.accountName.value=s[0].accountName,e.config.accounNumber.value=s[0].accounNumber;break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})};e.config.jobNum.addEventListener("input",e.throttle(s,1500),!1)},expenseAName:function(){var e=this,t=/^[\u4e00-\u9fa5]{0,}$/,a=!0,s=e.config.groupWrap.querySelector("#inGroupWrap"),n=function(){var n=this.value;if(""==n&&(s.innerHTML="",e.config.groupWrap.classList.remove("show"),e.config.groupWrap.classList.add("hide")),a){if(!t.test(n))return void $my.messageInfo.html("请输入中文汉字").fadeIn("fast").delay("1500").fadeOut("slow");n.length>=2&&$.ajax({url:getRoothPath+"/ddExpenses/userController/expenseAName.do",data:{name:n},success:function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=a.data;if(!n.length)return $my.messageInfo.html("返回信息为空,请重新输入").fadeIn("fast").delay("1500").fadeOut("slow"),s.innerHTML="",e.config.groupWrap.classList.remove("show"),void e.config.groupWrap.classList.add("hide");for(var o="",r=0,i=n.length;r<i;r++)o+='<li class="list-group-item" data-accountnameid='+n[r].id+">"+n[r].accountName+"</li>";s.innerHTML=o,e.config.groupWrap.classList.remove("hide"),e.config.groupWrap.classList.add("show");break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})}};e.config.accountName.addEventListener("compositionstart",function(){s.innerHTML="",e.config.groupWrap.classList.remove("show"),e.config.groupWrap.classList.add("hide"),a=!1},!1),e.config.accountName.addEventListener("compositionend",function(){a=!0},!1),e.config.accountName.addEventListener("input",e.throttle(n,1e3),!1),e.config.accountName.addEventListener("blur",function(){s.innerHTML="",e.config.groupWrap.classList.add("hide")},!1)},expenseANameEvent:function(){var e=this,t=e.config.groupWrap.querySelector("#inGroupWrap");$(t).on("touchend","li",function(t){t.preventDefault(),t.stopPropagation(),e.config.groupWrap.classList.remove("show"),e.config.groupWrap.classList.add("hide");var a=this.dataset.accountnameid,s=this.innerHTML;e.config.accountName.value=s,$.ajax({url:getRoothPath+"/ddExpenses/userController/expenseBank.do",data:{id:a},success:function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var s=a.data;if(!s.length)return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1500").fadeOut("slow");e.config.bankAccount.value=s[0].bankAccount,e.config.accounNumber.value=s[0].accounNumber;break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})})},searchApprovalEvent:function(){var e=this,t=!0,a=function(){var a=this.value.trim();t&&(a?$.post(getRoothPath+"/ddExpenses/userController/userLike.do",{name:a},function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var s=a.data;if(!s.length)return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");for(var n="",o=0,r=s.length;o<r;o++)n+='<div class="row my-row" data-departuserid='+s[o].id+">",n+='<div class="col-xs-12 col-sm-12 col-md-12 my-col nowrap">',n+='<span class="departUserName">'+s[o].userName+"-"+s[o].departName+"</span>",n+="</div>",n+="</div>";e.config.departmentWrap.innerHTML=n;break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}):e.getDepart(0))};e.config.searchApprovalInput.addEventListener("compositionstart",function(){t=!1}),e.config.searchApprovalInput.addEventListener("compositionend",function(){t=!0}),e.config.searchApprovalInput.addEventListener("input",e.throttle(a,1e3),!1)},getCompany:function(){var e=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/company.do",success:function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var s=a.data;if(s.length){for(var n="",o=0,r=s.length;o<r;o++)n+='<li class="list-group-item nowrap" data-reimbursementid='+s[o].reimbursementID+">"+s[o].companyName+"</li>";e.config.companyList.innerHTML=n}else e.config.companyList.innerHTML="<span style='font-weight:normal'>暂无公司信息</span>";break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},selectCompany:function(){var e=this;e.config.companyList.addEventListener("click",function(t){var t=t||window.event,a=t.target||t.srcElement;"li"===a.tagName.toLowerCase()&&(e.config.companyID.value=a.innerHTML,e.config.companyID.dataset.reimbursementid=a.dataset.reimbursementid,$("#companyModal").modal("hide"))})},getBusiness:function(){var e=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/business.do",success:function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var s=a.data;if(s.length){for(var n="",o=0,r=s.length;o<r;o++)n+='<li class="list-group-item nowrap" data-businessid='+s[o].departmentID+">"+s[o].departmentName+"</li>";e.config.businessList.innerHTML=n}else e.config.businessList.innerHTML="<span style='font-weight:normal'>暂无事业部信息</span>";break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},selectBusiness:function(){var e=this;e.config.businessList.addEventListener("click",function(t){var t=t||window.event,a=t.target||t.srcElement;"li"===a.tagName.toLowerCase()&&(e.config.business.value=a.innerHTML,e.config.business.dataset.businessid=a.dataset.businessid,$("#businessModal").modal("hide"))})},commonSubDepart:function(){var e=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/commonSubDepart.do",data:{userID:$my.userID},success:function(t){if("{}"===JSON.stringify(t))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(t.status){case"true":var a=t.info;if("{}"===JSON.stringify(a))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var s=a.data;if(s.length){for(var n="",o=0,r=s.length;o<r;o++)n+='<li class="nowrap text-center" data-cdepartmentsubid='+s[o].cDepartmentSubID+">"+s[o].cDepartmentSubName+"</li>";e.config.subDepartWrap.innerHTML=n}else e.config.subDepartWrap.innerHTML="<span style='font-weight:normal'>暂无常用审批项目</span>";break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},sCommonSubDepart:function(){var e=this
;e.config.subDepartWrap.addEventListener("click",function(t){var t=t||window.event,a=t.target||t.srcElement;"li"===a.tagName.toLowerCase()&&(e.config.subDepart.value=a.innerHTML,e.config.subDepart.dataset.subdepartid=a.dataset.cdepartmentsubid,slideout.close())},!1)},_renderSubDepartList:function(e){for(var t="",a=this,s=0,n=e.length;s<n;s++)t+='<div class="row my-row" data-departmentsubid='+e[s].departmentSubID+" data-departmentsubname="+e[s].departmentSubName+">",t+='<div class="col-xs-12 col-sm-12 col-md-12 my-col">',t+="<span>"+e[s].departmentSubName+"</span>",t+="</div>",t+="</div>";$(a.config.subDepartWrapID).append(t),a.touchflag=!1},getsubDepartList:function(e,t){var a=this;$.ajax({url:getRoothPath+"/ddExpenses/userController/subDepartList.do",data:{search:e,pageNum:t,pageSize:pageSize},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var t=e.info;if("{}"===JSON.stringify(t))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");a.dataCount=t.dataCount;var s=t.data;s.length?(s.length<pageSize&&($(".loading").hide(),a.config.loadingWrap.querySelector("#lodingText").classList.remove("lodingText_hide"),a.config.loadingWrap.querySelector("#lodingText").classList.add("lodingText_show")),a._renderSubDepartList(s)):(a.config.subDepartWrapID.innerHTML="",$my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow"),$(".loading").hide());break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},searchSubDepart:function(){var e=this,t=!0,a=function(){var a=this.value.trim();t&&(e.pagenum=0,e.config.loadingWrap.querySelector("#lodingText").classList.remove("lodingText_show"),e.config.loadingWrap.querySelector("#lodingText").classList.add("lodingText_hide"),$(".loading").show(),e.config.subDepartWrapID.innerHTML="",a?e.getsubDepartList(a,0):e.getsubDepartList("",0))};e.config.subDepartInput.addEventListener("compositionstart",function(){t=!1}),e.config.subDepartInput.addEventListener("compositionend",function(){t=!0}),e.config.subDepartInput.addEventListener("input",e.throttle(a,1e3),!1)},scrollEvent:function(){var e=this,t=e.config.loadingWrap.getBoundingClientRect(),a=function(){if(!e.touchflag){if(!(t.top<e.vpHeight&&t.bottom>=0))return;if(e.touchflag=!0,++e.pagenum>parseInt(e.dataCount/pageSize)||e.pagenum==parseInt(e.dataCount/pageSize)&&e.dataCount%pageSize==0)return $(".loading").hide(),e.config.loadingWrap.querySelector("#lodingText").classList.remove("hide"),e.config.loadingWrap.querySelector("#lodingText").classList.add("lodingText_show"),!1;e.getsubDepartList(e.config.subDepartInput.value,e.pagenum)}};e.config.menu.addEventListener("touchmove",e.throttleInput(a,500,1e3))},_getTarget:function(e,t,a){if(-1!==e.className.indexOf(a))return e;if(e==t)return!1;for(;-1===e.className.indexOf(a);)e=e.parentNode;return e},subDepartListEvent:function(){var e=this;e.config.subDepartWrapID.addEventListener("click",function(t){var t=t||window.event,a=t.target||t.srcElement,s=this,n=e._getTarget(a,s,"my-row"),o=n.dataset.departmentsubid,r=n.dataset.departmentsubname;e.config.subDepart.value=r,e.config.subDepart.setAttribute("data-subdepartid",o),slideout.close(),t.stopPropagation(),t.preventDefault()},!1)},init:function(){this.getSessionData(),this.getDetailed(),this.getProductType(),this.getCashierUser(),this.addEvents(),this.calcExpenseTotal(),this.getDepart(0),this.asyncGetDepart(),this.getEpUser($my.userID),this.crumbsEvent(),this.selectEpUser(),this.addImage(),this.deleteApprover(),this.deleteOldImg(),this.deleteNewImg(),this.asideEvent(),this.jobNumEvent(),this.expenseAName(),this.expenseANameEvent(),this.searchApprovalEvent(),this.getCompany(),this.selectCompany(),this.getBusiness(),this.selectBusiness(),this.commonSubDepart(),this.sCommonSubDepart(),this.getsubDepartList("",0),this.searchSubDepart(),this.scrollEvent(),this.subDepartListEvent()}};var approval=new Approval;$(function(){window.$my={messageInfo:$(".messageInfo"),userID:sessionStorage.getItem("ddUserID")},approval.init(),$("#imgModalWrap").on("show.bs.modal",function(){var e=$(this),t=e.find(".modal-dialog");e.css("display","block"),t.css({"margin-top":Math.max(0,($(window).height()-t.height())/2)})}),document.querySelector("#submitBtn").addEventListener("click",approval.throttle(approval.submitEvent,200),!1)});