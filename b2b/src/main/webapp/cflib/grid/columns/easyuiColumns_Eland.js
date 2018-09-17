function getColumns(){
		var column_header= [
		                	{"id":"selectEland","name":"依恋运单",
		                	  	"columns":[
	                			  			 {"field":"yl_billno","title":"运单号","width":"150","sortable":true},
	                			  			 {"field":"tbbj","title":"同步标记","width":"80","sortable":true},
	                			  			 {"field":"create_user_name","title":"制表人","width":"80","sortable":true},
	                			  			 {"field":"create_date","title":"制表日期","width":"80","sortable":true},
	                			  			 {"field":"shop_code","title":"店铺代码","width":"80","sortable":true},
	                			  			 {"field":"shop_name","title":"店铺名称","width":"150","sortable":true},
	                			  			 {"field":"out_date","title":"出库日期","width":"80","sortable":true},
	                			  			 {"field":"arrive_address","title":"到达地","width":"150","sortable":true},
	                			  			 {"field":"receipt_address","title":"收货地址","width":"150","sortable":true},
	                			  			 {"field":"consign_date","title":"托运日期","width":"80","sortable":true},
	                			  			 {"field":"load_date","title":"装车日期","width":"80","sortable":true},
	                			  			 {"field":"transport_date","title":"运输周期","width":"80","sortable":true},
	                			  			 {"field":"contact_tel","title":"联系电话","width":"150","sortable":true},
	                			  			 {"field":"should_date","title":"应到日期","width":"80","sortable":true},
	                			  			 {"field":"transport_company","title":"运输公司","width":"150","sortable":true},
	                			  			 {"field":"ship_company","title":"发货公司","width":"80","sortable":true},
	                			  			 {"field":"ship_company_tel","title":"发货公司电话","width":"150","sortable":true},
	                			  			 {"field":"new_goods_volume","title":"新商品体积","width":"80","sortable":true},
	                			  			 {"field":"new_goods_no","title":"新商品箱数","width":"80","sortable":true},
	                			  			 {"field":"sketch_volume","title":"小品体积","width":"80","sortable":true},
	                			  			 {"field":"sketch_no","title":"小品箱数","width":"80","sortable":true},
	                			  			 {"field":"DP_volume","title":"DP体积","width":"80","sortable":true},
	                			  			 {"field":"DP_no","title":"DP箱数","width":"80","sortable":true},
	                			  			 {"field":"new_shop_volume","title":"新开店体积","width":"80","sortable":true},
	                			  			 {"field":"new_shop_no","title":"新开店箱数","width":"80","sortable":true},
	                			  			 {"field":"stock_volume","title":"库存体积","width":"80","sortable":true},
	                			  			 {"field":"stock_no","title":"库存箱数","width":"80","sortable":true},
	                			  			 {"field":"other_volume","title":"其它体积","width":"80","sortable":true},
	                			  			 {"field":"other_no","title":"其他箱号","width":"80","sortable":true},
	                			  			 {"field":"total_volume","title":"总体积","width":"80","sortable":true},
	                			  			 {"field":"total_no","title":"总箱数","width":"60","sortable":true},
	                			  			 {"field":"unit_box","title":"单位/箱","width":"80","sortable":true}
	                			  	  ]
		                	},
		                	{"id":"selectBillBox","name":"运单信息",
		                	  	"columns":[
	                			  			 {"field":"yl_billno","title":"运单号","width":"150","sortable":true},
	                			  			 {"field":"simple_code","title":"简码","width":"50","sortable":true},
	                			  			{"field":"yl_box_no","title":"箱号","width":"800","sortable":true}
	                			  	  ]

		                	},
		                	{"id":"selectElandShop","name":"衣恋客户信息",
		                	  	"columns":[
		                	  	           	 {"field":"shop_id","title":"店铺id","width":"150","sortable":true,"hidden":true},
	                			  			 {"field":"shop_code","title":"店铺代码","width":"150","sortable":true},
	                			  			 {"field":"shop_brand","title":"品牌","width":"50","sortable":true},
	                			  			 {"field":"shop_name","title":"店铺名称","width":"150","sortable":true},
	                			  			 {"field":"shop_address","title":"店铺地址","width":"150","sortable":true},
	                			  			 {"field":"cf_line","title":"春风线路","width":"50","sortable":true},
	                			  			 {"field":"cf_store","title":"春风库位","width":"100","sortable":true},
	                			  			 {"field":"insert_time","title":"增加时间","width":"150","sortable":true},
	                			  			 {"field":"insertman","title":"增加人","width":"50","sortable":true},
	                			  			 {"field":"area_code","title":"地区编码","width":"80","sortable":true,"hidden":true},
	                			  			 {"field":"name","title":"到达地","width":"80","sortable":true},
	                			  			 {"field":"net_code","title":"到达网点编码","width":"80","sortable":true,"hidden":true},
	                			  			 {"field":"net_name","title":"到达网点","width":"80","sortable":true}
	                			  	  ]

		                	},
		                	{"id":"selectEtamShop","name":"艾格客户信息",
		                	  	"columns":[
	                			  			 {"field":"shop_code","title":"店铺代码","width":"80","sortable":true},
	                			  			 {"field":"ckaddress","title":"仓库地址","width":"150","sortable":true},
	                			  			 {"field":"xxaddress","title":"详细地址","width":"300","sortable":true},
	                			  			 {"field":"linkman","title":"联系人","width":"250","sortable":true},
	                			  			 {"field":"linktel","title":"联系电话","width":"150","sortable":true},
	                			  			 {"field":"area_code","title":"所在地区","width":"100","sortable":true,"hidden":true},
	                			  			 {"field":"area_name","title":"所在地区","width":"100","sortable":true},
	                			  			 {"field":"net_code","title":"所属网点","width":"150","sortable":true,"hidden":true},
	                			  			{"field":"net_name","title":"所属网点","width":"150","sortable":true}
	                			  	  ]

		                	}
		                ];
		return column_header;
}

		                	