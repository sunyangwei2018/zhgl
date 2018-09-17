var YDSpQuery = ui.Form();

YDSpQuery.setPlugin({
	"bill" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFYdSp.selectBillSpLog",
		"columnName" : "YD",
		"pagination":true,
		"title" :"运单信息",
		"param" : {"billno":[""]},
		"listener": {
			onDblClickCell: function(index,field,value){
				YDSpQuery.getTab().find('#dq').form('reset');
				YDSpQuery.getTab().find('#YDSp_tab').tabs('select', 1);
				var ajaxJson = YDSpQuery.getTab().find('#d_bill').datagrid('getSelected');
				YDSpQuery.getTab().find('#dq').form('load',ajaxJson);
			}
		}
	}
});

YDSpQuery.define({
	// 定义查询按钮方法
	"query" : function() {
		var billno=YDSpQuery.getTab().find("#billno").textbox('getValue');
		var starttime=starttime=YDSpQuery.getTab().find("#starttime").datebox('getValue');
		var endtime=YDSpQuery.getTab().find("#endtime").datebox('getValue');
		
		var shbj=YDSpQuery.getTab().find("#shbj").combobox('getValue');
		var fsbj=YDSpQuery.getTab().find("#fsbj").combobox('getValue');
		var postnet=YDSpQuery.getTab().find("#postnet").textbox('getValue');
			var bill=billno.split("\n");
			var abnormal = YDSpQuery.getPlugin()["bill"];
			if(bill==""){
				bill="";
			}else{
				if(bill.length >10000){
					ui.alert("请输入少于10000个单号!");
			        return false;
				}
			}
			abnormal["param"] = {	
					"billno" : bill,
					"starttime":starttime,
					"endtime":endtime,
					"shbj":shbj,
					"fsbj":fsbj,
					"postnet":postnet
				};
			YDSpQuery.reloadPlugin("bill", abnormal);
	},
	"check" : function() {
		var ajaxJson = YDSpQuery.getTab().find('#d_bill').datagrid('getSelected');	
	    if (ui.isNull(ajaxJson)) {
	        ui.alert("请查询要审核的记录!");
	        return false;
	    };
	    if (ajaxJson.shbj==1) {
	        ui.alert("此运单已经审核!");
	        return false;
	    };
	    if(ajaxJson.lrwd=='3101' && userInfo.WD01!='3101'){
	    	  ui.alert("上海网点的数据只能上海网点审核");
		      return false;
	    }else if(ajaxJson.lrwd!='3101' && userInfo.WD01!='9000'){
	    	ui.alert("非上海网点的数据只能总部审核");
		    return false;
	    }
	    var billno = ajaxJson.billno;
		$("#YDSp_wbillno").textbox("setValue",billno);
		$("#YDSp_id").textbox("setValue",ajaxJson.id);
		$("#YDSp_opinion").textbox("setValue",null);
		YDSpQuery.getTab().find("#ydspquery").css("display","block");
		YDSpQuery.getTab().find("#ydspquery").dialog({ 
		    title: '审核',
		    width: 400,    
		    height: 220,    
		    closed: true,
		}); 
		
		$('#ydspquery').window('open');
	},
	"check2" : function() {
		var ajaxJson = YDSpQuery.getTab().find('#d_bill').datagrid('getSelected');	
	    if (ui.isNull(ajaxJson)) {
	        ui.alert("请查询要复审的记录!");
	        return false;
	    };
	    if(userInfo.WD01!='9000'){
	    	ui.alert("该数据只能总部复审");
		      return false;
	    }
	    var billno = ajaxJson.billno;
		$("#YDSp_wbillno2").textbox("setValue",billno);
		$("#YDSp_id2").textbox("setValue",ajaxJson.id);
		$("#YDSp_opinion2").textbox("setValue",null);
		YDSpQuery.getTab().find("#ydspquery2").css("display","block");
		YDSpQuery.getTab().find("#ydspquery2").dialog({ 
		    title: '复审',
		    width: 400,    
		    height: 220,    
		    closed: true,
		}); 
		
		$('#ydspquery2').window('open');
	}
});

