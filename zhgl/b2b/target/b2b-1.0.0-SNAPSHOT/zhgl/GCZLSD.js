var GCZLSD = ui.Form();
var zone = userInfo.DQXX01;

GCZLSD.setPlugin({
	"GCZLSDCX" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "GCZL.selectGCZLSDCX_Page",
		"param" : {"bizKey":"","userId":userInfo.USERID},
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
			},
			onRowContextMenu: function(e, index, row){
				e.preventDefault();
				$("#dataGridMenu").menu('show', {
					left:e.pageX,
					top:e.pageY,
					onClick: function(item){
						if(item.text=="处理"){
							var queryField={};
							queryField["row"] = row;
							queryField["bizKey"] = row.GCZLID;
							GCZLSD.changeDiv(1);
							GCZLSD.setData(queryField);
							GCZLSD.afterInit();
						}
						if(item.text=="释放"){
							ajaxJson["src"] = "/workflow/unclaimTask.do";	
							ajaxJson["data"] = {"taskId":row.taskId};
							ui.ajax(ajaxJson).data;
							return false;
						}
					}
				});
			}/*,
			onClickRow: function(index,row){
				ui.setUrlParam("/workflow/WORKFLOWIMG.html?processInstanceId="+row.procInstId);
				ui.addTabs("流程图","/workflow/WORKFLOWIMG.html?processInstanceId=6"+row.procInstId+"&rid="+Math.random());
			}*/
		}
	},
    "fs_1" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"multi": false,//单上传
		"fileType" : ["img"],
		"listener" : {
			"afterUpload" : function(data){
				console.log(data);
				$("input[name='"+data[0].FILEID+"']").data("val",data[0].FILE_NAME.split(".")[0]);
				/*var arr=[];
				var json = {};
				json["MBBM"]=1;
				json["CFRY01"]=userInfo.USERID;
				json["nownet"]=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
				json["dqxx01"]=ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01;
				arr.push(data[data.length-1]);
				json["data"]=arr;
				GCZLIMGIMPL.getAWD(json);*/
			},
			"onclickDownFiles" : function(file){
				window.open("/FormUpload/img.do?attchId="+file.data("FILEID"));
				//ui.showImg(file.data("FILE_URL")+"."+file.data("FILEID").split(".")[1]);
			}
		}
	},
	"fs_2" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"multi": false,//单上传
		"fileType" : ["img"],
		"listener" : {
			"afterUpload" : function(data){
				console.log(data);
				$("input[name='"+data[0].FILEID+"']").data("val",data[0].FILE_NAME.split(".")[0]);
				/*var arr=[];
				var json = {};
				json["MBBM"]=1;
				json["CFRY01"]=userInfo.USERID;
				json["nownet"]=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
				json["dqxx01"]=ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01;
				arr.push(data[data.length-1]);
				json["data"]=arr;
				GCZLIMGIMPL.getAWD(json);*/
			},
			"onclickDownFiles" : function(file){
				window.open("/FormUpload/img.do?attchId="+file.data("FILEID"));
				//ui.showImg(file.data("FILE_URL")+"."+file.data("FILE_DESC").split(".")[1]);
			}
		}
	},
    "fs_3" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"multi": false,//单上传
		"fileType" : ["img"],
		"listener" : {
			"afterUpload" : function(data){
				console.log(data);
				$("input[name='"+data[0].FILEID+"']").data("val",data[0].FILE_NAME.split(".")[0]);
				/*var arr=[];
				var json = {};
				json["MBBM"]=1;
				json["CFRY01"]=userInfo.USERID;
				json["nownet"]=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
				json["dqxx01"]=ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01;
				arr.push(data[data.length-1]);
				json["data"]=arr;
				GCZLIMGIMPL.getAWD(json);*/
			},
			"onclickDownFiles" : function(file){
				window.open("/FormUpload/img.do?attchId="+file.data("FILEID"));
				//ui.showImg(file.data("FILE_URL")+"."+file.data("FILE_DESC").split(".")[1]);
			}
		}
	},
	"fs_4" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"multi": false,//单上传
		"fileType" : ["img"],
		"listener" : {
			"afterUpload" : function(data){
				console.log(data);
				$("input[name='"+data[0].FILEID+"']").data("val",data[0].FILE_NAME.split(".")[0]);
				/*var arr=[];
				var json = {};
				json["MBBM"]=1;
				json["CFRY01"]=userInfo.USERID;
				json["nownet"]=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
				json["dqxx01"]=ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01;
				arr.push(data[data.length-1]);
				json["data"]=arr;
				GCZLIMGIMPL.getAWD(json);*/
			},
			"onclickDownFiles" : function(file){
				window.open("/FormUpload/img.do?attchId="+file.data("FILEID"));
				//ui.showImg(file.data("FILE_URL")+"."+file.data("FILE_DESC").split(".")[1]);
			}
		}
	},
	"fs_5" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"multi": false,//单上传
		"fileType" : ["excel"],
		"listener" : {
			"afterUpload" : function(data){
				console.log(data);
				$("input[name='"+data[0].FILEID+"']").data("val",data[0].FILE_NAME.split(".")[0]);
				/*var arr=[];
				var json = {};
				json["MBBM"]=1;
				json["CFRY01"]=userInfo.USERID;
				json["nownet"]=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
				json["dqxx01"]=ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01;
				arr.push(data[data.length-1]);
				json["data"]=arr;
				GCZLIMGIMPL.getAWD(json);*/
			}
		}
	},
	"fs_6" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"multi": false,//单上传
		"fileType" : ["zip"],
		"listener" : {
			"afterUpload" : function(data){
				console.log(data);
				$("input[name='"+data[0].FILEID+"']").data("val",data[0].FILE_NAME.split(".")[0]);
			},
			"onclickDownFiles" : function(file){
				window.open("/FormUpload/img.do?attchId="+file.data("FILEID"));
				//ui.showImg(file.data("FILE_URL")+"."+file.data("FILE_DESC").split(".")[1]);
			}
		}
	},
	"fs_7" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"multi": false,//单上传
		"fileType" : ["img"],
		"listener" : {
			"afterUpload" : function(data){
				console.log(data);
				$("input[name='"+data[0].FILEID+"']").data("val",data[0].FILE_NAME.split(".")[0]);
			},
			"onclickDownFiles" : function(file){
				window.open("/FormUpload/img.do?attchId="+file.data("FILEID"));
				//ui.showImg(file.data("FILE_URL")+"."+file.data("FILE_DESC").split(".")[1]);
			}
		}
	}
});

