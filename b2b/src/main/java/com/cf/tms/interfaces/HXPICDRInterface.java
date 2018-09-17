package com.cf.tms.interfaces;

import java.io.InputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.cf.forms.FormTools;
import com.cf.framework.JLBill;
import com.cf.utils.Base64Utils;
import com.cf.utils.JLTools;
import com.cf.utils.Urlutils;


@Controller
@RequestMapping("HXPICDRInterface")
public class HXPICDRInterface extends JLBill{

	SimpleDateFormat dateFormat=new SimpleDateFormat("yyMMddhhmmssSSS");
	String post_url="http://imgscan.spring56.com/files/bills/data/weixin/WeChat/interface.php";
	@RequestMapping("/multiUpload.do")
	@Transactional(rollbackFor=Exception.class)
	public Map multiUpload(HttpServletRequest request,HttpServletResponse response,String CFRY01,String wd) throws Exception{	
		response.setCharacterEncoding("UTF-8");
		Map map = new HashMap();
		InputStream in = null;
		JSONArray ja=new JSONArray();
		try {
			MultiValueMap<String, MultipartFile> multiFileMap = ((MultipartRequest)request).getMultiFileMap();
			Iterator ite = multiFileMap.keySet().iterator();
			String error="";
//			if(EmptyUtils.isEmpty(billno)){
//				map.put("info", "运单号不能为空！");
//				return map;
//			}
			Map map2=new HashMap();
			JSONObject resultData=new JSONObject();
 			while (ite.hasNext()) {
				String key = ite.next().toString();
				List<MultipartFile> files = multiFileMap.get(key);
				Map[] map1=new Map[files.size()];
				for(int i=0;i<files.size();i++){
					MultipartFile file = files.get(i);
					if(!file.isEmpty()){
						Map<String,String> params=new HashMap<String, String>();
						String name=dateFormat.format(new Date())+".jpg";
						params.put("bill", name);
						params.put("file", Base64Utils.getBASE64(file.getBytes()));
						params.put("type", "hxPic");
						params.put("fuc", "tms");
						String picUrl=Urlutils.getUrlResult(params, post_url);
						
						Map<String,String> params2=new HashMap<String, String>();
						params2.put("picUrl", picUrl);
						params2.put("bill", name);
						map1[i]=params2;
						//每一个item就代表一个表单输出项
						in=null;	
						in=file.getInputStream();
						String filename = URLEncoder.encode(file.getOriginalFilename().toString(),"UTF-8");
						long filesize=file.getSize();
						byte[] aryZlib = JLTools.toByteArray(in);
						String url = FormTools.FILE_URL + "/fileserver/attachments/putfile.do?"
								   + "filename="+filename+"&filesize="+filesize+"&filedesc="+filename;
						String resultString = FormTools.sendToSync(aryZlib, url);
						if(resultString.startsWith("{")&&resultString.indexOf("Exception")==-1){
							resultData.put("FILEID", key);
							resultData.put("STATE", 1);
							resultData.putAll(JSONObject.fromObject(resultString));
						}else{
							resultData.put("FILEID", key);
							resultData.put("STATE", 0);
						}
						resultData.put("errorInfo", "hxinfo"+JSONArray.fromObject(map1).toString());
						ja.add(resultData);
					}
				}
//				String sql="INSERT INTO HXPIC_TAB (ID, BILLNO, DOWNLOADS, LRR, LRWD, LRRQ, PICNUMS) VALUES (HXPIC_TAB_ID_SEQ.nextval,'', 0, '"+CFRY01+"', '"+wd+"', sysdate, "+files.size()+")";
//				String sql2="INSERT INTO HXPICITEM_TAB (ID, BILLNO, IMAGENAME, IMAGEURL) VALUES (HXPICITEM_TAB_ID_SEQ.nextval, null, bill?, picUrl?)";
//				Map maps=null;
//				execSQL(tms, sql, maps);
//				execSQL(tms, sql2, map1);
			}
			map.put("resultData", ja);
		} catch (Exception e) {
			map.put("STATE", 0);
			e.printStackTrace();
			map.put("info", e.getMessage());
			throw new Exception(e.getMessage());
		} finally {
			if(in != null ){
				in.close();
			}
		}	
		System.out.println(map);
		return map;			
	}
	
	
	@RequestMapping("saveHxPic.do")
	public Map saveHxPic(String XmlData) throws Exception{
		Map resultMap = new HashMap();
		Map map = FormTools.mapperToMap(XmlData);
		String pic=map.get("item").toString();
		List<Map> files=JSONArray.fromObject(pic.substring(7, pic.length()-1));
		String sql="INSERT INTO HXPIC_TAB (ID, BILLNO, LRR, LRWD, LRRQ, PICNUMS) VALUES (HXPIC_TAB_ID_SEQ.nextval,'"+map.get("billno")+"', '"+map.get("lrr")+"', '"+map.get("lrwd")+"', sysdate, "+files.size()+")";
		String sql2="INSERT INTO HXPICITEM_TAB (ID, BILLNO, IMAGENAME, IMAGEURL) VALUES (HXPICITEM_TAB_ID_SEQ.nextval, '"+map.get("billno")+"', bill?, picUrl?)";
		Map maps=null;
		execSQL(tms, sql, maps);
		Map[] map1=new Map[files.size()];
		for (int i = 0; i < files.size(); i++) {
			map1[i]=files.get(i);
		}
		execSQL(tms, sql2, map1);
		resultMap.put("state", 1);
		resultMap.put("msg", "操作成功！");
		return resultMap;
	}
	
	@RequestMapping("saveHxPicDownLog.do")
	public Map saveHxPicDownLog(String XmlData) throws Exception{
		Map resultMap = new HashMap();
		Map map = FormTools.mapperToMap(XmlData);
		String sql="INSERT INTO DOWNLOADS_LOG_TAB (ID, CZWD, LRRQ, PAYNO) VALUES (DOWNLOADS_LOG_TAB_ID_SEQ.nextval, wd?, sysdate, payno?)";
		execSQL(tms, sql, map);
		resultMap.put("state", 1);
		resultMap.put("msg", "操作成功！");
		return resultMap;
	}
}
