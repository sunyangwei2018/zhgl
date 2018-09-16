function uiForm(){
    //平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        xll: false,
        ipad:false,
        Android:false
    };
    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
    system.android = (navigator.userAgent.match(/Android/i) != null)?true:false;
    if (system.win) {
    	//PC端
    	uiBaseForm.call(this);//继承uiBaseForm
    	uiButton.call(this);//继承uiButton
    	//uiTransport.call(this);//继承uiTransport
    	//uiO2OForm.call(this);//继承uiO2OFrom
    	//uiPrint.call(this);
    	//uiCallCenter.call(this);
    } else if(system.android||system.mac) {	
    	//手机端 
    	uiWorkflow_mobile.call(this);//继承uiWorkflow_mobile
    	uiBaseForm_mobile.call(this);//继承uiBaseForm_mobile
    	uiButton_mobile.call(this);//继承uiButton_mobile
    	uiTransport_mobile.call(this);//继承uiTransport_mobile
    	uiO2OForm_mobile.call(this);//继承uiO2OForm_mobile
    }
	
}
var rid = Math.random();
var src = $("script").eq(-1).attr("src");
document.write("<script type='text/javascript' src='"+src.replace("uiForm","uiBaseForm")+"?rid="+rid+"'><\/script>");
//document.write("<script type='text/javascript' src='"+src.replace("uiForm","uiO2OForm")+"?rid="+rid+"'><\/script>");
//document.write("<script type='text/javascript' src='"+src.replace("uiForm","uiTransport")+"?rid="+rid+"'><\/script>");
//document.write("<script type='text/javascript' src='"+src.replace("uiForm","uiWorkflow")+"?rid="+rid+"'><\/script>");
document.write("<script type='text/javascript' src='"+src.replace("uiForm","uiButton")+"?rid="+rid+"'><\/script>");