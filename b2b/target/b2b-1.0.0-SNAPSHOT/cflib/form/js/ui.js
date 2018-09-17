$(document).ready(function(){

$(document).on("focus",".page_main input[type='text']",function(){
  $(this).css({"box-shadow":"0px 0px 5px #e1e1e1 inset"})
})
$(document).on("blur",".page_main input[type='text']",function(){
  $(this).css({"box-shadow":"0px 0px 0px #e1e1e1 inset"})
})


/***
菜单ui_nav
***/	
$(document).on("click",".nav_menu > li > a",function(){
  var nav_menu_class = $(this).parent("li").attr("class");
  if(nav_menu_class == "xuan"){
    $(".nav_menu > li").removeClass("xuan");
    $(".nav_menu > li").children(".sub_menu").slideUp();
    $(this).parent("li").removeClass("xuan"); 
    $(this).siblings(".sub_menu").slideUp();
    $(this).children(".arrow").attr("class","arrow fa fa-angle-left");
  }else if(nav_menu_class == "bian"){
    $(".nav_menu > li").removeClass("xuan");
    $(".nav_menu > li").children(".sub_menu").slideUp();
    $(".nav_menu > li > a > .arrow").attr("class","arrow fa fa-angle-left");
    $(this).parent("li").attr("class","xuan bian"); 
    $(this).siblings(".sub_menu").slideDown();
    $(this).children(".arrow").attr("class","arrow fa fa-angle-down");
  }else if(nav_menu_class == "xuan bian"){
    $(".nav_menu > li").removeClass("xuan");
    $(".nav_menu > li").children(".sub_menu").slideUp();
    $(this).parent("li").attr("class","bian"); 
    $(this).siblings(".sub_menu").slideUp();
    $(this).children(".arrow").attr("class","arrow fa fa-angle-left");
  }else if(nav_menu_class == "nav_seach"){
  }else{
    $(".nav_menu > li").removeClass("xuan");
    $(".nav_menu > li").children(".sub_menu").slideUp();
    $(".nav_menu > li > a > .arrow").attr("class","arrow fa fa-angle-left");
    $(this).parent("li").addClass("xuan"); 
    $(this).siblings(".sub_menu").slideDown(); 
    $(this).children(".arrow").attr("class","arrow fa fa-angle-down")
  }
})

$(document).on("mouseover",".sub_menu > li",function(){
	$(this).children(".thr_menu").fadeIn();
})
$(document).on("mouseleave",".sub_menu > li",function(){
	$(this).children(".thr_menu").fadeOut();
})

/***
流程ui_process
***/
$(document).on("click",".ui_process > i",function(){
	$(this).addClass("xuan");
	$(this).next(".ui_process_menu").removeClass("hide");
});
$(document).on("mouseleave",".ui_process",function(){
	$(this).children("i").removeClass("xuan");
	$(this).children(".ui_process_menu").addClass("hide");
});


/***
滚动条事件
***/
$(document).on("scroll",window,function(){
/***
快速菜单ui_quicnav
***/
  $(".ui_quicnav");
  	
})


/***
页面目录ui_catalog
***/
$(document).on("click",".catalog_ico",function(){
  var catalog_ico_class = $(this).attr("class");
  if(catalog_ico_class == "catalog_ico"){
    $(this).addClass("xuan");
    $(this).next(".catalog_main").slideUp();
  }else{
    $(this).removeClass("xuan");
    $(this).next(".catalog_main").slideDown();
  }
})
$(document).on("click",".catalog_cz > i",function(){
  var i_class = $(this).attr("class");
  if(i_class == "fa fa-angle-down"){
	$(this).attr("class","fa fa-angle-left");
    $(this).parent().parent().next().slideUp();
  }else if(i_class == "fa fa-angle-left"){
	$(this).attr("class","fa fa-angle-down");
    $(this).parent().parent().next().slideDown();
  }
})

	
/***
下拉菜单ui_navbar/ui_dropdown_menu
***/
$(document).on("mouseover",".ui_header > .ui_navbar > li",function(){
  $(this).addClass("xuan"); 
})
$(document).on("mouseleave",".ui_header > .ui_navbar > li",function(){
  $(this).removeClass("xuan"); 
})


/***
系统配置ui_pageconfigure
***/
$(document).on("click",".ui_pageconfigure > i",function(){
  var ui_pageconfigure_class = $(this).attr("class");
  if(ui_pageconfigure_class == "fa fa-cog"){
    $(this).attr("class","xuan fa fa-times")
    $(this).siblings("ul").fadeIn();	  
  }else{
    $(this).attr("class","fa fa-cog")
    $(this).siblings("ul").fadeOut();	  
  }
})
 
 
/***
下拉按钮ui_btn_group
***/
$(document).on("click",".ui_btn_group > span",function(){
  var i_class = $(this).children("i").attr("class");
  $(this).addClass("xuan");
  if(i_class == "fa fa-angle-right"){
	 $(this).children("i").attr("class","fa fa-angle-left");
     $(this).siblings(".btn_hide_main").fadeOut();
   }else if(i_class == "fa fa-angle-left"){
	 $(this).children("i").attr("class","fa fa-angle-right");
     $(this).siblings(".btn_hide_main").fadeIn();
   }else if(i_class == "fa fa-angle-down"){
	 $(this).children("i").attr("class","fa fa-angle-up");
     $(this).siblings(".ui_dropdown_menu").css({"display":"block"});
   }else if(i_class == "fa fa-angle-up"){
	 $(this).children("i").attr("class","fa fa-angle-down");
     $(this).siblings(".ui_dropdown_menu").css({"display":"none"});
   }
})
$(document).on("focus",".ui_btn_group > input",function(){
  $(this).siblings("span").addClass("xuan");
  var i = $(this).siblings("span").find("i");
  if(i.hasClass("fa-angle-down")){
	  JL.changeClass(i, "fa-angle-down", "fa-angle-up");
  }
  $(this).siblings(".ui_dropdown_menu").css({"display":"block"});
})
$(document).on("mouseleave",".ui_btn_group",function(){
  $(this).children("input").blur();
  $(this).children("span").removeClass("xuan");
  var i = $(this).children("span").find("i");
  if(i.hasClass("fa-angle-up")){
	  JL.changeClass(i, "fa-angle-up", "fa-angle-down");
  }
  $(this).children(".ui_dropdown_menu").css({"display":"none"});
})
$(document).on("click",".ui_btn_group > .ui_dropdown_menu > li > a",function(){
  var this_text = $(this).text();
  $(this).parent("li").parent(".ui_dropdown_menu").siblings("a").text(this_text);
  $(this).parent("li").parent(".ui_dropdown_menu").siblings("input").val(this_text);
  $(this).parent("li").parent(".ui_dropdown_menu").siblings(".btn_group_text").text(this_text);
  $(this).parent("li").parent(".ui_dropdown_menu").css({"display":"none"});
})


/***
控件ui_input_radio
***/
$(document).on("click",".ui_input_radio",function(){
  var radio_class = $(this).children("i").attr("class");
  if(radio_class == "fa fa-circle-o"){
     $(this).children("i").attr("class","fa fa-dot-circle-o");
	 $(this).siblings().children("i").attr("class","fa fa-circle-o");
  }	
})

/***
控件ui_input_checkbox
***/
$(document).on("click",".ui_input_checkbox",function(){
  var radio_class = $(this).children("i").attr("class");
  if(radio_class == "fa fa-circle-o"){
     $(this).children("i").attr("class","fa fa-check-circle-o");
  }else{
     $(this).children("i").attr("class","fa fa-circle-o");
  }	
})

/***
消息提示ui_message
***/
$(document).on("click","#message_ts",function(){
  $(".ui_modal").fadeIn();
  $(".ui_message").removeClass("hide");
  $(".ui_message").animate({"margin-top":"35px","opacity":"1"});
})
$(document).on("click",".ui_message_close",function(){
  $(".ui_modal").fadeOut();
  $(".ui_message").animate({"margin-top":"0","opacity":"0"},function(){$(".ui_message").addClass("hide")});
})

/***
下拉按钮多级ui_dropleft_menu
***/
$(document).on("mouseover",".ui_dropdown_menu > li",function(){
  $(this).children(".ui_dropleft_menu").css({"display":"block"});
})
$(document).on("mouseleave",".ui_dropdown_menu > li",function(){
  $(this).children(".ui_dropleft_menu").css({"display":"none"});
})
/***
ui_from_01/提示
***/
$(document).on("focus",".ui_form_01 > dl > dd input",function(){
  $(this).siblings("label").css({"display":"block"})
  $(this).parent().siblings("label").css({"display":"block"})
  $(this).parent().parent().siblings("label").css({"display":"block"})
})  

})


