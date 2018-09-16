var YDPLXG = ui.Form();
var zone = userInfo.DQXX01;

YDPLXG.setPlugin({
	"PLXG" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFYDPLXG.selectYDPLXG",
		"columnName" : "YD",
		"param" : {"nownet":userInfo.WD01,"billno":"AND a.billno = 'T0015'"}
	}
});


YDPLXG.define({
	"query" : function(){
		if(YDPLXG.getTab().find('#billnocx').val().split("\n").length>10000){
			ui.alert('请输入少于10000个单号！');
			return false;
		}
		if(YDPLXG.getbillno()==''){
			ui.alert("请输入运单号再查询");
			return false;
		}
		var PLXG = YDPLXG.getPlugin()["PLXG"];
		PLXG["param"] = {
				"billno" : YDPLXG.getbillno(),
				"nownet":userInfo.WD01
			};
		YDPLXG.reloadPlugin("PLXG", PLXG);
	},
	"save" : function(){
		if(ui.isNull(YDPLXG.getTab().find("#acceptzone").combobox('getValue'))&&ui.isNull(YDPLXG.getTab().find("#volume").textbox('getValue'))&&
		   ui.isNull(YDPLXG.getTab().find("#flag").combobox('getValue'))&&ui.isNull(YDPLXG.getTab().find("#fkfs").combobox('getValue'))&&
		   ui.isNull(YDPLXG.getTab().find("#postfee").textbox('getValue'))&&ui.isNull(YDPLXG.getTab().find("#acceptnet").combobox('getValue'))&&
		   ui.isNull(YDPLXG.getTab().find("#postdate").combobox('getValue'))&&ui.isNull(YDPLXG.getTab().find("#cus_code").combobox('getValue'))&&
		   ui.isNull(YDPLXG.getTab().find("#postdw").textbox('getValue'))) 
		{
			ui.alert("请至少选择一项条件");
			return false;
		}
		var obj=YDPLXG.getTab().find('#d_PLXG').datagrid('getRows');
		var err_msg='';
		if(userInfo.CFRY01 !='900000081'){
			for (var i = 0; i < obj.length; i++) {
				var XmlData = [];
				var queryField={};
				queryField["dataType"] = "Json";
				queryField["sqlid"] = "PKD.selectYDNR";
				queryField["DataBaseType"] = "tms";
				queryField["billno"] =obj[i].billno;
				XmlData.push(queryField);
				var ajaxJson = {};
				ajaxJson["src"] = "jlquery/select.do";
				ajaxJson["data"] = {"json":JSON.stringify(XmlData)};			
				var resultData = ui.ajax(ajaxJson).data;
				if (resultData[0].shbj==1) {
					err_msg = err_msg+"运单"+resultData[0].billno+"已经审核,无法修改！"+'\n';
					continue;
				}
			}
		}
		if (err_msg.length!=0) {
			ui.alert(err_msg);
			return false;
		}
		var ajaxJson = {};
		ajaxJson["src"] = "/cfydplxg/updateYD.do";
		ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
						{"acceptzone":YDPLXG.getTab().find("#acceptzone").combobox('getValue').trim()},
						{"acceptnet":YDPLXG.getTab().find("#acceptnet").combobox('getValue').trim()},
						{"volume":YDPLXG.getTab().find("#volume").textbox('getValue').trim()},
						{"flag":YDPLXG.getTab().find("#flag").combobox('getValue').trim()},
						{"fkfs":YDPLXG.getTab().find("#fkfs").combobox('getValue').trim()},
						{"postfee":YDPLXG.getTab().find("#postfee").textbox('getValue').trim()},
						{"postdate":YDPLXG.getTab().find("#postdate").textbox('getValue').trim()},
						{"cus_code":YDPLXG.getTab().find("#cus_code").textbox('getValue').trim()},
						{"postdw":YDPLXG.getTab().find("#postdw").textbox('getValue').trim()},
						{"czr":userInfo.CFRY01},
						{"czwd":userInfo.WD01},
						{"item":$('#d_PLXG').datagrid('getRows')}
						))
		};
		var resultData = ui.ajax(ajaxJson);	
		if (!ui.isNull(resultData)) {
			ui.alert(resultData.data.staus);
		}
	},
	"getbillno"	: function(){	
		var billno;
		if(ui.isNull(YDPLXG.getTab().find('#billnocx').val())){
			billno=''; 
		}else{
			if(YDPLXG.getTab().find('#billnocx').val().split("\n").length==1){
				billno = " and a.billno = '"+YDPLXG.getTab().find('#billnocx').val()+"'";
			}else{
				if(YDPLXG.getTab().find('#billnocx').val().split("\n").length>10000){
					ui.alert('请输入少于10000个单号！');
					return false;
				}
				billno="and a.billno in ("
				var text = YDPLXG.getTab().find('#billnocx').val();
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
	"comboxonblur": function(data){
		$.each(data,function(i,val){
			YDPLXG.getTab().find("#"+val+"").combobox("textbox").blur(function(){
				var reg=/^[A-Za-z0-9]+$/;
				if(YDPLXG.getTab().find("#"+val+"").combobox("getText").length!=0&&YDPLXG.getTab().find("#"+val+"").combobox("panel").find("div:contains("+YDPLXG.getTab().find("#"+val+"").combobox("getText")+")").length==0){
					YDPLXG.getTab().find("#"+val+"").combobox("reset")
				}
				else{
					var e = jQuery.Event("keyup");//模拟一个键盘事件 
					e.keyCode = 13;//keyCode=13是回车
					YDPLXG.getTab().find("#"+val+"").combobox("textbox").trigger(e);//模拟按下回车
				}
			});
		});
	}
});

YDPLXG.setAfterInit(function() {
	// 获取客户信息
	YDPLXG.getTab().find("#cus_code").combobox({
		 valueField: 'cus_code',   
	     textField: 's_name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFKH.selectKH\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     },
	     filter: function(q, row){
				var opts = $(this).combobox('options');
				return row[opts.textField].indexOf(q) >= 0;
		 }
	});
	//始发地and到达地
	YDPLXG.getTab().find(".dqxx").combobox({
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
	     panelWidth: '250px'
	});
	//获取到达网点
	YDPLXG.getTab().find('#acceptnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	//获取付款方式
	YDPLXG.getTab().find('#fkfs').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFKH.selectFKFS\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     },
	     editable : false
	});
	var comboxblurs=["acceptzone","acceptnet","cus_code"];
	YDPLXG.comboxonblur(comboxblurs);
	YDPLXG.getTab().find('#qk').linkbutton({
		onClick: function(){
			YDPLXG.getTab().find('#billnocx').val("");
		}
	});	
});