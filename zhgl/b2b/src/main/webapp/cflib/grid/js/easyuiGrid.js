var easyuiGrid = function(json){
	
	this.config = {
			linkButtons:[],			
			buttons:{},
			columnName:"",
			pagination:false,//分页
			fileName:"",
			listener:{},
			fitColumns:false,//使列自动展开/收缩到合适的DataGrid宽度。
			singleSelect:true,//单选一行
			rownumbers:true,//显示一个行号列
			autoRowHeight:false,//定义设置行的高度，根据该行的内容。设置为false可以提高负载性能。
			pageSize:pubJson.PAGESIZE,//在设置分页属性的时候初始化页面大小
			pageList: [pubJson.PAGESIZE],
			remoteSort:false,//true服务端排序 false客户端排序
			loadMsg: "正在努力加载数据，请稍后...",
			showHeader: true,//定义是否显示行头
			showFooter: false,//定义是否显示行脚
			query: false,
			footBtn: ["导出"]//默认显示grid行脚按钮
	};
	this.json = json;
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
					$(cfPlugin.obj).datagrid('appendRow',{});
					/*var idex = $(cfPlugin.obj).datagrid('getRows').length-1;
					$(cfPlugin.obj).datagrid('selectRow', idex)
							.datagrid('beginEdit', idex);
					var fields = $(cfPlugin.obj).datagrid('getColumnFields',true).concat($(cfPlugin.obj).datagrid('getColumnFields'));
					*/
						 
				}
			},
			'Remove':{
				id: 'Remove',
				text: '删除',
				iconCls: 'icon-remove',
				handler: function(){
					var idex = $(cfPlugin.obj).datagrid('getRowIndex',$(cfPlugin.obj).datagrid('getSelected'));
					if(idex!=-1){
						$(cfPlugin.obj).datagrid('cancelEdit', idex)
						.datagrid('deleteRow', idex);
					}
				}
			}
		};
	
	this.footerBtns = {
			'高级查询':{
				iconCls:'icon-search',
				text:'高级查询',
				handler:function(){
					$("#Dialog").dialog({    
					    title: '高级查询',
					    width: 600,    
					    height: 300,    
					    closed: false,    
					    cache: false,    
					    href: '/dialog/Query.html',    
					    modal: true,
					    sqlField: cfPlugin.getSqlField(),
					    plugin:cfPlugin.json
					});
				}
			},
			"导出":{
				iconCls:'icon-execl',
				text:"导出",
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
			},
			"编辑":{
				iconCls:'icon-edit',
				handler:function(){
					alert('edit');
				}
			}
		};

	this.getFooterBtn =  function(buttons){
		var footBtns = [];
		$.each(buttons,function(i,val){
			footBtns.push(ui.isNull(cfPlugin.footerBtns[val])?{}:cfPlugin.footerBtns[val]);
		});
		return footBtns;	
	}
	
	this.init = function(json){
		var rid = Math.random();
		this.config.pageList[0] = this.config.pageSize;
		
		
		//$.getScript("/cflib/grid/columns/easyuiColumns"+easyuiGrid.columnName+".js?rid="+rid+"", function(jsonData){
		if($("script[src$='easyuiColumns"+this.config.columnName+".js']").length==0){
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
		//ajaxJson["data"] = {"fileName" : filename,"columnName" : JSON.stringify(this.getHead())};
		ajaxJson["data"] = {"fileName" : filename};
		var  resultData = ui.ajax(ajaxJson);
		var page = ui.isNull(resultData) ? 1 : resultData.data;
		if(page.lastPage=="0"){
			return page.lastPage;
		}
		this.setMaxPage(page.lastPage);
		this.setFileName(filename);
		ajaxJson["src"] = "excelHandler/excelTotal.do";
		ajaxJson["data"] = {"fileName" : filename};
		var  page1 = ui.ajax(ajaxJson).data;
		this.setTotal(page1.datasize);
		return "200";
	}
	
	this.setTotal = function(total){
		this.total = total;
	}
	
	this.getTotal = function(total){
		return this.total;
	}
	
	this.footer = function(data){
		var footer=[];
		var json ={};
		$.each(cfPlugin.Columns[0],function(i,row){
			if(row.sum==1){
				json[row.field] = cfPlugin.compute(row.field,data);
			}
		})
		footer.push(json);
		return footer;
	}
	
	this.pagerFilter = function(data){
		console.log("##########等待"+(1/1000)+"秒############");
		ui.sleep(1);//等待1秒
		if(cfPlugin.config["pagination"]&&!ui.isNull(data.dataType)){
			if(cfPlugin.changePaging(data.fileName)=="0"){
				cfPlugin.pagerFilter(data);
			}
			//cfPlugin.changePaging(data.fileName);
			cfPlugin.setFileName(data.fileName);
		}
		
		if(!ui.isNull(data.dataType)){
			data = ui.isNull(data.data)?[]:data.data;
		}
		
		if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
			data = {
				total: ui.isNull(cfPlugin.getTotal())?data.length:cfPlugin.getTotal(),//data.length,
				rows: data,
				queryFisrt :true//查询默认第一页
			}
		}else{
			data["queryFisrt"] = false;
		}
		data["footer"] = cfPlugin.footer(data.rows);
		var dg = $(cfPlugin.obj);
		var opts = dg.datagrid('options');
		var pager = dg.datagrid('getPager');
		pager.pagination({
			beforePageText:"第",
			afterPageText:"页",
			displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
			buttons:cfPlugin.getFooterBtn(cfPlugin.config.footBtn),
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
				dg.datagrid('loadData',data);
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
					$(cfPlugin["obj"]).datagrid('hideColumn', item.name);
					cfPlugin.hidenColumns[item.name] = true;
					cfPlugin.cmenu.menu('setIcon', {
						target: item.target,
						iconCls: 'icon-empty'
					});
				} else {
					$(cfPlugin["obj"]).datagrid('showColumn', item.name);
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
		var fields = $(this.obj).datagrid('getColumnFields');
		for(var i=0; i<fields.length; i++){
			var field = fields[i];
			var col = $(cfPlugin["obj"]).datagrid('getColumnOption', field);
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
		if ($(cfPlugin["obj"]).datagrid('validateRow', cfPlugin.editIndex)){
			$(cfPlugin["obj"]).datagrid('endEdit', cfPlugin.editIndex);
			cfPlugin.editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	this.initAttribute = function(){
		$.extend($.fn.datagrid.defaults.view, {
//			renderFooter: function(target, container, frozen){
//				var opts = $.data(target, 'datagrid').options;
//		        var rows = $.data(target, 'datagrid').footer || [];
//		        var fields = $(target).datagrid('getColumnFields', frozen);
//		        var table = ['<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>'];
//		        for(var i=0; i<rows.length; i++){
//		            var styleValue = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : '';
//		            var style = styleValue ? 'style="' + styleValue + '"' : '';
//		            table.push('<tr class="datagrid-row" datagrid-row-index="' + i + '"' + style + '>');
//		            table.push(this.renderRow.call(this, target, fields, frozen, i, rows[i]));
//		            table.push('</tr>');
//		        }
//		         
//		        table.push('</tbody></table>');
//		       // $(table.join('')).find("td").css({ "color": "red", "background": "blue" });
//		        var html = $(table.join(''));
//		        //html.find(":not(td:first)").css({ "color": "#fff", "background": "#6293BB", "font-weight": "bold" })
//		        html.find("td").css({ "color": "blue", "background": "gray", "font-weight": "bold" });
//		        $(container).html(html);
//			},
			onAfterRender: function(_7d3){
				
				var _7d4=$.data(_7d3,"datagrid");
				var opts=_7d4.options;
				if(opts.showFooter){
				var _7d5=$(_7d3).datagrid("getPanel").find("div.datagrid-footer");
				//_7d5.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility","hidden");
				_7d5.find("div.datagrid-cell-rownumber").html("合计");
				_7d5.find("div.datagrid-cell-check").html("");
				_7d5.find("td").css({ "color": "black", "background": "#E0ECFF", "font-weight": "bold" });
			}
		}
		}
		);
		$.extend($.fn.datagrid.methods, {
			editCell: function(jq,param){
				return jq.each(function(){
					var opts = $(this).datagrid('options');
					var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
					for(var i=0; i<fields.length; i++){
						var col = $(this).datagrid('getColumnOption', fields[i]);
						col.editor1 = col.editor;
						if (fields[i] != param.field){
							col.editor = null;
						}
					}
					$(this).datagrid('beginEdit', param.index);
					for(var i=0; i<fields.length; i++){
						var col = $(this).datagrid('getColumnOption', fields[i]);
						col.editor = col.editor1;
					}
				});
			},
		    columnMoving: function(jq){		  
		    	        return jq.each(function(){		    		    	
		    	            var cells = $(this).datagrid('getPanel').find('div.datagrid-header td[field]');		    
		    	            cells.draggable({		    	
		    	                revert:true,		    	
		    	                cursor:'pointer',		    	
		    	                edge:5,		    	
		    	                proxy:function(source){		    	
		    	                    var p = $('<div class="tree-node-proxy tree-dnd-no" style="position:absolute;border:1px solid #ff0000"/>').appendTo('body');		    	
		    	                    p.html($(source).text());		    	
		    	                    p.hide();		    	
		    	                    return p;		    	
		    	                },		    	
		    	                onBeforeDrag:function(e){		    
		    	                    e.data.startLeft = $(this).offset().left;		    	
		    	                    e.data.startTop = $(this).offset().top;		    	
		    	                },		    	
		    	                onStartDrag: function(){		    
		    	                    $(this).draggable('proxy').css({		    	
		    	                        left:-10000,		    	
		    	                        top:-10000		    	
		    	                    });		    
		    	                },		    	
		    	                onDrag:function(e){		    	
		    	                    $(this).draggable('proxy').show().css({		    	
		    	                        left:e.pageX+15,		    	
		    	                        top:e.pageY+15		    	
		    	                    });		    	
		    	                    return false;		    	
		    	                }		    	
		    	            }).droppable({		    	
		    	                accept:'td[field]',		    	
		    	                onDragOver:function(e,source){		    	
		    	                    $(source).draggable('proxy').removeClass('tree-dnd-no').addClass('tree-dnd-yes');		    	
		    	                    $(this).css('border-left','1px solid #ff0000');		    	
		    	                },		    	
		    	                onDragLeave:function(e,source){		    	
		    	                    $(source).draggable('proxy').removeClass('tree-dnd-yes').addClass('tree-dnd-no');		    	
		    	                    $(this).css('border-left',0);		    	
		    	                },		    	
		    	                onDrop:function(e,source){		    	
		    	                    $(this).css('border-left',0);		    	
		    	                    var fromField = $(source).attr('field');		    	
		    	                    var toField = $(this).attr('field');		    	
		    	                    setTimeout(function(){		    	
		    	                        moveField(fromField,toField);		    	
		    	                        $(cfPlugin.obj).datagrid();	    	
		    	                        $(cfPlugin.obj).datagrid('columnMoving');	    	
		    	                    },0);		    	
		    	                }		    	
		    	            });		    	
		    	            function moveField(from,to){		    	
		    	                var columns = $(cfPlugin.obj).datagrid('options').columns;		    	
		    	                var cc = columns[0];		    	
		    	                var c = _remove(from);		    	
		    	                if (c){		    	
		    	                    _insert(to,c);		    	
		    	                }		    	
		    	                function _remove(field){		    	
		    	                    for(var i=0; i<cc.length; i++){	    	
		    	                        if (cc[i].field == field){		    	
		    	                            var c = cc[i];		    	
		    	                            cc.splice(i,1);		    	
		    	                            return c;	    	
		    	                        }		    	
		    	                    }		    	
		    	                    return null;		    	
		    	                }		    	
		    	                function _insert(field,c){		    	
		    	                    var newcc = [];		    	
		    	                    for(var i=0; i<cc.length; i++){		    	
		    	                        if (cc[i].field == field){		    	
		    	                            newcc.push(c);		    	
		    	                        }		    	
		    	                        newcc.push(cc[i]);		    	
		    	                    }		    	
		    	                    columns[0] = newcc;		    	
		    	                }		    	
		    	            }		    	
		    	        });		    	
		    	    }

			/*columnMoving:function(jq){
		        return jq.each(function(){  
		            var grid = this;  
		              
		            var directionDiv = $("<div></div>");  
		              
		            directionDiv.hide();  
		              
		            $("body").append(directionDiv);  
		              
		            $(grid).datagrid("getPanel")  
		                    .find(".datagrid-header td[field]:not(td[field='ckb'])").draggable({  
		                revert:true,  
		                cursor:"move",  
		                deltaX:10,  
		                deltaY:10,  
		                edge:10,  
		                proxy:function(source){  
		                    var proxyEl = $("<div></div>");  
		                      
		                    proxyEl.addClass("dg-proxy dg-proxy-error");  
		                      
		                    proxyEl.text($(source).text());  
		                      
		                    proxyEl.appendTo($("body"));  
		                      
		                    return proxyEl;  
		                }  
		            }).droppable({  
		                accept:".datagrid-header td[field]",  
		                onDragOver:function(e,source){  
		                    $(source).draggable("proxy").removeClass("dg-proxy-error").addClass("dg-proxy-right");  
		                      
		                    $(".dg-hide-div").hide();  
		                      
		                    var thisIndex = $(this).index();  
		                    var sourceIndex = $(source).index();  
		                      
		                    var className = null;  
		                      
		                    var height = null;  
		                      
		                    var thisOffset = null;  
		                      
		                    var left = null;  
		                    var top = null;  
		                      
		                    height = $(this).height();  
		                      
		                    if(sourceIndex > thisIndex){  
		                        className = "dg-move-prev";  
		  
		                        thisOffset = $(this).offset();  
		                          
		                        left = thisOffset.left;  
		                        top = thisOffset.top;  
		                    }else{  
		                        className = "dg-move-next";  
		                          
		                        if(thisIndex == $(this).parent().children(":last").index()){  
		                            thisOffset = $(this).offset();  
		                              
		                            left = thisOffset.left + $(this).width() - directionDiv.width();  
		                            top = thisOffset.top;  
		                        }else{  
		                            thisOffset = $(this).next().offset();  
		                              
		                            left = thisOffset.left - directionDiv.width();  
		                            top = thisOffset.top;  
		                        }  
		                    }  
		                      
		                    directionDiv.removeClass().addClass(className);  
		                    directionDiv.css({height:height, left:left, top:top});  
		                    directionDiv.show();  
		                },  
		                onDragLeave:function(e,source){  
		                    $(source).draggable("proxy").removeClass("dg-proxy-right").addClass("dg-proxy-error");  
		                      
		                    directionDiv.hide();  
		                },  
		                onDrop:function(e,source){  
		                    directionDiv.remove();  
		                      
		                    var thisIndex = $(this).index();  
		                    var sourceIndex = $(source).index();  
		                      
		                    var sourceCol = new Array();  
		                      
		                    $(source).remove();  
		                    $.each($(grid).datagrid("getPanel")  
		                                    .find(".datagrid-body tr"),function(index,obj){  
		                        var sourceTd = $(obj).children("td:eq(" + sourceIndex + ")");  
		                          
		                        sourceCol.push(sourceTd);  
		                          
		                        sourceTd.remove();  
		                    });  
		                      
		                    var prev = sourceIndex > thisIndex;  
		                      
		                    thisIndex = $(this).index();  
		                      
		                    if(prev){  
		                        $(this).before($(source));  
		                    }else{  
		                        $(this).after($(source));  
		                    }  
		                      
		                    $.each($(grid).datagrid("getPanel")  
		                                    .find(".datagrid-body tr"),function(index,obj){  
		                        var thisTd = $(obj).children("td:eq(" + thisIndex + ")");  
		                          
		                        if(prev){  
		                            thisTd.before(sourceCol[index]);  
		                        }else{  
		                            thisTd.after(sourceCol[index]);  
		                        }  
		                    });  
		                      
		                    $(grid).datagrid("columnMoving").datagrid("columnHiding");  
		                }  
		            });  
		        });  
		    }*/
		});
		var datagridJson = {
				 toolbar: cfPlugin.getButton(),//this.linkButtons,//[{id:"a",iconCls: 'icon-edit',handler: function(){alert('编辑按钮')}},'-',{iconCls: 'icon-help',handler: function(){alert('帮助按钮')}}],
				 columns:this.Columns,
				 onLoadSuccess : function(data){//在数据加载成功的时候触发
					 //$(this).datagrid('appendRow', {"name":1000});
					 if($.type(cfPlugin.config.listener.onLoadSuccess)=="function"){
							cfPlugin.config.listener.onLoadSuccess(data);
						}
					 data = null;
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
//							 $(input).bind("blur",function(event){
//								 $(this).unbind();//失去焦点编辑完成
//								 $(cfPlugin["obj"]).datagrid('endEdit', index);
//							 }); 
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
					loadFilter: cfPlugin.pagerFilter//返回过滤数据显示
				
			};
		$.extend(datagridJson, this.config);
		$(this.obj).datagrid(datagridJson);
//		$(this.obj).datagrid("getPanel").panel({
//			onLoad:function(){
//				alert(2);
//			}
//		});
		//.datagrid("columnMoving");
		$(this.obj).datagrid("columnMoving");
	}
	
	this.getXmlData = function(){
		var XmlData = [];
		var queryField={};
		queryField["dataType"] = "Json";
		queryField["QryType"] = (ui.isNull(this.config["pagination"])||this.config["pagination"]==false) ? "Bill" : "Report";
		queryField["pageSize"] = ui.isNull(this.config["pageSize"]) ? 0 : this.config["pageSize"];
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
		queryField["QryType"] = (ui.isNull(this.config["pagination"])||this.config["pagination"]==false) ? "Bill" : "Report";
		queryField["pageSize"] = ui.isNull(this.config["pageSize"]) ? 0 : this.config["pageSize"];
		queryField["sqlid"] = this.config["sqlid"];
		queryField["DataBaseType"] = this.config["resource"];
		var param= ui.isNull(this.config["param"]) ? {} : this.config["param"];
		queryField=$.extend({}, queryField, param);
		XmlData.push(queryField);
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/select.do";
		ajaxJson["data"] = {"json":JSON.stringify(XmlData),"fields":this.initFild()};
		var resultData = ui.ajax(ajaxJson);
		var rows = ui.isNull(resultData.data)?[]:resultData.data;
		if(this.config["pagination"]&&!ui.isNull(rows)){
			this.changePaging(resultData.fileName);
			this.setFileName(resultData.fileName);
		}else{
			this.setMaxPage(1);
			this.setTotal(0);
		}
		return rows;
	}
	
	this.initGrid = function(){
		this.getConfginHidFiled();
		if(this.config.query==true){
			var post ={};
			post["method"] = "post";
			post["url"] = "jlquery/select.do";
			post["queryParams"] = {"json":cfPlugin.getXmlData(),"fields":this.initFild(),"rid":Math.random()};
			$.extend(cfPlugin.config, post);
		}else{
			var post ={};
			post["method"] = "post";
			post["url"] = "";
			post["queryParams"] = "";
			$.extend(this.config, post);
		}
		this.initAttribute();//初始化属性
		//$(this.obj).datagrid('loadData', this.loadData());//初始化数据
		this.afterInit();
	}
	
	this.afterInit = function(){
		$(cfPlugin["obj"]).datagrid('clearChecked');
		var itme = JSON.parse(localStorage.getItem(cfPlugin.config.page+"."+cfPlugin.config.id));
		itme = ui.isNull(itme)?{}:itme;
		$.each(itme,function(key,val){
			if(val==true){
				$(cfPlugin["obj"]).datagrid('hideColumn', key);
			}
		})
	}
	
	this.compute = function(colName,data) {
        var total = 0;
        $.each(data,function(i,row){
        	total += parseFloat(isNaN(parseInt(row[colName]))?"0":row[colName]);
        });
        return total.toFixed(3);
    }
	
	this.getSqlField = function(){
		var sqlField = [];
		$.each(cfPlugin.Columns[0],function(i,row){
			if(!ui.isNull(row.sqlfield)){
				var field = {};
				field["id"] = row.sqlfield;
				field["name"] = row.title;
				sqlField.push(field);
			}
		})
		return sqlField;
	}
	
	this.init();
};

