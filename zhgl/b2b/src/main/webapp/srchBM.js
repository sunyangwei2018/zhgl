var srchBM = ui.Form();


srchBM.setPlugin({
	"BM" : {
		"page" : "部门查询",
		"uiid" : "easyuiGrid",
		"sqlid" : "CFBM.selectBM",
		"columnName" : "wlgl",//列头后缀xx.js
		"toolbar:" : "#form",
		"collapsible":true,//显示折叠按钮
		"pagination" : true//,//分页
		//"buttons" : ["Append","Remove"]//grid按钮
	},
})

//定义方法
srchBM.define({
	"query" : function(){
		var formJson =srchBM.getTab().find(".easyui-tabs").find("input").formToJson();
		var BM = srchBM.getPlugin()["BM"];
		BM["param"] = {"bm01":srchBM.getTab().find("[id='bm01']").textbox('getText').trim(),"bm02":srchBM.getTab().find("[id='bm02']").textbox('getText').trim()};
		srchBM.reloadPlugin("BM",BM);
	},
	"changeDiv" : function(obj){
		var url ="/srchBmDetail.html";
		$(obj).load(url,function(){
			
		})
	},"sh" : function(){
		ui.alert("审核");
	}
});

//定义事件
srchBM.setEvents(function() {
	$('#content-tabs').tabs({
			onSelect: function(title,index){
				var rid = Math.random();
				if(index==1){
					var tab = $("#detailsDiv");
					if($('#content-tabs').data("flag")==1){
						return false;
					}
					$('#content-tabs').tabs('update', {
						tab: tab,
						options: {
							title: '明细',
							href: '/srchBmDetail.html?rid='+rid+''  // 新内容的URL
						}
					});
					$('#content-tabs').data("flag",1);
				}
			}
		});

	/*srchBM.getTab().delegate("#navTab", "mousedown", function(event) {
		alert(100);
		alert(event.which);
		/*if(event.which==3){
			// 显示快捷菜单
			$('#mm').menu('show', {
				left: e.pageX,
				top: e.pageY
			});
		}*/
	/*})*/
})

//加载完成
srchBM.setAfterInit(function() {
	//追加按钮
	var alqx ={"sh":{"name":"审核","iconcls":"icon-save"}};
	srchBM.addButton(alqx);

})

console.log(srchBM);
