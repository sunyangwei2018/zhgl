var AWD = ui.Form();
var zone = userInfo.DQXX01;

AWD.define({
	 "setButton": function(iState){
		  //新增
		  if((iState==0)||(iState==2)){
			  AWD.getTab().find("#add").linkbutton('enable');
		  }else{
			  AWD.getTab().find("#add").linkbutton('disable');
		  }
		  
		  //保存
		  if(iState==1){
			  AWD.getTab().find("#save").linkbutton('enable');;
		  }else{
			  AWD.getTab().find("#save").linkbutton('disable');
		  }
		  
		  //修改
		  if(iState==2){
				AWD.getTab().find("#edit").linkbutton('enable');
				AWD.getTab().find("#del").linkbutton('enable');
		  }else{
				AWD.getTab().find("#edit").linkbutton('disable');
				AWD.getTab().find("#del").linkbutton('disable');
		  }
		  
		  //取消
		  if(iState!=0){
			  AWD.getTab().find("#cancel").linkbutton('enable');
		  }else{
			  AWD.getTab().find("#cancel").linkbutton('disable');
		  }
	},
	"add": function(){
		this.setButton(1);
		AWD.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"del": function(){
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["sqlid"] = "YDCX.selectYDCX";
		queryField["billno"] = AWD.getTab().find("#billno").textbox('getValue');
		queryField["DataBaseType"] = "tms";
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData2 = ui.ajax(ajaxJson).data;
		if(ui.isNull(resultData2)){
			ui.alert("找不到此运单！");
			return false;
		}
		if(resultData2[0].state!=3){
			ui.alert("此运单当前状态不允许删除！");
			return false;
		}
		if(resultData2[0].lrr != userInfo.CFRY01){
			ui.alert("只允许删除本人录的运单！");
			return false;
		}
		var ajaxJson = {};
		ajaxJson["src"] = "/cfydcx/delYD.do";
		ajaxJson["data"] = {
			"XmlData" : JSON.stringify($.extend(
											   {"czr":userInfo.CFRY01},
											   {"czwd":userInfo.WD01},
											   {"billno":AWD.getTab().find("#billno").textbox('getValue')}
					))
		};
		var resultData = ui.ajax(ajaxJson);
		if (!ui.isNull(resultData)) {
			var Json1= AWD.getTab().find('#queryYD').datagrid('getRows');	
		    $.each(Json1,function(i,val){
		    	if(val.billno == AWD.getTab().find("#billno").textbox('getValue')){
		    		$('#queryYD').datagrid('deleteRow',i);
		    	}
		    });
		}else{
			ui.alert("操作失败");
		}
		this.setButton(1);
		AWD.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"save": function(){
		if(userInfo.WD01 == '9000'){
			ui.alert("总部不允许录单");
			return false;
		}
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["sqlid"] = "YDCX.selectFHSJ";
		queryField["postdate"] = AWD.getTab().find("#postdate").datebox('getValue');
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		if (resultData[0].fhrq==1) {
			ui.alert("托运日期必须在15天之内!");
			return false;
		}
		if(!ui.isNull(AWD.getTab().find("#billno").textbox('getValue'))){
			var XmlData = [];
			var queryField={};
			queryField["dataType"] = "Json";
			queryField["sqlid"] = "CFAWD.checkYD";
			queryField["billno"] = AWD.getTab().find("#billno").textbox('getValue');
			XmlData.push(queryField);
			var ajaxJson = {};
			ajaxJson["src"] = "jlquery/select.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
			var resultData = ui.ajax(ajaxJson).data;
			if(!ui.isNull(resultData)){
				ui.alert("运单已存在");
				return false;
			}
		}
		
		AWD.getTab().find('#memo').textbox("textbox").focus();	
		if(!AWD.getTab().find("#AWD").form('validate')){
			return false;
		}
		if((parseFloat(AWD.getTab().find("#boxes").textbox("getValue"))+parseFloat(AWD.getTab().find("#duals").textbox("getValue"))+parseFloat(AWD.getTab().find("#package").textbox("getValue")))==0){
			ui.alert("箱包双不能全为零")
			return false;
		}
		
		var XmlData = AWD.getTab().find("#AWD").formToJson();
		XmlData[0]["czy"] = userInfo.CFRY01;
		XmlData[0]["lrr"] = userInfo.CFRY01;
		XmlData[0]["lrrq"] = ui.formatDate(0, 2);
		XmlData[0]["state"] = 3;
		XmlData[0]["stateflag"] = 1;
		XmlData[0]["cus_name"] = AWD.getTab().find("#cus_code").combobox('getText');
		
		XmlData[0]["postnet_cn"] = AWD.getTab().find("#postnet").combobox('getText');
		XmlData[0]["postzone_cn"] = AWD.getTab().find("#postzone").combobox('getText');
		XmlData[0]["acceptnet_cn"] = AWD.getTab().find("#acceptnet").combobox('getText');
		XmlData[0]["acceptzone_cn"] = AWD.getTab().find("#acceptzone").combobox('getText');
		
		XmlData[0]["cus_name"] = AWD.getTab().find("#cus_code").combobox('getText');
		if(AWD.getTab().find("#flag").combobox('getValue')=='1'){
			if(ui.isNull(AWD.getTab().find("#postdw").combobox('getText'))){
				XmlData[0]["postdw"] = AWD.getTab().find('#fhdw').text();
			}
			if(ui.isNull(AWD.getTab().find("#postaddr").combobox('getText'))){
				XmlData[0]["postaddr"] = AWD.getTab().find('#fhdz').text();
			}
			if(ui.isNull(AWD.getTab().find("#posttel").combobox('getText'))){
				XmlData[0]["posttel"] = AWD.getTab().find('#fhdh').text();
			}
		}		
		XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
		var ajaxJson = {};
		ajaxJson["src"] = "cfawd/insertBill.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		if(resultData.status==1){
			this.addAWDGrid(XmlData[0]);
		}
	},
	"edit": function(){
		if(!AWD.getTab().find("#AWD").form('validate')){
			return false;
		}
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["sqlid"] = "YDCX.selectYDCX";
		queryField["billno"] = AWD.getTab().find("#billno").textbox('getValue');
		queryField["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData2 = ui.ajax(ajaxJson).data;
		if(ui.isNull(resultData2)){
			ui.alert("找不到此运单！");
			return false;
		}
		if(resultData2[0].state!=3){
			ui.alert("此运单当前状态不允许修改！");
			return false;
		}
		if(resultData2[0].lrr != userInfo.CFRY01){
			ui.alert("只允许修改本人录的运单！");
			return false;
		}
		if(resultData2[0].shbj ==1){
			ui.alert("此运单已经审核,无法修改！");
			return false;
		}
		if((parseFloat(AWD.getTab().find("#boxes").textbox("getValue"))+parseFloat(AWD.getTab().find("#duals").textbox("getValue"))+parseFloat(AWD.getTab().find("#package").textbox("getValue")))==0){
			ui.alert("箱包双不能全为零")
			return false;
		}
		AWD.getTab().find("#edit").linkbutton('disable');
		var XmlData = AWD.getTab().find("#AWD").formToJson();
		XmlData[0]["czy"] = userInfo.CFRY01;
		XmlData[0]["xgr"] = userInfo.CFRY01;
		XmlData[0]["xgrq"] = ui.formatDate(0, 2);
		XmlData[0]["state"] = 14;
		XmlData[0]["stateflag"] = 2;
		XmlData[0]["nownet"] = ui.isNull(userInfo.WD01)?"":userInfo.WD01;
		if(AWD.getTab().find("#flag").combobox('getValue')=='1'){
			if(ui.isNull(AWD.getTab().find("#postdw").combobox('getText'))){
				XmlData[0]["postdw"] = AWD.getTab().find('#fhdw').text();
			}
			if(ui.isNull(AWD.getTab().find("#postaddr").combobox('getText'))){
				XmlData[0]["postaddr"] = AWD.getTab().find('#fhdz').text();
			}
			if(ui.isNull(AWD.getTab().find("#posttel").combobox('getText'))){
				XmlData[0]["posttel"] = AWD.getTab().find('#fhdh').text();
			}
		}
		var ajaxJson = {};
		ajaxJson["src"] = "cfawd/updateBill.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultData = ui.ajax(ajaxJson).data;
		if(resultData.status==1){
			this.updateAWDGrid(XmlData[0]);
			ui.alert("操作成功")
		}else{
			ui.alert("操作失败");
		}
		this.setButton(1);
		AWD.getTab().find("#billno").textbox("readonly",false);
		this.definefieldData();
	},
	"print": function(){
		AWD.getTab().find("#print").linkbutton('disable');
		sessionStorage["PRINT_URL"] = "/reportAWD/print.do";
		sessionStorage["PRINT_DATAS"] = "{\"DJBH\":\"'"+AWD.getTab().find("#billno").textbox('getValue')+"'\"}";
		window.open("/print.html?dybh=1&rid="+Math.random());
		AWD.getTab().find("#print").linkbutton('enable');
	},
	"addAWDGrid": function(row){
		this.definefieldData();
		AWD.getTab().find('#queryYD').datagrid('appendRow',row);
		//单号获取焦点
		AWD.getTab().find("#billno").textbox("textbox").focus();
	},
	"updateAWDGrid": function(row){
		var rowIndex =AWD.getTab().find('#queryYD').datagrid('getRowIndex',AWD.getTab().find('#queryYD').datagrid('getSelected'));
		AWD.getTab().find('#queryYD').datagrid('updateRow',{
			index: rowIndex,
			row: row
		})
	},
	"getJSWD": function(){
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["sqlid"] = "CFKH.selectJSWD";
		queryField["DataBaseType"] = "tms";
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	
		var resultData = ui.ajax(ajaxJson).data;
		resultData = AWD.callback(resultData);
		return resultData;
	},
	"callback": function (resultData,treeData){
		this.callback1 = function(resultData,tree){
			$.each(resultData,function(j,tem){
				var bm_tree1 = {};
				if(tree.id==tem.s_code){
					bm_tree1["id"] = tem.net_code;
					bm_tree1["text"] = tem.net_name;
					bm_tree1["s_id"] = tem.s_code;
					bm_tree1["children"] = [];
					tree["children"].push(bm_tree1);
					obj.callback1(resultData,bm_tree1);
				}
			})
			}
		var obj = this;
		if(ui.isNull(treeData)){//根节点
			tree = [];
			treeData = [];
			$.each(resultData,function(i,val){
				var temp={};
				if(ui.isNull(val.s_code)){
					temp["id"] = val.net_code;
					temp["text"] = val.net_name;
					temp["s_id"] = val.s_code;
					temp["state"] = "closed";
					temp["children"] = [];
					treeData.push(temp);
				}
			})			
		}
		$.each(treeData,function(i,val){
			obj.callback1(resultData,val);
		});		
		return treeData;
	},
	"calcNumberText": function(inputs,func){
		$.each(inputs,function(i,key){
			AWD.getTab().find("#"+key).numberbox({"onChange":func});
		});
	},
	"definefieldData": function(){
		var flag = AWD.getTab().find("#flag").combobox("getValue");
		var postdate = AWD.getTab().find("#postdate").datebox("getValue");
		//清空表单数据
		AWD.getTab().find("#AWD").form('clear');
		//获取始发网点
		AWD.getTab().find('#postnet').textbox("setValue",ui.isNull(userInfo.WD01)?"":userInfo.WD01);
		AWD.getTab().find('#postnet').textbox("setText",ui.isNull(userInfo.WD02)?"":userInfo.WD02);
		AWD.getTab().find("#postzone").combobox("setValue",ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01);
		AWD.getTab().find("#postzone").combobox("setText",ui.isNull(userInfo.DQXX02)?"":userInfo.DQXX02);
		//托运日期默认当天		
		AWD.getTab().find("#boxes").textbox("setValue",'');
		AWD.getTab().find("#duals").textbox("setValue",0);
		AWD.getTab().find("#package").textbox("setValue",0);
		AWD.getTab().find("#flag").combobox("setValue",flag);
		AWD.getTab().find("#volume").textbox("setValue",0);
		AWD.getTab().find("#postdate").datebox("setValue",postdate);
	},
	"focusCallBack": function(newObj,index,newId){//焦点回调
		if((ui.isNull(AWD.getTab().find("#"+newId).data())?AWD.getTab().find("#"+newId).attr("readonly"):AWD.getTab().find("#"+newId).textbox("textbox").attr("readonly"))
				=="readonly"||
				(ui.isNull(AWD.getTab().find("#"+newId).data())?AWD.getTab().find("#"+newId).attr("disabled"):AWD.getTab().find("#"+newId).textbox("textbox").attr("disabled"))=="disabled"){
			index++;
			if(ui.isNull(newObj[index])){
				index=0;
			}
			//焦点回调
			return this.focusCallBack(newObj,index,newObj[index].id);
		}else{
			return newId;
		}
	},
	"comboxonblur": function(data){
		$.each(data,function(i,val){
			AWD.getTab().find("#"+val+"").combobox("textbox").blur(function(){
				var reg=/^[A-Za-z0-9]+$/;
				if(AWD.getTab().find("#"+val+"").combobox("getText").length!=0&&AWD.getTab().find("#"+val+"").combobox("panel").find("div:contains("+AWD.getTab().find("#"+val+"").combobox("getText")+")").length==0){
					AWD.getTab().find("#"+val+"").combobox("reset");
				}
				else{
					var e = jQuery.Event("keyup");//模拟一个键盘事件 
					e.keyCode = 13;//keyCode=13是回车
					AWD.getTab().find("#"+val+"").combobox("textbox").trigger(e);//模拟按下回车
				}
			});
		});
	}
});

//加载事件
AWD.setEvents(function(){
	
});

//加载完成
AWD.setAfterInit(function() {  
	//默认用户登录的时间
	var reqFiled=[{"id":"billno","nextFocus":"cus_code"},
 	              {"id":"cus_code","nextFocus":"postzone"},
 	              {"id":"postzone","nextFocus":"postman"},
 	              {"id":"postman","nextFocus":"posttel"},
 	              {"id":"posttel","nextFocus":"postdw"},
	              {"id":"postdw","nextFocus":"postaddr"},
	              {"id":"postaddr","nextFocus":"acceptzone"},
 	              {"id":"acceptzone","nextFocus":"acceptnet","editable":false},
 	              {"id":"acceptnet","nextFocus":"acceptman"},
 	              {"id":"acceptman","nextFocus":"accepttel"},
 	              {"id":"accepttel","nextFocus":"acceptdw"},
 	              {"id":"acceptdw","nextFocus":"acceptaddr"},
 	              {"id":"acceptaddr","nextFocus":"boxes"},
 	              {"id":"boxes","nextFocus":"duals"},    
 	              {"id":"duals","nextFocus":"volume"}, 
 	              {"id":"volume","nextFocus":"package"}, 
 	              {"id":"package","nextFocus":"fkfs"}, 
 	              {"id":"fkfs","nextFocus":"postfee"},
 	              {"id":"postfee","nextFocus":"billno"}
 	              ];
	//单号获取焦点
	AWD.getTab().find('#billno').textbox("textbox").focus();
	//托运日期默认当天
	AWD.getTab().find('#postdate').datebox('setValue', ui.formatDate(0,1));
	//创建遮罩层
	AWD.setData({"mask":new ui.mask(AWD.getTab().find("#detailsDiv"))});
	this.setButton(1);
	AWD.getTab().find("#save").linkbutton('enable');
	//选中grid回填表单
	AWD.getTab().find('#queryYD').datagrid({
		onClickRow: function(index, row){
			AWD.setButton(2);
			debugger;
			//清空表单数据
			AWD.getTab().find("#AWD").form('clear');
			AWD.getTab().find("#billno").textbox("readonly",true);
			AWD.getTab().find("#AWD").form('load',row);
			if(row.cus_code=="999999"){
		    	 AWD.getTab().find("#postdw").textbox("enableValidation");
		    	 AWD.getTab().find("#postaddr").textbox("enableValidation");
		    	 AWD.getTab().find("#acceptman").textbox("enableValidation");
		    	 AWD.getTab().find("#accepttel").textbox("enableValidation");
		 		// return false;
		 	}else{
		 		AWD.getTab().find("#postdw").textbox("disableValidation");
			     AWD.getTab().find("#postaddr").textbox("disableValidation");
			     AWD.getTab().find("#acceptman").textbox("disableValidation");
		    	 AWD.getTab().find("#accepttel").textbox("disableValidation");
		 	}
			if(row.fkkfs!="3"){
		    	 AWD.getTab().find("#postfee").textbox("enableValidation");
		 		// return false;
		 	}else{
		 		AWD.getTab().find("#postfee").textbox("disableValidation");
		 	}
		 	zone = row.postzone;
		 	AWD.getTab().find("#postzone").combobox('reload');
		 	zone = row.acceptzone;
		 	AWD.getTab().find("#acceptzone").combobox('reload');      
		}
	});
		
	//始发地and到达地
	AWD.getTab().find(".dqxx").combobox({
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
	    	 if($(this).attr("id")=="acceptzone"){//到达地
	    		    var XmlData = [];
	    			var queryField={};
	    			queryField["dataType"] = "Json";
	    			queryField["sqlid"] = "YDCX.selectKHWD";
	    			queryField["cus_code"] = AWD.getTab().find("#cus_code").textbox('getValue');
	    			queryField["dqxx_code"] = val.code;
	    			queryField["net_code"] = val.net_code;
	    			XmlData.push(queryField);
	    			var ajaxJson = {};
	    			ajaxJson["src"] = "jlquery/select.do";
	    			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	    			var resultData = ui.ajax(ajaxJson).data;
	    			if(ui.isNull(resultData)){
	    				AWD.getTab().find("#acceptnet").combobox("setValue",val.net_code);//到达网点
	    			}else{
	    				AWD.getTab().find("#acceptnet").combobox("setValue",resultData[0].net_code);//到达网点
	    			}
	    		    
	    	 }
	     }
	})
	
	// 获取客户信息
	AWD.getTab().find("#cus_code").combobox({
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
	    	 AWD.getTab().find("#cus_code").val(record.cus_code);//客户代码
		     AWD.getTab().find("#skgs_cn").textbox("setValue",record.skgs_cn);//收款公司名称
		     AWD.getTab().find("#fkfs").combobox("setValue",record.fkfs);//付款方式
		     AWD.getTab().find("#jswd").combobox("setValue",record.jswd);//结算网点
		     AWD.getTab().find("#bjfl").textbox("setValue",record.bjfl);//保价费率%
		     AWD.getTab().find("#jjfs").combobox("setValue",record.jjfs);//计价方式
		     AWD.getTab().find("#bjfl").textbox("setValue",record.bjfl);//保价费率
		     AWD.getTab().find("#bjje").val(record.bjje);//报价单价
		     AWD.getTab().find("#hwlb").combobox("setValue",record.hwlb);//货物类别
		     if(ui.isNull(record.gg)){
		    	 AWD.getTab().find("#gg").combobox("setValue",1);
		     }else{
		    	 AWD.getTab().find("#gg").combobox("setValue",record.gg);//规格
		     }
		     if(!ui.isNull(record.cus_name)){
		    	 AWD.getTab().find('#fhdw').text(record.cus_name);
		     }
		     if(!ui.isNull(record.addr)){
		    	 AWD.getTab().find('#fhdz').text(record.addr);
		     }
		     if(!ui.isNull(record.tel)){
		    	 AWD.getTab().find('#fhdh').text(record.tel);
		     }
		     var boxes=AWD.getTab().find("#boxes").numberbox('getValue');
		     if(!ui.isNull(boxes)){
		    	 AWD.getTab().find("#volume").numberbox('setValue',boxes*record.vol);
		     }
		     if(record.cus_code=="999999"){
		    	 AWD.getTab().find("#postdw").textbox("enableValidation");
		    	 AWD.getTab().find("#postaddr").textbox("enableValidation");
		    	 AWD.getTab().find("#acceptman").textbox("enableValidation");
		    	 AWD.getTab().find("#accepttel").textbox("enableValidation");
		 	}else{
		 		AWD.getTab().find("#postdw").textbox("disableValidation");
			     AWD.getTab().find("#postaddr").textbox("disableValidation");
			     AWD.getTab().find("#acceptman").textbox("disableValidation");
		    	 AWD.getTab().find("#accepttel").textbox("disableValidation");
		 	}
		     
		    var XmlData = [];
 			var queryField={};
 			queryField["dataType"] = "Json";
 			queryField["sqlid"] = "YDCX.selectKHWD";
 			queryField["cus_code"] = record.cus_code;
 			queryField["dqxx_code"] = AWD.getTab().find("#acceptzone").textbox('getValue');
 			XmlData.push(queryField);
 			var ajaxJson = {};
 			ajaxJson["src"] = "jlquery/select.do";
 			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
 			var resultData = ui.ajax(ajaxJson).data;
 			if(!ui.isNull(resultData)){
				AWD.getTab().find("#acceptnet").combobox("setValue",resultData[0].net_code);//到达网点
			}
	     }
	});
	
	//获取始发网点
	AWD.getTab().find('#postnet').textbox("setValue",ui.isNull(userInfo.WD01)?"":userInfo.WD01);
	AWD.getTab().find('#postnet').textbox("setText",ui.isNull(userInfo.WD02)?"":userInfo.WD02);
	AWD.getTab().find("#postzone").combobox("setValue",ui.isNull(userInfo.DQXX01)?"":userInfo.DQXX01);
	AWD.getTab().find("#postzone").combobox("setText",ui.isNull(userInfo.DQXX02)?"":userInfo.DQXX02);
		
	//获取到达网点
	AWD.getTab().find('#acceptnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	})
	
	//获取结算网点
	AWD.getTab().find('#jswd').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectJSWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	})
	
	//获取付款方式
	AWD.getTab().find('#fkfs').combobox({
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
		 		if(AWD.getTab().find("#cus_code").textbox("getValue")=="999999"){
		 			ui.alert("该客户月结方式不可选");
		 			AWD.getTab().find('#fkfs').combobox("reset");
		 			return false;
		 		}
		 		//申明价值
		 		AWD.getTab().find("#smjz").numberbox("disable");
		 		//报价费率
		 		AWD.getTab().find("#bjfl").numberbox("disable");
		 		//运费
		 		AWD.getTab().find("#postfee").numberbox("disable");
		 		//上楼费
		 		AWD.getTab().find("#slfee").numberbox("disable");
		 		//提货费
		 		AWD.getTab().find("#thfee").numberbox("disable");
		 		//仓储费
		 		AWD.getTab().find("#ccfee").numberbox("disable");
		 		//送货费
		 		AWD.getTab().find("#shfee").numberbox("disable");
		 		//送货费
		 		AWD.getTab().find("#shfee").numberbox("disable");
		 		
		 		AWD.getTab().find("#postfee").numberbox("disableValidation");
		 		
		 	}else{
		 		//申明价值
		 		AWD.getTab().find("#smjz").numberbox("enable");
		 		//报价费率
		 		AWD.getTab().find("#bjfl").numberbox("enable");
		 		//运费
		 		AWD.getTab().find("#postfee").numberbox("enable");
		 		//上楼费
		 		AWD.getTab().find("#slfee").numberbox("enable");
		 		//提货费
		 		AWD.getTab().find("#thfee").numberbox("enable");
		 		//仓储费
		 		AWD.getTab().find("#ccfee").numberbox("enable");
		 		//送货费
		 		AWD.getTab().find("#shfee").numberbox("enable");
		 		//送货费
		 		AWD.getTab().find("#shfee").numberbox("enable");

		 		AWD.getTab().find("#postfee").numberbox("enableValidation");
		 	}
		 }
	})
	
	//获取货物类别
	AWD.getTab().find('#hwlb').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectHWLB\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	})
	//获取到达网点
	AWD.getTab().find('#postnet').combobox({
		 valueField: 'code',   
	     textField: 'name',
	     method: 'POST',
	     queryParams: {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFAWD.selectDDWD\"}]"},
	     url: 'jlquery/select.do',
	     loadFilter: function(data){
	    	 return data.data;
	     }
	});
	
	AWD.getTab().find("#jjfs").combobox({  
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
	
	AWD.getTab().find("#gg").combobox({  
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
	
	AWD.getTab().find("#boxes").textbox({
		"onChange":function(newValue, oldValue){
			var cus_code=AWD.getTab().find("#cus_code").combobox("getValue");
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
					AWD.getTab().find("#volume").numberbox("setValue",newValue*resultData[0].vol);
				}
			}
		}
	});
	
	//是否报价-- 报价计算保价费
	AWD.getTab().find("#bj_flag").bind("change",function(){
		if(AWD.getTab().find("#bj_flag:checked").length==1){
			AWD.getTab().find("#bjfee").textbox("setValue",parseFloat(ui.isNull(AWD.getTab().find("#smjz").textbox("getValue"))?0:AWD.getTab().find("#smjz").textbox("getValue"))*parseFloat(ui.isNull(AWD.getTab().find("#bjfl").numberbox("getValue"))?0:AWD.getTab().find("#bjfl").numberbox("getValue"))+parseFloat(ui.isNull(AWD.getTab().find("#bjje").val())?0:AWD.getTab().find("#bjje").val())*parseFloat(ui.isNull(AWD.getTab().find("#boxes").numberbox("getValue"))?0:AWD.getTab().find("#boxes").numberbox("getValue")));//保价费
			//保价费
			AWD.calcNumberText(["smjz","bjfl","boxes"],function(){
				AWD.getTab().find("#bjfee").textbox("setValue",parseFloat(ui.isNull(AWD.getTab().find("#smjz").textbox("getValue"))?0:AWD.getTab().find("#smjz").textbox("getValue"))*parseFloat(ui.isNull(AWD.getTab().find("#bjfl").numberbox("getValue"))?0:AWD.getTab().find("#bjfl").numberbox("getValue"))+parseFloat(ui.isNull(AWD.getTab().find("#bjje").val())?0:AWD.getTab().find("#bjje").val())*parseFloat(ui.isNull(AWD.getTab().find("#boxes").numberbox("getValue"))?0:AWD.getTab().find("#boxes").numberbox("getValue")));//保价费
			});
		};
	});
	

	
	//合计
	this.calcNumberText(["postfee","slfee","thfee","ccfee","shfee"],function(){
		var totalprice = parseFloat(ui.isNull(AWD.getTab().find("#bjfee").numberbox("getValue"))?0:AWD.getTab().find("#bjfee").numberbox("getValue"))+parseFloat(ui.isNull(AWD.getTab().find("#slfee").numberbox("getValue"))?0:AWD.getTab().find("#slfee").numberbox("getValue"))+parseFloat(ui.isNull(AWD.getTab().find("#postfee").numberbox("getValue"))?0:AWD.getTab().find("#postfee").numberbox("getValue"))+
							parseFloat(ui.isNull(AWD.getTab().find("#thfee").numberbox("getValue"))?0:AWD.getTab().find("#thfee").numberbox("getValue"))+parseFloat(ui.isNull(AWD.getTab().find("#ccfee").numberbox("getValue"))?0:AWD.getTab().find("#ccfee").numberbox("getValue"))+parseFloat(ui.isNull(AWD.getTab().find("#shfee").numberbox("getValue"))?0:AWD.getTab().find("#shfee").numberbox("getValue"));
		AWD.getTab().find("#totalprice").textbox("setValue",totalprice);
	});
	
	//必填项焦点顺序
	$.each(reqFiled,function(i,text){
		var a=i+1;
		var obj = reqFiled[a]==undefined?reqFiled[0]:reqFiled[a];
		(ui.isNull(AWD.getTab().find("#"+text.id).data())?AWD.getTab().find("#"+text.id):AWD.getTab().find("#"+text.id).siblings().find("input[type='text']")).bind("keyup", function(e) {
			if(e.keyCode==13){
				if(ui.isNull(reqFiled[a])){
					a=0;
				}
				var id = AWD.focusCallBack(reqFiled,(i+1),text.nextFocus);
				(ui.isNull(AWD.getTab().find("#"+id).data())?AWD.getTab().find("#"+id):AWD.getTab().find("#"+id).siblings().find("input[type='text']")).focus();
			}
		})
	});
	AWD.getTab().find('#postnet').combobox('readonly');
	AWD.getTab().find('#jswd').combobox('readonly');
	
	//下拉框失去焦点操作
	var comboxblurs=["cus_code","postzone","acceptzone","acceptnet","hwlb","jjfs","fkfs"];
	AWD.comboxonblur(comboxblurs);
})