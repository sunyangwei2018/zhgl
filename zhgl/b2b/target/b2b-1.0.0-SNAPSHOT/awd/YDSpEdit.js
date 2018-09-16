var YDSpEdit = ui.Form();


YDSpEdit.setPlugin({
	"ts_jiean" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "CFComplain.selectComplainItem",
		"columnName" : "complain"
	}
});

YDSpEdit.define({
	// 定义保存按钮方法
	"edit" : function() {
			var billno=YDSpEdit.getTab().find("#billno").textbox("getValue");
			if(billno==""){
				ui.alert("运单号不能为空！");
				return false;
			}
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "YDCX.selectYDCX";
			queryField["billno"] = YDSpEdit.getTab().find("#billno").textbox("getValue");
			queryField["DataBaseType"] = "tms";
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
			var resultData = ui.ajax(ajaxJson).data;
			if(resultData[0].shbj ==1){
				ui.alert("此运单已经审核,无法修改！");
				return false;
			}
			var new_acceptnet=YDSpEdit.getTab().find("#new_acceptnet").combobox("getValue");
			var new_acceptnet_text=YDSpEdit.getTab().find("#new_acceptnet").combobox("getText");
			if(new_acceptnet=="" || new_acceptnet_text==new_acceptnet){
				ui.alert("到达网点不能为空！");
				return false;
			}
			var new_acceptzone=YDSpEdit.getTab().find("#new_acceptzone").combobox("getValue");
			var new_acceptzone_text=YDSpEdit.getTab().find("#new_acceptzone").combobox("getText");
			if(new_acceptzone=="" || new_acceptzone_text==new_acceptzone){
				ui.alert("到达地不能为空！");
				return false;
			}
			var new_cus_code=YDSpEdit.getTab().find("#new_cus_code").combobox("getValue");
			var new_cus_code_text=YDSpEdit.getTab().find("#new_cus_code").combobox("getText");
			if(new_cus_code=="" || new_cus_code_text==new_cus_code){
				ui.alert("客户不能为空！");
				return false;
			}
			var new_fkfs=YDSpEdit.getTab().find("#new_fkfs").combobox("getValue");
			var new_fkfs_text=YDSpEdit.getTab().find("#new_fkfs").combobox("getText");
			if(new_fkfs=="" || new_fkfs_text==new_fkfs){
				ui.alert("付款方式不能为空！");
				return false;
			}
			var new_hwlb=YDSpEdit.getTab().find("#new_hwlb").combobox("getValue");
			var new_hwlb_text=YDSpEdit.getTab().find("#new_hwlb").combobox("getText");
			if(new_hwlb=="" || new_hwlb_text==new_hwlb){
				ui.alert("货物类别不能为空！");
				return false;
			}
			var new_boxes=YDSpEdit.getTab().find("#new_boxes").numberbox("getValue").trim();

			if(new_boxes==""){
				ui.alert("箱数不能为空！");
				return false;
			}
			var new_duals=YDSpEdit.getTab().find("#new_duals").numberbox("getValue").trim();
			if(new_duals==""){
				ui.alert("双数不能为空！");
				return false;
			}
			var new_package=YDSpEdit.getTab().find("#new_package").numberbox("getValue").trim();
			if(new_package==""){
				ui.alert("包数不能为空！");
				return false;
			}
			if(new_package+new_duals+new_boxes<=0){
				ui.alert("箱数/双数/包数至少大于1！");
				return false;
			}
			var new_volume=YDSpEdit.getTab().find("#new_volume").numberbox("getValue").trim();
			if(new_volume==""){
				ui.alert("体积不能为空！");
				return false;
			}
			var old_acceptnet=YDSpEdit.getTab().find("#acceptnet").combobox("getValue");
			var old_acceptzone=YDSpEdit.getTab().find("#acceptzone").combobox("getValue");
			var old_cus_code=YDSpEdit.getTab().find("#customer").combobox("getValue");
			var old_fkfs=YDSpEdit.getTab().find("#fkfs").combobox("getValue");
			var old_hwlb=YDSpEdit.getTab().find("#hwlb").combobox("getValue");
			var old_boxes=YDSpEdit.getTab().find("#boxes").textbox("getValue").trim();
			var old_duals=YDSpEdit.getTab().find("#duals").textbox("getValue").trim();
			var old_package=YDSpEdit.getTab().find("#package").textbox("getValue").trim();
			var old_volume=YDSpEdit.getTab().find("#volume").textbox("getValue").trim();

			
			var ajaxJson = {};
			ajaxJson["src"] = "/billSpEdit/insertBillSp.do";   
			ajaxJson["data"] = {
				"XmlData" : JSON.stringify($.extend(
												   {"lrr":userInfo.CFRY01},
												   {"lrwd":userInfo.WD01},
												   {"new_acceptnet":new_acceptnet},
												   {"new_acceptzone":new_acceptzone},
												   {"new_cus_code":new_cus_code},
												   {"new_fkfs":new_fkfs},
												   {"new_hwlb":new_hwlb},
												   {"new_boxes":new_boxes},
												   {"new_duals":new_duals},
												   {"new_package":new_package},
												   {"new_volume":new_volume},
												   {"old_acceptnet":old_acceptnet},
												   {"old_acceptzone":old_acceptzone},
												   {"old_cus_code":old_cus_code},
												   {"old_fkfs":old_fkfs},
												   {"old_hwlb":old_hwlb},
												   {"old_boxes":old_boxes},
												   {"old_duals":old_duals},
												   {"old_package":old_package},
												   {"old_volume":old_volume},
												   {"billno":billno}
						))
			};
			var resultData = ui.ajax(ajaxJson);
			if(resultData.data.status==1){
				YDSpEdit.getTab().find('#ulater').form('reset');
				YDSpEdit.getTab().find('#uqi').form('reset');
				YDSpEdit.getTab().find('#billno').textbox('setValue',null);
			}
			ui.alert(resultData.data.msg);
			
	}
});

