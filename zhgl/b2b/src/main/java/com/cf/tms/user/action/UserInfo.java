package com.cf.tms.user.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.framework.JLBill;
import com.cf.framework.dataset.DataSet;
import com.cf.utils.MD5;


/**
 * 
 * @breif 用户公共信息查询接口方法
 *
 */
@Controller
@RequestMapping("/UserInfo")
public class UserInfo extends JLBill {
	
	/**
	 * 查询用户菜单
	 * @param	String ZCXX01
	 * 	- String	W_XTCZY01	用户名
	 * 
	 * @return	String
	 *  - W_XTCZY02		密码
	 *  
	 * @note 
	 */
	@SuppressWarnings({ "unchecked"})
	@RequestMapping("/selectUserMenu.do")
	public Map selectUserMenu(String json) throws Exception {
		cds = new DataSet(json);
		String querySQL = "SELECT RTRIM(m.CODE) \"code\",\n" +
				"m.NAME \"name\",\n" +
				"m.URL \"url\",\n" +
				"LENGTH(RTRIM(CODE)) / 2 \"levels\",\n" +
				"MJBJ \"mjbj\",icon \"icon\",s_code \"s_code\","
				+ "(select name from user_cd where code =m.s_code)\"s_codename\" \n" +
				"FROM user_cd m\n" +
				"WHERE (select count(a.CODE) from user_cd a, user_cdqx b \n" +
				//"where b.person_id= '"+cds.getField("PERSON_ID", 0)+"' and a.yxbj = 1 and a.code \n" +
				"where b.person_id= '"+cds.getField("PERSON_ID", 0)+"' and a.code \n" +
				"like CONCAT(rtrim(b.cd),'%') and a.code like CONCAT(rtrim(m.code),'%'))>0 \n"
				+ "and m.yxbj=1 \n" +
				"ORDER BY m.code ";
		Map map = new HashMap();
		List menu = queryForList(tms, querySQL);
		map.put("menu", menu);
		return map;
	}
	
	
	@SuppressWarnings({ "unchecked"})
	@RequestMapping("/insertCZYQX.do")
	public Map insertCZYQX(String json) throws Exception{
		List<Map> list=FormTools.mapperToMapList(json);
		Map map1 = (Map) list.get(0);
		String CFRY01 =  list.get(0).get("CFRY01").toString();
		JSONArray CD =  (JSONArray) FormTools.mapperToJSONArray(map1.get("CD").toString());
		Map map = new HashMap();
		int a =0;
		int b=0;
		Map row = null;
		String sql2="delete from  czymenu where person_id='"+CFRY01+"'";
		execSQL(tms, sql2, row);
		try {
				for(int j=0;j<CD.size();j++){
					JSONObject obj =(JSONObject)CD.get(j);
					String alqx=getAlqx(String.valueOf(obj.get("code")));
					//String sql ="insert into czymenu values('"+obj.get("code")+"','"+CFRY01+"','"+obj.get("alqx").toString()+"')";
					String sql ="update czymenu set CD='"+obj.get("code")+"' ,alqx='"+alqx+"' where person_id='"+CFRY01+"' and CD='"+obj.get("code")+"'";
					String sql1 ="insert into czymenu values('"+obj.get("code")+"','"+CFRY01+"','"+alqx+"')";
//					a=execSQL(tms, sql, row);
//					if(a==0){
						b=execSQL(tms, sql1, row);
//					}
				}
			map.put("status", 1);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		
		return map;
		
	}
	
	/**
	 * 
	 * 功能描述: 获得alqx
	 * @author sun
	 * @date 2016年6月27日
	 * @param code
	 * @return
	 */
	public String getAlqx(String code){
		String sql="select * from menu where code='"+code+"'";
		Map map=null;
		try {
			map=queryForMap(tms, sql);
			return (String) map.get("alqx");
		} catch (Exception e) {
			return "[]";
		}
	}
	@SuppressWarnings({ "unchecked"})
	@RequestMapping("/insertCZYWD.do")
	public Map insertCZYWD(String json) throws Exception{
		List<Map> list=FormTools.mapperToMapList(json);
		Map map1 = (Map) list.get(0);
		String CFRY01 =  list.get(0).get("CFRY01").toString();
		JSONArray CD =  (JSONArray) FormTools.mapperToJSONArray(map1.get("WD").toString());
		Map map = new HashMap();
		int a =0;
		int b=0;
		try {
				for(int j=0;j<CD.size();j++){
					JSONObject obj =(JSONObject)CD.get(j);
					//String sql ="insert into czymenu values('"+obj.get("code")+"','"+CFRY01+"','"+obj.get("alqx").toString()+"')";
					String sql ="update user_net_table set net_code='"+obj.get("code")+"' where peop_code='"+CFRY01+"' and net_code='"+obj.get("code")+"'";
					String sql1 ="insert into user_net_table values('"+CFRY01+"','"+obj.get("code")+"')";
					Map row = null;
					a=execSQL(tms, sql, row);
					if(a==0){
						b=execSQL(tms, sql1, row);
					}
				}
			map.put("status", 1);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		
		return map;
		
	}
	
	@SuppressWarnings({ "unchecked"})
	@RequestMapping("/insertBMWD.do")
	public Map insertBMWD(String json) throws Exception{
		List<Map> list=FormTools.mapperToMapList(json);
		Map map1 = (Map) list.get(0);
		String BM01 =  list.get(0).get("BM01").toString();
		JSONArray WD =  (JSONArray) FormTools.mapperToJSONArray(map1.get("WD").toString());
		Map map = new HashMap();
		int a =0;
		int b=0;
		try {
				for(int j=0;j<WD.size();j++){
					JSONObject obj =(JSONObject)WD.get(j);
					//String sql ="insert into czymenu values('"+obj.get("code")+"','"+CFRY01+"','"+obj.get("alqx").toString()+"')";
					String sql ="update bm_wd set wd01='"+obj.get("code")+"' where bm01='"+BM01+"' and wd01='"+obj.get("code")+"'";
					String sql1 ="insert into bm_wd values('"+obj.get("code")+"','"+BM01+"')";
					Map row = null;
					a=execSQL(tms, sql, row);
					if(a==0){
						b=execSQL(tms, sql1, row);
					}
					/*sql1="select peop_code CFRY01 from peop_tab where dept_code='"+BM01+"'";
					List  users = queryForList(tms, sql1);
					JSONArray czycd = new JSONArray();
					for(int i=0;i<users.size();i++){
						Map temp = (Map) users.get(i);
						temp.put("WD",WD.toString());
						czycd.add(temp);
						insertCZYWD(czycd.toString());
					}*/
				}
				
			map.put("status", 1);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		
		return map;
		
	}
	
	@SuppressWarnings({ "unchecked"})
	@RequestMapping("/insertBMCD.do")
	public Map insertBMCD(String json) throws Exception{
		List<Map> list=FormTools.mapperToMapList(json);
		Map map1 = (Map) list.get(0);
		String BM01 =  list.get(0).get("BM01").toString();
		JSONArray CD =  (JSONArray) FormTools.mapperToJSONArray(map1.get("CD").toString());
		Map map = new HashMap();
		int a =0;
		int b=0;
		try {
				for(int j=0;j<CD.size();j++){
					JSONObject obj =(JSONObject)CD.get(j);
					//String sql ="insert into czymenu values('"+obj.get("code")+"','"+CFRY01+"','"+obj.get("alqx").toString()+"')";
					String sql ="update bm_menu set cd='"+obj.get("code")+"', alqx='"+obj.get("alqx").toString()+"' where bm01='"+BM01+"' and cd='"+obj.get("code")+"'";
					String sql1 ="insert into bm_menu values('"+obj.get("code")+"','"+BM01+"','"+obj.get("alqx").toString()+"')";
					Map row = null;
					a=execSQL(tms, sql, row);
					if(a==0){
						b=execSQL(tms, sql1, row);
					}
					/*sql1="select peop_code CFRY01 from peop_tab where dept_code='"+BM01+"'";
					List  users = queryForList(tms, sql1);
					JSONArray czycd = new JSONArray();
					for(int i=0;i<users.size();i++){
						Map temp = (Map) users.get(i);
						temp.put("CD",CD.toString());
						czycd.add(temp);
						insertCZYQX(czycd.toString());
					}*/
				}
				
			map.put("status", 1);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		
		return map;
		
	}
	
	@SuppressWarnings({ "unchecked"})
	@RequestMapping("/insertCOPYCZYQX.do")
	public Map insertCOPYCZYQX(String json) throws Exception{
		cds = new DataSet(json);
		Map map = new HashMap();
		try {
			String sql ="select cd,person_id,alqx from czymenu where person_id='"+cds.getField("ry01", 0)+"'";
			Map row = getRow(sql, 0);
			List list = queryForList(tms, sql,row);
			
			String sqldel ="delete from czymenu where person_id='"+cds.getField("ry02", 0)+"'";
			execSQL(tms, sqldel, row);
			int a=0;
			int b=0;
			for(int i=0;i<list.size();i++){
				Map tem = (Map) list.get(i);
				String sqlin = "insert into czymenu values('"+tem.get("cd")+"','"+cds.getField("ry02", 0)+"','"+tem.get("alqx")+"')";
				a +=execSQL(tms, sqlin, row);
			}
			String sqlwd ="select net_code wd01,peop_code person_id from user_net_table where peop_code='"+cds.getField("ry01", 0)+"'";
			Map wdrow =getRow(sqlwd, 0);
			List wdlist = queryForList(tms, sqlwd,row);
			String wdsqldel ="delete from user_net_table where peop_code='"+cds.getField("ry02", 0)+"'";
			execSQL(tms, wdsqldel, wdrow);
			for(int i=0;i<wdlist.size();i++){
				Map tem = (Map) wdlist.get(i);
				String sqlin = "insert into user_net_table values('"+cds.getField("ry02", 0)+"','"+tem.get("wd01")+"')";
				b +=execSQL(tms, sqlin, row);
			}
			if(a+b>=1){
				map.put("status", 1);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
			
		}
		return map;
		
	}
	
	/****
	 * 修改密码
	 * @param josn
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "unchecked"})
	@RequestMapping("/updateMM.do")
	public Map updateMM(String json) throws Exception{
		Map returnMap = new HashMap();
		cds = new DataSet(json);
		String passWord = MD5.getMD5(cds.getField("password", 0)).toLowerCase();   
		String SQL = "UPDATE user_info SET passwd='"+passWord+"' WHERE userid=person_id?";
		Map row = getRow(SQL, 0);
		int i = execSQL(tms, SQL, row);
		if(i==1){
			returnMap.put("status", 1);
		}else{
			returnMap.put("status", 0);
		}
		return returnMap;
	}
	
	/****
	 * 特殊权限
	 * @param XmlData
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "unchecked"})
	@RequestMapping("/insertTSQX.do")
	public Map insertTSQX(String XmlData,String CFRY01,String code) throws Exception{
		Map returnMap = new HashMap();
		cds = new DataSet(XmlData);
		String delsql = "delete from tsqx_tab where peop_code='"+CFRY01+"'";
		if(code !=null && code !=""){
			delsql+=" and  qxcode in(select qxcode from qx_tab where menu='"+code+"')";
		}
		String sql = "insert into tsqx_tab (qxcode,peop_code)VALUES(qxcode?,'"+CFRY01+"')";
		Map map =null;
		int d = execSQL(tms, delsql, map);
		
		Map[] rows = getRows(sql, null);
		int[] i = execSQL(tms, sql, rows);
		if(i.length>0){
			returnMap.put("status", 1);
		}else{
			returnMap.put("status", 0);
		}
		return returnMap;
	}
}
