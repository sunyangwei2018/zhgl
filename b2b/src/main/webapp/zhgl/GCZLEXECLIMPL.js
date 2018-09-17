var GCZLEXECLIMPL = ui.Form();

GCZLEXECLIMPL.setPlugin({
	"GCZLEXECLIMPL" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "GCZL.selectGCZLEXECLIMPL_Page",
		"resource":"scm",
		"param" : {"billno":" AND a.billno = 'AAAAA'","WD01":userInfo.WD01},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "GCZL",
		"title" :"工程资料导入",
		"pagination":true,
		"collapsible":true,
		"showFooter" : false,
		"resource":"scm"
		//"buttons":["Append","Remove"],
	},
	"Z1" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"fileType" : ["excel"],
		"listener" : {
			"afterUpload" : function(data){
				var arr=[];
				var json = {};
				json["MBBM"]=1;
				json["CFRY01"]=userInfo.CFRY01;
				json["nownet"]=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
				json["dqxx01"]=ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01;
				arr.push(data[data.length-1]);
				json["data"]=arr;
				GCZLEXECLIMPL.getAWD(json);
			}
		}
	}
});


GCZLEXECLIMPL.define({
	"query" : function(){
		var YD = GCZLEXECLIMPL.getPlugin()["GCZLEXECLIMPL"];
		GCZLEXECLIMPL.reloadPlugin("GCZLEXECLIMPL",YD);
	},
	"getAWD": function(json) {
		var ajaxJson = {};
		ajaxJson["src"] ="/GCZLEXECLIMPLInterface/insertGCZLEXECL.do?rid=" + Math.random();
		ajaxJson["data"] ={"XmlData":JSON.stringify(json)};
		var resultData = ui.ajax(ajaxJson).data;
		if(!ui.isNull(resultData)&&resultData.MSGID=="S"){
			GCZLEXECLIMPL.query();
		}
	}
});


GCZLEXECLIMPL.setEvents(function() {
	GCZLEXECLIMPL.getTab().delegate("#XZMB", "click",function(event){
		var json ={};
		var XmlData={"filename":"工程资料导入","keys":{"GCBH":"*工程编号","GC_NAME":"*工程名称","STORES_ID":"网点编号","STORES_NAME":"*网点名称","CUSTOMER_LXR":"*联系人",
			"CUSTOMER_TEL":"移动电话","INSTALL_DATE":"安装日期","CUSTOMER_POSTCODE":"邮政编码","CUSTOMER_ADDRESS":"用户地址","CUSTOMER_PHONE_AREACODE":"*区号",
			"CUSTOMER_PHONE":"电话号码","BUY_DATE":"*购买日期","SELLER_ID":"*销售单位号","SELLER_NAME":"商店简称","SELL_TYPE":"销售类型",
			"SELL_ONE":"*销售区域代码","SELL_TWO":"内销售区域代码","SPWJ_ID":"机型","SPWJ_NAME":"机型描述","SPNJ_ID":"内机型描述"},"showBracket":"0"};
//		var XmlData={"a":"测试"};
		json["XmlData"] = JSON.stringify(XmlData);
		ui.download("/excelHandler/downloadTemplate.do",json);
		
//		var ajaxJson = {};
//		ajaxJson["src"] ="/excelHandler/downloadTemplate.do?rid=" + Math.random();
//		ajaxJson["data"] =json;	
//		ui.ajax(ajaxJson);
	});
});	

GCZLEXECLIMPL.setAfterInit(function() {
});