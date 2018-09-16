var WORKFLOWIMG = ui.Form();
var zone = userInfo.DQXX01;

WORKFLOWIMG.setPlugin({
});

WORKFLOWIMG.define({
	 
});

//加载事件
WORKFLOWIMG.setEvents(function(){
	
});

//加载完成
WORKFLOWIMG.setAfterInit(function() {  
	var processInstanceId = ui.getUrlParam("processInstanceId");
	WORKFLOWIMG.getTab().find("#workflow").empty();
	WORKFLOWIMG.getTab().find("#gzlbh").html("流程图(流程实例编号：'"+processInstanceId+"')");
	WORKFLOWIMG.getTab().find("#workflow").append('<img src="/workflow/process/trace/auto.do?processInstanceId='+processInstanceId+'&rid='+Math.random()+'"></img>');
})
debugger;
var json = {};
WORKFLOWIMG.setTab($("#WORKFLOWIMG")); 
WORKFLOWIMG.setData({});
WORKFLOWIMG.initForm(json);