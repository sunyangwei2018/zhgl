var YDQS = ui.Form();

YDQS.setPlugin({
	"PLQS" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFYDQS.selectKHXX",
		"columnName" : "YD",
		"param" : {"billno":" and 1=2",
					"nownet":userInfo.WD01},
		"title" :"双击删除错误记录",
		"listener": {
				onDblClickRow: function(index,row){
					$('#d_PLQS').datagrid('deleteRow',index);
				}
		}
	},
});


YDQS.define({
	// 定义保存按钮方法
	"save" : function() {
		var tab = YDQS.getTab().find('#ydqs_tab').tabs('getSelected');
		var index = YDQS.getTab().find('#ydqs_tab').tabs('getTabIndex',tab);
		if (index==0){
			if (YDQS.getTab().find("#qsbillno").textbox('getValue').trim()=='') {
				ui.alert("请填写要签收的运单号！");
				YDQS.getTab().find('#ydqs').form('reset');
				return false;
			}
			if (YDQS.getTab().find("#qss_name").textbox('getValue').trim()=='') {
				ui.alert("请填写签收人名字！");
				return false;
			}
			var billno=YDQS.getTab().find('#qsbillno').textbox('getValue').trim();
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "CFYDQS.selectYDQS";
			queryField["DataBaseType"] = "tms";
			queryField["billno"] =billno;
			queryField["czwd"] =userInfo.WD01;
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
			var resultData = ui.ajax(ajaxJson).data;
			
			if(ui.isNull(resultData)){
				ui.alert("找不到此运单！");
				YDQS.getTab().find('#ydqs').form('reset');
				return false;
			}
			if (resultData[0].pszy==0) {
				ui.alert("此运单在本网点没有派送或转运记录!");
				YDQS.getTab().find('#ydqs').form('reset');
				return false;
			}
			if (resultData[0].state==11) {
				ui.alert("此运单已经签收,不允许修改!");
				YDQS.getTab().find('#ydqs').form('reset');
				return false;
			}
			var ajaxJson = {};
			ajaxJson["src"] = "/cfydqs/insertYDQS.do";
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
												   {"czr":userInfo.CFRY01},
												   {"czwd":userInfo.WD01},
												   {"s_name":YDQS.getTab().find('#qss_name').textbox('getValue').trim()},
												   {"billno":YDQS.getTab().find('#qsbillno').textbox('getValue').trim()}
						))
			};
			var resultData = ui.ajax(ajaxJson);
			if (!ui.isNull(resultData)) {
				YDQS.getTab().find('#ydqs').form('reset');
				YDQS.getTab().find('#qsbillno').textbox("textbox").focus();	
			}else{
				ui.alert("签收失败！");
			}
			
		}else{
			var error =0;
			$.each($('#d_PLQS').datagrid('getRows'),function(i,val){
				if((val.state==11)||(val.state==12)||(val.state==13)){
					ui.alert(val.billno+"已签收。如需修改请在单票签收界面修改签收内容。");
					error =1;
					return false;
				}
				if(val.pszy==0){
					ui.alert(val.billno+"没有派送或转运信息");
					error =1;
					return false;
				}
				if(ui.isNull(val.billno)){
					ui.alert("运单号不能为空");
					error =1;
					return false;
				}
				if(ui.isNull(val.qs_name)){
					ui.alert("签收人不能为空");
					error =1;
					return false;
				}
			});
			if(error == 1){
				return false;
			}
			var ajaxJson = {};
			ajaxJson["src"] = "/cfydqs/insertPLYD.do";
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
												   {"czr":userInfo.CFRY01},
												   {"czwd":userInfo.WD01},
												   {"item":$('#d_PLQS').datagrid('getRows')}
						))
			};
			var resultData = ui.ajax(ajaxJson);
			if (!ui.isNull(resultData)) {
				ui.alert(resultData.data.staus);
			}
			$('#d_PLQS').datagrid('loadData', { total: 0, rows: [] });
//			var PLQS = YDQS.getPlugin()["PLQS"];
//			PLQS["param"] = {"billno" : YDQS.getbillno(),"nownet":userInfo.WD01};
//			YDQS.reloadPlugin("PLQS", PLQS);
		}
		
	},
    //定义取消按钮方法
	"cancel" : function() {
		if(ui.isNull(ui.ryxx_qx(5))){
		    ui.alert("您没有取消权限!");
		    return false;
	    }
		if (YDQS.getTab().find("#qsbillno").textbox('getValue').trim()=='') {
			ui.alert("请填写要取消的运单号！");
			YDQS.getTab().find('#ydqs').form('reset');
			return false;
		}
		var billno=YDQS.getTab().find('#qsbillno').textbox('getValue').trim();
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["sqlid"] = "CFYDQS.selectYDQS";
		queryField["DataBaseType"] = "tms";
		queryField["billno"] =billno;
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
		var resultData = ui.ajax(ajaxJson).data;
	
		if (resultData[0].state!=11) {
				ui.alert("此运单不是签收状态！");
				YDQS.getTab().find('#ydqs').form('reset');
				return false;
		}
		var ajaxJson = {};
		ajaxJson["src"] = "/cfydqs/updateYDQS.do";
		ajaxJson["data"] = {
			"XmlData" : JSON.stringify($.extend(
											   {"czr":userInfo.CFRY01},
											   {"czwd":resultData[0].nownet},
											   {"billno":YDQS.getTab().find('#qsbillno').textbox('getValue').trim()}
					))
		};
		var resultData = ui.ajax(ajaxJson);
		if (!ui.isNull(resultData)) {
			ui.alert(resultData.data.staus);
		}
		YDQS.getTab().find('#ydqs').form('reset');
	},
	"getbillno"	: function(){	
		var billno;
		if(ui.isNull(YDQS.getTab().find('#sbillno').val())){
			billno=''; 
		}else{
			if(YDQS.getTab().find('#sbillno').val().split("\n").length==1){
				billno = " and b.billno = '"+YDQS.getTab().find('#sbillno').val()+"'";
			}else{
				billno="and b.billno in ("
				var text = YDQS.getTab().find('#sbillno').val();
				var arry = text.split("\n");
				$.each(arry, function(i, val) {
					if(val!=''){
						billno=billno+"'"+val+"',";
					}
				})
				billno = billno.substring(0,billno.length-1);
				billno=billno+")";
			}
		}
		return billno;
	},

});

