var YDCX = ui.Form();
var zone = userInfo.DQXX01;
var gridindex=0;

YDCX.setPlugin({
	"YDCXBILL" : {
		"uiid" : "easyuiGridNow",
		"sqlid" : "YDGZ.selectYDGZ_BILLPage",
		"param" : {"billno":" AND a.billno = 'AAAAA'","WD01":userInfo.WD01},
		"ctrlSelect" : true,
		"singleSelect" : false,
		"columnName" : "YD",
		"title" :"运单信息",
		"pagination":true,
		"showFooter" : true,
		"listener": {
			onDblClickRow: function(index, row){
				gridindex = index;
				var billno = row.billno;
				var XmlData = [];
				var queryField={};
				queryField["dataType"] = "Json";
				queryField["sqlid"] = "YDCX.selectYDCX";
				queryField["DataBaseType"] = "tms";
				queryField["billno"] =billno;
				XmlData.push(queryField);
				var ajaxJson = {};
				ajaxJson["src"] = "jlquery/select.do";
				ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
				var resultData = ui.ajax(ajaxJson).data;
					YDCX.getTab().find("#AWD").form('clear');
					YDCX.getTab().find("#AWD").form('load',resultData[0]);
					zone = resultData[0].postzone;
					YDCX.getTab().find("#postzone").combobox('reload');
					 zone = resultData[0].acceptzone;
					 YDCX.getTab().find("#acceptzone").combobox('reload');  
					YDCX.getTab().find('#ydcx_tab').tabs('select', 1);
				
			}
		}
	},
});



