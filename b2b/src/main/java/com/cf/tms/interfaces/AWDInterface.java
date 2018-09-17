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
@RequestMapping("/AWDInterface")
public class AWDInterface extends FormTools{
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/insertAWDEXECL.do")
	public Map insertAWD(String XmlData) throws Exception {
		Map returnMap = new HashMap();
		int year =0;
		int year1 =0;
		int moth =0;
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int MBBM = Integer.parseInt(json.getString("MBBM"));
		String CFRY01 = json.getString("CFRY01");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date endDate = new Date();   
		JSONArray neddfield = new JSONArray();/* JSONArray.fromObject("[{\"billno\":\"运单号\"},{\"postzone\":\"始发地\"},"
				+ "{\"acceptzone\":\"到达地\"},{\"gg\":\"规格\"}"
				+ ",{\"acceptaddr\":\"收货地址\"},{\"cus_code\":\"客户代码\"}"
				+ ",{\"fkfs\":\"付款方式\"},{\"hwlb\":\"货物类别\",\"acceptdw\":\"收货单位\",\"postdate\":\"托运日期\"}]");//,{\"postnet\":\"始发网点\"}{\"hwlb\":\"货物类别\"}
*/		if(json.get("nownet").toString().equals("9000")){
			throw new Exception("总部不允许导入");
		}
		List<Map> excelList = getExcelData(MBBM,files);
		/*String sqlhwlb ="select MIN(code)\"min\",MAX(code)\"max\",'' \"hwlb\" from hwlb_tab";
		String sqlfkfs ="select MIN(code)\"min\",MAX(code)\"max\",'' \"fkfs\" From fkfs_tab";
		String sqlgg ="select MIN(code)\"min\",MAX(code)\"max\",'' \"gg\" From gg_tab";
		
		Map hwlb = queryForMap(tms, sqlhwlb);
		Map fkfs = queryForMap(tms, sqlfkfs);
		Map gg = queryForMap(tms, sqlgg);*/
		JSONArray AWDlist = new JSONArray();
		for(int i=0;i<excelList.size();i++){
			Map AWD = excelList.get(i); 
			if(AWD.get("cus_code").toString().equals("999999")&&(AWD.get("postdw").toString().equals("临时客户")||FormTools.isNull(AWD.get("posttel"))||FormTools.isNull(AWD.get("accepttel"))||FormTools.isNull(AWD.get("fkfs"))||AWD.get("fkfs").toString().equals("3"))){
	 			throw new Exception((i+2)+"行字段为临时客户，发货电话、收货电话不能为空；发货单位不能为\"临时客户\"；付款方式不能为月结。以上字段必填。");
	 		}
//			if(!FormTools.isNull(AWD.get("postdate"))){
//				 Date beginDate = format.parse(AWD.get("postdate").toString());
//				 year = beginDate.getYear();
//				 year1 = endDate.getYear();
//				 moth =12*(year1-year)+(endDate.getMonth()-beginDate.getMonth());
//				 if(moth>3||(moth<0||(moth==0&&beginDate.getDate()>endDate.getDate()))){
//					 throw new Exception((i+2)+"行托运日期【"+AWD.get("postdate").toString()+"】3个月以内且限当天");
//				 }
//			}
			if (isLatestWeek(format.parse(AWD.get("postdate").toString()+" "+"00:00:00"),endDate)) {
				throw new Exception((i+2)+"行托运日期【"+AWD.get("postdate").toString()+"】必须在15天以内");
			}    
			JSONObject map = new JSONObject();
			map.put("cus_code", AWD.get("cus_code")); 
			Map obj = (Map) queryForObjectByXML("tms", "CFAWD.selectKH", map);
			String cus_hwlb;
			String cus_gg;
			if(FormTools.isNull(obj)){
				throw new Exception((i+2)+"行客户【"+AWD.get("cus_code")+"】不存在");
			}else{
				cus_hwlb = obj.get("hwlb").toString();
				cus_gg = obj.get("gg").toString();
			}
			if(FormTools.isNull(AWD.get("gg"))){
				AWD.put("gg", cus_gg);
			}
			if(AWD.containsKey("acceptnet")&&!FormTools.isNull(AWD.get("acceptnet").toString())){
				String sqlwd ="select count(1) from net_tab where net_code='"+AWD.get("acceptnet").toString()+"'";
				int f = queryForInt(tms, sqlwd);
				if(f==0){
					throw new Exception((i+2)+"行到达网点【"+AWD.get("acceptnet").toString()+"】不存在");
				}
			}else{
				Map temp = new HashMap();
				temp.put("cus_code", AWD.get("cus_code"));
				temp.put("dqxx_code", AWD.get("acceptzone"));
				Map wdxx = (Map) queryForObjectByXML("tms", "YDCX.selectKHWD", temp);
				if(!FormTools.isNull(wdxx)){
					AWD.put("acceptnet", wdxx.get("net_code").toString());
				}
			}
			obj.putAll(AWD);
			
			Float ydsl = Float.parseFloat((String)(FormTools.isNull(obj.get("boxes").toString().trim())?"0":obj.get("boxes")).toString().trim())+Float.parseFloat((String)(FormTools.isNull(obj.get("duals").toString().trim())?"0":obj.get("duals").toString().trim()))+Float.parseFloat((String)(FormTools.isNull(obj.get("package").toString().trim())?"0":obj.get("package").toString().trim()));
			if(ydsl==0){
				throw new Exception((i+2)+"行箱包双不能全为零");
			}
			for(int j=0;j<neddfield.size();j++){
				Map poj = (Map) neddfield.get(j);
				Iterator it = poj.keySet().iterator();
				while(it.hasNext()){
					Object key= it.next();
					if(key.equals("postzone")){
						String postdqxx = "SELECT count(1) FROM area_tab WHERE CODE = '"+obj.get(key.toString()).toString()+"'";
						int dqxx =queryForInt(tms, postdqxx);
						if(dqxx==0){
							throw new Exception((i+2)+"行"+poj.get(key.toString())+"【"+obj.get(key.toString()).toString()+"】不存在");
						}else{
							if(obj.get(key.toString()).toString().length()<=2){
								throw new Exception((i+2)+"行"+poj.get(key.toString())+"【"+obj.get(key.toString()).toString()+"】不能少于两位");
							}
						}
						
					}
					if(key.equals("acceptzone")){
						String acceptdqxx = "SELECT count(1) FROM area_tab WHERE CODE = '"+obj.get(key.toString()).toString()+"'";
						int dqxx =queryForInt(tms, acceptdqxx);
						if(dqxx==0){
							throw new Exception((i+2)+"行"+poj.get(key.toString())+"【"+obj.get(key.toString()).toString()+"】不存在");
						}else{
							if(obj.get(key.toString()).toString().length()<=2){
								throw new Exception((i+2)+"行"+poj.get(key.toString())+"【"+obj.get(key.toString()).toString()+"】不能少于两位");
							}
						}
					}
					
					if(FormTools.isNull(obj.get(key.toString()))){
						throw new Exception((i+2)+"行字段【"+poj.get(key.toString())+"】必填项");
					}					
				}
			}
			AWDlist.add(obj);
		}
		//String acceptnet = queryForMap(tms, "select net_code from area_tab where code='"+map.get("acceptzone", 0)+"'").get("net_code").toString();
		String sql ="INSERT INTO bill_current_tab (billno,postdate,flag,jj_flag,postzone,postnet,postman,"
				+ "posttel,postaddr,bj_flag,acceptzone,acceptnet,acceptman,accepttel,acceptaddr,boxes,"
				+ "duals,volume,memo,lrr,lrrq,weight,state,nownet,package,"
				+ "postdw,acceptdw,impl,cusno) VALUES "
				+ "(billno?, to_date(postdate?,'yyyy-MM-dd'), NVL(flag?,1), NVL(jj_flag?,0),postzone?,'"+json.get("nownet")+"',postman?,posttel?,postaddr?,"
				+ "NVL(bj_flag?,0), acceptzone?, NVL(acceptnet?,(select net_code from area_tab where code = acceptzone?)),acceptman?,accepttel?,acceptaddr?,NVL(boxes?,0),NVL(duals?,0),case when NVL(volume?,0)=0 then To_number(boxes?)*To_number(vol?) else To_number(volume?) end,memo?,'"+CFRY01+"', SYSDATE, "
				+ "NVL(weight?,0), '3', '"+json.get("nownet")+"', NVL(package?,0), postdw?, acceptdw?,"
				+ "decode((select count(1) from bill_tab where billno=billno?),1,'3','1'),cusno?)";
		String sql1="INSERT INTO billfee_current_tab(billno, cus_code, jswd, gg, fkfs, hwlb,"
				+ " jjfs, smjz, bjfl, bjje, postfee, bjfee, slfee, thfee, shfee, ccfee, "
				+ "totalprice) VALUES (billno?, cus_code?, jswd?, NVL(gg?,0), NVL(fkfs?,0),NVL(hwlb?,1),"
				+ " NVL(jjfs?,0),NVL(smjz?,0), NVL(bjfl?,0), NVL(bjje?,0), NVL(postfee?,0),"
				+ " (NVL(smjz?,0)*NVL(bjfl?,0)), NVL(slfee?,0), NVL(thfee?,0), NVL(shfee?,0), NVL(ccfee?,0), "
				+ "("
				+ "NVL(slfee?,0)+"
				+ "NVL(postfee?,0)+"
				+ "NVL(thfee?,0)+"
				+ "NVL(ccfee?,0)+"
				+ "NVL(shfee?,0)))";
	    
	    
	    String delBill = "delete from bill_current_tab where lrr='"+CFRY01+"'";
		String delbillFee = "delete from billfee_current_tab a where a.billno in (select b.billno from bill_current_tab b Where b.lrr='"+CFRY01+"')";
	    /*String sql2 = "insert into billstate_tab (billno,state,czr,czrq,czwd,boxes,package,duals,flag,items)values"
	    		+ "(billno?,'3','"+CFRY01+"',DATE_FORMAT(NOW(),'%Y-%m-%d %H:%i:%s'),'"+json.get("nownet")+"',IF(LENGTH(boxes?)=0,0,boxes?),IF(LENGTH(package?)=0,0,package?),"
	    				+ "IF(LENGTH(duals?)=0,0,duals?),IF(LENGTH(flag?)=0,0,flag?),(IF(LENGTH(boxes?)=0,0,boxes?)+IF(LENGTH(duals?)=0,0,duals?)+IF(LENGTH(package?)=0,0,package?)))";
	    */
	    
	    String sql2 ="insert into billstate_tab (billno,state,czr,czrq,czwd,boxes,package,duals,flag,items)select a.billno,a.state,a.lrr czr,a.lrrq czrq,a.nownet czwd,a.boxes,a.package,a.duals,a.flag,(a.boxes+a.duals+a.package) items From bill_current_tab a,billfee_current_tab b where a.billno = b.billno and (SELECT count(1) from billfee_tab where billno=a.billno)=0 and a.lrr='"+CFRY01+"'";
	    //先删除临时表
	    Map nowryxx=null;
	    int delA = execSQL(tms, delbillFee, nowryxx);
	    int delB =execSQL(tms, delBill, nowryxx);
	     
	   

	    //插入临时表
		Map[] row= FormTools.mapperToMapArrayList(AWDlist.toString());
		int[] b= execSQL(tms, sql, row);
		Map[] row1= FormTools.mapperToMapArrayList(AWDlist.toString());
		int[] c= execSQL(tms, sql1, row1);
		//插入状态表
		Map row2= null;
		int d= execSQL(tms, sql2, row2);
		sql="INSERT INTO bill_tab select a.billno, a.postdate, a.flag, a.jj_flag, a.postzone,"
				+ " a.postnet, a.postman,"
				+ " a.posttel, a.postaddr, a.bj_flag, a.acceptzone,a.acceptnet,"
				+ " a.acceptman, a.accepttel, a.acceptaddr, a.boxes, a.duals, a.volume, a.memo,"
				+ " a.lrr, a.lrrq, a.xgr, a.xgrq, a.shr, a.shrq, a.weight, a.state, a.nownet, a.package,"
				+ " a.postdw, a.acceptdw, a.impl, a.ddh,a.cusno,a.shbj,a.djbj,a.jsbj,a.sjshrq "
				+ " from bill_current_tab a,billfee_current_tab b,cust_tab c "
				+ "where a.impl='1' and a.billno=b.billno and b.cus_code =c.cus_code and (SELECT count(1) FROM area_tab WHERE CODE = a.postzone) >0 and (SELECT count(1) FROM area_tab WHERE CODE = a.acceptzone) >0 "
				+ "and (SELECT count(1) from bill_tab where billno=a.billno)=0 and a.lrr='"+CFRY01+"'";
		sql1="INSERT INTO billfee_tab (billno, cus_code, jswd, gg, fkfs, hwlb,"
				+ " jjfs, smjz, bjfl, bjje, postfee, bjfee, slfee, thfee, shfee, ccfee, "
				+ "totalprice)"
				+ "select a.billno,a.cus_code, a.jswd, a.gg ,a.fkfs, a.hwlb, a.jjfs, a.smjz, a.bjfl, a.bjje, a.postfee, a.bjfee, a.slfee, a.thfee, a.shfee, a.ccfee, a.totalprice "
				+ "from billfee_current_tab a,bill_current_tab b where  b.impl='1' and a.billno=b.billno "
				+ "and (SELECT count(1) from billfee_tab where billno=a.billno)=0 and lrr='"+CFRY01+"'";
		Map tempRow = null;
		//插入正式表
		int a1 = execSQL(tms, sql,tempRow);
		int a2 = execSQL(tms, sql1,tempRow);
		if(a1>0&&a2>0){
			returnMap.put("MSGID", "S");	
		}else{
			returnMap.put("MSGID", "E");
			throw new Exception("导入运单重复");
		}                                                 
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
