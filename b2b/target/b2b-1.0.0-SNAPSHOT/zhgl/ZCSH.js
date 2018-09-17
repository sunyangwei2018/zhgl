var ZCSH = ui.Form();
var zone = userInfo.DQXX01;

ZCSH.setPlugin({
	"ZCSHCX" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "CX.queryZCSH",
		"param" : {"bizKey":"","userId":userInfo.USERID},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "CX",
		"title" :"注册公司审核查询",
		"pagination":true,
		"showFooter" : false,
		"footBtn": [],
		"listener": {
			onDblClickRow: function(index, row){
				ZCSH.returnValue(row)
				ZCSH.changeDiv(1);
			}
		}
	}
});

ZCSH.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  ZCSH.getTab().find("#add").linkbutton('enable');
		  }else{
			  ZCSH.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  ZCSH.getTab().find("#save").linkbutton('enable');;
		  }else{
			  ZCSH.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				ZCSH.getTab().find("#edit").linkbutton('enable');
				ZCSH.getTab().find("#del").linkbutton('enable');
		  }else{
				ZCSH.getTab().find("#edit").linkbutton('disable');
				ZCSH.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  ZCSH.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  ZCSH.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"changeDiv" : function(index){
		ZCSH.getTab().find('#content-tabs').tabs('select',index);
	},
	"query" : function() {
		ZCSH.changeDiv(0);
		var workGrid = ZCSH.getPlugin()["ZCSHCX"];
			workGrid["param"]=$.extend({"userId":userInfo.USERID},ZCSH.getTab().find("form[id='ZCSHCX']").formToJson()[0]);
		ZCSH.reloadPlugin("ZCSHCX", workGrid);
			
	},
	"add": function(){
		this.setButton(1);
		ZCSH.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"del": function(){
		
	},
	"clearData": function(){
		ZCSH.getTab().find("#ZCSHCXITEM").form("clear");
	},
	"save": function(){
		if(ZCSH.getTab().find("#ZCSHCXITEM").find("#rolid").combobox("getValue")== "03"||ZCSH.getTab().find("#ZCSHCXITEM").find("#rolid").combobox("getValue") == "01"){
			 ZCSH.getTab().find("#ZCSHCXITEM").find("#SJKHGSID").textbox("disableValidation");
		 }
		//验证必填项
		if(!ZCSH.getTab().find("#ZCSHCXITEM").form('validate')){
			return false;
		}
		if(!ui.isPhone(null,ZCSH.getTab().find("#ZCSHCXITEM").find("#MOBILE").textbox("getValue"))){
			return false;
		}
		if(ui.isNull(ZCSH.getTab().find("#ZCSHCXITEM").find("#KHGSID").val())){//审核;
			ui.tip("系统错误，请重试");
			return false;
		}
		var	XmlData =[];
			var queryField = {};
				queryField["userId"] = userInfo.USERID;
				queryField["KHGSID"] = ZCSH.getTab().find("#ZCSHCXITEM").find("#KHGSID").val();
				queryField["KHGSNAME"] = ZCSH.getTab().find("#ZCSHCXITEM").find("#KHGSNAME").textbox("getValue");
				queryField["SHZT"] = ZCSH.getTab().find("#ZCSHCXITEM").find("#SHZT").combobox("getValue");
				queryField["KHGSROLEID"] = ZCSH.getTab().find("#ZCSHCXITEM").find("#rolid").combobox("getValue");
				if(!ui.isNull(ZCSH.getTab().find("#ZCSHCXITEM").find("#SJKHGSID").combobox("getValue"))){
					queryField["SJKHGSID"] = ZCSH.getTab().find("#ZCSHCXITEM").find("#SJKHGSID").combobox("getValue");
				}
				queryField["DQ"] =  ZCSH.getTab().find("#ZCSHCXITEM").find("#DQXX_CITY").combobox("getValue");
				queryField["ADDRESS"] =  ZCSH.getTab().find("#ZCSHCXITEM").find("#ADDRESS").textbox("getValue");
				queryField["POSTCODE"] = ZCSH.getTab().find("#ZCSHCXITEM").find("#POSTCODE").textbox("getValue");
				queryField["TEL"] = ZCSH.getTab().find("#ZCSHCXITEM").find("#TEL").textbox("getValue");
				queryField["MOBILE"] = ZCSH.getTab().find("#ZCSHCXITEM").find("#MOBILE").textbox("getValue");
				queryField["EMAIL"] = ZCSH.getTab().find("#ZCSHCXITEM").find("#EMAIL").textbox("getValue");
			//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
			var ajaxJson = {};
			ajaxJson["src"] = "khgs/updateZCSH.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				ui.tip(resultData.respMsg);
			}
		ZCSH.changeDiv(0);
		ZCSH.clearData();
	},
	"check": function(){
		var variables = {};
		variables["msg"] = ZCSH.getTab().find("#msg").combobox("getValue");
		variables["digestCust"] = ZCSH.getTab().find("#digestCust").textbox("getValue");
		var	XmlData =[];
		var queryField = {};
			/*queryField["GCZLID"] = ZCSH.getTab().find("#GCZLID").textbox("getValue");
			queryField["CUSTOMER_NAME"] = ZCSH.getTab().find("#CUSTOMER_NAME").textbox("getValue");
			queryField["CUSTOMER_LXR"] = ZCSH.getTab().find("#CUSTOMER_LXR").textbox("getValue");
			queryField["CUSTOMER_TEL"] = ZCSH.getTab().find("#CUSTOMER_TEL").textbox("getValue");
			queryField["CUSTOMER_POSTCODE"] = ZCSH.getTab().find("#CUSTOMER_POSTCODE").textbox("getValue");
			queryField["KHGSID"] =  ZCSH.getTab().find("#jxs").combobox("getValue");
			queryField["GSID"] =  ZCSH.getTab().find("#xsgs").combobox("getValue");*/
			queryField["userId"] = userInfo.USERID;
			queryField["taskId"] = ZCSH.getData().taskId;
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
		
		ZCSH.getTab().find("#GCBH").combogrid({
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
		    	ZCSH.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
		    	ZCSH.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
		    	ZCSH.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
		    	ZCSH.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
		    	ZCSH.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
		    	ZCSH.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
		    	ZCSH.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
		    	
		    	ZCSH.getTab().find("#STORES_ID").val(row["网点编号"]);
		    	ZCSH.getTab().find("#STORES_NAME").val(row["网点名称"]);
		    	ZCSH.getTab().find("#SELLER_ID").val(row["销售单位号"]);
		    	ZCSH.getTab().find("#SELLER_NAME").val(row["商店简称"]);
		    	ZCSH.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
		    	ZCSH.getTab().find("#BUY_DATE").val(row["购买日期"]);
		    	ZCSH.getTab().find("#SELL_TYPE").val(row["销售类型"]);
		    	ZCSH.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
		    	ZCSH.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
		    	ZCSH.getTab().find("#YEAR").val(row["年份"]);
		    	
		    	
		    	/*var gczlitme =ZCSH.getPlugin()["GCZLITEM"];
			    	gczlitme["param"]={
							"GCZLID": ZCSH.getData().bizKey
						 };
			    	ZCSH.reloadPlugin("GCZLITEM", gczlitme);*/
		    }
		});
		
	},
	"returnValue": function(row){
		ZCSH.clearData();
		ZCSH.getTab().find("#xsgs").combobox("setValue","0101");
		ZCSH.getTab().find("#KHGSID").val(row["KHGSID"]);
		ZCSH.getTab().find("#KHGSNAME").textbox("setValue",row["KHGSNAME"]);
		ZCSH.getTab().find("#rolid").combobox("setValue",row["KHGSROLEID"]);
    	ZCSH.getTab().find("#SJKHGSID").combobox("setValue",row["SJKHGSID"]);
		ZCSH.getTab().find("#SJKHGSID").combobox("setText",row["SJKHGSNAME"]);
    	ZCSH.getTab().find("#DQXX_PROV").combobox("setValue",row["DQ_DQXX01"]);
		ZCSH.getTab().find("#DQXX_PROV").combobox("setText",row["DQ_DQXX02"]);
    	ZCSH.getTab().find("#DQXX_CITY").combobox("setValue",row["DQXX01"]);
		ZCSH.getTab().find("#DQXX_CITY").combobox("setText",row["DQXX02"]);
    	ZCSH.getTab().find("#ADDRESS").textbox("setValue",row["ADDRESS"]);
    	ZCSH.getTab().find("#POSTCODE").textbox("setValue",row["POSTCODE"]);
    	ZCSH.getTab().find("#MOBILE").textbox("setValue",row["MOBILE"]);
		ZCSH.getTab().find("#TEL").textbox("setValue",row["TEL"]);
		ZCSH.getTab().find("#EMAIL").textbox("setValue",row["EMAIL"]);
		ZCSH.getTab().find("#ZCSHCXITEM").find("#SHZT").combobox("setValue",row["FLAG_SH"]);
    	
    	
    	/*var gczlitme =ZCSH.getPlugin()["GCZLITEM"];
	    	gczlitme["param"]={
					"gcbh": row["工程编号"]
				 };
	    	ZCSH.reloadPlugin("GCZLITEM", gczlitme);*/
	}
});

