package com.cf.tms.interfaces;

import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;


@Controller
@RequestMapping("/WDYFDZDInterface")
public class WDYFDZDInterface extends FormTools {
	
	/***
	 * 运单审核批量修改
	 * @param XmlData
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/updateWDYFDZDEXECL.do")
	public Map updateYDSH(String XmlData) throws Exception {
		Map returnMap = new HashMap();
		SimpleDateFormat fomat = new SimpleDateFormat("yyyy-MM");
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int MBBM = Integer.parseInt(json.getString("MBBM"));
		String CFRY01 = json.getString("CFRY01");
		List<Map> excelList = getExcelData(MBBM,files);//读取EXECL数据
		Map temp = new HashMap();
		List billnoArray= new ArrayList();
		for(int i=0;i<excelList.size();i++){//验证
			Map YD = excelList.get(i);			
			billnoArray.add(YD.get("BILLNO"));
		}
		Map[] row = FormTools.mapperToMapArrayList(excelList.toString());//准备数据
		excelList.clear();//清空
		String sql ="update wd_acceptpay_dzd_tab set THFEE=NVL(THFEE?,THFEE),FHZZFEE=NVL(FHZZFEE?,FHZZFEE),PSFEE=NVL(PSFEE?,PSFEE),"
				+ "FAHZZFEE=NVL(FAHZZFEE?,FAHZZFEE),DBFEE=NVL(DBFEE?,DBFEE),ZCFEE=NVL(ZCFEE?,ZCFEE),SHFEE=NVL(SHFEE?,SHFEE),SLFEE=NVL(SLFEE?,SLFEE),CCFEE=NVL(CCFEE?,CCFEE),"
				+ "GXFEE=NVL(GXFEE?,GXFEE),KDFEE=NVL(KDFEE?,KDFEE),QTFEE=NVL(QTFEE?,QTFEE),DFJE=NVL(DFJE?,DFJE),PKJE=NVL(PKJE?,PKJE),WTDJE=NVL(WTDJE?,WTDJE),JXJE=NVL(JXJE?,JXJE),"
				+ "YHZRJE=NVL(YHZRJE?,YHZRJE),PDAINPUTJE=NVL(PDAINPUTJE?,PDAINPUTJE)"
				+ " WHERE BILLNO=BILLNO? and NET_CODE=NET_CODE?";
		int[] a =execSQL(tms, sql, row);
		returnMap.put("MSGID", "S");
		returnMap.put("MSGDATA", billnoArray.toString());//返回查询导入结果集
		billnoArray.clear();//清空
		row=null;//清空
		return returnMap;
	}
}
