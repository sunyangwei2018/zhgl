var WORKHITDETAIL = ui.Form();
var zone = userInfo.DQXX01;

WORKHITDETAIL.setPlugin({
	"GCZLITEM" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "GCZL.selectGCZLITEM",
		"param" : {"billno":" AND a.billno = 'AAAAA'","WD01":userInfo.WD01},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "GCZL",
		"title" :"安装情况统计",
		"pagination":false,
		"collapsible":true,
		"showFooter" : false,
		"resource":"tms",
		//"buttons":["Append","Remove"],
		"listener": {
			onDblClickRow: function(index, row){
				
			}
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
		"fileType" : ["zip"],
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
	}
});

WORKHITDETAIL.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  WORKHITDETAIL.getTab().find("#add").linkbutton('enable');
		  }else{
			  WORKHITDETAIL.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  WORKHITDETAIL.getTab().find("#save").linkbutton('enable');;
		  }else{
			  WORKHITDETAIL.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				WORKHITDETAIL.getTab().find("#edit").linkbutton('enable');
				WORKHITDETAIL.getTab().find("#del").linkbutton('enable');
		  }else{
				WORKHITDETAIL.getTab().find("#edit").linkbutton('disable');
				WORKHITDETAIL.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  WORKHITDETAIL.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  WORKHITDETAIL.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"add": function(){
		this.setButton(1);
		WORKHITDETAIL.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"del": function(){
		
	},
	"clearData": function(){
		WORKHITDETAIL.setData({});
	},
	"save": function(){
		if(!ui.isNull(WORKHITDETAIL.getData().taskId)){//审核
			var variables = {};
			variables["msg"] = WORKHITDETAIL.getTab().find("#msg").combobox("getValue");
			variables["digestCust"] = WORKHITDETAIL.getTab().find("#digestCust").textbox("getValue");
			var	XmlData =[];
			var queryField = {};
				queryField["userId"] = userInfo.USERID;
				queryField["taskId"] = WORKHITDETAIL.getData().taskId;
				queryField["variables"] = variables;
			//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
			var ajaxJson = {};
			ajaxJson["src"] = "gczl/auditApprove.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				alert(resultData.respMsg);
			}
			return false;
		}
		var variables = {};
			variables["msg"] = "通过";
		var	XmlData =[];
		var queryField = {};
			queryField["GC_ID"] = WORKHITDETAIL.getTab().find("#GCBH").textbox("getValue");
			queryField["GC_NAME"] = WORKHITDETAIL.getTab().find("#GC_NAME").textbox("getValue");
			queryField["KHGSID"] =  userInfo.KHGSID;
			queryField["GSID"] =  userInfo.GSID;
			queryField["CUSTOMER_LXR"] = WORKHITDETAIL.getTab().find("#CUSTOMER_LXR").textbox("getValue");
			queryField["CUSTOMER_TEL"] = WORKHITDETAIL.getTab().find("#CUSTOMER_TEL").textbox("getValue");
			queryField["INSTALL_DATE"] = WORKHITDETAIL.getTab().find("#INSTALL_DATE").datebox("getValue");
			//queryField["CUSTOMER_POSTCODE"] = WORKHITDETAIL.getTab().find("#CUSTOMER_POSTCODE").textbox("getValue");
			queryField["CUSTOMER_PHONE_AREACODE"] = WORKHITDETAIL.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("getValue");
			queryField["CUSTOMER_PHONE"] = WORKHITDETAIL.getTab().find("#CUSTOMER_PHONE").textbox("getValue");
			
			queryField["CUSTOMER_NAME"] = WORKHITDETAIL.getTab().find("#CUSTOMER_NAME").val();
			queryField["STORES_ID"] = WORKHITDETAIL.getTab().find("#STORES_ID").val();
			queryField["STORES_NAME"] = WORKHITDETAIL.getTab().find("#STORES_NAME").val();
			queryField["SELLER_ID"] = WORKHITDETAIL.getTab().find("#SELLER_ID").val();
			queryField["SELLER_NAME"] = WORKHITDETAIL.getTab().find("#SELLER_NAME").val();
			queryField["CUSTOMER_ADDRESS"] = WORKHITDETAIL.getTab().find("#CUSTOMER_ADDRESS").val();
			queryField["BUY_DATE"] = WORKHITDETAIL.getTab().find("#BUY_DATE").val();
			queryField["SELL_TYPE"] = WORKHITDETAIL.getTab().find("#SELL_TYPE").val();
			queryField["SELL_ONE"] = WORKHITDETAIL.getTab().find("#SELL_ONE").val();
			queryField["SELL_TWO"] = WORKHITDETAIL.getTab().find("#SELL_TWO").val();
			queryField["YEAR"] = WORKHITDETAIL.getTab().find("#YEAR").val();
			
			queryField["userId"] = userInfo.USERID;
			queryField["DefinitionKey"] = "myProcess";//"process_pool1";
			queryField["variables"] = variables;
			queryField["GCZLITEM"] = JSON.stringify(WORKHITDETAIL.getTab().find("#d_GCZLITEM").datagrid("getRows"));
		//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
		var ajaxJson = {};
		ajaxJson["src"] = "gczl/addGczl.do";
		ajaxJson["data"] = {"json":JSON.stringify(queryField)};
		var resultData = ui.ajax(ajaxJson).data;
		if(resultData.respCode=="000000"){
			alert(resultData.respMsg);
		}
	},
	"check": function(){
		var variables = {};
		variables["msg"] = WORKHITDETAIL.getTab().find("#msg").combobox("getValue");
		variables["digestCust"] = WORKHITDETAIL.getTab().find("#digestCust").textbox("getValue");
		var	XmlData =[];
		var queryField = {};
			/*queryField["GCZLID"] = WORKHITDETAIL.getTab().find("#GCZLID").textbox("getValue");
			queryField["CUSTOMER_NAME"] = WORKHITDETAIL.getTab().find("#CUSTOMER_NAME").textbox("getValue");
			queryField["CUSTOMER_LXR"] = WORKHITDETAIL.getTab().find("#CUSTOMER_LXR").textbox("getValue");
			queryField["CUSTOMER_TEL"] = WORKHITDETAIL.getTab().find("#CUSTOMER_TEL").textbox("getValue");
			queryField["CUSTOMER_POSTCODE"] = WORKHITDETAIL.getTab().find("#CUSTOMER_POSTCODE").textbox("getValue");
			queryField["KHGSID"] =  WORKHITDETAIL.getTab().find("#jxs").combobox("getValue");
			queryField["GSID"] =  WORKHITDETAIL.getTab().find("#xsgs").combobox("getValue");*/
			queryField["userId"] = userInfo.USERID;
			queryField["taskId"] = WORKHITDETAIL.getData().taskId;
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
		
		WORKHITDETAIL.getTab().find("#GCBH").combogrid({
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
		    	WORKHITDETAIL.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
		    	WORKHITDETAIL.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
		    	WORKHITDETAIL.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
		    	WORKHITDETAIL.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
		    	WORKHITDETAIL.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
		    	WORKHITDETAIL.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
		    	WORKHITDETAIL.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
		    	
		    	WORKHITDETAIL.getTab().find("#STORES_ID").val(row["网点编号"]);
		    	WORKHITDETAIL.getTab().find("#STORES_NAME").val(row["网点名称"]);
		    	WORKHITDETAIL.getTab().find("#SELLER_ID").val(row["销售单位号"]);
		    	WORKHITDETAIL.getTab().find("#SELLER_NAME").val(row["商店简称"]);
		    	WORKHITDETAIL.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
		    	WORKHITDETAIL.getTab().find("#BUY_DATE").val(row["购买日期"]);
		    	WORKHITDETAIL.getTab().find("#SELL_TYPE").val(row["销售类型"]);
		    	WORKHITDETAIL.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
		    	WORKHITDETAIL.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
		    	WORKHITDETAIL.getTab().find("#YEAR").val(row["年份"]);
		    	
		    	
		    	var gczlitme =WORKHITDETAIL.getPlugin()["GCZLITEM"];
			    	gczlitme["param"]={
							"GCZLID": WORKHITDETAIL.getData().bizKey
						 };
			    	WORKHITDETAIL.reloadPlugin("GCZLITEM", gczlitme);
		    }
		});
		
	},
	"returnValue": function(row){
		WORKHITDETAIL.getTab().find("#GCBH").textbox("setValue",row["工程编号"]);
		WORKHITDETAIL.getTab().find("#GC_NAME").textbox("setValue",row["工程名称"]);
		WORKHITDETAIL.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
    	WORKHITDETAIL.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
    	WORKHITDETAIL.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
    	WORKHITDETAIL.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
    	WORKHITDETAIL.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
    	WORKHITDETAIL.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
    	WORKHITDETAIL.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
    	
    	WORKHITDETAIL.getTab().find("#STORES_ID").val(row["网点编号"]);
    	WORKHITDETAIL.getTab().find("#STORES_NAME").val(row["网点名称"]);
    	WORKHITDETAIL.getTab().find("#SELLER_ID").val(row["销售单位号"]);
    	WORKHITDETAIL.getTab().find("#SELLER_NAME").val(row["商店简称"]);
    	WORKHITDETAIL.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
    	WORKHITDETAIL.getTab().find("#BUY_DATE").val(row["购买日期"]);
    	WORKHITDETAIL.getTab().find("#SELL_TYPE").val(row["销售类型"]);
    	WORKHITDETAIL.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
    	WORKHITDETAIL.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
    	WORKHITDETAIL.getTab().find("#YEAR").val(row["年份"]);
    	
    	
    	var gczlitme =WORKHITDETAIL.getPlugin()["GCZLITEM"];
	    	gczlitme["param"]={
					"gcbh": row["工程编号"]
				 };
	    	WORKHITDETAIL.reloadPlugin("GCZLITEM", gczlitme);
	}
});