//加载事件
ZCSH.setEvents(function(){
	ZCSH.getTab().find("#SJKHGSID").combobox({
		 valueField: 'KHGSID',   
	     textField: 'KHGSNAME',
	     //groupField: 'jc',
	     mode:'remote',
	     groupFormatter: function(group){
	    	 return '<span style="color:red;">' + group + '</span>';
	     },
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CX.queryKHBYDLS\"}]"},
	     url: 'jlquery/select.do',
	     onBeforeLoad: function(param){
	    	var json = JSON.parse(param.json);
	    	json[0].q = param.q;
	    	if(param == null || param.q == null || param.q.replace(/ /g, '') == ''){
	    		json[0].code =zone;
	    	}
	    	param["json"] = JSON.stringify(json);
	 	 },
	     filter: function(q, row){
				var opts = $(this).combobox('options');
				return row[opts.textField].indexOf(q) >= 0;
		 },
	     loadFilter: function(data){
	    	 return data.data;
	     },
	     panelWidth: '250px'
	});

	//省
	ZCSH.getTab().find("#DQXX_PROV").combobox({
		 valueField: 'DQXX01',   
	     textField: 'DQXX02',
	     //groupField: 'jc',
	     mode:'remote',
	     groupFormatter: function(group){
	    	 return '<span style="color:red;">' + group + '</span>';
	     },
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CX.queryPROV\"}]"},
	     url: 'jlquery/select.do',
	     onBeforeLoad: function(param){
	    	var json = JSON.parse(param.json);
	    	json[0].q = param.q;
	    	if(param == null || param.q == null || param.q.replace(/ /g, '') == ''){
	    		json[0].code =zone;
	    	}
	    	param["json"] = JSON.stringify(json);
	 	 },
	     filter: function(q, row){
				var opts = $(this).combobox('options');
				return row[opts.textField].indexOf(q) >= 0;
		 },
	     loadFilter: function(data){
	    	 return data.data;
	     },
		 onSelect: function(record){
			 console.log(record.DQXX01);
			 //市
				ZCSH.getTab().find("#DQXX_CITY").combobox({
					 valueField: 'DQXX01',   
					 textField: 'DQXX02',
					 //groupField: 'jc',
					 mode:'remote',
					 groupFormatter: function(group){
						 return '<span style="color:red;">' + group + '</span>';
					 },
					 method: 'POST',
					 queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CX.queryCITY\",\"DQX_DQXX01\":\""+record.DQXX01+"\"}]"},
					 url: 'jlquery/select.do',
					 onBeforeLoad: function(param){
						var json = JSON.parse(param.json);
						json[0].q = param.q;
						//json[0].DQX_DQXX01 = record.DQXX01;
						if(param == null || param.q == null || param.q.replace(/ /g, '') == ''){
							json[0].code =zone;
						}
						param["json"] = JSON.stringify(json);
					 },
					 filter: function(q, row){
							var opts = $(this).combobox('options');
							return row[opts.textField].indexOf(q) >= 0;
					 },
					 loadFilter: function(data){
						 return data.data;
					 },
					 panelWidth: '250px'
				});
		 },
	     panelWidth: '250px'
	});

});

//加载完成
ZCSH.setAfterInit(function() { 
	//销售公司选择代理商清空上级代理商
	ZCSH.getTab().find("#xsgs").combobox({
		 valueField: 'code',   
	     textField: 'name',
		 onSelect: function(record){
			 console.log(record.code);
			 if(record.code == "03"||record.code == "01"){
				 ZCSH.getTab().find("#SJKHGSID").combobox("clear");
				 ZCSH.getTab().find("#SJKHGSID").combobox("readonly",true);
				 ZCSH.getTab().find("#SJKHGSID").textbox("disableValidation");
			 }else{
				 ZCSH.getTab().find("#SJKHGSID").combobox("readonly",false);
				 ZCSH.getTab().find("#SJKHGSID").textbox("enableValidation");
			 }
		 }
	});	
	
})