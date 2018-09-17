var GCZLBATCHDOWN = ui.Form();
var zone = userInfo.DQXX01;

GCZLBATCHDOWN.setPlugin({
	"WORKFLOWBECH" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "GCZL.selectGCZLBATCHDOWN_Page",
		"param" : {"bizKey":"","userId":userInfo.USERID},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "GCZL",
		"title" :"工程资料附件查询",
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

GCZLBATCHDOWN.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  GCZLBATCHDOWN.getTab().find("#add").linkbutton('enable');
		  }else{
			  GCZLBATCHDOWN.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  GCZLBATCHDOWN.getTab().find("#save").linkbutton('enable');;
		  }else{
			  GCZLBATCHDOWN.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				GCZLBATCHDOWN.getTab().find("#edit").linkbutton('enable');
				GCZLBATCHDOWN.getTab().find("#del").linkbutton('enable');
		  }else{
				GCZLBATCHDOWN.getTab().find("#edit").linkbutton('disable');
				GCZLBATCHDOWN.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  GCZLBATCHDOWN.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  GCZLBATCHDOWN.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"query" : function() {
		var workGrid = GCZLBATCHDOWN.getPlugin()["WORKFLOWBECH"];
			workGrid["param"]=$.extend({"userId":userInfo.USERID},GCZLBATCHDOWN.getTab().find("form[id='GCZLBATCHDOWN']").formToJson()[0]);
		GCZLBATCHDOWN.reloadPlugin("WORKFLOWBECH", workGrid);
			
	},
	"add": function(){
		this.setButton(1);
		GCZLBATCHDOWN.getTab().find("#billno").textbox("readonly",false);
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
		GCZLBATCHDOWN.getTab().find("#print").linkbutton('disable');
		sessionStorage["PRINT_URL"] = "/report/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"DJBH\":\"'"+1+"'\"}";
		window.open("/print.html?dybh=1&rid="+Math.random());
		GCZLBATCHDOWN.getTab().find("#print").linkbutton('enable');
	},
	"downFile": function(GCZLID,GCBH){
		var iframe = $("<iframe>");
		var form = $("<form>");
		form.attr("style","display:none");
		form.attr("target","");
		form.attr("method","post");
		form.attr("action","gczl/downGczlFileData.do");
		var input1 = $("<input>");
		input1.attr("type","hidden");
		input1.attr("name","json");
		input1.attr("value",JSON.stringify({
			"GCZLID": GCZLID,
			"GCBH": GCBH
		}));
		//iframe.append(form);
		$("body.panel-noscroll").append(form);
		form.append(input1);
		form.submit();
		form.remove();
	},
	"downBatch":function(){
		var rows = GCZLBATCHDOWN.getTab().find("#d_WORKFLOWBECH").datagrid("getChecked");
		if(rows.length==0){
			ui.tip("请至少勾选一条");
			return false;
		}
		if(rows.length>10){
			ui.tip("批量下载大10条");
			return false;
		}
		$.each(rows,function(index,row){
			var iframe = $("<iframe>");
			var form = $("<form>");
			form.attr("style","display:none");
			form.attr("target","");
			form.attr("method","post");
			form.attr("action","gczl/downGczlFileData.do");
			var input1 = $("<input>");
			input1.attr("type","hidden");
			input1.attr("name","json");
			input1.attr("value",JSON.stringify({
			"GCZLID": row.GCZLID,
			"GCBH": row.GC_ID
			}));
			//iframe.append(form);
			$("body.panel-noscroll").append(form);
			form.append(input1);
			form.submit();
			form.remove();
		})
	}
});

//加载事件
GCZLBATCHDOWN.setEvents(function(){
	
});

//加载完成
GCZLBATCHDOWN.setAfterInit(function() {  
	
})