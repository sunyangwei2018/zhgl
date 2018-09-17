var ui={};
ui.Form = function (json){
	return new uiForm(json)
}

ui.top_up = function(money){
	var json = {};
	json["PayMoney"] = money;
	json["WLDW01"] = userInfo["PCRM_CZY02"];
	json["BM01"] = userInfo["PCRM_BM01"];
	
	window.open("InstantTradePay/formatParamater.do?XmlData="+JSON.stringify(json));
}

ui.tip = function(message,type){
	/*layui.use('layer', function(){
		  var layer = layui.layer;
	});  */
	var icon = "", color="";
	if(ui.isNull(type) || type == "success"){
		icon = "fa-check-circle";
		color = "font_green";
	}else if(type == "error"){
		icon = "fa-times-circle";
		color = "font_red";
	}else if(type == "warning"){
		icon = "fa-exclamation-triangle";
		color = "font_yellow";
	}else if(type == "info"){
		icon = "fa-exclamation-circle";
		color = "font_blue";
	}
	layer.msg(message,{time: 5000, icon:6});
	/*$(".ui_modal").fadeIn();
	$(".ui_modal").click(function(){
		$(this).find("> .ui_message >.ui_message_close").click();
	});
	var ui_message = $("<div class='ui_message'></div>").appendTo($(".ui_modal"));
	var ui_message_close = $("<div class='ui_message_close' title='关闭'>×</div>").appendTo(ui_message);
	ui_message_close.click(function(){
		$(this).closest(".ui_modal").fadeOut();
		$(this).closest(".ui_modal").unbind("click");
		$(this).closest(".ui_message").animate({"margin-top":"0","opacity":"0"},function(){
			$(this).remove();
		});
	});
	var ui_message_main = $("<div class='ui_message_main'></div>").appendTo(ui_message);
	ui_message_main.addClass(color);
	//style='word-wrap: break-word'
	ui_message_main.append("<span ><i class='fa "+icon+"'></i>"+message+"</span>");
	ui_message.animate({"margin-top":"35px","opacity":"1"});*/
}

ui.formatDate = function(addDay,time){ 
	var d=new Date();
	d.setDate(d.getDate()+addDay*1);//当前日期+几天
	var str=''; 
	var FullYear = d.getFullYear();
	var Month = d.getMonth()+1<10?'0'+(d.getMonth()+1):d.getMonth()+1;
	var Day = d.getDate()<10?'0'+d.getDate():d.getDate();
	var Hours = d.getHours()<10?'0'+d.getHours():d.getHours();
	var Minutes = d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
	var Seconds = d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds();
	str +=FullYear+'-'; //获取当前年份 
	str +=Month+'-'; //获取当前月份（0——11） 
	if(time==1){
		str +=Day;
	}else if(time==2){
		str +=Day+' '; 
		str +=Hours+':'; 
		str +=Minutes+':'; 
		str +=Seconds; 
	}
	return str; 
} 

ui.isNull = function(str){
	if(typeof str == "undefined"){
		return true;
	}else if(str == null){
		return true;
	}else if(typeof str == "string" && (str === "" || str === "undefined" || str === "null")){
		return true;
	}else if(typeof str == "object" && $.isArray(str) && str.length == 0){
		return true;
	}else if(typeof str == "object" && $.isEmptyObject(str)){
		return true;
	}else{
		return false;
	}
}
ui.isString = function(str){
	if( typeof str == "string" )
		return true;
	else
		return false;
}

ui.changeClass = function(obj,o,n){
	$(obj).removeClass(o);
	$(obj).addClass(n);
}

