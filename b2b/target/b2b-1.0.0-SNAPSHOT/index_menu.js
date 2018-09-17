var rightClickMenu = {
	refresh: {
		text: "刷新页面", 
		func: function() {
			location.reload();
		}
	},newRow: {
		text: "新增一行", 
		func: function() {
			console.info(window.event);
		}
	},closeThis: {
		text: "关闭当前页", 
		func: function() {
			var tab = $('#navTab').tabs('getSelected');
			var index = $('#navTab').tabs('getTabIndex',tab);
			$('#navTab').tabs('close',index);
			//$(this).remove();
		}
	},closeNexts: {
		text: "关闭右侧活页", 
		func: function() {
			var tab = $('#navTab').tabs('getSelected');
			var index = $('#navTab').tabs('getTabIndex',tab);
			$('#navTab').tabs('close',++index);
		}
	},closePrevs: {
		text: "关闭左侧活页", 
		func: function() {
			var tab = $('#navTab').tabs('getSelected');
			var index = $('#navTab').tabs('getTabIndex',tab);
			$('#navTab').tabs('close',--index);
		}
	},closeAll: {
		text: "关闭所有活页", 
		func: function() {
			$.each($(".tabs li").find("span.tabs-closable"),function(i,tab){
				//获取所有可关闭的选项卡  
                //var tab = $(".tabs-closable", this).text();  
				var tab = $(this).text();
				$("#navTab").tabs('close', tab);  
			})
			
		}
	},changeSkin: {
		text: "更换皮肤",
		data: [[{
			text: "默认", 
			func: function() {
				ui.cookie("changeSkin","default");
				var href=$("link[href*='easyui.css']").attr("href");
				$("link[href*='easyui.css']").attr("href",href.replace(/themes\/[a-z]*/, "themes/"+ui.cookie("changeSkin")+""));
			}
		},
		{
			text: "黑色", 
			func: function() {
				ui.cookie("changeSkin","black");
				var href=$("link[href*='easyui.css']").attr("href");
				$("link[href*='easyui.css']").attr("href",href.replace(/themes\/[a-z]*/, "themes/"+ui.cookie("changeSkin")+""));
			}
		},
		{
			text: "引导带", 
			func: function() {
				ui.cookie("changeSkin","bootstrap");
				var href=$("link[href*='easyui.css']").attr("href");
				$("link[href*='easyui.css']").attr("href",href.replace(/themes\/[a-z]*/, "themes/"+ui.cookie("changeSkin")+""));
			}
		},
		{
			text: "灰色", 
			/*gray*/
			func: function() {
				ui.cookie("changeSkin","gray");
				var href=$("link[href*='easyui.css']").attr("href");
				$("link[href*='easyui.css']").attr("href",href.replace(/themes\/[a-z]*/, "themes/"+ui.cookie("changeSkin")+""));
			}
		},
		{
			text: "地铁", 
			func: function() {
				ui.cookie("changeSkin","metro");
				var href=$("link[href*='easyui.css']").attr("href");
				$("link[href*='easyui.css']").attr("href",href.replace(/themes\/[a-z]*/, "themes/"+ui.cookie("changeSkin")+""));
			}
		},
		{
			text: "丘珀蒂诺", 
			func: function() {
				ui.cookie("changeSkin","cupertino");
				var href=$("link[href*='easyui.css']").attr("href");
				$("link[href*='easyui.css']").attr("href",href.replace(/themes\/[a-z]*/, "themes/"+ui.cookie("changeSkin")+""));
			}
		},
		{
			text: "暗潮", 
			func: function() {
				ui.cookie("changeSkin","darkhive");
				var href=$("link[href*='easyui.css']").attr("href");
				$("link[href*='easyui.css']").attr("href",href.replace(/themes\/[a-z]*/, "themes/"+ui.cookie("changeSkin")+""));
			}
		},
		{
			text: "胡椒粉", 
			func: function() {
				ui.cookie("changeSkin","peppergrinder");
				var href=$("link[href*='easyui.css']").attr("href");
				$("link[href*='easyui.css']").attr("href",href.replace(/themes\/[a-z]*/, "themes/"+ui.cookie("changeSkin")+""));
			}
		},
		{
			text: "阳光", 
			func: function() {
				ui.cookie("changeSkin","sunny");
				var href=$("link[href*='easyui.css']").attr("href");
				$("link[href*='easyui.css']").attr("href",href.replace(/themes\/[a-z]*/, "themes/"+ui.cookie("changeSkin")+""));
			}
		}]]
		
	}
}


/*$(document).on("mousedown","#navTab > .tabs-panels >.panel >.panel-body > div:first",function(){
	$.smartMenu.remove();
	var imageMenuData = [ [ rightClickMenu.refresh,rightClickMenu.closeThis,rightClickMenu.closeNexts,rightClickMenu.closePrevs,rightClickMenu.closeAll,rightClickMenu.changeSkin ] ];
	$(this).smartMenu(imageMenuData);
});*/
/*$(document).on("mousedown","#navTab > .tabs-panels >.panel >.panel-body",function(){
	$.smartMenu.remove();
	if(!ui.isNull(sessionStorage.getItem("smartMenuIsFlag"))){
		$.smartMenu.remove();
		sessionStorage.removeItem("smartMenuIsFlag");
		return false;
	}
	var imageMenuData = [ [ rightClickMenu.closeThis,rightClickMenu.closeNexts,rightClickMenu.closePrevs,rightClickMenu.closeAll,rightClickMenu.changeSkin ] ];
	$(this).smartMenu(imageMenuData);
});*/
$(document).on("mousedown",".table_content > .table_show",function(){
	if(!ui.isNull(sessionStorage.getItem("smartMenuIsFlag"))){
		$.smartMenu.remove();
		sessionStorage.removeItem("smartMenuIsFlag");
		return false;
	}
	var len_modal = $(this).closest(".modal_body").length;
	if(len_modal == 0){
		$.smartMenu.remove();
		var imageMenuData = [ [ {
			text: "新增", 
			data: [[{
				text: "一行", 
				func: function() {
					var grid = $(this).parent().parent().attr("id").split("_")[1];
					grid = uiGrid.getGrid(grid)
					grid.addRow({});
				}
			} , {
				text: "三行", 
				func: function() {
					var grid = $(this).parent().parent().attr("id").split("_")[1];
					grid = uiGrid.getGrid(grid)
					grid.addRow({});
					grid.addRow({});
					grid.addRow({});
				}
			} , {
				text: "五行", 
				func: function() {
					var grid = $(this).parent().parent().attr("id").split("_")[1];
					grid = uiGrid.getGrid(grid)
					grid.addRow({});
					grid.addRow({});
					grid.addRow({});
					grid.addRow({});
					grid.addRow({});
				}
			}]]
		} , {
			text: "删除", 
			func: function() {
				var grid = $(this).parent().parent().attr("id").split("_")[1];
				grid = uiGrid.getGrid(grid)
				var selected = grid.getSelectedIndex();
				for(var i=0;i<selected.length;i++){
					grid.removeRow(selected[i]);
				}
			}
		} , {
			text: "清空", 
			func: function() {
				var grid = $(this).parent().parent().attr("id").split("_")[1];
				grid = uiGrid.getGrid(grid)
				grid.removeAll();
			}
		} ] ];
		$(this).smartMenu(imageMenuData);
	}
});
