package com.cf.tms.task.server;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.framework.JLBill;
import com.cf.framework.dataset.DataSet;
import com.cf.utils.PubFun;


@Controller
@RequestMapping("/cfSrchTask")
public class SrchTask extends JLBill {
	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(SrchTask.class);

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/UpdateTask.do")
	public Map insertTASK(String XmlData){
		Map resultMap = new HashMap();
		try {
			Map map =  FormTools.mapperToMap(XmlData);
			String sql =" update task_tab set taskno='"+map.get("taskno")+"',car_num='"+map.get("car_num")+"',c_long='"+map.get("c_long")+"',c_height='"+map.get("c_height")+"',c_volume='"+map.get("c_volume")+"',c_width='"+map.get("c_width")+"',driver='"+map.get("driver")+"',tel='"+map.get("tel")+"',"
					+ "tsh_peop='"+map.get("tsh_peop")+"',shp_code='"+map.get("shp_code")+"',line_code='"+map.get("line_code")+"',yw_flag='"+map.get("yw_flag")+"',net_code='"+map.get("net_code")+"',dd_flag='"+map.get("dd_flag")+"',"
					+ "flag='"+map.get("flag")+"',tsh_peop_code='"+map.get("tsh_peop_code")+"',xgr='"+map.get("xgr")+"',xgrq=sysdate,lscar_num='"+map.get("lscar_num")+"',memo='"+map.get("memo")+"' where taskno='"+map.get("taskno")+"' ";
			Map row =null;
			execSQL(tms, sql, row);
			sql =" update taskfee_tab set taskno='"+map.get("taskno")+"',tshf='"+map.get("tshf")+"',zcf='"+map.get("zcf")+"',zxf='"+map.get("zxf")+"',tcf='"+(FormTools.isNull(map.get("tcf"))?"0":map.get("tcf").toString())+"',"
					+ "gsf='"+map.get("gsf")+"',qtfy='"+map.get("qtfy")+"',totalprice='"+map.get("totalprice")+"' where taskno='"+map.get("taskno")+"' ";
			execSQL(tms, sql, row);
			sql=" insert into taskstate_tab (taskno,state,czr,czrq,czwd,flag,cancel)"
					+ "select a.taskno,7,a.xgr,a.xgrq,a.net_code,"
					+ "2,0 from task_tab a where a.taskno='"+map.get("taskno")+"' ";
			execSQL(tms, sql, row);
			sql=" update task_peop_tab set peop_code='"+map.get("tsh_peop_code")+"' where taskno='"+map.get("taskno")+"' ";
			execSQL(tms, sql, row);
			resultMap.put("staus", "操作成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("staus", e.getMessage());
			e.printStackTrace();
		}
		return resultMap;
	
	}
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/deleteSrchTask.do")
	public Map deleteTASk(String XmlData){
	Map resultMap = new HashMap();
	try {
		Map map =  FormTools.mapperToMap(XmlData); 
		Map row = null;
			String sql="insert into deltask_tab (taskno,line_code,car_num,lscar_num,driver,tel,lrr,lrrq,xgr,xgrq,totalprice)"
					+ "select a.taskno,a.line_code,a.car_num,a.lscar_num,a.driver,a.tel,a.lrr,a.lrrq,a.xgr,a.xgrq,b.totalprice "
					+ "from task_tab a,taskfee_tab b where a.taskno=b.taskno and a.taskno='"+map.get("taskno")+"' ";
			execSQL(tms, sql, row);
			sql="delete from task_tab where taskno='"+map.get("taskno")+"' ";
			execSQL(tms, sql, row);
			sql="delete from taskfee_tab where taskno='"+map.get("taskno")+"' ";
			execSQL(tms, sql, row);
			sql="insert into taskstate_tab (taskno,state,czr,czrq,czwd,flag,cancel)"
				+ "values ('"+map.get("taskno")+"',8,'"+map.get("czr")+"',sysdate,'"+map.get("czwd")+"',2,0)";
			execSQL(tms, sql, row);
		
		resultMap.put("staus", "操作成功");
	} catch (Exception e) {
		// TODO Auto-generated catch block
		resultMap.put("staus", e.getMessage());
		e.printStackTrace();
	}
	return resultMap;
  }
}