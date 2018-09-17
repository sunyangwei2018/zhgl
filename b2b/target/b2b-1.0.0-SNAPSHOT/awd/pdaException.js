var pdaException = ui.Form();
var ydxs;


pdaException.setPlugin({
})

pdaException.define({
	// 定义保存按钮方法
	"save" : function() {
		var tab = pdaException.getTab().find('#entry_content-tabs').tabs('getSelected');
		var index = pdaException.getTab().find('#entry_content-tabs').tabs('getTabIndex',tab);
		if (index==0){
			var billno=pdaException.getTab().find("#billno").textbox('getValue').trim();
			var boxes=pdaException.getTab().find("#boxes").textbox('getValue').trim();
			var content=pdaException.getTab().find("#content").textbox('getValue').trim();
			if (billno=='') {
				ui.alert("请填写运单号！");
				return false;
			}
			if (boxes=='') {
				ui.alert("请填写箱数！");
				return false;
			}
			if (content=='') {
				ui.alert("请填写备注！");
				return false;
			}
			var ajaxJson = {};
			ajaxJson["src"] = "/pdaException/insertPdaException.do";   
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
												   {"lrr":userInfo.CFRY01},
												   {"lrwd":userInfo.WD01},
												   {"boxes":boxes},
												   {"billno":billno},
												   {"content":content}
						))
			};
			var resultData = ui.ajax(ajaxJson);
			if(resultData.data.status==1){
				pdaException.getTab().find('#ts_luru').form('reset');
			}
				ui.alert(resultData.data.msg);
	}
	}
});

pdaException.setAfterInit(function() {
	
	pdaException.getTab().find('#billno').textbox({
		onChange : function(newValue,oldValue){
			if (newValue.trim()!='') {
				if (newValue.trim()!=oldValue.trim()) {
					var billno=pdaException.getTab().find('#billno').textbox('getValue').trim();
					var XmlData = [];
					var queryField={};
					queryField["dataType"] = "Json";
					queryField["sqlid"] = "CFComplain.selectBill";
					queryField["billno"] =billno;
					XmlData.push(queryField);
					var ajaxJson = {};
					ajaxJson["src"] = "jlquery/select.do";
					ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
					var resultData = ui.ajax(ajaxJson).data;
					if(ui.isNull(resultData)){
						ui.alert("找不到此运单！");
						pdaException.getTab().find('#ts_luru').form('reset');
						return false;
					}else{
						var wd=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
						if(resultData[0].postnet!=wd && wd!=resultData[0].acceptnet && wd!='9000'){
							ui.alert("当前网点不是该运单的发货/到达网点，不能进行投诉件录入！");
							pdaException.getTab().find('#ts_luru').form('reset');
							return false;
						}
						pdaException.getTab().find('#state').textbox('setValue',resultData[0].name);
						pdaException.getTab().find('#nownet').textbox('setValue',resultData[0].net_name);
						pdaException.getTab().find('#customer').textbox('setValue',resultData[0].customer);
						pdaException.getTab().find('#fkfs').textbox('setValue',resultData[0].fkfs);
						pdaException.getTab().find('#postdate').textbox('setValue',resultData[0].postdate);
						pdaException.getTab().find('#postman').textbox('setValue',resultData[0].postman);
						pdaException.getTab().find('#posttel').textbox('setValue',resultData[0].posttel);
						pdaException.getTab().find('#postdw').textbox('setValue',resultData[0].postdw);
						pdaException.getTab().find('#acceptman').textbox('setValue',resultData[0].acceptman);
						pdaException.getTab().find('#accepttel').textbox('setValue',resultData[0].accepttel);
						pdaException.getTab().find('#acceptdw').textbox('setValue',resultData[0].acceptdw);
						ydxs = resultData[0].boxes;
					}
				}
			}
		}
	});
	
	pdaException.getTab().find("#state").textbox("disable");
	pdaException.getTab().find("#nownet").textbox("disable");
	pdaException.getTab().find("#customer").textbox("disable");
	pdaException.getTab().find("#fkfs").textbox("disable");
	pdaException.getTab().find("#postdate").textbox("disable");
	pdaException.getTab().find("#postman").textbox("disable");
	pdaException.getTab().find("#posttel").textbox("disable");
	pdaException.getTab().find("#postdw").textbox("disable");
	pdaException.getTab().find("#acceptman").textbox("disable");
	pdaException.getTab().find("#accepttel").textbox("disable");
	pdaException.getTab().find("#acceptdw").textbox("disable");
	pdaException.getTab().find('#boxes').textbox({
		onChange : function(newValue,oldValue){
			if (newValue.trim()!='') {
				if (newValue.trim()!=oldValue.trim()) {
					if(newValue.trim() > ydxs){
						ui.alert("异常箱数不能大于运单箱数！");
						pdaException.getTab().find('#boxes').textbox('setValue','');
					}
				}
			}
		}
	});
});