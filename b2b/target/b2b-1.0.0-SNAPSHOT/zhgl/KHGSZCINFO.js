var KHGSZCINFO = ui.Form();
var zone = userInfo.DQXX01;

KHGSZCINFO.setPlugin({
	"KHGSZCINFOCX" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "GCZL.selectKHGSZCINFO_Page",
		"param" : {"bizKey":"","userId":userInfo.USERID},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "GCZL",
		"title" :"查询用户信息",
		"pagination":true,
		"showFooter" : false,
		"footBtn": [],
		"listener": {
			onDblClickRow: function(index, row){
				ui.setUrlParam("/workflow/WORKFLOWIMG.html?processInstanceId="+row.PROCESS_INSTANCE_ID);
				ui.addTabs("流程图","/workflow/WORKFLOWIMG.html?processInstanceId=6"+row.PROCESS_INSTANCE_ID+"&rid="+Math.random());
			},
			onRowContextMenu: function(e, index, row){
				e.preventDefault();
				$("#dataGridMenu").menu('show', {
					left:e.pageX,
					top:e.pageY,
					onClick: function(item){
						debugger;
						if(item.text=="处理"){
							var queryField={};
							queryField["row"] = row;
							menu.control("/zhgl/GCZLSD.html","0303","工程资料收单",queryField);
						}
					}
				});
			}/*,
			onClickRow: function(index,row){
				ui.setUrlParam("/workflow/WORKFLOWIMG.html?processInstanceId="+row.procInstId);
				ui.addTabs("流程图","/workflow/WORKFLOWIMG.html?processInstanceId=6"+row.procInstId+"&rid="+Math.random());
			}*/
		}
	}
});

KHGSZCINFO.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  KHGSZCINFO.getTab().find("#add").linkbutton('enable');
		  }else{
			  KHGSZCINFO.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  KHGSZCINFO.getTab().find("#save").linkbutton('enable');;
		  }else{
			  KHGSZCINFO.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				KHGSZCINFO.getTab().find("#edit").linkbutton('enable');
				KHGSZCINFO.getTab().find("#del").linkbutton('enable');
		  }else{
				KHGSZCINFO.getTab().find("#edit").linkbutton('disable');
				KHGSZCINFO.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  KHGSZCINFO.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  KHGSZCINFO.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"query" : function() {
		var workGrid = KHGSZCINFO.getPlugin()["KHGSZCINFOCX"];
			workGrid["param"]=$.extend({"userId":userInfo.USERID},KHGSZCINFO.getTab().find("form[id='KHGSZCINFO']").formToJson()[0]);
		KHGSZCINFO.reloadPlugin("KHGSZCINFOCX", workGrid);
			
	},
	"add": function(){
		this.setButton(1);
		KHGSZCINFO.getTab().find("#billno").textbox("readonly",false);
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
		KHGSZCINFO.getTab().find("#print").linkbutton('disable');
		sessionStorage["PRINT_URL"] = "/report/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"DJBH\":\"'"+1+"'\"}";
		window.open("/print.html?dybh=1&rid="+Math.random());
		KHGSZCINFO.getTab().find("#print").linkbutton('enable');
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
KHGSZCINFO.setEvents(function(){
	
});

//加载完成
KHGSZCINFO.setAfterInit(function() {  
	
})