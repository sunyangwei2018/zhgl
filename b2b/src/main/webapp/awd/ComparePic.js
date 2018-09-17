var ComparePic = ui.Form();



ComparePic.setPlugin({
	"SYSCPIC" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "TPDBSM.selectPIC",
		"param" : {"billno":" AND a.billno = 'AAAAA'"},
		"columnName" : "YD",
		"pagination" : true,//分页
		"title" :"已上传图片"
	},

	"SWSCPIC" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "TPDBSM.selectydxx",
		"param" : {"billno":" AND a.billno = 'AAAAA'"},
		"columnName" : "YD",
		"pagination" : true,//分页
		"title" :"未上传图片"
	},

});


ComparePic.define({
	"query" : function(){
		var errormsg='';
		var lrrq_S;
		var lrrq_E;
		var postdate_S;
		var postdate_E;
		if(ComparePic.getTab().find("#rq").combobox('getValue')=='1'){
			lrrq_S = ComparePic.getTab().find("#rq_S").datetimebox('getValue').trim();
			lrrq_E = ComparePic.getTab().find("#rq_E").datetimebox('getValue').trim();
		}else if(ComparePic.getTab().find("#rq").combobox('getValue')=='2'){
			postdate_S = ComparePic.getTab().find("#rq_S").datetimebox('getValue').trim();
			postdate_E = ComparePic.getTab().find("#rq_E").datetimebox('getValue').trim();
		}
		if(ui.isNull(ComparePic.getTab().find('#billno').val())){
			var SYSCPIC = ComparePic.getPlugin()["SYSCPIC"];
			SYSCPIC["param"] = {
								"postnet" : ComparePic.getTab().find("#postnet").combobox('getValue').trim(),
								"acceptnet":ComparePic.getTab().find("#acceptnet").combobox('getValue').trim(),
								"lrrq_S":lrrq_S,
								"lrrq_E":lrrq_E,
								"postdate_S":postdate_S,
								"postdate_E":postdate_E};
			ComparePic.reloadPlugin("SYSCPIC", SYSCPIC);
			var SWSCPIC = ComparePic.getPlugin()["SWSCPIC"];
			SWSCPIC["param"] = {
					"postnet" : ComparePic.getTab().find("#postnet").combobox('getValue').trim(),
					"acceptnet":ComparePic.getTab().find("#acceptnet").combobox('getValue').trim(),
					"lrrq_S":lrrq_S,
					"lrrq_E":lrrq_E,
					"postdate_S":postdate_S,
					"postdate_E":postdate_E};
			ComparePic.reloadPlugin("SWSCPIC", SWSCPIC);
		}else{
			if(ComparePic.getTab().find('#billno').val().split("\n").length==1){
				billno = ComparePic.getTab().find('#billno').val();
				var XmlData = [];
				var queryField={};
				queryField["dataType"] = "Json";
				queryField["sqlid"] = "TPDBSM.selectBILL";
				queryField["billno"] = billno;
				//queryField["czwd"] = userInfo.WD01;
				queryField["DataBaseType"] = "tms";
				XmlData.push(queryField);
				var ajaxJson = {};
				ajaxJson["src"] = "jlquery/select.do";
				ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
				var resultData = ui.ajax(ajaxJson).data;
				if(ui.isNull(resultData)){
					ComparePic.getTab().find('#errorinfo').text('找不到此运单');
					ComparePic.getTab().find('#billno').val("");
					return false;
				}
				var XmlData = [];
				var queryField={};
				queryField["dataType"] = "Json";
				queryField["sqlid"] = "TPDBSM.selectPIC";
				queryField["billno"] =" AND a.billno = '"+billno+"' ";
				//queryField["czwd"] = userInfo.WD01;
				queryField["DataBaseType"] = "tms";
				XmlData.push(queryField);
				var ajaxJson = {};
				ajaxJson["src"] = "jlquery/select.do";
				ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
				var resultData = ui.ajax(ajaxJson).data;
				if(!ui.isNull(resultData)){
					var SYSCPIC = ComparePic.getPlugin()["SYSCPIC"];
					SYSCPIC["param"] = {
							"billno" : " AND a.billno = '"+billno+"' "};
					ComparePic.reloadPlugin("SYSCPIC", SYSCPIC);
				}else{
					var SWSCPIC = ComparePic.getPlugin()["SWSCPIC"];
					SWSCPIC["param"] = {
							"billno" : " AND a.billno = '"+billno+"' "};
					ComparePic.reloadPlugin("SWSCPIC", SWSCPIC);
				}
			}else{
				var data1=[];
				var data2=[];
				var text = ComparePic.getTab().find('#billno').val();
				var billnos =text.split("\n");
				if(billnos.length>10000){
					ui.alert('请输入少于10000个单号！');
					return false;
				}
				for (var i = 0; i <=billnos.length-1; i++) {
					if (billnos[i]!='') {
					var billno=billnos[i];
					var XmlData = [];
					var queryField={};
					queryField["dataType"] = "Json";
					queryField["sqlid"] = "TPDBSM.selectBILL";
					queryField["billno"] =billno;
					//queryField["czwd"] = userInfo.WD01;
					queryField["DataBaseType"] = "tms";
					XmlData.push(queryField);
					var ajaxJson = {};
					ajaxJson["src"] = "jlquery/select.do";
					ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
					var resultData = ui.ajax(ajaxJson).data;
					if(ui.isNull(resultData)){
						errormsg=errormsg+"找不到编号为"+billno+"的运单"+'\n';
						ComparePic.getTab().find('#errorinfo').val(errormsg);
						ComparePic.getTab().find('#billno').val("");
						continue;
					}else{
						var XmlData = [];
						var queryField={};
						queryField["dataType"] = "Json";
						queryField["sqlid"] = "TPDBSM.selectPIC";
						queryField["billno"] = " AND a.billno = '"+billno+"' ";
						//queryField["czwd"] = userInfo.WD01;
						queryField["DataBaseType"] = "tms";
						XmlData.push(queryField);
						var ajaxJson = {};
						ajaxJson["src"] = "jlquery/select.do";
						ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
						var resultData1 = ui.ajax(ajaxJson).data;
						if(ui.isNull(resultData1)){
							data1.push(billno);
							continue;
						}else{
							data2.push(billno);
							continue;
						}
					}
				}
			}
		}
	}
	var SWSCPIC = ComparePic.getPlugin()["SWSCPIC"];
	SWSCPIC["param"] = {
						"billno" : ComparePic.getbillno(data1)};
	ComparePic.reloadPlugin("SWSCPIC", SWSCPIC);
		
	var SYSCPIC = ComparePic.getPlugin()["SYSCPIC"];
	SYSCPIC["param"] = {
						"billno" : ComparePic.getbillno(data2)};
	ComparePic.reloadPlugin("SYSCPIC", SYSCPIC);
},

	"getbillno" : function(data){
		var bill;
		bill="and a.billno in ("
		$.each(data, function(i, val) {
			if(val!=''){
				bill=bill+"'"+val+"',";
			}
		})
		bill = bill.substring(0,bill.length-1);
		bill=bill+")";
		return bill;
	},
	
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
});



//加载完成
ComparePic.setAfterInit(function() {  
	//发货网点
	ComparePic.getTab().find('#postnet').combobox({ 
		data:ComparePic.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	//到达网点
	ComparePic.getTab().find('#acceptnet').combobox({ 
		data:ComparePic.getwd(),
		valueField:'net_code',    
		textField:'net_name',
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) >= 0;
		}
	});
	
	ComparePic.getTab().find('#qk').linkbutton({
		onClick: function(){
			ComparePic.getTab().find('#billno').val("");
		}
	});	
	
	ComparePic.getTab().find('#rq_S').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		},
	});
	ComparePic.getTab().find('#rq_E').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	ComparePic.getTab().find('#rq_S').datebox('setValue', ui.formatDate(0,1));
	ComparePic.getTab().find('#rq_E').datebox('setValue', ui.formatDate(0,1));
})