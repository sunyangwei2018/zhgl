function getColumns(){
		var column_header= [
		                	{"id":"selectBBQD","name":"扫描清单查询",
		                	  	"columns":[
	                			  			 {"field":"taskno","title":"派车单号","width":"130","sortable":true},
	                			  			 {"field":"billno","title":"运单号","width":"130","sortable":true},
	                			  			 {"field":"boxno","title":"箱号","width":"130","sortable":true},
	                			  			 {"field":"pda_code","title":"PDA编号","width":"130","sortable":true},
	                			  			 {"field":"czr","title":"扫描人","width":"130","sortable":true},
	                			  			 {"field":"scantime","title":"扫描时间","width":"130","sortable":true},
	                			  			 {"field":"updatetime","title":"上传时间","width":"130","sortable":true},
	                			  			 {"field":"czwd","title":"操作网点","width":"130","sortable":true},
	                			  			 {"field":"scantype","title":"扫描类型","width":"130","sortable":true},
	                			  			 {"field":"kwbh","title":"库位","width":"260","sortable":true},
	                			  			 {"field":"flag_cn","title":"正常数据","width":"130","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectKCYSBB","name":"靠车用时统计报表",
		                	  	"columns":[
	                			  			 {"field":"line_name","title":"线路名称","width":"130","sortable":true},
	                			  			 {"field":"line_code","title":"线路名称","width":"130","hidden":true,"sortable":true},
	                			  			 {"field":"yxcs","title":"运行次数","width":"130","sortable":true},
	                			  			 {"field":"wdcs","title":"晚点次数","width":"130","sortable":true},
	                			  			 {"field":"hczdl","title":"回场准点率(%)","width":"130","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectKCITEM","name":"靠车用时明细表",
		                	  	"columns":[
		                	  	           	 {"field":"taskno","title":"派车单号","width":"130","sortable":true},
		                	  	             {"field":"line_name","title":"线路名称","width":"130","sortable":true},
		                	  	           	 {"field":"fcrq","title":"发车日期","width":"130","sortable":true},
	                			  			 {"field":"dcrq","title":"到车扫描时间","width":"130","sortable":true},
	                			  			 {"field":"dcsj","title":"回场时间考核标准","width":"130","sortable":true},
	                			  			 {"field":"sfwd","title":"是否晚点","width":"130","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectSHVIP","name":"上海VIP客户扫描表",
		                	  	"columns":[
	                			  			 {"field":"s_name","title":"客户","width":"130","sortable":true},
	                			  			 {"field":"cus_code","title":"cus_code","width":"130","hidden":true,"sortable":true},
	                			  			 {"field":"boxes","title":"总数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"thcount","title":"提货扫描数量","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"thl","title":"提货扫描率(%)","width":"120","sortable":true},
	                			  			 {"field":"rzcount","title":"入站扫描数量","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"rzl","title":"入站扫描率(%)","width":"120","sortable":true},
	                			  			 {"field":"gxcount","title":"干线配载扫描数量","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"boxes_gx","title":"需要干线配载数量","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"gxl","title":"干线配载扫描率(%)","width":"130","sortable":true},
	                			  			 {"field":"pszycount","title":"派送转运扫描数量","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"boxes_pszy","title":"需要派送转运数量","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"pszyl","title":"派送转运扫描率(%)","width":"130","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectJCCSM","name":"进出场扫描率报表",
		                	  	"columns":[
											{"field":"line_name","title":"线路名称","width":"130","sortable":true},
											{"field":"line_code","title":"line_code","width":"120","sortable":true,"hidden":true},
											{"field":"pcdcount","title":"派车单数量","width":"120","sortable":true},
											{"field":"fccount","title":"发车数量","width":"120","sortable":true},
											{"field":"dccount","title":"到车数量","width":"120","sortable":true},
											{"field":"fcl","title":"发车扫描率(%)","width":"120","sortable":true},
											{"field":"rzl","title":"到车扫描率(%)","width":"120","sortable":true}     
	                			  	  ]
		                	},
		                	{"id":"selectXLXXBB","name":"线路详细报表",
		                	  	"columns":[
											{"field":"line_name","title":"线路名称","width":"130","sortable":true},
											{"field":"taskno","title":"派车单号","width":"125","sortable":true},
											{"field":"outrq","title":"发车时间","width":"125","sortable":true},  
											{"field":"fcczr","title":"发车操作人","width":"125","sortable":true},
											{"field":"inrq","title":"到车时间","width":"125","sortable":true},
											{"field":"dzczr","title":"到车操作人","width":"125","sortable":true},
											{"field":"net_name","title":"操作网点","width":"125","sortable":true},
											{"field":"car_num","title":"车牌号","width":"120","sortable":true},
											{"field":"driver","title":"司机","width":"120","sortable":true},
											{"field":"tel","title":"电话","width":"125","sortable":true},
											{"field":"shp_name","title":"承运商","width":"120","sortable":true},
	                			  	  ]
		                	},
		                	{"id":"selectVIPXHITEM","name":"上海VIP客户扫描表",
		                	  	"columns":[
											{"field":"billno","title":"运单号","width":"120","sortable":true},
											{"field":"boxno","title":"箱号","width":"120","sortable":true},
											{"field":"smr","title":"扫描人","width":"120","sortable":true},
											{"field":"scantime","title":"扫描时间","width":"120","sortable":true},
											{"field":"lxname","title":"扫描类型","width":"120","sortable":true},
											{"field":"net_name","title":"网点","width":"120","sortable":true}     
	                			  	  ]
		                	},
		                	{"id":"selectVIPYDITEM","name":"上海VIP客户扫描表",
		                	  	"columns":[
		                	  	           	{"field":"s_name","title":"客户","width":"105","sortable":true},
		                	  	           	{"field":"cus_code","title":"cus_code","width":"130","hidden":true,"sortable":true},
		                	  	           	{"field":"billno","title":"运单号","width":"120","sortable":true},
		                	  	           	{"field":"acceptnet","title":"到达网点","width":"120","sortable":true},
		                	  	           	{"field":"lrrq","title":"录单日期","width":"120","sortable":true},
		                	  	           	{"field":"boxes","title":"总数","width":"105","sortable":true,"sum":1},
		                	  	           	{"field":"thcount","title":"提货扫描数量","width":"105","sortable":true,"sum":1,
		                	  	           		"formatter": function(value,row,index){
		                	  	           			return '<a href="#" onclick=SHVIPSMBB.getTHITEM("'+row.cus_code+'","'+row.billno+'")>'+row.thcount+'</a>  '
		                	  	           		}},
		                	  	           		{"field":"rzcount","title":"入站扫描数量","width":"107","sortable":true,"sum":1,
		                	  	           			"formatter": function(value,row,index){
		                	  	           				return '<a href="#" onclick=SHVIPSMBB.getTHXHITEM("'+row.cus_code+'","'+row.billno+'","2")>'+row.rzcount+'</a>  '
		                	  	           		}},
		                	  	           		{"field":"gxcount","title":"干线配载扫描数量","width":"107","sortable":true,"sum":1,
		                	  	           			"formatter": function(value,row,index){
		                	  	           				return '<a href="#" onclick=SHVIPSMBB.getTHXHITEM("'+row.cus_code+'","'+row.billno+'","4")>'+row.gxcount+'</a>  '
		                	  	           		}},
		                	  	           		{"field":"pszycount","title":"派送转运扫描数量","width":"107","sortable":true,"sum":1,
		                	  	           			"formatter": function(value,row,index){
		                	  	           				return '<a href="#" onclick=SHVIPSMBB.getPSZYXHITEM("'+row.cus_code+'","'+row.billno+'")>'+row.pszycount+'</a>  '
		                	  	           		}} 
		                	  	           	]
		                	},
		                	{"id":"selectYDJDSJ","name":"运单跟踪",
		                		"columns":[/*[{"title":"A", "width":"100","align":"center","colspan":1},
		                		           {"title":"B","colspan":3},
		                		           {"title":"C","colspan":2},
		                		           {"title":"D","colspan":24},
		                		           {"title":"E","colspan":4},
		                		           {"title":"F","colspan":4},
		                		           {"title":"G","colspan":4}
		                		           ],
		                		           [*/
		                		           //运单信息
	                		           		{"field":"billno","title":"运单号","width":"100","sortable":true,"sortOrder":"asc"},
	                		           		{"field":"cusno","title":"客户单号","width":"100","sortable":true},
	                		           		{"field":"state","title":"运单状态","width":"80","sortable":true},
	                		           		{"field":"nownet","title":"当前网点","width":"100","sortable":true},
	                		           		{"field":"postdate","title":"托运日期","width":"80","sortable":true},
	                		           		{"field":"postzone","title":"发货地","width":"160","sortable":true},
	                		           		{"field":"postnet","title":"发货网点","width":"100","sortable":true},
	                		           		{"field":"postdw","title":"发货单位","width":"100","sortable":true},
	                		           		{"field":"postaddr","title":"发货地址","width":"150","sortable":true},
	                		           		{"field":"posttel","title":"发货电话","width":"100","sortable":true},
	                		           		{"field":"postman","title":"发货人","width":"60","sortable":true},
	                		           		{"field":"acceptzone","title":"到达地","width":"160","sortable":true},
	                		           		{"field":"acceptnet","title":"到达网点","width":"100","sortable":true},
	                		           		{"field":"acceptdw","title":"收货单位","width":"100","sortable":true},
	                		           		{"field":"acceptaddr","title":"收货地址","width":"150","sortable":true},
	                		           		{"field":"accepttel","title":"收货电话","width":"100","sortable":true},
	                		           		{"field":"acceptman","title":"收货人","width":"60","sortable":true},
	                		           		{"field":"boxes","title":"箱数","width":"80","sortable":true,"sum":1},
	                		           		{"field":"duals","title":"双数","width":"80","sortable":true,"sum":1},
	                		           		{"field":"packages","title":"包数","width":"80","sortable":true,"sum":1},
	                		           		{"field":"volume","title":"体积","width":"80","sortable":true,"sum":1},
	                		           		{"field":"cus_name","title":"客户","width":"130","sortable":true},
	                		           		{"field":"hwlb","title":"货物类别","width":"100","sortable":true},
	                		           		{"field":"jjfs","title":"计价方式","width":"100","sortable":true},
	                		           		{"field":"smjz","title":"声明价值","width":"100","sortable":true},
	                		           		{"field":"fkfs","title":"付款方式","width":"100","sortable":true},
	                		           		{"field":"postfee","title":"运费","width":"100","sortable":true,"sum":1},
	                		           		{"field":"memo","title":"备注","width":"150","sortable":true},
	                		           		//提货
	                		           		{"field":"th","title":"提货派车单","width":"120","sortable":true},
	                		           		{"field":"th_time","title":"提货时间","width":"120","sortable":true},
	                		           		{"field":"th_wd","title":"提货网点","width":"120","sortable":true},
	                		           		//录单
	                		           		{"field":"lrrq","title":"录单时间","width":"120","sortable":true},
	                		           		{"field":"peop_name","title":"录单人","width":"100","sortable":true},
	                		           		
	                		           		//干线1
	                		           		{"field":"pz1","title":"第一次配载派车单","width":"120","sortable":true},
	                		           		{"field":"pz1_wd","title":"第一次配载网点","width":"120","sortable":true},
	                		           		{"field":"pz1_time","title":"第一次配载时间","width":"120","sortable":true},
	                		           		{"field":"fc1_time","title":"第一次发车时间","width":"120","sortable":true},
	                		           		{"field":"dc1_time","title":"第一次到车时间","width":"120","sortable":true},
	                		           		{"field":"xh1_time","title":"第一次卸货时间","width":"120","sortable":true},
	                		           		//干线2
	                		           		{"field":"pz2","title":"第二次配载派车单","width":"120","sortable":true},
	                		           		{"field":"pz2_wd","title":"第二次配载网点","width":"120","sortable":true},
	                		           		{"field":"pz2_time","title":"第二次配载时间","width":"120","sortable":true},
	                		           		{"field":"fc2_time","title":"第二次发车时间","width":"120","sortable":true},
	                		           		{"field":"dc2_time","title":"第二次到车时间","width":"120","sortable":true},
	                		           		{"field":"xh2_time","title":"第二次卸货时间","width":"120","sortable":true},
	                		           		//干线3
	                		           		{"field":"pz3","title":"第三次配载派车单","width":"120","sortable":true},
	                		           		{"field":"pz3_wd","title":"第三次配载网点","width":"120","sortable":true},
	                		           		{"field":"pz3_time","title":"第三次配载时间","width":"120","sortable":true},
	                		           		{"field":"fc3_time","title":"第三次发车时间","width":"120","sortable":true},
	                		           		{"field":"dc3_time","title":"第三次到车时间","width":"120","sortable":true},
	                		           		{"field":"xh3_time","title":"第三次卸货时间","width":"120","sortable":true},
	                		           		//干线4
	                		           		{"field":"pz4","title":"第四次配载派车单","width":"120","sortable":true},
	                		           		{"field":"pz4_wd","title":"第四次配载网点","width":"120","sortable":true},
	                		           		{"field":"pz4_time","title":"第四次配载时间","width":"120","sortable":true},
	                		           		{"field":"fc4_time","title":"第四次发车时间","width":"120","sortable":true},
	                		           		{"field":"dc4_time","title":"第四次到车时间","width":"120","sortable":true},
	                		           		{"field":"xh4_time","title":"第四次卸货时间","width":"120","sortable":true},
	                		           		//派送/转运
	                		           		{"field":"ps","title":"派送派车单","width":"120","sortable":true},
	                		           		{"field":"pspz_time","title":"派送配载时间","width":"120","sortable":true},
	                		           		{"field":"zy_comp","title":"转运承运商","width":"150","sortable":true},
	                		           		{"field":"zy_time","title":"转运时间","width":"120","sortable":true},
	                		           		//签收
	                		           		{"field":"signman","title":"签收人","width":"100","sortable":true},
	                		           		{"field":"signdate","title":"签收时间","width":"120","sortable":true},
	                		           		{"field":"signtype","title":"签收方式","width":"80","sortable":true},
	                		           		{"field":"signnet","title":"签收网点","width":"100","sortable":true},
	                		           		//图片上传/异常件  
	                		           		{"field":"ycj","title":"异常件","width":"100","sortable":true},
	                		           		{"field":"ycjnr","title":"异常件内容","width":"200","sortable":true},
	                		           		{"field":"pic","title":"图片是否上传","width":"150","sortable":true},
	                		           		{"field":"picscrq","title":"图片上传日期","width":"130","sortable":true},
	                		           	]
		                	},
		                	{"id":"selectYDJDSJ2","name":"运单跟踪",
		                		"columns":[	//运单信息
	                		           		{"field":"billno","title":"运单号","width":"100","sortable":true,"sortOrder":"asc"},
	                		           		{"field":"cusno","title":"客户单号","width":"100","sortable":true},
	                		           		{"field":"state","title":"运单状态","width":"80","sortable":true},
	                		           		{"field":"nownet","title":"当前网点","width":"100","sortable":true},
	                		           		{"field":"postdate","title":"托运日期","width":"80","sortable":true},
	                		           		{"field":"postzone","title":"发货地","width":"160","sortable":true},
	                		           		{"field":"postnet","title":"发货网点","width":"100","sortable":true},
	                		           		{"field":"postdw","title":"发货单位","width":"100","sortable":true},
	                		           		{"field":"postaddr","title":"发货地址","width":"150","sortable":true},
	                		           		{"field":"posttel","title":"发货电话","width":"100","sortable":true},
	                		           		{"field":"postman","title":"发货人","width":"60","sortable":true},
	                		           		{"field":"acceptzone","title":"到达地","width":"160","sortable":true},
	                		           		{"field":"acceptnet","title":"到达网点","width":"100","sortable":true},
	                		           		{"field":"acceptdw","title":"收货单位","width":"100","sortable":true},
	                		           		{"field":"acceptaddr","title":"收货地址","width":"150","sortable":true},
	                		           		{"field":"accepttel","title":"收货电话","width":"100","sortable":true},
	                		           		{"field":"acceptman","title":"收货人","width":"60","sortable":true},
	                		           		{"field":"boxes","title":"箱数","width":"80","sortable":true,"sum":1},
	                		           		{"field":"duals","title":"双数","width":"80","sortable":true,"sum":1},
	                		           		{"field":"packages","title":"包数","width":"80","sortable":true,"sum":1},
	                		           		{"field":"volume","title":"体积","width":"80","sortable":true,"sum":1},
	                		           		{"field":"cus_name","title":"客户","width":"130","sortable":true},
	                		           		{"field":"hwlb","title":"货物类别","width":"100","sortable":true},
	                		           		{"field":"jjfs","title":"计价方式","width":"100","sortable":true},
	                		           		{"field":"smjz","title":"声明价值","width":"100","sortable":true},
	                		           		{"field":"fkfs","title":"付款方式","width":"100","sortable":true},
	                		           		{"field":"postfee","title":"运费","width":"100","sortable":true,"sum":1},
	                		           		{"field":"memo","title":"备注","width":"150","sortable":true},
	                		           		//提货
	                		           		{"field":"th","title":"提货派车单","width":"120","sortable":true},
	                		           		{"field":"th_time","title":"提货时间","width":"120","sortable":true},
	                		           		{"field":"th_wd","title":"提货网点","width":"120","sortable":true},
	                		           		//录单
	                		           		{"field":"lrrq","title":"录单时间","width":"120","sortable":true},
	                		           		{"field":"peop_name","title":"录单人","width":"100","sortable":true},
	                		           		
	                		           		//干线1
	                		           		{"field":"pz1","title":"配载派车单","width":"120","sortable":true},
	                		           		{"field":"pz1_wd","title":"配载网点","width":"120","sortable":true},
	                		           		{"field":"pz1_time","title":"配载时间","width":"120","sortable":true},
	                		           		{"field":"fc1_time","title":"发车时间","width":"120","sortable":true},
	                		           		{"field":"dc1_time","title":"到车时间","width":"120","sortable":true},
	                		           		{"field":"xh1_time","title":"卸货时间","width":"120","sortable":true},
	                		           		//派送/转运
	                		           		{"field":"ps","title":"派送派车单","width":"120","sortable":true},
	                		           		{"field":"ps_time","title":"派送配载时间","width":"120","sortable":true},
	                		           		{"field":"zy_comp","title":"转运承运商","width":"150","sortable":true},
	                		           		{"field":"zy_time","title":"转运时间","width":"120","sortable":true},
	                		           		//签收
	                		           		{"field":"signman","title":"签收人","width":"100","sortable":true},
	                		           		{"field":"signdate","title":"签收时间","width":"120","sortable":true},
	                		           		{"field":"signtype","title":"签收方式","width":"80","sortable":true},
	                		           		{"field":"signnet","title":"签收网点","width":"100","sortable":true},
	                		           		//图片上传/异常件  
	                		           		{"field":"ycj","title":"异常件","width":"100","sortable":true},
	                		           		{"field":"ycjnr","title":"异常件内容","width":"200","sortable":true},
	                		           		{"field":"pic","title":"图片是否上传","width":"150","sortable":true},
	                		           		{"field":"picscrq","title":"图片上传日期","width":"130","sortable":true},
	                		           	]
		                	},
		                	{"id":"selectThScan_WD","name":"提货扫描网点汇总",
		                	  	"columns":[
	                			  			 {"field":"net_code","title":"net_code","width":"150","sortable":true,"hidden":true},//
	                			  			 {"field":"czwd_name","title":"网点","width":"100","sortable":true},
	                			  			 {"field":"boxes","title":"运单总箱数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"smboxes","title":"提货扫描箱数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"sml","title":"扫描正确率","width":"100","sortable":true},
	                			  			 {"field":"sjsl","title":"扫描总数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"smzxl","title":"扫描执行率","width":"100","sortable":true},
	                			  			 {"field":"sbboxes","title":"市驳箱数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"ctboxes","title":"长途箱数","width":"100","sortable":true,"sum":1}
	                			  	  ]

		                	},
		                	{"id":"selectThScan_TASK","name":"提货扫描网点派车单汇总",
		                	  	"columns":[
	                			  			 {"field":"taskno","title":"派车单号","width":"100","sortable":true},
	                			  			 {"field":"line_name","title":"线路","width":"100","sortable":true},
	                			  			 {"field":"net_code","title":"net_code","width":"150","sortable":true,"hidden":true},
	                			  			 {"field":"czwd_name","title":"网点","width":"80","sortable":true},
	                			  			 {"field":"driver","title":"司机","width":"80","sortable":true},
	                			  			 {"field":"car_num","title":"车牌号","width":"80","sortable":true},
	                			  			 {"field":"tsh_peop","title":"提送货人","width":"100","sortable":true},
	                			  			 {"field":"boxes","title":"运单箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"smboxes","title":"提货扫描箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"sml","title":"提货扫描率","width":"80","sortable":true},
	                			  			 {"field":"sjsl","title":"扫描总数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"smzxl","title":"扫描执行率","width":"100","sortable":true},
	                			  			 {"field":"sbboxes","title":"市驳箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"ctboxes","title":"长途箱数","width":"80","sortable":true,"sum":1}
	                			  	  ]

		                	},
		                	{"id":"selectThScan_BILL","name":"提货扫描运单明细",
		                	  	"columns":[
	                			  			 {"field":"taskno","title":"派车单号","width":"100","sortable":true},
	                			  			 {"field":"line_name","title":"线路","width":"100","sortable":true},
	                			  			 {"field":"billno","title":"运单号","width":"150","sortable":true},
	                			  			 {"field":"czwd_name","title":"网点","width":"80","sortable":true},
	                			  			 {"field":"driver","title":"司机","width":"80","sortable":true},
	                			  			 {"field":"car_num","title":"车牌号","width":"80","sortable":true},
	                			  			 {"field":"tsh_peop","title":"提送货人","width":"100","sortable":true},
	                			  			 {"field":"boxes","title":"运单箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"smboxes","title":"提货扫描箱数","width":"80","sortable":true,"sum":1,
	                			  			  "formatter": function(value,row,index){
	                	  	           				return '<a style="color:red" href="#" onclick=ThScan.getTHXHITEM("'+row.taskno+'","'+row.billno+'")>'+row.smboxes+'</a>  '
	                	  	           			}
	                			  			 },
	                			  			 {"field":"sml","title":"提货扫描率","width":"80","sortable":true},
	                			  			 {"field":"sbboxes","title":"市驳箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"ctboxes","title":"长途箱数","width":"80","sortable":true,"sum":1}
	                			  	  ]

		                	},
		                	{"id":"selectXLKH","name":"线路考核统计",
		                		"columns":[		
		                		           	 {"field":"line_code","title":"线路编码","width":"150","sortable":true,"hidden":true,"sum":1},
	                			  			 {"field":"line_name","title":"线路","width":"150","sortable":true},
	                			  			 {"field":"yxcs","title":"运行次数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"pzwd","title":"配载晚点次数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"fcwd","title":"发车晚点次数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"dcwd","title":"到车晚点次数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"pzbl","title":"配载及时率(%)","width":"80","sortable":true},
	                			  			 {"field":"fcbl","title":"发车准点率(%)","width":"80","sortable":true},
	                			  			 {"field":"dcbl","title":"到车准点率(%)","width":"80","sortable":true},
	                			  			 {"field":"yxsj","title":"平均运行时长(分钟)","width":"120","sortable":true,"sum":1}
	                			  	  ]
		                	},
		                	{"id":"selectXLITEM","name":"线路考核明细",
		                		"columns":[
	                			  			 {"field":"taskno","title":"派车单号","width":"100","sortable":true},
	                			  			 {"field":"line_name","title":"线路","width":"150","sortable":true},
	                			  			 {"field":"pzsjbz","title":"配载考核标准","width":"150","sortable":true},
	                			  			 {"field":"pzrq","title":"实际配载时间","width":"150","sortable":true},
	                			  			 {"field":"fcsjbz","title":"发车考核标准","width":"150","sortable":true},
	                			  			 {"field":"fcrq","title":"实际发车时间","width":"150","sortable":true},
	                			  			 {"field":"dcsjbz","title":"到站考核标准","width":"150","sortable":true},
	                			  			 {"field":"dcrq","title":"实际到站时间","width":"150","sortable":true},
	                			  			 {"field":"jd","title":"节点数量","width":"80","sortable":true},
	                			  			 {"field":"pzwd","title":"配载是否晚点","width":"80","sortable":true},
	                			  			 {"field":"fcwd","title":"发车是否晚点","width":"80","sortable":true},
	                			  			 {"field":"dcwd","title":"到站是否晚点","width":"80","sortable":true},
	                			  			 {"field":"yxsj","title":"在途运行时长(分钟)","width":"120","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectRkScan","name":"入库扫描率",
		                	  	"columns":[
	                			  			 {"field":"type","title":"线路类型","width":"100","sortable":true},
	                			  			 {"field":"billonCount","title":"应扫描件数","width":"110","sortable":true},
	                			  			 {"field":"scanCount","title":"实际扫描总件数","width":"150","sortable":true},
	                			  			 {"field":"percent","title":"入库扫描率","width":"150","sortable":true}
	                			  	  ]

		                	},
		                	{"id":"selectRkScanInfo","name":"入库扫描详细信息",
		                	  	"columns":[
	                			  			 {"field":"taskno","title":"派车单号","width":"100","sortable":true},
	                			  			 {"field":"billno","title":"运单号","width":"110","sortable":true},
	                			  			 {"field":"boxno","title":"箱号","width":"150","sortable":true},
	                			  			 {"field":"peop_name","title":"扫描人","width":"150","sortable":true},
	                			  			 {"field":"scantime","title":"扫描时间","width":"150","sortable":true},
	                			  			 {"field":"net_name","title":"扫描网点","width":"150","sortable":true},
	                			  			 {"field":"name","title":"扫描类型","width":"150","sortable":true}
	                			  	  ]

		                	},
		                	{"id":"selectCkScans","name":"出库扫描率",
		                	  	"columns":[
	                			  			 {"field":"type","title":"线路类型","width":"100","sortable":true,"hidden":true},
	                			  			 {"field":"typename","title":"线路类型","width":"100","sortable":true},
	                			  			 {"field":"billonCount","title":"应扫描件数","width":"110","sortable":true},
	                			  			 {"field":"scanCount","title":"实际扫描总件数","width":"150","sortable":true},
	                			  			 {"field":"percent","title":"出库扫描率","width":"150","sortable":true}
	                			  	  ]

		                	},
		                	{"id":"selectCkScanTask","name":"派车单出库扫描信息",
		                	  	"columns":[
	                			  			 {"field":"taskno","title":"派车单号","width":"100","sortable":true},
	                			  			 {"field":"acceptnet","title":"到达网点","width":"100","sortable":true,"hidden":true},
	                			  			 {"field":"acceptnetname","title":"到达网点","width":"100","sortable":true},
	                			  			 {"field":"car_num","title":"车牌号","width":"100","sortable":true},
	                			  			 {"field":"line_name","title":"线路名称","width":"200","sortable":true},
	                			  			 {"field":"billcounts","title":"应扫描票数","width":"110","sortable":true,"sum":1},
	                			  			 {"field":"boxcounts","title":"应扫描件数","width":"150","sortable":true,"sum":1},
	                			  			 {"field":"scancounts","title":"实际扫描件数","width":"150","sortable":true,"sum":1},
	                			  			 {"field":"percent","title":"扫描率","width":"100","sortable":true}
	                			  	  ]

		                	},
		                	{"id":"selectCkScanInfo","name":"出库扫描详细信息",
		                	  	"columns":[
	                			  			 {"field":"billno","title":"运单号","width":"110","sortable":true},
	                			  			 {"field":"s_name","title":"客户","width":"150","sortable":true},
	                			  			 {"field":"boxes","title":"录单箱数","width":"150","sortable":true,"sum":1},
	                			  			 {"field":"gxpzsl","title":"干线配载扫描数量","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"pspzsl","title":"派送配载扫描数量","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"postnet","title":"始发网点","width":"150","sortable":true},
	                			  			 {"field":"thsl","title":"始发网点提货数量","width":"100","sortable":true,"sum":1},
	                			  	  ]

		                	},
		                	{"id":"selectKcBb","name":"库存",
		                	  	"columns":[
		                	  	           {"field":"acceptnet","title":"网点代码","width":"100","sortable":true,"hidden":true},
	                			  			 {"field":"net_name","title":"到达网点","width":"100","sortable":true},
	                			  			 {"field":"counts","title":"库存","width":"110","sortable":true},
	                			  			 {"field":"volume","title":"体积","width":"110","sortable":true},
	                			  			 {"field":"weight","title":"重量","width":"110","sortable":true},
	                			  			 {"field":"num","title":"票数","width":"110","sortable":true}
	                			  			
	                			  	  ]

		                	},
		                	{"id":"selectKcBillno","name":"网点运单信息",
		                	  	"columns":[
	                			  			 {"field":"billno","title":"运单号","width":"200","sortable":true},
	                			  			 {"field":"postzonename","title":"发货地","width":"110","sortable":true},
	                			  			 {"field":"postnetname","title":"发货网点","width":"110","sortable":true},
	                			  			 {"field":"acceptzonename","title":"到达地","width":"110","sortable":true},
	                			  			 {"field":"acceptnetname","title":"到达网点","width":"110","sortable":true},
	                			  			 {"field":"statename","title":"状态","width":"110","sortable":true},
	                			  			 {"field":"boxes","title":"箱数","width":"110","sortable":true},
	                			  			 {"field":"duals","title":"双数","width":"110","sortable":true},
	                			  			 {"field":"package","title":"包数","width":"110","sortable":true},
	                			  			 {"field":"weight","title":"重量","width":"110","sortable":true},
	                			  			 {"field":"volume","title":"体积","width":"110","sortable":true},
	                			  			 {"field":"lrrq","title":"录入日期","width":"110","sortable":true}
	                			  			
	                			  	  ]

		                	},
		                	{"id":"selectCzScan","name":"网点PDA发货出站扫描",
		                	  	"columns":[
		                	  	           {"field":"type","title":"网点代码","width":"100","sortable":true,"hidden":true},
		                	  	           {"field":"glz_name","title":"管理组","width":"100","sortable":true},
	                			  			 {"field":"dq","title":"地区","width":"100","sortable":true},
	                			  			 {"field":"sf","title":"省份","width":"110","sortable":true},
	                			  			 {"field":"net_name","title":"网点名称","width":"110","sortable":true},
	                			  			 {"field":"wdlx_cn","title":"网点属性","width":"110","sortable":true},
	                			  			 {"field":"wdlb","title":"网点类别","width":"110","sortable":true},
	                			  			 {"field":"billonCount","title":"实际箱数","width":"110","sortable":true},
	                			  			 {"field":"scanCount","title":"出站箱数","width":"110","sortable":true},
	                			  			 {"field":"percent","title":"出站扫描率","width":"110","sortable":true},
	                			  			 {"field":"content","title":"PDA扫描异常件","width":"110","sortable":true}
	                			  			
	                			  	  ]

		                	},
		                	{"id":"selectCzScanInfo","name":"网点PDA发货出站扫描信息详细",
		                	  	"columns":[
		                	  	             {"field":"billno","title":"运单号","width":"150","sortable":true},
	                			  			 {"field":"czrq","title":"到车时间","width":"150","sortable":true},
	                			  			 {"field":"taskno","title":"派车单号","width":"130","sortable":true},
	                			  			 {"field":"cus_name","title":"客户名称","width":"110","sortable":true},
	                			  			 {"field":"postnetname","title":"发货网点","width":"110","sortable":true},
	                			  			 {"field":"postzonename","title":"始发站","width":"110","sortable":true},
	                			  			 {"field":"acceptnetname","title":"到达网点","width":"110","sortable":true},
	                			  			 {"field":"nownetname","title":"当前网点","width":"110","sortable":true},
	                			  			 {"field":"name","title":"当前状态","width":"110","sortable":true},
	                			  			 {"field":"boxes","title":"实际箱数","width":"80","sortable":true},
	                			  			 {"field":"scanCount1","title":"网点提货扫描箱数","width":"90","sortable":true},
	                			  			 {"field":"scanCount2","title":"网点出站扫描箱数","width":"90","sortable":true},
	                			  			 {"field":"content","title":"PDA扫描异常件备注","width":"150","sortable":true}
	                			  	  ]

		                	},
		                	{"id":"selectRzScan","name":"网点PDA到货入站扫描",
		                	  	"columns":[
		                	  	         {"field":"type","title":"网点代码","width":"100","sortable":true,"hidden":true},
		                	  	         {"field":"glz_name","title":"管理组","width":"100","sortable":true},
                			  			 {"field":"dq","title":"地区","width":"100","sortable":true},
                			  			 {"field":"sf","title":"省份","width":"110","sortable":true},
                			  			 {"field":"net_name","title":"网点名称","width":"110","sortable":true},
                			  			 {"field":"wdlx_cn","title":"网点属性","width":"110","sortable":true},
                			  			 {"field":"wdlb","title":"网点类别","width":"110","sortable":true},
                			  			 {"field":"billonCount","title":"实际箱数","width":"110","sortable":true},
                			  			 {"field":"scanCount","title":"入站箱数","width":"110","sortable":true},
                			  			 {"field":"percent","title":"入站扫描率","width":"110","sortable":true},
                			  			 {"field":"excep","title":"PDA扫描异常件数","width":"110","sortable":true}
	                			  			
	                			  	  ]

		                	},
		                	{"id":"selectRzScanInfo","name":"网点PDA到货入站扫描信息详细",
		                	  	"columns":[
		                	  	             {"field":"billno","title":"运单号","width":"150","sortable":true},
	                			  			 {"field":"czrq","title":"到车时间","width":"150","sortable":true},
	                			  			 {"field":"taskno","title":"派车单号","width":"130","sortable":true},
	                			  			 {"field":"cus_name","title":"客户名称","width":"110","sortable":true},
	                			  			 {"field":"postnetname","title":"发货网点","width":"110","sortable":true},
	                			  			 {"field":"postzonename","title":"始发站","width":"110","sortable":true},
	                			  			 {"field":"acceptnetname","title":"到达网点","width":"110","sortable":true},
	                			  			 {"field":"nownetname","title":"当前网点","width":"110","sortable":true},
	                			  			 {"field":"name","title":"当前状态","width":"110","sortable":true},
	                			  			 {"field":"boxes","title":"实际箱数","width":"80","sortable":true},
	                			  			 {"field":"scanCount1","title":"网点提货扫描箱数","width":"90","sortable":true},
	                			  			 {"field":"scanCount2","title":"网点入站扫描箱数","width":"90","sortable":true},
	                			  			 {"field":"content","title":"PDA扫描异常件备注","width":"150","sortable":true}
	                			  	  ]

		                	},
							{"id":"selectCLPZL","name":"车辆配载率报表",
		                    	"columns":[ 
		                    	           {"field":"taskno","title":"派车单号","width":"100","sortable":true,"sortOrder":"asc"},
		                    	           {"field":"statename","title":"状态","width":"100","sortable":true},
		                    	           {"field":"netname","title":"当前网点","width":"100","sortable":true},
		                    	           {"field":"ywlxname","title":"业务类型","width":"100","sortable":true},
		                    	           {"field":"cllxname","title":"车辆类型","width":"100","sortable":true},
		                    	           {"field":"car_num","title":"车牌号 ","width":"100","sortable":true},
		                    	           {"field":"driver","title":"司机 ","width":"70","sortable":true},
		                    	           {"field":"shp_name","title":"承运商 ","width":"90","sortable":true},
		                    	           {"field":"line_name","title":"线路 ","width":"130","sortable":true},
		                    	           {"field":"ps","title":"配载票数 ","width":"80","sortable":true,"sum":1},
		                    	           {"field":"items","title":"配载件数 ","width":"80","sortable":true,"sum":1},
		                    	           {"field":"volume","title":"配载体积 ","width":"80","sortable":true,"sum":1},
		                    	           {"field":"c_long","title":"车长 ","width":"70","sortable":true},
		                    	           {"field":"c_volume","title":"车载体积 ","width":"70","sortable":true},
		                    	           {"field":"lrr","title":"调度人 ","width":"70","sortable":true},
		                    	           {"field":"lrrq","title":"调度日期 ","width":"120","sortable":true},
		                    	           {"field":"clpzl","title":"车辆配载率(%) ","width":"120","sortable":true},
		                    	           ]
		                    },
		                    {"id":"selectXh","name":"卸货数量",
		                    	"columns":[ 
		                    	           {"field":"czrq","title":"时间","width":"100","sortable":true,"sortOrder":"asc"},
		                    	           {"field":"items","title":"卸货数量 ","width":"100","sortable":true,"sum":1}
		                    	           ]
		                    },
		                    {"id":"selectXhInfo","name":"派车单卸货数量",
		                    	"columns":[ 
		                    	           {"field":"taskno","title":"派车单","width":"100","sortable":true,"sortOrder":"asc"},
		                    	           {"field":"items","title":"卸货数量 ","width":"100","sortable":true},
		                    	           {"field":"car_num","title":"车牌号 ","width":"100","sortable":true},
		                    	           {"field":"shp_name","title":"承运商","width":"150","sortable":true},
		                    	           {"field":"line_name","title":"线路","width":"200","sortable":true},
		                    	           {"field":"counts","title":"卸货票数","width":"100","sortable":true},
		                    	           {"field":"volume","title":"卸货体积","width":"100","sortable":true},
		                    	           {"field":"weight","title":"卸货重量","width":"100","sortable":true}
		                    	           ]
		                    },
							{"id":"selectZXGXKHR","name":"线路考核明细",
		                		"columns":[
	                			  			 {"field":"taskno","title":"派车单号","width":"100","sortable":true},
	                			  			 {"field":"fyrq","title":"发运日期","width":"120","sortable":true},
	                			  			 {"field":"month","title":"月份","width":"100","sortable":true},
	                			  			 {"field":"cllx","title":"车辆类型","width":"100","sortable":true},
	                			  			 {"field":"net_name","title":"始发机构","width":"100","sortable":true},
	                			  			 {"field":"line_name","title":"线路名称","width":"120","sortable":true},
	                			  			 {"field":"car_num","title":"车牌号","width":"100","sortable":true},
	                			  			 {"field":"driver","title":"司机","width":"100","sortable":true},
	                			  			 {"field":"tel","title":"联系电话","width":"80","sortable":true},
	                			  			 {"field":"items","title":"配载件数","width":"120","sortable":true},
	                			  			 {"field":"zcddsj","title":"装车完毕打单时间","width":"120","sortable":true},
	                			  			 {"field":"fcsj","title":"门卫扫描发车时间","width":"120","sortable":true},
	                			  			 {"field":"zcsj","title":"滞场时间(分钟)","width":"100","sortable":true},
	                			  			 {"field":"sfyw","title":"是否滞仓","width":"120","sortable":true},
	                			  			 {"field":"xllx","title":"线路类型","width":"100","sortable":true},
	                			  			 //第一站
		                		           	{"field":"net_name1","title":"第一站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj1","title":"微信定位时间(1)","width":"120","sortable":true},
		                		           	{"field":"xtrq1","title":"TMS系统时间(1)","width":"120","sortable":true},
		                		           	{"field":"jhsx1","title":"计划时效(1)","width":"120","sortable":true},
		                		           	{"field":"xhsj1","title":"中途卸货时间(1)","width":"130","sortable":true},
		                		           	{"field":"yjddsj1","title":"预计到达时间(1)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw1","title":"是否到达延误(1)","width":"130","sortable":true},
		                		           	{"field":"ywsj1","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj1","title":"实际运输时长(小时)","width":"130","sortable":true},
	                			  			 //第二站
		                		           	{"field":"net_name2","title":"第二站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj2","title":"微信定位时间(2)","width":"120","sortable":true},
		                		           	{"field":"xtrq2","title":"TMS系统时间(2)","width":"120","sortable":true},
		                		           	{"field":"jhsx2","title":"计划时效(2)","width":"120","sortable":true},
		                		           	{"field":"xhsj2","title":"中途卸货时间(2)","width":"130","sortable":true},
		                		           	{"field":"yjddsj2","title":"预计到达时间(2)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw2","title":"是否到达延误(2)","width":"130","sortable":true},
		                		           	{"field":"ywsj2","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj2","title":"实际运输时长(小时)","width":"130","sortable":true},
	                			  			 //第三站
		                		           	{"field":"net_name3","title":"第三站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj3","title":"微信定位时间(3)","width":"120","sortable":true},
		                		           	{"field":"xtrq3","title":"TMS系统时间(3)","width":"120","sortable":true},
		                		           	{"field":"jhsx3","title":"计划时效(3)","width":"120","sortable":true},
		                		           	{"field":"xhsj3","title":"中途卸货时间(3)","width":"130","sortable":true},
		                		           	{"field":"yjddsj3","title":"预计到达时间(3)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw3","title":"是否到达延误(3)","width":"130","sortable":true},
		                		           	{"field":"ywsj3","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj3","title":"实际运输时长(小时)","width":"130","sortable":true},
	                			  			 //第四站
		                		           	{"field":"net_name4","title":"第四站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj4","title":"微信定位时间(4)","width":"120","sortable":true},
		                		           	{"field":"xtrq4","title":"TMS系统时间(4)","width":"120","sortable":true},
		                		           	{"field":"jhsx4","title":"计划时效(4)","width":"120","sortable":true},
		                		           	{"field":"xhsj4","title":"中途卸货时间(4)","width":"130","sortable":true},
		                		           	{"field":"yjddsj4","title":"预计到达时间(4)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw4","title":"是否到达延误(4)","width":"130","sortable":true},
		                		           	{"field":"ywsj4","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj4","title":"实际运输时长(小时)","width":"130","sortable":true},
	                			  			 //第五站
		                		           	{"field":"net_name5","title":"第五站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj5","title":"微信定位时间(5)","width":"120","sortable":true},
		                		           	{"field":"xtrq5","title":"TMS系统时间(5)","width":"120","sortable":true},
		                		           	{"field":"jhsx5","title":"计划时效(5)","width":"120","sortable":true},
		                		           	{"field":"xhsj5","title":"中途卸货时间(5)","width":"130","sortable":true},
		                		           	{"field":"yjddsj5","title":"预计到达时间(5)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw5","title":"是否到达延误(5)","width":"130","sortable":true},
		                		           	{"field":"ywsj5","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj5","title":"实际运输时长(小时)","width":"130","sortable":true},
	                			  			 //第六站
		                		           	{"field":"net_name6","title":"第六站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj6","title":"微信定位时间(6)","width":"120","sortable":true},
		                		           	{"field":"xtrq6","title":"TMS系统时间(6)","width":"120","sortable":true},
		                		           	{"field":"jhsx6","title":"计划时效(6)","width":"120","sortable":true},
		                		           	{"field":"xhsj6","title":"中途卸货时间(6)","width":"130","sortable":true},
		                		           	{"field":"yjddsj6","title":"预计到达时间(6)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw6","title":"是否到达延误(6)","width":"130","sortable":true},
		                		           	{"field":"ywsj6","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj6","title":"实际运输时长(小时)","width":"130","sortable":true},
	                			  			 //第七站
		                		           	{"field":"net_name7","title":"第七站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj7","title":"微信定位时间(7)","width":"120","sortable":true},
		                		           	{"field":"xtrq7","title":"TMS系统时间(7)","width":"120","sortable":true},
		                		           	{"field":"jhsx7","title":"计划时效(7)","width":"120","sortable":true},
		                		           	{"field":"xhsj7","title":"中途卸货时间(7)","width":"130","sortable":true},
		                		           	{"field":"yjddsj7","title":"预计到达时间(7)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw7","title":"是否到达延误(7)","width":"130","sortable":true},
		                		           	{"field":"ywsj7","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj7","title":"实际运输时长(小时)","width":"130","sortable":true},
	                			  			 //第八站
		                		           	{"field":"net_name8","title":"第八站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj8","title":"微信定位时间(8)","width":"120","sortable":true},
		                		           	{"field":"xtrq8","title":"TMS系统时间(8)","width":"120","sortable":true},
		                		           	{"field":"jhsx8","title":"计划时效(8)","width":"120","sortable":true},
		                		           	{"field":"xhsj8","title":"中途卸货时间(8)","width":"130","sortable":true},
		                		           	{"field":"yjddsj8","title":"预计到达时间(8)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw8","title":"是否到达延误(8)","width":"130","sortable":true},
		                		           	{"field":"ywsj8","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj8","title":"实际运输时长(小时)","width":"130","sortable":true},
	                			  			 //第九站
		                		           	{"field":"net_name9","title":"第九站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj9","title":"微信定位时间(9)","width":"120","sortable":true},
		                		           	{"field":"xtrq9","title":"TMS系统时间(9)","width":"120","sortable":true},
		                		           	{"field":"jhsx9","title":"计划时效(9)","width":"120","sortable":true},
		                		           	{"field":"xhsj9","title":"中途卸货时间(9)","width":"130","sortable":true},
		                		           	{"field":"yjddsj9","title":"预计到达时间(9)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw9","title":"是否到达延误(9)","width":"130","sortable":true},
		                		           	{"field":"ywsj9","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj9","title":"实际运输时长(小时)","width":"130","sortable":true},
	                			  			 //第十站
		                		           	{"field":"net_name10","title":"第十站地点","width":"120","sortable":true},
		                		           	{"field":"dwsj10","title":"微信定位时间(10)","width":"120","sortable":true},
		                		           	{"field":"xtrq10","title":"TMS系统时间(10)","width":"120","sortable":true},
		                		           	{"field":"jhsx10","title":"计划时效(10)","width":"120","sortable":true},
		                		           	{"field":"xhsj10","title":"中途卸货时间(10)","width":"130","sortable":true},
		                		           	{"field":"yjddsj10","title":"预计到达时间(10)","width":"130","sortable":true},
		                		           	{"field":"yjsfyw10","title":"是否到达延误(10)","width":"130","sortable":true},
		                		           	{"field":"ywsj10","title":"到达延误时间(小时)","width":"130","sortable":true},
		                		           	{"field":"sjyssj10","title":"实际运输时长(小时)","width":"130","sortable":true}
	                			  	  ]
		                	},
		                    {"id":"selectGXYSGG","name":"干线运输跟踪报表",
		                    	"columns":[ 
		                    	           	{"field":"taskno","title":"派车单","width":"100","sortable":true,"sortOrder":"asc"},
		                    	           	{"field":"car_num","title":"车牌号 ","width":"100","sortable":true},
		                    	           	{"field":"cllx","title":"车辆类型 ","width":"100","sortable":true},
		                    	           	{"field":"xllx","title":"线路类型 ","width":"100","sortable":true},
		                    	           	{"field":"line_name","title":"线路名称","width":"120","sortable":true},
		                    	           	{"field":"zcddsj","title":"装车完毕打单时间","width":"120","sortable":true},
		                    	           	{"field":"fcsj","title":"门卫扫描发车时间","width":"120","sortable":true},
		                    	           	{"field":"sfwd","title":"始发机构","width":"100","sortable":true},
		                    	           	{"field":"ddwd","title":"到达网点","width":"100","sortable":true},
		                		           	{"field":"dwsj","title":"微信定位时间","width":"120","sortable":true},
		                		           	{"field":"xtrq","title":"TMS系统时间","width":"120","sortable":true},
		                		           	{"field":"jhsx","title":"计划时效","width":"120","sortable":true},
		                		           	{"field":"yjddsj","title":"预计到达时间","width":"130","sortable":true},
		                    	           ]
		                    },
		                    {"id":"selectGXTASKGZ","name":"干线运输在途准时考核报表",
		                    	"columns":[ 
		                    	           	{"field":"taskno","title":"派车单","width":"100","sortable":true,"sortOrder":"asc"},
		                    	           	{"field":"car_num","title":"车牌号 ","width":"100","sortable":true},
		                    	           	{"field":"cllx","title":"车辆类型 ","width":"100","sortable":true},
		                    	           	{"field":"line_name","title":"线路名称","width":"120","sortable":true},
		                    	           	{"field":"zcddsj","title":"装车完毕打单时间","width":"120","sortable":true},
		                    	           	{"field":"fcsj","title":"门卫扫描发车时间","width":"120","sortable":true},
		                    	           	{"field":"sfwd","title":"始发机构","width":"100","sortable":true},
		                    	           	{"field":"ddwd","title":"到达网点","width":"100","sortable":true},
		                		           	{"field":"dwsj","title":"微信定位时间","width":"120","sortable":true},
		                		           	{"field":"xtrq","title":"TMS系统时间","width":"120","sortable":true},
		                		           	{"field":"jhsx","title":"计划时效","width":"120","sortable":true},
		                		           	{"field":"khsx","title":"考核时效","width":"120","sortable":true},
		                		           	{"field":"yjddsj","title":"预计到达时间","width":"130","sortable":true},
		                		           	{"field":"ddsfyw","title":"是否到达延误","width":"80","sortable":true},
		                		           	{"field":"ywcs","title":"延误次数(是)","width":"80","sortable":true,"sum":1},
		                		           	{"field":"wywcs","title":"未延误次数(否)","width":"80","sortable":true,"sum":1},
		                		           	{"field":"ddywsj","title":"到达延误时间(分钟)","width":"130","sortable":true},
		                		           	{"field":"sjyssj","title":"实际运输时长(小时)","width":"130","sortable":true}
		                    	           ]
		                    },
		                    {"id":"selectRzScan","name":"入站扫描汇总",
		                    	"columns":[ 
		                    	           	{"field":"billcounts","title":"票数","width":"100","sortable":true,"sortOrder":"asc"},
		                    	           	{"field":"zx","title":"执行票数","width":"100","sortable":true,"sortOrder":"asc"},
		                    	           	{"field":"tmzxl","title":"条码执行率","width":"120","sortable":true,
			                    	           	 formatter: function(value, row) {
			                    	                    return row.tmzxl + '%';
			                    	                }},
	                    	            	{"field":"wz","title":"执行准确票数 ","width":"100","sortable":true},
	                    	            	{"field":"zxzql","title":"执行准确率","width":"120","sortable":true,
			                    	           	 formatter: function(value, row) {
			                    	                    return row.zxzql + '%';
			                    	                }},
		                    	           	{"field":"boxcounts","title":"运单箱数 ","width":"100","sortable":true},
		                    	           	{"field":"scanCount","title":"扫描箱数","width":"120","sortable":true},
		                    	           	
		                    	           	{"field":"yxsml","title":"有效扫描率","width":"120","sortable":true,
					                    	           	 formatter: function(value, row) {
					                    	                    return row.yxsml + '%';
					                    	                }}
		                    	           	
		                    	           ]
		                    },
		                    {"id":"selectRzScan_task","name":"入站扫描派车单汇总",
		                    	"columns":[ 
		                    	           	{"field":"taskno","title":"派车单号","width":"100","sortable":true,"sortOrder":"asc"},
											{"field":"dirver","title":"司机","width":"100","sortable":true},
											{"field":"tsh_peop","title":"提送货人","width":"100","sortable":true},
											{"field":"car_num","title":"车牌号","width":"100","sortable":true},
											{"field":"shp_code","title":"承运商","width":"100","sortable":true,"hidden":true},
											{"field":"shp_name","title":"承运商","width":"100","sortable":true},
		                    	           	{"field":"line_code","title":"线路","width":"100","sortable":true,"hidden":true},
		                    	           	{"field":"line_name","title":"线路","width":"100","sortable":true,"sortOrder":"asc"},
		                    	         	{"field":"billcounts","title":"票数 ","width":"100","sortable":true,"sum":1},
		                    	           	{"field":"boxcounts","title":"运单箱数 ","width":"100","sortable":true,"sum":1},
		                    	           	{"field":"scanCount","title":"扫描箱数","width":"120","sortable":true,"sum":1},
		                    	           	{"field":"tmzxl","title":"条码执行率","width":"120","sortable":true,
		                    	           	 formatter: function(value, row) {
		                    	                    return row.tmzxl + '%';
		                    	                }},
		                    	           	{"field":"yxsml","title":"有效扫描率","width":"120","sortable":true,
				                    	           	 formatter: function(value, row) {
				                    	                    return row.yxsml + '%';
				                    	                }},
		                    	           	{"field":"zxzql","title":"执行准确率","width":"120","sortable":true,
						                    	           	 formatter: function(value, row) {
						                    	                    return row.zxzql + '%';
						                    	                }},
		                    	           ]
		                    },
		                    {"id":"selectRzScan_bill","name":"入站扫描运单汇总",
		                    	"columns":[ 
		                    	        	{"field":"taskno","title":"派车单号","width":"100","sortable":true,"sortOrder":"asc"},
		                    	           	{"field":"billno","title":"运单号","width":"100","sortable":true,"sortOrder":"asc"},
		                    	           	{"field":"boxcounts","title":"运单箱数 ","width":"100","sortable":true,"sum":1},
		                    	           	{"field":"scanCount","title":"扫描箱数","width":"120","sortable":true,"sum":1},
		                    	           	{"field":"cy","title":"差异箱数","width":"120","sortable":true,"sum":1},
		                    	           	{"field":"zx","title":"是否执行","width":"120","sortable":true},
		                    	           	{"field":"yx","title":"有效扫描率","width":"120","sortable":true,
			                    	           	 formatter: function(value, row) {
			                    	                    return row.yx + '%';
			                    	                }},
		                    	           	{"field":"wz","title":"是否完整","width":"120","sortable":true},
		                    	           ]
		                    },
		                    {"id":"selectWDRZSM","name":"网点卸货扫描",
		                	  	"columns":[
	                			  			 {"field":"CZRQ","title":"到车日期","width":"100","sortable":true},
	                			  			 {"field":"GLZ","title":"管理组","width":"100","sortable":true},
	                			  			 {"field":"DQ","title":"地区","width":"100","sortable":true},
	                			  			 {"field":"SF","title":"省份","width":"100","sortable":true},
	                			  			 {"field":"CZWD","title":"CZWD","width":"150","sortable":true,"hidden":true},
	                			  			 {"field":"CZWD_NAME","title":"网点","width":"100","sortable":true},
	                			  			 {"field":"WDLX","title":"网点属性","width":"80","sortable":true},
	                			  			 {"field":"WDLB","title":"网点类别","width":"80","sortable":true},
	                			  			 {"field":"BOXES","title":"运单箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"XHSL","title":"卸货箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"YCSL","title":"异常箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"XHSMML","title":"卸货扫描率","width":"100","sortable":true},
	                			  	  ]

		                	},
		                	{"id":"selectWDRZSMMX","name":"网点卸货扫描明细",
		                	  	"columns":[   
		                	  	           	 {"field":"BILLNO","title":"运单号","width":"100","sortable":true},
	                			  			 {"field":"CZRQ","title":"到车日期","width":"100","sortable":true},
	                			  			 {"field":"CZWD_NAME","title":"卸货扫描网点","width":"130","sortable":true},
	                			  			 {"field":"TASKNO","title":"派车单号","width":"110","sortable":true},
	                			  			 {"field":"S_NAME","title":"客户名称","width":"100","sortable":true},
	                			  			 {"field":"POSTNET","title":"发货网点","width":"100","sortable":true},
	                			  			 {"field":"POSTZONE","title":"发货地","width":"150","sortable":true},
	                			  			 {"field":"ACCEPTNET","title":"派送网点","width":"100","sortable":true},
	                			  			 {"field":"ACCEPTZONE","title":"到达地","width":"150","sortable":true},
	                			  			 {"field":"STATE","title":"当前状态","width":"80","sortable":true},
	                			  			 {"field":"BOXES","title":"运单箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"THSL","title":"始发站提货箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"XHSL","title":"卸货箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"YCSL","title":"异常箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"YCYY","title":"异常备注","width":"80","sortable":true},
	                			  	  ]

		                	},
		                	
		                	{"id":"selectWDCZSM","name":"网点配载扫描",
		                	  	"columns":[
	                			  			 {"field":"CZRQ","title":"配载日期","width":"100","sortable":true},
	                			  			 {"field":"GLZ","title":"管理组","width":"100","sortable":true},
	                			  			 {"field":"DQ","title":"地区","width":"100","sortable":true},
	                			  			 {"field":"SF","title":"省份","width":"100","sortable":true},
	                			  			 {"field":"CZWD","title":"CZWD","width":"150","sortable":true,"hidden":true},
	                			  			 {"field":"CZWD_NAME","title":"网点","width":"100","sortable":true},
	                			  			 {"field":"WDLX","title":"网点属性","width":"80","sortable":true},
	                			  			 {"field":"WDLB","title":"网点类别","width":"80","sortable":true},
	                			  			 {"field":"BOXES","title":"运单箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"THSL","title":"提货扫描箱数","width":"110","sortable":true,"sum":1},
	                			  			 {"field":"PZSL","title":"配载扫描箱数","width":"110","sortable":true,"sum":1},
	                			  			 {"field":"YCSL","title":"异常箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"PZSMML","title":"配载扫描率","width":"100","sortable":true},
	                			  			 {"field":"THSML","title":"提货扫描率","width":"100","sortable":true},
	                			  	  ]

		                	},
		                	{"id":"selectWDCZSMMX","name":"网点配载扫描明细",
		                	  	"columns":[   
		                	  	           	 {"field":"BILLNO","title":"运单号","width":"100","sortable":true},
	                			  			 {"field":"CZRQ","title":"配载日期","width":"100","sortable":true},
	                			  			 {"field":"CZWD_NAME","title":"配载扫描网点","width":"130","sortable":true},
	                			  			 {"field":"TASKNO","title":"派车单号","width":"110","sortable":true},
	                			  			 {"field":"S_NAME","title":"客户名称","width":"100","sortable":true},
	                			  			 {"field":"POSTNET","title":"发货网点","width":"100","sortable":true},
	                			  			 {"field":"POSTZONE","title":"发货地","width":"150","sortable":true},
	                			  			 {"field":"ACCEPTNET","title":"派送网点","width":"100","sortable":true},
	                			  			 {"field":"ACCEPTZONE","title":"到达地","width":"150","sortable":true},
	                			  			 {"field":"STATE","title":"当前状态","width":"80","sortable":true},
	                			  			 {"field":"BOXES","title":"运单箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"THSL","title":"始发站提货箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"PZSL","title":"配载扫描箱数","width":"110","sortable":true,"sum":1},
	                			  			 {"field":"YCSL","title":"异常箱数","width":"80","sortable":true,"sum":1},
	                			  			 {"field":"YCYY","title":"异常备注","width":"80","sortable":true},
	                			  	  ]
		                	},
		                	{"id":"selectPDAQSLHZ","name":"PDA签收率报表",
		                	  	"columns":[  
	                			  			 {"field":"TASKNO","title":"派车单号","width":"130","sortable":true},
	                			  			 {"field":"CAR_NUM","title":"车牌照","width":"130","sortable":true},
	                			  			 {"field":"DRIVER","title":"司机","width":"130","sortable":true},
	                			  			 {"field":"TSH_PEOP","title":"提送货人","width":"130","sortable":true},
	                			  			 {"field":"PZPS","title":"派送票数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"ZQSS","title":"当前总签收数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"PDAQSS","title":"当前PDA签收数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"DTZQSS","title":"当天总签收数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"DTPDAQSS","title":"PDA当天签收数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"ZQSL","title":"总签收率","width":"130","sortable":true},
	                			  			 {"field":"DTZQSL","title":"当天总签收率","width":"130","sortable":true},
	                			  			 {"field":"PDAQSL","title":"PDA签收执行率","width":"130","sortable":true},
	                			  			 {"field":"DTPDAQSL","title":"当天PDA签收执行率","width":"130","sortable":true},
	                			  	  ]
		                	},
		                	{"id":"selectPDAQSLMX","name":"PDA签收率报表",
		                	  	"columns":[  
	                			  			 {"field":"BILLNO","title":"运单号","width":"130","sortable":true},
	                			  			 {"field":"TASKNO","title":"派车单号","width":"130","sortable":true},
	                			  			 {"field":"PZRQ","title":"派送日期","width":"130","sortable":true},
	                			  			 {"field":"SIGNMAN","title":"签收人","width":"100","sortable":true},
	                			  			 {"field":"SCANTYPE","title":"签收方式","width":"90","sortable":true},
	                			  			 {"field":"LRR","title":"签收录入人","width":"130","sortable":true},
	                			  			 {"field":"LRRQ","title":"签收时间","width":"130","sortable":true},
	                			  			 {"field":"POSTDATE","title":"托运日期","width":"130","sortable":true},
	                			  			 {"field":"S_NAME","title":"客户","width":"100","sortable":true},
	                			  			 {"field":"POSTZONE","title":"发货地","width":"100","sortable":true},
	                			  			 {"field":"POSTDW","title":"发货单位","width":"100","sortable":true},
		                			  		 {"field":"ACCEPTZONE","title":"到达地","width":"100","sortable":true},
		                			  		 {"field":"ACCEPTADDR","title":"送货地址","width":"200","sortable":true},
		                			  		 {"field":"BOXES","title":"箱数","width":"80","sortable":true},
		                			  		 {"field":"DUALS","title":"双数","width":"100","sortable":true},
		                			  		 {"field":"PACKAGE","title":"包数","width":"100","sortable":true},
	                			  			 
	                			  	  ]
		                	},
		                	{"id":"selectPSZDLWDddwd","name":"网点到达网点汇总",
		                	  	"columns":[  
		                	  	           {"field":"acceptnet","title":"到达网点","width":"130","sortable":true,"hidden":true},
	                			  			 {"field":"acceptnetname","title":"到达网点","width":"130","sortable":true},
	                			  			 {"field":"dqname","title":"大区","width":"130","sortable":true},
	                			  			 {"field":"sfname","title":"省份","width":"130","sortable":true},
	                			  			 {"field":"glzname","title":"管理组","width":"100","sortable":true},
	                			  			 {"field":"wdlxname","title":"网点属性","width":"90","sortable":true},
	                			  			 {"field":"wdlb","title":"网点类型","width":"130","sortable":true},
	                			  			 {"field":"ps","title":"市内总票数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"zd","title":"市内准点票数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"yc","title":"市内异常晚点票数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"pszdl","title":"市内准点率","width":"130","sortable":true,"sum":1,
	                			  				formatter: function(value, row) {
			                    	           		 if(row.pszdl.indexOf('%')<0){
			                    	           		  return row.pszdl + '%';
			                    	           		 }else{
			                    	           			 return row.pszdl;
			                    	           		 }
			                    	                }},
	                			  			 {"field":"zrzdl","title":"市内责任准点率","width":"130","sortable":true,"sum":1,
	                    	                	formatter: function(value, row) {
			                    	           		 if(row.zrzdl.indexOf('%')<0){
			                    	           		  return row.zrzdl + '%';
			                    	           		 }else{
			                    	           			 return row.zrzdl;
			                    	           		 }
			                    	                }},
	                			  			 {"field":"zz","title":"中转总票数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"zzzd","title":"中转准点票数","width":"90","sortable":true,"sum":1},
	                			  			 {"field":"zzyc","title":"中转异常晚点票数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"zzzdl","title":"中转准点率","width":"130","sortable":true,"sum":1,
	                			  				formatter: function(value, row) {
			                    	           		 if(row.zzzdl.indexOf('%')<0){
			                    	           		  return row.zzzdl + '%';
			                    	           		 }else{
			                    	           			 return row.zzzdl;
			                    	           		 }
			                    	                }},
	                			  			 {"field":"zzzrzdl","title":"中转责任准点率","width":"130","sortable":true,"sum":1,
		                    	                	formatter: function(value, row) {
				                    	           		 if(row.zzzrzdl.indexOf('%')<0){
				                    	           		  return row.zzzrzdl + '%';
				                    	           		 }else{
				                    	           			 return row.zzzrzdl;
				                    	           		 }
				                    	                }},
	                			  			 
	                			  			 {"field":"zhitems","title":"综合总票数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"zhzdcount","title":"综合准点票数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"zhexc","title":"综合异常晚点票数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"zhzdl","title":"综合准点率","width":"100","sortable":true,"sum":1,
	                			  				formatter: function(value, row) {
			                    	           		 if(row.zhzdl.indexOf('%')<0){
			                    	           		  return row.zhzdl + '%';
			                    	           		 }else{
			                    	           			 return row.zhzdl;
			                    	           		 }
			                    	                }},
	                			  			 {"field":"zhzrzdl","title":"综合责任准点率","width":"90","sortable":true,"sum":1,
		                    	                	formatter: function(value, row) {
				                    	           		 if(row.zhzrzdl.indexOf('%')<0){
				                    	           		  return row.zhzrzdl + '%';
				                    	           		 }else{
				                    	           			 return row.zhzrzdl;
				                    	           		 }
				                    	                }}
	                			  	  ]
		                	},
		                	{"id":"selectPSZDLWDsj","name":"网点时间汇总",
		                	  	"columns":[   
	                			  			 {"field":"lrrq","title":"录单时间","width":"220","sortable":true},
	                			  			 {"field":"fcrq","title":"发车时间","width":"220","sortable":true},
	                			  			 {"field":"dcsj","title":"到车时间","width":"220","sortable":true},
	                			  			 {"field":"taskno","title":"派车单号","width":"130","sortable":true},
	                			  			 {"field":"billno","title":"运单号","width":"130","sortable":true},
	                			  			 {"field":"s_name","title":"客户","width":"130","sortable":true},
	                			  			
	                			  			 {"field":"statename","title":"当前状态","width":"100","sortable":true},
	                			  			 {"field":"nownetname","title":"当前网点","width":"90","sortable":true},
	                			  			 {"field":"postzone","title":"发货地","width":"130","sortable":true},
	                			  			 {"field":"postnet","title":"发货网点","width":"130","sortable":true},
	                			  			 {"field":"acceptzonename","title":"到达地","width":"130","sortable":true},
	                			  			 {"field":"acceptnetname","title":"到达网点","width":"130","sortable":true},
	                			  			 {"field":"boxes","title":"箱数","width":"100","sortable":true,"sum":1},
	                			  			 
	                			  			 {"field":"sfzz","title":"是否中转","width":"100","sortable":true},
	                			  			 {"field":"khts","title":"考核时效(天)","width":"100","sortable":true,"hidden":true},
	                			  			 {"field":"khsx","title":"考核时效(天)","width":"100","sortable":true},
	                			  			 {"field":"yqssj","title":"应签收时间","width":"130","sortable":true},
	                			  			 {"field":"qssj","title":"实际签收时间","width":"130","sortable":true},
	                			  			 {"field":"sfwd","title":"是否晚点","width":"90","sortable":true},
	                			  			 {"field":"ywts","title":"延误天数","width":"100","sortable":true},
	                			  			 {"field":"yc","title":"是否异常晚点件","width":"100","sortable":true},
	                			  			 {"field":"yclxname","title":"异常类型","width":"130","sortable":true},
	                			  			 
	                			  			 {"field":"djnr","title":"异常备注","width":"130","sortable":true},
	                			  			 {"field":"dqname","title":"大区","width":"130","sortable":true},
	                			  			 {"field":"sfname","title":"省份","width":"130","sortable":true},
	                			  			 {"field":"glzname","title":"管理组","width":"100","sortable":true},
	                			  			 {"field":"wdlxname","title":"网点类型","width":"90","sortable":true},
	                			  			 {"field":"wdlb","title":"网点属性","width":"130","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectPSZDLSHddwd","name":"上海到达网点汇总",
		                	  	"columns":[  
		                	  	           	 {"field":"acceptnetname","title":"到达网点","width":"130","sortable":true},
	                			  			 {"field":"type","title":"区域类型","width":"130","sortable":true},
	                			  			 {"field":"ps","title":"派送总票数","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"zd","title":"派送准点票数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"yc","title":"异常晚点票数","width":"90","sortable":true,"sum":1},
	                			  			 {"field":"pszdl","title":"派送准点率","width":"130","sortable":true,"sum":1,
	                			  				formatter: function(value, row) {
			                    	           		 if(row.pszdl.indexOf('%')<0){
			                    	           		  return row.pszdl + '%';
			                    	           		 }else{
			                    	           			 return row.pszdl;
			                    	           		 }
			                    	                }},
	                			  			 {"field":"zrzdl","title":"责任准点率","width":"130","sortable":true,"sum":1,
		                    	                	formatter: function(value, row) {
				                    	           		 if(row.zrzdl.indexOf('%')<0){
				                    	           		  return row.zrzdl + '%';
				                    	           		 }else{
				                    	           			 return row.zrzdl;
				                    	           		 }
				                    	                }}
	                			  	  ]
		                	},
		                	{"id":"selectPSZDLSHsj","name":"上海时间汇总",
		                	  	"columns":[  
	                			  			 {"field":"billno","title":"运单号","width":"130","sortable":true},
	                			  			 {"field":"type","title":"区域类型","width":"100","sortable":true},
	                			  			 {"field":"lrrq","title":"录单时间","width":"130","sortable":true},
	                			  			 {"field":"taskno","title":"派车单号","width":"100","sortable":true},
	                			  			 {"field":"line_name","title":"线路名称","width":"100","sortable":true},
	                			  			 {"field":"tsh_peop","title":"提送货人","width":"100","sortable":true},
	                			  			 {"field":"dcsj","title":"到车时间","width":"130","sortable":true},
	                			  			 {"field":"xhsj","title":"卸货时间","width":"130","sortable":true},
	                			  			 {"field":"statename","title":"当前状态","width":"100","sortable":true},
	                			  			 {"field":"nownetname","title":"当前网点","width":"100","sortable":true},
	                			  			 
	                			  			 {"field":"acceptzonename","title":"到达地","width":"100","sortable":true},
	                			  			 {"field":"acceptnetname","title":"到达网点","width":"100","sortable":true},
	                			  			 {"field":"boxes","title":"箱数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"khts","title":"考核时效(天)","width":"130","sortable":true,"hidden":true},
	                			  			 {"field":"yqssj","title":"应签收时间","width":"130","sortable":true},
	                			  			 {"field":"qssj","title":"实际签收时间","width":"130","sortable":true},
	                			  			 {"field":"sfwd","title":"是否晚点","width":"100","sortable":true},
	                			  			 {"field":"ysts","title":"延误天数","width":"100","sortable":true},
	                			  			 {"field":"yc","title":"是否异常晚点件","width":"100","sortable":true},
	                			  			 
	                			  			 {"field":"yclxname","title":"异常类型","width":"100","sortable":true},
	                			  			 {"field":"djnr","title":"异常备注","width":"130","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectWDQS","name":"网点签收率",
		                	  	"columns":[  
	                			  			 {"field":"qssj","title":"签收日期","width":"130","sortable":true},
	                			  			 {"field":"signnet","title":"签收网点","width":"130","sortable":true,"hidden":true},
	                			  			 {"field":"glzname","title":"管理组","width":"100","sortable":true},
	                			  			 {"field":"dqname","title":"地区","width":"130","sortable":true},
	                			  			 {"field":"s_name","title":"省份","width":"100","sortable":true},
	                			  			 {"field":"net_name","title":"网点名称","width":"100","sortable":true},
	                			  			 {"field":"wdlxname","title":"网点属性","width":"100","sortable":true},
	                			  			 {"field":"wdlb","title":"网点类别","width":"130","sortable":true},
	                			  			 {"field":"zqssl","title":"签收总票数","width":"130","sortable":true},
	                			  			 {"field":"wxqssl","title":"微信签收票数","width":"100","sortable":true},
	                			  			 {"field":"wxbl","title":"微信签收率","width":"100","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectWDQSInfo","name":"网点签收率信息",
		                	  	"columns":[  
	                			  			 {"field":"billno","title":"运单号","width":"130","sortable":true},
	                			  			 {"field":"cusname","title":"客户","width":"100","sortable":true},
	                			  			 {"field":"statename","title":"运单状态","width":"100","sortable":true},
	                			  			 {"field":"postdate","title":"托运日期","width":"100","sortable":true},
	                			  			 {"field":"postzonename","title":"发货地","width":"100","sortable":true},
	                			  			 {"field":"postnetname","title":"发货网点","width":"100","sortable":true},
	                			  			 {"field":"acceptzonename","title":"到达地","width":"130","sortable":true},
	                			  			 {"field":"acceptnetname","title":"到达网点","width":"130","sortable":true},
	                			  			 {"field":"fcsj","title":"发货时间","width":"200","sortable":true},
	                			  			 {"field":"dcsj","title":"到车时间","width":"200","sortable":true},
	                			  			 {"field":"qssj","title":"签收时间","width":"200","sortable":true},
	                			  			 {"field":"signname","title":"签收方式","width":"100","sortable":true},
	                			  			 {"field":"signnetname","title":"签收网点","width":"100","sortable":true},
	                			  			 {"field":"glzname","title":"管理组","width":"100","sortable":true},
	                			  			 {"field":"dqname","title":"大区","width":"100","sortable":true},
	                			  			 {"field":"s_name","title":"省份","width":"100","sortable":true},
	                			  			 {"field":"signnetname","title":"网点名称","width":"130","sortable":true},
	                			  			 {"field":"wdlxname","title":"网点属性","width":"100","sortable":true},
	                			  			 {"field":"wdlb","title":"网点类别","width":"100","sortable":true},
	                			  			 {"field":"sfwx","title":"是否微信","width":"100","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectKHSR","name":"客户收入报表",
		                	  	"columns":[  
	                			  			 {"field":"s_name","title":"客户名称","width":"100","sortable":true},
	                			  			 {"field":"cus_code","title":"客户名称","width":"100","sortable":true,"hidden":true},
	                			  			 {"field":"jsbm_cn","title":"结算部门","width":"100","sortable":true},
	                			  			 {"field":"jsbm","title":"结算部门","width":"100","sortable":true,"hidden":true},
	                			  			 {"field":"counts","title":"票数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"boxes","title":"箱数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"package","title":"包数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"duals","title":"双数","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"volume","title":"体积","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"weight","title":"重量","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"postfee","title":"运费","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"bjfee","title":"保价费","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"slfee","title":"上楼费","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"ccfee","title":"仓储费","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"thfee","title":"提货费","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"shfee","title":"送货费","width":"100","sortable":true,"sum":1},
	                			  			 {"field":"hj","title":"费用合计","width":"100","sortable":true,"sum":1}
	                			  	  ]
		                	},
		                	{"id":"selectKHSRItem","name":"客户收入报表明细",
		                	  	"columns":[  
	                			  			 {"field":"billno","title":"运单号","width":"130","sortable":true},
	                			  			 {"field":"postdate","title":"托运日期","width":"100","sortable":true},
	                			  			 {"field":"postzone_cn","title":"始发地","width":"150","sortable":true},
	                			  			 {"field":"postnet_cn","title":"发货网点","width":"80","sortable":true},
	                			  			 {"field":"acceptzone_cn","title":"到达地","width":"150","sortable":true},
	                			  			 {"field":"acceptnet_cn","title":"到达网点","width":"80","sortable":true},
	                			  			 {"field":"boxes","title":"箱数","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"package","title":"包数","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"duals","title":"双数","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"volume","title":"体积","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"weight","title":"重量","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"postfee","title":"运费","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"bjfee","title":"保价费","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"slfee","title":"上楼费","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"ccfee","title":"仓储费","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"thfee","title":"提货费","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"shfee","title":"送货费","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"hj","title":"费用合计","width":"60","sortable":true,"sum":1},
	                			  			 {"field":"shr","title":"审核人","width":"70","sortable":true,"sum":1},
	                			  			 {"field":"shrq","title":"审核日期","width":"130","sortable":true,"sum":1},
	                			  			 {"field":"shbj_name","title":"审核状态","width":"70","sortable":true,"sum":1}
	                			  	  ]
		                	}
		                ];
		return column_header;
}

		                	