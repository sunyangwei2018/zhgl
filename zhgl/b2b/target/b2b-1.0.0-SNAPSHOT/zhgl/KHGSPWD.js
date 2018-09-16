var KHGSPWD = ui.Form();
KHGSPWD.setPlugin({
	
})

//定义方法
KHGSPWD.define({
	"save" : function(){
		if(ui.isNull(KHGSPWD.getTab().find("#person_id").textbox("getValue").trim())){
			ui.alert("请输入账号");
			return;
		}
		if(ui.isNull(KHGSPWD.getTab().find("#password1").textbox("getValue").trim())){
			ui.alert("请输入新密码");
			return;
		}
		if(ui.isNull(KHGSPWD.getTab().find("#password").textbox("getValue").trim())){
			ui.alert("请输入确认密码");
			return;
		}
		if(KHGSPWD.getTab().find("#password1").textbox("getValue").trim() != KHGSPWD.getTab().find("#password").textbox("getValue").trim()){
			ui.alert("2次密码不一致");
			return;
		}
		
		var XmlData=[{"person_id":KHGSPWD.getTab().find('#person_id').textbox('getValue'),"password":KHGSPWD.getTab().find('#password').textbox('getValue')}];
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
		}else{
			ui.alert("账号不存在");
		}
	}
});

//加载完成
KHGSPWD.setAfterInit(function() {
	/*KHGSPWD.getTab().find("#person_id").textbox("setValue",userInfo.USERID);
	if(userInfo.USERID!='admin'){
		KHGSPWD.getTab().find("#person_id").textbox("readonly");
	}*/
})
