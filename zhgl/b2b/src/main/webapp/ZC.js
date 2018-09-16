$(function(){
    		layui.use('layer', function(){
    			  var layer = layui.layer;
    		}); 
});
var ZC = ui.Form();

ZC.setPlugin({
	
});

ZC.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  ZC.getTab().find("#add").linkbutton('enable');
		  }else{
			  ZC.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  ZC.getTab().find("#save").linkbutton('enable');;
		  }else{
			  ZC.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				ZC.getTab().find("#edit").linkbutton('enable');
				ZC.getTab().find("#del").linkbutton('enable');
		  }else{
				ZC.getTab().find("#edit").linkbutton('disable');
				ZC.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  ZC.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  ZC.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"add": function(){
		this.setButton(1);
		ZC.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"del": function(){
		
	},
	"save": function(){
			var	XmlData =[];
			var queryField = {};
				queryField["KHGSNAME"] = ZC.getTab().find("#KHGSNAME").textbox("getValue");
				queryField["KHGSROLEID"] = ZC.getTab().find("#xsgs").combobox("getValue");
				if(!ui.isNull(ZC.getTab().find("#SJKHGSID").combobox("getValue"))){
					queryField["SJKHGSID"] = ZC.getTab().find("#SJKHGSID").combobox("getValue");
				}
				queryField["DQ"] =  ZC.getTab().find("#DQXX_CITY").textbox("getValue");
				queryField["ADDRESS"] =  ZC.getTab().find("#ADDRESS").textbox("getValue");
				queryField["GREEBH"] = ZC.getTab().find("#GREEBH").textbox("getValue");
				queryField["TEL"] = ZC.getTab().find("#TEL").textbox("getValue");
				queryField["MOBILE"] = ZC.getTab().find("#MOBILE").textbox("getValue");
				queryField["EMAIL"] = ZC.getTab().find("#EMAIL").textbox("getValue");
			var ajaxJson = {};
			ajaxJson["src"] = "khgs/register.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			console.log(JSON.stringify(queryField));
			return;
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				ui.tip("录入成功");
				//清空数据
				ZC.clearData();
			}else{
				ui.tip(resultData.respMsg);
			}
	},
	"check": function(){
		var variables = {};
		variables["msg"] = ZC.getTab().find("#msg").combobox("getValue");
		variables["digestCust"] = ZC.getTab().find("#digestCust").textbox("getValue");
		var	XmlData =[];
		var queryField = {};
			/*queryField["GCZLID"] = ZC.getTab().find("#GCZLID").textbox("getValue");
			queryField["CUSTOMER_NAME"] = ZC.getTab().find("#CUSTOMER_NAME").textbox("getValue");
			queryField["CUSTOMER_LXR"] = ZC.getTab().find("#CUSTOMER_LXR").textbox("getValue");
			queryField["CUSTOMER_TEL"] = ZC.getTab().find("#CUSTOMER_TEL").textbox("getValue");
			queryField["CUSTOMER_POSTCODE"] = ZC.getTab().find("#CUSTOMER_POSTCODE").textbox("getValue");
			queryField["KHGSID"] =  ZC.getTab().find("#dls").combobox("getValue");
			queryField["GSID"] =  ZC.getTab().find("#xsgs").combobox("getValue");*/
			queryField["taskId"] = ZC.getData().taskId;
			queryField["variables"] = variables;
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
		ZC.setData({});
	},
	"gcbhComGrid" : function(){
		var XmlData = [];
		var ajaxJson = {};
		var queryField={};
		ajaxJson["dataType"] = "Json";
		ajaxJson["sqlid"]="GCZL.selectGCZL_sqlserver";
		XmlData.push(ajaxJson)
		
		ZC.getTab().find("#GCBH").combogrid({
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
		    	ZC.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
		    	ZC.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
		    	ZC.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
		    	ZC.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
		    	ZC.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
		    	ZC.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
		    	ZC.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
		    	
		    	ZC.getTab().find("#STORES_ID").val(row["网点编号"]);
		    	ZC.getTab().find("#STORES_NAME").val(row["网点名称"]);
		    	ZC.getTab().find("#SELLER_ID").val(row["销售单位号"]);
		    	ZC.getTab().find("#SELLER_NAME").val(row["商店简称"]);
		    	ZC.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
		    	ZC.getTab().find("#BUY_DATE").val(row["购买日期"]);
		    	ZC.getTab().find("#SELL_TYPE").val(row["销售类型"]);
		    	ZC.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
		    	ZC.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
		    	ZC.getTab().find("#YEAR").val(row["年份"]);
		    	
		    	
		    	var gczlitme =ZC.getPlugin()["GCZLITEM"];
			    	gczlitme["param"]={
							"gcbh": row["工程编号"]
						 };
			    	ZC.reloadPlugin("GCZLITEM", gczlitme);
		    }
		});
		if($.type(ZC.getData().query)=="function"){
			ZC.getData().query();
		}
	},
	"clearData": function(){
		//表单清空
		ZC.getTab().find("#formZC").find("[name='reset']").trigger("click");
	}
});

