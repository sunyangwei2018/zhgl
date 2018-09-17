var YlImport = ui.Form();

var YlImport_starttime;
var YlImport_endtime;
var YlImport_tbbj;
var YlImport_ylbillno;

YlImport.setPlugin({
	"YD" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFEland.selectEland",
		"columnName" : "Eland",
		"ctrlSelect" : true,
		"singleSelect" : false,
		"pagination":true,
		"param" : {"wd":userInfo.WD01,"yl_billno":[""]},
		"listener": {
			onClickRow: function(index, row){
				var abnormal = YlImport.getPlugin()["billBox"];
				var billno=row.yl_billno;
				abnormal["param"] = {	
						"yl_billno" : billno.split(",")
					};
				YlImport.reloadPlugin("billBox", abnormal);
			}
		}
	},
	"Z1" : {
		"uiid" : "uiUpload",
		"sBillName": "elandImport",//接口路径(有默认值)
		"msg": 'Loading data...',
		"sOperateName":"multiUpload.do?type=1&CFRY01="+userInfo.CFRY01+"&wd="+userInfo.WD01,
		"auto" : true,
		"fileType" : ["text"],
		"listener" : {
			"afterUpload" : function(data){
				var error="";
				var billno="";
				for (var i = 0; i < data.length; i++) {
					if(data[i].errorInfo!=""){
						error+=data[i].errorInfo.error;
						billno+=data[i].errorInfo.billno;
					}
				}
				if(error!=""){
					ui.alert(error);
				}else{
					ui.alert("导入成功");
					var genjin = YlImport.getPlugin()["YD"];
					genjin["param"] = {	
							"yl_billno" : billno.split(",")
						};
					YlImport.reloadPlugin("YD",genjin);
					YlImport.getTab().find('#save').linkbutton('enable');
					YlImport.getTab().find("#billno_hidden").textbox('setValue',billno);
				}
			}
		}
	},
	"billBox" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFEland.selectBillBox",
		"columnName" : "Eland",
		"pagination":true,
		"param" : {"lrr":userInfo.CFRY01,"yl_billno":[""]}
	},
	"BOX" : {
		"uiid" : "uiUpload",
		"sBillName": "elandImport",//接口路径(有默认值)
		"sOperateName":"multiUpload.do?type=2&CFRY01="+userInfo.CFRY01+"&wd="+userInfo.WD01,
		"auto" : true,
		"fileType" : ["text"],
		"listener" : {
			"afterUpload" : function(data){
				var error="";
				var billno="";
				for (var i = 0; i < data.length; i++) {
					if(data[i].errorInfo!=""){
						error+=data[i].errorInfo.error;
						billno+=data[i].errorInfo.billno;
					}
				}
				if(error!=""){
					ui.alert(error);
				}else{
					ui.alert("导入成功");
					var box = YlImport.getPlugin()["billBox"];
					box["param"] = {	
							"yl_billno" : billno.split(",")
						};
					YlImport.reloadPlugin("billBox",box);
				}
			}
		}
	}
});


