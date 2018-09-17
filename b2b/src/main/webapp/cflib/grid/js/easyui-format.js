//点击图片弹出新窗口
function windowFillBack(val,row,index){
	var rid = Math.random();
	var bmjb=["","一级","二级","三级","四级"];
	if(ui.isNull(bmjb[val])){
		return "";
	}
   return "<font color='red'>"+bmjb[val]+"</font>";
}


function getBM_lv(val,row,index){
	return 'background-color:#ffee00;color:red;';

}


function RyxxBc(val,row,index){
	var bc=["白班","夜班"];
	return bc[val];
}

function RyxxIsZZ(val,row,index){
	var zz =["是","否"];
	return zz[val];
}

function RyxxCblx(val,row,index){
	var cblx=["工伤","社保三险","五险","意外险"];
	return cblx[val];
}


function selectTreeMenu1(val,row){
	var button ="<input id='alqx1_"+row.code+"' class='alqx"+row.code+"_okclick' type='checkbox' value='okclick' onclick=alqxBack('alqx1_"+row.code+"','d_MENU','"+row.code+"',0,'okclick')></input>";
	return button;
}
function selectTreeMenu2(val,row){
	var button ="<input id='alqx2_"+row.code+"' class='alqx"+row.code+"_update'  type='checkbox' value='update' onclick=alqxBack('alqx2_"+row.code+"','d_MENU','"+row.code+"',0,'update')></input>";
	return button;
}
function selectTreeMenu3(val,row){
	var button ="<input id='alqx3_"+row.code+"' class='alqx"+row.code+"_okdel' type='checkbox'  value='okdel' onclick=alqxBack('alqx3_"+row.code+"','d_MENU','"+row.code+"',0,'okdel')></input>";
	return button;
}
function selectTreeMenu4(val,row){
	var button ="<input id='alqx4_"+row.code+"' class='alqx"+row.code+"_oksh'  type='checkbox' value='oksh' onclick=alqxBack('alqx4_"+row.code+"','d_MENU','"+row.code+"',0,'oksh')></input>";
	return button;
}
function selectTreeMenu5(val,row){
	var button ="<input id='alqx5_"+row.code+"' class='alqx"+row.code+"_okshs'  type='checkbox' value='okshs' onclick=alqxBack('alqx5_"+row.code+"','d_MENU','"+row.code+"',0,'okshs')></input>";
	return button;
}
function selectTreeMenu6(val,row){
	var button ="<input id='alqx6_"+row.code+"' class='alqx"+row.code+"_queryclick' type='checkbox' value='queryclick' onclick=alqxBack('alqx6_"+row.code+"','d_MENU','"+row.code+"',0,'queryclick')></input>";
	return button;
}
var qxs={};
function alqxBack(checkbox,obj,id,yxbj,qx){
	var dyqx ={};
	var qxtem=[];
	var map ={};
	
	var row = $("#"+obj).treegrid('find',id);
	 if($("#"+checkbox).is(':checked')){
		 map[qx]=qx;
		 if(ui.isNull(row["alqx"])){
			 row["alqx"]=map
		 }else{
			 $.extend(row["alqx"],map);
		 }
		 
	 }else{
		 map[qx]="";
		 $.extend(row["alqx"],map);
	 }
	
}