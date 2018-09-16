$(document).ready(function(){
	var dybh=$.getUrlParam("dybh");
	var json = {};
	json["src"] = "jlquery/select.do";
	json["data"] = {"json":JSON.stringify([{
		"dataType":"Json",
		"sqlid": "Pub.selectFormPrint",
		"dybh": dybh
	}])};
	var resultData = ui.ajax(json);
	if(!ui.isNull(resultData)){
		resultData = resultData["data"];
		for(var i=0; i<resultData.length; i++){
			var row = resultData[i];
			var option = $("<option value='"+row["dyym"]+"'>"+row["dymc"]+"</option>").appendTo("#print_temp");
			if(!ui.isNull(row["defaultprint"])){
				changeTemp(row["dyym"]);
				option.attr("selected", "selected");
			}
		}
		
		$("#print_temp").change(function(){
			changeTemp(this.value);
		});
		
		$(".fa-print").click(function(){
			$(".print_hide").hide();
			//打印预览  
		   // $("#printWB").execWB(7,1); 
			window.print();
			$(".print_hide").show();
		});
	}
});

var changeTemp = function(DYYM){
	//$("#print_main").empty();
	var json ={};
	json["dybh"] = $.getUrlParam("dybh");
	json["temple"] = DYYM;
	sessionStorage["PRINT_DATAS"] = JSON.stringify($.extend(JSON.parse(sessionStorage["PRINT_DATAS"]),json));
	var url = sessionStorage.getItem("PRINT_URL")+'?json='+sessionStorage.getItem("PRINT_DATAS")+"&rid="+Math.random();
//	$("#print_main").attr("data",url);
	$("#print_main").attr("src",url);
//	for(var i = 0; i<PRINT_DATAS.length; i++){
//		if(PRINT_DATAS.length > 1){
//			var print_hide = $("<div class='print_hide' style='padding: 50px 0px;'><div style='width: 6%;float: left;'><input type='checkbox' checked='checked' style='margin-left: 15px;'/>第"+(i+1)+"单</div><div style='width: 94%;float: left;'><hr style='100%' /></div></div>").appendTo("#print_main");
//			print_hide.find(":checkbox").click(function(){
//				if($(this).is(":checked")){
//					$(this).parent().parent().next().slideDown();
//				}else{
//					$(this).parent().parent().next().slideUp();
//				}
//			});
//		}
//		var PRINT_PAGE = $("<div data-index='"+i+"' data-name='"+DYYM+"' class='print_div'></div>").appendTo("#print_main");
//		PRINT_PAGE.load(DYYM, function(){
//			var print_page = $(this);
//			var index = print_page.attr("data-index");
//			var PRINT_DATA = JSON.parse(sessionStorage["PRINT_DATAS"])[index];
//			$.each(PRINT_DATA, function(key, value){
//				if(print_page.find("div#"+key).length > 0){
//					print_page.find("#"+key).html(value);
//				}else if(print_page.find("table#"+key)){
//					var title = print_page.find("table#"+key+" tr");
//					for(var i=0; i<value.length; i++){
//						var row = value[i];
//						var clone = title.clone();
//						var tds = clone.find("td");
//						for(var j=0; j<tds.length; j++){
//							var td = tds.eq(j);
//							var name = td.attr("name");
//							var html = ui.isNull(row[name])? "":row[name];
//							td.html(html);
//						}
//						print_page.find("table#"+key).append(clone);
//					}
//				}
//			});
//			try{
//				var name = print_page.attr("data-name").split(".")[0];
//				var page = name.split("/");
//				page = page[page.length-1];
//				eval(page+"()");
//				console.info(page);
//			}catch(e){
//				console.info(e);
//			}
//
//		});
//	}
}