GCZLSD.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  GCZLSD.getTab().find("#add").linkbutton('enable');
		  }else{
			  GCZLSD.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  GCZLSD.getTab().find("#save").linkbutton('enable');;
		  }else{
			  GCZLSD.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				GCZLSD.getTab().find("#edit").linkbutton('enable');
				GCZLSD.getTab().find("#del").linkbutton('enable');
		  }else{
				GCZLSD.getTab().find("#edit").linkbutton('disable');
				GCZLSD.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  GCZLSD.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  GCZLSD.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"changeDiv" : function(index){
		GCZLSD.getTab().find('#content-tabs').tabs('select',index);
	},
	"query" : function() {
		var workGrid = GCZLSD.getPlugin()["GCZLSDCX"];
			workGrid["param"]=$.extend({"userId":userInfo.USERID},GCZLSD.getTab().find("form[id='GCZLSDCX']").formToJson()[0]);
		GCZLSD.reloadPlugin("GCZLSDCX", workGrid);
			
	},
	"add": function(){
		this.setButton(1);
		GCZLSD.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"del": function(){
		
	},
	"clearData": function(){
		GCZLSD.setData({});
	},
	"save": function(){
		//验证必填项
		if(!GCZLSD.getTab().find("#GCZLSD").form('validate')){
			return false;
		}
		
		if(!ui.isNull(GCZLSD.getData().row.GCZLID)){//审核;
			var	XmlData =[];
			var queryField = {};
				queryField["userId"] = userInfo.USERID;
				queryField["GCZLID"] = GCZLSD.getData().row.GCZLID;
				queryField["SDRQ"] = GCZLSD.getTab().find("#SDRQ").datebox("getValue");
				queryField["FENSHU"] = GCZLSD.getTab().find("#FENSHU").textbox("getValue");
			//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
			var ajaxJson = {};
			ajaxJson["src"] = "gczl/updateGCZLSD.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				ui.tip(resultData.respMsg);
			}
			ui.closeSelectedTab();
			return false;
		}
	},
	"check": function(){
		var variables = {};
		variables["msg"] = GCZLSD.getTab().find("#msg").combobox("getValue");
		variables["digestCust"] = GCZLSD.getTab().find("#digestCust").textbox("getValue");
		var	XmlData =[];
		var queryField = {};
			/*queryField["GCZLID"] = GCZLSD.getTab().find("#GCZLID").textbox("getValue");
			queryField["CUSTOMER_NAME"] = GCZLSD.getTab().find("#CUSTOMER_NAME").textbox("getValue");
			queryField["CUSTOMER_LXR"] = GCZLSD.getTab().find("#CUSTOMER_LXR").textbox("getValue");
			queryField["CUSTOMER_TEL"] = GCZLSD.getTab().find("#CUSTOMER_TEL").textbox("getValue");
			queryField["CUSTOMER_POSTCODE"] = GCZLSD.getTab().find("#CUSTOMER_POSTCODE").textbox("getValue");
			queryField["KHGSID"] =  GCZLSD.getTab().find("#jxs").combobox("getValue");
			queryField["GSID"] =  GCZLSD.getTab().find("#xsgs").combobox("getValue");*/
			queryField["userId"] = userInfo.USERID;
			queryField["taskId"] = GCZLSD.getData().taskId;
			queryField["variables"] = variables;
		//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
		var ajaxJson = {};
		ajaxJson["src"] = "gczl/auditApprove.do";
		ajaxJson["data"] = {"json":JSON.stringify(queryField)};
		var resultData = ui.ajax(ajaxJson).data;
		if(resultData.respCode=="000000"){
			alert(resultData.respMsg);
		}
	},
	"edit": function(){
		
	},
	"print": function(){

	},
	"gcbhComGrid" : function(){
		var XmlData = [];
		var ajaxJson = {};
		var queryField={};
		ajaxJson["dataType"] = "Json";
		ajaxJson["sqlid"]="GCZL.selectGCZL_sqlserver";
		XmlData.push(ajaxJson)
		
		GCZLSD.getTab().find("#GCBH").combogrid({
			panelWidth:450,    
			idField:'工程编号',    
		    textField:'工程名称',
		    url:"jlquery/select.do",
		    queryParams: {"json":JSON.stringify(XmlData)},
		    columns:[[    
		              {field:'工程编号',title:'工程编号',width:100},    
		              {field:'工程名称',title:'工程名称',width:100},
		              {field:'网点编号',title:'网点编号',width:100},
		              {field:'网点名称',title:'网点名称',width:100},
					  {field:'用户姓名',title:'用户姓名',width:100},
					  {field:'联系人',title:'联系人',width:100},
					  {field:'移动电话',title:'移动电话',width:100},
					  {field:'用户地址',title:'用户地址',width:100},
					  {field:'邮政编码',title:'邮政编码',width:100},
					  {field:'安装日期',title:'安装日期',width:100},
					  {field:'区号',title:'区号',width:100},
					  {field:'电话号码',title:'电话号码',width:100},
					  {field:'购买日期',title:'购买日期',width:100},
					  {field:'销售单位号',title:'销售单位号',width:100},
					  {field:'商店简称',title:'商店简称',width:100},
					  {field:'销售类型',title:'销售类型',width:100},
					  {field:'销售区域代码',title:'销售区域代码',width:100},
					  {field:'内销售区域代码',title:'内销售区域代码',width:100},
					  {field:'年份',title:'年份',width:100}
		          ]],
		    loadFilter: function (data) {
		    	var data = data.data;
		    	var rows={};
		    	rows["total"] = data.length;
		    	rows["rows"] = data;
		    	return rows;
		    },
		    onSelect: function(index, row){
		    	GCZLSD.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
		    	GCZLSD.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
		    	GCZLSD.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
		    	GCZLSD.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
		    	GCZLSD.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
		    	GCZLSD.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
		    	GCZLSD.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
		    	
		    	GCZLSD.getTab().find("#STORES_ID").val(row["网点编号"]);
		    	GCZLSD.getTab().find("#STORES_NAME").val(row["网点名称"]);
		    	GCZLSD.getTab().find("#SELLER_ID").val(row["销售单位号"]);
		    	GCZLSD.getTab().find("#SELLER_NAME").val(row["商店简称"]);
		    	GCZLSD.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
		    	GCZLSD.getTab().find("#BUY_DATE").val(row["购买日期"]);
		    	GCZLSD.getTab().find("#SELL_TYPE").val(row["销售类型"]);
		    	GCZLSD.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
		    	GCZLSD.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
		    	GCZLSD.getTab().find("#YEAR").val(row["年份"]);
		    	
		    	
		    	/*var gczlitme =GCZLSD.getPlugin()["GCZLITEM"];
			    	gczlitme["param"]={
							"GCZLID": GCZLSD.getData().bizKey
						 };
			    	GCZLSD.reloadPlugin("GCZLITEM", gczlitme);*/
		    }
		});
		
	},
	"returnValue": function(row){
		GCZLSD.getTab().find("#GCBH").textbox("setValue",row["工程编号"]);
		GCZLSD.getTab().find("#GC_NAME").textbox("setValue",row["工程名称"]);
		GCZLSD.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
    	GCZLSD.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
    	GCZLSD.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
    	GCZLSD.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
    	GCZLSD.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
    	GCZLSD.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
    	GCZLSD.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
    	
    	GCZLSD.getTab().find("#STORES_ID").val(row["网点编号"]);
    	GCZLSD.getTab().find("#STORES_NAME").val(row["网点名称"]);
    	GCZLSD.getTab().find("#SELLER_ID").val(row["销售单位号"]);
    	GCZLSD.getTab().find("#SELLER_NAME").val(row["商店简称"]);
    	GCZLSD.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
    	GCZLSD.getTab().find("#BUY_DATE").val(row["购买日期"]);
    	GCZLSD.getTab().find("#SELL_TYPE").val(row["销售类型"]);
    	GCZLSD.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
    	GCZLSD.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
    	GCZLSD.getTab().find("#YEAR").val(row["年份"]);
    	
    	
    	/*var gczlitme =GCZLSD.getPlugin()["GCZLITEM"];
	    	gczlitme["param"]={
					"gcbh": row["工程编号"]
				 };
	    	GCZLSD.reloadPlugin("GCZLITEM", gczlitme);*/
	}
});

