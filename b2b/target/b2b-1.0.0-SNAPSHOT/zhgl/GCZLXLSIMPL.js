var GCZLXLSIMPL = ui.Form();

GCZLXLSIMPL.setPlugin({
	/*"YD" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFAWD.selectYD",
		"columnName" : "YD",
		"pagination" : true,
		"footBtn":[],
		"param" : {"CFRY01":userInfo.USERID}
	},*/
	"Z1" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"fileType" : ["excel"],
		"listener" : {
			"afterUpload" : function(data){
				var arr=[];
				var json = {};
				json["MBBM"]=1;
				json["CFRY01"]=userInfo.USERID;
				json["nownet"]=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
				json["dqxx01"]=ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01;
				arr.push(data[data.length-1]);
				json["data"]=arr;
				GCZLXLSIMPL.getAWD(json);
			}
		}
	}
});


GCZLXLSIMPL.define({
	"query" : function(){
		var YD = GCZLXLSIMPL.getPlugin()["YD"];
		GCZLXLSIMPL.reloadPlugin("YD",YD);
	},
	"getAWD": function(json) {
		var ajaxJson = {};
		ajaxJson["src"] ="/AWDInterface/insertAWDEXECL.do?rid=" + Math.random();
		ajaxJson["data"] ={"XmlData":JSON.stringify(json)};
		var resultData = ui.ajax(ajaxJson).data;
		if(!ui.isNull(resultData)&&resultData.MSGID=="S"){
			GCZLXLSIMPL.query();
		}
	}
});


GCZLXLSIMPL.setEvents(function() {
	GCZLXLSIMPL.getTab().delegate("#XZMB", "click",function(event){
		var json ={};
		var XmlData={"filename":"工程资料导入","keys":{"billno":"*运单号","cus_code":"*客户代码(编码)","cusno":"客户单号","postdate":"*托运日期","postzone":"*始发地(编码)",
			"postdw":"发货单位","postaddr":"发货地址","postman":"发货人","posttel":"发货电话","acceptzone":"*到达地(编码)","acceptnet":"到达网点(编码)","acceptdw":"*收货单位","acceptaddr":"*收货地址","acceptman":"收货人","accepttel":"收货电话",
			"hwlb":"*货物类别(编码)","boxes":"箱数","duals":"双数","package":"包数","volume":"体积","weight":"重量","flag":"属性","fkfs":"*付款方式(编码)","gg":"规格","postfee":"运费","jj_flag":"是否加急","memo":"运单备注","thfee":"提货费","shfee":"送货费","ccfee":"仓储费","bjfee":"保价费","slfee":"上楼费"},"showBracket":"0"};
//		var XmlData={"a":"测试"};
		json["XmlData"] = JSON.stringify(XmlData);
		ui.download("/excelHandler/downloadTemplate.do",json);
		
//		var ajaxJson = {};
//		ajaxJson["src"] ="/excelHandler/downloadTemplate.do?rid=" + Math.random();
//		ajaxJson["data"] =json;	
//		ui.ajax(ajaxJson);
	});
});	

GCZLXLSIMPL.setAfterInit(function() {
});