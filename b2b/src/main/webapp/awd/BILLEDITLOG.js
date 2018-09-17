var BILLEDITLOG = ui.Form();

BILLEDITLOG.setPlugin({
	"BILLEDITLOG" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "BILLEDITLOG.selectLOG",
		"columnName" : "YD",
		"pagination":true,
	},
});

BILLEDITLOG.define({
	"query" : function(){
		var SXHCX = BILLEDITLOG.getPlugin()["SXHCX"];
		/*if (ui.isNull(BILLEDITLOG.getTab().find('#billno').val())) {
			ui.alert("请填写运单号！");
			return false;
		};*/
		var EDITLOG = BILLEDITLOG.getPlugin()["BILLEDITLOG"];
		if(ui.isNull(BILLEDITLOG.getTab().find('#billno').val())){
			EDITLOG["param"] = {
					"net_code": BILLEDITLOG.getTab().find("#net_code").combobox('getValue').trim(),
					"rq_S": BILLEDITLOG.getTab().find("#rq_S").datetimebox('getValue').trim(),
					"rq_E": BILLEDITLOG.getTab().find("#rq_E").datetimebox('getValue').trim(),
			}
		}else{
			if(BILLEDITLOG.getTab().find('#billno').val().split("\n").length>10000){
				ui.alert('请输入少于10000个单号！');
				return false;
			}
			EDITLOG["param"] = {"billno":BILLEDITLOG.getTab().find('#billno').val().split("\n")};
		}
		
		BILLEDITLOG.reloadPlugin("BILLEDITLOG",EDITLOG);
	},
	"getwd" : function(){
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["sqlid"] = "CFWD.selectJSWD";
		queryField["DataBaseType"] = "tms";
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
			
		var resultData = ui.ajax(ajaxJson).data;
		return resultData;
		},	
});

//加载完成
BILLEDITLOG.setAfterInit(function() {
	BILLEDITLOG.getTab().find('#qk').linkbutton({
		onClick: function(){
			BILLEDITLOG.getTab().find('#billno').val("");
		}
	});	
	//发货网点
	BILLEDITLOG.getTab().find('#net_code').combobox({ 
		data:BILLEDITLOG.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	BILLEDITLOG.getTab().find('#rq_S').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		},
	});
	BILLEDITLOG.getTab().find('#rq_E').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	BILLEDITLOG.getTab().find('#rq_S').datebox('setValue', ui.formatDate(0,1));
	BILLEDITLOG.getTab().find('#rq_E').datebox('setValue', ui.formatDate(0,1));
});


    