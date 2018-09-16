var GCBH = ui.Form();

GCBH.setPlugin({
	"GCBHSQL" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "GCZL.selectGCZL_sqlserver",
		"resource":"scm",
		"param" : {"billno":" AND a.billno = 'AAAAA'","WD01":userInfo.WD01},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "GCZL",
		"title" :"安装情况统计",
		"pagination":true,
		"collapsible":true,
		"showFooter" : false,
		"resource":"scm",
		//"buttons":["Append","Remove"],
		"listener": {
			onDblClickRow: function(index, row){
				var param = $('#Dialog').dialog('options').param;
				var callback=$('#Dialog').dialog('options').callback;
				$("#Dialog").window("close");
				callback(row);
			}
		}
	}	
});

GCBH.define({
	
});

GCBH.setEvents(function() { 
	GCBH.getTab().find("#search").bind("click",function(){
		if(ui.isNull(GCBH.getTab().formToJson()[0])){
			ui.tip("请至少输入一个条件");
			return false;
		}
		var GCBHSQL =GCBH.getPlugin()["GCBHSQL"];
		GCBHSQL["param"]={
				"GCBH": GCBH.getTab().find("#GCBH").textbox("getValue"),	
				"GC_NAME": GCBH.getTab().find("#GC_NAME").textbox("getValue"),
				"CUSTOMER_LXR": GCBH.getTab().find("#CUSTOMER_LXR").textbox("getValue"),
				"CUSTOMER_TEL": GCBH.getTab().find("#CUSTOMER_TEL").textbox("getValue"),
				"CUSTOMER_PHONE": GCBH.getTab().find("#CUSTOMER_PHONE").textbox("getValue"),
				"CUSTOMER_ADDRESS": GCBH.getTab().find("#CUSTOMER_ADDRESS").textbox("getValue"),
				"wdList":userInfo.WD	
			 };
    	GCBH.reloadPlugin("GCBHSQL", GCBHSQL);
	});
});

//加载完成
GCBH.setAfterInit(function() { 
	
});

var json = {};
GCBH.setTab($("#gczlsql")); 
GCBH.setData({});
GCBH.initForm(json);

