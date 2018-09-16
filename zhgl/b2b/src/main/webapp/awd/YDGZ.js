var YDGZ = ui.Form();
var billno;

YDGZ.setPlugin({
	"YDGZBILL" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "YDGZ.selectYDGZ_BILLPage",
		"param" : {"billno":" AND a.billno = 'AAAAA'","WD01":userInfo.WD01},
		"columnName" : "YD",
		"title" :"运单信息",
		"pagination":true,
		//"pageSize" : 300,
		//"showFooter" : true,
		"listener": {
			onClickRow: function(index, row){
				if (billno != row.billno){
					billno = row.billno;
				var YDGZSTATE = YDGZ.getPlugin()["YDGZSTATE"];
				YDGZSTATE["param"] = {	
						"billno" : row.billno
					};
				YDGZ.reloadPlugin("YDGZSTATE", YDGZSTATE);
				
				var YDGZBOX = YDGZ.getPlugin()["YDGZBOX"];
				YDGZBOX["param"] = {	
						"billno" : row.billno,
						"taskno" : row.taskno
					};
				YDGZ.reloadPlugin("YDGZBOX", YDGZBOX);
				
				}
			},
			onDblClickRow: function(index,row){
				YDGZ.getTab().find("#ydgzwin").css("display","block");
				YDGZ.getTab().find("#ydgzwin").dialog({ 
				    title: '运单详细信息',
				    width: 800,    
				    height: 620,    
				    closed: true,
				}); 
				var XmlData = [];
				var queryField={};
				queryField["dataType"] = "Json";
				queryField["sqlid"] = "YDGZ.selectBill";
				queryField["DataBaseType"] = "tms";
				queryField["billno"] =row.billno;
				XmlData.push(queryField);
				var ajaxJson = {};
				ajaxJson["src"] = "jlquery/select.do";
				ajaxJson["data"] = {"json":JSON.stringify(XmlData)};			
				var resultData = ui.ajax(ajaxJson).data;
				$('#wbillno111').textbox('setValue',resultData[0].billno);
				$('#wstate111').textbox('setValue',resultData[0].state);
				$('#wnow_net111').textbox('setValue',resultData[0].nownet);
				$('#wpostzone111').textbox('setValue',resultData[0].postzone);
				$('#wpostnet111').textbox('setValue',resultData[0].postnet);
				$('#wpostman111').textbox('setValue',resultData[0].postman);
				$('#wacceptzone111').textbox('setValue',resultData[0].acceptzone);
				$('#wacceptnet111').textbox('setValue',resultData[0].acceptnet);
				$('#wacceptman111').textbox('setValue',resultData[0].acceptman);
				$('#wacceptaddr111').textbox('setValue',resultData[0].acceptaddr);
				$('#wpostaddr111').textbox('setValue',resultData[0].postaddr);
				$('#wboxes111').textbox('setValue',resultData[0].boxes);
				$('#wduals111').textbox('setValue',resultData[0].duals);
				$('#wvolume111').textbox('setValue',resultData[0].volume);
				$('#wacceptdw111').textbox('setValue',resultData[0].acceptdw);
				$('#wpostdw111').textbox('setValue',resultData[0].postdw);
				$('#wddh111').textbox('setValue',resultData[0].ddh);
				$('#wlrr111').textbox('setValue',resultData[0].lrr);
				$('#wlrrq111').textbox('setValue',resultData[0].lrrq);
				$('#wpostdate111').textbox('setValue',resultData[0].postdate);
				$('#wposttel111').textbox('setValue',resultData[0].posttel);
				$('#waccepttel111').textbox('setValue',resultData[0].accepttel);
				$('#wpackage111').textbox('setValue',resultData[0].packages);
				$('#wweight111').textbox('setValue',resultData[0].weight);
				$('#wcus_name111').textbox('setValue',resultData[0].cus_name);
				$('#wsignman111').textbox('setValue',resultData[0].signman);
				$('#wccfee111').textbox('setValue',resultData[0].ccfee);
				$('#wshfee111').textbox('setValue',resultData[0].shfee);
				$('#wpostfee111').textbox('setValue',resultData[0].postfee);
				$('#wbjfee111').textbox('setValue',resultData[0].bjfee);
				$('#wthfee111').textbox('setValue',resultData[0].thfee);
				$('#wslfee111').textbox('setValue',resultData[0].slfee);
				$('#wtotalprice111').textbox('setValue',resultData[0].totalprice);
				$('#wfkfs111').textbox('setValue',resultData[0].fkfs);
				$('#ydgzwin').window('open');
			}
		}
	},
});

