package com.cf.report;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/reportPAY")
public class Prt_PAY extends BaseReport {

	@Override
	protected void printBefore(Map para)throws Exception {
		// TODO Auto-generated method stub
		String sql ="select round((kpfee+round(nvl('"+para.get("QTJE").toString()+"',QTJE),2)-(select dfje from wd_acceptpay_js_tab where jsno=a.jsno)-"
				+ "(select pkje from wd_acceptpay_js_tab where jsno=a.jsno)),2)totalprice,round(nvl('"+para.get("QTJE").toString()+"',QTJE),2)QTJE from wd_yfjskp_tab a where a.jsno='"+para.get("JSNO").toString()+"'";
		Map map = queryForMap(tms, sql);
		Double d = new Double(map.get("TOTALPRICE").toString());
		para.put("TOTALPRICE", map.get("TOTALPRICE"));
		para.put("QTJE", map.get("QTJE"));
		para.put("TOTALPRICECHINESE", TransChineseMoneyScriptlet.change(d));
	}

	@Override
	protected void printAfter(Map para) throws Exception {
		// TODO Auto-generated method stub
		String sql = "update wd_yfjskp_tab set QTJE=nvl('"+para.get("QTJE").toString()+"',QTJE),DYCS=DYCS+1 where jsno=JSNO?";
		execSQL(tms, sql, para);
	}

}
