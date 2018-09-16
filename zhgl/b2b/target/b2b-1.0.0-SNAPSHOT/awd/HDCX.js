var HDCX = ui.Form();

HDCX.setPlugin({
	"SHDCX" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFHDCX.selectHDCX",
		"columnName" : "YD",
		"param" : {"cus_code":"AAAAA"},
		"pagination" : true//分页
	}, 
	
});


HDCX.define({
	"query" : function(){
		var lrrq_S;
		var lrrq_E;
		var qrrq_S;
		var qrrq_E;
		if(HDCX.getTab().find("#rqcx").combobox('getValue')=='1'){
			lrrq_S = HDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			lrrq_E = HDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(HDCX.getTab().find("#rqcx").combobox('getValue')=='2'){
			qrrq_S = HDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			qrrq_E = HDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}
		var SHDCX = HDCX.getPlugin()["SHDCX"];
		if(ui.isNull(HDCX.getTab().find('#billno').val())){
			SHDCX["param"] = {
					"lrrq_S" : lrrq_S,
					"lrrq_E" : lrrq_E,	
					"cus_code" : HDCX.getTab().find("#s_name").combobox('getValue').trim(),
					"qrrq_S" : qrrq_S,
					"qrrq_E" : qrrq_E,
					"yqr" : HDCX.getTab().find("#yqr").combobox('getValue').trim(),
					"lrwd" : HDCX.getTab().find("#lrwd").combobox('getValue').trim(),
					"qrwd" : HDCX.getTab().find("#qrwd").combobox('getValue').trim(),
					"kddh" : HDCX.getTab().find("#kddh").textbox('getValue').trim(),
				};
		}else{
			if(HDCX.getTab().find('#billno').val().split("\n").length>10000){
				ui.alert('请输入少于10000个单号！');
				return false;
			}
			SHDCX["param"] = {
					"billno" : HDCX.getTab().find('#billno').val().split("\n"),
			};
		}
		
		HDCX.reloadPlugin("SHDCX", SHDCX);
	},
});

HDCX.setAfterInit(function() {
	HDCX.getTab().find("#lrwd").combobox({  
		valueField:'net_code',    
		textField:'net_name',   
    	method: 'POST',
    	queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFWD.selectWD\",\"sjwd\":\"0\"}]"},
    	url: 'jlquery/select.do',
    	loadFilter: function(data){
    		return data.data;
    	},
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	HDCX.getTab().find("#qrwd").combobox({  
		valueField:'code',    
		textField:'name',   
    	method: 'POST',
    	queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFHDCX.selectWD\"}]"},
    	url: 'jlquery/select.do',
    	loadFilter: function(data){
    		return data.data;
    	},
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
//	//默认总部
//	HDCX.getTab().find("#qrwd").combobox("setValue",'9000');
	
	HDCX.getTab().find("#s_name").combobox({  
		valueField:'cus_code',    
		textField:'s_name',   
    	method: 'POST',
    	queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFHDCX.selectkh\"}]"},
    	url: 'jlquery/select.do',
    	loadFilter: function(data){
    		return data.data;
    	},
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	HDCX.getTab().find('#qk').linkbutton({
		onClick: function(){
			HDCX.getTab().find('#billno').val("");
		}
	});	
	
	
	HDCX.getTab().find('#rq_Scx').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		},
	});
	HDCX.getTab().find('#rq_Ecx').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	HDCX.getTab().find('#rq_Scx').datebox('setValue', ui.formatDate(0,1));
	HDCX.getTab().find('#rq_Ecx').datebox('setValue', ui.formatDate(0,1));
});