//加载事件
WORKHITDETAIL.setEvents(function(){

	WORKHITDETAIL.getTab().find("#jxs").textbox('clear');
	WORKHITDETAIL.getTab().find("#jxs").textbox('setValue', userInfo.KHGSID);
	WORKHITDETAIL.getTab().find("#jxs").textbox('setText', userInfo.KHNAMEJC);
	WORKHITDETAIL.getTab().find("#xsgs").textbox('clear');
	WORKHITDETAIL.getTab().find("#xsgs").textbox('setValue', userInfo.GSID);
	WORKHITDETAIL.getTab().find("#xsgs").textbox('setText', userInfo.GSNAME);
	WORKHITDETAIL.getTab().find("#shr").textbox('setValue', userInfo.USERID);

	debugger;
	//WORKHITDETAIL.gcbhComGrid();
	
	WORKHITDETAIL.getTab().find("#GCBH").textbox({
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
				    callback:WORKHITDETAIL.returnValue
				});
				//$(e.data.target).textbox('setValue', 'Something added!');
			}
		}]
	});

	layui.use('table', function(){
	  debugger;
	  var table = layui.table;
	  var queryField = {"businessKey":WORKHITDETAIL.getData().bizKey};
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
		  ,{field: 'checkPerson', title: '审核员', width:100} 
		]]
		//,data: [{'startDate':'2015/2/10-2015/5/10'},{'checkStatus':'初审'},{'checkRemark':'测试'},{'checkRemark':'admin'}]
		,done: function(res, curr, count){
			debugger;
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
WORKHITDETAIL.setAfterInit(function() { 
	debugger;
	//sessionStorage.setItem("bizKey","11708250001");
	//检查工作流
	if(!ui.isNull(WORKHITDETAIL.getData().bizKey)){
		//主表
		var	XmlData =[];
		var queryField = {};
		queryField["dataType"] = "Json";
		queryField["type"] = "Get";
		queryField["QryType"] = "Bill";
		queryField["sqlid"] = "GCZL.selectGCZL";
		queryField["DataBaseType"] = "tms";
		queryField["rid"] = Math.random();
		queryField["GCZLID"] = WORKHITDETAIL.getData().bizKey;
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		resultData = ui.isNull(resultData)?{}:resultData[0];
		WORKHITDETAIL.getTab().find("#WORKHITDETAIL").form("load",resultData);
		
		WORKHITDETAIL.getTab().find("#GCBH").textbox("setValue",resultData["GC_ID"]);
		
		//明细表
		var gczlitme =WORKHITDETAIL.getPlugin()["GCZLITEM"];
    	gczlitme["param"]={
				"GCZLID": WORKHITDETAIL.getData().bizKey
			 };
    	WORKHITDETAIL.reloadPlugin("GCZLITEM", gczlitme);

		//查询文件
		XmlData =[];
		queryField = {};
		queryField["dataType"] = "Json";
		queryField["type"] = "Get";
		queryField["QryType"] = "Bill";
		queryField["sqlid"] = "GCZL.selectGCZLFILES";
		queryField["DataBaseType"] = "tms";
		queryField["rid"] = Math.random();
		queryField["GCZLID"] = WORKHITDETAIL.getData().bizKey;
		XmlData.push(queryField);
		ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		
		$.each(resultData, function (index,val) {
			var fs = WORKHITDETAIL.getPlugin()[("fs_"+val.TYPE).trim()];
			//fs.setData(resultData);
			var upload = WORKHITDETAIL.reloadPlugin(("fs_"+val.TYPE).trim(), fs);
			var data = [];
			data.push(val);
			upload.setData(data);
	    });
		
		//创建遮罩层
		WORKHITDETAIL.setData({"mask":new ui.mask(WORKHITDETAIL.getTab().find("#detailsDiv"))});
	}
	
})