//加载事件
GCZLSD.setEvents(function(){
	//加载流程按钮权限
	if(!ui.isNull(GCZLSD.getData().alqxs)){
		var alqxs = JSON.parse(GCZLSD.getData().alqxs[0].value);
		$.each(alqxs, function (index,alqx) {
			GCZLSD.addButton(alqx);	
		});
	}
	
	GCZLSD.getTab().find("#jxs").textbox('clear');
	GCZLSD.getTab().find("#jxs").textbox('setValue', userInfo.KHGSID);
	GCZLSD.getTab().find("#jxs").textbox('setText', userInfo.KHNAMEJC);
	GCZLSD.getTab().find("#xsgs").textbox('clear');
	GCZLSD.getTab().find("#xsgs").textbox('setValue', userInfo.GSID);
	GCZLSD.getTab().find("#xsgs").textbox('setText', userInfo.GSNAME);
	GCZLSD.getTab().find("#shr").textbox('setValue', userInfo.USERID);
	//GCZLSD.gcbhComGrid();
	
	GCZLSD.getTab().find("#GCBH").textbox({
		icons: [{
			iconCls:'icon-search',
			handler: function(e){
				$("#Dialog").dialog({
				    title: '工程编号查询',
				    width: 1000,    
				    height: 540,    
				    closed: false,    
				    cache: false,
				    draggable:true,
				    href: '/dialog/GCBH.html',    
				    modal: true,
				    param: {},
				    //sqlField: cfPlugin.getSqlField(),
				    callback:GCZLSD.returnValue
				});
				//$(e.data.target).textbox('setValue', 'Something added!');
			}
		}]
	});

	layui.use('table', function(){
	  var table = layui.table;
	  var queryField = {"businessKey":GCZLSD.getData().bizKey,"includeTaskLocalVariables":true};
	  //转换静态表格
	/*	table.init('demo', {
		  height: 200 //设置高度
		  ,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
		  //支持所有基础参数
		}); */
	  
	  //第一个实例
	  table.render({
		elem: '#gzjl'
		,height: 315
		,method: 'post'
		//request: {} //如果无需自定义请求参数，可不加该参数
		//response: {} //如果无需自定义数据响应名称，可不加该参数
		,url: '/gczl/loadHistory.do' //数据接口
		,where: {json: JSON.stringify(queryField)}
		//,page: true //开启分页
		,cols: [[ //表头//checkTime
		  {field: 'checkTime', title: '审核时间', width:'30%', sort: true, fixed: 'left'}
		  ,{field: 'checkStatus', title: '审核状态', width:200}
		  ,{field: 'checkRemark', title: '审核备注', width:'20%'}
		  ,{field: 'refuseCodeReason', title: '是否通过', width:'20%'}
		  ,{field: 'checkPerson', title: '审核员', width:100} 
		]]
		//,data: [{'startDate':'2015/2/10-2015/5/10'},{'checkStatus':'初审'},{'checkRemark':'测试'},{'checkRemark':'admin'}]
		,done: function(res, curr, count){
				//如果是异步请求数据方式，res即为你接口返回的信息。
				//如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
				console.log(res);
				
				//得到当前页码
				console.log(curr); 
				
				//得到数据总量
				console.log(count);
		  }	 
	  });
	});
	
});

