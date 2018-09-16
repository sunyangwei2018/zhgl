package com.cf.framework;

import java.net.URLDecoder;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormPlugIn;
import com.cf.forms.FormTools;
import com.cf.utils.PropertiesReader;
import com.fasterxml.jackson.databind.ObjectMapper;




import org.apache.ibatis.session.SqlSession;

@Controller
@RequestMapping("/jlquery")
public class JLQuery extends JLBill {

    private SqlSession session = null;

    /**
     * 五星使用 
     * @param ds
     * @param XmlData
     * @return
     * @throws Exception

    @RequestMapping("/select.do")
    public Map select(String ds, String XmlData) throws Exception {
        session = JlAppSqlConfig.getSqlMapInstance(ds);
        return selectForJL(XmlData);
    }
     */

    @RequestMapping("/selectSCM.do")
    public Map selectForTMS(String XmlData) throws Exception {
        session = JlAppSqlConfig.getTMSSqlMapInstance();
        return selectForJL(XmlData);
    }

    @RequestMapping("/selectVIP.do")
    public Map selectForVIP(String XmlData) throws Exception {
        session = JlAppSqlConfig.getVIPSqlMapInstance();
        return selectForJL(XmlData);
    }

    @RequestMapping("/selectSH.do")
    public Map selectForSH(String XmlData) throws Exception {
        session = JlAppSqlConfig.getSHSqlMapInstance();
        return selectForJL(XmlData);
    }
    
    @RequestMapping("/selectWorlflow.do")
    public Map selectForWorlflow(String XmlData) throws Exception {
        session = JlAppSqlConfig.getSHSqlMapInstance();
        return selectForJL(XmlData);
    }

