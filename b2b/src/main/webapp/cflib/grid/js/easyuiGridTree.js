var easyuiGridTree = function(json){
	
	this.config = {
			linkButtons:[],			
			buttons:{},
			columnName:"",
			pagination:"",//分页
			fileName:"",
			listener:{},
			rownumbers:true,//显示一个行号列
			animate: true,
			fitColumns:false,//使列自动展开/收缩到合适的treegrid宽度。
			singleSelect:true,//单选一行	
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
	this.editingId = undefined;
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
					$(this.obj).treegrid('appendRow',{});
					this.editingId = $('#dg').treegrid('getRows').length-1;
					$(this.obj).treegrid('selectRow', this.editingId)
							.treegrid('beginEdit', this.editingId);
				}
			},
			'Remove':{
				id: 'Remove',
				text: '删除',
				iconCls: 'icon-remove',
				handler: function(){
					$(this.obj).treegrid('cancelEdit', this.editingId)
					.treegrid('deleteRow', this.editingId);
					this.editingId = undefined;
				}
			}
		};
	
	this.init = function(json){
		var rid = Math.random();
		//$.getScript("/cflib/grid/columns/easyuiColumns"+easyuiGrid.columnName+".js?rid="+rid+"", function(jsonData){
		if($("script[src$='easyuiColumns"+this.columnName+".js']").length==0){
			//document.write("<script type='text/javascript' src='/cflib/grid/columns/easyuiColumns"+easyuiGrid.columnName+".js?rid="+rid+"'></script>");
			$("script[name='easyuiColumns']").remove();
			var $script = $("<script type='text/javascript' name='easyuiColumns' src='/cflib/grid/columns/easyuiColumns_"+this.config.columnName+".js?rid="+rid+"'></script>");
			$script.insertBefore($("script[src$='easyuiGrid.js']"));
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
			this.config.linkButtons.push(this.button[key]);
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
	
	this.callback = function(resultData,treeData){
		this.callback1 = function(resultData,tree){
			$.each(resultData,function(j,tem){
				var bm_tree1 = {};
				if(tree.id==eval("tem."+cfPlugin.config.treeSJ_ID)){
					bm_tree1["id"] = eval("tem."+cfPlugin.config.idField);//val.code;
					bm_tree1["name"] = eval("tem."+cfPlugin.config.treeField);//val.name;
					bm_tree1["s_id"] = eval("tem."+cfPlugin.config.treeSJ_ID);//val.s_code;
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
				if(val.lv==2){
					temp["id"] = eval("val."+cfPlugin.config.idField);//val.code;
					temp["name"] = eval("val."+cfPlugin.config.treeField);//val.name;
					temp["s_id"] = eval("val."+cfPlugin.config.treeSJ_ID);//val.s_code;
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
	}
	
	this.pagerFilter = function(data){
		if(cfPlugin.config["pagination"]&&ui.isNull(cfPlugin.getFileName())){
			cfPlugin.changePaging(data.fileName);
			cfPlugin.setFileName(data.fileName);
		}
		if(!ui.isNull(data.dataType)){
			data = ui.isNull(data.data)?[]:data.data;
		}
		if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
			data = {
				total: ui.isNull(cfPlugin.getTotal())?data.length:cfPlugin.getTotal(),//cfPlugin.getTotal(),//data.length,
				rows: data
			}
		}
		var tg = $(cfPlugin.obj);
		var opts = tg.treegrid('options');
		//var state = tg.data('treegrid');
		if (!data.allRows){
			data.allRows = data.rows;
        }
		
		
		var topRows = [];
        var childRows = [];
	     	$.map(data.allRows, function(row,i){
	        	ui.isNull(row._parentId) ? topRows.push(row): childRows.push(row);
	        	row.children = null;
	        });
        data.total = topRows.length;
		var pager = tg.treegrid('getPager');
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
				tg.treegrid('loadData',data);
			},
			onBeforeRefresh:function(){ 
		        $(this).pagination('loading'); 
		        $(this).pagination('loaded'); 
	        }
		});
		//var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
		//var end = start + parseInt(opts.pageSize);
		//data.rows = (data.originalRows.slice(start, end));
		data.rows = topRows.concat(childRows);
		return data;
	}
	
	this.createColumnMenu = function(){
		this.cmenu = $('<div/>').appendTo('body');
		this.cmenu.menu({
			onClick: function(item){
				if (item.iconCls == 'icon-ok'){
					$(cfPlugin["obj"]).treegrid('hideColumn', item.name);
					cfPlugin.hidenColumns[item.name] = true;
					cfPlugin.cmenu.menu('setIcon', {
						target: item.target,
						iconCls: 'icon-empty'
					});
				} else {
					$(cfPlugin["obj"]).treegrid('showColumn', item.name);
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
		var fields = $(this.obj).treegrid('getColumnFields');
		for(var i=0; i<fields.length; i++){
			var field = fields[i];
			var col = $(cfPlugin["obj"]).treegrid('getColumnOption', field);
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
		if (cfPlugin.editingId == undefined){return true}
		if ($(cfPlugin["obj"]).treegrid('validateRow', cfPlugin.editingId)){
			$(cfPlugin["obj"]).treegrid('endEdit', cfPlugin.editingId);
			cfPlugin.editingId = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	this.initAttribute = function(){
		$.extend($.fn.treegrid.methods, {
			editCell: function(jq,param){
				return jq.each(function(){
					var opts = $(this).treegrid('options');
					var fields = $(this).treegrid('getColumnFields',true).concat($(this).treegrid('getColumnFields'));
					for(var i=0; i<fields.length; i++){
						var col = $(this).treegrid('getColumnOption', fields[i]);
						col.editor1 = col.editor;
						if (fields[i] != param.field){
							col.editor = null;
						}
					}
					$(this).treegrid('beginEdit', param.index);
					for(var i=0; i<fields.length; i++){
						var col = $(this).treegrid('getColumnOption', fields[i]);
						col.editor = col.editor1;
					}
				});
			}
		});
		
		var treegridJson = {
				 toolbar: cfPlugin.getButton(),//this.linkButtons,//[{id:"a",iconCls: 'icon-edit',handler: function(){alert('编辑按钮')}},'-',{iconCls: 'icon-help',handler: function(){alert('帮助按钮')}}],
				 columns:this.Columns,
				 onLoadSuccess : function(data){//在数据加载成功的时候触发
					 if($.type(cfPlugin.config.listener.onLoadSuccess)=="function"){
							cfPlugin.config.listener.onLoadSuccess(data);
						}
					 data = null;
				 },
				 onSortColumn : function(sort,order){
					
					 //$(json.obj).treegrid('reload');  
				 },
				 onCheck: function(row){
						if($.type(cfPlugin.config.listener.onCheck)=="function"){//选中行
							cfPlugin.config.listener.onCheck(row);
						}
				 },onClickRow : function(row){
					 if($.type(cfPlugin.config.listener.onClickRow)=="function"){//单击行
							cfPlugin.config.listener.onClickRow(row);
						}
				 },onDblClickRow : function(row){//双击行
					 if($.type(cfPlugin.config.listener.onDblClickRow)=="function"){
							cfPlugin.config.listener.onDblClickRow(row);
						}
				 },onClickCell: function(field, row){
					 var col = $(this).datagrid('getColumnOption', field);
					 if(ui.isNull(col.editor)){
						 return false;
					 }
					 if($.type(cfPlugin.config.listener.onClickCell)=="function"){
							cfPlugin.config.listener.onClickCell(field, row);
							return true;
					 }
					 var index = eval("row."+cfPlugin.config.idField);
					 if (cfPlugin.endEditing()){
						 $(cfPlugin["obj"]).treegrid('editCell', {index:index,field:field});
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
						 cfPlugin.editingId = index;
						}
					}/*,onClickCell : function(field, row){//单击单元格
					 
					 if($.type(cfPlugin.config.listener.onClickCell)=="function"){
							cfPlugin.config.listener.onClickCell(field, row);
							return true;
					 }
					   var id = eval("row."+cfPlugin.config.idField);
					   //$(cfPlugin["obj"]).treegrid('select',id);
					   if (ui.isNull(cfPlugin.editingId)){
							 	cfPlugin.editingId = id
							 	$(cfPlugin["obj"]).treegrid('endEdit', cfPlugin.editingId);
						}else{
							$(cfPlugin["obj"]).treegrid('endEdit', cfPlugin.editingId);
							cfPlugin.editingId = id;
							$(cfPlugin["obj"]).treegrid('beginEdit', cfPlugin.editingId);
						}
					}*/,onDblClickCell : function(field,row){//双击单元格
						if($.type(cfPlugin.config.listener.onDblClickCell)=="function"){
							cfPlugin.config.listener.onDblClickCell(field,row);
						}
					},onBeforeLoad : function(row,param){//在请求数据加载之前触发，返回false可以取消加载动作。
						if($.type(cfPlugin.config.listener.onBeforeLoad)=="function"){
							cfPlugin.config.listener.onBeforeLoad(row,param);
						}
					},onLoadError : function(arguments){//数据加载失败的时候触发，参数和jQuery的$.ajax()函数的'error'回调函数一样
						if($.type(cfPlugin.config.listener.onLoadError)=="function"){
							cfPlugin.config.listener.onLoadError(arguments);
						}
					},onBeforeExpand : function(row){//在节点展开之前触发，返回false可以取消展开节点的动作。
						if($.type(cfPlugin.config.listener.onBeforeExpand)=="function"){
							cfPlugin.config.listener.onBeforeExpand(row);
						}
					},onExpand : function(row){//在节点被展开的时候触发
						if($.type(cfPlugin.config.listener.onExpand)=="function"){
							cfPlugin.config.listener.onExpand(row);
						}
					},onBeforeCollapse : function(row){//在节点折叠之前触发，返回false可以取消折叠节点的动作。
						if($.type(cfPlugin.config.listener.onBeforeCollapse)=="function"){
							cfPlugin.config.listener.onBeforeCollapse(row);
						}
					},onCollapse : function(row){//在节点被折叠的时候触发
						if($.type(cfPlugin.config.listener.onCollapse)=="function"){
							cfPlugin.config.listener.onCollapse(row);
						}
					},onContextMenu : function(e, row){
						if($.type(cfPlugin.config.listener.onContextMenu)=="function"){//在右键点击节点的时候触发。
							cfPlugin.config.listener.onContextMenu(e, row);
						}
					},onBeforeEdit : function(row){
						if($.type(cfPlugin.config.listener.onBeforeEdit)=="function"){//在用户开始编辑节点的时候触发。
							cfPlugin.config.listener.onBeforeEdit(row);
						}
					},onAfterEdit : function(row,changes){
						if($.type(cfPlugin.config.listener.onAfterEdit)=="function"){//在用户完成编辑的时候触发。
							cfPlugin.config.listener.onAfterEdit(row,changes);
						}
					},onCancelEdit : function(row){
						if($.type(cfPlugin.config.listener.onCancelEdit)=="function"){//在用户取消编辑节点的时候触发。
							cfPlugin.config.listener.onCancelEdit(row);
						}
					},onHeaderContextMenu: function(e, field){
						e.preventDefault();
						if (!cfPlugin.cmenu){
							cfPlugin.createColumnMenu();
						}
						cfPlugin.cmenu.menu('show', {
							left:e.pageX,
							top:e.pageY
						});
					},
					method:'post',
					url :"jlquery/select.do",
					queryParams : {"json":cfPlugin.getXmlData(),"fields":this.initFild(),"rid":Math.random()},
					loadFilter:this.pagerFilter//返回过滤数据显示
			};
		$.extend(treegridJson, this.config);
		$(this.obj).treegrid(treegridJson);
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
	
	this.loadData = function(){
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["QryType"] = ui.isNull(this.config["pagination"]) ? "Bill" : "Report";
		queryField["sqlid"] = this.config["sqlid"];
		queryField["DataBaseType"] = this.config["resource"];
		var param= ui.isNull(this.config["param"]) ? {} : this.config["param"];
		queryField=$.extend({}, queryField, param);
		XmlData.push(queryField);
		var rid = Math.random();
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData),"fields":this.initFild()};
		var resultData = ui.ajax(ajaxJson);
		var rows = resultData.data;
		if(this.config["pagination"]&&!ui.isNull(rows)){
			this.changePaging(resultData.fileName);
			this.setFileName(resultData.fileName);
		}else{
			this.setMaxPage(1);
			this.setTotal(0);
		}
		return resultData;
	}
	
	this.initGrid = function(){
		this.getConfginHidFiled();
		this.initAttribute();//初始化属性
		//$(this.obj).treegrid('loadData', this.loadData());//初始化数据
		this.afterInit();
	}
	
	this.afterInit = function(){
		var itme = JSON.parse(localStorage.getItem(cfPlugin.config.page+"."+cfPlugin.config.id));
		itme = ui.isNull(itme)?{}:itme;
		$.each(itme,function(key,val){
			if(val==true){
				$(cfPlugin["obj"]).treegrid('hideColumn', key);
			}
		})
	}
	
	this.init();

};


