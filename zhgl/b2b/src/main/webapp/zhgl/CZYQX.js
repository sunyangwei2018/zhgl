var CZYQX = ui.Form();

CZYQX.setPlugin({
	/*"RYXX" : {
		"page" : "定义操作员权限",
		"uiid" : "easyuiGrid",
		"sqlid" : "Pub.selectRYXX",
		"columnName" : "Base",//列头后缀xx.js
		//"singleSelect":false,
		"pagination" : true//,//分页
		//"buttons" : ["Append","Remove"]//grid按钮
	},*/
	"MENU" : {
		"uiid" : "easyuiGridTree",
		"sqlid" : "Pub.selectTreeMenu",
		"columnName" : "Base",//列头后缀xx.js
		"singleSelect":false,
		//"checkOnSelect": false,
		//"selectOnCheck": false,
		"idField": 'code',
		"treeField": 'name'
	}
})

//定义方法
CZYQX.define({
	"query" : function(){
		var formJson =CZYQX.getTab().find(".easyui-tabs").find("input").formToJson();
		//alert(JSON.stringify(formJson));
		var RYXX = CZYQX.getPlugin()["RYXX"];
		//alert(JSON.stringify(RYXX));
		RYXX["param"] = {"person_id":CZYQX.getTab().find("[id='person_id']").textbox('getText').trim(),"person_name":CZYQX.getTab().find("[id='person_name']").textbox('getText').trim()};
		
		CZYQX.reloadPlugin("RYXX",RYXX);
	},
	"changeDiv" : function(index){
		CZYQX.getTab().find('#content-tabs').tabs('select',index);
	},
	"add" : function(){
		this.changeDiv(1);
	},
	"menuForm" : function(){
			//菜单
			if(ui.isNull(CZYQX.getTab().find("#USERID").textbox("getText").trim())){
				ui.alert("请填选人员");
				return true;
			}
			var alqx = {"新增":"add","修改":"edit","取消":"cancel","保存":"save","删除":"del","审核":"check","复审":"check2","查询":"query","打印":"print","导入":"import","初审":"check1",
					"财务审核":"check3","付款":"payment","导出":"export","开票申请":"ticket","生成结算单":"jsd","开票":"ticketkp","收款":"receipt","交款":"payable","确认":"ok"}
			var nodes = CZYQX.getTab().find('#d_MENU').treegrid('getChecked');
			var menu = [];
			
			$.each(nodes,function(i,val){
				var map ={};
				var map1 ={};
				map["alqx"]  = [];
				map["code"] = val.code;
				if(!ui.isNull(val.alqx)){
					$.each(val.alqx.split(","),function(j,value){
						if(!ui.isNull(value)){
							map["alqx"].push(alqx[value]);
						}
					})
				}
				menu.push(map);
			})
			var XmlData=[{"CFRY01":CZYQX.getTab().find('#CFRY01').combogrid('getValue'),"CD":JSON.stringify(menu)}];
			var ajaxJson = {};
			ajaxJson["src"] = "UserInfo/insertCZYQX.do";
			ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
			var resultdata = ui.ajax(ajaxJson).data;
			if(resultdata.status==1){
				ui.alert("操作成功");
			}
		
	},"callback" : function(resultData,treeData){
		this.callback1 = function(resultData,tree){
			$.each(resultData,function(j,tem){
				var bm_tree1 = {};
				if(tree.id==tem.s_code){
					bm_tree1["id"] = tem.code;
					bm_tree1["text"] = tem.name;
					bm_tree1["s_id"] = tem.s_code;
					//bm_tree1["state"] = "closed";
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
					temp["id"] = val.code;
					temp["text"] = val.name;
					temp["s_id"] = val.s_code;
					//temp["state"] = "closed";
					temp["children"] = [];
					//tree.push(temp);
					treeData.push(temp);
				}
			})
			
		}
		$.each(treeData,function(i,val){
			obj.callback1(resultData,val);
		});
		
		console.log(treeData);
		return treeData;
	},
	"wdForm" : function(){
		//网点
		if(ui.isNull(CZYQX.getTab().find("#WDRYXX01").textbox("getText").trim())){
			ui.alert("请填选人员");
			return true;
		}
		var WD =CZYQX.getTab().find('#d_WD').treegrid('getChecked');
		var XmlData=[{"CFRY01":CZYQX.getTab().find('#WDRYXX01').combogrid('getValue'),"WD":JSON.stringify(WD)}];
		var ajaxJson = {};
		ajaxJson["src"] = "UserInfo/insertCZYWD.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultdata = ui.ajax(ajaxJson).data;
		if(resultdata.status==1){
			ui.alert("操作成功");
		}
	},
	"ryqxForm" : function(){
		var ajaxJson = {};
		//var XmlData = CZYQX.getTab().formToJson();
		var XmlData = [{"ry01":CZYQX.getTab().find("#detailsDiv1").find('#ry01').textbox("getValue").trim(),"ry02":CZYQX.getTab().find("#detailsDiv1").find('#ry02').textbox("getValue").trim()}];
		//alert(JSON.stringify(XmlData));
		ajaxJson["src"] = "UserInfo/insertCOPYCZYQX.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		var resultdata = ui.ajax(ajaxJson).data;
		if(resultdata.status==1){
			ui.alert("操作成功");
		}
	},
	"save" : function(){
		CZYQX.getTab().find("#save").linkbutton('disable');
		if(CZYQX.getTab().find('#content-tabs').tabs('getSelected').attr("id")=="detailsDiv"){//网点
			this.wdForm();
		}else if(CZYQX.getTab().find('#content-tabs').tabs('getSelected').attr("id")=="detailsDiv1"){//复制
			if(ui.isNull(CZYQX.getTab().find("#ry01").combobox("getValue").trim())){
				ui.alert("请填选人员A账号");
				return false;
			}else if(ui.isNull(CZYQX.getTab().find("#ry02").combobox("getValue").trim())){
				ui.alert("请填选人员B账号");
				return false;
			}
			this.ryqxForm();
		}else{//菜单
			this.menuForm();
		}
		CZYQX.getTab().find("#save").linkbutton('enable');
	},
	"CFRY01ComGrid" : function(){
		var XmlData = [];
		var ajaxJson = {};
		ajaxJson["dataType"] = "Json";
		ajaxJson["sqlid"]="Pub.selectComGrid";
		XmlData.push(ajaxJson)
		
		CZYQX.getTab().find("#CFRY01").combogrid({
			panelWidth:450,    
			idField:'code',    
		    textField:'name',
		    url:"jlquery/select.do",
		    queryParams: {"json":JSON.stringify(XmlData)},
		    columns:[[    
		              {field:'code',title:'人员代码',width:60},    
		              {field:'name',title:'人员名称',width:100},
		              {field:'bm01',title:'部门代码',width:100},
		              {field:'bm02',title:'部门名称',width:100}
		          ]],
		    loadFilter: function (data) {
		    	var data = data.data;
		    	var rows={};
		    	rows["total"] = data.length;
		    	rows["rows"] = data;
		    	return rows;
		    },
		    onSelect: function(index, row){
		    	CZYQX.getTab().find("#bmtd").html(row.bm02);
		    	//var MENU = CZYQX.getPlugin()["MENU"];
		    	//MENU.param["BM01"] = row.bm01;
		    	//CZYQX.reloadPlugin("MENU",MENU);
		    	var XmlData = [];
		    	var ajaxJson = {};
		    	var queryField ={};
		    	queryField["dataType"] = "Json";
		    	queryField["sqlid"] = "Pub.selectMenuQx";
		    	queryField["CFRY01"] = CZYQX.getTab().find("#CFRY01").combogrid("getValue");
		    	XmlData.push(queryField)
		    	ajaxJson["src"] = "jlquery/select.do";
		    	ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
		    	var resultData = ui.ajax(ajaxJson).data;
		    	var alqx = {"add":"新增","edit":"修改","cancel":"取消","save":"保存","del":"删除","check":"审核","check2":"复审","query":"查询","print":"打印","import":"导入","check1":"初审",
						"check3":"财务审核","payment":"付款","export":"导出","ticket":"开票申请","jsd":"生成结算单","ticketkp":"开票","receipt":"收款","payable":"交款","ok":"确认"}
		    	CZYQX.getTab().find("#d_MENU").treegrid('uncheckAll');
		    	/*var MENU = CZYQX.getPlugin()["MENU"];
		    	CZYQX.reloadPlugin("MENU",MENU);*/

		    	$.each(resultData,function(i,val){
		    		if(ui.isNull(CZYQX.getTab().find("#d_MENU").treegrid('find', val.CD))){
		    			return true;
		    		}
		    		CZYQX.getTab().find("#d_MENU").treegrid('selectRow', val.CD);
		    		var row = CZYQX.getTab().find('#d_MENU').treegrid('getChecked');//BMQX.getTab().find("#d_MENU").treegrid('select', val.cd);//BMQX.getTab().find('#d_MENU').treegrid('getChecked');
		    		var cd="";
		    		var rowtemp = {};
		    		$.each(row,function(w,o){
		    			if(val.CD==o.code){
		    				rowtemp["code"] = o.code; 
		    				rowtemp["alqx"] =[];
		    				return false;
		    			}
		    		})
//		    		
//		    		var alqxobj = JSON.parse(val.alqx);
//		    		$.each(alqxobj,function(j,tem){
//		    			if(!ui.isNull(alqx[tem])){
//		    				rowtemp["alqx"].push(alqx[tem]);
//		    				return false;
//		    			}
//		    			
//		    		})
//		    		
//		    		var id = rowtemp.code;
//		    		CZYQX.getTab().find("#d_MENU").treegrid('beginEdit', id);
//					var ed = CZYQX.getTab().find("#d_MENU").treegrid('getEditor', {"id":id, "field":'alqx'});
//					CZYQX.getTab().find("#d_MENU").treegrid('scrollTo', id);//滚动指定的行
//						if (ed){
//							//($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
//							//alert(JSON.stringify(rowtemp.alqx));
//							$(ed.target).combogrid("setValues",rowtemp.alqx);
//							CZYQX.getTab().find("#d_MENU").treegrid('endEdit', id);
//						}	    		
		    	});
		    }
		});
		
	},
	"ry01ComGrid" : function(){
		var XmlData = [];
		var ajaxJson = {};
		ajaxJson["dataType"] = "Json";
		ajaxJson["sqlid"]="Pub.selectComGrid";
		XmlData.push(ajaxJson)
		
		CZYQX.getTab().find("#ry01").combogrid({
			panelWidth:450,    
			idField:'code',    
		    textField:'name',
		    url:"jlquery/select.do",
		    queryParams: {"json":JSON.stringify(XmlData)},
		    columns:[[    
		              {field:'code',title:'人员代码',width:60},    
		              {field:'name',title:'人员名称',width:100},
		              {field:'bm01',title:'部门代码',width:100},
		              {field:'bm02',title:'部门名称',width:100}
		          ]],
		    loadFilter: function (data) {
		    	var data = data.data;
		    	var rows={};
		    	rows["total"] = data.length;
		    	rows["rows"] = data;
		    	return rows;
		    }
		});
		
	},
	"ry02ComGrid" : function(){
		var XmlData = [];
		var ajaxJson = {};
		ajaxJson["dataType"] = "Json";
		ajaxJson["sqlid"]="Pub.selectComGrid";
		XmlData.push(ajaxJson)
		
		CZYQX.getTab().find("#ry02").combogrid({
			panelWidth:450,    
			idField:'code',    
		    textField:'name',
		    url:"jlquery/select.do",
		    queryParams: {"json":JSON.stringify(XmlData)},
		    columns:[[    
		              {field:'code',title:'人员代码',width:60},    
		              {field:'name',title:'人员名称',width:100},
		              {field:'bm01',title:'部门代码',width:100},
		              {field:'bm02',title:'部门名称',width:100}
		          ]],
		    loadFilter: function (data) {
		    	var data = data.data;
		    	var rows={};
		    	rows["total"] = data.length;
		    	rows["rows"] = data;
		    	return rows;
		    }
		});
		
	}
});


//加载完成
CZYQX.setAfterInit(function() {
	//人员
	CZYQX.CFRY01ComGrid();
	CZYQX.ry01ComGrid();
	CZYQX.ry02ComGrid();
	
})




