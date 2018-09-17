var CZYPWD = ui.Form();
CZYPWD.setPlugin({
	
})

//定义方法
CZYPWD.define({
	"save" : function(){
		if(ui.isNull(CZYPWD.getTab().find("#person_id").textbox("getValue").trim())){
			ui.alert("请输入账号");
			return;
		}
		if(ui.isNull(CZYPWD.getTab().find("#password1").textbox("getValue").trim())){
			ui.alert("请输入新密码");
			return;
		}
		if(ui.isNull(CZYPWD.getTab().find("#password").textbox("getValue").trim())){
			ui.alert("请输入确认密码");
			return;
		}
		if(CZYPWD.getTab().find("#password1").textbox("getValue").trim() != CZYPWD.getTab().find("#password").textbox("getValue").trim()){
			ui.alert("2次密码不一致");
			return;
		}
		
		var XmlData=[{"person_id":CZYPWD.getTab().find('#person_id').textbox('getValue'),"password":CZYPWD.getTab().find('#password').textbox('getValue')}];
		var ajaxJson = {};
		ajaxJson["src"] = "UserInfo/updateMM.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultdata = ui.ajax(ajaxJson).data;
		if(resultdata.status==1){
			ui.alert("操作成功");
			if(userInfo.USERID!='admin'){
			$.cookie("userInfo", null);
			window.location.href="/login.html";
			}
		}
	}
});

//加载完成
CZYPWD.setAfterInit(function() {
	CZYPWD.getTab().find("#person_id").textbox("setValue",userInfo.USERID);
	if(userInfo.USERID!='admin'){
		CZYPWD.getTab().find("#person_id").textbox("readonly");
	}
})
