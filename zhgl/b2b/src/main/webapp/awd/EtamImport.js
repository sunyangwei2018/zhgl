var EtamImport = ui.Form();

var EtamImport_billlno;
var EtamImport_statetime;
var EtamImport_endtime;

EtamImport.setPlugin({
	"YD" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "etam.selectEtam",
		"columnName" : "YD",
		"pagination" : true,
		"ctrlSelect" : true,
		"singleSelect" : false,
		"footBtn":[],
		"param" : {"CFRY01":userInfo.CFRY01}
	},
	"Z1" : {
		"uiid" : "uiUpload",
		"auto" : true,
		"fileType" : ["excel"],
		"listener" : {
			"afterUpload" : function(data){
				var arr=[];
				var json = {};
				json["MBBM"]=7;
				json["CFRY01"]=userInfo.CFRY01;
				json["nownet"]=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
				json["dqxx01"]=ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01;
				arr.push(data[data.length-1]);
				json["data"]=arr;
				EtamImport.getAWD(json);
			}
		}
	}
});


EtamImport.define({
	"print": function() {
		var ajaxJson = EtamImport.getTab().find('#d_YD').datagrid('getSelections');	
	    if (ui.isNull(ajaxJson)) {
	        ui.alert("请查询要打印的记录!");
	        return false;
	    };
	    var billno = '';
	    $.each(ajaxJson,function(i,val){
	    	billno = billno + "'"+val.etam_billno+"',";
	    });
	    billno = billno.substring(0,billno.length-1);
	    sessionStorage["PRINT_URL"] = "/reportAGBILL/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"ag_billno\":\""+billno+"\"}";
		window.open("/print.html?dybh=11&rid="+Math.random());
	},
	"query" : function(){
		var billno=EtamImport.getTab().find("#etam_billno").textbox('getValue');
		var starttime="";
		var endtime="";
		billno=billno.split("\n");
		if(billno==""){
			billno="";
			starttime=EtamImport.getTab().find("#starttime").textbox('getValue');
			endtime=EtamImport.getTab().find("#endtime").textbox('getValue');
			EtamImport_statetime=starttime;
			EtamImport_endtime=endtime;
		}else{
			if(billno.length>10000){
				ui.alert('请输入少于10000个单号！');
				return false;
			}
		}
		EtamImport_billlno=billno;
		var abnormal = EtamImport.getPlugin()["YD"];
		abnormal["param"] = {	
				"etam_billno" : billno,
				"starttime":starttime,
				"endtime":endtime
			};
		EtamImport.reloadPlugin("YD", abnormal);
	},
	"getAWD": function(json) {
		var ajaxJson = {};
		ajaxJson["src"] ="/EtamInterface/insertEtamEXECL.do?rid=" + Math.random();
		ajaxJson["data"] ={"XmlData":JSON.stringify(json)};
		var resultData = ui.ajax(ajaxJson).data;
		if(!ui.isNull(resultData)&&resultData.MSGID=="S"){
			var starttime=EtamImport.getTab().find("#starttime").textbox('getValue');
			var endtime=EtamImport.getTab().find("#endtime").textbox('getValue');
			var abnormal = EtamImport.getPlugin()["YD"];
			abnormal["param"] = {	
					"starttime":starttime,
					"endtime":endtime,
					"tbbj":resultData.tbbj
				};
			EtamImport.reloadPlugin("YD", abnormal);
		}
	}
});


EtamImport.setAfterInit(function() {
	
	EtamImport.getTab().find('#btn').linkbutton({
		onClick: function(){
			var ajaxJson = EtamImport.getTab().find('#d_YD').datagrid('getData').rows;	
		    if (ui.isNull(ajaxJson)) {
		        ui.alert("请查询要下载的数据!");
		        return false;
		    };
			$.messager.progress({ 
				title:'请稍后', 
				msg:'页面加载中...',
				text: '数据正在下载......' 
			});
		    var params="{\"billno\":\""+EtamImport_billlno+"\",\"dybh\":\"11\",\"temple\":\"Prt_AGBILL.jasper\"}";
		    var url="http://dev.spring56.com:8080/pdfdownload/reportAGBILL/downPdfForAg.do";
			 $.ajax({
	             type: "POST",
	             url: url,
	             traditional:true,
	             data: {"billno":EtamImport_billlno,"tbbj":"","wd":userInfo.WD01,"json":params,"starttime":EtamImport_statetime,"endtime":EtamImport_endtime},
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
	
	
	EtamImport.getTab().find('#starttime').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		}
		
	});
	EtamImport.getTab().find('#endtime').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	
	EtamImport.getTab().find('#starttime').datebox('setValue', ui.formatDate(0,1));
	EtamImport.getTab().find('#endtime').datebox('setValue', ui.formatDate(0,1));
	
	EtamImport.getTab().find('#qk').linkbutton({
		onClick: function(){
			EtamImport.getTab().find('#etam_billno').textbox('setValue',null);
		}
	});
});