ui.ajax = function(json){
	var contentType = ui.isNull(json.contentType) ? "" : json.contentType;
	var async = ui.isNull(json.async) ? false : true;
	var callback = ui.isNull(json.callback) ? null : json.callback;
	var global = ui.isNull(json.global) ? true : false;
	var type = ui.isNull(json.type) ? "POST" : "GET";
	var data = ui.isNull(json.data) ? {} : json.data;
	data["sid"]=Math.random();
	var src = ui.isNull(json.src) ? pubJson.FormUrl : json.src;
	var url = ui.isNull(json.url) ? "" : json.url;
	
	var ajaxJson = {};
	if(contentType!="")ajaxJson["contentType"]=contentType;
	ajaxJson["async"]=async;
	ajaxJson["global"]=global;
	ajaxJson["type"]=type;
	ajaxJson["url"]=src+url;
	ajaxJson["data"]=data;
	ajaxJson["success"]=function(data) {
		try {
			returnData = JSON.parse(data);
			if(callback!=null && typeof callback == "function"){
				callback(returnData);
			}
		} catch (e) {
			if(data.indexOf("未登录") != -1){
				alert("请重新登录");
				window.location.href="login.html";
				return false;
			}
			data = data.replace(/Exception: java.lang.Exception:/gm,'操作失败: ')
			ui.tip(data, "error");
		}
	};
	ajaxJson["error"]=function(XMLHttpRequest,B,C,D) {
		var tips = "";
		if(XMLHttpRequest.status == 404){
			tips = "服务器连接失败";
		}else if(XMLHttpRequest.status == 500){
			tips = "服务器内部错误";
		}else{
			tips = XMLHttpRequest.statusText;
		}
		ui.tip(tips, "error");
	};
	
	var returnData=null;
	$.ajax(ajaxJson);
	return returnData;
}

ui.download = function (url, data, method) {
	if (url && data) { // data 是 string 或者 array/object
		$("[data-download]").remove();
		var iframe = $("<iframe>");
		iframe.attr("data-download","true");
		iframe.css("display","none");
		iframe.appendTo("body");
		var form = $("<form>");
		form.attr("id", "downloadForm");
		form.attr("action", url);
		form.attr("method", (method || 'post'));
		//form.attr("enctype","multipart/form-data")
		//form.attr("accept-charset","UTF-8");
		form.appendTo(iframe.contents().find("body"));
		$.each(data, function (key,value) {
			var input = $("<input>");
			input.attr("type", "hidden");
			input.attr("name", key);
			input.val(value);
			input.appendTo(form);
	    });
		form.submit();
		//iframe.remove();
	};
}

ui.getFormURL = function(bdbh){
	var json = {};
	json["src"] = "form/getFormURL.do?bdbh="+bdbh; 
	var resultData = ui.ajax(json);
	if(resultData != null){
		resultData = resultData.data;
	}
	return resultData;
}

ui.disabledClass = function(selector,disabled){
	if(disabled){
		$(selector).addClass("none");
		$(selector).attr("disabled","disabled");
	}else{
		$(selector).removeClass("none");
		$(selector).removeAttr("disabled");
	}
}

//IFrame重新加载高度
ui.resizeIFrame = function(obj){
	var iframe= $(obj);
	var iframeName= $(obj).attr("name");
    var innerHTML = eval("document."+iframeName) ? eval("document."+iframeName).document : iframe.contentDocument;
    if(iframe != null && innerHTML != null) {
    	$(obj).height(innerHTML.body.scrollHeight);
	}
}

ui.formatString = function(value){
	if( typeof value == "string" 
		&& value.indexOf("key") != -1  
		&& value.indexOf("value") != -1 ){
		value = JSON.parse(value)["key"];
	}else if( typeof value == "object" ){
		value = value["key"];
	}
	return value;
}
ui.formatObject = function(value){
	if( typeof value == "string"){ 
		if( value.indexOf("key") != -1 && value.indexOf("value") != -1 ){
			value = JSON.parse(value);
		}else if( value.indexOf("KEY") != -1 && value.indexOf("VALUE") != -1 ){
			value = JSON.parse(value);
		}else if( value.indexOf("key") == -1 && value.indexOf("value") == -1 ){
			value = {"key":value,"value":value};
		}
	}
	return value;
}
ui.formatArray = function(value){
	if( typeof value == "string"){ 
		if( value.indexOf("[") != -1 && value.indexOf("]") != -1 ){
			value = JSON.parse(value);
		}else{
			value = [];
		}
	}
	return value;
}

ui.loading = function(state){
	if(state){
		$(".ui_loading").show();
	}else{
		$(".ui_loading").fadeOut();
	}
}

