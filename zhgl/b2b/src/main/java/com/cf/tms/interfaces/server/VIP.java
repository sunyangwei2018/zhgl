package com.cf.tms.interfaces.server;

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

@Controller
@RequestMapping("/cfvip")
public class VIP extends JLBill {
	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(VIP.class);
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/insertVIP.do")
	public Map insertVIP(String XmlData) throws Exception{
		Map resultMap = new HashMap();
		try {
			Map map_main =  FormTools.mapperToMap(XmlData);
			Map row = null;
			//循环写运单
			List list =(List)map_main.get("item");
			for(int i=0;i<list.size();i++){
				Map obj=(Map)list.get(i);
				if(obj.get("pdbj").toString().equals("1")){
				if(obj.get("tbbj").toString().equals("0")){
				//写入运单表
				String sql = " insert into bill_tab(billno,postdate,flag,jj_flag,postzone,postnet,postman,"
						+"posttel,postaddr,bj_flag,acceptzone,acceptnet,acceptman,"
						+"accepttel,acceptaddr,boxes,duals,volume,memo,lrr,lrrq,"
						+"weight,state,nownet,package,postdw,acceptdw,ddh,impl)"
						+" values('"+obj.get("billno")+"',to_date('"+obj.get("postdate")+"','YYYY-MM-DD'),1,0,'"+obj.get("postzone")+"','"+map_main.get("czwd")+"','"+obj.get("postman")+"',"
						+ "'"+obj.get("posttel")+"','"+obj.get("postaddr")+"',0,'"+obj.get("acceptzone")+"','"+obj.get("acceptnet")+"','"+obj.get("acceptman")+"',"
						+ "'"+obj.get("accepttel")+"','"+obj.get("acceptaddr")+"','"+obj.get("boxes")+"','"+obj.get("duals")+"','"+obj.get("volume")+"','"+obj.get("memo")+"','"+map_main.get("czr")+"',sysdate,"
						+ "'"+obj.get("weight")+"',3,'"+map_main.get("czwd")+"',0,'"+obj.get("postdw")+"','"+obj.get("acceptdw")+"','"+obj.get("ddh")+"',3)";
				execSQL(tms, sql, row);
				//写入费用表
				sql = " insert into billfee_tab(billno,cus_code,jswd,fkfs,hwlb,gg,"
						+"jjfs,smjz,bjfl,bjje,postfee,bjfee,totalprice)"
						+" values('"+obj.get("billno")+"','"+obj.get("cus_code")+"','"+obj.get("jswd")+"','"+obj.get("fkfs")+"','"+obj.get("hwlb")+"','"+obj.get("gg")+"',"
						+ "'"+obj.get("jjfs")+"',0,0,0,'"+obj.get("postfee")+"','"+obj.get("bjfee")+"','"+obj.get("totalprice")+"')";
				execSQL(tms, sql, row);
				sql = "delete from bill_boxitem_tab where billno = '"+obj.get("billno")+"'";
				execSQL(tms, sql, row);
				//写入箱号关联表
				sql = " insert into bill_boxitem_tab(billno,boxno,vipflag)"
						+" select order_mailno,order_boxno,1"
						+" from cfcus_order_box"
						+" where order_mailno='"+obj.get("billno")+"'";
				execSQL(tms, sql, row);
				sql ="select order_boxno from cfcus_order_box where order_mailno='"+obj.get("billno")+"'";
				List<Map> list2=queryForList(tms, sql);
				for(int j=0;j<list2.size();j++){
					Map map_box = list2.get(j);
					//运单表
					sql = "update scan_tab set billno = '"+obj.get("billno")+"'"
							+" where boxno = '"+map_box.get("order_boxno")+"'";
					execSQL(tms, sql, row);
				}
				//将运单号添加进扫描表
				
				//写入同步标记表
				sql = " insert into cfcus_order_tab(billno,upman,upnet,uptime)"
						+" values('"+obj.get("billno")+"','"+map_main.get("czr")+"','"+map_main.get("czwd")+"',sysdate)";
				execSQL(tms, sql, row);
				//写入运单状态表
				sql =" insert into billstate_tab(billno,state,czr,czrq,czwd,flag,items)"
						+" values('"+obj.get("billno")+"',3,'"+map_main.get("czr")+"',sysdate,'"+map_main.get("czwd")+"',1,'"+obj.get("boxes")+"')";
				execSQL(tms, sql, row);
				}
				}
			}
			resultMap.put("staus", "同步成功");
						
		} catch (Exception e) {
			resultMap.put("staus", e.getMessage());
			e.printStackTrace();
			throw e;
		}

	return resultMap;
	
	}
}

