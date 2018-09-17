function uiBaseForm(){ 
	this.tab = null;
	this.plugin = {};
	this.plugObj = {};
	this.data = {};
	
	
	this.afterInit = "";
	this.events = "";
	this.hideField = [];


	//this.sBillName = "form";
	//this.sOperateName = "getRecord";
	//this.async = "";
	//this.callback = {};

	this.setTab = function(tab){
		this.tab = tab;
	}
	this.getTab = function(){
		return $(this.tab);
	}

	this.setData = function(json){
		$.extend(this.data, json);
	}

	

     
	this.getData = function(){
		delete this.data["_id"];
		return this.data;
	}
	this.setAfterInit = function(fn){
		this.afterInit = fn;
	}
	this.getAfterInit = function(){
		return this.afterInit;
	}
	this.setPlugin = function(json){
		$.extend(this.plugin, json);
	}
	this.getPlugin = function(){
		return this.plugin;
	}

    this.setEvents = function(fn){
		this.events = fn;
	}

    this.runEvents = function(fn){
		if(!ui.isNull(this.events)){
			this.events();
		}
	}
    
    this.define = function(json){
		var obj = this;
		$.each(json,function(key,value){
			obj[key] = value;
		})
	}

	this.reloadPlugin = function(key, value){
		var form = this;
		try{
			this.getTab().find("#d_"+key).empty();
			var uiID = eval(value["uiid"]);
			if(!ui.isNull(uiID)){
				if( typeof uiID == "function" ){
					var json = value;
					json["id"] = key;
					json["obj"] = this.getTab().find("#d_"+key);
					json["query"] = true; 
					uiID = new uiID(json);
					return uiID;
				}
			}
		}catch(e){
			console.info("字段名为"+key+"的控件报错信息为:"+e.message);	
		}
	}
		
	this.initPlugIn = function(){
		var form = this;
		var plugin = form.plugin;
		$.each(plugin, function(key, value){
			try{//引入及控件JS
				var rid = Math.random();
				if(!ui.isNull(value["uiid"]) && $("script[src$='"+value["uiid"]+".js']").length==0){
					var src = $("script[src*='uiForm.js']").attr("src");
					src = src.replace("uiForm", value["uiid"]);
					src = src.replace("form", "pub");
					$.ajax({ 
						url: src, 
						type:'HEAD', 
						async: false,//使用同步的方式,true为异步方式
						error: function() {
							src = src.replace("pub", "o2oPub");
							$(document).find("body").append("<script type='text/javascript' src='"+src+"?rid="+rid+"'><\/script>");
						}, 
						success: function() {
							$(document).find("body").append("<script type='text/javascript' src='"+src+"?rid="+rid+"'><\/script>");
						} 
					});
				}
				var uiID = eval(value["uiid"]);
				var rid = Math.random();
				if(!ui.isNull(uiID)){
					if( typeof uiID == "function" ){
						var json = value;
						json["id"] = key;
						json["obj"] = form.getTab().find("#d_"+key);
						uiID = new uiID(json);
					}
				}
			}catch(e){
				console.info("字段名为"+key+"的控件报错信息为:"+e.message);	
			}
		});	
	}

	this.initValue = function(data){
		var form = this;
		$.each(data,function(key,value){
			var html = form.getTab().find("[name='"+key+"']");
			var ui = form.getTab().find("#d_"+key);
				var html = form.getTab().find("[name='"+key+"']");
				if( ui.length > 0){
					
				}else if( html.length > 0){
					if(html[0].type == "radio"){
						value = ui.isString(value) ? value: value.key;
						html.filter("[value='"+value+"']").attr("checked",true);
					}else if(html[0].type == "checkbox"){
						var array = ui.isString(value) ? value.split("|"): value; 
						for(var i=0;i<array.length;i++){
							var row = array[i];
							row = ui.isString(row) ? row: row.key;
							html.filter("[value='"+row+"']").attr("checked",true);
						}
					}else{
						if(html[0].type == "select-one"){
							value = ui.isString(value) ? value: value.key;
						}
						html.val(value);
					}
				}
		});
		
		var plugin = this.plugin;
			$.each(plugin,function(key,value){
				var obj = form.getTab().find("[name='"+key+"']");
				if(!obj.is(":disabled") && !ui.isNull(value["qx"])){
					var qx = ui.isNull(userInfo[value["qx"]])? "": userInfo[value["qx"]];
					obj.val(qx);
				}
			});
	}

	this.setHideField = function(hideField){
		this.hideField = hideField;
	}
   
	this.initHidden = function(json){
		for(var i=0;i<json.HIDEFIELD.length;i++){
				var key = json.HIDEFIELD[i];
				if(key.indexOf(".") == -1) {
					this.getTab().find("'#"+key+"'").hide();
				}
			}
	}	

	this.lastInit = function(){
		if(!ui.isNull(this.afterInit)){
			this.afterInit();
		}
	}

	this.previewForm = function(json){
		this.initWorkflow();
		this.initValue(this.data);
		this.initPlugIn();
		this.runEvents();
		this.lastInit();
		setTimeout(function(){ui.loading(false);},1000);
	}

	this.initForm = function(json){
		ui.loading(true);
		//initForm-loadData-initPlugin-initDis-initValue-initHid
		//this.initWorkflow();//初始化流程
		//this.initDivs(json);//初始化窗口数据
		if(!ui.isNull(this.sk01) && !ui.isNull(this.pid)){
			this.loadData();
		}
		if(!ui.isNull(this.initField)){
			this.initDisabled({"INITFIELD":this.initField});
		}
		this.initPlugIn();
		this.initValue(this.data);
		this.initHidden({"HIDEFIELD":this.hideField});
		this.loadButton();
		this.runEvents();
		this.lastInit();
		setTimeout(function(){ui.loading(false);},1000);
	}
	
	this.readData =function(){
		var json={};
		this.getTab().find("input:not(:disabled):not(:button)").each(function(){
			var key = $(this).attr('name');
			if(!ui.isNull(key)){
				var type = $(this).attr('type');
				var value = $(this).val();
				if(type=='text' || type=='hidden'){
					json[key]=value;
				}else if((type=='radio' || type=='checkbox') && $(this).prop('checked')){
					if((typeof(json[key]) == "undefined" || json[key]==""))json[key] = [];
						var json2={};
							json2['key']=value;
							json2['value']=$(this).next("label").text();
						if(type=='checkbox'){ 
							json[key].push(json2);
						}else{
							json[key]=json2;
						}
					}
				if(json[key]==undefined || json[key]==null){
						json[key]="";
				}
			}
		});
			
		this.getTab().find("select:not(:disabled) option:selected").each(function(){
			var key=$(this).parent().attr('name');
			var json2={};
			json2['key']=$(this).val();
			json2['value']=$(this).text();
			json[key]=json2;
		});
			
		this.getTab().find("textarea").each(function(){
			var key=$(this).attr('name');
			json[key]=$(this).val();
		});
			
		$.each(this.plugin,function(key,value){
			if(value["uiid"] == "uiGrid"){
				var gridData = uiGrid.getGrid(key).getDatas();
				gridData = $.map(gridData,function(value){
					if(!ui.isNull(value)){
						return value;
					}
		           });
				json[key] = gridData;
			}
		});

		delete json["undefined"];
		this.setData(json);		
	}
	
	this.fullScreen = function(queryForm, obj){
		var elem = this.getTab()[0];
		if (elem.requestFullscreen) {
		  elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
		  elem.msRequestFullscreen();
		} else if (elem.mozRequestFullScreen) {
		  elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
		  elem.webkitRequestFullscreen();
		}
		
		this.getTab().find(".ui_operation").hide();
	}
}
