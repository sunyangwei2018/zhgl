var idex =0;
//window.onbeforeunload = function(event) {
//
//	//return ("确认关闭吗？");
//	//event.returnValue="确认关闭吗";
//	return event.returnValue;
//}
//
//
//
//window.onunload = function(event){
//	return event.returnValue;
//}

function viewFullScreen(docElm){
	if (docElm) {
		docElm.bind("click",function(){
			var docElm = document.documentElement;
			if (docElm.requestFullscreen) {
	            docElm.requestFullscreen();
	        }
	        else if (docElm.msRequestFullscreen) {
	            docElm.msRequestFullscreen();
	        }
	        else if (docElm.mozRequestFullScreen) {
	            docElm.mozRequestFullScreen();
	        }
	        else if (docElm.webkitRequestFullScreen) {
	            docElm.webkitRequestFullScreen();
	        }
		})
	}
}

function scrollNews(obj){ 
	var $self = obj.find("ul:first"); 
	var lineWidth = $self.find("li:first").width(); 
	$self.animate({ "margin-left" : -lineWidth +"px" },600 , function(){ 
		$self.css({"margin-left":"0px"}).find("li:first").appendTo($self); 
	}); 
}
    
$(document).ready(function(){
	if(userInfoCookie == null || userInfoCookie == "{}" || userInfoCookie == "{}" ){
		window.location.href="login.html";
		return false;
	}
	
	// 登录用户信
	$(".badge-prompt").empty();
	$(".badge-prompt").append(userInfo.USERNAME+'<i class="badge color-important">10</i>');
	$("#left_user").empty();
	$("#left_user").append(ui.subpsis(userInfo.USERNAME,2)+'<i class="badge color-important">10</i>');
	$("#nowczy").text(userInfo.USERNAME);
	//viewFullScreen($("#timer"));
	$("#timer").trigger("click");
	
	
	
	
	
	/*var XmlData=[];
	var queryField={};
	queryField["dataType"] = "Json";
	queryField["sqlid"] = "Pub.selectAD";
	queryField=$.extend({}, queryField);
	XmlData.push(queryField);
	var ajaxJson={};
	ajaxJson["type"] = true;
	ajaxJson["callback"] = function(resultdata){
		var data = resultdata.data;
		var size = data.length;
		var obj=data[idex];
		$('#AD').find("ul").empty();
		$.each(data,function(i,obj){
			var li = $('<li>'+(i+1)+"、"+obj.title+'。</li>');
			li.bind("click",function(o){
				ui.adtip(JSON.stringify(obj));
			})
			$('#AD').find("ul").append(li);
		});
		data = null;
		window.setInterval("scrollNews($('#AD'))", 5000);
	};
	ajaxJson["src"] = "jlquery/select.do";
	ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	ui.ajax(ajaxJson);*/

function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return 0;
}
function delCookie(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
	var date = new Date(); 
	date.setTime(date.getTime() - 10000); 
	document.cookie = name + "=a; expires=" + date.toGMTString(); 
	} 
	if(getCookie("messages")!=0 && userInfo.WD01!='3101' && userInfo.WD01!='9000'){
		delCookie("messages");
		//到付数量
		var ajaxJson1={};
		ajaxJson1["src"] = "user/getCounts.do?wd="+userInfo.WD01;
		var result=ui.ajax(ajaxJson1); 
		$('#message_p1').panel({title: "上周已审核现金/到付运单明细已出，本网点共"+result.data.xjnum+"票现金，"+result.data.dfnum+"票到付，请点击下载查看明细。"});
		$('#message_p2').panel({title: "本网点未查看赔款信息"+result.data.pkdnum+"条(5天内未下载查看，默认本网点服从赔款处罚)。"});
		if((result.data.xjnum<=0 || result.data.dfnum<=0) && result.data.pkdnum<=0){
			$("#message_dialog").dialog("close");
		}else if(result.data.pkdnum>0){
			if(result.data.xjnum<=0 && result.data.dfnum<=0){
				document.getElementById("down_btn1").style.visibility="hidden"
			}else{
				document.getElementById("down_btn1").style.visibility="visible";
			}
		}
	}else{
		$("#message_dialog").dialog("close");
	}
	
	
	window.setInterval(function(){
		$("#timer").text((new Date()).toLocaleString());
		
	}, 1000);
//	setInterval(function(){//9分钟刷新session
//		var ajaxJson={};
//    	ajaxJson["src"] = "user/refSession.do?rid="+Math.random();
//    	//ajaxJson["data"] = {"json":JSON.stringify(json)};
//    	ui.ajax(ajaxJson); 
//	}, 9*60*1000)
	
	
	$("#logout").bind("click",function(){//注销
		var ajaxJson={};
    	ajaxJson["src"] = "user/logout.do?rid="+Math.random();
    	ui.ajax(ajaxJson); 
		$.cookie("userInfo", null);
		$.cookie("pubJson", null);
		sessionStorage.setItem("login", null);
		window.location.href="login.html";
	});
	
	
	//选项卡初始化
	$("#navTab").tabs({
		//width:"100%",
		//height:"100%",
		/*title:'adfds',
	    border:false,
	    href:'BM.html',
	    onSelect:function(title){    
	    	alert(title);
	    }*/
		//pill: true,
		//fit:true,
		onLoad:function(panel){
			debugger;
			if(panel.data().panel.options.title=="首页"){
				return true;
			}
			var url = panel.data().panel.options.href;
			//跨页面传参数
			var pageParam = panel.data().panel.options.pageParam;
			var name = url.split("/");
			name = name[name.length-1];
			var end = url.indexOf(name);
			var path = url.substr(0,end);
			name = name.split(".html")[0];
			panel.attr("page",name);
			try{
				var rid = Math.random();
				$("script[src*='"+name+".js']").remove()
				$(document).find("body").append("<script type='text/javascript' src='"+path+name+".js?rid="+rid+"'><\/script>");
				//$(document).find("body").append("<script type='text/javascript' src='"+path+name+".js'><\/script>");
				var uiform = eval(name);
				//panel.attr("onkeydown",""+name+".loadKeyListenr(event);")//加载按键事件
				var pp=$('#navTab').tabs('getSelected');
				$.each(JSON.parse(localStorage.getItem("MENU")),function(i,val){
					if(pp.panel('options').code==val.CD||pp.panel('options').code.getpid()==val.CD){
						uiform.setBtnParam(JSON.parse(val.ALQX));
					}
				})
				//uiform.setUrlParam("url",url);
				uiform.setTab(panel); 
				uiform.getTab().attr('tabindex', 0).focus();
				var json = {};
				uiform.setData(ui.isNull(pageParam)?{}:pageParam);
				uiform.initForm(json);
			}catch(e){
				console.log("error:"+e.message);
			}
		}
	});
	
	$("#navTab").tabs('add',{
		showHeader:true,
	    title:'我的待办',
	    code:'0301',
	    //fit:true,
	    //content:'<iframe frameborder="0" id="contentIfram" width="100%" height="100%" src ="'+node.attributes.url+"?rid="+rid+'" scrolling="no"></iframe>',
	    href:'/workflow/WORKBENCH.html?rid='+Math.random(),//node.attributes.url+"?rid="+rid,
	    iconCls:'icon-house'
	});
});




$(document).keydown(function(e){
	if(e.keyCode==9){
		//e.preventDefault();
	}
});