//加载完成
GCZLSD.setAfterInit(function() { 
	//检查工作流
	if(!ui.isNull(GCZLSD.getData().bizKey)){
		//主表
		var	XmlData =[];
		var queryField = {};
		queryField["dataType"] = "Json";
		queryField["type"] = "Get";
		queryField["QryType"] = "Bill";
		queryField["sqlid"] = "GCZL.selectGCZL";
		queryField["DataBaseType"] = "tms";
		queryField["rid"] = Math.random();
		queryField["GCZLID"] = GCZLSD.getData().bizKey;
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		resultData = ui.isNull(resultData)?{}:resultData[0];
		GCZLSD.getTab().find("#GCZLSD").form("load",resultData);
		
		GCZLSD.getTab().find("#GCBH").textbox("setValue",resultData["GC_ID"]);
		
/*		//明细表
		var gczlitme =GCZLSD.getPlugin()["GCZLITEM"];
    	gczlitme["param"]={
				"GCZLID": GCZLSD.getData().bizKey
			 };
    	GCZLSD.reloadPlugin("GCZLITEM", gczlitme);*/

		//查询文件
		XmlData =[];
		queryField = {};
		queryField["dataType"] = "Json";
		queryField["type"] = "Get";
		queryField["QryType"] = "Bill";
		queryField["sqlid"] = "GCZL.selectGCZLFILES";
		queryField["DataBaseType"] = "tms";
		queryField["rid"] = Math.random();
		queryField["GCZLID"] = GCZLSD.getData().bizKey;
		XmlData.push(queryField);
		ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		
		$.each(resultData, function (index,val) {
			var fs = GCZLSD.getPlugin()[("fs_"+val.TYPE).trim()];
			//fs.setData(resultData);
			var upload = GCZLSD.reloadPlugin(("fs_"+val.TYPE).trim(), fs);
			var data = [];
			data.push(val);
			upload.setData(data);
	    });
		
		//创建遮罩层
		GCZLSD.setData({"mask":new ui.mask(GCZLSD.getTab().find("#detailsDiv"))});
	}
	
})