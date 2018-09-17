package com.cf.tms.interfaces;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.framework.dataset.DataSet;

@Controller
@RequestMapping("/JstzItemInterface")
public class JstzItemInterface extends FormTools{
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/insertBoxItemEXECL.do")
	public Map getXHLB(String XmlData) throws Exception {
		//下载文件路径
		Map returnMap = new HashMap();
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int JSTZ = Integer.parseInt(json.getString("JSTZ"));
		List<Map> excelList = getExcelData(JSTZ,files);//读取EXECL数据
		String CFRY01 = json.getString("CFRY01");
		//验证上传数据是否合理
		for (int i = 0; i< excelList.size(); i++) {
			Map obj = excelList.get(i);
			//都不能为空
			if(FormTools.isNull(obj.get("stms"))&&FormTools.isNull(obj.get("jsno"))&&FormTools.isNull(obj.get("spje"))){
	 			throw new Exception((i+2)+"行需填写完整！");
	 		}
			//获取 xml 获得结算单号 判断是否有对应的单号
			Map objmap = (Map) queryForObjectByXML("tms", "JSSPHXDR.selectJSNO", obj);
			if(FormTools.isNull(objmap)){
	 			throw new Exception((i+2)+"行结算单号不存在！");
	 		}
			//税票金额不能小于0 
			if(Float.valueOf(String.valueOf(obj.get("spje")))<=0){
	 			throw new Exception((i+2)+"行税票金额要大于0！");
	 		}
		}
		cds = new DataSet(excelList.toString());//准备数据
		String sql=" INSERT INTO jssphxdr_tab_ls(stms,jsno,spje,lrr,lrrq,lrwd)"
				+ " VALUES(stms?,jsno?,spje?,'"+CFRY01+"',sysdate ,'"+json.getString("nownet")+"' ) ";
		//将数据放入临时表
		String delall ="delete from jssphxdr_tab_ls a where exists(select * from jssphxdr_tab b where a.jsno=b.jsno and a.lrr='"+CFRY01+"')";

		//先删除临时表
		Map delBillrow= null;
		int del = execSQL(tms, delall, delBillrow);
		
	    //插入结算调整表
		Map[] row= getRows(sql, null);
		int[] b= execSQL(tms, sql, row);
		sql=" insert into jssphxdr_tab(stms ,jsno ,spje ,lrr,lrrq,lrwd)"
				+ " select a.stms stms,a.jsno jsno,a.spje spje,a.lrr lrr,a.lrrq lrrq,a.lrwd lrwd from jssphxdr_tab_ls a"
				+ " where (select count(1) from jssphxdr_tab where stms =a.stms)=0";
		//插入正式表判断
		Map tempRow = null;
		int a1 = execSQL(tms, sql,tempRow);
		if(a1>0){
			returnMap.put("MSGID", "S");
		}else{
			returnMap.put("MSGID", "E");
			throw new Exception("导入税票号重复");
		}
		return returnMap;
	}

}
