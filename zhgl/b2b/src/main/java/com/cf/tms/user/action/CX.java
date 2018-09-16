package com.cf.tms.user.action;

import java.util.ArrayList;
import java.util.HashMap; 
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.JLBill;
import com.google.common.collect.Lists;



@Controller
@RequestMapping("/CX")
public class CX extends JLBill {

	
	/**
	 * @todo 获取人员主岗权限
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/selectGW")
	public Map selectGW(String XmlData) throws Exception{ 
		JSONObject map = JSONObject.fromObject(XmlData);
		//获取登录人信息
		Map user = selectUser(map.get("CFRY01").toString());
		if(user == null){
			throw new Exception(map.get("CFRY01")+"该账号在系统中不存在");
		}
		return user;
	}
	
	/**
	 * @todo 获取人员主岗按钮权限
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/selectALQX")
	public List<Map> selectALQX(String XmlData) throws Exception{ 
		JSONObject map = JSONObject.fromObject(XmlData);
		//获取暗流权限
		List alqx = queryForListByXML("tms","CX.queryMENUALQX",map);
		return alqx;
	}
	
	/**
	 * @todo 获取人员部门权限
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/selectBM")
	public List selectBM(String XmlData) throws Exception{
		List list=null;
		JSONObject map = JSONObject.fromObject(XmlData);
		//获取登录人信息
		Map user = selectUser(map.get("PI_USERNAME").toString());
		if(user == null){
			throw new Exception(map.get("PI_USERNAME")+"该账号在系统中不存在");
		}
				
		String pi_username = map.get("PI_USERNAME").toString(); 
		Map returnMap = new HashMap();
		 
		if (pi_username != null && pi_username.length() > 0){ 
			map.put("RYBH", user.get("RYBH").toString());
			list = queryForListByXML("WORKFLOW","com.jlsoft.framework.pcrm.CX.queryBM",map);
		}
		
		return list;
	}
	
	/**
	 * @todo 获取人员网点权限
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/selectGROUP")
	public List selectGROUP(String XmlData) throws Exception{
		JSONObject map = JSONObject.fromObject(XmlData);
		//获取登录人信息
		Map user = selectUser(map.get("CFRY01").toString());
		if(user == null){
			throw new Exception(map.get("CFRY01")+"该账号在系统中不存在");
		}
				
		List list = queryForListByXML("tms","CX.queryGROUP",map);
		return list==null?Lists.newArrayList():list;
	}
	
	/**
	 * @todo 获取待办数量
	 * @param xmlData
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/selectDBSL")
	public Map selectDBSL(String XmlData,HttpServletRequest request) throws Exception{
		Map returnMap = new HashMap();
		Map userInfo = (Map)request.getSession().getAttribute("userInfo");
		
		JSONObject map = JSONObject.fromObject(XmlData);
		//获取登录人信息
		Map user = selectUser(map.get("PI_USERNAME").toString());
		if(user == null){
			throw new Exception(map.get("PI_USERNAME")+"该账号在系统中不存在");
		}
		
		Map paramap = new HashMap();
		
		if (userInfo != null && userInfo.get("BM")!=null){
			ArrayList bmArrayList = new ArrayList();
			bmArrayList = (ArrayList)userInfo.get("BM");  
			if (bmArrayList.size() > 0){
				paramap.put("BM", userInfo.get("BM"));
			}
		}
		
		paramap.put("RYBH", user.get("RYBH").toString());
		String sqlId = "com.jlsoft.framework.pcrm.CX.queryDBSL";
		List list = queryForListByXML("WORKFLOW",sqlId,paramap);
		
		returnMap.put("returnList", list);
		return returnMap;
	}
	
	/**
	 * @todo 获取抄送提醒数量
	 * @param xmlData
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/selectDBSL_CC")
	public Map selectDBSL_CC(String XmlData,HttpServletRequest request) throws Exception{
		Map returnMap = new HashMap();
		Map userInfo = (Map)request.getSession().getAttribute("userInfo");
		
		JSONObject map = JSONObject.fromObject(XmlData);
		//获取登录人信息
		Map user = selectUser(map.get("PI_USERNAME").toString());
		if(user == null){
			throw new Exception(map.get("PI_USERNAME")+"该账号在系统中不存在");
		}
		
		Map paramap = new HashMap(); 
		paramap.put("RYBH", user.get("RYBH").toString());
		String sqlId = "com.jlsoft.framework.pcrm.CX.queryDBSL_CC";
		List list = queryForListByXML("WORKFLOW",sqlId,paramap);
		
		returnMap.put("returnList", list);
		return returnMap;
	}
	
	/**
	 * @todo 获取抄送消息
	 * @param XmlData 根据所传递
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectDB_CC")
	public Map selectDB_CC(String XmlData,HttpServletRequest request) throws Exception{
		String sqlId = "";
		JSONObject map = JSONObject.fromObject(XmlData);
		Map resultMap = new HashMap();
		
		Map userInfo = (Map)request.getSession().getAttribute("userInfo");
		//获取登录人信息
		Map user = selectUser(map.get("PI_USERNAME").toString());
		if(user == null){
			throw new Exception(map.get("PI_USERNAME")+"该账号在系统中不存在");
		}
		
		map.put("RYBH", user.get("RYBH").toString()); 
		
		//获取抄送消息
		sqlId = "com.jlsoft.framework.pcrm.CX.queryDBSY_CC";
		List list = queryForListByXML("WORKFLOW",sqlId,map);
		resultMap.put("resultList", list);
		
		return resultMap;
	} 
	
	/**
	 * @todo 获取代办事宜
	 * @param XmlData 根据所传递
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectDB")
	public Map selectDB(String XmlData,HttpServletRequest request) throws Exception{
		String sqlId = "";
		JSONObject map = JSONObject.fromObject(XmlData);
		Map resultMap = new HashMap();
		
		Map userInfo = (Map)request.getSession().getAttribute("userInfo");
		//获取登录人信息
		Map user = selectUser(map.get("PI_USERNAME").toString());
		if(user == null){
			throw new Exception(map.get("PI_USERNAME")+"该账号在系统中不存在");
		}
		
		map.put("RYBH", user.get("RYBH").toString());
		if (user.get("GSXX01") != null){
			map.put("GSXX01", user.get("GSXX01").toString());
		} 
		if (userInfo != null && userInfo.get("BM")!=null){
			ArrayList bmArrayList = new ArrayList();
			bmArrayList = (ArrayList)userInfo.get("BM");  
			if (bmArrayList.size() > 0){
				map.put("BM", userInfo.get("BM"));
			}
		}
		
		//获取代办结果集
		sqlId = "com.jlsoft.framework.pcrm.CX.queryDBSY";
		List list = queryForListByXML("WORKFLOW",sqlId,map);
		resultMap.put("resultList", list);
		
		return resultMap;
	} 
	
	/**
	 * @todo 获取项目配置
	 * @param XmlData 根据所传递
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectCD")
	public Map selectCD(String XmlData) throws Exception{
		JSONObject json = JSONObject.fromObject(XmlData);  
		
		Map map = new HashMap();
		//获取登录人信息
		Map user = selectUser(json.get("PI_USERNAME").toString());
		
		map.put("RYBH", user.get("RYBH").toString());
		String sqlId="com.jlsoft.framework.pcrm.CX.queryMENU"; 
		List workflowList = queryForListByXML("WORKFLOW",sqlId,map);
		
		Map returnMap = new HashMap();
		returnMap.put("resultList", workflowList);
		return returnMap;
	}
	
	/**
	 * @todo 查询工作流步骤的行为
	 * @param xmlData
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectXW")
	public Map selectXW(String XmlData) throws Exception{
		ArrayList returnList = new ArrayList();
		Map XWMap = new HashMap();
		Map map = new HashMap(); 
		Map returnMap = new HashMap(); 
		int ibj=0;
		JSONObject json = JSONObject.fromObject(XmlData);  
		
		String sqlId="com.jlsoft.framework.pcrm.CX.queryXW"; 
		List XWList = queryForListByXML("WORKFLOW",sqlId,json);
		 /** 
		if(!XWList.isEmpty()){ 
		    for(int i=0;i<XWList.size();i++){   
		    	XWMap = (Map)XWList.get(i);
				ibj = 0;
				if (returnList.size() > 0){
					for(int j=0;j<returnList.size();j++){   
						map = (Map)returnList.get(j);
						if (XWMap.get("JK03").toString().equals(map.get("JK03").toString()) &&
							XWMap.get("TBLNAME").toString().equals(map.get("TBLNAME").toString())){
							ibj = 1;
						}
					}
				}else if (returnList.size() == 0){
					ibj = 0;
				}
		    	if (ibj == 0){
		    		returnList.add(i,XWList.get(i));
		    	}
		    }
		}
		if (returnList.size() == 1){
			returnMap.put("resultList", returnList);
		}else{
			returnMap.put("resultList", XWList);
		}
		 **/
		returnMap.put("resultList", XWList);
		
