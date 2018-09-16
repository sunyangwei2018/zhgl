var GCZL05CHECKPASS = ui.Form();
var zone = userInfo.DQXX01;

GCZL05CHECKPASS.setPlugin({
	/*"GCZLITEM" : {
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
	},*/
    "fs_1" : {
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
			},
			"onclickDownFiles" : function(file){
				window.open("/FormUpload/img.do?attchId="+file.data("FILEID"));
				//ui.showImg(file.data("FILE_URL")+"."+file.data("FILE_DESC").split(".")[1]);
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

GCZL05CHECKPASS.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  GCZL05CHECKPASS.getTab().find("#add").linkbutton('enable');
		  }else{
			  GCZL05CHECKPASS.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  GCZL05CHECKPASS.getTab().find("#save").linkbutton('enable');;
		  }else{
			  GCZL05CHECKPASS.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				GCZL05CHECKPASS.getTab().find("#edit").linkbutton('enable');
				GCZL05CHECKPASS.getTab().find("#del").linkbutton('enable');
		  }else{
				GCZL05CHECKPASS.getTab().find("#edit").linkbutton('disable');
				GCZL05CHECKPASS.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  GCZL05CHECKPASS.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  GCZL05CHECKPASS.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"add": function(){
		this.setButton(1);
		GCZL05CHECKPASS.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"del": function(){
		
	},
	"clearData": function(){
		GCZL05CHECKPASS.setData({});
	},
	"save": function(){
		var lenght = GCZL05CHECKPASS.getTab().find(".bhbj:checked").length;
		var msg = GCZL05CHECKPASS.getTab().find("#msg").combobox("getText");
		var bhList = ['驳回','驳回经销商'];
		var bakStep = 1;
		var flowMsg = "通过";
		//未通过开启必填字段
		if(bhList.contains(msg)){
			if(lenght==0){
				ui.tip("请至少选择一个资料驳回")
				return false;
			}
			GCZL05CHECKPASS.getTab().find("#digestCust").textbox("enableValidation");
			if(msg == '驳回经销商'){
				bakStep = 2;
			}
			flowMsg="驳回";
		}else{
			GCZL05CHECKPASS.getTab().find("#digestCust").textbox("disableValidation");
		}
		//验证必填项
		if(!GCZL05CHECKPASS.getTab().find("#GCZL05CHECKPASS").form('validate')){
			return false;
		}
		
		if(!ui.isNull(GCZL05CHECKPASS.getData().taskId)){//审核
			var variables = {};
			variables["msg"] = flowMsg;
			variables["digestCust"] = GCZL05CHECKPASS.getTab().find("#digestCust").textbox("getValue");
			var	XmlData =[];
			var queryField = {};
				queryField["userId"] = userInfo.USERID;
				queryField["taskId"] = GCZL05CHECKPASS.getData().taskId;
				queryField["variables"] = variables;
				queryField["step"] = bakStep;
			//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
			if(variables["msg"]=="驳回"){
				var bhData = [];
				//封盒驳回数据
				$.each(GCZL05CHECKPASS.getTab().find(".bhbj:checked"),function(index,val){
					var bhfile={};
					bhfile["GCZLID"] = GCZL05CHECKPASS.getData().bizKey;
					bhfile["TYPE"] = $(val).val();
					bhData.push(bhfile);
				});
				queryField["returnFiles"] = bhData;
			}
			var ajaxJson = {};
			ajaxJson["src"] = "gczl/auditApprove.do";
			ajaxJson["data"] = {"json":JSON.stringify(queryField)};
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData.respCode=="000000"){
				ui.tip(resultData.respMsg);
			}
			if($.type(GCZL05CHECKPASS.getData().query)=="function"){
				GCZL05CHECKPASS.getData().query();
			}
			ui.closeSelectedTab();
			return false;
		}
	},
	"check": function(){
		var variables = {};
		variables["msg"] = GCZL05CHECKPASS.getTab().find("#msg").combobox("getValue");
		variables["digestCust"] = GCZL05CHECKPASS.getTab().find("#digestCust").textbox("getValue");
		var	XmlData =[];
		var queryField = {};
			/*queryField["GCZLID"] = GCZL05CHECKPASS.getTab().find("#GCZLID").textbox("getValue");
			queryField["CUSTOMER_NAME"] = GCZL05CHECKPASS.getTab().find("#CUSTOMER_NAME").textbox("getValue");
			queryField["CUSTOMER_LXR"] = GCZL05CHECKPASS.getTab().find("#CUSTOMER_LXR").textbox("getValue");
			queryField["CUSTOMER_TEL"] = GCZL05CHECKPASS.getTab().find("#CUSTOMER_TEL").textbox("getValue");
			queryField["CUSTOMER_POSTCODE"] = GCZL05CHECKPASS.getTab().find("#CUSTOMER_POSTCODE").textbox("getValue");
			queryField["KHGSID"] =  GCZL05CHECKPASS.getTab().find("#jxs").combobox("getValue");
			queryField["GSID"] =  GCZL05CHECKPASS.getTab().find("#xsgs").combobox("getValue");*/
			queryField["userId"] = userInfo.USERID;
			queryField["taskId"] = GCZL05CHECKPASS.getData().taskId;
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
		
		GCZL05CHECKPASS.getTab().find("#GCBH").combogrid({
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
		    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
		    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
		    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
		    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
		    	GCZL05CHECKPASS.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
		    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
		    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
		    	
		    	GCZL05CHECKPASS.getTab().find("#STORES_ID").val(row["网点编号"]);
		    	GCZL05CHECKPASS.getTab().find("#STORES_NAME").val(row["网点名称"]);
		    	GCZL05CHECKPASS.getTab().find("#SELLER_ID").val(row["销售单位号"]);
		    	GCZL05CHECKPASS.getTab().find("#SELLER_NAME").val(row["商店简称"]);
		    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
		    	GCZL05CHECKPASS.getTab().find("#BUY_DATE").val(row["购买日期"]);
		    	GCZL05CHECKPASS.getTab().find("#SELL_TYPE").val(row["销售类型"]);
		    	GCZL05CHECKPASS.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
		    	GCZL05CHECKPASS.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
		    	GCZL05CHECKPASS.getTab().find("#YEAR").val(row["年份"]);
		    	
		    	
		    	/*var gczlitme =GCZL05CHECKPASS.getPlugin()["GCZLITEM"];
			    	gczlitme["param"]={
							"GCZLID": GCZL05CHECKPASS.getData().bizKey
						 };
			    	GCZL05CHECKPASS.reloadPlugin("GCZLITEM", gczlitme);*/
		    }
		});
		
	},
	"returnValue": function(row){
		GCZL05CHECKPASS.getTab().find("#GCBH").textbox("setValue",row["工程编号"]);
		GCZL05CHECKPASS.getTab().find("#GC_NAME").textbox("setValue",row["工程名称"]);
		GCZL05CHECKPASS.getTab().find("#CUSTOMER_ADDRESS").textbox("setValue",row["用户地址"]);
    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_LXR").textbox("setValue",row["联系人"]);
    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_TEL").textbox("setValue",row["移动电话"]);
    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_POSTCODE").textbox("setValue",row["邮政编码"]);
    	GCZL05CHECKPASS.getTab().find("#INSTALL_DATE").datebox("setValue",row["安装日期"]);
    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_PHONE_AREACODE").textbox("setValue",row["区号"]);
    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_PHONE").textbox("setValue",row["电话号码"]);
    	
    	GCZL05CHECKPASS.getTab().find("#STORES_ID").val(row["网点编号"]);
    	GCZL05CHECKPASS.getTab().find("#STORES_NAME").val(row["网点名称"]);
    	GCZL05CHECKPASS.getTab().find("#SELLER_ID").val(row["销售单位号"]);
    	GCZL05CHECKPASS.getTab().find("#SELLER_NAME").val(row["商店简称"]);
    	GCZL05CHECKPASS.getTab().find("#CUSTOMER_NAME").val(row["用户姓名"]);
    	GCZL05CHECKPASS.getTab().find("#BUY_DATE").val(row["购买日期"]);
    	GCZL05CHECKPASS.getTab().find("#SELL_TYPE").val(row["销售类型"]);
    	GCZL05CHECKPASS.getTab().find("#SELL_ONE").val(row["销售区域代码"]);
    	GCZL05CHECKPASS.getTab().find("#SELL_TWO").val(row["内销售区域代码"]);
    	GCZL05CHECKPASS.getTab().find("#YEAR").val(row["年份"]);
    	
    	
    	/*var gczlitme =GCZL05CHECKPASS.getPlugin()["GCZLITEM"];
	    	gczlitme["param"]={
					"gcbh": row["工程编号"]
				 };
	    	GCZL05CHECKPASS.reloadPlugin("GCZLITEM", gczlitme);*/
	}
});