YDSpEdit.setAfterInit(function() {
	
	YDSpEdit.getTab().find('#billno').textbox({
		onChange : function(newValue,oldValue){
			if (newValue.trim()!='') {
				if (newValue.trim()!=oldValue.trim()) {
					var billno=YDSpEdit.getTab().find('#billno').textbox('getValue').trim();
					var XmlData = [];
					var queryField={};
					queryField["dataType"] = "Json";
					queryField["sqlid"] = "CFYdSp.selectYd";
					queryField["billno"] =billno;
					XmlData.push(queryField);
					var ajaxJson = {};
					ajaxJson["src"] = "jlquery/select.do";
					ajaxJson["data"] = {"json":JSON.stringify(XmlData)};	
					var resultData = ui.ajax(ajaxJson).data;
					if(ui.isNull(resultData)){
						ui.alert("找不到此运单！");
						YDSpEdit.getTab().find('#billno').textbox('setValue',null);
						YDSpEdit.getTab().find('#ulater').form('reset');
						YDSpEdit.getTab().find('#uqi').form('reset');
						return false;
					}else{
							YDSpEdit.getTab().find('#acceptnet').combobox('setValue',resultData[0].acceptnet);
							YDSpEdit.getTab().find('#acceptzone').combobox('setValue',resultData[0].acceptzone);
							YDSpEdit.getTab().find('#fkfs').combobox('setValue',resultData[0].fkfs);
							YDSpEdit.getTab().find('#customer').combobox('setValue',resultData[0].cus_code);
							YDSpEdit.getTab().find('#hwlb').combobox('setValue',resultData[0].hwlb);
							YDSpEdit.getTab().find('#boxes').textbox('setValue',resultData[0].boxes);
							YDSpEdit.getTab().find('#duals').textbox('setValue',resultData[0].duals);
							YDSpEdit.getTab().find('#package').textbox('setValue',resultData[0].package);
							YDSpEdit.getTab().find('#volume').textbox('setValue',resultData[0].volume);
							
							YDSpEdit.getTab().find('#new_acceptnet').combobox('setValue',resultData[0].acceptnet);
							YDSpEdit.getTab().find('#new_acceptzone').combobox('setValue',resultData[0].acceptzone);
							YDSpEdit.getTab().find('#new_fkfs').combobox('setValue',resultData[0].fkfs);
							YDSpEdit.getTab().find('#new_cus_code').combobox('setValue',resultData[0].cus_code);
							YDSpEdit.getTab().find('#new_hwlb').combobox('setValue',resultData[0].hwlb);
							YDSpEdit.getTab().find('#new_boxes').textbox('setValue',resultData[0].boxes);
							YDSpEdit.getTab().find('#new_duals').textbox('setValue',resultData[0].duals);
							YDSpEdit.getTab().find('#new_package').textbox('setValue',resultData[0].package);
							YDSpEdit.getTab().find('#new_volume').textbox('setValue',resultData[0].volume);
					}
				}
			}
		}
	});
	var zone = userInfo.DQXX01;
	
	YDSpEdit.getTab().find('#new_acceptnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     },	
	     "onChange":function(){
			 	if($(this).combobox("getValue")==$(this).combobox("getText")){
		 			return false;
			 	}
			 }
	});
	//获取货物类别
	YDSpEdit.getTab().find('#new_hwlb').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectHWLB\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     },	
	     "onChange":function(){
			 	if($(this).combobox("getValue")==$(this).combobox("getText")){
		 			return false;
			 	}
			 }
	});
	
	
	// 获取客户信息
	YDSpEdit.getTab().find("#new_cus_code").combobox({
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
		 },
	     onSelect: function(record){
	    	 YDSpEdit.getTab().find("#new_cus_code").combobox("setValue",record.cus_code);//客户代码
		     YDSpEdit.getTab().find("#new_fkfs").combobox("setValue",record.fkfs);//付款方式
		     YDSpEdit.getTab().find("#new_hwlb").combobox("setValue",record.hwlb);//货物类别
	     },	
	     "onChange":function(){
			 	if($(this).combobox("getValue")==$(this).combobox("getText")){
		 			return false;
			 	}
			 }
	});
	YDSpEdit.getTab().find('#new_fkfs').combobox({
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
		 		if(YDSpEdit.getTab().find("#new_cus_code").textbox('getValue')=="999999"){
		 			ui.alert("该客户月结方式不可选");
		 			YDSpEdit.getTab().find('#new_fkfs').combobox("setValue",null);
		 			YDSpEdit.getTab().find('#new_cus_code').combobox("setValue",null);
		 			return false;
		 		}
		 	}else if($(this).combobox("getValue")==$(this).combobox("getText")){
	 			return false;
		 	}
		 }
	});
	
	YDSpEdit.getTab().find("#new_acceptzone").combobox({
		 selected: 'true',
		 valueField: 'code',   
	     textField: 'name',
	     groupField: 'jc',
	     mode:'remote',
	     groupFormatter: function(group){
	    	 return '<span style="color:red;">' + group + '</span>';
	     },
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFElandShop.selectDQ\"}]"},
	     url: 'jlquery/select.do',
	     onBeforeLoad: function(param){
	    	var json = JSON.parse(param.json);
	    	json[0].q = param.q;
//	    	if(param == null || param.q == null || param.q.replace(/ /g, '') == ''){
//	    		json[0].code =zone;
//	    	}
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
	    	 if($(this).attr("id")=="new_acceptzone"){//到达地
	    		    var XmlData = [];
	    			var queryField={};
	    			queryField["dataType"] = "Json";
	    			queryField["sqlid"] = "YDCX.selectKHWD";
	    			queryField["cus_code"] = YDSpEdit.getTab().find("#new_cus_code").textbox('getValue');
	    			queryField["dqxx_code"] = val.code;
	    			queryField["net_code"] = val.net_code;
	    			XmlData.push(queryField);
	    			var ajaxJson = {};
	    			ajaxJson["src"] = "jlquery/select.do";
	    			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	    			var resultData = ui.ajax(ajaxJson).data;
	    			if(ui.isNull(resultData)){
	    				YDSpEdit.getTab().find("#new_acceptnet").combobox("setValue",val.net_code);//到达网点
	    			}else{
	    				YDSpEdit.getTab().find("#new_acceptnet").combobox("setValue",resultData[0].net_code);//到达网点
	    			}
	    		    
	    	 }
	     },	
	     "onChange":function(){
			 	if($(this).combobox("getValue")==$(this).combobox("getText")){
		 			return false;
			 	}
			 }
	});
	
	YDSpEdit.getTab().find('#new_acceptnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     },	
	     "onChange":function(){
			 	if($(this).combobox("getValue")==$(this).combobox("getText")){
		 			return false;
			 	}
			 }
	});
	
	YDSpEdit.getTab().find('#acceptnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	
	//获取货物类别
	YDSpEdit.getTab().find('#hwlb').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectHWLB\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	
	
	// 获取客户信息
	YDSpEdit.getTab().find("#customer").combobox({
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
		 },
	     onSelect: function(record){
	    	 YDSpEdit.getTab().find("#customer").combobox("setValue",record.cus_code);//客户代码
		     YDSpEdit.getTab().find("#fkfs").combobox("setValue",record.fkfs);//付款方式
	     }
	});
	YDSpEdit.getTab().find('#fkfs').combobox({
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
		 		if(YDSpEdit.getTab().find("#cus_code").val()=="999999"){
		 			ui.alert("该客户月结方式不可选");
		 			YDSpEdit.getTab().find('#fkfs').combobox("setValue",null);
		 			YDSpEdit.getTab().find('#customer').combobox("setValue",null);
		 			return false;
		 		}
		 	}else{
		 	}
		 }
	});

	YDSpEdit.getTab().find("#acceptzone").combobox({
		 selected: 'true',
		 valueField: 'code',   
	     textField: 'name',
	     groupField: 'jc',
	     mode:'remote',
	     groupFormatter: function(group){
	    	 return '<span style="color:red;">' + group + '</span>';
	     },
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFElandShop.selectDQ\"}]"},
	     url: 'jlquery/select.do',
	     onBeforeLoad: function(param){
	    	var json = JSON.parse(param.json);
	    	json[0].q = param.q;
//	    	if(param == null || param.q == null || param.q.replace(/ /g, '') == ''){
//	    		json[0].code =zone;
//	    	}
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
	});
	
	
	YDSpEdit.getTab().find("#acceptnet").textbox("disable");
	YDSpEdit.getTab().find("#acceptzone").textbox("disable");
	YDSpEdit.getTab().find("#customer").textbox("disable");
	YDSpEdit.getTab().find("#fkfs").textbox("disable");
	YDSpEdit.getTab().find("#hwlb").textbox("disable");
	YDSpEdit.getTab().find("#boxes").textbox("disable");
	YDSpEdit.getTab().find("#duals").textbox("disable");
	YDSpEdit.getTab().find("#postdw").textbox("disable");
	YDSpEdit.getTab().find("#package").textbox("disable");
	YDSpEdit.getTab().find("#volume").textbox("disable");

});