YDGZ.setPlugin({
	"YDGZSTATE" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "YDGZ.selectYDGZ_STATE",
		"param" : {"billno":"AAAAA"},
		"columnName" : "YD",
		"title" :"跟踪信息",
		"listener": {
			onClickRow: function(index, row){
				$('#d_YDGZBOX').datagrid('loadData', { total: 0, rows: [] });
				var state;
				if(row.state ==1){
					var YDGZBOX = YDGZ.getPlugin()["YDGZBOX"];
					YDGZBOX["param"] = {
							"billno" : row.billno,
							"scantype" : 1,
							"taskno" : row.taskno
						};
					YDGZ.reloadPlugin("YDGZBOX", YDGZBOX);
				}else if(row.state ==2){
					var YDGZBOX = YDGZ.getPlugin()["YDGZBOX"];
					YDGZBOX["param"] = {	
							"billno" : row.billno,
							"scantype" : 2
						};
					YDGZ.reloadPlugin("YDGZBOX", YDGZBOX);
				}else if(row.state ==4){
					var YDGZBOX = YDGZ.getPlugin()["YDGZBOX"];
					YDGZBOX["param"] = {	
							"billno" : row.billno,
							"scantype" : 3
						};
					YDGZ.reloadPlugin("YDGZBOX", YDGZBOX);
				}else if(row.state ==5){
					var YDGZBOX = YDGZ.getPlugin()["YDGZBOX"];
					YDGZBOX["param"] = {	
							"billno" : row.billno,
							"scantype" : 4,
							"taskno" : row.taskno
						};
					YDGZ.reloadPlugin("YDGZBOX", YDGZBOX);
				}else if(row.state ==8){
					var YDGZBOX = YDGZ.getPlugin()["YDGZBOX"];
					YDGZBOX["param"] = {	
							"billno" : row.billno,
							"scantype" : 7,
							"taskno" : row.taskno
						};
					YDGZ.reloadPlugin("YDGZBOX", YDGZBOX);
				}else if(row.state ==9){
					var YDGZBOX = YDGZ.getPlugin()["YDGZBOX"];
					YDGZBOX["param"] = {	
							"billno" : row.billno,
							"scantype" : 8,
							"taskno" : row.taskno
						};
					YDGZ.reloadPlugin("YDGZBOX", YDGZBOX);
				}else if(row.state ==10){
					var YDGZBOX = YDGZ.getPlugin()["YDGZBOX"];
					YDGZBOX["param"] = {	
							"billno" : row.billno,
							"scantype" : 9
						};
					YDGZ.reloadPlugin("YDGZBOX", YDGZBOX);
				}else if(row.state ==16){
					var YDGZBOX = YDGZ.getPlugin()["YDGZBOX"];
					YDGZBOX["param"] = {	
							"billno" : row.billno,
							"scantype" : 13,
							"taskno" : row.taskno
						};
					YDGZ.reloadPlugin("YDGZBOX", YDGZBOX);
				}
			}
		}
	},
});

YDGZ.setPlugin({
	"YDGZBOX" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "YDGZ.selectYDGZ_BOX",
		"param" : {"billno":"BJ001","scantype":"99"},
		"columnName" : "YD",
		"title" :"扫描信息",
		"pagination":true,
		"footBtn": [],
	},
});