YDSpQuery.setAfterInit(function() {
	
	
	YDSpQuery.getTab().find('#qk').linkbutton({
		onClick: function(){
			YDSpQuery.getTab().find('#billno').textbox('setValue',null);
		}
	});	
	
	
	YDSpQuery.getTab().find('#starttime').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		}
		
	});
	YDSpQuery.getTab().find('#endtime').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	
	YDSpQuery.getTab().find('#starttime').datebox('setValue', ui.formatDate(0,1));
	YDSpQuery.getTab().find('#endtime').datebox('setValue', ui.formatDate(0,1));
	
	YDSpQuery.getTab().find('#ydbh').linkbutton({
		onClick: function(){
			var id=$("#YDSp_id").textbox('getValue');
			var opinion=$("#YDSp_opinion").textbox('getValue');
			if(ui.isNull(opinion)){
				ui.alert("驳回时驳回意见不能为空！");
				return false;
			}
			var ajaxJson = {};
			ajaxJson["src"] = "/billSpEdit/updayeBillSp.do";   
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
												   {"lrr":userInfo.CFRY01},
												   {"shbj":2},
												   {"id":id},
												   {"shyj":opinion},
												   {"bj":0}
						))
			};
			var resultData = ui.ajax(ajaxJson);
			if(resultData.data.status==1){
				YDSpQuery.getTab().find('#ydsp').form('reset');
				$('#ydspquery').window('close');
			}
			ui.alert(resultData.data.msg);

			var billno=YDSpQuery.getTab().find("#billno").textbox('getValue');
			var starttime=starttime=YDSpQuery.getTab().find("#starttime").datebox('getValue');
			var endtime=YDSpQuery.getTab().find("#endtime").datebox('getValue');
			
			var shbj=YDSpQuery.getTab().find("#shbj").combobox('getValue');
			var fsbj=YDSpQuery.getTab().find("#fsbj").combobox('getValue');
			var postnet=YDSpQuery.getTab().find("#postnet").textbox('getValue');
				var bill=billno.split("\n");
				var abnormal = YDSpQuery.getPlugin()["bill"];
				if(bill==""){
					bill="";
				}
				abnormal["param"] = {	
						"billno" : bill,
						"starttime":starttime,
						"endtime":endtime,
						"shbj":shbj,
						"fsbj":fsbj,
						"postnet":postnet
					};
				YDSpQuery.reloadPlugin("bill", abnormal);
		}
	});
	YDSpQuery.getTab().find('#ydty').linkbutton({
		onClick: function(){
			var id=$("#YDSp_id").textbox('getValue');
			var opinion=$("#YDSp_opinion").textbox('getValue');
			var ajaxJson = {};
			ajaxJson["src"] = "/billSpEdit/updayeBillSp.do";   
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
												   {"lrr":userInfo.CFRY01},
												   {"shbj":1},
												   {"id":id},
												   {"shyj":opinion},
												   {"bj":0}
						))
			};
			var resultData = ui.ajax(ajaxJson);
			if(resultData.data.status==1){
				$('#ydspquery').window('close');
			}
			ui.alert(resultData.data.msg);

			var billno=YDSpQuery.getTab().find("#billno").textbox('getValue');
			var starttime=starttime=YDSpQuery.getTab().find("#starttime").datebox('getValue');
			var endtime=YDSpQuery.getTab().find("#endtime").datebox('getValue');
			
			var shbj=YDSpQuery.getTab().find("#shbj").combobox('getValue');
			var fsbj=YDSpQuery.getTab().find("#fsbj").combobox('getValue');
			var postnet=YDSpQuery.getTab().find("#postnet").textbox('getValue');
				var bill=billno.split("\n");
				var abnormal = YDSpQuery.getPlugin()["bill"];
				if(bill==""){
					bill="";
				}
				abnormal["param"] = {	
						"billno" : bill,
						"starttime":starttime,
						"endtime":endtime,
						"shbj":shbj,
						"fsbj":fsbj,
						"postnet":postnet
					};
				YDSpQuery.reloadPlugin("bill", abnormal);
		}
	});
	
	YDSpQuery.getTab().find('#ydbh2').linkbutton({
		onClick: function(){
			var id=$("#YDSp_id2").textbox('getValue');
			var opinion=$("#YDSp_opinion2").textbox('getValue');
			if(ui.isNull(opinion)){
				ui.alert("驳回时驳回意见不能为空！");
				return false;
			}
			var ajaxJson = {};
			ajaxJson["src"] = "/billSpEdit/updayeBillSp.do";   
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
												   {"lrr":userInfo.CFRY01},
												   {"shbj":2},
												   {"id":id},
												   {"shyj":opinion},
												   {"bj":1}
						))
			};
			var resultData = ui.ajax(ajaxJson);
			if(resultData.data.status==1){
				$('#ydspquery2').window('close');
			}
			ui.alert(resultData.data.msg);

			var billno=YDSpQuery.getTab().find("#billno").textbox('getValue');
			var starttime=starttime=YDSpQuery.getTab().find("#starttime").datebox('getValue');
			var endtime=YDSpQuery.getTab().find("#endtime").datebox('getValue');
			
			var shbj=YDSpQuery.getTab().find("#shbj").combobox('getValue');
			var fsbj=YDSpQuery.getTab().find("#fsbj").combobox('getValue');
			var postnet=YDSpQuery.getTab().find("#postnet").textbox('getValue');
				var bill=billno.split("\n");
				var abnormal = YDSpQuery.getPlugin()["bill"];
				if(bill==""){
					bill="";
				}
				abnormal["param"] = {	
						"billno" : bill,
						"starttime":starttime,
						"endtime":endtime,
						"shbj":shbj,
						"fsbj":fsbj,
						"postnet":postnet
					};
				YDSpQuery.reloadPlugin("bill", abnormal);
		}
	});
	YDSpQuery.getTab().find('#ydty2').linkbutton({
		onClick: function(){
			var id=$("#YDSp_id2").textbox('getValue');
			var opinion=$("#YDSp_opinion2").textbox('getValue');
			var ajaxJson = {};
			ajaxJson["src"] = "/billSpEdit/updayeBillSp.do";   
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
												   {"lrr":userInfo.CFRY01},
												   {"shbj":1},
												   {"id":id},
												   {"shyj":opinion},
												   {"bj":1}
						))
			};
			var resultData = ui.ajax(ajaxJson);
			if(resultData.data.status==1){
				$('#ydspquery2').window('close');
			}
			ui.alert(resultData.data.msg);

			var billno=YDSpQuery.getTab().find("#billno").textbox('getValue');
			var starttime=starttime=YDSpQuery.getTab().find("#starttime").datebox('getValue');
			var endtime=YDSpQuery.getTab().find("#endtime").datebox('getValue');
			
			var shbj=YDSpQuery.getTab().find("#shbj").combobox('getValue');
			var fsbj=YDSpQuery.getTab().find("#fsbj").combobox('getValue');
			var postnet=YDSpQuery.getTab().find("#postnet").textbox('getValue');
				var bill=billno.split("\n");
				var abnormal = YDSpQuery.getPlugin()["bill"];
				if(bill==""){
					bill="";
				}
				abnormal["param"] = {	
						"billno" : bill,
						"starttime":starttime,
						"endtime":endtime,
						"shbj":shbj,
						"fsbj":fsbj,
						"postnet":postnet
					};
				YDSpQuery.reloadPlugin("bill", abnormal);
		}
	});
	YDSpQuery.getTab().find('#postnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	
	YDSpQuery.getTab().find("#shbj").combobox('setValue',null);
	YDSpQuery.getTab().find("#fsbj").combobox('setValue',null);
});