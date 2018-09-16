var uiUpload = function(json){
	this.config = {
		"sBillName": "FormUpload",//接口路径(有默认值)
		"sOperateName": "multiUpload.do",//接口方法(有默认值),
		"preset": {
			"img": ["jpg","bmp","gif","png","jpeg"], 
			"text": ["txt","doc","docx"], 
			"excel": ["xls","xlsx"], 
			"html": ["html","htm"],
			"zip": ["zip","rar"]
		},
		"multi":true,
		"fileType":[], //预设类型 img|text|excel|html
		"suffix":[],  //扩展可上传文件类型
		"listener": {} //监听事件 afterUpload
	};
	$.extend(this.config, json);	
	var thisPlugin = this;
	this.obj = this.config.obj;
	this.version = 3;
	this.data = [];

	this.setData = function(data){
		this.data = ui.formatArray(data);
		this.appendFile(data);
	};

	this.getData = function(){
		return this.data;
	};
	
	this.disabled = function(flag){
		flag = ui.isNull(flag)? true: flag;
		if(flag){
			this.load_main.hide();
		}else{
			this.load_main.show();
		}
	};
	
	this.init = function(json){
		$(this.obj).empty();
		$(this.obj).addClass("ui_up_img");
		$(this.obj).addClass("textbox");
		var load_main = $("<div>").appendTo(this.obj);
		load_main.addClass("load_main");
		var i_fa = $("<i class='fa fa-cloud-upload'></i>").appendTo(load_main);
		i_fa.click(function(){
			$(this).next().click();
		});
		var file = $("<input>").appendTo(load_main);
		file.addClass("hide");
		file.attr("type", "file");
		file.attr("name", "file_"+this.config.id);
		file.attr("multiple", "multiple");
		file.change(function(){
			if(!ui.isNull(thisPlugin.config.fileType)){
				var fileType = thisPlugin.config.fileType;
				var type = thisPlugin.config.suffix;
				for(var i=0; i<fileType.length; i++){
					var key = fileType[i];
					var preset = thisPlugin.config.preset[key];
					console.info(preset);
					type = type.concat(preset);
					console.info(type);
					console.info(preset);
				}
				var files = this.files;
				for(var i=0; i<files.length; i++){
					var file = files[i];
					var split = file.name.split(".");
					var suffix = split[split.length-1].toLocaleLowerCase();
					if($.inArray(suffix, type) == -1){
						ui.tip("上传文件类型错误","warning");
						return false;
					}
				}
			}
			
			thisPlugin.submit($(this));
		});
		
		var file_main = $("<div>").appendTo(this.obj);
		file_main.addClass("w12 img_main");
		var fa_angle_left = $("<i class='last fa fa-angle-left'></i>").appendTo(file_main);
		fa_angle_left.click(function(){
			var scroll = $(this).next().scrollLeft();
			$(this).next().scrollLeft(scroll-20);
		});
		
		var more_img = $("<div>").addClass("more_img").appendTo(file_main);
		var ul = $("<ul>").appendTo(more_img);
		
		var fa_angle_right = $("<i class='next fa fa-angle-right'></i>").appendTo(file_main);
		fa_angle_right.click(function(){
			var scroll = $(this).prev().scrollLeft();
			$(this).prev().scrollLeft(scroll+20);
		});
		
		this.ul = ul;
		this.load_main = load_main;
	};
	
	this.appendFile = function(files) {
		for(var i=0;i<files.length;i++){
			var file = files[i];
			//删除后上传
			if(!thisPlugin.multi){
				thisPlugin.ul.empty();
			}
			var li = $("<li class='ui_btn btn_blue'><i class='fa fa-cloud-download'></i>"+file["FILE_DESC"]+"</li>").appendTo(thisPlugin.ul);
			li.data(file);
			li.click(function(){
				if(!ui.isNull(thisPlugin.config.listener.onclickDownFiles) && thisPlugin.data.length > 0){
					thisPlugin.config.listener.onclickDownFiles($(this));
				}else{
					var XmlData = {};
					XmlData["filename"] = $(this).data("FILE_DESC");
					XmlData["url"] = $(this).data("FILE_URL")+"."+$(this).data("FILE_DESC").split(".")[1];
					ui.download("FormUpload/download.do", XmlData);
				}
			});
			
			if(!this.load_main.is(":hidden")){
				var remove = $("<i class='fa fa-times-circle'></i>").appendTo(li);
				remove.click(function(){
					var parentLi = $(this).closest("li");
					var parentData = parentLi.data();
					parentLi.remove();
					thisPlugin.data.splice($.inArray(parentData, thisPlugin.data),1);
				});
			}
		}	
	};
	
	this.success = function(data) { 
		 $.messager.progress('close');
		var jsonData = [];
		try{
			jsonData = JSON.parse(data).data.resultData;
		}catch(e){
			ui.tip(data.replace("Exception: java.lang.Exception:",""),"error"); 
		}	
		var files = jsonData;
		thisPlugin.appendFile(files);
		$.unique($.merge(thisPlugin.data, files));
		
		if(!ui.isNull(thisPlugin.config.listener.afterUpload) && thisPlugin.data.length > 0){
			thisPlugin.config.listener.afterUpload(jsonData);
		}
	};
	
	this.submit = function(obj){
		if(!ui.isNull(thisPlugin.config.listener.beforeUpload) && thisPlugin.data.length > 0){
			thisPlugin.config.listener.beforeUpload(obj);
		}
		$.messager.progress({ 
			title:'请稍后', 
			msg:'页面加载中...',
			text: '数据正在上传......' 
		});
		$.ajaxFileUpload({
			type:"POST",
			secureuri:false,
			fileElementId:[obj],
			url:encodeURI(this.config.sBillName + "/" + this.config.sOperateName),//encodeURI避免中文乱码
			data:{},
			dataType:"text",
			success: this.success
		});
	};
	this.init();
};