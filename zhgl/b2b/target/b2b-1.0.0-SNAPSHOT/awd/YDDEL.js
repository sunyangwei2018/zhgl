var YDDEL = ui.Form();

YDDEL.setPlugin({
	"bill" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "YDDEL.selectBillno",
		"columnName" : "YD",
		"pagination":true,  //分页
		"title" :"运单信息",
		"param" : {"billno":[""]},
		"listener": {
			onClickRow: function(index, row){
				var abnormal = YDDEL.getPlugin()["genjin"];
				abnormal["param"] = {	
						"billno" : row.billno
					};
				YDDEL.reloadPlugin("genjin", abnormal);
			}
		}
	}
});

YDDEL.define({
	// 定义查询按钮方法
	"query" : function() {
		var lrrq_S;
		var lrrq_E;//取值
		lrrq_S = YDDEL.getTab().find("#rq_S").datetimebox('getValue').trim();
		lrrq_E = YDDEL.getTab().find("#rq_E").datetimebox('getValue').trim();
		var rq=YDDEL.getTab().find("#rq").textbox('getValue').trim();
		var net_name=YDDEL.getTab().find("#net_name").combobox('getValue').trim();
		//获取列表
		var YDDELBB = YDDEL.getPlugin()["bill"];
		if(YDDEL.getTab().find('#billno').val()==''){
			YDDELBB["param"] = {	//传参
					"net_name":net_name,
					"lrrq_S" : lrrq_S,
					"lrrq_E" : lrrq_E,	
					"rq":rq
					
				};
		}else{
			if(YDDEL.getTab().find('#billno').textbox("textbox").val().split("\n").length>10000){
				ui.alert('请输入少于10000个单号！');
				return false;
			}
			YDDELBB["param"] = { //传参
					"billno" : YDDEL.getTab().find('#billno').textbox("textbox").val().split("\n"),
				};
		}   //重新加载
			debugger;
			YDDEL.reloadPlugin("bill", YDDELBB);
	},
	
});

YDDEL.setAfterInit(function() {
	
	//清空数据
	YDDEL.getTab().find('#qk').linkbutton({
		onClick: function(){
			YDDEL.getTab().find('#billno').textbox('setValue',null);
		}
	});	
	
	YDDEL.getTab().find('#net_name').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"YDDEL.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	
	YDDEL.getTab().find('#rq_S').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 00:00:00';
		},
	});
	YDDEL.getTab().find('#rq_E').datebox({
		formatter : function(date)
		{	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+d+' 23:59:59';
		},
	});
	YDDEL.getTab().find('#rq_S').datebox('setValue', ui.formatDate(0,1));
	YDDEL.getTab().find('#rq_E').datebox('setValue', ui.formatDate(0,1));
	
});