ui.light = function(obj){
	$(obj).addClass("box_shadow_show");  
	var top = $(obj).offset().top - 200;
	$("body,html").animate({scrollTop:top},1000);  
	setTimeout(function(){
		$(obj).removeClass("box_shadow_show");  
	},3000);  
}
ui.isEmail = function(obj,value){
	var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/; //,//邮箱
	if(!regEmail.test(value) && !ui.isNull(value)){
		ui.tip("Email格式错误！");
		ui.light(obj); 
		return false;
	}
	return true;
}
ui.isPhone = function(obj,value){
	var regMobile = /^0?1[3|4|5|7|8][0-9]\d{8}$/; //手机
	if(!regMobile.test(value) && !ui.isNull(value)){
		ui.tip("手机号码格式错误！");
		//ui.light(obj); 
		return false;
	}
	return true;
}
ui.isNumber = function(obj,value){
    if(isNaN(value)){
        ui.tip("请输入正确的数字");
		ui.light(obj); 
		return false;
    }
	return true;
}

ui.globalTinyBox = {
	open: function(modalURL,modalField,show){
		/**
		$(".ui_modal > .modal_main").empty();
	    $(".ui_modal > .modal_main").load(modalURL);
	    if(!ui.isNull(show) && show){
	    	ui.changeClass($(".ui_modal"), "opacity_1", "opacity_0");
	    }
    	$(".ui_modal").fadeIn();
    	**/
    	
		var ui_modal = $("<div class='ui_modal'></div>").appendTo($("body:first"));
		ui_modal.fadeIn();
    	var ui_modal_main = $("<div class='ui_modal_main' style='opacity: 1; margin-top: 35px;'></div>").appendTo(ui_modal);
    	var modal_close = $("<div class='modal_close'></div>").appendTo(ui_modal_main);
    	modal_close.click(function(){
    		ui.globalTinyBox.close();
    	});
    	var modal_main = $("<div class='modal_main'></div>").appendTo(ui_modal_main);
    	
    	modal_main.load(modalURL);
    	
    	ui_modal_main.removeClass("hide");
    	ui_modal_main.animate({"margin-top":"35px","opacity":"1"});
    	
	},close: function(){
		$(".ui_modal").fadeOut();
		$(".ui_modal_main").animate({"margin-top":"0","opacity":"0"},function(){
			$(".ui_modal_main").remove;
		});
	}
}

ui.changePrintTmp = function(obj,dymb,bdbh,jlbh,XmlData){
	var dybh=$(obj).val();
	var url="formPrint/findFormPrint.do?dybh="+dybh+"&dymb="+JSON.stringify(dymb)+"&jlbh="+jlbh+"&bdbh="+bdbh+"&XmlData="+JSON.stringify(XmlData).replace(/%/gm,"%25").replace(/&/gm,"%26");
	location.href=url;
}
ui.print = function(dybh,data){
	sessionStorage["PRINT_DATAS"] = JSON.stringify(data);
	window.open("print.html?dybh="+dybh);
}

//页面间通过URL传值 
$.getUrlParam = function(name)
	{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) 
		return decodeURI(r[2]); 
		return null;
}

//获取中文拼音首字母
ui.convertToPinYin=function(str){
	return makePy(str);
}

ui.initPlugIn = function(obj, key, value){
	obj.empty();
	try{//引入及控件JS
		if(!ui.isNull(value["jlid"]) && $("script[src$='"+value["jlid"]+".js']").length==0){
			var rid = Math.random();
			var src = $("script[src*='JLForm.js']").attr("src");
			src = src.replace("form", "pub");
			src = src.replace("JLForm", value["jlid"]);
			$(document).find("body").append("<script type='text/javascript' src='"+src+"?rid="+rid+"'><\/script>");
		}
		var JLID = eval(value["jlid"]);
		var rid = Math.random();
		if(!ui.isNull(JLID)){
			if(JLID["version"] == 2){
				var json = {};
				json["obj"] = obj;
				json["zdid"] = key;
				json["value"] = value["value"];
				json["config"] = value;
				JLID.init(json);
			}
		}
	}catch(e){
		console.info("字段名为"+key+"的控件报错信息为:"+e.message);	
	}
}

//页面存url
ui.setUrlParam=function(val){
	var obj ={};
	obj["url"]=val;
	ui["UrlParam"]=obj;
}

//页面间通过URL传值 
ui.getUrlParam=function(paramName){
	var paramValue = null;  
	var url=ui.UrlParam==undefined?"":ui.UrlParam["url"];
	if (url.indexOf("?") > 0 && url.indexOf("=") > 0) {  
		arrSource = unescape(url).substring(url.indexOf("?")+1, url.length).split("&"), i = 0; 
		while (i < arrSource.length)
			{
				if(arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()){
					paramValue = arrSource[i].split("=")[1];
				}
				i++;
			}  
	}  
	return paramValue;  
}


