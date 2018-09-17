var message = ui.Form();
message.setPlugin({
	"SPKD" : {
		"uiid" : "easyuiGrid",
		"sqlid" : "HXPICCX.selectHXPKD_message",
		"columnName" : "CWGL",
//		"selectOnCheck": true,
//		"checkOnSelect":true,
//		"singleSelect":false,
		"pagination" : true,//分页
		"query":true,
		"param" : {"zrwd":userInfo.WD01},
		"listener": {
		}
	}
});
message.define({
	
	"getdownlaod" : function(payno,billno,memo,money){
		$.messager.progress({ 
			title:'请稍后', 
			msg:'页面加载中...',
			text: '数据正在下载......' 
		});

	    var url="http://dev.spring56.com:8080/pdfdownload/expoerPic/exportHX.do";
		 $.ajax({
             type: "POST",
             url: url,
             traditional: true,
             data: {"billno":billno,"payno":payno,"memo":memo,"money":money},
             dataType: "json",
             success: function(data){
            	 //alert(JSON.stringify(data));
            	 if(data!=null){
//            		 ui.alert("下载成功!");
            		 window.location.href=data.url;
            		 $.messager.progress('close');
            		 
            		var ajaxJson = {};
 					ajaxJson["src"] = "/HXPICDRInterface/saveHxPicDownLog.do";   
 					ajaxJson["data"] = {
 						"XmlData" : JSON.stringify($.extend(
 														   {"wd":userInfo.WD01},
 														   {"payno":payno}
 								))
 					};
 					ui.ajax(ajaxJson);
 					
 					var SPKD = message.getPlugin()["SPKD"];
 					SPKD["param"] = {"zrwd":userInfo.WD01};
 					message.reloadPlugin("SPKD",SPKD);
            	 }
             }
		 });
	}

});

message.setAfterInit(function() {
	
	message.getTab().find('#btn1').linkbutton({
		onClick: function(){
        		 window.location.href="user/getBillnoInfoExcel.do?wd="+userInfo.WD01;
		}
	});
});
message.setTab($("#message_dialog").dialog()); 
var json = {};
message.setData({});
message.initForm(json);