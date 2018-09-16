(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
	//当不是disabled状态并值为空时赋值
    $.fn.valueNotDisabled = function (value) {
    	if(!this.is(":disabled") && UI.isNull(this.value)){
    		this.val(value);
    	}
    };

    //当不是disabled状态并值不为空时赋值
    $.fn.valueNotNull_NotDisabled = function (value) {
    	if(!this.is(":disabled")){
    		this.val(value);
    	}
    };
    //给当前元素创建遮罩层
	$.fn.divOverlay = function(flag){
		//先删后创建遮罩
		this.find(".overlay").remove();
		var $div = $("<div class='overlay' style='position:absolute/*fixed*/;/*top:0px;left: 0px;*/margin:0px;z-index: 10001;display:none;filter:alpha(opacity=60);  background-color: #777;  opacity: 0.5;-moz-opacity: 0.5;'></div>")
		this.append($div);
		if(flag){
			//展示遮罩
			$div.css({'height':this.height(),'width':this.width()});  
			$div.show(); 
		}else{
			//隐藏遮罩
			$div.hide(); 
		}
	}
    //判断数组是否包含元素
    Array.prototype.contains = function ( needle ) {
    	  for (i in this) {
    	    if (this[i] == needle) return true;
    	  }
    	  return false;
    	}
}));