ui.alert = function(str,i){
	var info=["info","error","question","warning"];
	if(ui.isNull(i)){
		$.messager.alert('信息',str);
	}else{
		if(i>info.length||i<0){
			$.messager.alert('信息','请选择优先级',info[1]);
		}else{
			$.messager.alert('信息',str,info[i]);
		}
	}
	
}

ui.cookie = function(str,str1){//客户端缓存
	if(ui.isNull(str1)){
		
		return sessionStorage[str];
	}else{
		
		sessionStorage[str]=str1;//针对一个 session 的数据存储浏览器关闭session失效
	}
}

ui.cookieLocal = function(str,str1){//客户端缓存
	if(ui.isNull(str1)){
		return localStorage[str];
	}else{
		localStorage[str]=str1;//没有时间限制的数据存储
	}
}

//遮罩层
ui.mask = function(obj){
	/*z-index:20000;background-color:gray;opacity:0.2;*/
	div=$('<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(1,1,1,0.2);"></div>');
	div.hide();
	obj.append(div);
	this.showMask = function(){
		div.show();
	};
	this.closeMask = function(){
		div.hide();
	}
}

ui.getpeopname = function(str){
	var XmlData = [];
	var queryField={};
	queryField["dataType"] = "Json";
	queryField["sqlid"] = "Pub.selectPEOPNAME";
	queryField["CFRY01"] = str;
	queryField["DataBaseType"] = "tms";
	XmlData.push(queryField);
	var ajaxJson = {};
	ajaxJson["src"] = "jlquery/select.do";
	ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
	var resultData = ui.ajax(ajaxJson).data;
	return resultData[0].peop_name;
}

ui.adtip = function(message,type){
	var icon = "", color="";
	if(ui.isNull(type) || type == "success"){
		icon = "fa-check-circle";
		color = "font_green";
	}else if(type == "error"){
		icon = "fa-times-circle";
		color = "font_red";
	}else if(type == "warning"){
		icon = "fa-exclamation-triangle";
		color = "font_yellow";
	}else if(type == "info"){
		icon = "fa-exclamation-circle";
		color = "font_blue";
	}
	
	$(".ui_admodal").fadeIn();
//	$(".ui_admodal").click(function(){
//		$(this).find("> .ui_message >.ui_message_close").click();
//	});
	var ui_message = $("<div class='ui_message'></div>").appendTo($(".ui_admodal"));
	var ui_message_close = $("<div class='ui_message_close' title='关闭'>×</div>").appendTo(ui_message);
	var h2 =$("<h2 style='text-align:center'>"+JSON.parse(message).title+"</h2><hr/>").appendTo(ui_message);
	var div =$('<div style="position: absolute;margin-top: -30px;" class="ml_w10">'+JSON.parse(message).lrrq+'</div>').appendTo(ui_message);
	ui_message_close.click(function(){
		$(this).closest(".ui_admodal").fadeOut();
		$(this).closest(".ui_admodal").unbind("click");
		$(this).closest(".ui_message").animate({"margin-top":"0","opacity":"0"},function(){
			$(this).remove();
		});
	});
	var ui_message_main = $("<div class='ui_message_main'></div>").appendTo(ui_message);
	ui_message_main.addClass(color);
	//style='word-wrap: break-word'
	ui_message_main.append("<p style='text-indent: 2em;'>"+JSON.parse(message).main+"</p>");
	ui_message.animate({"margin-top":"35px","opacity":"1"});
}


