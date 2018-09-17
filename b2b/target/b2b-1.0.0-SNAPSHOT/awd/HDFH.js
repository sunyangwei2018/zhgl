var HDFH = ui.Form();

HDFH.setPlugin({
	"SHDFH" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFHDFH.selectCXHD",
		"columnName" : "YD",
		"ctrlSelect" : true,
		"singleSelect" : false,
		"pagination" : true,//分页
		"param" : {"lrwd":userInfo.WD01,"kddh":"AAA8888AA"},
		"title" :"(按住Ctrl/Shift多选;双击删除错误记录)",
		"listener": {
			onDblClickRow: function(index,row){
				if(row.ybc == "1"){
					ui.alert("本条记录已成功保存，不能直接删除，请取消本条返回记录!");
				}else{
					$('#d_SHDFH').datagrid('deleteRow',index);
				}
			}
		}
	}, 
	
});


HDFH.define({
	"query" : function() {
		var SHDFH = HDFH.getPlugin()["SHDFH"];
		SHDFH["param"] = {"lrwd":userInfo.WD01,
						"kddh":HDFH.getTab().find('#kddh').textbox('getValue').trim()};
		HDFH.reloadPlugin("SHDFH",SHDFH);
	},
	
	// 定义保存按钮方法
	"save" : function() {
		var ok = 0;
		var error = 0;
		$.each($('#d_SHDFH').datagrid('getRows'),function(i,val){

			if(val.ybc == 0){
				ok = 1;
			}
			if(ui.isNull(val.billno)){
				error = 1;
			}
			if(ui.isNull(val.fhwd)){
				error = 2;
			}
			if(ui.isNull(val.kddh)){
				error = 3;
			}
			if(val.fhwd==userInfo.WD01){
				error = 4;
			}
		});
		if(ok==0){
			ui.alert("没有需要本次保存的运单!");
			return false;
		}
		if(error==1){
			ui.alert("运单号为空!");
			return false;
		}
		if(error==2){
			ui.alert("返回网点为空!");
			return false;
		}
		if(error==3){
			ui.alert("快递单号为空!");
			return false;
		}
		if(error==4){
			ui.alert("返回网点不能为本网点!");
			return false;
		}
		var ajaxJson = {};
		ajaxJson["src"] = "/cfhdfh/insertHDFH.do";
		ajaxJson["data"] = {
		"XmlData" : JSON.stringify($.extend(
											{"czr":userInfo.CFRY01},
											{"czwd":userInfo.WD01},
											{"item":$('#d_SHDFH').datagrid('getRows')}
					))
		};
		var resultData = ui.ajax(ajaxJson);
		if (!ui.isNull(resultData)) {
			ui.alert(resultData.data.staus);
		}
		var SHDFH = HDFH.getPlugin()["SHDFH"];
		SHDFH["param"] = {"lrwd":userInfo.WD01,
						"kddh":HDFH.getTab().find('#kddh').textbox('getValue').trim()};
		HDFH.reloadPlugin("SHDFH",SHDFH);

	},
    //定义取消按钮方法
	"cancel" : function() {
		var error=0;
		var err_msg='';
		$.each($('#d_SHDFH').datagrid('getSelections'),function(i,val){
			if(val.qrbj==1){
				error=1;
				err_msg = err_msg +'运单'+val.billno + '已被返回网点确认';
				return false;
			}
		});
		if (error==1) {
			ui.alert(err_msg);
			return false;
		}
		if (HDFH.getTab().find('#d_SHDFH').datagrid('getSelections')=='') {
			ui.alert("请查询并选中要取消的运单！");
			return false;
		}
		var ajaxJson = {};
		ajaxJson["src"] = "/cfhdfh/updateHDFH.do";
		ajaxJson["data"] = {
			"XmlData" : JSON.stringify($.extend(
											{"czr":userInfo.CFRY01},
													{"czwd":userInfo.WD01},
								               {"item":HDFH.getTab().find('#d_SHDFH').datagrid('getSelections')}
					))
		};
		var resultData = ui.ajax(ajaxJson);
		if (!ui.isNull(resultData)) {
			ui.alert(resultData.data.staus);
		}
		var SHDFH = HDFH.getPlugin()["SHDFH"];
		SHDFH["param"] = {"lrwd":userInfo.WD01,
						"kddh":HDFH.getTab().find('#kddh').textbox('getValue').trim()};
		HDFH.reloadPlugin("SHDFH",SHDFH);
	},
	
	"getfhwd" : function(){
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["sqlid"] = "CFHDFH.selectWD";
		queryField["dqzt"] = "0";
		queryField["DataBaseType"] = "tms";
		queryField["sjwd"] = '0';
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		
		var resultData = ui.ajax(ajaxJson).data;
		return resultData;
	},
	"comboxonblur": function(data){
		$.each(data,function(i,val){
			HDFH.getTab().find("#"+val+"").combobox("textbox").blur(function(){
				var reg=/^[A-Za-z0-9]+$/;
				if(HDFH.getTab().find("#"+val+"").combobox("getText").length!=0&&HDFH.getTab().find("#"+val+"").combobox("panel").find("div:contains("+HDFH.getTab().find("#"+val+"").combobox("getText")+")").length==0){
					HDFH.getTab().find("#"+val+"").combobox("reset")
				}
				else{
					var e = jQuery.Event("keyup");//模拟一个键盘事件 
					e.keyCode = 13;//keyCode=13是回车
					HDFH.getTab().find("#"+val+"").combobox("textbox").trigger(e);//模拟按下回车
				}
			});
		});
	}

});