YDCX.define({
	// 定义查询按钮方法
	"save" : function() {
		if(ui.isNull(YDCX.getTab().find('#billno').textbox('getValue'))){
			ui.alert("请先双击查询表中数据，再进行修改保存！");
			return false;
		}
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["sqlid"] = "YDCX.selectYDCX";
		queryField["billno"] = YDCX.getTab().find('#billno').textbox('getValue');
		queryField["DataBaseType"] = "tms";
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		if(ui.isNull(resultData)){
			ui.alert("找不到此运单，请重新查询！");
			return false;
		}
		if(resultData[0].shbj ==1){
			ui.alert("此运单已经审核,无法修改！");
			return false;
		}
		if(ui.isNull(ui.ryxx_qx(2))){
			if(resultData[0].state!=3){
				ui.alert("此运单当前状态不允许修改！");
				return false;
			}
			if((resultData[0].postnet != userInfo.WD01)&&(userInfo.WD01!='9000')){
				ui.alert("只允许修改本网点录的运单！");
				return false;
			}
	    }
		
		if(!YDCX.getTab().find("#AWD").form('validate')){
			return false;
		}
		if((parseFloat(YDCX.getTab().find("#boxes").textbox("getValue"))+parseFloat(YDCX.getTab().find("#duals").textbox("getValue"))+parseFloat(YDCX.getTab().find("#package").textbox("getValue")))==0){
			ui.alert("箱包双不能全为零")
			return false;
		}
		var XmlData = YDCX.getTab().find("#AWD").formToJson();
		XmlData[0]["czy"] = userInfo.CFRY01;
		XmlData[0]["xgr"] = userInfo.CFRY01;
		XmlData[0]["xgrq"] = ui.formatDate(0, 2);
		XmlData[0]["state"] = 14;
		XmlData[0]["stateflag"] = 2;
		XmlData[0]["net_code"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
		if(YDCX.getTab().find("#flag").combobox('getValue')=='1'){
			if(ui.isNull(YDCX.getTab().find("#postdw").combobox('getText'))){
				XmlData[0]["postdw"] = YDCX.getTab().find('#fhdw').text();
			}
			if(ui.isNull(YDCX.getTab().find("#postaddr").combobox('getText'))){
				XmlData[0]["postaddr"] = YDCX.getTab().find('#fhdz').text();
			}
		}
		var ajaxJson = {};
		ajaxJson["src"] = "cfawd/updateBill.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		if(resultData.status==1){
			ui.alert("操作成功");
			//更新页面信息
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "YDCX.selectYDCX";
			queryField["DataBaseType"] = "tms";
			queryField["billno"] =YDCX.getTab().find('#billno').textbox('getValue');
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
			var resultData = ui.ajax(ajaxJson).data;
			YDCX.getTab().find("#AWD").form('clear');
			YDCX.getTab().find("#AWD").form('load',resultData[0]);
			zone = resultData[0].postzone;
			YDCX.getTab().find("#postzone").combobox('reload');
		 	zone = resultData[0].acceptzone;
		 	YDCX.getTab().find("#acceptzone").combobox('reload'); 
		}else{
			ui.alert("操作失败");
		}
	},
	// 定义打印按钮方法
	"print": function(){
		var ajaxJson = YDCX.getTab().find('#d_YDCXBILL').datagrid('getSelections');	
	    if (ui.isNull(ajaxJson)) {
	        ui.alert("请选择要打印的记录!");
	        return false;
	    };
	    var billno = '';
	    $.each(ajaxJson,function(i,val){
	    	billno = billno + "'"+val.billno+"',";
	    });
	    billno = billno.substring(0,billno.length-1);
		sessionStorage["PRINT_URL"] = "/reportAWD/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"DJBH\":\""+billno+"\"}";
		window.open("/print.html?dybh=1&rid="+Math.random());
	},
	// 定义查询按钮方法
	"del" : function() {
		var ajaxJson = YDCX.getTab().find('#d_YDCXBILL').datagrid('getSelections');	
	    if (ui.isNull(ajaxJson)) {
	        ui.alert("请选择要删除的记录!");
	        return false;
	    }
	    $('#delbill').dialog('open');  	
	    
	},
	// 定义查询按钮方法
	"query" : function() {
		if(YDCX.getTab().find('#billnocx').val().split("\n").length >10000){
			ui.alert("请输入少于10000个单号!");
	        return false;
		}
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
		if(YDCX.getTab().find("#rqcx").combobox('getValue')=='1'){
			lrrq_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			lrrq_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(YDCX.getTab().find("#rqcx").combobox('getValue')=='2'){
			postdate_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			postdate_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(YDCX.getTab().find("#rqcx").combobox('getValue')=='3'){
			pzrq_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			pzrq_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(YDCX.getTab().find("#rqcx").combobox('getValue')=='4'){
			fcrq_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			fcrq_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(YDCX.getTab().find("#rqcx").combobox('getValue')=='5'){
			dcrq_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			dcrq_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(YDCX.getTab().find("#rqcx").combobox('getValue')=='6'){
			xhrq_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			xhrq_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(YDCX.getTab().find("#rqcx").combobox('getValue')=='7'){
			psrq_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			psrq_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(YDCX.getTab().find("#rqcx").combobox('getValue')=='8'){
			zyrq_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			zyrq_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(YDCX.getTab().find("#rqcx").combobox('getValue')=='9'){
			qsrq_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			qsrq_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		}else if(YDCX.getTab().find("#rqcx").combobox('getValue')=='10'){
			shrq_S = YDCX.getTab().find("#rq_Scx").datetimebox('getValue').trim();
			shrq_E = YDCX.getTab().find("#rq_Ecx").datetimebox('getValue').trim();
		};
	
		var YDCXBILL = YDCX.getPlugin()["YDCXBILL"];
		
		if(ui.isNull(YDCX.getTab().find('#billnocx').val())){
			YDCXBILL["param"] = {
					//"billno" : YDCX.getbillno(),
					"acceptnet": YDCX.getTab().find("#acceptnetcx").combobox('getValue').trim(),
					"postnet": YDCX.getTab().find("#postnetcx").combobox('getValue').trim(),
					"cus_code":YDCX.getTab().find("#cus_codecx").combobox('getValue').trim(),
					"fkfs":YDCX.getTab().find("#fkfscx").combobox('getValue').trim(),
					"state":YDCX.getTab().find("#statecx").combobox('getValue').trim(),
					"nownet":YDCX.getTab().find("#nownetcx").combobox('getValue').trim(),
					"postzone":YDCX.getTab().find("#postzonecx").textbox('getValue').trim(),
					"acceptzone":YDCX.getTab().find("#acceptzonecx").textbox('getValue').trim(),
					"lrr":YDCX.getTab().find("#lrr").combobox('getValue').trim(),
					"ddh":YDCX.getTab().find("#ddh").textbox('getValue').trim(),
					"lrrq_S":lrrq_S,
					"lrrq_E":lrrq_E,
					"stp":YDCX.getTab().find("#stp").combobox('getValue').trim(),
					"sqs":YDCX.getTab().find("#sqs").combobox('getValue').trim(),
					"billno_mh":YDCX.getTab().find("#billno_mh").textbox('getValue').trim(),
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
			
			YDCXBILL["param"] = {
					"billno" : YDCX.getTab().find('#billnocx').val().split("\n"),
					"WD01":userInfo.WD01
				};
		}
	
		YDCX.reloadPlugin("YDCXBILL", YDCXBILL);
		YDCX.getTab().find('#ydcx_tab').tabs('select', 0);
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
		/*"getbillno"	: function(){	
			var billno;
			if(){
				billno=''; 
			}else{
				if(YDCX.getTab().find('#billnocx').val().split("\n").length==1){
					billno = " and a.billno = '"+YDCX.getTab().find('#billnocx').val()+"'";
				}else{
					billno="and a.billno in ("
					var text = YDCX.getTab().find('#billnocx').val();
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
		},	*/
		"getry" : function(){
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "YDCX.selectRYXX";
			queryField["net_code"] = userInfo.WD01;
			queryField["DataBaseType"] = "tms";
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
				
			var resultData = ui.ajax(ajaxJson).data;
			return resultData;
			},	
		"comboxonblur": function(data){
				$.each(data,function(i,val){
					YDCX.getTab().find("#"+val+"").combobox("textbox").blur(function(){
						var reg=/^[A-Za-z0-9]+$/;
						if(YDCX.getTab().find("#"+val+"").combobox("getText").length!=0&&YDCX.getTab().find("#"+val+"").combobox("panel").find("div:contains("+YDCX.getTab().find("#"+val+"").combobox("getText")+")").length==0){
							YDCX.getTab().find("#"+val+"").combobox("reset")
						}
						else{
							var e = jQuery.Event("keyup");//模拟一个键盘事件 
							e.keyCode = 13;//keyCode=13是回车
							YDCX.getTab().find("#"+val+"").combobox("textbox").trigger(e);//模拟按下回车
						}
					});
				});
			}
});

YDCX.setAfterInit(function() {
	//获取录入人
	YDCX.getTab().find('#lrr').combobox({
		data:YDCX.getry(),
		valueField:'peop_code',    
		textField:'peop_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//发货网点
	YDCX.getTab().find('#postnetcx').combobox({ 
		data:YDCX.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//到达网点
	YDCX.getTab().find('#acceptnetcx').combobox({ 
		data:YDCX.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		},
	});
	//当前网点
	YDCX.getTab().find('#nownetcx').combobox({ 
		data:YDCX.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//状态
	YDCX.getTab().find('#statecx').combobox({ 
		data:YDCX.getstate(),
		valueField:'code',    
		textField:'name',
	});
	//客户
	YDCX.getTab().find('#cus_codecx').combobox({ 
		data:YDCX.getcust(),
		valueField:'cus_code',    
		textField:'s_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//付款方式    
	YDCX.getTab().find('#fkfscx').combobox({ 
		data:YDCX.getfkfs(),
		valueField:'code',    
		textField:'name',
	});
	
	YDCX.getTab().find('#upbtn').linkbutton({
		onClick: function(){
			if(gridindex == 0){
				ui.alert("没有上一条记录了");
				return false;
			}
			gridindex = gridindex -1;
			YDCX.getTab().find("#d_YDCXBILL").datagrid('unselectAll');
			YDCX.getTab().find("#d_YDCXBILL").datagrid('selectRow',gridindex);
			var selected=YDCX.getTab().find("#d_YDCXBILL").datagrid('getSelected');
			
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "YDCX.selectYDCX";
			queryField["DataBaseType"] = "tms";
			queryField["billno"] =selected.billno;
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
			var resultData = ui.ajax(ajaxJson).data;
			YDCX.getTab().find("#AWD").form('clear');
			YDCX.getTab().find("#AWD").form('load',resultData[0]);
		}
	});
	
	YDCX.getTab().find('#downbtn').linkbutton({
		onClick: function(){
			var rows=YDCX.getTab().find("#d_YDCXBILL").datagrid('getRows');
			if(gridindex == (rows.length-1)){
				ui.alert("没有下一条记录了");
				return false;
			}
			gridindex = gridindex + 1;
			YDCX.getTab().find("#d_YDCXBILL").datagrid('unselectAll');
			YDCX.getTab().find("#d_YDCXBILL").datagrid('selectRow',gridindex);
			var selected=YDCX.getTab().find("#d_YDCXBILL").datagrid('getSelected');
			
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "YDCX.selectYDCX";
			queryField["DataBaseType"] = "tms";
			queryField["billno"] =selected.billno;
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
			var resultData = ui.ajax(ajaxJson).data;
			YDCX.getTab().find("#AWD").form('clear');
			YDCX.getTab().find("#AWD").form('load',resultData[0]);
		}
	});
	// 获取客户信息
	YDCX.getTab().find("#cus_code").combobox({
		 valueField: 'cus_code',   
	     textField: 's_name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFKH.selectKH\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     },
	     onSelect: function(record){
	    	 YDCX.getTab().find("#cus_code").val(record.cus_code);//客户代码
	    	 YDCX.getTab().find("#skgs_cn").textbox("setValue",record.skgs_cn);//收款公司名称
	    	 YDCX.getTab().find("#fkfs").combobox("setValue",record.fkfs);//付款方式
	    	 YDCX.getTab().find("#jswd").combobox("setValue",record.jswd);//结算网点
	    	 YDCX.getTab().find("#bjfl").textbox("setValue",record.bjfl);//保价费率%
	    	 
	    	 YDCX.getTab().find("#jjfs").combobox("setValue",record.jjfs);//计价方式
	    	 YDCX.getTab().find("#bjfl").textbox("setValue",record.bjfl);//保价费率
	    	 YDCX.getTab().find("#bjje").val(record.bjje);//报价单价
	    	 YDCX.getTab().find("#hwlb").combobox("setValue",record.hwlb);//货物类别
	    	 
		     if(ui.isNull(record.gg)){
		    	 YDCX.getTab().find("#gg").combobox("setValue",1);
		     }else{
		    	 YDCX.getTab().find("#gg").combobox("setValue",record.gg);//规格
		     }
	    	 if(!ui.isNull(record.cus_name)){
	    		 YDCX.getTab().find('#fhdw').text(record.cus_name);
		     }
		     if(!ui.isNull(record.addr)){
		    	 YDCX.getTab().find('#fhdz').text(record.addr);
		     }
		     
		     var boxes=YDCX.getTab().find("#boxes").numberbox('getValue');
		     if(!ui.isNull(boxes)){
		    	 YDCX.getTab().find("#volume").numberbox('setValue',boxes*record.vol);
		     }
		     
	    	 YDCX.getTab().find("#postman").textbox("disableValidation");
	    	 YDCX.getTab().find("#posttel").textbox("disableValidation");
	    	 YDCX.getTab().find("#acceptman").textbox("disableValidation");
	    	 YDCX.getTab().find("#accepttel").textbox("disableValidation");
		     if(record.cus_code=="999999"){
		    	 YDCX.getTab().find("#postman").textbox("enableValidation");
		    	 YDCX.getTab().find("#posttel").textbox("enableValidation");
		    	 YDCX.getTab().find("#acceptman").textbox("enableValidation");
		    	 YDCX.getTab().find("#accepttel").textbox("enableValidation");
		 		 return false;
		 	}
		     
		    var XmlData = [];
	 		var queryField={};
	 			queryField["dataType"] = "Json";
	 			queryField["sqlid"] = "YDCX.selectKHWD";
	 			queryField["cus_code"] = record.cus_code;
	 			queryField["dqxx_code"] = YDCX.getTab().find("#acceptzone").textbox('getValue');
	 			XmlData.push(queryField);
	 		var ajaxJson = {};
	 			ajaxJson["src"] = "jlquery/select.do";
	 			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	 		var resultData = ui.ajax(ajaxJson).data;
	 			if(!ui.isNull(resultData)){
					YDCX.getTab().find("#acceptnet").combobox("setValue",resultData[0].net_code);//到达网点
				}
	     }
	});
	//获取付款方式
	YDCX.getTab().find('#fkfs').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFKH.selectFKFS\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     },
	     "onChange":function(){
		 	if($(this).combobox("getValue")==3){
		 		if(YDCX.getTab().find("#cus_code").textbox("getValue")=="999999"){
		 			ui.alert("该客户月结方式不可选");
		 			YDCX.getTab().find('#fkfs').combobox("reset");
		 			return false;
		 		}
		 		//申明价值
		 		YDCX.getTab().find("#smjz").numberbox("disable");
		 		//报价费率
		 		YDCX.getTab().find("#bjfl").numberbox("disable");
		 		//运费
		 		YDCX.getTab().find("#postfee").numberbox("disable");
		 		//上楼费
		 		YDCX.getTab().find("#slfee").numberbox("disable");
		 		//提货费
		 		YDCX.getTab().find("#thfee").numberbox("disable");
		 		//仓储费
		 		YDCX.getTab().find("#ccfee").numberbox("disable");
		 		//送货费
		 		YDCX.getTab().find("#shfee").numberbox("disable");
		 		//送货费
		 		YDCX.getTab().find("#shfee").numberbox("disable");
		 		
		 		YDCX.getTab().find("#postfee").numberbox("disableValidation");
		 	}else{
		 		//申明价值
		 		YDCX.getTab().find("#smjz").numberbox("enable");
		 		//报价费率
		 		YDCX.getTab().find("#bjfl").numberbox("enable");
		 		//运费
		 		YDCX.getTab().find("#postfee").numberbox("enable");
		 		//上楼费
		 		YDCX.getTab().find("#slfee").numberbox("enable");
		 		//提货费
		 		YDCX.getTab().find("#thfee").numberbox("enable");
		 		//仓储费
		 		YDCX.getTab().find("#ccfee").numberbox("enable");
		 		//送货费
		 		YDCX.getTab().find("#shfee").numberbox("enable");
		 		//送货费
		 		YDCX.getTab().find("#shfee").numberbox("enable");
		 		
		 		YDCX.getTab().find("#postfee").numberbox("enableValidation");
		 	}
		 }
	});
	//获取结算网点
	YDCX.getTab().find('#jswd').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectJSWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	//获取货物类别
	YDCX.getTab().find('#hwlb').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectHWLB\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	//获取到发货网点
	YDCX.getTab().find('#acceptnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	//获取到达网点
	YDCX.getTab().find('#postnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	
	//始发地and到达地
	YDCX.getTab().find(".dqxx").combobox({
		 valueField: 'code',   
	     textField: 'name',
	     groupField: 'jc',
	     mode:'remote',
	     groupFormatter: function(group){
	    	 return '<span style="color:red;">' + group + '</span>';
	     },
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDQ\"}]"},
	     url: 'jlquery/select.do',
	     onBeforeLoad: function(param){
		    	var json = JSON.parse(param.json);
		    	json[0].q = param.q;
		    	if(param == null || param.q == null || param.q.replace(/ /g, '') == ''){
		    		json[0].code =zone;
		    	}
		    	param["json"] = JSON.stringify(json);
		 	 },
		 filter: function(q, row){
				var opts = $(this).combobox('options');
				return row[opts.textField].indexOf(q) >= 0;
		 },
	     loadFilter: function(data){
	    	 return data.data;
	     },
	     panelWidth: '250px',
	     onSelect:function(val){
	    	var XmlData = [];
 			var queryField={};
 			queryField["dataType"] = "Json";
 			queryField["sqlid"] = "YDCX.selectKHWD";
 			queryField["cus_code"] = YDCX.getTab().find("#cus_code").textbox('getValue');
 			queryField["dqxx_code"] = val.code;
 			queryField["net_code"] = val.net_code;
 			XmlData.push(queryField);
 			var ajaxJson = {};
 			ajaxJson["src"] = "jlquery/select.do";
 			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
 			var resultData = ui.ajax(ajaxJson).data;
 			if(ui.isNull(resultData)){
 				YDCX.getTab().find("#acceptnet").combobox("setValue",val.net_code);//到达网点
 			}else{
 				YDCX.getTab().find("#acceptnet").combobox("setValue",resultData[0].net_code);//到达网点
 			}
	     }
	});
	YDCX.getTab().find('#qk').linkbutton({
		onClick: function(){
			YDCX.getTab().find('#billnocx').val("");
		}
	});	
	YDCX.getTab().find('#xhdy').linkbutton({
		onClick: function(){
			var ajaxJson = YDCX.getTab().find('#d_YDCXBILL').datagrid('getSelections');	
		    if (ui.isNull(ajaxJson)) {
		        ui.alert("请选择要打印箱号的记录!");
		        return false;
		    }
		    var billno = '';
		    $.each(ajaxJson,function(i,val){
		    	billno = billno + "'"+val.billno+"',";
		    });
		    billno = billno.substring(0,billno.length-1);
		    
		    var ajaxJson = {};
			ajaxJson["src"] = "/cfydcx/updateXH.do";
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify(
						{"item":$('#d_YDCXBILL').datagrid('getSelections')}
							
				)
			};
			
		    
			var resultData = ui.ajax(ajaxJson);
			if (!ui.isNull(resultData)) {
				sessionStorage["PRINT_URL"] = "/reportBOX/print.do";
				sessionStorage["PRINT_DATAS"] = "{\"billno\":\""+billno+"\"}";
				window.open("/print.html?dybh=6&rid="+Math.random());
			}else{
				ui.alert("签收失败！");
				return false;
			}
		}
	});	
	YDCX.getTab().find('#postnet').combobox('readonly');
	//YDCX.getTab().find('#acceptnet').combobox('readonly');
	YDCX.getTab().find('#jswd').combobox('readonly');
	YDCX.getTab().find('#billno').textbox('readonly');
	YDCX.getTab().find('#tpck').linkbutton({
		onClick: function(){
			var ajaxJson = YDCX.getTab().find('#d_YDCXBILL').datagrid('getSelections');	
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
				
		    /* window.open('/awd/PIC.html?billno='+billno+'&fenlei=1', "_new");*/
			$.getJSON('cfydcx/getQSPic.do?billno='+billno+'&fenlei=1', function(json){
				  layer.photos({
				    photos: json
				    //,anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
				  });
				}); 
		}
	});
	YDCX.getTab().find('#tpckcw').linkbutton({
		onClick: function(){
			var ajaxJson = YDCX.getTab().find('#d_YDCXBILL').datagrid('getSelections');	
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
		    	ui.alert("此运单未上传图片");
		    	return false;
		    }
				
		  //  window.open('/awd/PIC.html?billno='+billno+'&fenlei=2', "_new");
		    $.getJSON('cfydcx/getQSPic.do?billno='+billno+'&fenlei=2', function(json){
				  layer.photos({
				    photos: json
				    //,anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
				  });
				}); 
		}
	});
	YDCX.getTab().find('#rq_Scx').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		},
	});
	YDCX.getTab().find('#rq_Ecx').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	
	YDCX.getTab().find('#rq_Scx').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		},
	});
	YDCX.getTab().find('#rq_Ecx').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	YDCX.getTab().find('#rq_Scx').datebox('setValue', ui.formatDate(0,1));
	YDCX.getTab().find('#rq_Ecx').datebox('setValue', ui.formatDate(0,1));
	$('#delbill').dialog({    
	    title: '删除确认',    
	    width: 200,    
	    height: 100,    
	    closed: true,    
	    cache: false,    
	    //href: 'get_content.php',    
	    modal: true,
		buttons: [{
			text:'确认',
			iconCls:'icon-ok',
			handler:function(){
				$('#delbill').dialog('close');
				var ajaxJson = YDCX.getTab().find('#d_YDCXBILL').datagrid('getSelections');	
				var a = 0;
			    var error = 0;
			    var billindex;
			    $.each(ajaxJson,function(i,val){
			    	var XmlData = [];
					var queryField={};
					queryField["dataType"] = "Json";
					queryField["sqlid"] = "YDCX.selectYDCX";
					queryField["billno"] = val.billno;
					queryField["DataBaseType"] = "tms";
					XmlData.push(queryField);
					var ajaxJson = {};
					ajaxJson["src"] = "jlquery/select.do";
					ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
					var resultData2 = ui.ajax(ajaxJson).data;
					if(ui.isNull(resultData2)){
						ui.alert("找不到此运单"+val.billno+",请重新查询！");
						error =1;
						return false;
					}
					if(resultData2[0].shbj ==1){
						ui.alert("此运单已经审核,无法删除！");
						return false;
					}
					if(resultData2[0].state!=3){
						ui.alert(val.billno+"当前状态不允许删除！");
						error =1;
						return false;
					}
					
					if(resultData2[0].postnet != userInfo.WD01){
						ui.alert(val.billno+"不是本网点录的运单！");
						error =1;
						return false;
					}
			    	a = a + 1;
			    });
			    if(error == 1){
			    	return false;
			    }
			    if(ui.isNull(ui.ryxx_qx(1))){
			    	if (a != 1){
				    	ui.alert("请选择单行删除!");
				        return false;
				    }
			    }
				var ajaxJson = {};
				ajaxJson["src"] = "/cfydcx/deleteYD.do";
				ajaxJson["data"] = {
					"XmlData" : JSON.stringify($.extend(
													   {"czr":userInfo.CFRY01},
													   {"czwd":userInfo.WD01},
													   {"item":$('#d_YDCXBILL').datagrid('getSelections')}
							))
				};
				var resultData = ui.ajax(ajaxJson);
				if (!ui.isNull(resultData)) {
					ui.alert(resultData.data.staus);
				}
				var ajaxJson2 = YDCX.getTab().find('#d_YDCXBILL').datagrid('getRows');	
				var ajaxJson3 = YDCX.getTab().find('#d_YDCXBILL').datagrid('getSelections');	
				$.each(ajaxJson3,function(j,val3){
					$.each(ajaxJson2,function(i,val2){
				    	if(val3.billno == val2.billno){
				    		$('#d_YDCXBILL').datagrid('deleteRow',i);
				    		return false;
				    	}
				    });	
				});
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(){
				$('#delbill').dialog('close');
			}
		}]
	});   
	
	YDCX.getTab().find("#jjfs").combobox({  
		valueField:'code',    
		textField:'name',    
    	method: 'POST',
    	queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectJJFS\"}]"},
    	url: 'jlquery/select.do',
    	loadFilter: function(data){
    		return data.data;
    	},
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		},onLoadSuccess:function(){
			 var val = $(this).combobox("getData");
			 $(this).combobox("select", val[0]["code"]);
			}
	});
	
	YDCX.getTab().find("#gg").combobox({  
		valueField:'code',    
		textField:'name',    
    	method: 'POST',
    	queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectGG\"}]"},
    	url: 'jlquery/select.do',
    	loadFilter: function(data){
    		return data.data;
    	},
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		},onLoadSuccess:function(){
			 var val = $(this).combobox("getData");
			 $(this).combobox("select", val[0]["code"]);
			}
	});
	var comboxblurs=["cus_code","postzone","acceptzone","acceptnet","hwlb","jjfs","fkfs"];
	YDCX.comboxonblur(comboxblurs);
	
	
	YDCX.getTab().find("#boxes").textbox({
		"onChange":function(newValue, oldValue){
			var cus_code=YDCX.getTab().find("#cus_code").combobox("getValue");
			if(!ui.isNull(cus_code)){
				var XmlData = [];
				var queryField={};
				queryField["dataType"] = "Json";
				queryField["sqlid"] = "CFKH.selectKH";
				queryField["DataBaseType"] = "tms";
				queryField["cus_code"] = cus_code;
				XmlData.push(queryField);
				var ajaxJson = {};
				ajaxJson["src"] = "jlquery/select.do";
				ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
				var resultData = ui.ajax(ajaxJson).data;
				if(!ui.isNull(resultData)){
					YDCX.getTab().find("#volume").numberbox("setValue",newValue*resultData[0].vol);
				}
			}
		}
	});
});