package com.cf.tms.interfaces;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.forms.FormUpload;
import com.cf.framework.dataset.DataSet;
import com.cf.framework.dataset.IDataSet;

@Controller
@RequestMapping("/LZTHInterface")
public class LZTHDRInterface extends FormTools{
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/insertLZTHEXECL.do")
	public Map insertAWD(String XmlData) throws Exception {
		Map returnMap = new HashMap();
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int XHHX = Integer.parseInt(json.getString("XHHX"));
		List<Map> excelList = getExcelData(XHHX,files);
		String CFRY01 = json.getString("CFRY01");
		for (int i = 0; i< excelList.size(); i++) {
			Map obj = excelList.get(i);
			if(FormTools.isNull(obj.get("billno"))&&FormTools.isNull(obj.get("postdate"))&&FormTools.isNull(obj.get("dpdm"))&&FormTools.isNull(obj.get("dpmc"))){
	 			throw new Exception("第"+(i+2)+"行字段退单号,托运日期,店铺代码,店铺名称必填");
	 		}
			System.out.println(obj.get("billno").toString().substring(0,1));
			if (!obj.get("billno").toString().substring(0,1).equals("F")) {
				throw new Exception("第"+(i+2)+"行字段退单号必须以F开头");
			}
			if (obj.get("dpdm").toString().length()!=4) {
				throw new Exception("第"+(i+2)+"行字段店铺代码必须是四位");
			}
			if (!valid(obj.get("postdate").toString())) {
				throw new Exception("第"+(i+2)+"行字段日期格式不正确");
			}
		}
		cds = new DataSet(excelList.toString());
		String sql=" INSERT INTO lzthbill_tmp_tab(billno,postdate,dpdm,dpmc,lrr)"
				+ " VALUES(billno?, to_date(postdate?,'YYYY-MM-DD'),dpdm?,dpmc?,'"+CFRY01+"') ";
		
		String delall ="delete from lzthbill_tmp_tab a where a.lrr='"+CFRY01+"'";
		
		//先删除临时表
		Map delBillrow= null;
		int del = execSQL(tms, delall, delBillrow);	
		
	    //插入临时表
		String delall2 ="delete from lzthbill_tab a where a.billno=(SELECT billno from lzthbill_tab where billno=a.billno) ";
		execSQL(tms, delall2, delBillrow);
		Map[] row= getRows(sql, null);
		int[] b= execSQL(tms, sql, row);
		sql=" INSERT INTO lzthbill_tab(billno,postdate,dpdm,dpmc,cfqdh,lrr,lrrq)"
				+ " select a.billno, a.postdate, a.dpdm, a.dpmc,' ','"+CFRY01+"',sysdate from lzthbill_tmp_tab a"
				+ " where lrr='"+CFRY01+"' "
				+ " and (SELECT count(1) from lzthbill_tab where billno=a.billno)=0 ";
		//插入正式表
		Map tempRow = null;
		int a1 = execSQL(tms, sql,tempRow);
		if(a1>0){
			returnMap.put("MSGID", "S");	
		}else{
			returnMap.put("MSGID", "E");
			throw new Exception("导入绫致退货F单重复");
		}
		return returnMap;		
	}
	

	public boolean valid(String str){		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	    try{
	        Date date = (Date)formatter.parse(str);
	        return str.equals(formatter.format(date));
	    }catch(Exception e){
	       return false;
	    }
	}
}
