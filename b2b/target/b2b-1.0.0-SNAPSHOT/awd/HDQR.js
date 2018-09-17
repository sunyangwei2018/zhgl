var HDQR = ui.Form();

HDQR.setPlugin({
	"SHDCXS" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFHDQR.selectCXHDQR",
		"columnName" : "YD",
		"ctrlSelect" : true,
		"singleSelect" : false,
		"param" : {"lrwd":userInfo.WD01,"kddh":"AAA8888AA"},
		"title" :"确认清单(双击删除错误记录)",
		//"pagination":true,
		"showFooter" : true,
		"listener": {
			onDblClickRow: function(index,row){
				if(row.qrbj == "1"){
					ui.alert("本条记录已成功保存，不能直接删除!");
				}else{
					$('#d_SHDCXS').datagrid('deleteRow',index);
				}
			}
		}

	},
	"SHDQR" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFHDQR.selectHDWQR",
		"columnName" : "YD",
		"title" :"未确认清单"
		//"pagination":true,			
	},
});



HDQR.define({
	"query" : function() {		
		var SHDCXS = HDQR.getPlugin()["SHDCXS"];
		SHDCXS["param"] = {"fhwd":userInfo.WD01,
						  "kddh":HDQR.getTab().find('#kddh').textbox('getValue').trim(),
						  "qrbj":1};
		HDQR.reloadPlugin("SHDCXS",SHDCXS);
		
		var SHDQR = HDQR.getPlugin()["SHDQR"];
		SHDQR["param"] = {"fhwd":userInfo.WD01,
						  "kddh":HDQR.getTab().find('#kddh').textbox('getValue').trim(),
						  "qrbj":0};
		HDQR.reloadPlugin("SHDQR",SHDQR);
	},
	"save": function(){

		var ok=0;
		$.each($('#d_SHDCXS').datagrid('getRows'),function(i,val){
			if(val.qrbj==0){
				ok=1;
			}
		});
		if (ok==0) {
			ui.alert("没有需要本次审核的回单!");
			return false;
		}
		var ajaxJson = {};
		ajaxJson["src"] = "/cfydqr/insertHDQR.do";
		ajaxJson["data"] = {
			"XmlData" : JSON.stringify($.extend(
											   {"item":$('#d_SHDCXS').datagrid('getRows')},
								               {"qrr":userInfo.CFRY01},
								               {"qrwd":userInfo.WD01}
					))
		};
		var resultData = ui.ajax(ajaxJson);
		if (!ui.isNull(resultData)) {
			ui.alert(resultData.data.staus);
		}
		var SHDCXS = HDQR.getPlugin()["SHDCXS"];
		SHDCXS["param"] = {"fhwd":userInfo.WD01,
						  "kddh":HDQR.getTab().find('#kddh').textbox('getValue').trim(),
						  "qrbj":1};
		HDQR.reloadPlugin("SHDCXS",SHDCXS);
		
		var SHDQR = HDQR.getPlugin()["SHDQR"];
		SHDQR["param"] = {"fhwd":userInfo.WD01,
						  "kddh":HDQR.getTab().find('#kddh').textbox('getValue').trim(),
						  "qrbj":0};
		HDQR.reloadPlugin("SHDQR",SHDQR);
	},
});