YlImport.define({
	"print": function() {
		var ajaxJson = YlImport.getTab().find('#d_YD').datagrid('getSelections');	
	    if (ui.isNull(ajaxJson)) {
	        ui.alert("请查询要打印的记录!");
	        return false;
	    };
	    var billno = '';
	    $.each(ajaxJson,function(i,val){
	    	billno = billno + "'"+val.yl_billno+"',";
	    });
	    billno = billno.substring(0,billno.length-1);
	    sessionStorage["PRINT_URL"] = "/reportYLBILL/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"yl_billno\":\""+billno+"\"}";
		window.open("/print.html?dybh=7&rid="+Math.random());
	},
	
	// 定义保存按钮方法
	"save" : function() {
			var billno=YlImport.getTab().find("#billno").textbox('getValue');
			var tbbj=YlImport.getTab().find("#tbbj").textbox('getValue');
			var ajaxJson = YlImport.getTab().find('#d_YD').datagrid('getData');	
			var starttime=YlImport.getTab().find("#starttime").textbox('getValue');
			var endtime=YlImport.getTab().find("#endtime").textbox('getValue');
		    if (ui.isNull(ajaxJson)) {
		        ui.alert("请查询需要同步的数据!");
		        return false;
		    };
			billno=billno.split("\n");
			if(billno==""){
				billno="";
			}
			var ajaxJson2 = YlImport.getTab().find('#d_YD').datagrid('getData').rows.length;
			if(ajaxJson2>0){
				if(billno!=""){
					for (var bill in billno) {
						billno+=",";
					}
				}
				var ajaxJson = {};
				ajaxJson["src"] = "/elandImport/saveBillFromElandBill.do";   
				ajaxJson["data"] = {
					"XmlData" : JSON.stringify($.extend(
													   {"lrr":userInfo.CFRY01},
													   {"billno":billno},
													   {"wd":userInfo.WD01},
													   {"tbbj":tbbj},
													   {"starttime":starttime},
													   {"endtime":endtime}
							))
				};
				var resultData = ui.ajax(ajaxJson);
				if(resultData.data.status==1){
					var abnormal = YlImport.getPlugin()["YD"];
					if(ui.isNull(billno)){
						abnormal["param"] = {	
								"tbbj":tbbj,
								"lrr":userInfo.CFRY01,
								"wd":userInfo.WD01,
								"starttime":starttime,
								"endtime":endtime
							};
					}else{
						abnormal["param"] = {	
								"yl_billno":billno.split(",")
							};
					}
					
					YlImport.reloadPlugin("YD", abnormal);
				}
				ui.alert(resultData.data.msg);
			}else{
				ui.alert("请查询需要同步的数据!");
			}
	},
//定义查询按钮方法
"query" : function() {
		var billno=YlImport.getTab().find("#billno").textbox('getValue');
		var tbbj="";
		var starttime="";
		var endtime="";
		YlImport.getTab().find("#billno_hidden").textbox('setValue',billno.replace(/\n/g,","));
		billno=billno.split("\n");
		if(billno==""){
			billno="";
			tbbj=YlImport.getTab().find("#tbbj").textbox('getValue');
			starttime=YlImport.getTab().find("#starttime").textbox('getValue');
			endtime=YlImport.getTab().find("#endtime").textbox('getValue');
			YlImport.getTab().find("#tbbj_hidden").textbox('setValue',tbbj);
			YlImport.getTab().find("#starttime_hidden").textbox('setValue',starttime);
			YlImport.getTab().find("#endtime_hidden").textbox('setValue',endtime);
			
			YlImport_starttime=starttime;
			YlImport_endtime=endtime;
			YlImport_tbbj=tbbj;
		}else{
			if(billno.length>10000){
				ui.alert('请输入少于10000个单号！');
				return false;
			}
		}
		YlImport_ylbillno=billno;
		var abnormal = YlImport.getPlugin()["YD"];
		abnormal["param"] = {	
				"yl_billno" : billno,
				"tbbj":tbbj,
				"wd":userInfo.WD01,
				"starttime":starttime,
				"endtime":endtime
			};
		YlImport.reloadPlugin("YD", abnormal);
	},
	"cancel" : function() {
		if(ui.isNull(YlImport_ylbillno) && ui.isNull(YlImport_tbbj) && ui.isNull(YlImport_starttime) && ui.isNull(YlImport_endtime)){
			ui.alert("请先查询数据");
			return false;
		}
			var ajaxJson = {};
			ajaxJson["src"] = "/elandImport/deleteYl.do";   
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
												   {"ylbillno":YlImport_ylbillno},
												   {"lrwd":userInfo.WD01},
												   {"tbbj":YlImport_tbbj},
												   {"starttime":YlImport_starttime},
												   {"endtime":YlImport_endtime}
						))
			};
			var resultData = ui.ajax(ajaxJson);
			if(resultData.data.status==1){
				var abnormal = YlImport.getPlugin()["YD"];
				abnormal["param"] = {	
						"yl_billno" : YlImport_ylbillno,
						"tbbj":YlImport_tbbj,
						"lrr":userInfo.CFRY01,
						"wd":userInfo.WD01,
						"starttime":YlImport_starttime,
						"endtime":YlImport_endtime
					};
				YlImport.reloadPlugin("YD", abnormal);
			}
			var abnormal1 = YlImport.getPlugin()["billBox"];
			YlImport.reloadPlugin("billBox", abnormal1);
			ui.alert(resultData.data.msg);
	}
});

YlImport.setAfterInit(function() {
	
	YlImport.getTab().find('#btn').linkbutton({
		onClick: function(){
			var ajaxJson = YlImport.getTab().find('#d_YD').datagrid('getData').rows;	
		    if (ui.isNull(ajaxJson)) {
		        ui.alert("请查询要下载的数据!");
		        return false;
		    };
			$.messager.progress({ 
				title:'请稍后', 
				msg:'页面加载中...',
				text: '数据正在下载......' 
			});
			var billno=YlImport.getTab().find("#billno_hidden").textbox('getValue');
			var tbbj=YlImport.getTab().find("#tbbj_hidden").textbox('getValue');
			var starttime=YlImport.getTab().find("#starttime_hidden").textbox('getValue');
			var endtime=YlImport.getTab().find("#endtime_hidden").textbox('getValue');
		    var params="{\"yl_billno\":\""+billno+"\",\"dybh\":\"7\",\"temple\":\"Prt_YLBILL.jasper\"}";
		    var url="http://dev.spring56.com:8080/pdfdownload/reportYLBILL/downPdf.do";
			 $.ajax({
	             type: "POST",
	             url: url,
	             traditional:true,
	             data: {"billno":billno,"wd":userInfo.WD01,"tbbj":tbbj,"json":params,"starttime":starttime,"endtime":endtime},
	             dataType: "json",
	             success: function(data){
	            	 //alert(JSON.stringify(data));
	            	 if(data!=null){
	            		 ui.alert("下载成功!");
	            		 window.location.href=data.url;
	            		 $.messager.progress('close');
	            	 }
	             }
			 });
		    
		}
	});
	
	
	YlImport.getTab().find('#starttime').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		}
		
	});
	YlImport.getTab().find('#endtime').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	
	YlImport.getTab().find('#starttime').datebox('setValue', ui.formatDate(0,1));
	YlImport.getTab().find('#endtime').datebox('setValue', ui.formatDate(0,1));
	
	YlImport.getTab().find('#qk').linkbutton({
		onClick: function(){
			YlImport.getTab().find('#billno').textbox('setValue',null);
		}
	});
});
