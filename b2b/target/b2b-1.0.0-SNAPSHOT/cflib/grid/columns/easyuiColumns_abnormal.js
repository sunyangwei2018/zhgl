function getColumns(){
		var column_header= [
		                	{"id":"selectAbnormalitem","name":"异常件跟进",
		                	  	"columns":[
	                			  			 {"field":"billno","title":"运单号","width":"150","sortable":true},
	                			  			 {"field":"djnr","title":"内容","width":"400","sortable":true},
	                			  			 {"field":"peop_name","title":"录入人","width":"150","sortable":true},
	                			  			 {"field":"net_name","title":"录入网点","width":"150","sortable":true},
	                			  			 {"field":"type","title":"录入类型","width":"150","sortable":true},
	                			  			 {"field":"lrrq","title":"录入日期","width":"150","sortable":true}
	                			  	  ]

		                	},
		                	{"id":"selectAbnormalitems","name":"异常件跟进",
		                	  	"columns":[
	                			  			 {"field":"billno","title":"运单号","width":"150","sortable":true},
	                			  			 {"field":"djnr","title":"内容","width":"400","sortable":true},
	                			  			 {"field":"peop_name","title":"录入人","width":"150","sortable":true},
	                			  			 {"field":"net_name","title":"录入网点","width":"150","sortable":true},
	                			  			 {"field":"type","title":"录入类型","width":"150","sortable":true},
	                			  			 {"field":"lrrq","title":"录入日期","width":"150","sortable":true}
	                			  	  ]

		                	},
		                	{"id":"selectBillno","name":"运单信息",
		                	  	"columns":[
	                			  			{"field":"billno","title":"运单号","width":"150","sortable":true},
	                			  			{"field":"name","title":"单据状态","width":"150","sortable":true},
	                			  			{"field":"type","title":"处理进度","width":"150","sortable":true},
	                			  			{"field":"yclxName","title":"异常类型","width":"150","sortable":true},
	                			  			{"field":"djnr","title":"登记内容","width":"300","sortable":true},
	                			  			{"field":"postname","title":"发货网点","width":"150","sortable":true},
	                			  			{"field":"postman","title":"发货人","width":"150","sortable":true},
	                			  			{"field":"posttel","title":"发货电话","width":"150","sortable":true},
	                			  			{"field":"postzoneName","title":"发货地","width":"150","sortable":true},
	                			  			{"field":"postdw","title":"发货单位","width":"150","sortable":true},
	                			  			{"field":"acceptname","title":"收货网点","width":"150","sortable":true},
	                			  			{"field":"acceptman","title":"收货人","width":"150","sortable":true},
	                			  			{"field":"accepttel","title":"收货电话","width":"150","sortable":true},
	                			  			{"field":"acceptzoneName","title":"收货地","width":"150","sortable":true},
	                			  			{"field":"acceptdw","title":"收货单位","width":"150","sortable":true}
	                			  	  ]

		                	}
		                ];
		return column_header;
}

		                	