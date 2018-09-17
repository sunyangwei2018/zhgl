var abnormalQuery = ui.Form();

abnormalQuery.setPlugin({
	"bill" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFAbnormal.selectBillno",
		"columnName" : "abnormal",
		"pagination":true,
		"title" :"运单信息",
		"param" : {"billno":[""]},
		"listener": {
			onClickRow: function(index, row){
				var abnormal = abnormalQuery.getPlugin()["genjin"];
				abnormal["param"] = {	
						"billno" : row.billno
					};
				abnormalQuery.reloadPlugin("genjin", abnormal);
			}
		}
	},
	"genjin" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFAbnormal.selectAbnormalitems",
		"columnName" : "abnormal",
		"title" :"异常件信息",
		"param" : {"billno":""}
	}
});

abnormalQuery.define({
	// 定义查询按钮方法
	"query" : function() {
		var billno=abnormalQuery.getTab().find("#billno").textbox('getValue');
		var yclx="";
		var postnet="";
		var acceptnet="";
		var djlx="";
		var state="";
		var starttime="";
		var endtime="";
			var bill=billno.split("\n");
			var abnormal = abnormalQuery.getPlugin()["bill"];
			if(bill==""){
				bill="";
				yclx=abnormalQuery.getTab().find("#yclx").combobox('getValue');
				postnet=abnormalQuery.getTab().find("#postnet").combobox('getValue');
				acceptnet=abnormalQuery.getTab().find("#acceptnet").combobox('getValue');
				djlx=abnormalQuery.getTab().find("#djlx").combobox('getValue');
				state=abnormalQuery.getTab().find("#state").combobox('getValue');
				starttime=abnormalQuery.getTab().find("#starttime").datebox('getValue');
				endtime=abnormalQuery.getTab().find("#endtime").datebox('getValue');
			}else{
				if(bill.length>10000){
					ui.alert('请输入少于10000个单号！');
					return false;
				}
			}
			abnormal["param"] = {	
					"billno" : bill,
					"yclx":yclx,
					"postnet":postnet,
					"acceptnet":acceptnet,
					"jzbj":djlx,
					"state":state,
					"starttime":starttime,
					"endtime":endtime
				};
			abnormalQuery.reloadPlugin("bill", abnormal);
			var abnormalg = abnormalQuery.getPlugin()["genjin"];
			abnormalg["param"] = {"billno" : ""};
			abnormalQuery.reloadPlugin("genjin", abnormalg);
	}
});

abnormalQuery.setAfterInit(function() {
	
	
	abnormalQuery.getTab().find('#qk').linkbutton({
		onClick: function(){
			abnormalQuery.getTab().find('#billno').textbox('setValue',null);
		}
	});	
	
	abnormalQuery.getTab().find('#yclx').combobox({
		valueField: 'code',   
	    textField: 'name',
	    method: 'POST',
	    queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAbnormal.selectYclx\"}]"},
	    url: 'jlquery/select.do',
	    loadFilter: function(data){
	   	 return data.data;
	    }
	});
	
	abnormalQuery.getTab().find('#state').combobox({
		valueField: 'code',   
	    textField: 'name',
	    method: 'POST',
	    queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAbnormal.selectbillzt\"}]"},
	    url: 'jlquery/select.do',
	    loadFilter: function(data){
	   	 return data.data;
	    }
	});
	
	abnormalQuery.getTab().find('#acceptnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	abnormalQuery.getTab().find('#postnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	
	abnormalQuery.getTab().find('#starttime').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		}
		
	});
	abnormalQuery.getTab().find('#endtime').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	
	abnormalQuery.getTab().find('#starttime').datebox('setValue', ui.formatDate(0,1));
	abnormalQuery.getTab().find('#endtime').datebox('setValue', ui.formatDate(0,1));
});