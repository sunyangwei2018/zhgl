package com.cf.tms.interfaces;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.forms.FormUpload;
import com.cf.framework.dataset.DataSet;

@Controller
@RequestMapping("/VipBoxItemInterface")
public class VipBoxItemInterface extends FormTools{
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/insertVipBoxItemEXECL.do")
	public Map getXHLB(String XmlData) throws Exception {
		Map returnMap = new HashMap();
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int XHHX = Integer.parseInt(json.getString("XHHX"));
		List<Map> excelList = getExcelData(XHHX,files);
		String CFRY01 = json.getString("CFRY01");
//		String querySQL = " select boxno from bill_boxitem_tab ";
//		List<Map> boxnolist = queryForList(tms, querySQL);
		for (int i = 0; i< excelList.size(); i++) {
			Map obj = excelList.get(i);
			if(FormTools.isNull(obj.get("billno"))&&FormTools.isNull(obj.get("boxno"))){
	 			throw new Exception((i+2)+"行字段运单号,箱号必填项");
	 		}
		}
		Map[] row= FormTools.mapperToMapArrayList(excelList.toString());
		String sql=" INSERT INTO bill_vipboxitem_tmp_tab(billno,boxno,vipflag,tbbj,lrr)"
				+ " VALUES(billno?, boxno?,vipflag?,0,'"+CFRY01+"') ";
		
		String delall ="delete from bill_vipboxitem_tmp_tab  where lrr='"+CFRY01+"'";

		//先删除临时表
		Map delBillrow= null;
		int del = execSQL(tms, delall, delBillrow);		
		
	    //插入临时表
		int[] b= execSQL(tms, sql, row);
		String delrepeatbox=" delete from bill_boxitem_tab where boxno=boxno? and billno=billno? and vipflag=1";
		execSQL(tms, delrepeatbox, row);	
		sql=" INSERT INTO bill_boxitem_tab(billno,boxno,vipflag)"
				+ " select a.billno, a.boxno,a.vipflag from bill_vipboxitem_tmp_tab a"
				+ " where lrr='"+CFRY01+"' and tbbj=0 ";
				//+ " and (SELECT count(1) from bill_boxitem_tab where billno=a.billno)=0 ";
		//插入正式表
		Map tempRow = null;
		int a1 = execSQL(tms, sql,tempRow);
		if(a1>0){
			
			sql=" update scan_tab set billno=billno? where boxno=boxno? ";
			execSQL(tms, sql, row);
			
			sql=" update bill_vipboxitem_tmp_tab set tbbj=1 where lrr='"+CFRY01+"' and tbbj=0 ";
			execSQL(tms, sql, row);
			returnMap.put("MSGID", "S");	
		}else{
			returnMap.put("MSGID", "E");
			throw new Exception("导入箱号重复");
		}
		return returnMap;
	}

}
