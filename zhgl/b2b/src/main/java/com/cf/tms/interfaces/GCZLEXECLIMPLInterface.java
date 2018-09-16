package com.cf.tms.interfaces;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.forms.FormUpload;
import com.cf.framework.dataset.DataSet;
import com.cf.framework.dataset.IDataSet;
import com.cf.utils.PubFun;

@Controller
@RequestMapping("/GCZLEXECLIMPLInterface")
public class GCZLEXECLIMPLInterface extends FormTools{
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/insertGCZLEXECL.do")
	public Map insertAWD(String XmlData,HttpServletRequest request) throws Exception {
		Map returnMap = new HashMap();
		int year =0;
		int year1 =0;
		int moth =0;
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int MBBM = Integer.parseInt(json.getString("MBBM"));
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date endDate = new Date();   
		JSONArray neddfield = JSONArray.fromObject("[{\"billno\":\"运单号\"},{\"postzone\":\"始发地\"},"
				+ "{\"acceptzone\":\"到达地\"},{\"gg\":\"规格\"}"
				+ ",{\"acceptaddr\":\"收货地址\"},{\"cus_code\":\"客户代码\"}"
				+ ",{\"fkfs\":\"付款方式\"},{\"hwlb\":\"货物类别\",\"acceptdw\":\"收货单位\",\"postdate\":\"托运日期\"}]");//,{\"postnet\":\"始发网点\"}{\"hwlb\":\"货物类别\"}

		List<Map> excelList = getExcelData(MBBM,files);

		JSONArray AWDlist = new JSONArray();
		for(int i=0;i<excelList.size();i++){
			Map AWD = excelList.get(i); 
			
			
			for(int j=0;j<neddfield.size();j++){
				Map poj = (Map) neddfield.get(j);
				Iterator it = poj.keySet().iterator();
				while(it.hasNext()){
					Object key= it.next();
					if(FormTools.isNull(AWD.get(key.toString()))){
						throw new Exception((i+2)+"行字段【"+poj.get(key.toString())+"】必填项");
					}					
				}
			}
			AWDlist.add(AWD);
		}
		Map<String,String> userInfo = (Map<String,String>) request.getSession().getAttribute("userInfo");
		//String acceptnet = queryForMap(tms, "select net_code from area_tab where code='"+map.get("acceptzone", 0)+"'").get("net_code").toString();
		String sql ="INSERT INTO GCZL_EXECL (GCBH,GC_NAME,CUSTOMER_ADDRESS,CUSTOMER_LXR,CUSTOMER_TEL,CUSTOMER_POSTCODE,INSTALL_DATE,"
				+ "CUSTOMER_PHONE_AREACODE,CUSTOMER_PHONE,STORES_ID,STORES_NAME,SELLER_ID,SELLER_NAME,CUSTOMER_NAME,BUY_DATE,SELL_TYPE,"
				+ "SELL_ONE,SELL_TWO,SPWJ_ID,SPWJ_NAME,SPNJ_ID,SPNJ_NAME,OPT,CREATE_DATE,CREATE_TIME) VALUES "
				+ "(GCBH?, GC_NAME?, CUSTOMER_ADDRESS?, CUSTOMER_LXR?,CUSTOMER_TEL?,CUSTOMER_POSTCODE?,to_date(INSTALL_DATE?,'yyyy-MM-dd'),CUSTOMER_PHONE_AREACODE?"
				+ ",CUSTOMER_PHONE?,"
				+ "STORES_ID?, STORES_NAME?, SELLER_ID?,SELLER_NAME?,CUSTOMER_NAME?,to_date(BUY_DATE?,'yyyy-MM-dd'),SELL_TYPE?,"
				+ "SELL_ONE?,SELL_TWO?,SPWJ_ID?,SPWJ_NAME?,SPNJ_ID?,SPNJ_NAME?,'"+userInfo.get("USERID").toString()+"',SYSDATE,SYSDATE)";
	   
	    //插入临时表
		Map[] row= FormTools.mapperToMapArrayList(AWDlist.toString());
		int[] b= execSQL(tms, sql, row);                                               
		return returnMap;
	}
	
	public boolean isLatestWeek(Date addtime,Date now){
		Calendar calendar = Calendar.getInstance();  //得到日历
		calendar.setTime(now);//把当前时间赋给日历
		calendar.add(Calendar.DAY_OF_MONTH, -15);  //设置为15天前
		Date before15days = calendar.getTime();   //得到15天前的时间
		if(before15days.getTime() > addtime.getTime()){
			return true;
		}else{
			return false;
		}
	}
}
