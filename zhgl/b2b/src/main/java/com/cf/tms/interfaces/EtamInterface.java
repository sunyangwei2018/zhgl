package com.cf.tms.interfaces;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.forms.FormUpload;
import com.cf.framework.dataset.DataSet;

@Controller
@RequestMapping("/EtamInterface")
public class EtamInterface extends FormTools{
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/insertEtamEXECL.do")
	public Map getXHLB(String XmlData) throws Exception {
		 int max=1000000;
        int min=100000;
        Random random = new Random();
        int s = random.nextInt(max)%(max-min+1) + min;
	       
		Map returnMap = new HashMap();
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int MBBM = Integer.parseInt(json.getString("MBBM"));
		String CFRY01 = json.getString("CFRY01");

		List<Map> excelList = getExcelData(MBBM,files);
		JSONArray AWDlist = new JSONArray();
		for(int i=0;i<excelList.size();i++){
			Map AWD = excelList.get(i); 
			if(FormTools.isNull(AWD.get("etam_billno").toString())){
	 			throw new Exception((i+2)+"行字段为委托单号，不能为空。");
	 		}
			if(FormTools.isNull(AWD.get("cys"))){
				 throw new Exception((i+2)+"行字段为承运商，不能为空。");
			}
			if(FormTools.isNull(AWD.get("shd_code"))){
				 throw new Exception((i+2)+"行字段为收货地，不能为空。");
			}
			JSONObject map4 = new JSONObject();
			map4.put("shop_code", AWD.get("shd_code")); 
			Map objmap = (Map) queryForObjectByXML("tms", "CFEtamShop.selectEtamShop", map4);
			if(FormTools.isNull(objmap)){
				throw new Exception((i+2)+"行收货地【"+AWD.get("shd_code")+"】不存在");
			}
			if(FormTools.isNull(AWD.get("shd_name"))){
				 throw new Exception((i+2)+"行字段为收货地名，不能为空。");
			}
			if(FormTools.isNull(AWD.get("fysj"))){
				 throw new Exception((i+2)+"行字段为发运时间，不能为空。");
			}
			if(FormTools.isNull(AWD.get("weight"))){
				 throw new Exception((i+2)+"行字段为重量，不能为空。");
			}
			if(FormTools.isNull(AWD.get("boxes"))){
				 throw new Exception((i+2)+"行字段为箱数，不能为空。");
			}
			if(FormTools.isNull(AWD.get("xxaddress"))){
				 throw new Exception((i+2)+"行字段为详细地址，不能为空。");
			}
			if(FormTools.isNull(AWD.get("yzjg"))){
				 throw new Exception((i+2)+"行字段为运作机构，不能为空。");
			}
			JSONObject map = new JSONObject();
			map.put("cus_code", "200008"); 
			Map obj = (Map) queryForObjectByXML("tms", "CFAWD.selectKH", map);
			obj.putAll(AWD);
			AWDlist.add(obj);
		}
		//String acceptnet = queryForMap(tms, "select net_code from area_tab where code='"+map.get("acceptzone", 0)+"'").get("net_code").toString();
		String sql ="INSERT INTO ETAM_BILL_TAB (ETAM_BILLNO, CYS, YSFS, SHD_CODE, SHD_NAME, ZCSJ, FYSJ, YDSJ, DUALS, WEIGHT, BOXES, YFJE, XXADDRESS, ZDADDRESS, YZJG, QSJG, LRR, LRRQ, LRWD, TBBJ, PROVINCE, CITY)"
				+ " select  "
				+ " etam_billno? etam_billno, cys? cys, ysfs? ysfs, shd_code? shd_code, shd_name? shd_name, TO_DATE(zcsj?, 'SYYYY-MM-DD HH24:MI:SS') zcsj, TO_DATE(fysj?, 'SYYYY-MM-DD HH24:MI:SS') fysj, TO_DATE(ydsj?, 'SYYYY-MM-DD HH24:MI:SS') ydsj, duals? duals, weight? weight, boxes? boxes, yfje? yfje, xxaddress? xxaddress, zdaddress? zdaddress, yzjg? yzjg, qsjg? qsjg, '"+CFRY01+"' lrr, sysdate lrrq, '"+json.getString("nownet")+"' lrwd, '"+s+"' tbbj, province? province, city? city from dual"
				+ " WHERE NOT EXISTS (select ETAM_BILLNO from ETAM_BILL_TAB where ETAM_BILLNO=ETAM_BILLNO? )";
		String sql1="INSERT INTO billfee_current_tab(billno, cus_code, jswd, gg, fkfs, hwlb,"
				+ " jjfs, smjz, bjfl, bjje, postfee, bjfee, slfee, thfee, shfee, ccfee, "
				+ "totalprice) VALUES (etam_billno?, cus_code?, jswd?, NVL(gg?,0), NVL(fkfs?,0),NVL(hwlb?,1),"
				+ " NVL(jjfs?,0),NVL(smjz?,0), NVL(bjfl?,0), NVL(bjje?,0), NVL(postfee?,0),"
				+ " (NVL(smjz?,0)*NVL(bjfl?,0)), NVL(slfee?,0), NVL(thfee?,0), NVL(shfee?,0), NVL(ccfee?,0), "
				+ "("
				+ "NVL(slfee?,0)+"
				+ "NVL(postfee?,0)+"
				+ "NVL(thfee?,0)+"
				+ "NVL(ccfee?,0)+"
				+ "NVL(shfee?,0)))";
	    
	    
//	    String delBill = "delete from ETAM_BILL_TAB where lrr='"+CFRY01+"'";
		String delbillFee = "delete from billfee_current_tab a where exists(select ETAM_BILLNO from ETAM_BILL_TAB b Where a.billno = b.ETAM_BILLNO and b.lrr='"+CFRY01+"')";
	    /*String sql2 = "insert into billstate_tab (billno,state,czr,czrq,czwd,boxes,package,duals,flag,items)values"
	    		+ "(billno?,'3','"+CFRY01+"',DATE_FORMAT(NOW(),'%Y-%m-%d %H:%i:%s'),'"+json.get("nownet")+"',IF(LENGTH(boxes?)=0,0,boxes?),IF(LENGTH(package?)=0,0,package?),"
	    				+ "IF(LENGTH(duals?)=0,0,duals?),IF(LENGTH(flag?)=0,0,flag?),(IF(LENGTH(boxes?)=0,0,boxes?)+IF(LENGTH(duals?)=0,0,duals?)+IF(LENGTH(package?)=0,0,package?)))";
	    */
	    
	    String sql2 ="insert into billstate_tab (billno,state,czr,czrq,czwd,boxes,package,duals,flag,items)select a.ETAM_BILLNO,3,a.lrr czr,a.lrrq czrq,a.lrwd czwd,a.boxes,0,a.duals,1,(a.boxes) items From ETAM_BILL_TAB a,billfee_current_tab b where a.ETAM_BILLNO = b.billno and (SELECT count(1) from billfee_tab where billno=a.ETAM_BILLNO)=0 and a.lrr='"+CFRY01+"'";
	    //先删除临时表
	    Map nowryxx=null;
	    int delA = execSQL(tms, delbillFee, nowryxx);
//	    int delB =execSQL(tms, delBill, nowryxx);
	     
	   

//	    插入临时表
		Map[] row= FormTools.mapperToMapArrayList(AWDlist.toString());
		int[] b= execSQL(tms, sql, row);
		Map[] row1= FormTools.mapperToMapArrayList(AWDlist.toString());
		int[] c= execSQL(tms, sql1, row1);
//		//插入状态表
		Map row2= null;
		int d= execSQL(tms, sql2, row2);
		sql="INSERT INTO bill_tab (billno,POSTDATE,FLAG,JJ_FLAG,POSTZONE,POSTNET,POSTMAN,POSTTEL,POSTADDR,BJ_FLAG,ACCEPTZONE,ACCEPTNET,ACCEPTMAN,ACCEPTTEL,ACCEPTADDR,BOXES,DUALS,VOLUME,MEMO,LRR,LRRQ,XGR,XGRQ,SHR,SHRQ,WEIGHT,STATE,NOWNET,PACKAGE,POSTDW,ACCEPTDW,IMPL,DDH,CUSNO,SHBJ,DJBJ,JSBJ)"
				+ "select a.ETAM_BILLNO billno, a.FYSJ POSTDATE, 1 FLAG, 0 JJ_FLAG, '3101' POSTZONE,"
				+ " '3101' POSTNET, null POSTMAN,"
				+ " null POSTTEL, '英模特' POSTADDR, 0 BJ_FLAG, mpt.area_code ACCEPTZONE,mpt.net_code ACCEPTNET,"
				+ " mpt.linkman ACCEPTMAN, mpt.linktel ACCEPTTEL, a.xxaddress ACCEPTADDR, a.boxes BOXES, 0 DUALS, 0 VOLUME, 0 MEMO,"
				+ " a.lrr LRR, a.lrrq LRRQ, null XGR, null XGRQ, null SHR,null SHRQ, a.weight WEIGHT, 3 STATE, '3101' NOWNET, 0 PACKAGE,"
				+ " a.yzjg POSTDW, a.shd_name ACCEPTDW, 1 IMPL, null DDH,'20000008' CUSNO,0 SHBJ,0 DJBJ,0 JSBJ from ETAM_BILL_TAB a,etam_shop_tab mpt,billfee_current_tab b,cust_tab c "
				+ "where  mpt.shop_code=a.shd_code and b.billno=a.ETAM_BILLNO and b.cus_code =c.cus_code and (SELECT count(1) FROM area_tab WHERE CODE = '3101') >0 and (SELECT count(1) FROM area_tab WHERE CODE = '3101') >0 "
				+ "and (SELECT count(1) from bill_tab where billno=a.ETAM_BILLNO)=0 and a.lrr='"+CFRY01+"'";
		sql1="INSERT INTO billfee_tab  (billno, cus_code, jswd, gg, fkfs, hwlb,"
				+ " jjfs, smjz, bjfl, bjje, postfee, bjfee, slfee, thfee, shfee, ccfee, "
				+ "totalprice)"
				+ "select a.billno,a.cus_code, a.jswd, a.gg ,a.fkfs, a.hwlb, a.jjfs, a.smjz, a.bjfl, a.bjje, a.postfee, a.bjfee, a.slfee, a.thfee, a.shfee, a.ccfee, a.totalprice "
				+ "from billfee_current_tab a,ETAM_BILL_TAB b where a.billno=b.ETAM_BILLNO "
				+ "and (SELECT count(1) from billfee_tab where billno=a.billno)=0 and lrr='"+CFRY01+"'";
		Map tempRow = null;
		//插入正式表
		int a1 = execSQL(tms, sql,tempRow);
		int a2 = execSQL(tms, sql1,tempRow);
		if(a1>0&&a2>0){
			returnMap.put("MSGID", "S");
			returnMap.put("tbbj", s);
		}else{
			returnMap.put("MSGID", "E");
			throw new Exception("导入运单重复");
		}
		return returnMap;
	}

	

}
