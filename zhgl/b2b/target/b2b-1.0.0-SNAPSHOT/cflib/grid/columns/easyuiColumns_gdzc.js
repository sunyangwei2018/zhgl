function getColumns(){
	var column_header= [
	                    {"id":"selectRKDITEM","name":"入库单明细",
	                     "columns":[
	                                {"field":"SN_code","title":"设备号","width":"100","editor":"text","sortable":true},
	                                {"field":"splx","title":"splx","width":"200",hidden:true,"sortable":true},
	                                {"field":"splx_cn","title":"资产类型","width":"160","editor":{
	                                	"type":'combogrid',
	                                	"options":{
	                                		'url':'jlquery/select.do',
											'queryParams': {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFRKD.selectSPLX\"}]"},	
        								    idField:'name',    
        								    textField:'name',
        								    editable : false,
        								    'columns':[[    
        								              {field:'code',title:'资产代码',width:80},    
        								              {field:'name',title:'资产名称',width:80} 	
        								          ]],
                								   'loadFilter': function (data) {
	                								    	var data = data.data;
	                								    	var rows={};
	                								    	rows["total"] = data.length;
	                								    	rows["rows"]= data;
	                								    	return rows;
	                								    	
                								    },
                								    'onSelect': function(index, row){
                								    	var row2 =$("#d_RKDITEM").datagrid("getSelected"); 
                								    	row2.splx=row.code;		                								    	
                								    },	
											
                								    
        								}
	                                },"sortable":true}
	                                ]
	                    },   
	                    {"id":"selectCKSP","name":"仓库资产信息",
	                	  	"columns":[ 
	                			  			 {"field":"SN_code","title":"设备号","width":"100","sortable":true,"sortOrder":"asc"},
	                			  			 {"field":"splx","title":"资产类型","width":"100","sortable":true},
	                			  			 {"field":"spzt","title":"当前状态","width":"80","sortable":true},
	                			  			 {"field":"jlbh","title":"入库单号","width":"80","sortable":true},
	                			  			 {"field":"rkr","title":"入库人","width":"80","sortable":true},
	                			  			 {"field":"rkrq","title":"入库日期","width":"160","sortable":true},
	                			  			 {"field":"lyr","title":"领用人","width":"80","sortable":true},
	                			  			 {"field":"lyrq","title":"领用日期","width":"160","sortable":true},
	                			  			 {"field":"fcdh","title":"返厂单号","width":"80","sortable":true},
	                			  			 {"field":"fcr","title":"返厂人","width":"80","sortable":true},
	                			  			 {"field":"fcrq","title":"返厂日期","width":"160","sortable":true},
	                			  			 {"field":"fcxx","title":"返厂信息","width":"500","sortable":true},
	                			  	  ]
	                	},
	                	{"id":"selectCKSPKP","name":"领用记录信息",
	                	  	"columns":[ 
	                			  			 {"field":"SN_code","title":"设备号","width":"100","sortable":true,"sortOrder":"asc"},
	                			  			 {"field":"lrr","title":"操作人","width":"80","sortable":true},
	                			  			 {"field":"lrrq","title":"日期","width":"160","sortable":true},
	                			  			 {"field":"splx","title":"资产类型","width":"100","sortable":true},
	                			  			 {"field":"djlx","title":"单据类型","width":"100","sortable":true},
	                			  			 {"field":"jlbh","title":"记录单号","width":"80","sortable":true},
	                			  			 {"field":"lyr","title":"领用人","width":"80","sortable":true},
	                			  			 {"field":"memo","title":"备注","width":"160","sortable":true},
	                			  		
	                			  	  ]
	                	},
	                	{"id":"selectCKSPHZ","name":"当前领用记录信息",
	                	  	"columns":[ 
	                			  			 {"field":"splx_cn","title":"资产类型","width":"100","sortable":true},
	                			  			 {"field":"dqzt_cn","title":"当前状态","width":"100","sortable":true},
	                			  			 {"field":"sl","title":"数量","width":"100","sortable":true},
	                			  			 {"field":"splx","title":"splx_cn","width":"100",hidden:true,"sortable":true},
	                			  			 {"field":"dqzt","title":"dqzt_cn","width":"100",hidden:true,"sortable":true},
	                			  		
	                			  	  ]
	                	},
	                	{"id":"selectCKSPBD","name":"当前领用记录信息",
	                	  	"columns":[ 
	                			  			 {"field":"lyr","title":"领用人","width":"100","sortable":true},
	                			  			 {"field":"pda","title":"PDA","width":"140","sortable":true},
	                			  			 {"field":"pri","title":"蓝牙打印机","width":"140","sortable":true},
	                			  			 {"field":"sim","title":"SIM卡","width":"140","sortable":true},
	                			  		
	                			  	  ]
	                	},
	                	{"id":"selectFCDITEM","name":"返厂单明细",
		                     "columns":[
		                                {"field":"SN_code","title":"设备号","width":"100","editor":"text","sortable":true},
		                                {"field":"splx","title":"splx","width":"200",hidden:true,"sortable":true},
		                                {"field":"splx_cn","title":"资产类型","width":"160","editor":{
		                                	"type":'combogrid',
		                                	"options":{
		                                		'url':'jlquery/select.do',
												'queryParams': {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFRKD.selectSPLX\"}]"},	
	        								    idField:'name',    
	        								    textField:'name',
	        								    editable : false,
	        								    'columns':[[    
	        								              {field:'code',title:'资产代码',width:80},    
	        								              {field:'name',title:'资产名称',width:80} 	
	        								          ]],
	                								   'loadFilter': function (data) {
		                								    	var data = data.data;
		                								    	var rows={};
		                								    	rows["total"] = data.length;
		                								    	rows["rows"]= data;
		                								    	return rows;
		                								    	
	                								    },
	                								    'onSelect': function(index, row){
	                								    	var row2 =$("#d_FCDITEM").datagrid("getSelected"); 
	                								    	row2.splx=row.code;		                								    	
	                								    },	
												
	                								    
	        								}
		                                },"sortable":true},
		                                {"field":"memo","title":"维修原因","width":"280","editor":"text","sortable":true},
		                                ]
		                    },
		                    {"id":"selectFCHCDITEM","name":"返厂回仓单明细",
			                     "columns":[
			                                {"field":"SN_code","title":"设备号","width":"100","editor":"text","sortable":true},
			                                {"field":"splx","title":"splx","width":"200",hidden:true,"sortable":true},
			                                {"field":"splx_cn","title":"资产类型","width":"160","editor":{
			                                	"type":'combogrid',
			                                	"options":{
			                                		'url':'jlquery/select.do',
													'queryParams': {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFRKD.selectSPLX\"}]"},	
		        								    idField:'name',    
		        								    textField:'name',
		        								    editable : false,
		        								    'columns':[[    
		        								              {field:'code',title:'资产代码',width:80},    
		        								              {field:'name',title:'资产名称',width:80} 	
		        								          ]],
		                								   'loadFilter': function (data) {
			                								    	var data = data.data;
			                								    	var rows={};
			                								    	rows["total"] = data.length;
			                								    	rows["rows"]= data;
			                								    	return rows;
			                								    	
		                								    },
		                								    'onSelect': function(index, row){
		                								    	var row2 =$("#d_FCHCDITEM").datagrid("getSelected"); 
		                								    	row2.splx=row.code;		                								    	
		                								    },	
													
		                								    
		        								}
			                                },"sortable":true}
			                                ]
			                    },
			                	{"id":"selectPDARZ","name":"PDA登陆日志",
			                	  	"columns":[ 
			                			  			 {"field":"pdasn","title":"PDA SN号","width":"150","sortable":true},
			                			  			 {"field":"dlr","title":"登录人","width":"150","sortable":true},
			                			  			 {"field":"dlwd","title":"登陆网点","width":"150","sortable":true},
			                			  			 {"field":"dlrq","title":"登陆日期","width":"150","sortable":true},
			                			  			 {"field":"source","title":"来源","width":"150","sortable":true},
			                			  			 {"field":"dept_name","title":"部门","width":"150","sortable":true}
			                			  	  ]
			                	},
	];
	return column_header;
}