YDQS.setAfterInit(function() {
	$('#ydqs_tab').tabs({
		onSelect: function(title,index){
			if (index==1){
				YDQS.getTab().find('#edit').linkbutton('disable');
				YDQS.getTab().find('#cancel').linkbutton('disable');
				YDQS.getTab().find('#query').linkbutton('enable');
			}else{
				YDQS.getTab().find('#edit').linkbutton('enable');
				YDQS.getTab().find('#cancel').linkbutton('enable');
				YDQS.getTab().find('#query').linkbutton('disable');
			}
		 }
	});
	
	YDQS.getTab().find('#qsbillno').textbox({
		onChange : function(newValue,oldValue){
			if (newValue!='') {
				if (newValue!=oldValue) {
					var billno=YDQS.getTab().find('#qsbillno').textbox('getValue').trim();
					var XmlData = [];
					var queryField={};
					queryField["dataType"] = "Json";
					queryField["sqlid"] = "CFYDQS.selectYDQS";
					queryField["DataBaseType"] = "tms";
					queryField["billno"] =billno;
					queryField["czwd"] =userInfo.WD01;
					XmlData.push(queryField);
					var ajaxJson = {};
					ajaxJson["src"] = "jlquery/select.do";
					ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
					var resultData = ui.ajax(ajaxJson).data;
					
					if(ui.isNull(resultData)){
						ui.alert("找不到此运单！");
						YDQS.getTab().find('#ydqs').form('reset');
						return false;
					}
					if(userInfo.WD01 !='9000'){
						if (resultData[0].pszy==0) {
							ui.alert("此运单在本网点没有派送或转运记录!");
							YDQS.getTab().find('#ydqs').form('reset');
							return false;
						}
					}
					YDQS.getTab().find('#qsstate').textbox('setValue',resultData[0].state_name);
					YDQS.getTab().find('#qscus_code').textbox('setValue',resultData[0].s_name);
					YDQS.getTab().find('#qsfkfs').textbox('setValue',resultData[0].fkfs_name);
					YDQS.getTab().find('#qss_name').textbox('setValue',resultData[0].qs_name);
					YDQS.getTab().find('#qsfkje').textbox('setValue',resultData[0].postfee);		
				}
			}
		}
		
	});

	YDQS.getTab().find("#sbillno").bind("keydown",function (e) {
		if(e.keyCode==13){
				var PLQS = YDQS.getPlugin()["PLQS"];
				PLQS["param"] = {"billno" : YDQS.getbillno(),"nownet":userInfo.WD01};
				YDQS.reloadPlugin("PLQS", PLQS);
				
				YDQS.getTab().find('#sbillno').val("");
				YDQS.getTab().find('#ss_name').textbox("textbox").focus();	
				
			}
	});
	
	YDQS.getTab().find("#qsbillno").textbox('textbox').bind("keydown",function (e) {
		if(e.keyCode==13){
			YDQS.getTab().find('#qss_name').textbox("textbox").focus();	
			}
	});
	
	YDQS.getTab().find('#ss_name').textbox({
		onChange : function(newValue,oldValue){
			if (newValue!='') {
				if (newValue!=oldValue) {
					$.each($('#d_PLQS').datagrid('getRows'),function(i,val){
						$('#d_PLQS').datagrid('updateRow',{
							index: i,
							row: {
								qs_name: YDQS.getTab().find("#ss_name").textbox('getValue')
							}
						});
						});
					YDQS.getTab().find('#ss_name').textbox('setValue','');
				}
			}
		}
	});
	YDQS.getTab().find('#qscus_code').textbox('readonly');
	YDQS.getTab().find('#qsfkfs').textbox('readonly');
	YDQS.getTab().find('#qsstate').textbox('readonly');
	YDQS.getTab().find('#qsfkje').textbox('readonly');
	YDQS.getTab().find('#qk').linkbutton({
		onClick: function(){
			YDQS.getTab().find('#sbillno').val("");
		}
	});	
});