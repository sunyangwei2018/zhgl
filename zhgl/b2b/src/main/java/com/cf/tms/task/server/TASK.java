package com.cf.tms.task.server;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.framework.JLBill;
import com.cf.framework.dataset.DataSet;
import com.cf.framework.dataset.IDataSet;
import com.cf.utils.GetTasknoProcedure;
import com.cf.utils.PubFun;


@Controller
@RequestMapping("/cftask")
public class TASK extends JLBill {
	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(TASK.class);
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/insertTASK.do")
	public Map insertTASK(String XmlData,String Taskno) throws Exception{
		Map resultMap = new HashMap();	
		try {		
			GetTasknoProcedure taskno=new GetTasknoProcedure();
			Map map =  FormTools.mapperToMap(XmlData);
				if (map.get("dd_flag").equals("0")) {
					String BH = null;
					System.out.println(BH);
					String sql =" update task_tab set car_num='"+map.get("car_num")+"',c_long='"+map.get("c_long")+"',c_height='"+map.get("c_height")+"',c_volume='"+map.get("c_volume")+"',c_width='"+map.get("c_width")+"',driver='"+map.get("driver")+"',tel='"+map.get("tel")+"',"
							+ "tsh_peop='"+map.get("tsh_peop")+"',shp_code='"+map.get("shp_code")+"',line_code='"+map.get("line_code")+"',yw_flag='"+map.get("yw_flag")+"',net_code='"+map.get("net_code")+"',dd_flag='"+map.get("dd_flag")+"',"
							+ "flag='"+map.get("flag")+"',xgr='"+map.get("xgr")+"',xgrq=sysdate,lscar_num='"+map.get("lscar_num")+"',memo='"+map.get("memo")+"',tsh_peop_code='"+map.get("tsh_peop_code")+"' where taskno='"+map.get("taskno")+"' ";
					Map row =null;
					int a = execSQL(tms, sql, row);
					if(a==0){
						BH=taskno.GetTaskno(Taskno, (String) map.get("dd_flag"));
						sql=" insert into task_tab (taskno,car_num,c_long,c_height,c_volume,c_width,driver,tel, "
								+ " tsh_peop,shp_code,line_code,yw_flag,lrrq,net_code,dd_flag,state,flag,lrr,lscar_num,nownet,memo,tsh_peop_code) "
								+ " values('"+BH+"','"+map.get("car_num")+"','"+map.get("c_long")+"','"+map.get("c_height")+"','"+map.get("c_volume")+"','"+map.get("c_width")+"','"+map.get("driver")+"','"+map.get("tel")+"','"+map.get("tsh_peop")+"','"+map.get("shp_code")+"','"+map.get("line_code")+"','"+map.get("yw_flag")+"', "
								+ " sysdate,'"+map.get("net_code")+"','"+map.get("dd_flag")+"','"+map.get("state")+"','"+map.get("flag")+"','"+map.get("lrr")+"','"+map.get("lscar_num")+"','"+map.get("nownet")+"','"+map.get("memo")+"','"+map.get("tsh_peop_code")+"') ";
						execSQL(tms, sql, row);
						sql=" insert into taskfee_tab (taskno,tshf,zcf,zxf,tcf,gsf,qtfy,totalprice,lrr,lrrq,lrwd,type) "
								+ "values('"+BH+"','"+map.get("tshf")+"','"+map.get("zcf")+"','"+map.get("zxf")+"','"+map.get("tcf")+"','"+map.get("gsf")+"','"+map.get("qtfy")+"','"+map.get("totalprice")+"','"+map.get("lrr")+"',sysdate,'"+map.get("net_code")+"','"+map.get("dd_flag")+"')";	
						execSQL(tms, sql, row);
						sql="insert into taskstate_tab (taskno,state,czr,czrq,czwd,flag,cancel)"
								+ "values('"+BH+"',1,'"+map.get("lrr")+"',sysdate,'"+map.get("net_code")+"',1,0) ";
						execSQL(tms, sql, row);
						sql=" insert into task_peop_tab (taskno,peop_code,lrr,lrrq,lrwd)"
								+ "values('"+BH+"','"+map.get("tsh_peop_code")+"','"+map.get("lrr")+"',sysdate,'"+map.get("net_code")+"') ";
						execSQL(tms, sql, row);
					}else{
						sql =" update taskfee_tab set tshf='"+map.get("tshf")+"',zcf='"+map.get("zcf")+"',zxf='"+map.get("zxf")+"',tcf='"+map.get("tcf")+"',"
								+ "gsf='"+map.get("gsf")+"',qtfy='"+map.get("qtfy")+"',totalprice='"+map.get("totalprice")+"' where taskno='"+map.get("taskno")+"' ";
						execSQL(tms, sql, row);
						sql=" insert into taskstate_tab (taskno,state,czr,czrq,czwd,flag,cancel)"
								+ "select a.taskno,7,a.xgr,a.xgrq,a.net_code,"
								+ "2,0 from task_tab a where a.taskno='"+map.get("taskno")+"' ";
						execSQL(tms, sql, row);
						sql=" update task_peop_tab set peop_code='"+map.get("tsh_peop_code")+"' where taskno='"+map.get("taskno")+"' ";
						execSQL(tms, sql, row);
					}
					resultMap.put("BH", BH);
				}else if (map.get("dd_flag").equals("1")) { 
					String BH2=null;
					String sql =" update task_tab set car_num='"+map.get("car_num")+"',c_long='"+map.get("c_long")+"',c_height='"+map.get("c_height")+"',c_volume='"+map.get("c_volume")+"',c_width='"+map.get("c_width")+"',driver='"+map.get("driver")+"',tel='"+map.get("tel")+"',"
							+ "tsh_peop='"+map.get("tsh_peop")+"',shp_code='"+map.get("shp_code")+"',line_code='"+map.get("line_code")+"',yw_flag='"+map.get("yw_flag")+"',net_code='"+map.get("net_code")+"',dd_flag='"+map.get("dd_flag")+"',"
							+ "flag='"+map.get("flag")+"',xgr='"+map.get("xgr")+"',xgrq=sysdate,lscar_num='"+map.get("lscar_num")+"',memo='"+map.get("memo")+"' where taskno='"+map.get("taskno")+"' ";
					Map row =null;
					int a=execSQL(tms, sql, row);
					if(a==0){
						BH2=taskno.GetTaskno(Taskno, (String) map.get("dd_flag"));
						System.out.println(BH2);
						sql=" insert into task_tab (taskno,car_num,c_long,c_height,c_volume,c_width,driver,tel,"
								+ " tsh_peop,shp_code,line_code,yw_flag,lrrq,net_code,dd_flag,state,flag,lrr,lscar_num,nownet,memo) "
								+ " values('"+BH2+"','"+map.get("car_num")+"','"+map.get("c_long")+"','"+map.get("c_height")+"','"+map.get("c_volume")+"','"+map.get("c_width")+"','"+map.get("driver")+"','"+map.get("tel")+"','"+map.get("tsh_peop")+"','"+map.get("shp_code")+"','"+map.get("line_code")+"','"+map.get("yw_flag")+"',"
								+ " sysdate,'"+map.get("net_code")+"','"+map.get("dd_flag")+"','"+map.get("state")+"','"+map.get("flag")+"','"+map.get("lrr")+"','"+map.get("lscar_num")+"','"+map.get("nownet")+"','"+map.get("memo")+"') ";
						execSQL(tms, sql, row);
						double zcf=getInfo(map);
						int total=Integer.valueOf(String.valueOf(map.get("totalprice")));
						sql=" insert into taskfee_tab (taskno,zcf,zxf,gsf,qtfy,totalprice,lrr,lrrq,lrwd,type) "
								+ "values('"+BH2+"','"+zcf+"','"+map.get("zxf")+"','"+map.get("gsf")+"','"+map.get("qtfy")+"','"+(zcf+total)+"','"+map.get("lrr")+"',sysdate,'"+map.get("net_code")+"','"+map.get("dd_flag")+"')";	
						execSQL(tms, sql, row);
						sql=" insert into taskstate_tab (taskno,state,czr,czrq,czwd,flag,cancel)"
								+ "values('"+BH2+"',1,'"+map.get("lrr")+"',sysdate,'"+map.get("net_code")+"',1,0) ";
						execSQL(tms, sql, row);
					}else{
						double zcf=getInfo(map);
						sql =" update taskfee_tab set tshf='"+map.get("tshf")+"',zcf='"+zcf+"',zxf='"+map.get("zxf")+"',"
								+ "gsf='"+map.get("gsf")+"',qtfy='"+map.get("qtfy")+"',totalprice='"+zcf+"' where taskno='"+map.get("taskno")+"' ";
						execSQL(tms, sql, row);
						sql=" insert into taskstate_tab (taskno,state,czr,czrq,czwd,flag,cancel)"
								+ "select a.taskno,7,a.xgr,a.xgrq,a.net_code,"
								+ "2,0 from task_tab a where a.taskno='"+map.get("taskno")+"' ";
						execSQL(tms, sql, row);
					}
					resultMap.put("BH2", BH2);
				}
			resultMap.put("staus", "操作成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("staus", e.getMessage());
			e.printStackTrace();
		}
		return resultMap;
	
	}
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/deleteTASk.do")
	public Map deleteTASk(String XmlData){
		Map resultMap = new HashMap();
		try {
			Map map =  FormTools.mapperToMap(XmlData);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
			String sql="insert into deltask_tab (taskno,line_code,car_num,lscar_num,driver,tel,lrr,lrrq,xgr,xgrq,totalprice)"
						+ "select a.taskno,a.line_code,a.car_num,a.lscar_num,a.driver,a.tel,a.lrr,a.lrrq,a.xgr,a.xgrq,b.totalprice "
						+ "from task_tab a,taskfee_tab b where a.taskno=b.taskno and a.taskno='"+map.get("taskno")+"'";
			Map row = null;
			execSQL(tms, sql, row);
			sql="delete from task_tab where taskno='"+map.get("taskno")+"'";
			execSQL(tms, sql, row);
			sql="delete from taskfee_tab where taskno='"+map.get("taskno")+"'";
			execSQL(tms, sql, row);
			sql="insert into taskstate_tab (taskno,state,czr,czrq,czwd,flag,cancel)"
						+ "values('"+map.get("taskno")+"',8,'"+map.get("czr")+"',sysdate,'"+map.get("czwd")+"',2,0)";
			execSQL(tms, sql, row);
			resultMap.put("staus", "操作成功");		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("staus", e.getMessage());
			e.printStackTrace();
		}
		return resultMap;
	
	}
	
	
	/**
	 * 
	 * 功能描述: 判断车长，类型，线路
	 * @author sun
	 * @date 2016年12月9日
	 * @param map2
	 * @return
	 */
	public double getInfo(Map map2){
		String sql="select * from GDZCF_tab where c_long ='"+map2.get("c_long")+"' and cllx="+map2.get("flag")+" and LINE_CODE='"+map2.get("line_code")+"'";
		try {
			Map map=queryForMap(tms, sql, map2);
			return ((BigDecimal)map.get("money")).doubleValue();
		} catch (Exception e) {
			return 0.0;
		}
	}
}