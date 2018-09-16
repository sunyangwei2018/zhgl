
String.prototype.getpid = function(){
  if(this.length < 2) return -1;
  else if(this.length == 2){
    return  '0';
  }
  return this.substring(0, this.length - 2);
};
//展示菜单界面
var menu = {};
menu.data = {};
menu.dbData = {};

menu.init = function(o) {
	menu.load(o);
	/*$("#menu").append('<div title="公共信息">'+   
            '<ul class="easyui-datalist" data-options="border:false,fit:true">'+
            '<li><span><a href="#" onclick="function(){alert(1)}">企业文化</a></span></li>'+
            '<li>公文</li>'+
            '<li>新闻公告</li>'+
            '<li>重大信息</li>'+
        '</ul>'+  
    '</div>');*/
	menu.write(o);
		//alert(10010);
}

//获取数据
menu.load = function(o){
	var XmlData=[{"PERSON_ID":userInfo.USERID}];
	var ajaxJson = {};
	
	ajaxJson["src"] = "UserInfo/selectUserMenu.do";
	ajaxJson["data"] = {"json":JSON.stringify(XmlData)};
	menu.data = ui.ajax(ajaxJson).data["menu"];
	//查询代办菜单
	XmlData={};
	//url = pubJson.PcrmUrl+"/workflowAction/workflowList.do?PI_USERNAME="+o+"&xmlData="+JSON.stringify(XmlData);
	//menu.dbData = visitService(url);
}


//输出结果
menu.write = function(o){
	//$("#menuSuper").empty();
	var treeData=[];
	/*$.each(menu.data,function(i,val){//一级菜单
		var nodeMap ={};
		if(val.LEVELS==1){
			nodeMap["code"] = val.CODE;
			nodeMap["text"] = val.NAME;
			nodeMap["icon"] = val.ICON;
			//nodeMap["state"] = "closed";
			nodeMap["children"] = [];
			nodeMap["html"] ="";
			$.each(menu.data,function(j,node){//二级菜单
				var map = {};
				var tid = node.CODE.getpid();
				var mapattr = {};
				mapattr["url"] = node.URL;
				
				if(node.LEVELS==2){
					if(nodeMap["code"]==tid){
						map["text"] = node.NAME;
						map["attributes"] = mapattr;
						nodeMap.html +="<dl class='w12 panel-body ' style='cursor: pointer;border-left:none;border-right:none;'><dt class='w02'><img src='/images/list.gif' style='float:right;margin-right:5px;'></img></dt><dd class='w10' code="+node.CODE+" href="+node.URL+">"+node.NAME+"</div></dd></dl>";
						nodeMap.children.push(map);
					}
				}
			});
			treeData.push(nodeMap);
		}
	});*/
	debugger;
	//$("#menuSuper").append('<div id="menu"  class="easyui-accordion" data-options="border:false,fit:true"></div>');
	$.each(menu.data,function(i,val){
		if(ui.isNull(val.s_code)){
			/*$('#menu').accordion('add', {
				code: val.code,
				title: val.name,
				html:'',
				iconCls: null,
				selected: false,
				content : '<div style="padding:10px"><ul class="easyui-datalist" data-options="border:false,fit:true" name="'+val.name+'"></ul></div>',  
			});*/
			$('#menu').append('<div id="menu'+val.code+'" title="'+val.name+'"><ul class="easyui-datalist" data-options="border:false,fit:true"></ul></div>');
		}else{
			if(val.mjbj==0){
				if(val.levels==2){
					//$('#menu').accordion('getPanel',val.s_codename).append('<div id="menu'+val.code+'" class="easyui-accordion" data-options="selected:false,animate:true" style="width:100%;font-size:10px;"/>');
					$('#menu').accordion('getPanel',val.s_codename).append('<div id="menu'+val.code+'" title="公共信息"><ul class="easyui-datalist" data-options="border:false,fit:true"></ul></div>');
					
					$.parser.parse('#menu');
					$("#menu"+val.code).accordion('add', {
						code: val.code,
						title: val.name,
						html:"",
						iconCls: val.icon,
						selected: false
					});
				}else{//多级菜单
					$('#menu'+val.s_code).accordion('getPanel',val.s_codename).append('<div id="menu'+val.code+'" class="easyui-accordion" data-options="selected:false,animate:true" style="width:100%"/>');
					var menu = "#menu"+val.s_code;
					$.parser.parse(menu);
					$("#menu"+val.code).accordion('add', {
						code: val.code,
						title: val.name,
						html:"",
						iconCls: val.icon,
						selected: false
					});
				}
				
			}else{
				if(val.levels==2){
					//$('#menu').accordion('getPanel',val.s_codename).append("<dl class='w12 panel-body ' style='cursor: pointer;border-left:none;border-right:none;'><dt class='w02'><img src='/images/list.gif' style='float:right;margin-right:5px;'></img></dt><dd class='w10' code="+val.code+" href="+val.url+">"+val.name+"</div></dd></dl>");
					  //$('#menu').accordion('getPanel',val.s_codename).append('')
					  //$('#menu').accordion('getPanel',val.s_codename).append('<ul class="easyui-datalist" data-options="border:false,fit:true"><li code='+val.code+' href='+val.url+' >'+val.name+'</li></ul>');
					  //$('#menu'+val.s_code).accordion('getPanel',val.s_codename).append("<li code="+val.code+" href="+val.url+" >"+val.name+"</li>");
					$('#menu'+val.s_code).find("ul").append("<li code="+val.code+"><span><a onClick='menu.control(\""+val.url+"\",\""+val.code+"\",\""+val.name+"\")' style='cursor: pointer'>"+val.name+"</a></span></li>");
				}else{
					//$('#menu'+val.s_code).accordion('getPanel',val.s_codename).append("<dl class='w12 panel-body ' style='cursor: pointer;border-left:none;border-right:none;'><dt class='w02'><img src='/images/list.gif' style='float:right;margin-right:5px;'></img></dt><dd class='w10' code="+val.code+" href="+val.url+">"+val.name+"</div></dd></dl>");
					$('#menu'+val.s_code).find("ul").append("<li code="+val.code+" href="+val.url+"  onClick='menu.control("+val.url+","+val.code+","+val.name+")'>"+val.name+"</li>");
				}
			}
		}
		
	})
	menu.data = null;
}

