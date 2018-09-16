function getColumns(){
		var column_header= [
		                	{"id":"selectTASK_RY","name":"提送货人信息",
		                	  	"columns":[
				                	  	         {"field":"peop_code","title":"人员编码","explain":"人员编号","width":"100","sortable":true,"sortOrder":"asc"},
		                			  			 {"field":"peop_name","title":"姓名","explain":"姓名","width":"100","sortable":true}
				                			  			 
		                			  	  ]

		                	},
		                	{"id":"selectSRCTASK","name":"派车单信息",
		                	  	"columns":[
				                	  	         {"field":"taskno","title":"派车单号","explain":"派车单号","width":"100","sortable":true,"sortOrder":"asc" },
		                			  			 {"field":"car_num","title":"车牌号","explain":"车牌号","width":"100","sortable":true,
				                    	        	   "formatter": function(value,row,index){
				                    	        	       return '<a href="#" onclick=srchTASK.getclxx("'+row.car_num+'")>'+row.car_num+'</a>  '
				                    	        	     }},
		                			  			 {"field":"driver","title":"司机","explain":"司机","width":"100","sortable":true},
		                			  			 {"field":"tel","title":"司机电话","explain":"司机电话","width":"100","sortable":true},
		                			  			 {"field":"shp_name","title":"承运商","explain":"承运商","width":"100","sortable":true},
		                			  			 {"field":"shp_code","title":"shp_code","width":"100","hidden":true,"sortable":true},          
		                			 			 {"field":"line_name","title":"线路","explain":"线路","width":"100","sortable":true},
		                			  			 {"field":"line_code","title":"line_code","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"lscar_num","title":"临时车牌号","explain":"临时车牌号","width":"100","sortable":true}, 
		                			  			 {"field":"dd_flag_cn","title":"调度类型","explain":"调度类型","width":"100","sortable":true},
		                			  			 {"field":"dd_flag","title":"dd_flag","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"c_long","title":"车长","explain":"车长","width":"100","sortable":true},
		                			  			 {"field":"c_height","title":"车高","explain":"车高","width":"100","sortable":true},
		                			  			 {"field":"c_width","title":"车宽","explain":"车宽","width":"100","sortable":true},
		                			  			 {"field":"c_volume","title":"承载体积","explain":"承载体积","width":"100","sortable":true},
		                			  			 {"field":"state_cn","title":"当前状态","explain":"当前状态","width":"100","sortable":true},
		                			  			 {"field":"state","title":"state","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"tsh_peop","title":"提送货人","explain":"提送货人","width":"100","sortable":true},
		                			  			 {"field":"ywlx_name","title":"业务类型","explain":"业务类型","width":"100","sortable":true},
		                			 			 {"field":"yw_flag","title":"yw_flag","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"cllx_name","title":"车辆类型","explain":"车辆类型","width":"100","sortable":true},
		                			  			 {"field":"flag","title":"flag","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"lrr_name","title":"录入人","explain":"录入人","width":"100","sortable":true},
		                			  			 {"field":"lrr","title":"lrr","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"lrrq","title":"录入日期","explain":"录入日期","width":"100","sortable":true}, 
		                			 			 {"field":"xgr_name","title":"修改人","explain":"修改人","width":"100","sortable":true},
		                			  			 {"field":"xgr","title":"xgr","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"xgrq","title":"修改日期","explain":"修改日期","width":"100","sortable":true},
		                			  			 {"field":"net_name","title":"录入网点","explain":"录入网点","width":"100","sortable":true},
		                			  			 {"field":"net_code","title":"net_code","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"memo","title":"memo","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"tsh_peop_code","title":"tsh_peop_code","width":"100","hidden":true,"sortable":true}
		                			  	  ]

		                	},
		                	{"id":"selectTASKCX","name":"派车单信息",
		                	  	"columns":[
				                	  	         {"field":"taskno","title":"派车单号","explain":"派车单号","width":"100","sortable":true,"sortOrder":"asc" },
		                			  			 {"field":"car_num","title":"车牌号","explain":"车牌号","width":"100","sortable":true,
				                    	        	   "formatter": function(value,row,index){
				                    	        	       return '<a href="#" onclick=srchTASK.getclxx("'+row.car_num+'")>'+row.car_num+'</a>  '
				                    	        	     }},
		                			  			 {"field":"driver","title":"司机","explain":"司机","width":"100","sortable":true},
		                			  			 {"field":"tel","title":"司机电话","explain":"司机电话","width":"100","sortable":true},
		                			  			 {"field":"shp_name","title":"承运商","explain":"承运商","width":"100","sortable":true},
		                			  			 {"field":"shp_code","title":"shp_code","width":"100","hidden":true,"sortable":true},          
		                			 			 {"field":"line_name","title":"线路","explain":"线路","width":"100","sortable":true},
		                			  			 {"field":"line_code","title":"line_code","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"lscar_num","title":"临时车牌号","explain":"临时车牌号","width":"100","sortable":true}, 
		                			  			 {"field":"dd_flag_cn","title":"调度类型","explain":"调度类型","width":"100","sortable":true},
		                			  			 {"field":"dd_flag","title":"dd_flag","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"c_long","title":"车长","explain":"车长","width":"100","sortable":true},
		                			  			 {"field":"c_height","title":"车高","explain":"车高","width":"100","sortable":true},
		                			  			 {"field":"c_width","title":"车宽","explain":"车宽","width":"100","sortable":true},
		                			  			 {"field":"c_volume","title":"承载体积","explain":"承载体积","width":"100","sortable":true},
		                			  			 {"field":"state_cn","title":"当前状态","explain":"当前状态","width":"100","sortable":true},
		                			  			 {"field":"state","title":"state","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"tsh_peop","title":"提送货人","explain":"提送货人","width":"100","sortable":true},
		                			  			 {"field":"ywlx_name","title":"业务类型","explain":"业务类型","width":"100","sortable":true},
		                			 			 {"field":"yw_flag","title":"yw_flag","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"cllx_name","title":"车辆类型","explain":"车辆类型","width":"100","sortable":true},
		                			  			 {"field":"flag","title":"flag","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"lrr_name","title":"录入人","explain":"录入人","width":"100","sortable":true},
		                			  			 {"field":"lrr","title":"lrr","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"lrrq","title":"录入日期","explain":"录入日期","width":"100","sortable":true}, 
		                			 			 {"field":"xgr_name","title":"修改人","explain":"修改人","width":"100","sortable":true},
		                			  			 {"field":"xgr","title":"xgr","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"xgrq","title":"修改日期","explain":"修改日期","width":"100","sortable":true},
		                			  			 {"field":"net_name","title":"录入网点","explain":"录入网点","width":"100","sortable":true},
		                			  			 {"field":"net_code","title":"net_code","width":"100","hidden":true,"sortable":true},
		                			  			 {"field":"memo","title":"memo","width":"100","hidden":true,"sortable":true},
	  			 
		                			  	  ]

		                	},
		                	{"id":"selectTASKGZ","name":"派车单跟踪信息",
		                    	"columns":[  
		                    	           {"field":"taskno","title":"派车单号","width":"100","sortable":true},
		                    	           {"field":"czrq","title":"操作时间","width":"130","sortable":true,"sortOrder":"asc"},
		                    	           {"field":"czr","title":"操作人","width":"100","sortable":true},
		                    	           {"field":"state_cn","title":"跟踪记录","width":"600","sortable":true},
		                    	          ]

		                	},
		                	{"id":"selectXLXZ","name":"线路选择信息",
		                	  	"columns":[
				                	  	         {"field":"line_code","title":"线路代码","explain":"线路代码","width":"100","sortable":true,"hidden":true,"sortOrder":"asc"},
										         {"field":"line_name","title":"线路名称","explain":"线路名称","width":"100","sortable":true},
											  	 {"field":"fhwd","title":"fhwd","explain":"fhwd","width":"100","hidden":true,"sortable":true},
											  	 {"field":"fhwd_name","title":"发货网点","explain":"发货网点","width":"100","sortable":true},
											  	 {"field":"ddwd_code","title":"ddwd_code","explain":"ddwd_code","hidden":true,"width":"100","sortable":true},
											  	 {"field":"ddwd_name","title":"到达网点","explain":"到达网点","width":"1000","sortable":true}
				                			  			 
		                			  	  ]

		                	},
		                	{"id":"selectOrderInfo","name":"订单信息",
		                	  	"columns":[
		                	  	           	{"field":"id","title":"ID","width":"80","sortable":true,"checkbox":true},
			                	  	         {"field":"orderno","title":"订单号","explain":"订单号","width":"100","sortable":true},
			                	  	         {"field":"statename","title":"状态","explain":"状态","width":"100","sortable":true},
			                	  	         {"field":"postman","title":"发货人","explain":"发货人","width":"100","sortable":true},
										  	 {"field":"posttel","title":"发货人电话","explain":"发货人电话","width":"100","sortable":true},
										  	 {"field":"boxes","title":"箱数","explain":"箱数","width":"100","sortable":true},
										  	 {"field":"vol","title":"体积","explain":"体积","width":"100","sortable":true},
										  	 {"field":"jjbj","title":"加急标记","explain":"加急标记","width":"100","sortable":true},
										  	 {"field":"postaddress","title":"发货地址","explain":"发货地址","width":"300","sortable":true},
										  	 {"field":"thnet","title":"提货网点","explain":"提货网点","width":"100","sortable":true,"hidden":true},
										  	 {"field":"state","title":"状态","explain":"提货网点","width":"100","sortable":true,"hidden":true},
										  	 {"field":"net_name","title":"提货网点","explain":"提货网点","width":"100","sortable":true},
										  	 {"field":"peop_name","title":"提货人","explain":"提货人","width":"100","sortable":true}
			                			  			 
	                			  	  ]

	                	},
	                	{"id":"selectDDCX","name":"导入订单信息",
	                	  	"columns":[
		                	  	         {"field":"orderno","title":"订单号","explain":"订单号","width":"100","sortable":true},
		                	  	         {"field":"statename","title":"状态","explain":"状态","width":"100","sortable":true},
		                	  	         {"field":"postman","title":"发货人","explain":"发货人","width":"100","sortable":true},
									  	 {"field":"posttel","title":"发货人电话","explain":"发货人电话","width":"100","sortable":true},
									  	 {"field":"boxes","title":"箱数","explain":"箱数","width":"100","sortable":true},
									  	 {"field":"vol","title":"体积","explain":"体积","width":"100","sortable":true},
									  	 {"field":"jjbj","title":"加急标记","explain":"加急标记","width":"100","sortable":true},
									  	 {"field":"postaddress","title":"发货地址","explain":"发货地址","width":"300","sortable":true},
									  	 {"field":"thnet","title":"提货网点","explain":"提货网点","width":"100","sortable":true,"hidden":true},
									  	 {"field":"net_name","title":"提货网点","explain":"提货网点","width":"100","sortable":true},		                			  			 
                			  	  ]

                	},
	                	{"id":"selectOrderInfoState","name":"订单状态信息",
	                	  	"columns":[
		                	  	         {"field":"czrq","title":"操作时间","explain":"操作时间","width":"200","sortable":true},
		                	  	         {"field":"lrr","title":"操作人","explain":"操作人","width":"100","sortable":true},
									  	 {"field":"statename","title":"状态","explain":"操作记录","width":"250","sortable":true},
									  	 {"field":"peop_name","title":"提货人","explain":"提货人","width":"100","sortable":true},
									  	 {"field":"state","title":"状态","explain":"状态","width":"100","sortable":true,"hidden":true},
									  	 {"field":"cancel_name","title":"取消标记","explain":"取消标记","width":"100","sortable":true}
		                			  			 
                			  	  ]

	                	},
	                	{"id":"selectOrderInfoScan","name":"订单扫描信息",
	                	  	"columns":[
		                	  	         {"field":"billno","title":"运单号","explain":"运单号","width":"200","sortable":true},
		                	  	         {"field":"taskno","title":"派车单号","explain":"扫描类型","width":"200","sortable":true},
									  	 {"field":"peop_name","title":"扫描人","explain":"扫描人","width":"100","hidden":true,"sortable":true},
									  	 {"field":"czrq","title":"扫描时间","explain":"扫描时间","width":"200","sortable":true},
									  	 {"field":"pda_code","title":"PDA号","explain":"PDA号","width":"100","sortable":true}
		                			  			 
                			  	  ]

	                	},
	                	{"id":"selectDDCX_Current","name":"导入订单信息",
	                	  	"columns":[
		                	  	         {"field":"orderno","title":"订单号","explain":"订单号","width":"100","sortable":true},
		                	  	         {"field":"statename","title":"状态","explain":"状态","width":"100","sortable":true},
		                	  	         {"field":"postman","title":"发货人","explain":"发货人","width":"100","sortable":true},
									  	 {"field":"posttel","title":"发货人电话","explain":"发货人电话","width":"100","sortable":true},
									  	 {"field":"boxes","title":"箱数","explain":"箱数","width":"100","sortable":true},
									  	 {"field":"vol","title":"体积","explain":"体积","width":"100","sortable":true},
									  	 {"field":"jjbj","title":"加急标记","explain":"加急标记","width":"100","sortable":true},
									  	 {"field":"postaddress","title":"发货地址","explain":"发货地址","width":"300","sortable":true},
									  	 {"field":"thnet","title":"提货网点","explain":"提货网点","width":"100","sortable":true,"hidden":true},
									  	 {"field":"net_name","title":"提货网点","explain":"提货网点","width":"100","sortable":true},		                			  			 
                			  	  ]

                	}

		                ];
		return column_header;
}
