
$(document).ready(function(){
	var bkim;
	bkim = '/images/login-background'+parseInt(parseInt(Math.random()*(10-1))+1)+'.jpg';
	//bkim = '/images/login-background-yx.jpg';
	//$("#login_back").css("background-image","url("+bkim+")");
	$("#login_back").css("background-image","url(/images/beij.jpg)");
	//异地登录提示
	if(!ui.isNull(sessionStorage.getItem("dlxx"))){
		loginTip("账号已在其他地方登录");
		sessionStorage.setItem("dlxx","");
	}
	login.createCode();
	$("#yzm").click(function(){
		login.createCode();
	});
    if(!ui.isNull(sessionStorage.getItem("login"))){
    	$(".yzm").show();
    }
})

//登录界面enter事件
document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==13){ // enter 键
//		$('#ff').form('submit',{
//			onSubmit:function(){
//				return $(this).form('enableValidation').form('validate');
//			}
//		});
		//if($("#ff").form('enableValidation').form('validate')){
			login.formLogin();
		//}
		
	}
};

$("#login").click(function(){
	login.formLogin();
});

$("#register").click(function(){
	window.location.href = "/ZC.html";
});

var loginTip = function(str){
	$("#tip").hide().slideDown().html(str);
}

//登录对象
var login = {};
login.formLogin = function(){
	var CZY01 = $("#username").val().trim();
	var CZY02 = $("#pwd").val().trim();
	if($(".yzm:visible").length==1){
		var yzmz = $("#yzmz:visible").val().trim();
		if(ui.isNull(yzmz)){
			loginTip("请输入验证码");
			$("#yzmz").focus();
			return false;
		}else if(yzmz!=$("#yzm:visible").val().trim()){
			loginTip("验证码错误请区分大小写");
			$("#yzmz").focus();
			return false;
		}
	}else{
		if(ui.isNull(CZY01)){
			loginTip("用户名不能为空");
			return false;
		}else if(ui.isNull(CZY02)){
			loginTip("密码不能为空");
			return false;
		}
	}
	var userInfoCookie = $.cookie("userInfo");
	var userInfo = JSON.parse(userInfoCookie);
	
	var json={};
	json["CZY01"]=CZY01;
	json["CZY02"]=CZY02;
	if(!ui.isNull(localStorage.getItem("sessionId"))){
		json["sessionId"] = localStorage.getItem("sessionId");
	}
	
	var ajaxJson = {};
	
	//判断分正常关闭浏览器清除session
//	if(ui.isNull(userInfo)){
//		var CZY01 = $("#username").textbox("getText").trim();
//    	ajaxJson["src"] = "user/deletSession.do?rid="+Math.random();
//    	ajaxJson["data"] = {"json":JSON.stringify(json)};
//    	json["CZY01"]=CZY01;
//    	ui.ajax(ajaxJson); 
//	}
	
	ajaxJson["src"] = "user/login.do?rid="+Math.random();
	ajaxJson["data"] = {"json":JSON.stringify(json)};
	var resultData = ui.ajax(ajaxJson); 
	if(!ui.isNull(resultData)){
		resultData = resultData.data;
		if(resultData["STATE"] === 0){
			loginTip("登录失败！用户名或密码错误");
			$(".yzm").show();
			sessionStorage.setItem("login", false);
		}else if(resultData["STATE"] === 1){
			if(ui.isNull(resultData["userInfo"])){
				loginTip("未经授权");
				$(".yzm").show();
				sessionStorage.setItem("login", false);
				return false;
	    	}else{
	    		//登录唯一标识
	    		localStorage.setItem("sessionId",resultData["sessionId"]);
	    		login.saveUserInfoCookies(resultData["userInfo"]);
	    		login.savePubJsonCookies(resultData["pubJson"]);
	    		if(typeof(afterLogin)=='function'){
	    			afterLogin($("#CZY01").val());
	    		}  
	    		if(resultData["MSGID"] == "E"){
	    			loginTip(resultData["MESSAGE"]);
	    		}
	    		location.href=location.href.replace("login","index_left");
	    	}
		}if(resultData["STATE"] === 2){
			loginTip("账号已在其他地方登录");
			$(".yzm").show();
			sessionStorage.setItem("login", false);
		}
	}
	resultData = null;
}

login.saveUserInfoCookies = function(resultData){
	var userData = {};
	/*userData["PCRM_CZY01"] = resultData["USERID"];
	userData["PCRM_CZY02"] = resultData["CZY01"];
	userData["PCRM_CZY03"] = resultData["CZY03"];
	userData["PCRM_GW01"] = resultData["GW01"];
	userData["PCRM_GW02"] = resultData["GW02"];
	userData["PCRM_BM01"] = resultData["BM01"];
	userData["PCRM_BM02"] = resultData["BM02"];
	userData["PCRM_BM03"] = resultData["BM03"];
	userData["PCRM_BM_BM01"] = resultData["BM_BM01"];
	userData["PCRM_GSXX01"] = resultData["GSXX01"];*/
	userData=resultData;
	userData["UPDATETIME"] = ui.formatDate(0,1);
	$.cookie("userInfo", null);
	$.cookie("userInfo", JSON.stringify(userData));
	$.cookie("messages", null);
	$.cookie("messages", JSON.stringify(userData.mess_data));
	var ajaxJson={};
	var CZY01 = $("#username").val().trim();
	ajaxJson["src"] = "CX/selectALQX.do?rid="+Math.random();
	ajaxJson["data"] = {"XmlData":"{\"CFRY01\":\""+userData.USERID+"\"}"};
	var MENU=ui.ajax(ajaxJson).data.mapList; 
	localStorage.setItem("MENU",JSON.stringify(MENU));
	localStorage.setItem("dlrq",ui.formatDate(0,1));
	userData =null;
	MENU = null;
}

login.savePubJsonCookies = function(resultData){
	$.each(resultData ,function(key,value){
		if(key.indexOf("Url")!=-1 && value.indexOf("http")==-1) 
			resultData[key] = location.protocol+"//"+location.hostname+value;
	});
	$.cookie("pubJson", null);
	$.cookie("pubJson", JSON.stringify(resultData));
}


login.createCode=function(){       
    var code = "";      
    var codeLength = 6;
    var selectChar = new Array(1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','j','m','n','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');      
    for(var i=0;i<codeLength;i++) {
       var charIndex = Math.floor(Math.random()*54);      
      code +=selectChar[charIndex];
    }      
    if(code.length != codeLength){      
    	login.createCode();      
    }
    login.showCheck(code);
}

login.showCheck=function(code){
//	  var c = document.getElementById("yzm");
//	  var ctx = c.getContext("2d");
//		ctx.clearRect(0,0,1000,1000);
//		ctx.font = "80px 'Microsoft Yahei'";
//		ctx.fillText(code,0,100);
//		ctx.fillStyle = "red";
		$("#yzm").val(code);
}



     