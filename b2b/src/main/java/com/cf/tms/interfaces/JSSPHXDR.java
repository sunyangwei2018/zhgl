package com.cf.tms.interfaces;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.framework.dataset.DataSet;

@Controller
@RequestMapping("/JSSPHXInterface")
public class JSSPHXDR extends FormTools{
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/JSSPHXInterface.do")
	public Map getXHLB(String XmlData) throws Exception {
		//下载文件路径
		Map returnMap = new HashMap();
		JSONObject json = FormTools.mapperToJSONObject(XmlData);
		JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
		int XHHX = Integer.parseInt(json.getString("XHHX"));
		List<Map> excelList = getExcelData(XHHX,files);//读取EXECL数据
		String CFRY01 = json.getString("CFRY01");
		//验证上传数据是否合理
		for (int i = 0; i< excelList.size(); i++) {
			Map obj = excelList.get(i);
			//都不能为空  fptt
			if(FormTools.isNull(obj.get("fph"))){
				throw new Exception((i+2)+"行发票号不能为空！");
			}
			if(FormTools.isNull(obj.get("jsdh"))){
				throw new Exception((i+2)+"行结算单号不能为空！");
			}
			if(FormTools.isNull(obj.get("ticketno"))){
				throw new Exception((i+2)+"行申请单号不能为空！");
			}
			if(FormTools.isNull(obj.get("fptt"))){
				throw new Exception((i+2)+"行发票抬头不能为空！");
			}
			if(FormTools.isNull(obj.get("swdjh"))){
				throw new Exception((i+2)+"行税务登记不能为空！");
			}
			if(FormTools.isNull(obj.get("khh"))){
				throw new Exception((i+2)+"行开户行不能为空！");
			}
			if(FormTools.isNull(obj.get("zh"))){
				throw new Exception((i+2)+"行银行账号不能为空！");
			}
			if(FormTools.isNull(obj.get("kpaddr"))){
				throw new Exception((i+2)+"行公司地址不能为空！");
			}
			if(FormTools.isNull(obj.get("kptel"))){
				throw new Exception((i+2)+"行公司电话不能为空！");
			}
			if(FormTools.isNull(obj.get("kprq"))){
				throw new Exception((i+2)+"行开票日期不能为空！");
			}
			
			if(FormTools.isNull(obj.get("spje"))){
				throw new Exception((i+2)+"行开票金额不能为空！");
			}
			JSONObject map = new JSONObject();
			map.put("jsno", obj.get("jsdh"));    
			Map YD = (Map) queryForObjectByXML("tms", "JSSPHXDR.selectJSNO", map);
			//获取 xml 获得结算单号 判断是否有对应的单号
			Map KP = (Map) queryForObjectByXML("tms", "JSSPHXDR.selectJSSPHXDRS", obj);
			if(FormTools.isNull(YD)){
				throw new Exception("第"+(i+2)+"行结算单【"+obj.get("jsdh")+"】不存在");
			}
			if(FormTools.isNull(KP)){
				throw new Exception("第"+(i+2)+"行申请单号【"+obj.get("ticketno")+"】不存在");
			}
			if(Float.valueOf(String.valueOf(KP.get("counts")))!=0){
				throw new Exception("第"+(i+2)+"行申请单号【"+obj.get("ticketno")+"】已经开票");
			}
			//税票金额不能小于0 
			if(Float.valueOf(String.valueOf(obj.get("spje")))<=0){
	 			throw new Exception((i+2)+"行开票金额要大于0！");
	 		}
			if(Float.valueOf(String.valueOf(obj.get("spje")))>Float.valueOf(String.valueOf(KP.get("kpsqje")))){
				throw new Exception((i+2)+"行税票金额要小于开票申请金额！");
			}
			
		}
		String sql=" INSERT INTO kpxx_yj_tab(fph,ticketno,jsdh,fptt,swdjh,khh,zh,kpaddr,kptel,kprq,kpje,yfbz,lrr,lrrq)"
				+ " VALUES(fph?,ticketno?,jsdh?,fptt?,swdjh?,khh?,zh?,kpaddr?,kptel?,to_date(kprq?,'YYYY-MM-DD'),spje?,yfbz?,'"+CFRY01+"',sysdate) ";
//		//将数据放入临时表
//		String delall ="delete from jssphxdr_tab_ls a where a.lrr='"+CFRY01+"'";

		/*//先删除临时表
		Map delBillrow= null;
		int del = execSQL(tms, delall, delBillrow);

	    //插入结算调整表
		Map[] row= FormTools.mapperToMapArrayList(excelList.toString());
		int[] b= execSQL(tms, sql, row);
		sql=" insert into jssphxdr_tab(FPH ,JSNO ,SPJE ,FPTT,KPRQ,LRR,LRRQ,HXBJ)"
				+ " select a.FPH,a.JSNO,a.SPJE,a.FPTT,a.KPRQ,a.lrr,a.lrrq,0 "
				+ " from jssphxdr_tab_ls a"
				+ " where a.lrr = '"+CFRY01+"'";*/
		//插入正式表判断
//		Map tempRow = null;
		Map[] row= FormTools.mapperToMapArrayList(excelList.toString());
		execSQL(tms, sql,row);
		return returnMap;
	}

}