//显示图片
ui.showImg = function(message){
	$(".ui_modal").fadeIn();
	var deg =0;
	$(".ui_modal").click(function(){
		deg -= 90;
		$(this).find("> .ui_message >.ui_message_close").click();
		return false;
	});
	var ui_message = $("<div class='ui_message'></div>").appendTo($(".ui_modal"));
	ui_message.click(function(){
		if(deg==360){
			deg=90;
		}else{
			deg+=90;
		}
		//旋转90度
		$(this).css("transform","rotate("+deg+"deg)");
		$(this).css("-ms-transform","rotate("+deg+"deg)");
		$(this).css("-moz-transform","rotate("+deg+"deg)");
		$(this).css("-webkit-transform","rotate("+deg+"deg)");
		$(this).css("-o-transform","rotate("+deg+"deg)");
		return false;
	});
	var ui_message_close = $("<div class='ui_message_close' title='关闭'>×</div>").appendTo(ui_message);
	ui_message_close.click(function(){
		$(this).closest(".ui_modal").fadeOut();
		$(this).closest(".ui_modal").unbind("click");
		$(this).closest(".ui_message").animate({"margin-top":"0","opacity":"0"},function(){
			$(this).remove();
		});
	});
	var ui_message_main = $("<div class='ui_message_main'></div>").appendTo(ui_message);
	$("<img src="+message+" style='width:100%'></img>").appendTo(ui_message_main);
	ui_message.animate({"margin-top":"200px","opacity":"1"});
}

/*获取当前用户特殊权限*/
ui.ryxx_qx = function(qxcode){
	var XmlData = [];
	var ajaxJson = {};
	var queryField ={};
	queryField["dataType"] = "Json";
	queryField["sqlid"] = "Pub.selectRYTSQX";
	queryField["CFRY01"] = userInfo.USERID;
	queryField["qxcode"] = qxcode;
	XmlData.push(queryField)
	ajaxJson["src"] = "jlquery/select.do";
	ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	return ui.isNull(ui.ajax(ajaxJson).data[0])?{}:ui.ajax(ajaxJson).data[0];
}

//延迟1000/秒
ui.sleep = function(time){
	var t = +new Date();
	//运行xx秒 
	while(true) { 
		if(+new Date() - t > time) { 
			break; 
		} 
	}
}

ui.checkLoginOut = function(){
	//var userInfo = JSON.parse($.cookie("userInfo"));
//	$.ajaxSetup({
//		cache:false,
////		complete:function(XMLHttpRequest,textStatus,e){
////			
////		}
//	});
	//$(document).ajaxStop(function(evt, request, settings){
		
		var ajaxJson = {};
		var XmlData = [];
		var queryField={};
		queryField["CZY01"] = ui.isNull(userInfo)?"":userInfo.USERID;
		queryField["sessionId"] = ui.isNull(localStorage.getItem("sessionId"))?"":localStorage.getItem("sessionId");
		if(!ui.isNull(queryField.CZY01)&&!ui.isNull(queryField.sessionId)){
			ajaxJson["global"] = false;
			ajaxJson["src"] = "/user/checkLoginOut.do?rid="+Math.random();
			ajaxJson["data"] = {"json" :JSON.stringify(queryField)}
			returnData = ui.ajax(ajaxJson).data;
			if(returnData.status==false){
				sessionStorage.setItem("dlxx", "账号已在其他地方登录");
				$.cookie("userInfo", null);
				$.cookie("pubJson", null);
				window.location.href="login.html";
			}			
		}

	//});
}

ui.subpsis = function(str,index){
	if(str.length>index){
		return str.substring(0,index)+"...";
	}else{
		return str;
	}
}

ui.addTabs = function(name,url){
	$("#navTab").tabs('add',{
		showHeader:true,
	    title:name,
	    //fit:true,
	    //content:'<iframe frameborder="0" id="contentIfram" width="100%" height="100%" src ="'+node.attributes.url+"?rid="+rid+'" scrolling="no"></iframe>',
	    href:url,//node.attributes.url+"?rid="+rid,
	    closable:true,
	    tools:[{
	    	iconCls:'icon-reload',//'icon-mini-refresh',    
	        handler:function(){
	        	var pp = $("#navTab").tabs('getSelected');//选中的选项卡对象 
	        	var content = pp.panel('options');//获取面板内容 
	        	$("#navTab").tabs('update',{//更新
	        	    tab:pp,
	        	    options:"dfd"
	        	})
	        	// 调用 'refresh' 方法更新选项卡面板的内容
	        	var tab = $('#navTab').tabs('getSelected');  
	        	// 获取选择的面板
	        	tab.panel('refresh', tab.panel('options').href);

	        }    
	    }],
	});
	//选择新增活页
	$("#navTab").tabs('select',name);
}

ui.closeSelectedTab = function (){
	var tab = $('#navTab').tabs('getSelected');
	var index = $('#navTab').tabs('getTabIndex',tab);
	$("#navTab").tabs("close",index)
}