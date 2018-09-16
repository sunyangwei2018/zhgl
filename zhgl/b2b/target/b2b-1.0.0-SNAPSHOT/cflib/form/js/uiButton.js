function uiButton(){
	
	this.btnParam = [];
	
	this.setBtnParam = function(btnParam){
		this.btnParam = btnParam;
	}
	
	this.updateBtnParam = function(key, btnParam){
		$.extend(this.btnParam[key],btnParam);
	}

	this.buttons = {
		"del":"<a href='#' id='del' data-iconcls='icon-cancel'>删除</a>",
		"ref":"<a href='#' id='ref' data-iconcls='icon-reload'>刷新</a>",
		"query":"<a href='#' id='query' keywords='e.key  == \"F2\" || e.keyCode == 113' data-iconcls='icon-search'>查询</a>",
		"print":"<a href='#' id='print' data-iconcls='icon-print'>打印</a>",
		"help":"<a href='#' id='help' data-iconcls='icon-help'>帮助</a>",
		"save":"<a href='#' id='save' data-iconcls='icon-save' keywords='e.ctrlKey  == true && e.keyCode == 83'>保存</a>",
		"back":"<a href='#' id='back' data-iconcls='icon-back'>驳回</a>",
		"add":"<a href='#' id='add' data-iconcls='icon-add'>新增</a>",
		"edit":"<a href='#' id='edit' data-iconcls='icon-edit'>修改</a>",
		"cancel":"<a href='#' id='cancel' data-iconcls='icon-no'>取消</a>",
		"cancel1":"<a href='#' id='cancel1' data-iconcls='icon-no'>取消复审</a>",
		"check":"<a href='#' id='check' data-iconcls='icon-ok'>审核</a>",
		"check1":"<a href='#' id='check1' data-iconcls='icon-ok'>初审</a>",
		"check2":"<a href='#' id='check2' data-iconcls='icon-ok'>复审</a>",
		"check3":"<a href='#' id='check3' data-iconcls='icon-ok'>财务审核</a>",
		"payment":"<a href='#' id='payment' data-iconcls='icon-open-pay'>付款</a>",
		"export":"<a href='#' id='export' data-iconcls='icon-redo'>导出</a>",
		"import":"<a href='#' id='import' data-iconcls='icon-undo'>导入</a>",
		"ticket":"<a href='#' id='ticket' data-iconcls='icon-open-ticket'>开票申请</a>",
		"jsd":"<a href='#' id='jsd' data-iconcls='icon-open-ticket'>生成结算单</a>",
		"ticketkp":"<a href='#' id='ticketkp' data-iconcls='icon-open-kp'>开票</a>",
		"receipt":"<a href='#' id='receipt' data-iconcls='icon-open-pay'>收款</a>",
		"writtenoff":"<a href='#' id='writtenoff' data-iconcls='icon-open-writtenoff'>核销</a>",
		"payable":"<a href='#' id='payable' data-iconcls='icon-open-pay'>交款</a>",
		"ok":"<a href='#' id='ok' data-iconcls='icon-ok'>确认</a>",
		"feedback":"<a href='#' id='feedback' data-iconcls='icon-edit'>反馈</a>",
		"savePad":"<a href='#' id='savePad' data-iconcls='icon-save'>保存草稿</a>",
		"saveBatch":"<a href='#' id='saveBatch' data-iconcls='icon-save'>批量通过</a>",
		"backBatch":"<a href='#' id='backBatch' data-iconcls='icon-save'>批量驳回</a>",
		"downBatch":"<a href='#' id='downBatch' data-iconcls='icon-save'>批量下载</a>"
	}
	
	this.btnDefine = function(json){
		var obj = this;
		$.each(json,function(key,value){
			obj[key] = value;
		})
	}
	
	this.addButton = function(json){
		//{"uidelte":{"name":"删除","sBillName":"DHD"},"uiupdate":{"name":"修改","sBillName":"DHD"}}
		var obj = this;
		$.each(json,function(key,val){
			//如果以存在不追加button
			/*if(obj.hasOwnProperty(key)){
				return false;
			}*/
			//追加button
			obj.buttons[key] = "<a href='#' id='"+key+"' data-iconcls='"+val.iconcls+"' keywords='"+val.keywords+"'>"+val.name+"</a>";
			//追加button属性
			obj.btnParam.push(key);
		});
		this.loadButton();
	}
	
	this.loadButton = function(){
		var obj = this;
		var html = null;
			if(obj.getTab().find(".ui_operation").length > 0){
				html = obj.getTab();
			}else{
				html = $("<div class='easyui-panel' style='padding:5px;'></div>");
				//html.appendTo(this.getTab().find("body"));
				//this.getTab().find("body").insertBefore(html,this.getTab().find("body>div").eq(0));
			}
			//{"uiSave":{"sBillName":"form","button":function(){}},"uiSaveDraft":{"bill":"DHD","button":function(){}}
			if(obj.getTab().find("div[uibtn='linkButton']").length > 0){
				obj.getTab().find("div[uibtn='linkButton']").remove();
			}
			var div = $('<div uibtn="linkButton" class="easyui-panel panel-body panel-body-noheader" style="border-left-style:none;border-right-style:none;border-top-style:none;padding: 5px; width: 100%;" title=""></div>');
			$.each(this.btnParam,function(i,key){
				//生成button
				
				var button  =$(obj.buttons[key]);
				button.linkbutton({    
				    iconCls: button.data("iconcls"),
				    //plain: true,
				    onClick: function(){
					    if(typeof eval("obj."+key) == "function"){
					    	button.linkbutton('disable')
					    	//检查异地登录
					    	ui.checkLoginOut();
							eval("obj."+key+"();");
					    	ui.sleep(500);
					    	button.linkbutton('enable');
					    }
				    }
				});
				
				
				//obj.getTab().find("div.easyui-panel").eq(0).append(button);
				div.append(button);
				div.insertBefore(obj.getTab().find("div").first());
				/*$(button).click(function(){
					if(typeof eval("obj."+$(this).attr("id")) == "function"){
						//当前button：set属性
						eval("obj."+$(this).attr("id")+"(this,obj.btnParam[key]);");
					}
				});*/
				//button事件初始化
				/*obj.getTab().find("input[id=\""+key+"\"]").click(function(){
					if(typeof eval("obj."+key) == "function"){
						//当前button：set属性
						eval("obj."+key+"(this,obj.btnParam[key]);");
					}
				})*/
			})
			
			this.loadKeyListenr();	
	}
	
	//初始化按键事件
	this.loadKeyListenr = function(){
		var obj = this;
		obj.getTab().attr('tabindex', 0).keydown(function(e){
			$.each(obj.btnParam,function(i,key){
				var button  =$(obj.buttons[key]);
				var keywords = ui.isNull(button.attr("keywords"))?false:eval(button.attr("keywords"));
				if(keywords){
				 	e.returnValue = false;
					e.preventDefault();//屏蔽浏览器键盘事件
					if(typeof eval("obj."+key) == "function"){
						obj.getTab().find("#"+key).focus();
						obj.getTab().find("#"+key).click();
						//eval("obj."+key+"();");
						//e.preventDefault();
					}
				}
			})
		});
	}
	
	this.hideButton = function(id){
		this.getTab().find(".ui_operation #"+id).hide();
	}
	
	this.disabledButton = function(id){
		ui.disabledClass(this.getTab().find(".ui_operation #"+id),true);
	}

	/*this.okref = function(obj,json){
		if(typeof(this.okref)=='function'){
			if(this.okref()){
				return;
			}
		}
	}
	
	this.queryclick = function(obj,json){
		if(typeof(this.queryclick)=='function'){
			if(this.queryclick()){
				return;
			}
		}
	}

	this.print = function(obj,json){
		if(typeof(this.print)=='function'){
			if(this.print()){
				return;
			}
		}
	}
	
	this.help = function(obj,json){
		if(typeof(this.help)=='function'){
			if(this.help()){
				return;
			}
		}
	}
	
	this.okclick = function(obj,json){
		if(typeof(this.okclick)=='function'){
			if(this.okclick()){
				return;
			}
		}
	}
	
	this.okdel = function(obj,json){
		if(typeof(this.okdel)=='function'){
				if(this.okdel()){
					return;
				}
		}
	}
*/
	
}
