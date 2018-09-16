var GCZLTJ = ui.Form();
var zone = userInfo.DQXX01;

GCZLTJ.setPlugin({
	"GCZLITEM" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "GCZL.selectGCZLITMEGROUPJX",
		"param" : {"billno":" AND a.billno = 'AAAAA'","WD01":userInfo.WD01},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "GCZL",
		"title" :"安装情况统计",
		"pagination":false,
		"collapsible":true,
		"showFooter" : false,
		"resource":"scm",
		//"buttons":["Append","Remove"],
		"listener": {
			onDblClickRow: function(index, row){
				
				
			}
		}
	}
});

GCZLTJ.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  GCZLTJ.getTab().find("#add").linkbutton('enable');
		  }else{
			  GCZLTJ.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  GCZLTJ.getTab().find("#save").linkbutton('enable');;
		  }else{
			  GCZLTJ.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				GCZLTJ.getTab().find("#edit").linkbutton('enable');
				GCZLTJ.getTab().find("#del").linkbutton('enable');
		  }else{
				GCZLTJ.getTab().find("#edit").linkbutton('disable');
				GCZLTJ.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  GCZLTJ.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  GCZLTJ.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"add": function(){
		this.setButton(1);
		GCZLTJ.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"del": function(){
		
	},
	"savePad": function(){
			var variables = {};
			variables["digestCust"] = GCZLTJ.getTab().find("#digestCust").textbox("getValue");
			variables["bizGcbh"] = GCZLTJ.getTab().find("#GCBH").textbox("getValue");
			var	XmlData =[];
			var queryField = {};
				queryField["GC_ID"] = GCZLTJ.getTab().find("#GCBH").textbox("getValue");
				queryField["GC_NAME"] = GCZLTJ.getTab().find("#GC_NAME").textbox("getValue");
				queryField["KHGSID"] =  userInfo.KHGSID;
				queryField["GSID"] =  userInfo.GSID;
				queryField["CUSTOMER_LXR"] = GCZLTJ.getTab().find("#CUSTOMER_LXR").textbox("getValue");
				queryField["CUSTOMER_TEL"] = GCZLTJ.getTab().find("#CUSTOMER_TEL").textbox("getValue");
				queryField["INSTALL_DATE"] = GCZLTJ.getTab().find("#INSTALL_DATE").datebox("getValue");
				//queryField["CUSTOMER_POSTCODE"] = GCZLTJ.getTab().find("#CUSTOMER_POSTCODE").textbox("getValue");
				queryField["CUSTOMER_PHONE_AREACODE"] = GCZLTJ.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("getValue");
				queryField["CUSTOMER_PHONE"] = GCZLTJ.getTab().find("#CUSTOMER_PHONE").textbox("getValue");
				
				queryField["CUSTOMER_NAME"] = GCZLTJ.getTab().find("#CUSTOMER_NAME").val();
				queryField["STORES_ID"] = GCZLTJ.getTab().find("#STORES_ID").val();
				queryField["STORES_NAME"] = GCZLTJ.getTab().find("#STORES_NAME").val();
				queryField["SELLER_ID"] = GCZLTJ.getTab().find("#SELLER_ID").val();
				queryField["SELLER_NAME"] = GCZLTJ.getTab().find("#SELLER_NAME").val();
				queryField["CUSTOMER_ADDRESS"] = GCZLTJ.getTab().find("#CUSTOMER_ADDRESS").val();
				queryField["BUY_DATE"] = GCZLTJ.getTab().find("#BUY_DATE").val();
				queryField["SELL_TYPE"] = GCZLTJ.getTab().find("#SELL_TYPE").val();
				queryField["SELL_ONE"] = GCZLTJ.getTab().find("#SELL_ONE").val();
				queryField["SELL_TWO"] = GCZLTJ.getTab().find("#SELL_TWO").val();
				queryField["YEAR"] = GCZLTJ.getTab().find("#YEAR").val();
				queryField["SJKHGSID"] = GCZLTJ.getTab().find("#dls").textbox("getValue");
				queryField["SJKHGSNAME"] = GCZLTJ.getTab().find("#dls").textbox("getText");

				queryField["userId"] = userInfo.USERID;
				queryField["variables"] = variables;
				queryField["GCZLITEM"] = JSON.stringify(GCZLTJ.getTab().find("#d_GCZLITEM").datagrid("getRows"));
			//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
	   if(ui.isNull(GCZLTJ.getData().taskId)){
			var ajaxJson = {};
			ajaxJson["src"] = "gczl/gczlStart.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				ui.tip("保存草稿成功");
				//清空数据
				//GCZLTJ.clearData();
				GCZLTJ.closeTab();
			}else{
				ui.tip(resultData.respMsg);
			}
		}else{
			queryField["GCZLID"] = GCZLTJ.getData().bizKey;
			var ajaxJson = {};
			ajaxJson["src"] = "gczl/updateGczl.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				ui.tip("保存草稿成功");
				//清空数据
				//GCZLTJ.clearData();
				GCZLTJ.closeTab();
			}else{
				ui.tip(resultData.respMsg);
			}
		}
		WORKBENCH.query();
	},
	"save": function(){
		if(!ui.isNull(GCZLTJ.getData().taskId)){
			var variables = {};
			variables["msg"] = "通过";
			variables["digestCust"] = GCZLTJ.getTab().find("#digestCust").textbox("getValue");
			var	XmlData =[];
			var queryField = {};
				queryField["userId"] = userInfo.USERID;
				queryField["taskId"] = GCZLTJ.getData().taskId;
				queryField["variables"] = variables;
			var ajaxJson = {};
			ajaxJson["src"] = "gczl/auditApprove.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				ui.tip(resultData.respMsg);
				//清空数据
				//GCZLTJ.clearData();
				GCZLTJ.closeTab();
			}else{
				ui.tip(resultData.respMsg);
			}
		}else{
			var variables = {};
				variables["digestCust"] = GCZLTJ.getTab().find("#digestCust").textbox("getValue");
				variables["bizGcbh"] = GCZLTJ.getTab().find("#GCBH").textbox("getValue");
			var	XmlData =[];
			var queryField = {};
				queryField["GC_ID"] = GCZLTJ.getTab().find("#GCBH").textbox("getValue");
				queryField["GC_NAME"] = GCZLTJ.getTab().find("#GC_NAME").textbox("getValue");
				queryField["KHGSID"] =  userInfo.KHGSID;
				queryField["GSID"] =  userInfo.GSID;
				queryField["CUSTOMER_LXR"] = GCZLTJ.getTab().find("#CUSTOMER_LXR").textbox("getValue");
				queryField["CUSTOMER_TEL"] = GCZLTJ.getTab().find("#CUSTOMER_TEL").textbox("getValue");
				queryField["INSTALL_DATE"] = GCZLTJ.getTab().find("#INSTALL_DATE").datebox("getValue");
				//queryField["CUSTOMER_POSTCODE"] = GCZLTJ.getTab().find("#CUSTOMER_POSTCODE").textbox("getValue");
				queryField["CUSTOMER_PHONE_AREACODE"] = GCZLTJ.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("getValue");
				queryField["CUSTOMER_PHONE"] = GCZLTJ.getTab().find("#CUSTOMER_PHONE").textbox("getValue");
				
				queryField["CUSTOMER_NAME"] = GCZLTJ.getTab().find("#CUSTOMER_NAME").val();
				queryField["STORES_ID"] = GCZLTJ.getTab().find("#STORES_ID").val();
				queryField["STORES_NAME"] = GCZLTJ.getTab().find("#STORES_NAME").val();
				queryField["SELLER_ID"] = GCZLTJ.getTab().find("#SELLER_ID").val();
				queryField["SELLER_NAME"] = GCZLTJ.getTab().find("#SELLER_NAME").val();
				queryField["CUSTOMER_ADDRESS"] = GCZLTJ.getTab().find("#CUSTOMER_ADDRESS").val();
				queryField["BUY_DATE"] = GCZLTJ.getTab().find("#BUY_DATE").val();
				queryField["SELL_TYPE"] = GCZLTJ.getTab().find("#SELL_TYPE").val();
				queryField["SELL_ONE"] = GCZLTJ.getTab().find("#SELL_ONE").val();
				queryField["SELL_TWO"] = GCZLTJ.getTab().find("#SELL_TWO").val();
				queryField["YEAR"] = GCZLTJ.getTab().find("#YEAR").val();
				queryField["SJKHGSID"] = GCZLTJ.getTab().find("#dls").textbox("getValue");
				queryField["SJKHGSNAME"] = GCZLTJ.getTab().find("#dls").textbox("getText");

				queryField["userId"] = userInfo.USERID;
				queryField["variables"] = variables;
				queryField["GCZLITEM"] = JSON.stringify(GCZLTJ.getTab().find("#d_GCZLITEM").datagrid("getRows"));
			//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
			var ajaxJson = {};
			ajaxJson["src"] = "gczl/addGczl.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				ui.tip("录入成功");
				//清空数据
				//GCZLTJ.clearData();
				GCZLTJ.closeTab();
			}else{
				ui.tip(resultData.respMsg);
			}
			WORKBENCH.query();
		}
	},
	"check": function(){
		var variables = {};
		variables["msg"] = GCZLTJ.getTab().find("#msg").combobox("getValue");
		variables["digestCust"] = GCZLTJ.getTab().find("#digestCust").textbox("getValue");
		var	XmlData =[];
		var queryField = {};
			/*queryField["GCZLID"] = GCZLTJ.getTab().find("#GCZLID").textbox("getValue");
			queryField["CUSTOMER_NAME"] = GCZLTJ.getTab().find("#CUSTOMER_NAME").textbox("getValue");
			queryField["CUSTOMER_LXR"] = GCZLTJ.getTab().find("#CUSTOMER_LXR").textbox("getValue");
			queryField["CUSTOMER_TEL"] = GCZLTJ.getTab().find("#CUSTOMER_TEL").textbox("getValue");
			queryField["CUSTOMER_POSTCODE"] = GCZLTJ.getTab().find("#CUSTOMER_POSTCODE").textbox("getValue");
			queryField["KHGSID"] =  GCZLTJ.getTab().find("#dls").combobox("getValue");
			queryField["GSID"] =  GCZLTJ.getTab().find("#xsgs").combobox("getValue");*/
			queryField["userId"] = userInfo.USERID;
			queryField["taskId"] = GCZLTJ.getData().taskId;
			queryField["variables"] = variables;
		//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
		var ajaxJson = {};
		ajaxJson["src"] = "gczl/auditApprove.do";
		ajaxJson["data"] = {"json":JSON.stringify(queryField)};
		var resultData = ui.ajax(ajaxJson).data;
		ui.tip(resultData.respMsg);
	},
	"edit": function(){
		
	},
	"print": function(){

	},
	"clearData": function(){
		GCZLTJ.setData({});
	},
	"gcbhComGrid" : function(){
		var XmlData = [];
		var ajaxJson = {};
		var queryField={};
		ajaxJson["dataType"] = "Json";
		ajaxJson["sqlid"]="GCZL.selectGCZL_sqlserver";
		XmlData.push(ajaxJson)
		
		GCZLTJ.getTab().find("#GCBH").combogrid({
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
		    	GCZLTJ.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
		    	GCZLTJ.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
		    	GCZLTJ.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
		    	GCZLTJ.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
		    	GCZLTJ.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
		    	GCZLTJ.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
		    	GCZLTJ.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
		    	
		    	GCZLTJ.getTab().find("#STORES_ID").val(row["网点编号"]);
		    	GCZLTJ.getTab().find("#STORES_NAME").val(row["网点名称"]);
		    	GCZLTJ.getTab().find("#SELLER_ID").val(row["销售单位号"]);
		    	GCZLTJ.getTab().find("#SELLER_NAME").val(row["商店简称"]);
		    	GCZLTJ.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
		    	GCZLTJ.getTab().find("#BUY_DATE").val(row["购买日期"]);
		    	GCZLTJ.getTab().find("#SELL_TYPE").val(row["销售类型"]);
		    	GCZLTJ.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
		    	GCZLTJ.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
		    	GCZLTJ.getTab().find("#YEAR").val(row["年份"]);
		    	
		    	
		    	var gczlitme =GCZLTJ.getPlugin()["GCZLITEM"];
			    	gczlitme["param"]={
							"gcbh": row["工程编号"]
						 };
			    	GCZLTJ.reloadPlugin("GCZLITEM", gczlitme);
		    }
		});
		if($.type(GCZLTJ.getData().query)=="function"){
			GCZLTJ.getData().query();
		}
	},
	"returnValue": function(row){
		GCZLTJ.getTab().find("#GCBH").textbox("setValue",row["工程编号"]);
		GCZLTJ.getTab().find("#GC_NAME").textbox("setValue",row["工程名称"]);
		GCZLTJ.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
    	GCZLTJ.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
    	GCZLTJ.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
    	GCZLTJ.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
    	GCZLTJ.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
    	GCZLTJ.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
    	GCZLTJ.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
    	
    	GCZLTJ.getTab().find("#STORES_ID").val(row["网点编号"]);
    	GCZLTJ.getTab().find("#STORES_NAME").val(row["网点名称"]);
    	GCZLTJ.getTab().find("#SELLER_ID").val(row["销售单位号"]);
    	GCZLTJ.getTab().find("#SELLER_NAME").val(row["商店简称"]);
    	GCZLTJ.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
    	GCZLTJ.getTab().find("#BUY_DATE").val(row["购买日期"]);
    	GCZLTJ.getTab().find("#SELL_TYPE").val(row["销售类型"]);
    	GCZLTJ.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
    	GCZLTJ.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
    	GCZLTJ.getTab().find("#YEAR").val(row["年份"]);
    	
    	
    	var gczlitme =GCZLTJ.getPlugin()["GCZLITEM"];
    	if(ui.isNull(row["工程编号"])){//无工程编号
    		gczlitme["param"]={
			    	"GC_NAME": row["工程名称"],
					"INSTALL_DATE": row["安装日期"],
					"wdList":userInfo.WD
				 };
    	}else{//有工程编号
    		gczlitme["param"]={
					"GCBH": row["工程编号"],
    				"wdList":userInfo.WD
				 };
    	}  	
	    GCZLTJ.reloadPlugin("GCZLITEM", gczlitme);
	},
	"clearData": function(){
		//表单清空
		GCZLTJ.getTab().find("#GCZLTJ").find("[name='reset']").trigger("click");
		//grid清空
		GCZLTJ.getTab().find("#d_GCZLITEM").datagrid("loadData",[]);
	},
	"closeTab": function(){
		var tab = $("#navTab").tabs('getSelected');
		var index = $("#navTab").tabs('getTabIndex',tab);
		$("#navTab").tabs('close',index);
	}
});

