function getColumns(){
		var column_header= [
		                	{"id":"selectRYXX","name":"人员信息",
		                	  	"columns":[
		                			  			 {"field":"person_id","title":"人员编码","explain":"人员编号","width":"100","sortable":true,"sortOrder":"asc","checkbox":true},
		                			  			 {"field":"person_name","title":"姓名","explain":"姓名","width":"100","sortable":true},
		                			  			 {"field":"dept_name","title":"部门","explain":"部门","width":"100","sortable":true},
		                			  			 {"field":"p_name","title":"人员职位","explain":"人员职位","width":"100","sortable":true},
		                			  			 {"field":"net_name","title":"所属网点","explain":"所属网点","width":"100","sortable":true},
		                			  			 {"field":"tel","title":"电话","explain":"电话","width":"100","sortable":true},
		                			  			 {"field":"lyrq","title":"入职日期","explain":"入职日期","width":"100","sortable":true},
		                			  			 {"field":"zz_flag_cn","title":"是否在职","explain":"是否在职","width":"70","sortable":true,"formatter": RyxxIsZZ},
		                			  			 {"field":"czrq","title":"辞职日期","explain":"辞职日期","width":"100","sortable":true},
		                			  			 {"field":"intro_name","title":"介绍人","explain":"介绍人","width":"100","sortable":true},
		                			  			 {"field":"bc_cn","title":"班次","explain":"班次","width":"100","sortable":true,"formatter": RyxxBc},
		                			  			 {"field":"cblx_cn","title":"参保类型","explain":"参保类型","width":"100","sortable":true,"formatter": RyxxCblx},
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
		               			  			     {"field":"qx1","title":"新增","width":"100","sortable":true,"align":"center","editor":{type:'checkbox',options:{on:'<font color="red">P</font>',off:''}}},
		               			  			     {"field":"qx2","title":"修改","width":"100","sortable":true,"align":"center","editor":{type:'checkbox',options:{on:'P',off:''}}},
		               			  			     {"field":"qx3","title":"删除","width":"100","sortable":true,"align":"center","editor":{type:'checkbox',options:{on:'P',off:''}}},
		               			  			     {"field":"qx4","title":"初审","width":"100","sortable":true,"align":"center","editor":{type:'checkbox',options:{on:'P',off:''}}},
		               			  			     {"field":"qx4","title":"复审","width":"100","sortable":true,"align":"center","editor":{type:'checkbox',options:{on:'P',off:''}}}
		                			  	  ]
		                	},
		                	{"id":"selectWD","name":"网点查询",
		                		"columns":[
	                		           		{"field":"code","title":"网点编码","width":"100","checkbox":true},
	                		           		{"field":"name","title":"网点名称","width":"200"},
	                		           		{"field":"_parentId","title":"上级代码","width":"100","hidden":true},
	                		           		{"field":"lv","title":"级别","width":"100","hidden":true}
	                		           	]
		                	},
		                	{"id":"selectHCSJKH","name":"回场时间考核",
		                		"columns":[
	                		           		{"field":"line_code","title":"线路代码","width":"100","hidden":true},
	                		           		{"field":"line_name","title":"线路名称","width":"100"},
	                		           		{"field":"dcsj","title":"回场考核时间","width":"100"},
	                		           		{"field":"hckh_flag","title":"是否考核","width":"100","hidden":true},
	                		           		{"field":"kh_flag","title":"是否考核","width":"100"}
	                		           	]
		                	},
		                	{"id":"selectBMWDCD","name":"部门网点查询",
		                		"columns":[
	                		           		{"field":"code","title":"网点编码","width":"100","checkbox":true},
	                		           		{"field":"name","title":"网点名称","width":"200"},
	                		           		{"field":"_parentId","title":"上级代码","width":"100","hidden":true},
	                		           		{"field":"level","title":"级别","width":"100","hidden":true}
	                		           	]
		                	},
		                	{"id":"selectTreeMenu","name":"菜单信息",
		                		"columns":[
		                		           		{"field":"code","title":"菜单编码","width":"100","checkbox":true},
		                		           		{"field":"name","title":"菜单名称","width":"200"},
		                		           		{"field":"_parentId","title":"上级代码","width":"100","hidden":true},
		                		           		{"field":"level","title":"级别","width":"100","hidden":true},
//		                		           		{"field":"alqx","title":"按钮权限","width":"200","editor":{
//	                								"type":'combogrid',
//	                								"options":{
//	                									//'valueField':'code',
//	                									//'textField':'name',
//	                									idField:'name',    
//	                								    textField:'name',
//	                								    multiple: true,
//	                									'url':'/cflib/grid/json/alqx.json',
//	                								    'columns':[[    
//	                								              {field:'code',title:'新增代码',width:100,checkbox:true},    
//	                								              {field:'name',title:'权限',width:100}      
//	                								          ]],
//	                								    'loadFilter': function (data) {
//	                								    	//return data;
//	                								    	/*alert(JSON.stringify(data));*/
//	                								    	var rows={};
//	                								    	rows["total"] = data.length;
//	                								    	rows["rows"] = data;
//	                								    	return rows;
//	                								    },onSelect: function(index, row){
//	                								    	//alert(JSON.stringify(row));
//	                								    }
//	                								}
//	                							}}
		                		           ]
		                	},
		                	{"id":"selectTreeBMMenu","name":"部门菜单信息",
		                		"columns":[
		                		           		{"field":"code","title":"菜单编码","width":"100","checkbox":true},
		                		           		{"field":"name","title":"菜单名称","width":"200"},
		                		           		{"field":"_parentId","title":"上级代码","width":"100","hidden":true},
		                		           		{"field":"level","title":"级别","width":"100","hidden":true},
		                		           		{"field":"alqx","title":"按钮权限","width":"200","hidden":true
//		                		           			,"editor":{
//	                								"type":'combogrid',
//	                								"options":{
//	                									//'valueField':'code',
//	                									//'textField':'name',
//	                									idField:'name',    
//	                								    textField:'name',
//	                								    multiple: true,
//	                									'url':'/cflib/grid/json/alqx.json',
//	                								    'columns':[[    
//	                								              {field:'code',title:'新增代码',width:100,checkbox:true},    
//	                								              {field:'name',title:'权限',width:100}      
//	                								          ]],
//	                								    'loadFilter': function (data) {
//	                								    	//return data;
//	                								    	/*alert(JSON.stringify(data));*/
//	                								    	var rows={};
//	                								    	rows["total"] = data.length;
//	                								    	rows["rows"] = data;
//	                								    	return rows;
//	                								    },onSelect: function(index, row){
//	                								    	//alert(JSON.stringify(row));
//	                								    }
//	                								}
//	                							}
		                		           		}
		                		           ]
		                	},
		                	{"id":"selectTSQX","name":"特殊权限",
		                		"columns":[
		                		           		{"field":"qxcode","title":"权限编码","width":"100","checkbox":true},
		                		           		{"field":"qxname","title":"权限名称","width":"200"},
		                		           		{"field":"code","title":"菜单编码","width":"100","hidden":true},
		                		           		{"field":"name","title":"所属菜单","width":"100"}
		                		           ]
		                	},
		                	{"id":"selectTreeMenus","name":"菜单信息",
		                		"columns":[
		                		           		{"field":"code","title":"菜单编码","width":"100","hidden":true},
		                		           		{"field":"name","title":"菜单名称","width":"200"},
		                		           		{"field":"_parentId","title":"上级代码","width":"100","hidden":true},
		                		           		{"field":"level","title":"级别","width":"100","hidden":true},
		                		           ]
		                	}
		                ];
		return column_header;
}