HDFH.setAfterInit(function() {
	//返回网点下拉框数据
	HDFH.getTab().find("#fhwd").combobox({  
		valueField:'net_code',    
		textField:'net_name', 
	    data:HDFH.getfhwd(),
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}     
	});
	
	
	HDFH.getTab().find("#billno").bind("keydown",function (e) {
		if(e.keyCode==13){
			if (HDFH.getTab().find('#fhwd').combobox('getValue').trim()=='') {
				ui.alert("请选择返回网点！");
				return false;
			}
			if(HDFH.getTab().find('#fhwd').combobox('getValue').trim()==userInfo.WD01){
				ui.alert("返回网点不能为本网点！");
				return false;
			}
			if (HDFH.getTab().find('#kddh').textbox('getValue').trim()=='') {
				ui.alert("输入快递单号！");
				return false;
			}
			if(ui.isNull(HDFH.getTab().find('#billno').val())){
				return false;
			}else{
				var errormsg='';
				var text = HDFH.getTab().find('#billno').val();
				var arry = text.split("\n");
						var XmlData = [];
						var queryField={};
						queryField["dataType"] = "Json";
						queryField["sqlid"] = "CFHDFH.selectYDs";
						queryField["DataBaseType"] = "tms";
						queryField["billno"] =arry;							
						XmlData.push(queryField);
						var ajaxJson = {};
						ajaxJson["src"] = "jlquery/select.do";
						ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
						var resultData = ui.ajax(ajaxJson).data;
						for ( var i in resultData) {
							if (ui.isNull(resultData[i].billno)) {
								errormsg=errormsg+"找不到编号为"+resultData[i].billno+"的运单"+'\n';
								HDFH.getTab().find('#errorbillno').val(errormsg);
								continue;
							}
							if (resultData[i].nownet!=userInfo.WD01) {
								errormsg=errormsg+"编号为"+resultData[i].billno+"的运单不在本网点"+'\n';
								HDFH.getTab().find('#errorbillno').val(errormsg);
								continue;
							}
							if (resultData[i].state!=11) {
								errormsg=errormsg+"编号为"+resultData[i].billno+"的运单没有签收"+'\n';
								HDFH.getTab().find('#errorbillno').val(errormsg);
								continue;
							}
							if (!ui.isNull(resultData[i].kddh)) {
								errormsg=errormsg+"编号为"+resultData[i].billno+"的运单已做回单返回操作,快递单号为："+resultData[i].kddh+'\n';
								HDFH.getTab().find('#errorbillno').val(errormsg);
								continue;
							}
							var error=0;
							$.each($('#d_SHDFH').datagrid('getRows'),function(is,val){
								if(val.billno==resultData[i].billno){
									error=1;
									return false;
								}
							});
							if (error==1) {
								errormsg=errormsg+"编号为"+resultData[i].billno+"的运单已添加到表中"+'\n';
								HDFH.getTab().find('#errorbillno').val(errormsg);
								continue;
							}
							HDFH.getTab().find('#d_SHDFH').datagrid('appendRow',{
								billno: resultData[i].billno,
								s_name:resultData[i].s_name,
								lrr_name:userInfo.CFRY02,
								lrwd_name:userInfo.WD02,
								kddh:HDFH.getTab().find('#kddh').textbox('getValue').trim(),
								fhwd:HDFH.getTab().find('#fhwd').combobox('getValue').trim(),
								fhwd_name:HDFH.getTab().find('#fhwd').combobox('getText').trim(),
								qrbj:0,
								ybc:0,
						});
						}
						
						HDFH.getTab().find("#billno").val("");
				}
			}
	});
	//下拉框失去焦点操作
	var comboxblurs=["fhwd"];
	HDFH.comboxonblur(comboxblurs);
	
});