var WORKBENCH = ui.Form();
var zone = userInfo.DQXX01;
debugger;
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
WORKBENCH.setPlugin({
	"WORKFLOWBECH" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "Workflow.selectWORKBENCH",
		"action" : "/workflow/workBench.do",
		"param" : {"bizKey":"","bizUser":WORKBENCH.bizUser,"gsid":WORKBENCH.bizGsid},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "Workflow",
		"title" :"我的待办",
		"pagination":true,
		"showFooter" : true,
		"query": true,//初始化查询代办
		"footBtn": [],
		"listener": {
			onSelectPage: function(pageNum, pageSize){//自定义分页
				var ajaxJson = {};
				ajaxJson["src"] = "/workflow/workBench.do";
				var workGrid = WORKBENCH.getPlugin()["WORKFLOWBECH"];
				var range = workGrid["param"].range;
				workGrid["param"].range["start"] = (pageNum-1)*pageSize;
					
				ajaxJson["data"] = {"json":JSON.stringify(workGrid["param"])};
				var  resultData = ui.ajax(ajaxJson);
				return resultData;
			},
			onDblClickRow: function(index, row){
				ui.setUrlParam("/workflow/WORKFLOWIMG.html?processInstanceId="+row.procInstId);
				ui.addTabs("流程图","/workflow/WORKFLOWIMG.html?processInstanceId="+row.procInstId+"&rid="+Math.random());
			},
			onRowContextMenu: function(e, index, row){
				e.preventDefault();
				$("#dataGridMenu").menu('show', {
					left:e.pageX,
					top:e.pageY,
					onClick: function(item){
						debugger;
						/*sessionStorage.setItem("taskId",row.taskId);
						sessionStorage.setItem("bizKey",row.bizKey);
						sessionStorage.setItem("bizType",row.bizType);*/
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
						queryField["row"] = row;
						queryField["bizKey"] = row.bizKey;
						queryField["bizType"] = row.bizType;
						queryField["alqxs"] = ui.isNull(resultData)?[]:resultData;
						queryField["taskName"] = row.taskName;
						queryField["query"] = function(){WORKBENCH.query();};
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

WORKBENCH.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  WORKBENCH.getTab().find("#add").linkbutton('enable');
		  }else{
			  WORKBENCH.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  WORKBENCH.getTab().find("#save").linkbutton('enable');;
		  }else{
			  WORKBENCH.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				WORKBENCH.getTab().find("#edit").linkbutton('enable');
				WORKBENCH.getTab().find("#del").linkbutton('enable');
		  }else{
				WORKBENCH.getTab().find("#edit").linkbutton('disable');
				WORKBENCH.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  WORKBENCH.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  WORKBENCH.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"query" : function() {
		var workGrid = WORKBENCH.getPlugin()["WORKFLOWBECH"];
			workGrid["param"]={
							"bizKey": WORKBENCH.getTab().find("#bizKey").textbox('getValue').trim(),
							"bizGcbh":  WORKBENCH.getTab().find("#bizGcbh").textbox('getValue').trim(),
							"taskName":  WORKBENCH.getTab().find("#taskName").textbox('getValue').trim(),
							"digestCust": WORKBENCH.getTab().find("#zy").textbox('getValue').trim(),
							"bizDqxx02": WORKBENCH.getTab().find("#DQXX_CITY").textbox("getText"),
							"userId":userInfo.USERID,
							"bizUser":WORKBENCH.bizUser,
							"gsid":WORKBENCH.bizGsid,
							"bizStartDateBegin": WORKBENCH.getTab().find("#bizStartDateBegin").datebox('getValue').trim(),
							"bizStartDateEnd": WORKBENCH.getTab().find("#bizStartDateEnd").datebox('getValue').trim(),
							"bizUploadFirstDateBegin": WORKBENCH.getTab().find("#bizUploadFirstDateBegin").datebox('getValue').trim(),
							"bizUploadFirstDateEnd": WORKBENCH.getTab().find("#bizUploadFirstDateEnd").datebox('getValue').trim(),
							"bizUploadLastDateBegin": WORKBENCH.getTab().find("#bizUploadLastDateBegin").datebox('getValue').trim(),
							"bizUploadLastDateEnd": WORKBENCH.getTab().find("#bizUploadLastDateEnd").datebox('getValue').trim(),
							"range":{"start":0,"length":10}
							//"candidateGroup":"dls"
						 };
		WORKBENCH.reloadPlugin("WORKFLOWBECH", workGrid);
			
	},
	"add": function(){
		this.setButton(1);
		WORKBENCH.getTab().find("#billno").textbox("readonly",false);
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
		WORKBENCH.getTab().find("#print").linkbutton('disable');
		sessionStorage["PRINT_URL"] = "/report/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"DJBH\":\"'"+1+"'\"}";
		window.open("/print.html?dybh=1&rid="+Math.random());
		WORKBENCH.getTab().find("#print").linkbutton('enable');
	},
	"saveBatch": function(){//批量通过
		var rows = WORKBENCH.getTab().find("#d_WORKFLOWBECH").datagrid("getChecked");
		if(!ui.isNull(rows)){
			layer.prompt({
				  formType: 2,
				  value: ' ',
				  title: '请输入批量通过原因',
				}, function(value, index, elem){
				  //alert(value); //得到value
					var variables = {};
					variables["msg"] = "通过";
					variables["digestCust"] = value;
					var queryField = {};
					queryField["userId"] = userInfo.USERID;
					queryField["variables"] = variables;
					var taskList = [];
					queryField["taskList"] = taskList;
				  $.each(rows,function(index,val){
					  taskList.push(val.taskId);
					});
				  var ajaxJson = {};
					ajaxJson["src"] = "gczl/auditApproveBatch.do";
					ajaxJson["data"] = {"json":JSON.stringify(queryField)};
					var resultData = ui.ajax(ajaxJson).data;
					if(resultData.respCode=="000000"){
						ui.tip("批量通过成功");
					}
				  layer.close(index);
				});
			 
		}
		WORKBENCH.query();
	},
	"backBatch": function(){//批量拒绝
		var rows = WORKBENCH.getTab().find("#d_WORKFLOWBECH").datagrid("getChecked");
		if(!ui.isNull(rows)){
			layer.prompt({
				  formType: 2,
				  value: ' ',
				  title: '请输入批量拒绝原因',
				}, function(value, index, elem){
				  //alert(value); //得到value
					var variables = {};
					variables["msg"] = "未通过";
					variables["digestCust"] = value;
					var queryField = {};
					queryField["userId"] = userInfo.USERID;
					queryField["variables"] = variables;
					var taskList = [];
					queryField["taskList"] = taskList;
				  $.each(rows,function(index,val){
					  taskList.push(val.taskId);
					});
				  var ajaxJson = {};
					ajaxJson["src"] = "gczl/auditApproveBatch.do";
					ajaxJson["data"] = {"json":JSON.stringify(queryField)};
					var resultData = ui.ajax(ajaxJson).data;
					if(resultData.respCode=="000000"){
						ui.tip("批量驳回成功");
					}
				  layer.close(index);
				});
		}
		WORKBENCH.query();
	},
});

//加载事件
WORKBENCH.setEvents(function(){
	if(userInfo.GROUP.contains("gcy")){
		var alqx = {"saveBatch":{"name":"批量通过","iconcls":"icon-save"},"backBatch":{"name":"批量驳回","iconcls":"icon-save"}};
		WORKBENCH.addButton(alqx);
	}
	//省
	WORKBENCH.getTab().find("#DQXX_PROV").combobox({
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
				WORKBENCH.getTab().find("#DQXX_CITY").combobox({
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
WORKBENCH.setAfterInit(function() {  
	
})