menu.control = function(url,code,name,json){
	if($('#navTab').tabs('exists',name)){
		  $('#navTab').tabs('select', name); 
		  return true;
	}
	
	$("#navTab").tabs('add',{
		showHeader:true,
	    title:name,    
	    //content:'<iframe frameborder="0" id="contentIfram" width="100%" height="100%" src ="'+node.attributes.url+"?rid="+rid+'" scrolling="no"></iframe>',
	    code:code,
	    href:url+"?rid="+Math.random(),//node.attributes.url+"?rid="+rid,
	    closable:true,
	    pageParam:json,
	    tools:[{
	    	iconCls:'icon-reload',//'icon-mini-refresh',    
	        handler:function(){
	        	var pp = $("#navTab").tabs('getSelected');//选中的选项卡对象 
	        	var content = pp.panel('options');//获取面板内容 
	        	$("#navTab").tabs('update',{//更新
	        	    tab:pp,
	        	    options:"dfd"
	        	})
	        	// 调用 'refresh' 方法更新选项卡面板的内容
	        	var tab = $('#navTab').tabs('getSelected');  
	        	// 获取选择的面板
	        	tab.panel('refresh', tab.panel('options').href);

	        }    
	    }],
	    onUpdate:function(title,index){
	    	ui.alert(title);
	    }
	});
}
	
	/*!--$("#menu").tree({
		data:treeData,
		onClick: function(node){
			var rid = Math.random();
			if($('#navTab').tabs('exists',node.text)){
				  $('#navTab').tabs('select', node.text); 
			}else{
				$("#navTab").tabs('add',{
					showHeader:true,
				    title:node.text,    
				    //content:'<iframe frameborder="0" id="contentIfram" width="100%" height="100%" src ="'+node.attributes.url+"?rid="+rid+'" scrolling="no"></iframe>',
				    href:node.attributes.url+"?rid="+rid,
				    closable:true,
				    tools:[{
				    	iconCls:'icon-reload',//'icon-mini-refresh',    
				        handler:function(){
				        	/*var pp = $("#navTab").tabs('getSelected');//选中的选项卡对象 
				        	var content = pp.panel('options');//获取面板内容 
				        	$("#navTab").tabs('update',{//更新
				        	    tab:pp,
				        	    options:"dfd"
				        	})*/
				        	// 调用 'refresh' 方法更新选项卡面板的内容
	/*!--			        	var tab = $('#navTab').tabs('getSelected');  
				        	// 获取选择的面板
				        	tab.panel('refresh', tab.panel('options').href);
	
				        }    
				    }],
				    onUpdate:function(title,index){
				    	ui.alert(title);
				    }
				});
			}
			
			$("#navTab").tabs({
				/*title:'adfds',
			    border:false,
			    href:'BM.html',
			    onSelect:function(title){    
			    	alert(title);
			    }*/
	/*!--			onLoad:function(panel){
					var url = node.attributes.url;
					var name = url.split("/");
					name = name[name.length-1];
					name = name.split(".html")[0];
					panel.attr("page",name);
					try{
						var uiform = eval(name);
						//panel.attr("onkeydown","uiform.loadKeyListenr(event);")//加载按键事件
						//uiform.setUrlParam("url",url);
						uiform.setTab(panel); 
						var json = {};
						uiform.setData({});
						uiform.initForm(json);
					}catch(e){
						console.log("error:"+e.message);
					}
				}
			});
			  //$('#navTab').tabs('getSelected').css('width', 'auto'); //重新tab body宽度为auto，如果你上面的添加语句设置了selected为false，注意使用下面注释的这句来获取你的tab
              //$('#tabs').tabs('getTab', subtitle).css('width', 'au
			//alert(node.text);  // 在用户点击的时候提示
		},
		onContextMenu: function(e, node){
			e.preventDefault();
			// 显示快捷菜单
			$('#mm').menu('show', {
				left: e.pageX,
				top: e.pageY
			});
		}
	});
	//$.parser.parse('#menu');	
}		--!*/




