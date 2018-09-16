var WORKHIT = ui.Form();
var zone = userInfo.DQXX01;
var fxsList = ["01","02"];
	WORKBENCH.bizUser = "";
	WORKBENCH.bizGsid = "";
	if(fxsList.contains(userInfo.KHGSROLEID)){
		WORKBENCH.bizUser = userInfo.USERID;
	}else{
		if("03"==userInfo.KHGSROLEID){
			WORKBENCH.bizGsid = userInfo.KHGSID;
		}
	}
WORKHIT.setPlugin({
	"WORKFLOWBECH" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "Workflow.selectWORKHIT",
		"action" : "/workflow/workApplyList.do",
		"param" : {"bizKey":"","userId":userInfo.USERID,"bizUser":WORKBENCH.bizUser,"gsid":WORKBENCH.bizGsid},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "Workflow",
		"title" :"流程跟踪",
		"pagination":true,
		"showFooter" : true,
		"footBtn": [],
		"listener": {
			onSelectPage: function(pageNum, pageSize){//自定义分页
				var ajaxJson = {};
				ajaxJson["src"] = "/workflow/workBench.do";
				var workGrid = WORKHIT.getPlugin()["WORKFLOWBECH"];
				var range = workGrid["param"].range;
				workGrid["param"].range["start"] = (pageNum-1)*pageSize;
					
				ajaxJson["data"] = {"json":JSON.stringify(workGrid["param"])};
				var  resultData = ui.ajax(ajaxJson);
				return resultData;
			},
			onDblClickRow: function(index, row){
				ui.setUrlParam("/workflow/WORKFLOWIMG.html?processInstanceId="+row.procInstId);
				ui.addTabs("流程图","/workflow/WORKFLOWIMG.html?processInstanceId=6"+row.procInstId+"&rid="+Math.random());
			}/*,
			onRowContextMenu: function(e, index, row){
				e.preventDefault();
				$("#dataGridMenu").menu('show', {
					left:e.pageX,
					top:e.pageY,
					onClick: function(item){
						debugger;
						var ajaxJson = {};
						var queryField={};
						var  resultData=null;
						if(item.text=="处理"){
							ajaxJson["src"] = "/workflow/dealTask.do";	
							ajaxJson["data"] = {"taskId":row.taskId};
							resultData = ui.ajax(ajaxJson).data;
							if(resultData["respCode"]=="000001"){
								ui.tip(resultData.respMsg)
								return false;
							}
						}
						if(item.text=="释放"){
							ajaxJson["src"] = "/workflow/unclaimTask.do";	
							ajaxJson["data"] = {"taskId":row.taskId};
							ui.ajax(ajaxJson).data;
							return false;
						}
						queryField["taskId"] = row.taskId;
						ajaxJson["src"] = "/workflow/workApplyFormList.do";	
						ajaxJson["data"] = {"json":JSON.stringify(queryField)};
						var  resultData = ui.ajax(ajaxJson);
						queryField["bizKey"] = row.bizKey;
						queryField["bizType"] = row.bizType;
						menu.control(row.formKey,ui.isNull(resultData)?"":resultData[0].value,row.taskName,queryField);
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

WORKHIT.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  WORKHIT.getTab().find("#add").linkbutton('enable');
		  }else{
			  WORKHIT.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  WORKHIT.getTab().find("#save").linkbutton('enable');;
		  }else{
			  WORKHIT.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				WORKHIT.getTab().find("#edit").linkbutton('enable');
				WORKHIT.getTab().find("#del").linkbutton('enable');
		  }else{
				WORKHIT.getTab().find("#edit").linkbutton('disable');
				WORKHIT.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  WORKHIT.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  WORKHIT.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"query" : function() {
		var workGrid = WORKHIT.getPlugin()["WORKFLOWBECH"];
			workGrid["param"]={
							"bizKey": WORKHIT.getTab().find("#bizKey").textbox('getValue').trim(),
							"bizGcbh":  WORKHIT.getTab().find("#bizGcbh").textbox('getValue').trim(),
							"bizDqxx02": WORKHIT.getTab().find("#DQXX_CITY").textbox("getText"),
							"userId":userInfo.USERID,
							"bizUser":WORKBENCH.bizUser,
							"gsid":WORKBENCH.bizGsid,
							"range":{"start":0,"length":10}
							//"candidateGroup":"dls"
						 };
		WORKHIT.reloadPlugin("WORKFLOWBECH", workGrid);
			
	},
	"add": function(){
		this.setButton(1);
		WORKHIT.getTab().find("#billno").textbox("readonly",false);
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
		WORKHIT.getTab().find("#print").linkbutton('disable');
		sessionStorage["PRINT_URL"] = "/report/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"DJBH\":\"'"+1+"'\"}";
		window.open("/print.html?dybh=1&rid="+Math.random());
		WORKHIT.getTab().find("#print").linkbutton('enable');
	}
});

//加载事件
WORKHIT.setEvents(function(){
	//省
	WORKHIT.getTab().find("#DQXX_PROV").combobox({
		 valueField: 'DQXX01',   
	     textField: 'DQXX02',
	     //groupField: 'jc',
	     mode:'remote',
	     groupFormatter: function(group){
	    	 return '<span style="color:red;">' + group + '</span>';
	     },
	     method: 'POST',
	     queryParams: {"json":"{\"dataType\":\"Json\",\"sqlid\":\"CX.queryPROV\"}"},
	     url: 'khgs/queryPROV.do',
	     onBeforeLoad: function(param){
	    	var json = JSON.parse(param.json);
	    	if(!ui.isNull(param.q))json[0].q = param.q;
	    	param["json"] = JSON.stringify(json);
	 	 },
	     filter: function(q, row){
				var opts = $(this).combobox('options');
				return row[opts.textField].indexOf(q) >= 0;
		 },
	     loadFilter: function(data){
	    	 return data.data.mapList;
	     },
		 onSelect: function(record){
			 console.log(record.DQXX01);
			 //市
				WORKHIT.getTab().find("#DQXX_CITY").combobox({
					 valueField: 'DQXX01',   
					 textField: 'DQXX02',
					 //groupField: 'jc',
					 mode:'remote',
					 groupFormatter: function(group){
						 return '<span style="color:red;">' + group + '</span>';
					 },
					 method: 'POST',
					 queryParams: {"json":"{\"dataType\":\"Json\",\"sqlid\":\"CX.queryCITY\",\"DQX_DQXX01\":\""+record.DQXX01+"\"}"},
					 url: 'khgs/queryCITY.do',
					 onBeforeLoad: function(param){
						var json = JSON.parse(param.json);
						if(!ui.isNull(param.q))json[0].q = param.q;
						//json[0].DQX_DQXX01 = record.DQXX01;
						param["json"] = JSON.stringify(json);
					 },
					 filter: function(q, row){
							var opts = $(this).combobox('options');
							return row[opts.textField].indexOf(q) >= 0;
					 },
					 loadFilter: function(data){
						 return data.data.mapList;
					 },
					 panelWidth: '250px'
				});
		 },
	     panelWidth: '250px'
	});
});

//加载完成
WORKHIT.setAfterInit(function() {  
	
})