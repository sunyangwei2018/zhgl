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
@RequestMapping("/KpdrItemInterface")
public class KpdrItemInterface extends FormTools{
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/kpdrBoxItemEXECL.do")
	public Map getKPDR(String XmlData) throws Exception {
		//下载文件路径
		Map returnMap = new HashMap();
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		System.out.println(json.toString());
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int JSKP = Integer.parseInt(json.getString("KPDR"));
		List<Map> excelList = getExcelData(JSKP,files);//读取EXECL数据
		String CFRY01 = json.getString("CFRY01");
		//验证上传数据是否合理  
		if(excelList.size()<=0){
			throw new Exception("excel没有开票数据！");
		}
		for (int i = 0; i< excelList.size(); i++) {
			Map obj = excelList.get(i);
			//都不能为空
			if(FormTools.isNull(obj.get("ticketno"))&&FormTools.isNull(obj.get("fph"))&&FormTools.isNull(obj.get("kpje"))){
	 			throw new Exception((i+2)+"行需填写完整！");
	 		}
			JSONObject map = new JSONObject();
			map.put("ticketno", obj.get("ticketno"));
			//获取申请金额
			Map objmapJE = (Map) queryForObjectByXML("tms", "KPDR.selectJSNO", map);
			if(FormTools.isNull(objmapJE)){
	 			throw new Exception((i+2)+"行申请单不存在！");
	 		}
			if(Float.valueOf(String.valueOf(obj.get("kpje")))>Float.valueOf(String.valueOf(objmapJE.get("kpfee")))){
	 			throw new Exception((i+2)+"行开票金额不能大于申请金额（"+objmapJE.get("kpfee")+"）！");
	 		}
			//获取审核
			if(Integer.valueOf(String.valueOf(objmapJE.get("djzt")))!=1){
	 			throw new Exception((i+2)+"行申请单当前状态【"+objmapJE.get("djztcn")+"】不允许开票！");
	 		}
		}

		String sql=" update ticket_tab set kpr='"+CFRY01+"' ,kprq = sysdate,djzt = 2,KPJE = kpje? where ticketno = ticketno? ";

		String sqlitem ="update ticket_item_tab set FPH = fph? where ticketno = ticketno?";
		
		String sqldr ="insert into ticketdr_tab(ticketno,fph,kpje,lrr,lrrq)"
				+ "   values(ticketno?,fph?,kpje?,'"+CFRY01+"',sysdate)";
        
		Map[] row= FormTools.mapperToMapArrayList(excelList.toString());
		
		int[] a= execSQL(tms, sql, row);
		
		int[] b= execSQL(tms, sqlitem, row);
		

		if(a[0]*b[0]>0){
			returnMap.put("MSGID", "S");
		}else{
			returnMap.put("MSGID", "E");
			throw new Exception("导入开票失败");
		}
		return returnMap;
	}

}