HDQR.setAfterInit(function() {
	
	HDQR.getTab().find("#billno").bind("keydown",function (e) {
		if(e.keyCode==13){
			if (HDQR.getTab().find('#kddh').textbox('getValue').trim()=='') {
				ui.alert("请填写快递单号！");
				return false;
			}
			if(ui.isNull(HDQR.getTab().find('#billno').val())){
				return false;
			}else{
				if(HDQR.getTab().find('#billno').val().trim().split("\n").length==1){
					billno = HDQR.getTab().find('#billno').val().trim();				
					var XmlData = [];
					var queryField={};
					queryField["dataType"] = "Json";
					queryField["sqlid"] = "CFHDQR.selectHDQR";
					queryField["DataBaseType"] = "tms";
					queryField["billno"] =billno;
					queryField["fhwd"] =userInfo.WD01;
					queryField["kddh"] =HDQR.getTab().find('#kddh').textbox('getValue').trim();
					XmlData.push(queryField);
					var ajaxJson = {};
					ajaxJson["src"] = "jlquery/select.do";
					ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
					var resultData = ui.ajax(ajaxJson).data;
					if (ui.isNull(resultData)) {
						ui.alert("此快递单中无此回单记录！");
						HDQR.getTab().find('#billno').val("");
						return false;
					}
					if(resultData[0].qrbj==1){
						ui.alert("此回单是已审核状态！");
						HDQR.getTab().find('#billno').val("");
						return false;
					}
					var XmlData = [];
					var queryField={};
					queryField["dataType"] = "Json";
					queryField["sqlid"] = "CFHDQR.selectCXHDQR";
					queryField["DataBaseType"] = "tms";
					queryField["billno"] =billno;
					queryField["fhwd"] =userInfo.WD01;
					queryField["kddh"] =HDQR.getTab().find('#kddh').textbox('getValue').trim();
					XmlData.push(queryField);
					var ajaxJson = {};
					ajaxJson["src"] = "jlquery/select.do";
					ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
					var resultData = ui.ajax(ajaxJson).data;
				
					$.each($('#d_SHDQR').datagrid('getRows'),function(i,val){
						if(val.billno == billno){
							$('#d_SHDQR').datagrid('deleteRow',i);
							return false;
						}
					});
					
					//判断是否已写入
					var error = 0;
					$.each($('#d_SHDCXS').datagrid('getRows'),function(i,val){
						if(val.billno == billno){
							error = 1;
							return false;
						}
					});
					if(error==1){
						ui.alert("确认清单内已存在此运单");
						HDQR.getTab().find('#billno').val("");
						HDQR.getTab().find('#items').textbox('setValue','');
						return false;
					}
					$('#d_SHDCXS').datagrid('insertRow',{
						index: 0,
						row: {
							billno: resultData[0].billno,
							fhwd: resultData[0].fhwd,
							s_name: resultData[0].s_name,
							kddh: resultData[0].kddh,
							fhwd_name: resultData[0].fhwd_name,
							lrr_name: resultData[0].lrr_name,
							lrwd_name:resultData[0].lrwd_name,
							lrrq: resultData[0].lrrq,
							qrbj:0
						}
					});
					HDQR.getTab().find('#billno').val("");
				}else{
					var errormsg='';
					var text = HDQR.getTab().find('#billno').val();
					var arry = text.split("\n");
					var billno ='';
					for(var i=0;i<=arry.length-1;i++){
						if(arry[i]!=''){
							billno = arry[i];
							var XmlData = [];
							var queryField={};
							queryField["dataType"] = "Json";
							queryField["sqlid"] = "CFHDQR.selectHDQR";
							queryField["DataBaseType"] = "tms";
							queryField["billno"] =billno;
							queryField["fhwd"] =userInfo.WD01;
							queryField["kddh"] =HDQR.getTab().find('#kddh').textbox('getValue').trim();
							XmlData.push(queryField);
							var ajaxJson = {};
							ajaxJson["src"] = "jlquery/select.do";
							ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
							var resultData = ui.ajax(ajaxJson).data;
							if (ui.isNull(resultData)) {
								errormsg=errormsg+"此快递单中无编号为"+billno+"的回单记录"+'\n';
								HDQR.getTab().find('#errorbillno').val(errormsg);
								HDQR.getTab().find('#billno').val("");
								continue;
							}
							if(resultData[0].qrbj==1){
								errormsg=errormsg+"编号为"+billno+"的回单已是审核状态"+'\n';
								HDQR.getTab().find('#errorbillno').val(errormsg);
								HDQR.getTab().find('#billno').val("");
								continue;
							}
							var XmlData = [];
							var queryField={};
							queryField["dataType"] = "Json";
							queryField["sqlid"] = "CFHDQR.selectCXHDQR";
							queryField["DataBaseType"] = "tms";
							queryField["billno"] =billno;
							queryField["fhwd"] =userInfo.WD01;
							queryField["kddh"] =HDQR.getTab().find('#kddh').textbox('getValue').trim();
							XmlData.push(queryField);
							var ajaxJson = {};
							ajaxJson["src"] = "jlquery/select.do";
							ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
							var resultData = ui.ajax(ajaxJson).data;
							
							$.each($('#d_SHDQR').datagrid('getRows'),function(i,val){
								if(val.billno == billno){
									$('#d_SHDQR').datagrid('deleteRow',i);
									return false;
								}
							});
							
							//判断是否已写入
							var error=0;
							$.each($('#d_SHDCXS').datagrid('getRows'),function(i,val){
								if(val.billno==billno){
									error=1;
									return false;
								}
							});
							if (error==1) {
								errormsg=errormsg+"编号为"+billno+"的运单已添加到清单中"+'\n';
								HDQR.getTab().find('#errorbillno').val(errormsg);
								HDQR.getTab().find('#billno').val("");
								continue;
							}
							
							$('#d_SHDCXS').datagrid('insertRow',{
								index: 0,
								row: {
									billno: resultData[0].billno,
									fhwd: resultData[0].fhwd,
									s_name: resultData[0].s_name,
									kddh: resultData[0].kddh,
									fhwd_name: resultData[0].fhwd_name,
									lrr_name: resultData[0].lrr_name,
									lrwd_name:resultData[0].lrwd_name,
									lrrq: resultData[0].lrrq,
									qrbj:0
								}
							});
							HDQR.getTab().find('#billno').val("");
						}
					}
				}				
			}
		}
	});
});