YDGZ.define({
	// 定义查询按钮方法
	"query" : function() {
		billno = '';

		var lrrq_S;
		var lrrq_E;
		var postdate_S;
		var postdate_E;
		var pzrq_S;
		var pzrq_E;
		var fcrq_S;
		var fcrq_E;
		var dcrq_S;
		var dcrq_E;
		var xhrq_S;
		var xhrq_E;
		var psrq_S;
		var psrq_E;
		var zyrq_S;
		var zyrq_E;
		var qsrq_S;
		var qsrq_E;
		var shrq_S;
		var shrq_E;
		if(YDGZ.getTab().find("#rq").combobox('getValue')=='1'){
			lrrq_S = YDGZ.getTab().find("#rq_S").datetimebox('getValue').trim();
			lrrq_E = YDGZ.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(YDGZ.getTab().find("#rq").combobox('getValue')=='2'){
			postdate_S = YDGZ.getTab().find("#rq_S").datetimebox('getValue').trim();
			postdate_E = YDGZ.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(YDGZ.getTab().find("#rq").combobox('getValue')=='3'){
			pzrq_S = YDGZ.getTab().find("#rq_S").datetimebox('getValue').trim();
			pzrq_E = YDGZ.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(YDGZ.getTab().find("#rq").combobox('getValue')=='4'){
			fcrq_S = YDGZ.getTab().find("#rq_S").datetimebox('getValue').trim();
			fcrq_E = YDGZ.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(YDGZ.getTab().find("#rq").combobox('getValue')=='5'){
			dcrq_S = YDGZ.getTab().find("#rq_S").datetimebox('getValue').trim();
			dcrq_E = YDGZ.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(YDGZ.getTab().find("#rq").combobox('getValue')=='6'){
			xhrq_S = YDGZ.getTab().find("#rq_S").datetimebox('getValue').trim();
			xhrq_E = YDGZ.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(YDGZ.getTab().find("#rq").combobox('getValue')=='7'){
			psrq_S = YDGZ.getTab().find("#rq_S").datetimebox('getValue').trim();
			psrq_E = YDGZ.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(YDGZ.getTab().find("#rq").combobox('getValue')=='8'){
			zyrq_S = YDGZ.getTab().find("#rq_S").datetimebox('getValue').trim();
			zyrq_E = YDGZ.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(YDGZ.getTab().find("#rq").combobox('getValue')=='9'){
			qsrq_S = YDGZ.getTab().find("#rq_S").datetimebox('getValue').trim();
			qsrq_E = YDGZ.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(YDGZ.getTab().find("#rqcx").combobox('getValue')=='10'){
			shrq_S = YDGZ.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			shrq_E = YDGZ.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		};
		var YDGZBILL = YDGZ.getPlugin()["YDGZBILL"];
		if(ui.isNull(YDGZ.getTab().find('#billno').val())){
			YDGZBILL["param"] = {
					"acceptnet": YDGZ.getTab().find("#acceptnet").combobox('getValue').trim(),
					"postnet": YDGZ.getTab().find("#postnet").combobox('getValue').trim(),
					"cus_code":YDGZ.getTab().find("#cus_code").combobox('getValue').trim(),
					"fkfs":YDGZ.getTab().find("#fkfs").combobox('getValue').trim(),
					"state":YDGZ.getTab().find("#state").combobox('getValue').trim(),
					"nownet":YDGZ.getTab().find("#nownet").combobox('getValue').trim(),
					"zznet":YDGZ.getTab().find("#zznet").combobox('getValue').trim(),
					"postzone":YDGZ.getTab().find("#postzone").textbox('getValue').trim(),
					"acceptzone":YDGZ.getTab().find("#acceptzone").textbox('getValue').trim(),
					"ddh":YDGZ.getTab().find("#ddh").textbox('getValue').trim(),
					"stp":YDGZ.getTab().find("#stp").combobox('getValue').trim(),
					"lrrq_S":lrrq_S,
					"lrrq_E":lrrq_E,
					"postdate_S":postdate_S,
					"postdate_E":postdate_E,
					"pzrq_S":pzrq_S,
					"pzrq_E":pzrq_E,
					"fcrq_S":fcrq_S,
					"fcrq_E":fcrq_E,
					"dcrq_S":dcrq_S,
					"dcrq_E":dcrq_E,
					"xhrq_S":xhrq_S,
					"xhrq_E":xhrq_E,
					"psrq_S":psrq_S,
					"psrq_E":psrq_E,
					"zyrq_S":zyrq_S,
					"zyrq_E":zyrq_E,
					"qsrq_S":qsrq_S,
					"qsrq_E":qsrq_E,
					"shrq_S":shrq_S,
					"shrq_E":shrq_E,
					"WD01":userInfo.WD01
				};
		}else{
			if(YDGZ.getTab().find('#billno').val().split("\n").length>10000){
				ui.alert('请输入少于10000个单号！');
				return false;
			}
			YDGZBILL["param"] = {
					"billno" : YDGZ.getTab().find('#billno').val().split("\n"),
					"WD01":userInfo.WD01
				};
		}
		
		YDGZ.reloadPlugin("YDGZBILL", YDGZBILL);
		$('#d_YDGZBOX').datagrid('loadData', { total: 0, rows: [] });
		$('#d_YDGZSTATE').datagrid('loadData', { total: 0, rows: [] });
	},
		
	//获取资产类型下拉列表
	"getwd" : function(){
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["sqlid"] = "CFWD.selectJSWD";
		queryField["DataBaseType"] = "tms";
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
			
		var resultData = ui.ajax(ajaxJson).data;
		return resultData;
		},	
	"getstate" : function(){
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "YDGZ.selectSTATE";
			queryField["DataBaseType"] = "tms";
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
			var resultData = ui.ajax(ajaxJson).data;
			return resultData;
	},	
		"getcust" : function(){
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "YDGZ.selectCUST";
			queryField["DataBaseType"] = "tms";
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
			var resultData = ui.ajax(ajaxJson).data;
			return resultData;
		},	
		"getfkfs" : function(){
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "YDGZ.selectFKFS";
			queryField["DataBaseType"] = "tms";
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
			var resultData = ui.ajax(ajaxJson).data;
			return resultData;
		},	
		"getclxx" : function(taskno){
			window.open('/awd/MAP.html?taskno='+taskno, "_new");  				
		},

});

YDGZ.setAfterInit(function() {
	//发货网点
	YDGZ.getTab().find('#postnet').combobox({ 
		data:YDGZ.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//到达网点
	YDGZ.getTab().find('#acceptnet').combobox({ 
		data:YDGZ.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//当前网点
	YDGZ.getTab().find('#nownet').combobox({ 
		data:YDGZ.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//中转网点
	YDGZ.getTab().find('#zznet').combobox({ 
		data:YDGZ.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//状态
	YDGZ.getTab().find('#state').combobox({ 
		data:YDGZ.getstate(),
		valueField:'code',    
		textField:'name',
	});
	//客户
	YDGZ.getTab().find('#cus_code').combobox({ 
		data:YDGZ.getcust(),
		valueField:'cus_code',    
		textField:'s_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//付款方式    
	YDGZ.getTab().find('#fkfs').combobox({ 
		data:YDGZ.getfkfs(),
		valueField:'code',    
		textField:'name',
	});
	
	YDGZ.getTab().find('#qk').linkbutton({
		onClick: function(){
			YDGZ.getTab().find('#billno').val("");
		}
	});
	YDGZ.getTab().find('#rq_S').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		},
	});
	YDGZ.getTab().find('#rq_E').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	YDGZ.getTab().find('#rq_S').datebox('setValue', ui.formatDate(0,1));
	YDGZ.getTab().find('#rq_E').datebox('setValue', ui.formatDate(0,1));
	YDGZ.getTab().find('#tpck').linkbutton({
		onClick: function(){
			var ajaxJson = YDGZ.getTab().find('#d_YDGZBILL').datagrid('getSelections');	
		    if (ui.isNull(ajaxJson)) {
		        ui.alert("请选择要查看的运单!");
		        return false;
		    }
		    
		    var a = 0;
		    var billno = '';
		    var pic = '';
		    $.each(ajaxJson,function(i,val){
		    	a = a + 1;
		    	billno = val.billno;
		    	pic = val.pic;
		    });
		    if (a != 1){
		    	ui.alert("请选择单行查看!");
		        return false;
		    }
		    if(pic =='否'){
		    	ui.alert("此运单未上传图片");
		    	return false;
		    }
		   // window.open('/awd/PIC.html?billno='+billno+'&fenlei=1', "_new");
		    $.getJSON('cfydcx/getQSPic.do?billno='+billno+'&fenlei=1', function(json){
				  layer.photos({
				    photos: json
				    //,anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
				  });
				}); 
		}
	});
	YDGZ.getTab().find('#tpckcw').linkbutton({
		onClick: function(){
			var ajaxJson = YDGZ.getTab().find('#d_YDGZBILL').datagrid('getSelections');	
		    if (ui.isNull(ajaxJson)) {
		        ui.alert("请选择要查看的运单!");
		        return false;
		    }
		    
		    var a = 0;
		    var billno = '';
		    var pic_cw = '';
		    $.each(ajaxJson,function(i,val){
		    	a = a + 1;
		    	billno = val.billno;
		    	pic_cw = val.pic_cw;
		    });
		    if (a != 1){
		    	ui.alert("请选择单行查看!");
		        return false;
		    }
		    if(pic_cw =='否'){
		    	ui.alert("此运单未上传财务联");
		    	return false;
		    }
				
		    //window.open('/awd/PIC.html?billno='+billno+'&fenlei=2', "_new");
		    $.getJSON('cfydcx/getQSPic.do?billno='+billno+'&fenlei=2', function(json){
				  layer.photos({
				    photos: json
				    //,anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
				  });
				}); 
		}
	});
});