    public Map selectForJL(String XmlData) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Map map = mapper.readValue(XmlData, Map.class);
        map.put("session", session);
        return map;
    }
    
    /**
	 * @todo 查询统一入口
	 * @param XmlData
	 * @throws Exception
	 */
	@RequestMapping("/select.do")
	public Map selectGeneral(String json) throws Exception{
		//获取传值参数
		ObjectMapper mapper = new ObjectMapper();
		List list =  (List)mapper.readValue(json, ArrayList.class); 
		Map map = (Map)list.get(0);
		//获取查询连接
		SqlSession session = null;
		if(map.get("DataBaseType") == null){
			session = JlAppSqlConfig.getTMSSqlMapInstance();
		}else{
			session = JlAppSqlConfig.getSqlMapInstance(map.get("DataBaseType").toString());
		}
		map.put("session", session);
		return map;
	}
	
	@SuppressWarnings({"rawtypes", "unchecked"})
    @RequestMapping("/selectForm.do")
    public Map selectForm(String json) throws Exception {
        Map map = new ObjectMapper().readValue(json, JSONObject.class);

        Map returnMap = new HashMap();
		returnMap.put("searchResult", map.get("result"));
		returnMap.put("session", map.get("collection"));
		returnMap.put("searchJson", map.get("query"));
		returnMap.put("QryType", "Mongo");
        return returnMap;
    }
	
	/**
	 * @todo 自定义查询入口
	 * @param XmlData
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectCustom.do")
	public Map selectCustom(String XmlData,HttpServletRequest request) throws Exception{
		JSONObject json = JSONObject.fromObject(XmlData);
		Map returnMap = new HashMap();
		returnMap.put("dataType", "Json");
		
		String SQL = "SELECT CX03,CX04,CX05,CX06 FROM W_CX WHERE YXBJ=0 AND CX01='"+json.get("CX01")+"'";
		Map CX = queryForMap(tms, SQL);
		returnMap.putAll(CX);

		SQL = "SELECT TJ02,TJ04,TJ05 FROM W_CXTJ WHERE YXBJ=0 AND CX01='"+json.get("CX01")+"' ORDER BY SXH";
		List<Map> CXTJs = queryForList(tms, SQL);
		
		JSONObject queryField = json.getJSONObject("queryField");
		JSONObject queryFields = new JSONObject();

		String CX03 = CX.get("CX03") == null || CX.get("CX03").equals("")? "{}": CX.get("CX03").toString();
		for(int i=0; i<CXTJs.size(); i++){
			Map CXTJ = CXTJs.get(i);
			String field = CXTJ.get("TJ02").toString();
			String value = queryField.get(field) == null? "":queryField.getString(field);
			
			String TJ04 = CXTJ.get("TJ04").toString(); 
			if(TJ04.equals("0")){
				CXTJ.put("value", value);
				if(!value.equals("")){
					queryFields.put(field, value);
				}
			}else if(TJ04.equals("1")){
				String TJ05 = CXTJ.get("TJ05").toString();
				TJ05 = TJ05.replaceAll("#"+field+"#", value);
				CXTJ.put("TJ05", TJ05);
				CXTJ.put("value", value);
				if(!value.equals("")){
					queryFields.put(field, TJ05);
				}
			}else if(TJ04.equals("2")){
				CX03 = CX03.replaceAll("#"+field+"#", value);
			}else if(TJ04.equals("3")){
				String TJ05 = CXTJ.get("TJ05").toString();
				TJ05 = TJ05.replaceAll("#"+field+"#", value);
				CXTJ.put("TJ05", TJ05);
				CXTJ.put("value", value);
				if(!value.equals("")){
					queryFields.putAll(JSONObject.fromObject(TJ05));
				}
			}
		}
		
		String CX05 = CX.get("CX05").toString();
		if(CX05.equals("0")){
			SqlSession session = null;
			if(CX.get("CX06") == null){
				session = JlAppSqlConfig.getWorkflowSqlMapInstance();
			}else{
				session = JlAppSqlConfig.getSqlMapInstance(CX.get("CX06").toString());
			}
			returnMap.put("session", session);
			returnMap.put("sqlid", "FormQuery.selectCX");
			returnMap.put("CX03", CX03);
			returnMap.put("queryFields", CXTJs);
			returnMap.put("QryType", "Report");
		}else if(CX05.equals("1")){
			SQL = "SELECT JG01 FROM W_CXJG WHERE YXBJ=0 AND CX01='"+json.get("CX01")+"' ORDER BY SXH";
			List<Map> resultList = queryForList(tms,SQL);
			JSONObject searchResult=new JSONObject();
			for(int i=0;i<resultList.size();i++){
				searchResult.put(resultList.get(i).get("JG01"), 1);
			}
			returnMap.put("searchResult", searchResult);
			returnMap.put("session", CX.get("CX06").toString());
			queryFields.putAll(JSONObject.fromObject(CX03));
			returnMap.put("searchJson", queryFields);
			returnMap.put("QryType", "Mongo");
		}else if(CX05.equals("2")){
			String CX06 = CX.get("CX06").toString();
			String SCM_URL = PropertiesReader.getInstance().getProperty("SCM_URL");
			CX06 = CX06.replace("#SCM_URL#", SCM_URL);
			String FORM_URL = PropertiesReader.getInstance().getProperty("FORM_URL");
			CX06 = CX06.replace("#FORM_URL#", FORM_URL);
			returnMap.put("CX06", CX06);
			
			queryFields.putAll(JSONObject.fromObject(CX03));
			queryField.put("mongo", queryFields);
			returnMap.put("XmlData", queryField);
			returnMap.put("QryType", "Interface");
		}else if(CX05.equals("3")){
			SqlSession session = null;
			String CX06 = CX.get("CX06").toString();
			if(CX06.indexOf("#FB01#") == 0){
				CX06 = request.getSession().getAttribute("FB01").toString();
				session = JlAppSqlConfig.getSqlMapInstance(CX06);
			}else{
				session = JlAppSqlConfig.getSqlMapInstance(CX06); 
			}
			returnMap.put("PI_USERNAME", queryField.get("PCRM_CZY02"));
			returnMap.put("session", session);
			returnMap.put("sqlid", CX03);
			returnMap.put("queryFields", queryField);
			returnMap.put("QryType", "Report");
		}		
		
		return returnMap;
	}
	
	
}

