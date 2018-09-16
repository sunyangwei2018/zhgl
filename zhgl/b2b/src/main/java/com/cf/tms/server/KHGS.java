/**
 * 
 * 上海易日升金融服务有限公司
 * 
 */
package com.cf.tms.server;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.framework.JLBill;
import com.cf.utils.PubFun;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

/**
 * 
 * @author syw
 * @version $Id: KHGSZC.java, v 0.1 2018年5月22日 下午8:51:37 syw Exp $
 */
@Controller
@RequestMapping("/khgs")
public class KHGS extends JLBill{
	private Logger logger = LoggerFactory.getLogger(GCZL.class);
	
	/**
	 * 工程资料收单
	 * 
	 * @param json
	 * @return
	 * @throws Exception
	 */
	@Transactional("tms")
	@RequestMapping("/register.do")
	public Map updateGCZLSD(String json) throws Exception{
		String code = FormTools.getrandomUUID();
		logger.info("code[{}]客户公司注册,入口参数{}",code,json.toString());
		Map resultMap = Maps.newHashMap(); 
		Map row = FormTools.mapperToMap(json);
		if(Strings.isNullOrEmpty(row.get("KHGSNAME").toString())){
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "注册公司必填项");
			return resultMap;
		}
		if(getKhgsByName(row.get("KHGSNAME").toString())!=0){
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "注册公司名称重复");
			return resultMap;
		}
		try {
			long khgsid = PubFun.updateKHGSID("0101", row.get("DQ").toString(), tms);
			String sql = "insert into khgs_zc(KHGSID,KHGSNAME,GSID,FLAG,KHGSROLEID,TWOKHGSID,SJKHGSID,PYM,KHNAMEJC,"
					+ "ADDRESS,GREEBH,FAX,TEL,EMAIL,DQ,REGIST_TIME,FLAG_SH,SHR,SHRQ,MOBILE) VALUES"
					+ "('"+khgsid+"',KHGSNAME?,'0101',1,KHGSROLEID?,null,SJKHGSID?,PYM?,null,"
					+ "ADDRESS?,GREEBH?,null,TEL?,EMAIL?,DQ?,sysdate,0,null,null,MOBILE?)";
			int i = execSQL(tms, sql, row);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "注册失败");
			return resultMap;
		}
		resultMap.put("respCode", "000000");
		resultMap.put("respMsg", "注册成功");
		return resultMap;
	}
	
	/**
	 * 根据名称查注册公司
	 * 
	 * @param khName
	 * @return
	 */
	public int getKhgsByName(String khName){
		String sql = "SELECT count(1) FROM DUAL \r\n" + 
				"WHERE  EXISTS \r\n" + 
				"( SELECT 1 FROM KHGS_ZC WHERE KHGSNAME = '"+khName.trim()+"' )\r\n" + 
				"OR EXISTS \r\n" + 
				"( SELECT 1 FROM KHGS WHERE KHGSNAME = '"+khName.trim()+"' )";
		int count = queryForInt(tms, sql);
		return count;
	}
	
	@Transactional("tms")
	@RequestMapping("/updateZCSH.do")
	public Map updateZCSH(String json) throws Exception{
		String code = FormTools.getrandomUUID();
		logger.info("code[{}]客户公司注册,入口参数{}",code,json.toString());
		Map resultMap = Maps.newHashMap(); 
		resultMap.put("respCode", "000000");
		resultMap.put("respMsg", "审批成功");
		Map row = FormTools.mapperToMap(json);
		if(Strings.isNullOrEmpty(row.get("KHGSID").toString())){
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "注册公司填项");
			return resultMap;
		}
		
		String sql = "update khgs_zc set KHGSNAME=KHGSNAME?,KHGSROLEID=KHGSROLEID?,"
				+ "TWOKHGSID=TWOKHGSID?,SJKHGSID=SJKHGSID?,PYM=PYM?,KHNAMEJC=KHNAMEJC?,ADDRESS=ADDRESS?,"
				+ "POSTCODE=POSTCODE?,FAX=FAX?,TEL=TEL?,EMAIL=EMAIL?,DQ=DQ?,MOBILE=MOBILE?,"
				+ "FLAG_SH=1,SHR=userId?,SHRQ=sysdate where KHGSID = KHGSID?";
		execSQL(tms, sql, row);
		try {
			if(row.get("SHZT").toString().equals("1")){
				resultMap.put("respCode", "000001");
				resultMap.put("respMsg", "重复审核");
				return resultMap;
			}
			PubFun.insertKHGStoUSER(row.get("KHGSID").toString(), tms);
		} catch (Exception e) {
			logger.error("code[{}]注册审批错误,异常:{}",code,e.getStackTrace());
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "系统错误");
		}
		return resultMap;
	}
	
	@RequestMapping("/queryPROV.do")
	public List<Map> queryPROV(String json){
		List<Map> res = Lists.newArrayList();
		try {
			Map req = FormTools.mapperToMap(json);
			String sql = "select DQXX01,DQXX02 from DQ where dqxx03 = 3";
			if(!FormTools.isNull(req.get("q"))){
				sql += " and DQXX02 like q?||'%'";
			}
			res = queryForList(tms, sql, req);
			logger.info("查询区域记录有{}",res.size());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
	}
	
	@RequestMapping("/queryCITY.do")
	public List<Map> queryCITY(String json){
		List<Map> res = Lists.newArrayList();
		try {
			Map req = FormTools.mapperToMap(json);
			String sql = "select DQXX01,DQXX02 from DQ where 1=1";
			if(!FormTools.isNull(req.get("q"))){
				sql += " and DQXX02 like '"+req.get("q").toString()+"'||'%'";
			}
			if(!FormTools.isNull(req.get("DQX_DQXX01"))){
				sql += " and DQX_DQXX01='"+req.get("DQX_DQXX01").toString()+"'";
			}
			
			res = queryForList(tms, sql, null);
			logger.info("查询区域记录有{}",res.size());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
	}
	
}
