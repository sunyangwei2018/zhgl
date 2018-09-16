function getColumns(){
		var column_header= [
							{"id":"queryZCSH","name":"工程收单查询",
		                		"columns":[
		                		        	{"field":"KHGSID","title":"客户公司ID","width":"100"},
											{"field":"KHGSNAME","title":"公司名称","width":"100"},
											{"field":"KHNAMEJC","title":"公司简称","width":"100"},
		                		        	{"field":"GSID","title":"销售公司ID","width":"100","hidden":true},
	                		           		{"field":"KHGSROLEID","title":"公司类型ID","width":"100","hidden":true},
	                		           		{"field":"KHGSROLENAME","title":"公司类型","width":"100"},
	                		           		{"field":"SJKHGSID","title":"代理商ID","width":"100"},
	                		           		{"field":"SJKHGSNAME","title":"代理商","width":"100"},
	                		           		{"field":"ADDRESS","title":"地址","width":"100"},
	                		           		{"field":"POSTCODE","title":"网点","width":"100"},
	                		           		{"field":"TEL","title":"电话","width":"100"},
											{"field":"EMAIL","title":"邮箱","width":"100"},
											{"field":"DQ_DQXX01","title":"地区省ID","width":"100","hidden":true},
											{"field":"DQ_DQXX02","title":"地区省","width":"100"},
											{"field":"DQXX01","title":"地区ID","width":"100","hidden":true},
											{"field":"DQXX02","title":"地区市","width":"100"},
											{"field":"REGIST_TIME","title":"注册时间","width":"100"},
											{"field":"MOBILE","title":"手机号","width":"100"},
											{"field":"SHR","title":"审核人","width":"100"},
											{"field":"SHRQ","title":"审核时间","width":"100"},
											{"field":"FLAG_SH","title":"审核状态","width":"100","hidden":true}
	                		           	]
		                	}
		                ];
		return column_header;
}
