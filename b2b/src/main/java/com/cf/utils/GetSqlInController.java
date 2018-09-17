package com.cf.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;

@Controller
@RequestMapping("/sqlin")
public class GetSqlInController {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/spilt.do")
	public Map spilt(String XmlData) throws Exception{
		Map resultMap = new HashMap();	
		try {
			Map map =  FormTools.mapperToMap(XmlData);
			//String billno=(String) map.get("billno");
			List list = (List) map.get("billno");
			String parameter=(String) map.get("parameter");
			int count=(Integer) map.get("count");
			GetOracleSQLIn sqlin=new GetOracleSQLIn();
			String pjbillno=sqlin.getOracleSQLIn(list, count, parameter);
			resultMap.put("pjbillno", pjbillno);
		} catch (Exception e) {
			resultMap.put("pjbillno", e.getMessage());
			e.printStackTrace();
		}
		return resultMap;	
	}
}