		return returnMap;
	}
	
	/**
	 * @todo 获取行为中的隐藏数据
	 * @param XmlData 根据所传递
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectHDAT")
	public String selectHDAT(String XmlData) throws Exception{
		String sqlId;
		JSONObject json = JSONObject.fromObject(XmlData);  
		
		Map map = new HashMap(); 
		map.put("GZL01", json.get("GZL01").toString());
		map.put("BZ01", json.get("BZ01").toString());
		map.put("XW01", json.get("XW01").toString());
		
		sqlId="com.jlsoft.framework.pcrm.CX.queryHDAT"; 
		   
		return (String)queryForObjectByXML("WORKFLOW",sqlId,map);
	}
	
	/**
	 * @todo 获取抄送中的隐藏数据
	 * @param XmlData 根据所传递
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/selectHDAT_CC")
	public String selectHDAT_CC(String XmlData) throws Exception{
		String sqlId;
		JSONObject json = JSONObject.fromObject(XmlData);  
		
		Map map = new HashMap(); 
		map.put("SK01", json.get("SK01").toString());
		map.put("CZY01", json.get("CZY01").toString()); 
		
		sqlId="com.jlsoft.framework.pcrm.CX.queryHDAT_CC"; 
		   
		return (String)queryForObjectByXML("WORKFLOW",sqlId,map);
	}
	 	
	/**
     * @todo 为了获取人员相关的权限
     * @param map
     * @return
     * @throws Exception 
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public Map selectUser(String rydm) throws Exception{
    	Map czyMap = new HashMap();
    	if(rydm == null || rydm.length() == 0){
    		throw new Exception("人员帐号不能为空");
    	}else{
    		Map map = new HashMap();
        	map.put("CFRY01", rydm);
        	
        	czyMap = (Map)queryForObjectByXML("tms","CX.queryCZY",map);
        	if(czyMap == null){
        		throw new Exception(rydm + " 该账号在系统中不存在");
        	}
    	}
		return czyMap;
	}
    
    /**
	 * @todo 获取工作流步骤--用于任意步骤回退
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/selectHTBZ")
	public List selectHTBZ(String XmlData) throws Exception{
		List list=null;  
		JSONObject map = JSONObject.fromObject(XmlData); 
		Map pidMap = new HashMap();
		String sql = "SELECT A.PID" +
			         "  FROM W_TASK A" +
			         " WHERE A.SK01="+map.get("SK01").toString();
		pidMap = queryForMap(workflow,sql);  
		 
		Map returnMap = new HashMap();
		returnMap.put("SK01", pidMap.get("SK01").toString());
		returnMap.put("PID", pidMap.get("PID").toString());
		list = queryForListByXML("WORKFLOW","com.jlsoft.framework.pcrm.CX.queryHTBZ",returnMap);
		  
		return list;
	}
	 */
	/**
	 * @todo 获取人员--用于抄送
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 
	@SuppressWarnings("rawtypes")
	@RequestMapping("/selectCSRY")
	public List selectCSRY(String XmlData) throws Exception{
		List list=null;  
		JSONObject map = JSONObject.fromObject(XmlData);  
		list = queryForListByXML("WORKFLOW","com.jlsoft.framework.pcrm.CX.queryCSRY",map);
		  
		return list;
	} */
}
