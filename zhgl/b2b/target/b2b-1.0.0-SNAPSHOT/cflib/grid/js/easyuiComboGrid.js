var easyuiComboGrid = function(json){
	
	this.config = {
			linkButtons:[],			
			buttons:{},
			columnName:"",
			pagination:"",//分页
			fileName:"",
			listener:{},
			fitColumns:false,//使列自动展开/收缩到合适的DataGrid宽度。
			singleSelect:true,//单选一行
			rownumbers:true,//显示一个行号列
			autoRowHeight:false,//定义设置行的高度，根据该行的内容。设置为false可以提高负载性能。
			pageSize:50,//在设置分页属性的时候初始化页面大小
			remoteSort:false,//true服务端排序 false客户端排序
			loadMsg: "正在努力加载数据，请稍后..."
			 //showHeader: true,//定义是否显示行头
			 //showFooter: false,//定义是否显示行脚
	};
	
	$.extend(this.config, json);
	var cfPlugin = this;
	this.version = 1;
	this.GridArray = {};
	this.Columns = [];
	this.editIndex = undefined;
	this.obj = this.config.obj;
	this.data = [];
	this.head = {};
	this.fields = "";
	this.cmenu;
	this.hidenColumns = {};
	this.initHidFiled = [];
	$(this.obj).empty();
	
	
	this.button = {
			'Append':{
				id: 'Append',
				text: '新增',
				iconCls: 'icon-add',
				handler: function(){
					$(cfPlugin.obj).combogrid('appendRow',{});
					/*var idex = $(cfPlugin.obj).combogrid('getRows').length-1;
					$(cfPlugin.obj).combogrid('selectRow', idex)
							.datagrid('beginEdit', idex);
					var fields = $(cfPlugin.obj).combogrid('getColumnFields',true).concat($(cfPlugin.obj).datagrid('getColumnFields'));
					*/
						 
				}
			},
			'Remove':{
				id: 'Remove',
				text: '删除',
				iconCls: 'icon-remove',
				handler: function(){
					var idex = $(cfPlugin.obj).combogrid('getRowIndex',$(cfPlugin.obj).combogrid('getSelected'));
					if(idex!=-1){
						$(cfPlugin.obj).combogrid('cancelEdit', idex)
						.combogrid('deleteRow', idex);
					}
				}
			}
		};
	
	this.init = function(json){
		var rid = Math.random();
		//$.getScript("/cflib/grid/columns/easyuiColumns"+easyuiComboGrid.columnName+".js?rid="+rid+"", function(jsonData){
		if($("script[src$='easyuiColumns"+this.columnName+".js']").length==0){
			//document.write("<script type='text/javascript' src='/cflib/grid/columns/easyuiColumns"+easyuiComboGrid.columnName+".js?rid="+rid+"'></script>");
			$("script[name='easyuiColumns']").remove();
			var $script = $("<script type='text/javascript' name='easyuiColumns' src='/cflib/grid/columns/easyuiColumns_"+this.config.columnName+".js?rid="+rid+"'></script>");
			$script.insertBefore($("script[src$='easyuiComboGrid.js']"));
		}
		
		var column_header=getColumns();
			$.each(column_header,function(i,val){
				if(val.id==cfPlugin["config"].sqlid.split(".")[1]){
					cfPlugin.Columns[0] = eval(val.columns);
				}
			})
			
		cfPlugin.initGrid();
	}
	
	this.getButton=function(){
		$.each(this.config.buttons,function(i,key){
			cfPlugin.config.linkButtons.push(cfPlugin.button[key]);
		});
	  return this.config.linkButtons;
	}
	
	this.initFild=function(){
		$.each(this.Columns[0],function(i,val){
			//if(ui.isNull(val.show)||val.show=="1"){
				if(ui.isNull(cfPlugin.fields)){
					cfPlugin.fields +=val.field;
				}else{
					cfPlugin.fields +=","+val.field;
				}
			//}
			
		})
		return  this.fields;
	}
	
	this.setFileName=function(filename){
		this.filename = filename;
	}
	
	this.getFileName=function(filename){
		return this.filename;
	}
	
	this.getHead=function(){
		if(!ui.isNull(this.head)){
			return this.head;
		}
		$.each(this.Columns[0],function(i,val){
			if(ui.isNull(val.hidden)||val.hidden==false){
				cfPlugin.head[val.field]=val.title;
			}
		});
		return this.head;
	}
	
	this.getConfginHidFiled = function(){
		$.each(this.Columns[0],function(i,val){
			if(val.hidden==true){
				cfPlugin.initHidFiled.push(val.field);
			}
		});
		return cfPlugin.initHidFiled;
	}
	
	this.setMaxPage=function(max){
		this.maxPage = max;
	}
	
	this.getMaxPage = function(){
		return this.maxPage;
	}
	
	this.changePaging = function(filename){
		var ajaxJson = {};
		//ajaxJson["contentType"] = "application/x-www-form-urlencoded;charset=utf-8";
		//ajaxJson["src"] = /*pubJson["PagingUrl"]+*/"http://127.0.0.1:8061/download_stream.php?filename="+filename+"-LASTPAGE.xml";
		//ajaxJson["data"] = {"fields":this.fields}
		ajaxJson["src"] = "excelHandler/excelExportMaxSize.do";
		ajaxJson["data"] = {"fileName" : filename,"columnName" : JSON.stringify(this.getHead())};
		var  resultData = ui.ajax(ajaxJson);
		var page = ui.isNull(resultData) ? 1 : resultData.data;
		this.setMaxPage(page.lastPage);
		this.setFileName(filename);
		
		ajaxJson["src"] = "excelHandler/excelTotal.do";
		ajaxJson["data"] = {"fileName" : filename};
		var  page1 = ui.ajax(ajaxJson).data;
		this.setTotal(page1.datasize);
	}
	
	this.setTotal = function(total){
		this.total = total;
	}
	
	this.getTotal = function(total){
		return this.total;
	}
	
	this.pagerFilter = function(data){
		//data = ui.isNull(data.data)?[]:data.data;
		if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
			data = {
				total: ui.isNull(cfPlugin.getTotal())?data.length:cfPlugin.getTotal(),//data.length,
				rows: data
			}
		}
		var dg = $(cfPlugin.obj);
		var opts = dg.combogrid('grid').datagrid('options');
		var pager = dg.combogrid('grid').datagrid('getPager');
		pager.pagination({
			beforePageText:"第",
			afterPageText:"页",
			displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
			buttons:[{
				iconCls:'icon-search',
				handler:function(){
					alert('search');
				}
			},{
				iconCls:'icon-add',
				handler:function(){
					if(!ui.isNull(cfPlugin.getFileName())){
						var ajaxJson = {};
						var data = {};
						data["fileName"] = cfPlugin.getFileName();
						data["lastPage"] = cfPlugin.getMaxPage();
						data["columnName"] = JSON.stringify(cfPlugin.getHead());
						ui.download("excelHandler/excelExport.do", data);
					}else{
						ui.alert("请先查询需要导出的结果");
					}
				}
			},{
				iconCls:'icon-edit',
				handler:function(){
					alert('edit');
				}
			}],
			onSelectPage:function(pageNum, pageSize){
				opts.pageNumber = pageNum;
				opts.pageSize = pageSize;
				/*pager.pagination('refresh',{
					pageNumber:pageNum,
					pageSize:pageSize
				});*/
				var ajaxJson = {};
				//ajaxJson["contentType"] = "application/x-www-form-urlencoded;charset=utf-8";
				//ajaxJson["src"] = /*pubJson["PagingUrl"]+*/"http://127.0.0.1:8061/download_stream.php?filename="+filename+"-LASTPAGE.xml";
				//ajaxJson["data"] = {"fields":this.fields}
				ajaxJson["src"] = "excelHandler/excelPage.do";
				ajaxJson["data"] = {"fileName" : cfPlugin.getFileName(),"currentPage" : pageNum};
				var  resultData = ui.ajax(ajaxJson).data;
				data.rows = JSON.parse(resultData.pageData);//[{"id":"9000101","pId":"9000001","name":"助理"},{"id":"9010000","pId":"9000000","name":"人事行政部"},{"id":"9010100","pId":"9010000","name":"办公室"},{"id":"9010200","pId":"9010000","name":"后勤"},{"id":"9010300","pId":"9010000","name":"保安队"},{"id":"9030110","pId":"9030100","name":"硬件维护组"},{"id":"9030120","pId":"9030100","name":"软件咨询组"},{"id":"9030200","pId":"9030000","name":"需求分析部"},{"id":"9030300","pId":"9030000","name":"软件开发部"},{"id":"9040000","pId":"9000000","name":"客户服务部"}];//ui.isNull(resultData.pageData) ? [] : resultData.pageData;
				dg.combogrid('grid').datagrid('loadData',data);
			},
			onBeforeRefresh:function(){ 
		        $(this).pagination('loading'); 
		        $(this).pagination('loaded'); 
	        }
		});
		if (!data.originalRows){
			data.originalRows = (data.rows);
		}
		//var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
		//var end = start + parseInt(opts.pageSize);
		//data.rows = (data.originalRows.slice(start, end));
		return data;
	}
	
	this.createColumnMenu = function(){
		this.cmenu = $('<div/>').appendTo('body');
		this.cmenu.menu({
			onClick: function(item){
				if (item.iconCls == 'icon-ok'){
					$(cfPlugin["obj"]).combogrid('hideColumn', item.name);
					cfPlugin.hidenColumns[item.name] = true;
					cfPlugin.cmenu.menu('setIcon', {
						target: item.target,
						iconCls: 'icon-empty'
					});
				} else {
					$(cfPlugin["obj"]).combogrid('showColumn', item.name);
					cfPlugin.hidenColumns[item.name] = false;
					cfPlugin.cmenu.menu('setIcon', {
						target: item.target,
						iconCls: 'icon-ok'
					});
				}
				localStorage.setItem(cfPlugin.config.page+"."+cfPlugin.config.id,JSON.stringify(cfPlugin.hidenColumns));
			},
			onShow : function(){
				//菜单显示后执行
			}
		});
		var fields = $(this.obj).combogrid('getColumnFields');
		for(var i=0; i<fields.length; i++){
			var field = fields[i];
			var col = $(cfPlugin["obj"]).combogrid('getColumnOption', field);
			if(col.hidden==true){
				cfPlugin.cmenu.menu('appendItem', {
					id : "menu_"+i,
					text: col.title,
					name: field,
					iconCls: 'icon-empty'
				});
				$.each(cfPlugin.initHidFiled,function(j,val){
					if(val==field){
						var itemEl = $("#menu_"+i);  // 获取菜单项 
						cfPlugin.cmenu.menu('disableItem', itemEl)
					}
				})
					
			}else{
				cfPlugin.cmenu.menu('appendItem', {
					id : "menu_"+i,
					text: col.title,
					name: field,
					iconCls: 'icon-ok'
				});
			}
		}
	}
	
	this.endEditing = function(){
		if (cfPlugin.editIndex == undefined){return true}
		if ($(cfPlugin["obj"]).combogrid('validateRow', cfPlugin.editIndex)){
			$(cfPlugin["obj"]).combogrid('endEdit', cfPlugin.editIndex);
			cfPlugin.editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	this.initAttribute = function(){
//		$.extend($.fn.combogrid.methods, {
//			editCell: function(jq,param){
//				return jq.each(function(){
//					var opts = $(this).combogrid('options');
//					var fields = $(this).combogrid('getColumnFields',true).concat($(this).combogrid('getColumnFields'));
//					for(var i=0; i<fields.length; i++){
//						var col = $(this).combogrid('getColumnOption', fields[i]);
//						col.editor1 = col.editor;
//						if (fields[i] != param.field){
//							col.editor = null;
//						}
//					}
//					$(this).combogrid('beginEdit', param.index);
//					for(var i=0; i<fields.length; i++){
//						var col = $(this).combogrid('getColumnOption', fields[i]);
//						col.editor = col.editor1;
//					}
//				});
//			}
//		});
		var datagridJson = {
				 columns:this.Columns,
				 keyHandler:  {
						query: function(q){
							if($.type(cfPlugin.config.listener.query)=="function"){
								cfPlugin.config.listener.query(cfPlugin,q);
							}
						}
				},
				 onLoadSuccess : function(data){//在数据加载成功的时候触发
					 if($.type(cfPlugin.config.listener.onLoadSuccess)=="function"){
							cfPlugin.config.listener.onLoadSuccess(data);
						}
				 },
				 onBeforeLoad : function(param){//在请求数据加载之前触发，返回false可以取消加载动作。
						if($.type(cfPlugin.config.listener.onBeforeLoad)=="function"){
							cfPlugin.config.listener.onBeforeLoad(param);
						}
				},
				 onLoadError : function(){//数据加载失败的时候触发，参数和jQuery的$.ajax()函数的'error'回调函数一样
						if($.type(cfPlugin.config.listener.onLoadError)=="function"){
							cfPlugin.config.listener.onLoadError();
						}
				},
				 onSortColumn : function(sort,order){
					
					 //$(json.obj).datagrid('reload');  
				 },onResizeColumn : function(field, width){
					 if($.type(cfPlugin.config.listener.onResizeColumn)=="function"){
							cfPlugin.config.listener.onResizeColumn(field, width);
						}
				 },onBeforeCheck: function(index, row){//在用户校验一行之前触发，返回false则取消该动作。（该事件自1.4.1版开始可用）
						if($.type(cfPlugin.config.listener.onBeforeCheck)=="function"){//选中行
							cfPlugin.config.listener.onBeforeCheck(index, row);
						}
				 },onCheck: function(index, row){//在用户取消校验一行之前触发，返回false则取消该动作。（该事件自1.4.1版开始可用）
						if($.type(cfPlugin.config.listener.onCheck)=="function"){//选中行
							cfPlugin.config.listener.onCheck(index, row);
						}
				 },onUncheck: function(index, row){//在用户取消勾选一行的时候触发
						if($.type(cfPlugin.config.listener.onUncheck)=="function"){//选中行
							cfPlugin.config.listener.onUncheck(index, row);
						}
				 },onCheckAll: function(rows){//在用户勾选所有行的时候触发。（该事件自1.3版开始可用）
						if($.type(cfPlugin.config.listener.onCheckAll)=="function"){//选中行
							cfPlugin.config.listener.onCheckAll(rows);
						}
				 },onUncheckAll: function(rows){//在用户取消勾选所有行的时候触发。（该事件自1.3版开始可用）
						if($.type(cfPlugin.config.listener.onUncheckAll)=="function"){//选中行
							cfPlugin.config.listener.onUncheckAll(rows);
						}
				 },onBeforeUncheck: function(index, row){
						if($.type(cfPlugin.config.listener.onBeforeUncheck)=="function"){//选中行
							cfPlugin.config.listener.onBeforeUncheck(index, row);
						}
				 },onBeforeSelect : function(index, row){//在用户选择一行之前触发，返回false则取消该动作。（该事件自1.4.1版开始可用）
					 if($.type(cfPlugin.config.listener.onBeforeSelect)=="function"){//单击行
							cfPlugin.config.listener.onBeforeSelect(index, row);
						}
				 },onBeforeUnselect : function(index, row){//在用户取消选择一行之前触发，返回false则取消该动作。（该事件自1.4.1版开始可用）
					 if($.type(cfPlugin.config.listener.onBeforeUnselect)=="function"){//单击行
							cfPlugin.config.listener.onBeforeUnselect(index, row);
						}
				 },onSelect : function(index, row){//在用户选择一行的时候触发
					 if($.type(cfPlugin.config.listener.onSelect)=="function"){//单击行
							cfPlugin.config.listener.onSelect(index, row);
						}
				 },onUnselect : function(index, row){
					 if($.type(cfPlugin.config.listener.onUnselect)=="function"){//在用户取消选择一行的时候触发
							cfPlugin.config.listener.onUnselect(index, row);
						}
				 },onSelectAll : function(rows){//在用户选择所有行的时候触发。
					 if($.type(cfPlugin.config.listener.onSelectAll)=="function"){//在用户取消选择一行的时候触发
							cfPlugin.config.listener.onSelectAll(rows);
						}
				 },onUnselectAll : function(){
					 if($.type(cfPlugin.config.listener.onUnselectAll)=="function"){//在用户取消选择一行的时候触发
							cfPlugin.config.listener.onUnselectAll(rows);
						}
				 },onClickRow : function(index, row){
					// setTimeout(function () {
					 if($.type(cfPlugin.config.listener.onClickRow)=="function"){//单击行
							cfPlugin.config.listener.onClickRow(index, row);
						}
					 //},1000);
				 },onDblClickRow : function(index, row){//双击行
					 if($.type(cfPlugin.config.listener.onDblClickRow)=="function"){
							cfPlugin.config.listener.onDblClickRow(index, row);
						}
				 },onClickCell: function(index, field, value){// 在用户点击一个单元格的时候触发。 
					 var col = $(this).datagrid('getColumnOption', field);
					 if(ui.isNull(col.editor)){
						 return false;
					 }
					 if($.type(cfPlugin.config.listener.onClickCell)=="function"){
							cfPlugin.config.listener.onClickCell(index, field, value);
							return false;
					 }
					 if (cfPlugin.endEditing()){
						 $(cfPlugin["obj"]).datagrid('selectRow', index)
									.datagrid('editCell', {index:index,field:field});
						 
						 var ed = $(this).datagrid('getEditor', {index:index,field:field});
						 if(ed){
							 var input = ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target))
							 $(input).focus();
							 $(input).bind("dblclick",function(){//双击编辑完成
								 $(cfPlugin["obj"]).treegrid('endEdit', index);
							 });
							 $(input).bind("keyup",function(event){
								 if(event.which==13){//回车编辑完成
									 $(cfPlugin["obj"]).treegrid('endEdit', index);
								 }
							 }); 
						 }
						 cfPlugin.editIndex = index;
						}
					},onDblClickCell : function(index, field, value){//双击单元格
						if($.type(cfPlugin.config.listener.onDblClickCell)=="function"){
							cfPlugin.config.listener.onDblClickCell(index, field, value);
						}
					},onContextMenu : function(e, row){
						if($.type(cfPlugin.config.listener.onContextMenu)=="function"){//在右键点击节点的时候触发。
							cfPlugin.config.listener.onContextMenu(e, row);
						}
					},onBeforeEdit : function(index, row){
						if($.type(cfPlugin.config.listener.onBeforeEdit)=="function"){//在用户开始编辑一行的时候触发
							cfPlugin.config.listener.onBeforeEdit(index, row);
						}
					},onBeginEdit : function(index, row){
						if($.type(cfPlugin.config.listener.onBeginEdit)=="function"){//在一行进入编辑模式的时候触发。（该事件自1.3.6版开始可用）
							cfPlugin.config.listener.onBeginEdit(index, row);
						}
					},onEndEdit : function(index, row, changes){
						if($.type(cfPlugin.config.listener.onEndEdit)=="function"){//在完成编辑但编辑器还没有销毁之前触发。（该事件自1.3.6版开始可用）
							cfPlugin.config.listener.onEndEdit(index, row, changes);
						}
					},onAfterEdit : function(index, row, changes){
						if($.type(cfPlugin.config.listener.onAfterEdit)=="function"){//在用户完成编辑一行的时候触发
							cfPlugin.config.listener.onAfterEdit(index, row, changes);
						}
					},onCancelEdit : function(index,row){
						if($.type(cfPlugin.config.listener.onCancelEdit)=="function"){//在用户取消编辑一行的时候触发
							cfPlugin.config.listener.onCancelEdit(index,row);
						}
					},onHeaderContextMenu: function(e, field){//在鼠标右击DataGrid表格头的时候触发。
						e.preventDefault();
						if (!cfPlugin.cmenu){
							cfPlugin.createColumnMenu();
						}
						cfPlugin.cmenu.menu('show', {
							left:e.pageX,
							top:e.pageY
						});
					},onRowContextMenu: function(e, index, row){
						if($.type(cfPlugin.config.listener.onRowContextMenu)=="function"){//在鼠标右击一行记录的时候触发。
							cfPlugin.config.listener.onRowContextMenu(e, index, row);
						}
					},
					onChange: function(newValue,oldValue){
						if($.type(cfPlugin.config.listener.onChange)=="function"){//在鼠标右击一行记录的时候触发。
							cfPlugin.config.listener.onChange(newValue,oldValue);
						}
					},
//					method:'post',
//					url :"jlquery/select.do",
//					queryParams : {"json":cfPlugin.getXmlData(),"fields":this.initFild(),"rid":Math.random()},
				loadFilter:this.pagerFilter//返回过滤数据显示
			};
		$.extend(datagridJson, this.config);
		$(this.obj).combogrid(datagridJson);
	}
	
	this.getXmlData = function(){
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["QryType"] = ui.isNull(this.config["pagination"]) ? "Bill" : "Report";
		queryField["sqlid"] = this.config["sqlid"];
		queryField["DataBaseType"] = this.config["resource"];
		var param= ui.isNull(this.config["param"]) ? {} : this.config["param"];
		queryField=$.extend({}, queryField, param);
		XmlData.push(queryField);
		return JSON.stringify(XmlData);
	}
	
	this.loadData = function(query){
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["QryType"] = ui.isNull(this.config["pagination"]) ? "Bill" : "Report";
		queryField["sqlid"] = this.config["sqlid"];
		queryField["DataBaseType"] = this.config["resource"];
		var param= ui.isNull(this.config["param"]) ? {} : this.config["param"];
		param = ui.isNull(query) ? param : query;
		queryField=$.extend({}, queryField, param);
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData),"fields":this.initFild()};
		var resultData = ui.ajax(ajaxJson);
		alert(JSON.stringify(resultData));
		var rows = ui.isNull(resultData.data)?[]:resultData.data;
		if(this.config["pagination"]){
			this.changePaging(resultData.fileName);
			this.setFileName(resultData.fileName);
		}
		return rows;
	}
	
	this.initGrid = function(){
		this.getConfginHidFiled();
		this.initAttribute();//初始化属性
		$(this.obj).combogrid('grid').datagrid('loadData', this.loadData());//初始化数据
		this.afterInit();
	}
	
	this.afterInit = function(){
		var itme = JSON.parse(localStorage.getItem(cfPlugin.config.page+"."+cfPlugin.config.id));
		itme = ui.isNull(itme)?{}:itme;
		$.each(itme,function(key,val){
			if(val==true){
				$(cfPlugin["obj"]).combogrid('hideColumn', key);
			}
		})
	}
	this.init();

};


