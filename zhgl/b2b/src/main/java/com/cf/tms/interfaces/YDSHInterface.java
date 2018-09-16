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
@RequestMapping("/YDSHInterface")
public class YDSHInterface extends FormTools {
	
	/***
	 * 运单审核批量修改
	 * @param XmlData
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/updateYDSHEXECL.do")
	public Map updateYDSH(String XmlData) throws Exception {
		Map returnMap = new HashMap();
		SimpleDateFormat fomat = new SimpleDateFormat("yyyy-MM");
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int MBBM = Integer.parseInt(json.getString("MBBM"));
		String CFRY01 = json.getString("CFRY01");
		List<Map> excelList = getExcelData(MBBM,files);//读取EXECL数据
		Map temp = new HashMap();
		Map temp2 = new HashMap();
		List billnoArray= new ArrayList();
		for(int i=0;i<excelList.size();i++){//验证
			Map YD = excelList.get(i);
			if(FormTools.isNull(YD.get("billno").toString())){
				throw new Exception((i+2)+"行单号【"+YD.get("billno").toString()+"】不能为空.");
			}
			if(!FormTools.isNull(YD.get("cus_code").toString())){
				if(YD.get("cus_code").toString().length() ==6){
					if(!YD.get("cus_code").toString().substring(0,3).equals("200")){
						if(!YD.get("cus_code").toString().equals("999999")){
							System.out.println(YD.get("cus_code").toString().substring(0,3));
							throw new Exception((i+2)+"行客户【"+YD.get("cus_code").toString()+"】不正确.");
						}
					}
				}else{
					throw new Exception((i+2)+"行客户【"+YD.get("cus_code").toString()+"】不正确.");
				}
			}
			if(FormTools.isNull(YD.get("fkfs").toString())){
				if((YD.get("fkfs").toString() !="1")&&(YD.get("fkfs").toString() !="2")&&(YD.get("fkfs").toString() !="3")){
					throw new Exception((i+2)+"行付款方式【"+YD.get("fkfs").toString()+"】不正确.");
				}
			}
			/*已冻结、未冻结非本人审核的运单不允许修改*/  
			temp2.put("billno",YD.get("billno").toString());
			temp2.put("CFRY01",YD.get("shr").toString());
			Map djshlog=(Map) queryForObjectByXML("tms", "CWGL.querySHDJBJ", temp2);
			if(!FormTools.isNull(djshlog)){
				throw new Exception((i+2)+"行已冻结或运单审核人错误.");
			}
			
      	  	Date date = fomat.parse(YD.get("shrq").toString());
			temp.put("jsyf", fomat.format(date));
			Map yslog=(Map) queryForObjectByXML("tms", "CWGL.queryYSLOGById", temp);
			if(!FormTools.isNull(yslog)){
				throw new Exception((i+2)+"行审核日期【"+YD.get("shrq").toString()+"】已冻结.");
			}
			billnoArray.add(YD.get("billno"));
		}
		Map[] row = FormTools.mapperToMapArrayList(excelList.toString());//准备数据
		excelList.clear();//清空
		String sql = " INSERT into bill_editlog(billno,postdate,flag,jj_flag,postzone,postnet,postman,posttel,postaddr,bj_flag,acceptzone,acceptnet,acceptman,"
				+"accepttel,acceptaddr,boxes,duals,volume,memo,weight,package,postdw,acceptdw,cusno,cus_code,jswd,gg,fkfs,hwlb,"
				+"jjfs,smjz,bjfl,bjje,postfee,bjfee,slfee,thfee,shfee,ccfee,totalprice,"
				+"postdate_n,flag_n,jj_flag_n,postzone_n,postnet_n,postman_n,posttel_n,postaddr_n,bj_flag_n,acceptzone_n,acceptnet_n,acceptman_n,"
				+"accepttel_n,acceptaddr_n,boxes_n,duals_n,volume_n,memo_n,weight_n,package_n,postdw_n,acceptdw_n,cusno_n,cus_code_n,jswd_n,gg_n,fkfs_n,hwlb_n,"
				+"jjfs_n,smjz_n,bjfl_n,bjje_n,postfee_n,bjfee_n,slfee_n,thfee_n,shfee_n,ccfee_n,totalprice_n,xgr,xgrq,state_n) "
				+"select a.billno,a.postdate,a.flag,a.jj_flag,a.postzone,a.postnet,a.postman,a.posttel,a.postaddr,a.bj_flag,a.acceptzone,a.acceptnet,a.acceptman,"
				+"a.accepttel,a.acceptaddr,a.boxes,a.duals,a.volume,a.memo,a.weight,a.package,a.postdw,a.acceptdw,a.cusno,b.cus_code,b.jswd,b.gg,b.fkfs,b.hwlb,"
				+"b.jjfs,b.smjz,b.bjfl,b.bjje,b.postfee,b.bjfee,b.slfee,b.thfee,b.shfee,b.ccfee,b.totalprice,"
				+"to_date(postdate?,'yyyy-MM-dd'),flag?,jj_flag?,postzone?,postnet?,postman?,posttel?,postaddr?,bj_flag?,acceptzone?,acceptnet?,acceptman?,"
				+"accepttel?,acceptaddr?,boxes?,duals?,volume?,memo?,weight?,package?,postdw?,acceptdw?,cusno?,cus_code?,jswd?,gg?,fkfs?,hwlb?,"
				+"jjfs?,smjz?,bjfl?,bjje?,postfee?,bjfee?,slfee?,thfee?,shfee?,ccfee?,totalprice?,'"+CFRY01+"',sysdate,18 "
				+" from bill_tab a,billfee_tab b "
				+" where a.billno = b.billno and a.billno = billno? ";
		execSQL(tms, sql, row);
		int z1 = tms.getFetchSize();
		sql ="update bill_tab set volume=NVL(volume?,volume),weight=NVL(weight?,weight),memo=NVL(memo?,memo),shbj=1,shr=NVL(shr?,'"+CFRY01+"'),shrq=NVL(to_date(shrq?,'yyyy-MM-dd'),shrq)"
				+ " WHERE billno=billno?";
		
		
		int[] a =execSQL(tms, sql, row);
		sql ="update billfee_tab set cus_code=NVL(cus_code?,cus_code),postfee=NVL(postfee?,postfee),bjfee=NVL(bjfee?,bjfee),slfee=NVL(slfee?,slfee),thfee=NVL(thfee?,thfee),"
				+ "shfee=NVL(shfee?,shfee),ccfee=NVL(ccfee?,ccfee),fjfee=NVL(fjfee?,fjfee),fkfs=NVL(fkfs?,fkfs)"
				+ " WHERE billno=billno?";
		int[] b =execSQL(tms, sql, row);
		returnMap.put("MSGID", "S");
		returnMap.put("MSGDATA", billnoArray.toString());//返回查询导入结果集
		billnoArray.clear();//清空
		row=null;//清空
		return returnMap;
	}
}
