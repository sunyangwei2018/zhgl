package com.cf.scm.masterdata;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSON;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONStringer;

import org.aspectj.util.FileUtil;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.JLBill;
import com.cf.framework.dataset.DataSet;
import com.cf.framework.dataset.XmlDataSetWrapper;


@Controller
@RequestMapping("/MastData")
public class MastData extends JLBill {
	public static final int SP_Key_Size = 4;

	public static final String[] SPFL_Key = { "SPF_SPFL01", "SPFL02", "SPFL03" };
	public static final String[] PPB_Key = { "PPB02" };
	public static final String[] SP_Key = { "SPFL01", "PPB01", "GGB01", "SPXH01" };
	public static final String[] RY_Key = { "RYXX02", "SFZH", "SJHM" };

	String sMasterDataLX = "";
	String sErrMsg = "";
	Set<String> lSpxxKey = new HashSet<String>();

	List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
	Map<String, Object> resultMap = new HashMap<String, Object>();

	@RequestMapping("/insert.do")
	public Map<String, Object> insert(String XmlData) throws Exception {
		cds = new DataSet(XmlData);
		sMasterDataLX = cds.getField("MasterDataLX", 0);
		if (sMasterDataLX.equals("RYXX")) {
			String sFields = "select RYID?,PASS?,RYNAME?,XB?,CSRQ?,SZSF?,SZCS?,"
					+ "SZQX?,XXDZ?,SFZH?,SJ?,GZDH?,EMAIL?,QQ? from RYXX";
			Map<String, Object> mp = getRow(sFields, null, 0);
			JLMongo mongo = new JLMongo();
			mongo.insert("RYXX", mp);
		}
		return null;
	}

	@RequestMapping("/get.do")
	public Map<String, Object> get(String sLX, Map<String, Object> mp)
			throws Exception {
		// sMasterDataLX = mp.get("MasterDataLX").toString();
		// mp.remove("MasterDataLX");
		sMasterDataLX = sLX;
		JLMongo mongo = new JLMongo();
		
		if (sMasterDataLX.equals("SPXX")) {
			int ick = checkMasterData("SPXX", mp, SP_Key);
			if (ick == 1) {
				mongo.insert("SPXX", mp);
			} else if (ick == 2) {
				resultMap.clear();
			}
			resultMap.put("ErrMsg", sErrMsg);
			System.out.println(resultMap);
			return resultMap;
		} else if (sMasterDataLX.equals("SPFL")) {
			int ick = checkMasterData("SPFL", mp, SPFL_Key);
			if (ick == 1) {
				mongo.insert("SPFL", mp);
			} else if (ick == 2) {
				resultMap.clear();
			}
			resultMap.put("ErrMsg", sErrMsg);
			System.out.println(resultMap);
			return resultMap;
		} else if (sMasterDataLX.equals("PPB")) {
			int ick = checkMasterData("PPB", mp, PPB_Key);
			if (ick == 1) {
				mongo.insert("PPB", mp);
			} else if (ick == 2) {
				resultMap.clear();
			}
			resultMap.put("ErrMsg", sErrMsg);
			System.out.println(resultMap);
			return resultMap;
		}
		return null;
	}

	@RequestMapping("/select.do")
	public List<Map<String, Object>> select(String sLX, Map<String, Object> mp)
			throws Exception {
		// sMasterDataLX = mp.get("MasterDataLX").toString();
		// mp.remove("MasterDataLX");
		sMasterDataLX = sLX;
		// resultMap.putAll(mp);
		JLMongo mongo = new JLMongo();
		return mongo.select(sLX, mp, 1);
	}

	@RequestMapping("/selectXml.do")
	public Map<String, Object> selectXml(String XmlData) throws Exception {
		String configKey = "";
		
		Map<String, Object> mp = JSONObject.fromObject(XmlData);
		String sLX = mp.get("MastDataLX").toString();
		
		if (sLX.equals("PPB")) {
			configKey = "MasterData.Pub_PP";
		}if(sLX.equals("PPFLQX")){
			configKey = "MasterData.PubRoles_PPFL";
		}
		mp.remove("CompanyID");
		mp.remove("PI_USERNAME");
		mp.remove("MastDataLX");
		return result(new XmlDataSetWrapper(select(sLX, mp), configKey).convert());
	}

	protected Map<String, Object> result(final String sJLBH) {
		Map<String, Object> rst = new HashMap<String, Object>();
		rst.put("DJBH", sJLBH);
		return rst;
	}

	/*
	 * 根据关键字段判断，主数据中是否已有该数据记录
	 */
	private int checkMasterData(String sDMLX, Map<String, Object> mp,
			String[] sKeyList) throws Exception {
		Map<String, Object> tmpMap = new HashMap<String, Object>();
		Set<String> sKeys = mp.keySet();
		for (int i = 0; i < sKeyList.length; i++) {
			if (sKeys.contains(sKeyList[i])) {
				tmpMap.put(sKeyList[i], mp.get(sKeyList[i]));
			} else {
				sErrMsg = sErrMsg + "缺少关键字段【" + sKeyList[i] + "】;";
			}
		}
		if (sErrMsg.length() > 0) {
			return 2;
		}
		JLMongo mongo = new JLMongo();
		resultList = mongo.select(sDMLX, tmpMap, 1);
		if (resultList != null && resultList.size()>0) {
			resultMap = resultList.get(0);
			return 0;
		} else {
			return 1;
		}
	}

	public static void main(String[] args) throws Exception {
		System.out.println("Test Begin!");

		Map<String, Object> mp = new HashMap<String, Object>();
		Map<String, Object> resultMp = new HashMap<String, Object>();
		MastData jlmd = new MastData();
		System.out.println("------- insert -------");
		mp.clear();
		mp.put("SPNM", 5);
		mp.put("SPXX01", 5);
		mp.put("SPXX02", "000006");
		mp.put("SPXX03", "CSSP005");
		mp.put("SPXX04", "测试商品005号");
		mp.put("SPFL01", "0101");
		mp.put("PPB01", "000001");
		mp.put("GGB01", "000001");
		mp.put("SPXH", "IPHONE 6S");
		resultMp = jlmd.get("SPXX", mp);
		System.out.println(resultMp);

	}

}
