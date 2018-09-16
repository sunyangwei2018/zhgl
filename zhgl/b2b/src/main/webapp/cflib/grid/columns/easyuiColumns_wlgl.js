function getColumns(){
		var column_header= [
		                	{"id":"selectBM","name":"部门信息",
		                	  	"columns":[
		                			  			 {"field":"id","sqlfield":"dept_code","title":"部门编码","width":"100","sortable":true,"sortOrder":"asc",resizable:false,"sum":1},
		                			  			 {"field":"pId","sqlfield":"s_code","title":"上级编码","width":"100","sortable":true,hidden:true},
		                			  			 {"field":"name","title":"部门名称","width":"100","sortable":true,resizable:false,"sum":1},
		                			  			 {"field":"lv","title":"部门级别","width":"100","sortable":true,"formatter": windowFillBack,"styler":getBM_lv,resizable:false}
		                			  	  ]
		                	},
		                	{"id":"selectRY","name":"人员信息",
		                	  	"columns":[
		                			  			 {"field":"peop_code","title":"人员编码","explain":"人员编号","width":"100","sortable":true,"sortOrder":"asc"},
		                			  			 {"field":"peop_name","title":"姓名","explain":"姓名","width":"100","sortable":true},
		                			  			 {"field":"dept_name","title":"部门","explain":"部门","width":"100","sortable":true},
		                			  			 {"field":"p_name","title":"人员职位","explain":"人员职位","width":"100","sortable":true},
		                			  			 {"field":"gwzn_cn","title":"岗位职能","width":"100","sortable":true},
		                			  			 {"field":"net_name","title":"所属网点","explain":"所属网点","width":"100","sortable":true},
		                			  			 {"field":"tel","title":"电话","explain":"电话","width":"100","sortable":true},
		                			  			 {"field":"wx","title":"微信号","width":"100","sortable":true},
		                			  			 {"field":"lyrq","title":"入职日期","explain":"入职日期","width":"100","sortable":true},
		                			  			 {"field":"zz_flag_cn","title":"是否在职","explain":"是否在职","width":"70","sortable":true},
		                			  			 {"field":"czrq","title":"辞职日期","explain":"辞职日期","width":"100","sortable":true},
		                			  			 {"field":"intro_name","title":"介绍人","explain":"介绍人","width":"100","sortable":true},
		                			  			 {"field":"bc_cn","title":"班次","explain":"班次","width":"100","sortable":true},
		                			  			 {"field":"cblx_cn","title":"参保类型","explain":"参保类型","width":"100","sortable":true},
		                			  			 {"field":"cblx","title":"cblx","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"dept_code","title":"dept_code","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"p_code","title":"p_code","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"net_code","title":"net_code","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"birthday","title":"birthday","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"age","title":"age","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"edu","title":"edu","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"addr","title":"addr","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"sfzh","title":"sfzh","width":"100","sortable":true,"hidden":true},
		               			  			 	 {"field":"intro_code","title":"intro_code","width":"100","sortable":true,"hidden":true},
		               			  			   	 {"field":"bc","title":"bc","width":"100","sortable":true,"hidden":true},
		               			  			 	 {"field":"sfzyxq","title":"sfzyxq","width":"100","sortable":true,"hidden":true},
		               			  			 	 {"field":"rylx","title":"rylx","width":"100","sortable":true,"hidden":true},
		               			  			 	 {"field":"yhkh","title":"yhkh","width":"100","sortable":true,"hidden":true},
		               			  			 	 {"field":"zz_flag","title":"zz_flag","width":"100","sortable":true,"hidden":true},
		               			  			     {"field":"photo","title":"photo","width":"100","sortable":true,"hidden":true},
		               			  			     {"field":"email","title":"email","width":"100","sortable":true},
		               			  			     {"field":"sex","title":"photo","width":"100","sortable":true,"hidden":true},
		               			  			     {"field":"sex_cn","title":"性别","width":"100","sortable":true},
		               			  			     {"field":"yxbj","title":"yxbj","width":"100","sortable":true,"hidden":true},
		               			  			     {"field":"gwzn","title":"yxbj","width":"100","sortable":true,"hidden":true},
		               			  			     {"field":"bxzl","title":"bxzl","width":"100","sortable":true,"hidden":true},
		               			  			     {"field":"xz","title":"xz","width":"100","sortable":true,"hidden":true},
		                			  	  ]
		                	},
		                	{"id":"selectWD","name":"网点信息",
		                	  	"columns":[ 
		                			  			 {"field":"net_code","title":"网点代码","explain":"网点代码","width":"100","sortable":true,"sortOrder":"asc"},
		                			  			 {"field":"net_name","title":"网点名称","explain":"网点名称","width":"100","sortable":true},
		                			  			 {"field":"wdlx","title":"wdlx","explain":"wdlx","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"wdlx_cn","title":"网点类型","explain":"网点类型","width":"100","sortable":true},
		                			  			 {"field":"s_name","title":"上级网点","explain":"上级网点","width":"100","sortable":true},
		                			  			 {"field":"frz","title":"负责人","explain":"负责人","width":"100","sortable":true},
		                			  			 {"field":"tel","title":"网点电话","explain":"网点电话","width":"100","sortable":true},
		                			  			 {"field":"jswd","title":"jswd","explain":"jswd","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"jswd_name","title":"结算网点","explain":"结算网点","width":"100","sortable":true},
		                			  			 {"field":"net_lv","title":"网点级别","explain":"网点级别","width":"100","sortable":true},
		                			  			 {"field":"dqzt_cn","title":"运营状态","explain":"运营状态","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"dqzt","title":"运营状态","explain":"运营状态","width":"100","sortable":true},
		                			  			 {"field":"glz","title":"glz","explain":"glz","width":"100","sortable":true,"hidden":true},
		                			  		     {"field":"glz_name","title":"管理组","explain":"管理组","width":"100","sortable":true},
		                			  			 {"field":"addr","title":"网点地址","explain":"网点地址","width":"100","sortable":true},
		                			  			 {"field":"s_code","title":"s_code","explain":"s_code","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"sjwd","title":"sjwd","explain":"sjwd","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"ssbm","title":"ssbm","explain":"sjwd","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"v8name","title":"V8名称","explain":"v8name","width":"100","sortable":true},
		                			  			 {"field":"jwd","title":"经纬度","explain":"jwd","width":"100","sortable":true},
		                			  			 {"field":"fbzx","title":"fbzx","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"fbzx_cn","title":"分拨中心","width":"100","sortable":true},
		                			  			 {"field":"mrdq","title":"mrdq","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"mrdq_cn","title":"默认地址","width":"100","sortable":true},
		                			  			 {"field":"wdlb","title":"wdlb","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"wdlb_cn","title":"网点类别","width":"100","sortable":true},
		                			  			 {"field":"sd","title":"sd","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"sd_cn","title":"税点","width":"100","sortable":true},
		                			  			 {"field":"fptt","title":"fptt","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"fptt_cn","title":"发票抬头","width":"100","sortable":true},
		                			  			 {"field":"yhht","title":"yhht","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"yhht_cn","title":"银行行号","width":"100","sortable":true},
		                			  			 {"field":"yhzh","title":"yhzh","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"yhzh_cn","title":"银行账号","width":"100","sortable":true},
		                			  			 {"field":"khh","title":"khh","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"khh_cn","title":"开户行","width":"100","sortable":true},
		                			  			 {"field":"khhdz","title":"khhdz","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"khhdz_cn","title":"开户行地址","width":"100","sortable":true}
		                			  	  ]
		                	},
		                	{"id":"selectKH","name":"客户信息",
		                	  	"columns":[
		                			  			 {"field":"cus_code","title":"客户代码","width":"100","sortable":true,"sortOrder":"asc"},
		                			  			 {"field":"cus_name","title":"客户公司名称","width":"100","sortable":true},
		                			  			 {"field":"s_name","title":"客户名称","width":"100","sortable":true},
		                			  			 {"field":"fkfs","title":"fkfs","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"fkfs_cn","title":"付款方式","width":"100","sortable":true},
		                			  			 {"field":"vol","title":"默认体积","width":"100","sortable":true},
		                			  			 {"field":"skgs","title":"skgs","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"skgs_cn","title":"收款公司","width":"100","sortable":true},
		                			  			 {"field":"jswd","title":"jswd","width":"100","sortable":true,"hidden":true},
		                			  		 	 {"field":"jswd_name","title":"结算网点","width":"100","sortable":true},
		                			  		 	 {"field":"bjje","title":"单件保价金额","width":"100","sortable":true,"sum":1},
		                			  		 	 {"field":"bjfl","title":"保价费率%","width":"100","sortable":true},
		                			  		 	 {"field":"jjfs","title":"jjfs","width":"100","sortable":true,"hidden":true},
		                			  		 	 {"field":"jjfs_cn","title":"计价方式","width":"100","sortable":true},
		                			  		 	 {"field":"hwlb","title":"hwlb","width":"100","sortable":true,"hidden":true},
		                			  		 	 {"field":"hwlb_cn","title":"货物类别","width":"100","sortable":true},
		                			  			 {"field":"ksrq","title":"合作开始日期","width":"100","sortable":true},
		                			  		     {"field":"lxr","title":"联系人","width":"100","sortable":true},
		                			  			 {"field":"tel","title":"联系电话","width":"100","sortable":true},
		                			  			 {"field":"addr","title":"地址","width":"250","sortable":true},
		                			  			
		                			  			 {"field":"gg","title":"规格","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"gg_cn","title":"规格","width":"100","sortable":true},
		                			  		     {"field":"gdzkl","title":"固定折扣率","width":"100","sortable":true},
		                			  			 {"field":"fkl","title":"返款率","width":"100","sortable":true},
		                			  			 {"field":"gmzkbz","title":"国模折扣标准","width":"250","sortable":true},
		                			  		     {"field":"gmzkl","title":"规模折扣率","width":"100","sortable":true},
		                			  			 {"field":"bj_flag","title":"保价标记","width":"100","sortable":true},
		                			  			 
		                			  			 {"field":"lxr","title":"联系人","width":"100","sortable":true},
		                			  			 {"field":"tel","title":"联系电话","width":"100","sortable":true},
		                			  			 {"field":"addr","title":"地址","width":"250","sortable":true},
		                			  			 
		                			  			 {"field":"lrr","title":"录入人","width":"100","sortable":true},
		                			  			 {"field":"lrrq","title":"录入日期","width":"100","sortable":true},
		                			  			 {"field":"xgr","title":"修改人","width":"100","sortable":true},
		                			  			 {"field":"xgrq","title":"修改日期","width":"100","sortable":true},
		                			  			 {"field":"jsbm","title":"jsbm","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"jsbm_cn","title":"结算部门","width":"100","sortable":true},
		                			  			 {"field":"dkh_flag","title":"大客户","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"qsjs_flag","title":"不签收结算","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"bkhkh","title":"扫描不审核","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"bkhkh_wd","title":"扫描不审核","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"dkh_flag_cn","title":"大客户","width":"100","sortable":true},
		                			  			 {"field":"qsjs_flag_cn","title":"不签收结算","width":"100","sortable":true},
		                			  			 {"field":"bkhkh_cn","title":"扫描不审核(上海)","width":"100","sortable":true},
		                			  			 {"field":"bkhkh_wd_cn","title":"扫描不审核(网点)","width":"100","sortable":true}
		                			  	  ]
		                	},
		                	{"id":"selectXL","name":"线路信息",
		                	  	"columns":[ 
		                			  			 {"field":"line_code","title":"线路代码","explain":"线路代码","width":"100","sortable":true,"sortOrder":"asc"},
		                			  			 {"field":"line_name","title":"线路名称","explain":"线路名称","width":"200","sortable":true},
		                			  			 {"field":"flag","title":"flag","explain":"线路类型","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"flag_cn","title":"线路类型","explain":"线路类型","width":"100","sortable":true},
		                			  			 {"field":"net_name","title":"网点","explain":"线路类型","width":"100","sortable":true},
		                			  			 {"field":"fhwd","title":"fhwd","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"dxr","title":"市内带线人(市内)","explain":"市内带线人(市内)","width":"100","sortable":true},
		                			  			 {"field":"tel","title":"带线人电话(市内)","explain":"带线人电话(市内)","width":"200","sortable":true}
		                	
		                			  	  ]

		                	},
		                	{"id":"selectDQ","name":"地区信息",
		                	  	"columns":[ 
		                			  			 {"field":"code","title":"地区代码","explain":"地区代码","width":"100","sortable":true,"sortOrder":"asc"},
		                			  			 {"field":"name","title":"地区名称","explain":"地区名称","width":"100","sortable":true},
		                			  		     {"field":"jc","title":"简称","explain":"简称","width":"100","sortable":true},
		                			  			 {"field":"net_name","title":"所属网点","explain":"所属网点","width":"100","sortable":true},
		                			  			 {"field":"net_code","title":"net_code","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"s_code","title":"s_code","hidden":true,"width":"100","sortable":true},
		                			  			 {"field":"s_name","title":"上级地区","explain":"上级地区","width":"100","sortable":true},         
		                			  			 {"field":"zz_flag","title":"zz_flag","hidden":true,"width":"100","sortable":true},
		                			  			 {"field":"zzflag_cn","title":"中转地区","explain":"中转地区","width":"100","sortable":true},
		                			  			 {"field":"zzts","title":"中转时效(h)","explain":"中转时效(h)","width":"100","sortable":true},
		                			  			 {"field":"pssx","title":"派送时效(h)","explain":"派送时效(h)","width":"100","sortable":true},
		                			  			 {"field":"area_lv","title":"级别","explain":"级别","hidden":true,"width":"100","sortable":true},
		                			  			 {"field":"kwbh","title":"库位号","explain":"库位号","width":"100","sortable":true},
		                			  			 {"field":"yyjb","title":"地区级别(运营)","explain":"地区级别(运营)","width":"100","sortable":true},
		                			  			 {"field":"name3","title":"地区全称","explain":"地区全称","width":"300","sortable":true},
		                			  			 {"field":"area_flag","title":"zz_flag","hidden":true,"width":"100","sortable":true},
		                			  			 {"field":"zz_flag_cw","title":"zz_flag_cw","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"zz_flag_cw_cn","title":"财务中转","width":"100","sortable":true},
		                			  			 {"field":"qp","title":"qp","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"qp_cn","title":"地区全拼","width":"100","sortable":true},
		                			  			 {"field":"jp","title":"jp","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"jp_cn","title":"地区简拼","width":"100","sortable":true}
		                			  	  ]
		                	},
		                	{"id":"selectDQKH","name":"地区信息",
		                	  	"columns":[ 
		                			  			 {"field":"code","title":"地区代码","explain":"地区代码","width":"100","sortable":true,"sortOrder":"asc"},
		                			  			 {"field":"name","title":"地区名称","explain":"地区名称","width":"100","sortable":true},
		                			  		     {"field":"jc","title":"简称","explain":"简称","width":"100","sortable":true},
		                			  			 {"field":"net_name","title":"所属网点","explain":"所属网点","width":"100","sortable":true},
		                			  			 {"field":"net_code","title":"net_code","width":"100","hidden":true,"sortable":true},   
		                			  			 {"field":"name3","title":"地区全称","explain":"地区全称","width":"300","sortable":true},
		                			  			 {"field":"zz_flag","title":"zz_flag","hidden":true,"width":"100","sortable":true},
		                			  			 {"field":"zzflag_cn","title":"中转地区","explain":"中转地区","width":"100","sortable":true},
		                			  			 {"field":"zzts","title":"中转时效(d)","explain":"中转时效(h)","width":"100","sortable":true},
		                			  			 {"field":"area_lv","title":"级别","explain":"级别","hidden":true,"width":"100","sortable":true},
		                			  			 {"field":"sndhsj","title":"市内到货时间","explain":"市内到货时间","width":"100","sortable":true},
		                			  			 {"field":"zzdhsj","title":"中转到货时间","explain":"中转到货时间","width":"100","sortable":true},
		                			  			 {"field":"qsscts","title":"签收上传天数","explain":"签收上传天数","width":"100","sortable":true},
		                			  			 
		                			  	  ]

		                	},
		                	{"id":"selectXLITEM","name":"线路明细信息",
		                	  	"columns":[ 
		                	  	           		{"field":"line_code","title":"线路代码","width":"100","hidden":true,"editor":"text","sortable":true},
		                	  	           		{"field":"ddwd_code","title":"网点代码","width":"100","hidden":true,"sortable":true},
												{"field":"net_name","title":"网点名称","width":"200","sortable":true,"editor":{
													"type":'combogrid',
	                								"options":{
//	                								"options":{
	                									//'valueField':'code',
	                									//'textField':'name',
	                									idField:'net_name',    
	                								    textField:'net_name',
	                									'url':'jlquery/select.do',
	                								    'queryParams': {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFCYS.selectWD\"}]"},
	                								    'columns':[[    
	                								              {field:'net_code',title:'部门代码',width:100,checkbox:true},    
	                								              {field:'net_name',title:'部门名称',width:100}      
	                								          ]],
	                								    'loadFilter': function (data) {
	                								    	var data = data.data;
	                								    	//return data;
	                								    	/*alert(JSON.stringify(data));*/
	                								    	var rows={};
	                								    	rows["total"] = data.length;
	                								    	rows["rows"] = data;
	                								    	return rows;
	                								    },onSelect: function(index, row){
	                								    	var row2=$('#d_SX').datagrid('getSelected');
	                								    	row2.ddwd_code=row.net_code;
	                								    }
	                								}
								
												}},
												{"field":"jhsx","title":"计划时效","width":"100","editor":"text","sortable":true}
												
		               			  			 
		                			  	  ]

		                	},
		                	{"id":"selectCYS","name":"承运商信息",
		                	  	"columns":[ 
												{"field":"shp_code","title":"承运商代码","width":"200","sortable":true,"sortOrder":"asc"},
												{"field":"shp_name","title":"承运商名称","width":"200","sortable":true},
												{"field":"lxr","title":"联系人","width":"200","sortable":true},
												{"field":"tel","title":"电话","width":"200","sortable":true},
												{"field":"sfjsname","title":"是否结算","width":"200","sortable":true},
												{"field":"addr","title":"地址","width":"500","sortable":true},
												{"field":"sfjs","title":"是否结算","width":"500","sortable":true,"hidden":true},
												{"field":"sd","title":"sd","width":"100","sortable":true,"hidden":true},
		                			  			{"field":"sd_cn","title":"税点","width":"100","sortable":true},
		                			  			{"field":"fptt","title":"fptt","width":"100","sortable":true,"hidden":true},
		                			  			{"field":"fptt_cn","title":"发票抬头","width":"100","sortable":true},
		                			  			{"field":"yhht","title":"yhht","width":"100","sortable":true,"hidden":true},
		                			  			{"field":"yhht_cn","title":"银行行号","width":"100","sortable":true},
		                			  			{"field":"yhzh","title":"yhzh","width":"100","sortable":true,"hidden":true},
		                			  			{"field":"yhzh_cn","title":"银行账号","width":"100","sortable":true},
		                			  			{"field":"khh","title":"khh","width":"100","sortable":true,"hidden":true},
		                			  			{"field":"khh_cn","title":"开户行","width":"100","sortable":true},
		                			  			{"field":"khhdz","title":"khhdz","width":"100","sortable":true,"hidden":true},
		                			  			{"field":"khhdz_cn","title":"开户行地址","width":"100","sortable":true}
												
		                			  	  ]

		                	},
		                	{"id":"selectZYCOMP","name":"承运公司信息",
		                	  	"columns":[ 
												{"field":"code","title":"承运商代码","width":"200","sortable":true,"sortOrder":"asc"},
												{"field":"name","title":"承运商名称","width":"200","sortable":true},
												{"field":"net_name","title":"网点名称","width":"200","sortable":true},
												{"field":"net_code","title":"网点代码","width":"200","hidden":true,"sortable":true},
												{"field":"lxr","title":"联系人","width":"200","sortable":true},
												{"field":"tel","title":"电话","width":"200","sortable":true},
												{"field":"addr","title":"地址","width":"500","sortable":true},
		                	
		                			  	  ]

		                	},
		                	{"id":"selectCYSITEM","name":"承运商时效信息",
		                	  	"columns":[ 
												{"field":"fhwd","title":"fhwd","width":"200","hidden":true,"sortable":true},
												{"field":"fhwd_cn","title":"发货网点","width":"200","editor":{
													"type":'combogrid',
	                								"options":{
														'url':'jlquery/select.do',
														'queryParams': {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFCYS.selectWD\"}]"},	
	                								    idField:'net_name',    
	                								    textField:'net_name',
	                								    'columns':[[    
	                								              {field:'net_code',title:'部门代码',width:100},    
	                								              {field:'net_name',title:'部门名称',width:100} 	
	                								          ]],
			                								   'loadFilter': function (data) {
				                								    	var data = data.data;
				                								    	var rows={};
				                								    	rows["total"] = data.length;
				                								    	rows["rows"]= data;
				                								    	return rows;
				                								    	
			                								    },
			                								    'onSelect': function(index, row){
			                								    	var row2 =$("#d_CYSITEM").datagrid("getSelected"); 
			                								    	row2.fhwd=row.net_code;		                								    	
			                								    }
	                								}
												},"sortable":true},
												{"field":"ddwd","title":"fhwd","width":"200","hidden":true,"sortable":true},
												{"field":"ddwd_cn","title":"到达网点","width":"200","editor":{
													"type":'combogrid',
	                								"options":{
														'url':'jlquery/select.do',
														'queryParams': {"json":"[{\"dataType\":\"Json\",\"sqlid\":\"CFCYS.selectWD\"}]"},	
	                								    idField:'net_name',    
	                								    textField:'net_name',
	                								    'columns':[[    
	                								              {field:'net_code',title:'部门代码',width:100},    
	                								              {field:'net_name',title:'部门名称',width:100} 	
	                								          ]],
			                								   'loadFilter': function (data) {
				                								    	var data = data.data;
				                								    	var rows={};
				                								    	rows["total"] = data.length;
				                								    	rows["rows"]= data;
				                								    	return rows;
				                								    	
			                								    },
			                								    'onSelect': function(index, row){
			                								    	var row2 =$("#d_CYSITEM").datagrid("getSelected"); 
			                								    	row2.ddwd=row.net_code;		                								    	
			                								    }
	                								}
												},"sortable":true},
												{"field":"bzsx","title":"标准时效(h)","width":"200","editor":"text","sortable":true}
		                	
		                			  	  ]

		                	},
		                	{"id":"selectCL","name":"车辆信息",
		                	  	"columns":[
		                			  			 {"field":"car_num","title":"车牌号","width":"100","sortable":true,"sortOrder":"asc"},
		                			  			 {"field":"flag","title":"flag","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"flag_cn","title":"车辆类型","width":"100","sortable":true},
		                			  			 {"field":"shp_code","title":"shp_code","width":"100","sortable":true,"hidden":true},
		                			  			 {"field":"shp_name","title":"承运商名称","width":"300","sortable":true},
		                			  			 {"field":"c_long","title":"车长(m)","width":"100","sortable":true},
		                			  			 {"field":"c_width","title":"车宽(m)","width":"100","sortable":true},
		                			  			 {"field":"c_height","title":"车高(m)","width":"100","sortable":true},
		                			  			 {"field":"c_volume","title":"承载体积(m³)","width":"100","sortable":true},
		                			  			 {"field":"driver","title":"driver","width":"200","sortable":true,"hidden":true},
		                			  			 {"field":"driver_name","title":"司机","width":"200","sortable":true},
		                			  			 {"field":"tel","title":"联系电话","width":"200","sortable":true}
		                			  			 
		                			  	  ]

		                	},
		                	{"id":"selectSJZD","name":"数据字典",
		                	  	"columns":[
		                			  			 {"field":"tab_name","title":"数据库表名","width":"100","sortable":true},
		                			  			 {"field":"name","title":"表名","width":"100","sortable":true}
		                			  			
		                			  			 
		                			  	  ]
		                	},
		                	{"id":"selectSJZDITEM","name":"数据字典",
		                	  	"columns":[
		                			  			 {"field":"code","title":"代码","width":"100","sortable":true},
		                			  			 {"field":"name","title":"名称","width":"100","sortable":true}
		                			  	  ]

		                	},
		                	{"id":"selectXTGG","name":"系统日主",
		                	  	"columns":[
		                	  	           		{"field":"id","title":"id","width":"100","sortable":true,"hidden":true},
		                			  			{"field":"title","title":"标题","width":"350","sortable":true},
		                			  			{"field":"peop_name","title":"发布人","width":"100","sortable":true},
		                			  			{"field":"lrwd","title":"lrwd","width":"100","sortable":true,"hidden":true},
		                			  			{"field":"net_name","title":"发布网点","width":"100","sortable":true},
		                			  			{"field":"lrrq","title":"发布日期","width":"150","sortable":true,"sortOrder":"asc"},
		                			  			{"field":"main","title":"内容","width":"900","sortable":true},
		                			  	  ]

		                	},
		                	{"id":"selectXLKHBZ","name":"线路考核标准查询",
		                	  	"columns":[		
		                	  	           		{"field":"line_code","title":"线路编码","width":"150","sortable":true,"hidden":true},
		                	  	           		{"field":"line_name","title":"线路","width":"150","sortable":true},
		                			  			{"field":"pzsj","title":"配载时间","width":"350","sortable":true},
		                			  			{"field":"fcsj","title":"发车时间","width":"100","sortable":true},
		                			  			{"field":"dcsj","title":"到车时间","width":"100","sortable":true,"hidden":true},
		                			  			{"field":"yxsj","title":"运行时长(分钟)","width":"100","sortable":true},
		                			  			{"field":"flag","title":"考核编码","width":"150","sortable":true,"hidden":true},
		                			  			{"field":"flag_zh","title":"是否考核","width":"900","sortable":true}
		                			  	  ]

		                	}
		

		                ];
		return column_header;
}