//加载事件
GCZL05CHECKPASS.setEvents(function(){
	//加载流程按钮权限
	if(!ui.isNull(GCZL05CHECKPASS.getData().alqxs)){
		var alqxs = JSON.parse(GCZL05CHECKPASS.getData().alqxs[0].value);
		$.each(alqxs, function (index,alqx) {
			GCZL05CHECKPASS.addButton(alqx);	
		});
	}
	
	GCZL05CHECKPASS.getTab().find("#jxs").textbox('clear');
	GCZL05CHECKPASS.getTab().find("#jxs").textbox('setValue', userInfo.KHGSID);
	GCZL05CHECKPASS.getTab().find("#jxs").textbox('setText', userInfo.KHNAMEJC);
	GCZL05CHECKPASS.getTab().find("#xsgs").textbox('clear');
	GCZL05CHECKPASS.getTab().find("#xsgs").textbox('setValue', userInfo.GSID);
	GCZL05CHECKPASS.getTab().find("#xsgs").textbox('setText', userInfo.GSNAME);
	GCZL05CHECKPASS.getTab().find("#shr").textbox('setValue', userInfo.USERID);
	GCZL05CHECKPASS.getTab().find("#digestCust").textbox("setValue",GCZL05CHECKPASS.getData().row["digestCust"]);
	//GCZL05CHECKPASS.gcbhComGrid();
	
	GCZL05CHECKPASS.getTab().find("#GCBH").textbox({
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
				    callback:GCZL05CHECKPASS.returnValue
				});
				//$(e.data.target).textbox('setValue', 'Something added!');
			}
		}]
	});

	layui.use('table', function(){
	  var table = layui.table;
	  var queryField = {"businessKey":GCZL05CHECKPASS.getData().bizKey,"includeTaskLocalVariables":true};
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
GCZL05CHECKPASS.setAfterInit(function() { 
	//检查工作流
	if(!ui.isNull(GCZL05CHECKPASS.getData().bizKey)){
		//主表
		var	XmlData =[];
		var queryField = {};
		queryField["dataType"] = "Json";
		queryField["type"] = "Get";
		queryField["QryType"] = "Bill";
		queryField["sqlid"] = "GCZL.selectGCZL";
		queryField["DataBaseType"] = "tms";
		queryField["rid"] = Math.random();
		queryField["GCZLID"] = GCZL05CHECKPASS.getData().bizKey;
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		resultData = ui.isNull(resultData)?{}:resultData[0];
		GCZL05CHECKPASS.getTab().find("#GCZL05CHECKPASS").form("load",resultData);
		
		GCZL05CHECKPASS.getTab().find("#GCBH").textbox("setValue",resultData["GC_ID"]);
		
/*		//明细表
		var gczlitme =GCZL05CHECKPASS.getPlugin()["GCZLITEM"];
    	gczlitme["param"]={
				"GCZLID": GCZL05CHECKPASS.getData().bizKey
			 };
    	GCZL05CHECKPASS.reloadPlugin("GCZLITEM", gczlitme);*/

		//查询文件
		XmlData =[];
		queryField = {};
		queryField["dataType"] = "Json";
		queryField["type"] = "Get";
		queryField["QryType"] = "Bill";
		queryField["sqlid"] = "GCZL.selectGCZLFILES";
		queryField["DataBaseType"] = "tms";
		queryField["rid"] = Math.random();
		queryField["GCZLID"] = GCZL05CHECKPASS.getData().bizKey;
		//queryField["TYPE"] = FILE_TYPE;
		XmlData.push(queryField);
		ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		if(ui.isNull(resultData)){
			return false;
		}
		//查是否有驳回记录
		XmlData =[];
		queryField = {};
		queryField["dataType"] = "Json";
		queryField["type"] = "Get";
		queryField["QryType"] = "Bill";
		queryField["sqlid"] = "GCZL.selectGCZLFILES_sum";
		queryField["DataBaseType"] = "tms";
		queryField["rid"] = Math.random();
		queryField["GCZLID"] = GCZL05CHECKPASS.getData().bizKey;
		queryField["RETURN_FLAG"] = 1;
		XmlData.push(queryField);
		ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var result = ui.ajax(ajaxJson).data;
		var bh = false;
		if(result[0].COUNT>0){
			bh = true;
		}
		$.each(resultData,function(index,val){
			GCZL05CHECKPASS.getTab().find("#d_fs_"+val.TYPE).parent().parent().show();
			var fs = GCZL05CHECKPASS.getPlugin()[("fs_"+val.TYPE).trim()];
			//fs.setData(resultData);
			var upload = GCZL05CHECKPASS.reloadPlugin(("fs_"+val.TYPE).trim(), fs);
			var data = [];
			data.push(val);
			upload.setData(data);
			GCZL05CHECKPASS.workflowFlag = true;
			if(val.RETURN_FLAG!=1&&bh==true){//驳回
				//遮罩
				GCZL05CHECKPASS.getTab().find("#d_fs_"+val.TYPE).parent().parent().divOverlay(true);
			}
		});
		
		//创建遮罩层
		GCZL05CHECKPASS.setData({"mask":new ui.mask(GCZL05CHECKPASS.getTab().find("#detailsDiv"))});
	}
	
})