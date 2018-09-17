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
@RequestMapping("OrderInterface")
public class OrderInterface extends FormTools {
	//导入
		@SuppressWarnings({ "rawtypes", "unchecked" })
		@RequestMapping("/insertDrder.do")
		public Map insertDrder(String XmlData) throws Exception{
			Map resultMap = new HashMap();
			/**/
			try {
				JSONObject json = FormTools.mapperToJSONObject(XmlData);
				JSONArray files = FormTools.mapperToJSONArray(json.getString("data"));
				int DDR = Integer.parseInt(json.getString("DDR"));
				List<Map> excelList = getExcelData(DDR,files);//读取EXECL数据
				String CFRY01 = json.getString("CFRY01");
				String lrwd = json.getString("lrwd");
				JSONArray AWDlist = new JSONArray();
				for (int i = 0; i< excelList.size(); i++) {
					Map obj = excelList.get(i);
					obj.put("lrr", CFRY01);
					obj.put("lrwd", lrwd);
					//都不能为空  fptt		["postman","posttel","boxes","vol","thnet","jjbj","postaddress"]
					if(FormTools.isNull(obj.get("postman"))){
						throw new Exception((i+2)+"行发货人不能为空！");
					}
					if(FormTools.isNull(obj.get("posttel"))){
						throw new Exception((i+2)+"行发货电话不能为空！");
					}
					if(FormTools.isNull(obj.get("boxes"))){
						throw new Exception((i+2)+"行箱数不能为空！");
					}
					if(FormTools.isNull(obj.get("vol"))){
						throw new Exception((i+2)+"行发体积不能为空！");
					}
					if(FormTools.isNull(obj.get("thnet"))){
						throw new Exception((i+2)+"行发提货网点不能为空！");
					}
					Map DR = (Map) queryForObjectByXML("tms", "order.selectThnet", obj);
					if(FormTools.isNull(DR)){
						throw new Exception("第"+(i+2)+"行提货网点【"+obj.get("thnet")+"】不存在");
					}
					if(FormTools.isNull(obj.get("jjbj"))){
						throw new Exception((i+2)+"行发是否加急不能为空！");
					}
					if(FormTools.isNull(obj.get("postaddress"))){
						throw new Exception((i+2)+"行发货地址不能为空！");
					}
					String sql3=" SELECT  to_char(sysdate,'yyMMddhh24')||to_char(ORDER_TAB_ORDERNO_SEQ.nextval,'fm00000') ORDERNO FROM dual";
					Map map2=queryForMap(tms, sql3);
					String orderno=String.valueOf(map2.get("ORDERNO"));
					obj.put("orderno", orderno);
					AWDlist.add(obj);
				}
				cds = new DataSet(excelList.toString());//准备数据
				

				
				//先删除临时表
				Map delBillrow= null;
				String sql1="delete from order_current_tab where lrr='"+CFRY01+"'";
				execSQL(tms, sql1, delBillrow);	
					
				Map[] row1= FormTools.mapperToMapArrayList(AWDlist.toString());
				
				String sql2="insert into order_current_tab (orderno, postman, posttel, boxes, vol, thnet,jjbj,postaddress,lrr,lrwd,lrrq,state) "+
				"values (orderno?,postman?, posttel?, boxes?, vol?,thnet?,jjbj?, postaddress?,lrr?,lrwd?,sysdate,1)";
				execSQL(tms, sql2, row1);	
				
				String sql4="insert into order_tab (orderno, postman, posttel, boxes, vol, thnet, lrr, lrrq, lrwd, state,jjbj,postaddress) "+
				" select oct.orderno,oct.postman,oct.posttel,oct.boxes,oct.vol,oct.thnet,oct.lrr,oct.lrrq,oct.lrwd,oct.state,oct.jjbj,oct.postaddress from order_current_tab oct";
				execSQL(tms, sql4, row1);	
				
				String sql5="insert into orderstate_tab (orderno, state, cancel, lrr, lrrq, lrwd, qxr, qxrq, qxwd) values (orderno?, 1, 0, lrr?, sysdate, lrwd?, null, null, null)";
				execSQL(tms, sql5, row1);
				resultMap.put("MSGID", "S");
				resultMap.put("msg", "操作成功！");
				
			} catch (Exception e) {
				// TODO 自动生成的 catch 块
				resultMap.put("MSGID", "F");
				throw new Exception(e.getMessage());
			}
			return resultMap;
		}
}