//加载事件
GCZLTJ.setEvents(function(){
	GCZLTJ.getTab().find("#dls").textbox('clear');
	GCZLTJ.getTab().find("#dls").textbox('setValue', userInfo.SJKHGSID);
	GCZLTJ.getTab().find("#dls").textbox('setText', userInfo.SJKHNAMEJC);
	GCZLTJ.getTab().find("#xsgs").textbox('clear');
	GCZLTJ.getTab().find("#xsgs").textbox('setValue', userInfo.GSID);
	GCZLTJ.getTab().find("#xsgs").textbox('setText', userInfo.GSNAME);
	GCZLTJ.getTab().find("#shr").textbox('setValue', userInfo.USERID);
	GCZLTJ.getTab().find("#SAVE_USERNAME").textbox('setValue', userInfo.USERNAME);
	//GCZLTJ.gcbhComGrid();
	
	GCZLTJ.getTab().find("#GCBH").textbox({
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
				    callback:GCZLTJ.returnValue
				});
				//$(e.data.target).textbox('setValue', 'Something added!');
			}
		}]
	});
});

//加载完成
GCZLTJ.setAfterInit(function() {
	//检查工作流
	if(!ui.isNull(GCZLTJ.getData().bizKey)){
		GCZLTJ.addButton({"save":{"name":"保存","iconcls":"icon-save","keywords":"e.ctrlKey  == true && e.keyCode == 83"}});
		GCZLTJ.addButton({"savePad":{"name":"保存草稿","iconcls":"icon-save","keywords":"e.ctrlKey  == true && e.keyCode == 84"}});
		GCZLTJ.getTab().find("#GCBH").textbox("readonly",true)
		//主表
		var	XmlData =[];
		var queryField = {};
		queryField["dataType"] = "Json";
		queryField["type"] = "Get";
		queryField["QryType"] = "Bill";
		queryField["sqlid"] = "GCZL.selectGCZL";
		queryField["DataBaseType"] = "tms";
		queryField["rid"] = Math.random();
		queryField["GCZLID"] = GCZLTJ.getData().bizKey;
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		resultData = ui.isNull(resultData)?{}:resultData[0];
		GCZLTJ.getTab().find("#GCZLTJ").form("load",resultData);
		GCZLTJ.getTab().find("#GCBH").textbox("setValue",resultData["GC_ID"]);
		GCZLTJ.getTab().find("#dls").textbox("setText",resultData["SJKHGSID"])
		GCZLTJ.getTab().find("#dls").textbox("setText",resultData["SJKHGSNAME"])
		
		//明细表
		var gczlitme =GCZLTJ.getPlugin()["GCZLITEM"];
		gczlitme["sqlid"]="GCZL.selectGCZLITEM";
		gczlitme["resource"]="tms";
    	gczlitme["param"]={
				"GCZLID": resultData["GCZLID"]
			 };
    	GCZLTJ.reloadPlugin("GCZLITEM", gczlitme);
		return false;
	}
})