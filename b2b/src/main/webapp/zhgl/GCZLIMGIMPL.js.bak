var GCZLIMGIMPL = ui.Form();
GCZLIMGIMPL.setPlugin({
	"fs_1" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"multi": false,//单上传
		"fileType" : ["img"],
		"listener" : {
			"afterUpload" : function(data){
				GCZLIMGIMPL.workflowFlag = true;
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
				GCZLIMGIMPL.workflowFlag = true;
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
				GCZLIMGIMPL.workflowFlag = true;
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
				GCZLIMGIMPL.workflowFlag = true;
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
				GCZLIMGIMPL.workflowFlag = true;
				console.log(data);
				$("input[name='"+data[0].FILEID+"']").data("val",data[0].FILE_NAME.split(".")[0]);
			},
			"onclickDownFiles" : function(file){
				window.open("/FormUpload/img.do?attchId="+file.data("FILEID"));
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
				GCZLIMGIMPL.workflowFlag = true;
				console.log(data);
				$("input[name='"+data[0].FILEID+"']").data("val",data[0].FILE_NAME.split(".")[0]);
			},
			"onclickDownFiles" : function(file){
				window.open("/FormUpload/img.do?attchId="+file.data("FILEID"));
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
				GCZLIMGIMPL.workflowFlag = true;
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


GCZLIMGIMPL.define({
	"query" : function(){

	},
	"clearData": function(){
		GCZLIMGIMPL.setData({});
	},
	"save": function(){
		if(!GCZLIMGIMPL.workflowFlag){
			ui.tip("请至少上传一个资料");
			return false;
		}
		
		var requesFile = {"1":"表一","2":"表二","3":"合同","4":"发票","5":"条码","6":"照片","7":"证明文件"};
		//判断必填资料
		for(var i=1;i<=7;i++){
			var value =$("input[name='file_fs_"+i+"'][type='file']").data("val");
			if(!ui.isNull(value)){
				GCZLIMGIMPL.fileMap[i]=value.trim();
			}
		}
		
		//GCZLIMGIMPL.getPlugin()["Z1"] = [$("input[name='file_Z1']").data("fileType")];
		
		var variables = {};
		variables["msg"] = "通过";
		//TODO:再说 variables["digestCust"] = GCZLIMGIMPL.getTab().find("#digestCust").textbox("getValue");
		if(userInfo.KHGSROLEID=="02"){//fenxia
			variables["cust_type"] = "A";
			//variables["dlshr"] = userInfo.SJKHGSID;
		}else{
			variables["cust_type"] = "B";
		}
		var	XmlData =[];
		var queryField = {};
		
		queryField["userId"] = userInfo.USERID;
		queryField["taskId"] = GCZLIMGIMPL.getData().taskId;
		queryField["variables"] = variables;
		queryField["fileMap"] = GCZLIMGIMPL.fileMap;
		queryField["GCZLID"] = GCZLIMGIMPL.getData().bizKey;
		//XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
		var ajaxJson = {};
		ajaxJson["src"] = "gczl/gczlUpload.do";
		ajaxJson["data"] = {"json":JSON.stringify(queryField)};
		var resultData = ui.ajax(ajaxJson).data;
		if(resultData.respCode=="000000"){
			ui.tip(resultData.respMsg);
		}else{
			ui.tip(resultData.respMsg)
		}
		if($.type(GCZLIMGIMPL.getData().query)=="function"){
			GCZLIMGIMPL.getData().query();
		}
		ui.closeSelectedTab();
	}
});


GCZLIMGIMPL.setEvents(function() {
	//true的时候流程流转
	GCZLIMGIMPL.workflowFlag = false;
	GCZLIMGIMPL.addButton({"save":{"name":"保存","iconcls":"icon-save","keywords":"e.ctrlKey  == true && e.keyCode == 83"}});
	
/*	GCZLIMGIMPL.getTab().delegate("#XZMB", "click",function(event){
		var json ={};
		var XmlData={"filename":"工程资料导入","keys":{"billno":"*运单号","cus_code":"*客户代码(编码)","cusno":"客户单号","postdate":"*托运日期","postzone":"*始发地(编码)",
			"postdw":"发货单位","postaddr":"发货地址","postman":"发货人","posttel":"发货电话","acceptzone":"*到达地(编码)","acceptnet":"到达网点(编码)","acceptdw":"*收货单位","acceptaddr":"*收货地址","acceptman":"收货人","accepttel":"收货电话",
			"hwlb":"*货物类别(编码)","boxes":"箱数","duals":"双数","package":"包数","volume":"体积","weight":"重量","flag":"属性","fkfs":"*付款方式(编码)","gg":"规格","postfee":"运费","jj_flag":"是否加急","memo":"运单备注","thfee":"提货费","shfee":"送货费","ccfee":"仓储费","bjfee":"保价费","slfee":"上楼费"},"showBracket":"0"};
//		var XmlData={"a":"测试"};
		json["XmlData"] = JSON.stringify(XmlData);
		ui.download("/excelHandler/downloadTemplate.do",json);
		
//		var ajaxJson = {};
//		ajaxJson["src"] ="/excelHandler/downloadTemplate.do?rid=" + Math.random();
//		ajaxJson["data"] =json;	
//		ui.ajax(ajaxJson);
	});*/

	layui.use('table', function(){
	  var table = layui.table;
	  var queryField = {"businessKey":GCZLIMGIMPL.getData().bizKey,"includeTaskLocalVariables":true};
	  //转换静态表格
	/*	table.init('demo', {
		  height: 200 //设置高度
		  ,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
		  //支持所有基础参数
		}); */
	  
	  //第一个实例
	  table.render({
		elem: '#gzjl01'
		,height: 280
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

GCZLIMGIMPL.setAfterInit(function() {
	var taskId =  GCZLIMGIMPL.getData().taskId;
	var bizKey =  GCZLIMGIMPL.getData().bizKey;
    GCZLIMGIMPL.fileMap = {};

		//查询文件
		XmlData =[];
		queryField = {};
		queryField["dataType"] = "Json";
		queryField["type"] = "Get";
		queryField["QryType"] = "Bill";
		queryField["sqlid"] = "GCZL.selectGCZLFILES";
		queryField["DataBaseType"] = "tms";
		queryField["rid"] = Math.random();
		queryField["GCZLID"] = GCZLIMGIMPL.getData().bizKey;
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
		queryField["GCZLID"] = GCZLIMGIMPL.getData().bizKey;
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
			GCZLIMGIMPL.getTab().find("#d_fs_"+val.TYPE).parent().parent().show();
			var fs = GCZLIMGIMPL.getPlugin()[("fs_"+val.TYPE).trim()];
			//fs.setData(resultData);
			var upload = GCZLIMGIMPL.reloadPlugin(("fs_"+val.TYPE).trim(), fs);
			var data = [];
			data.push(val);
			upload.setData(data);
			GCZLIMGIMPL.workflowFlag = true;
			if(val.RETURN_FLAG!=1&&bh==true){//驳回
				//遮罩
				GCZLIMGIMPL.getTab().find("#d_fs_"+val.TYPE).parent().parent().divOverlay(true);
			}
			GCZLIMGIMPL.fileMap[val.TYPE]=val.FILEID.trim();
		});
		/*var val = ui.isNull(resultData)?null:resultData[0];
		if(!ui.isNull(val)){
			GCZLIMGIMPL.getTab().find("#d_fs_"+val.TYPE).parent().parent().show();
			var fs = GCZLIMGIMPL.getPlugin()[("fs_"+val.TYPE).trim()];
			//fs.setData(resultData);
			var upload = GCZLIMGIMPL.reloadPlugin(("fs_"+val.TYPE).trim(), fs);
			var data = [];
			data.push(val);
			upload.setData(data);
		}*/
});