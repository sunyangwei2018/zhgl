var GCZLHIT = ui.Form();
var zone = userInfo.DQXX01;
var fxsList = ["01","02"];
	WORKBENCH.bizUser = "";
	WORKBENCH.bizGsid= "";
	if(fxsList.contains(userInfo.KHGSROLEID)){
		WORKBENCH.bizUser = userInfo.USERID;
	}else{
		if("03"==userInfo.KHGSROLEID){
			WORKBENCH.bizGsid = userInfo.KHGSID;
		}
	}
GCZLHIT.setPlugin({
	"WORKFLOWBECH" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "GCZL.selectGCZLHIT_Page",
		"param" : {"KHGSID":userInfo.KHGSID,"bizGsid":WORKBENCH.bizGsid},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "GCZL",
		"title" :"工程资料查询",
		"pagination":true,
		"showFooter" : false,
		"footBtn": [],
		"listener": {
			onDblClickRow: function(index, row){
				ui.setUrlParam("/workflow/WORKFLOWIMG.html?processInstanceId="+row.PROCESS_INSTANCE_ID);
				ui.addTabs("流程图","/workflow/WORKFLOWIMG.html?processInstanceId=6"+row.PROCESS_INSTANCE_ID+"&rid="+Math.random());
			}/*,
			onClickRow: function(index,row){
				ui.setUrlParam("/workflow/WORKFLOWIMG.html?processInstanceId="+row.procInstId);
				ui.addTabs("流程图","/workflow/WORKFLOWIMG.html?processInstanceId=6"+row.procInstId+"&rid="+Math.random());
			}*/
		}
	}
});

GCZLHIT.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  GCZLHIT.getTab().find("#add").linkbutton('enable');
		  }else{
			  GCZLHIT.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  GCZLHIT.getTab().find("#save").linkbutton('enable');;
		  }else{
			  GCZLHIT.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				GCZLHIT.getTab().find("#edit").linkbutton('enable');
				GCZLHIT.getTab().find("#del").linkbutton('enable');
		  }else{
				GCZLHIT.getTab().find("#edit").linkbutton('disable');
				GCZLHIT.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  GCZLHIT.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  GCZLHIT.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"query" : function() {
		var workGrid = GCZLHIT.getPlugin()["WORKFLOWBECH"];
			workGrid["param"]=$.extend({"userId":userInfo.USERID,"bizUser":userInfo.KHGSID,"bizGsid":WORKBENCH.bizGsid},GCZLHIT.getTab().find("form[id='GCZLHIT']").formToJson()[0]);
		GCZLHIT.reloadPlugin("WORKFLOWBECH", workGrid);
			
	},
	"add": function(){
		this.setButton(1);
		GCZLHIT.getTab().find("#billno").textbox("readonly",false);
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
		GCZLHIT.getTab().find("#print").linkbutton('disable');
		sessionStorage["PRINT_URL"] = "/report/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"DJBH\":\"'"+1+"'\"}";
		window.open("/print.html?dybh=1&rid="+Math.random());
		GCZLHIT.getTab().find("#print").linkbutton('enable');
	},
	"downFile": function(GCZLID,GC_ID,reportName){
		var iframe = $("<iframe>");
		var form = $("<form>");
		form.attr("style","display:none");
		form.attr("target","");
		form.attr("method","post");
		form.attr("action","generateReportExport/print.do");
		var input1 = $("<input>");
		input1.attr("type","hidden");
		input1.attr("name","json");
		input1.attr("value",JSON.stringify({
			"GCZLID": GCZLID,
			"GCBH": GC_ID,
			"temple":reportName
		}));
		//iframe.append(form);
		$("body.panel-noscroll").append(form);
		form.append(input1);
		form.submit();
		form.remove();
	}
});

//加载事件
GCZLHIT.setEvents(function(){
	
});

//加载完成
GCZLHIT.setAfterInit(function() {  
	
})