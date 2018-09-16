var abnormal = ui.Form();


abnormal.setPlugin({
	
	"genjin" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFAbnormal.selectAbnormalitem",
		"param" : {"billno" : " AND a.billno = 'AAAAA'"},
		"columnName" : "abnormal"
	},
	"jiean" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFAbnormal.selectAbnormalitem",
		"param" : {"billno" : " AND a.billno = 'AAAAA'"},
		"columnName" : "abnormal"
	},

});

abnormal.define({
	
	// 定义保存按钮方法
	"save" : function() {
		var tab = abnormal.getTab().find('#content-tabs').tabs('getSelected');
		var index = abnormal.getTab().find('#content-tabs').tabs('getTabIndex',tab);
		if (index==0){
			var data=[];
			var billno=abnormal.getTab().find("#billno").textbox('getValue').trim();
			var yclx=abnormal.getTab().find("#yclx").textbox('getValue').trim();
			var djnr=abnormal.getTab().find("#djnr").textbox('getValue').trim();
			if (billno=='') {
				ui.alert("请填写要异常件的运单号！");
				return false;
			}
			if (yclx=='') {
				ui.alert("请选择异常件的异常类型！");
				return false;
			}
			if (djnr=='') {
				ui.alert("请填写异常件的登记内容！");
				return false;
			}
			if(abnormal.getTab().find('#billno').textbox('getValue').split("\n").length==1){
				var billno=abnormal.getTab().find('#billno').textbox('getValue').trim();
				var ajaxJson = {};
				ajaxJson["src"] = "/abnormal/insertAbnormal.do";   
				ajaxJson["data"] = {
					"XmlData" : JSON.stringify($.extend(
													   {"lrr":userInfo.CFRY01},
													   {"lrwd":userInfo.WD01},
													   {"yclx":yclx},
													   {"billno":billno},
													   {"djnr":djnr},
													   {"djlx":1},
													   {"uu":0}
							))
				};
				var resultData = ui.ajax(ajaxJson);
				if(resultData.data.status==1){
					abnormal.getTab().find('#luru').form('reset');
				}
				ui.alert(resultData.data.msg);
			}else{
				var ajaxJson = {};
				ajaxJson["src"] = "/abnormal/insertAbnormal.do";   
				ajaxJson["data"] = {
					"XmlData" : JSON.stringify($.extend(
													   {"lrr":userInfo.CFRY01},
													   {"lrwd":userInfo.WD01},
													   {"yclx":yclx},
													   {"item":abnormal.getbillno()},
													   {"djnr":djnr},
													   {"djlx":1},
													   {"uu":1}
							))
				};
				var resultData = ui.ajax(ajaxJson);
				if(resultData.data.status==1){
					abnormal.getTab().find('#luru').form('reset');
				}
				ui.alert(resultData.data.msg);
			}
			
	}else if(index==1){
		var billno=abnormal.getTab().find("#gbillno").textbox('getValue').trim();
		var djnr=abnormal.getTab().find("#gdjnr").textbox('getValue').trim();
		if (billno=='') {
			ui.alert("请填写要异常件的运单号！");
			return false;
		}
		if (djnr=='') {
			ui.alert("请填写异常件的跟进内容！");
			return false;
		}
		var ajaxJson = {};
		ajaxJson["src"] = "/abnormal/insertAbnormalitem.do";   
		ajaxJson["data"] = {
			"XmlData" : JSON.stringify($.extend(
											   {"lrr":userInfo.CFRY01},
											   {"lrwd":userInfo.WD01},
											   {"item":abnormal.getgbillno()},
											   {"djnr":djnr},
											   {"djlx":2},
											   {"jzbj":2}
					))
		};
		var resultData = ui.ajax(ajaxJson);
		if (!ui.isNull(resultData)) {
			if(resultData.data.status=="1"){
				abnormal.getTab().find('#genjin').form('reset');
			}
			ui.alert(resultData.data.msg);
			var genjin = abnormal.getPlugin()["genjin"];
			abnormal.reloadPlugin("genjin",genjin);
		}
	}else if(index==2){
		var billno=abnormal.getTab().find("#jbillno").textbox('getValue').trim();
		var djnr=abnormal.getTab().find("#jdjnr").textbox('getValue').trim();
		if (billno=='') {
			ui.alert("请填写要异常件的运单号！");
			return false;
		}
		if (djnr=='') {
			ui.alert("请填写异常件的处理结果！");
			return false;
		}

		ajaxJson = {};
		ajaxJson["src"] = "/abnormal/insertAbnormalitem.do";   
		ajaxJson["data"] = {
			"XmlData" : JSON.stringify($.extend(
											{"lrr":userInfo.CFRY01},
											{"lrwd":userInfo.WD01},
											{"item":abnormal.getjbillno()},
											{"djnr":djnr},
											{"djlx":3},
											{"jzbj":3}
					))
		};
		var resultData = ui.ajax(ajaxJson);
		if(resultData.data.status==1){
			abnormal.getTab().find('#jiean').form('reset');
		}
		ui.alert(resultData.data.msg);
		var jiean = abnormal.getPlugin()["jiean"];
		abnormal.reloadPlugin("jiean",jiean);
		}
	},
	"getbillno"	: function(){	
		var billno=[];
		if(ui.isNull(abnormal.getTab().find('#billno').textbox('getValue'))){
			billno=''; 
		}else{
			if(abnormal.getTab().find('#billno').textbox('getValue').split("\n").length==1){
				billno.push(abnormal.getTab().find('#billno').textbox('getValue').trim());
			}else{
				text = abnormal.getTab().find('#billno').textbox('getValue').trim();
				billno = text.split("\n");
			}
		}
		return billno;
	},
	"getgbillno" : function(){	
		var billno=[];
		if(ui.isNull(abnormal.getTab().find('#gbillno').textbox('getValue'))){
			billno=''; 
		}else{
			if(abnormal.getTab().find('#gbillno').textbox('getValue').split("\n").length==1){
				billno.push(abnormal.getTab().find('#gbillno').textbox('getValue').trim());
			}else{
				text = abnormal.getTab().find('#gbillno').textbox('getValue').trim();
				billno = text.split("\n");
			}
		}
		return billno;
	},
	"getjbillno" : function(){	
		var billno=[];
		if(ui.isNull(abnormal.getTab().find('#jbillno').textbox('getValue'))){
			billno=''; 
		}else{
			if(abnormal.getTab().find('#jbillno').textbox('getValue').split("\n").length==1){
				billno.push(abnormal.getTab().find('#jbillno').textbox('getValue').trim());
			}else{
				text = abnormal.getTab().find('#jbillno').textbox('getValue').trim();
				billno = text.split("\n");
			}
		}
		return billno;
	},
	"getsqlbillno"	: function(){	
		var billno;
		if(ui.isNull(abnormal.getTab().find('#gbillno').textbox('getValue'))){
			billno=''; 
		}else{
			if(abnormal.getTab().find('#gbillno').textbox('getValue').split("\n").length==1){
				billno = " and a.billno = '"+abnormal.getTab().find('#gbillno').textbox('getValue')+"'";
			}else{
				billno="and a.billno in ("
				var text = abnormal.getTab().find('#gbillno').textbox('getValue');
				var arry = text.split("\n");
				$.each(arry, function(i, val) {
					if(val!=''){
						billno=billno+"'"+val+"',";
					}
				})
				billno = billno.substring(0,billno.length-1);
				billno=billno+")";
			}
		}
		return billno;
	},
	"getsqljbillno"	: function(){	
		var billno;
		if(ui.isNull(abnormal.getTab().find('#jbillno').textbox('getValue'))){
			billno=''; 
		}else{
			if(abnormal.getTab().find('#jbillno').textbox('getValue').split("\n").length==1){
				billno = " and a.billno = '"+abnormal.getTab().find('#jbillno').textbox('getValue')+"'";
			}else{
				billno="and a.billno in ("
				var text = abnormal.getTab().find('#jbillno').textbox('getValue');
				var arry = text.split("\n");
				$.each(arry, function(i, val) {
					if(val!=''){
						billno=billno+"'"+val+"',";
					}
				})
				billno = billno.substring(0,billno.length-1);
				billno=billno+")";
			}
		}
		return billno;
	},
});