//加载事件
ZC.setEvents(function(){

	
	
	ZC.getTab().find("#SJKHGSID").combobox({
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
			if(!ui.isNull(param.q))json[0].q = param.q;
	    	param["json"] = JSON.stringify(json);
	 	 },
	     filter: function(q, row){
				var opts = $(this).combobox('options');
				return row[opts.textField].indexOf(q) >= 0;
		 },
	     loadFilter: function(data){
	    	 return data.data;
	     },
	     panelWidth: '400px'
	});


	//省
	ZC.getTab().find("#DQXX_PROV").combobox({
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
				ZC.getTab().find("#DQXX_CITY").combobox({
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
ZC.setAfterInit(function() {
	 ZC.getTab().find("#register").bind('click', function(){  
		 if(ZC.getTab().find("#xsgs").combobox("getValue")== "03"||ZC.getTab().find("#xsgs").combobox("getValue") == "01"){
			 ZC.getTab().find("#SJKHGSID").textbox("disableValidation");
		 }
		//验证必填项
		if(!ZC.getTab().find("#formZC").form('validate')){
			return false;
		}
		if(!ui.isPhone(null,ZC.getTab().find("#MOBILE").textbox("getValue"))){
			return false;
		}
        var	XmlData =[];
		var queryField = {};
			queryField["KHGSNAME"] = ZC.getTab().find("#KHGSNAME").textbox("getValue");
			queryField["KHGSROLEID"] = ZC.getTab().find("#xsgs").combobox("getValue");
			if(!ui.isNull(ZC.getTab().find("#SJKHGSID").combobox("getValue"))){
				queryField["SJKHGSID"] = ZC.getTab().find("#SJKHGSID").combobox("getValue");
			}
			queryField["DQ"] =  ZC.getTab().find("#DQXX_CITY").combobox("getValue");
			queryField["ADDRESS"] =  ZC.getTab().find("#ADDRESS").textbox("getValue");
			queryField["GREEBH"] = ZC.getTab().find("#GREEBH").textbox("getValue");
			queryField["TEL"] = ZC.getTab().find("#TEL").textbox("getValue");
			queryField["MOBILE"] = ZC.getTab().find("#MOBILE").textbox("getValue");
			queryField["EMAIL"] = ZC.getTab().find("#EMAIL").textbox("getValue");
		var ajaxJson = {};
			ajaxJson["src"] = "khgs/register.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			console.log(JSON.stringify(queryField));
		var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				ui.tip("注册成功");
				//清空数据
				ZC.clearData();
			}else{
				ui.tip(resultData.respMsg);
			}
    }); 

	//销售公司选择代理商清空上级代理商
	ZC.getTab().find("#xsgs").combobox({
		 valueField: 'code',   
	     textField: 'name',
		 onSelect: function(record){
			 console.log(record.code);
			 if(record.code == "03"||record.code == "01"){
				 ZC.getTab().find("#SJKHGSID").combobox("clear");
				 ZC.getTab().find("#SJKHGSID").combobox("readonly",true);
				 ZC.getTab().find("#SJKHGSID").textbox("disableValidation");
			 }else{
				 ZC.getTab().find("#SJKHGSID").combobox("readonly",false);
				 ZC.getTab().find("#SJKHGSID").textbox("enableValidation");
			 }
		 }
	});	
})

var json = {};
ZC.setTab($(document)); 
ZC.setData({});
ZC.initForm(json);
