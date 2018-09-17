package com.cf.framework;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;

import com.cf.utils.PubFun;

@Controller
public class SaveErrorLog extends JLBill{
	public void saveErrorLog(HttpServletRequest request,
			HttpServletResponse response,Exception ex) throws Exception{
		try{
/*			String sql = "INSERT INTO W_ERRORLOG(RZBH,RYBH,RZNN,FSRQ) VALUES(RZBH?,RYBH?,RZNN?,systimestamp)";
			Map<String, Object> rzMap = new HashMap<String, Object>();
			rzMap.put("RZNN", ex.toString());
			rzMap.put("RYBH", new Integer(0));
			rzMap.put("RZBH", new Integer(PubFun.callProcedureForJLBH(scm, "W_ERRORLOG", 1))); //获取RZBH
			execSQL(scm, sql, rzMap);*/
		}catch(Exception e){
			throw e;
		}
	}
	
}