abnormal.setAfterInit(function() {
	
abnormal.getTab().find('#billno').textbox({
	onChange : function(newValue,oldValue){
		if (newValue!='') {
			if (newValue!=oldValue) {
					var errormsg='';
					if(ui.isNull(abnormal.getTab().find('#billno').textbox('getValue'))){
						return false;
					}else{
						if(abnormal.getTab().find('#billno').textbox('getValue').trim().split("\n").length==1){
							billno = abnormal.getTab().find('#billno').textbox('getValue').trim();
							abnormal.getTab().find("#billno").textbox('textbox').focus();
							var XmlData = [];
							var queryField={};
							queryField["dataType"] = "Json";
							queryField["sqlid"] = "CFAbnormal.selectAbnormal";
							queryField["billno"] =billno;
							XmlData.push(queryField);
							var ajaxJson = {};
							ajaxJson["src"] = "jlquery/select.do";
							ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
							var resultData = ui.ajax(ajaxJson).data;
							if(!ui.isNull(resultData)){
								abnormal.getTab().find('#errorbillno').text('此异常件已存在');
								abnormal.getTab().find('#state').textbox('setValue','');
								abnormal.getTab().find('#billno').textbox('setValue','');
								return false;
							}
							var XmlData = [];
							var queryField={};
							queryField["dataType"] = "Json";
							queryField["sqlid"] = "CFAbnormal.selectBilllx";
							queryField["billno"] =billno;
							XmlData.push(queryField);
							var ajaxJson = {};
							ajaxJson["src"] = "jlquery/select.do";
							ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
							var resultData = ui.ajax(ajaxJson).data;
							if(ui.isNull(resultData)){
								abnormal.getTab().find('#errorbillno').text('找不到此运单');
								abnormal.getTab().find('#state').textbox('setValue','');
								abnormal.getTab().find('#billno').textbox('setValue','');
								return false;
							}else{
								var wd=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
								if(resultData[0].postnet!=wd && wd!=resultData[0].acceptnet && userInfo.FBZX==0){
									abnormal.getTab().find('#errorbillno').text("当前网点不是该运单的发货/到达/中转网点，不能进行异常件录入！");
									abnormal.getTab().find('#state').textbox('setValue','');
									abnormal.getTab().find('#billno').textbox('setValue','');
									return false;
								}
								abnormal.getTab().find('#state').textbox('setValue',resultData[0].name);
							}
						}else{
							var text = abnormal.getTab().find('#billno').textbox('getValue');
							var billnos =text.split("\n");
							for (var i = 0; i <=billnos.length-1; i++) {
								if (billnos[i]!='') {
								var billno=billnos[i];	
								var XmlData = [];
								var queryField={};
								queryField["dataType"] = "Json";
								queryField["sqlid"] = "CFAbnormal.selectAbnormal";
								queryField["billno"] =billno;
								XmlData.push(queryField);
								var ajaxJson = {};
								ajaxJson["src"] = "jlquery/select.do";
								ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
								var resultData = ui.ajax(ajaxJson).data;
								if(!ui.isNull(resultData)){
									errormsg=errormsg+"运单号为"+billno+"的异常件已存在"+'\n';
									abnormal.getTab().find('#errorbillno').val(errormsg);
									//abnormal.getTab().find('#state').textbox('setValue',null);
									abnormal.getTab().find('#billno').textbox('setValue','');
									continue;
								}
								var XmlData = [];						
								var queryField={};
								queryField["dataType"] = "Json";
								queryField["sqlid"] = "CFAbnormal.selectBilllx";
								queryField["billno"] =billno;
								XmlData.push(queryField);
								var ajaxJson = {};
								ajaxJson["src"] = "jlquery/select.do";
								ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
								var resultData = ui.ajax(ajaxJson).data;
								if(ui.isNull(resultData)){
									errormsg=errormsg+"找不到编号为"+billno+"的运单"+'\n';
									abnormal.getTab().find('#errorbillno').val(errormsg);
									//abnormal.getTab().find('#state').textbox('setValue',null);
									abnormal.getTab().find('#billno').textbox('setValue','');
									continue;
								}else{
									var wd=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
									if(resultData[0].postnet!=wd && wd!=resultData[0].acceptnet && userInfo.FBZX==0){
										errormsg=errormsg+"当前网点不是编号为"+billno+"的运单的发货/到达/中转网点，不能进行异常件录入！此运单状态为"+resultData[0].name+'\n';
										abnormal.getTab().find('#errorbillno').val(errormsg);
										//abnormal.getTab().find('#state').textbox('setValue',null);
										abnormal.getTab().find('#billno').textbox('setValue','');
										continue;
									}
									//abnormal.getTab().find('#state').textbox('setValue',resultData[0].name);
								}
							}
						}
					}
				}
			}
		}
	}
});

	
	abnormal.getTab().find('#gbillno').textbox({
		onChange : function(newValue,oldValue){
			if (newValue.trim()!='') {				
				if (newValue.trim()!=oldValue.trim()) {
					var errormsg='';
					var statemsg='';
					if(ui.isNull(abnormal.getTab().find('#gbillno').textbox('getValue'))){
						return false;
					}else{
						if(abnormal.getTab().find('#gbillno').textbox('getValue').trim().split("\n").length==1){
							billno = abnormal.getTab().find('#gbillno').textbox('getValue').trim();
							var XmlData = [];
							var queryField={};
							queryField["dataType"] = "Json";
							queryField["sqlid"] = "CFAbnormal.selectAbnormal";
							queryField["billno"] =billno;
							XmlData.push(queryField);
							var ajaxJson = {};
							ajaxJson["src"] = "jlquery/select.do";
							ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
							var resultData = ui.ajax(ajaxJson).data;
							if(ui.isNull(resultData)){
								abnormal.getTab().find('#gerrorbillno').text('找不到此运单异常件！');
								//abnormal.getTab().find('#gstate').val("");
								//abnormal.getTab().find('#gbillno').textbox('setValue',"");
								return false;
							}else{
						
								abnormal.getTab().find('#gstate').val("此运单异常件异常类型为"+resultData[0].name);
								var SJZDITEM = abnormal.getPlugin()["genjin"];
								SJZDITEM["param"] = {"billno":" AND billno = '"+billno+"'"};
								abnormal.reloadPlugin("genjin",SJZDITEM);
							}
						}else{
							var text = abnormal.getTab().find('#gbillno').textbox('getValue');
							var billnos =text.split("\n");
							for (var i = 0; i <=billnos.length-1; i++) {
								if (billnos[i]!='') {
									var billno=billnos[i];	
									var XmlData = [];
									var queryField={};
									queryField["dataType"] = "Json";
									queryField["sqlid"] = "CFAbnormal.selectAbnormal";
									queryField["billno"] =billno;
									XmlData.push(queryField);
									var ajaxJson = {};
									ajaxJson["src"] = "jlquery/select.do";
									ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
									var resultData = ui.ajax(ajaxJson).data;
									if(ui.isNull(resultData)){
										errormsg=errormsg+"找不到编号为"+billno+"的运单异常件"+'\n';
										abnormal.getTab().find('#gerrorbillno').val(errormsg);
										//abnormal.getTab().find('#gstate').val("");
										//abnormal.getTab().find('#gbillno').textbox('setValue',"");
										continue;
									}else{
										statemsg=statemsg+"编号为"+billno+"的异常件状态为"+resultData[0].name+'\n';
										abnormal.getTab().find('#gstate').val(statemsg);
									
										//abnormal.getTab().find('#gbillno').textbox('setValue',"");	
								
									var SJZDITEM = abnormal.getPlugin()["genjin"];
									SJZDITEM["param"] = {"billno":abnormal.getsqlbillno()};
									abnormal.reloadPlugin("genjin",SJZDITEM);
									}
								}
							}
						}
					}
				}
			}
		}
	});
	
	abnormal.getTab().find('#jbillno').textbox({
		onChange : function(newValue,oldValue){
			if (newValue!='') {
				if (newValue.trim()!=oldValue.trim()) {
					var errormsg='';
					var statemsg='';
					if(ui.isNull(abnormal.getTab().find('#jbillno').textbox('getValue'))){
						return false;
					}else{
						if(abnormal.getTab().find('#jbillno').textbox('getValue').trim().split("\n").length==1){
							billno = abnormal.getTab().find('#jbillno').textbox('getValue').trim();
							var XmlData = [];
							var queryField={};
							queryField["dataType"] = "Json";
							queryField["sqlid"] = "CFAbnormal.selectAbnormal";
							queryField["billno"] =billno;
							XmlData.push(queryField);
							var ajaxJson = {};
							ajaxJson["src"] = "jlquery/select.do";
							ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
							var resultData = ui.ajax(ajaxJson).data;
							if(ui.isNull(resultData)){
								abnormal.getTab().find('#jerrorbillno').text('找不到此运单异常件！');
								//abnormal.getTab().find('#gstate').val("");
								abnormal.getTab().find('#jbillno').textbox('setValue',"");
								return false;
							}else{						
								abnormal.getTab().find('#jstate').val("此运单异常件异常类型为"+resultData[0].name);
								var wd=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
								if(resultData[0].postnet!=wd && wd!=resultData[0].acceptnet && userInfo.FBZX==0 && "9000"!=wd){
									abnormal.getTab().find('#jerrorbillno').text("当前网点不是总部或者该运单的发货/到达/中转网点，不能进行异常件结案！");
									//abnormal.getTab().find('#jstate').textbox('setValue',null);
									abnormal.getTab().find('#jbillno').textbox('setValue',null);
									return false;
								}
								var SJZDITEM = abnormal.getPlugin()["jiean"];
								SJZDITEM["param"] = {"billno":" AND billno ='"+billno+"' "};
								abnormal.reloadPlugin("jiean",SJZDITEM);
							}
						}else{
							var text = abnormal.getTab().find('#jbillno').textbox('getValue');
							var billnos =text.split("\n");
							for (var i = 0; i <=billnos.length-1; i++) {
								if (billnos[i]!='') {
									var billno=billnos[i];	
									var XmlData = [];
									var queryField={};
									queryField["dataType"] = "Json";
									queryField["sqlid"] = "CFAbnormal.selectAbnormal";
									queryField["billno"] =billno;
									XmlData.push(queryField);
									var ajaxJson = {};
									ajaxJson["src"] = "jlquery/select.do";
									ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
									var resultData = ui.ajax(ajaxJson).data;
									if(ui.isNull(resultData)){
										errormsg=errormsg+"找不到编号为"+billno+"的运单异常件"+'\n';
										abnormal.getTab().find('#jerrorbillno').val(errormsg);
										//abnormal.getTab().find('#gstate').val("");
										abnormal.getTab().find('#jbillno').textbox('setValue',"");
										continue;
									}else{
										statemsg=statemsg+"编号为"+billno+"的异常件状态为"+resultData[0].name+'\n';
										abnormal.getTab().find('#jstate').val(statemsg);
										var wd=ui.isNull(userInfo.WD01)?"":userInfo.WD01;
										if(resultData[0].postnet!=wd && wd!=resultData[0].acceptnet && userInfo.FBZX==0 && "9000"!=wd){
											errormsg=errormsg+"编号为"+billno+"的运单当前网点不是总部或者该运单发货/到达/中转网点，不能进行异常件结案！"+'\n';
											abnormal.getTab().find('#jerrorbillno').val(errormsg);
											//abnormal.getTab().find('#jerrorbillno').text("当前网点不是总部或者该运单的发货/到达/中转网点，不能进行异常件结案！");
											//abnormal.getTab().find('#jstate').textbox('setValue',null);
											abnormal.getTab().find('#jbillno').textbox('setValue',"");
											continue;
										}
										var SJZDITEM = abnormal.getPlugin()["jiean"];
										SJZDITEM["param"] = {"billno":abnormal.getsqljbillno()};
										abnormal.reloadPlugin("jiean",SJZDITEM);
										//abnormal.getTab().find('#gbillno').textbox('setValue',"");	
									}
								}
							}
						}
					}
				}
			}
		}
	});
	abnormal.getTab().find('#yclx').combobox({
		valueField: 'code',   
	    textField: 'name',
	    method: 'POST',
	    queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAbnormal.selectYclx\"}]"},
	    url: 'jlquery/select.do',
	    loadFilter: function(data){
	   	 return data.data;
	    }
	})
	
	abnormal.getTab().find("#state").textbox("disable");
	abnormal.getTab().find("#gstate").textbox("disable");
	abnormal.getTab().find("#jstate").textbox("disable");
});