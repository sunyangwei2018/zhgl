var GCZLCX = ui.Form();
var zone = userInfo.DQXX01;

GCZLCX.setPlugin({
	"GCZLCX" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "GCZL.selectGCZLCX",
		"param" : {"billno":" AND a.billno = 'AAAAA'","WD01":userInfo.WD01},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "GCZL",
		"title" :"格力空调工程机竣工验收明细表",
		"pagination":true,
		"showFooter" : true,
		"listener": {
			onDblClickRow: function(index, row){
				
				
			}
		}
	}
});

GCZLCX.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  GCZLCX.getTab().find("#add").linkbutton('enable');
		  }else{
			  GCZLCX.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  GCZLCX.getTab().find("#save").linkbutton('enable');;
		  }else{
			  GCZLCX.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				GCZLCX.getTab().find("#edit").linkbutton('enable');
				GCZLCX.getTab().find("#del").linkbutton('enable');
		  }else{
				GCZLCX.getTab().find("#edit").linkbutton('disable');
				GCZLCX.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  GCZLCX.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  GCZLCX.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"add": function(){
		this.setButton(1);
		GCZLCX.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"del": function(){
		
	},
	"save": function(){
		var	XmlData =[];
		XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
		var ajaxJson = {};
		ajaxJson["src"] = "cfawd/insertBill.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		if(resultData.status==1){
			this.addAWDGrid(XmlData[0]);
		}
	},
	"edit": function(){
		
	},
	"print": function(){
		GCZLCX.getTab().find("#print").linkbutton('disable');
		sessionStorage["PRINT_URL"] = "/report/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"DJBH\":\"'"+1+"'\"}";
		window.open("/print.html?dybh=1&rid="+Math.random());
		GCZLCX.getTab().find("#print").linkbutton('enable');
	}
});

//加载事件
GCZLCX.setEvents(function(){
	
});

//加载完成
GCZLCX.setAfterInit(function() {  
	
})