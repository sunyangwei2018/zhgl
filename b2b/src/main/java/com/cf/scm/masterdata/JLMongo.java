package com.cf.scm.masterdata;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.JLBill;
import com.cf.framework.dataset.DataSet;
import com.cf.framework.dataset.IDataSet;
import com.cf.framework.dataset.XmlDataSetWrapper;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;

@Controller
@RequestMapping("/JLMongo")
public class JLMongo extends JLBill {

	@SuppressWarnings("unchecked")
	@RequestMapping("/getOne.do")
	public Map<String, Object> getOne(String sDMLX, Map<String, Object> mp) {
		DBCollection dbCollection = MongodbHandler.getDB().getCollection(sDMLX);
		BasicDBObject query = new BasicDBObject();
		query.putAll(mp);
		DBObject record = dbCollection.findOne(query);
		if (record != null) {
			return record.toMap();
		} else {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping("/select.do")
	public List<Map<String, Object>> select(String sDMLX,
			Map<String, Object> mp, int lx) {
		DBCollection dbCollection = MongodbHandler.getDB().getCollection(sDMLX);
		BasicDBObject query = new BasicDBObject();
		if (lx == 0) {
			MongodbHandler.prepareCondition(query, mp);
		} else {
			query.putAll(mp);
		}
		DBCursor cur = dbCollection.find(query);
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		while (cur.hasNext()) {
			list.add(cur.next().toMap());
		}
		return list;
		/*
		 * if (list.size()>0){ return list; }else{ return null; }
		 */
	}

	@RequestMapping("/selectXml.do")
	public Map<String, Object> selectXml(String Xmldata) throws Exception {
		String configKey = "";
		cds = new DataSet(Xmldata);
		String sLX = cds.getField("MastDataLX", 0);
		Map<String, Object> mp = new HashMap<String, Object>();
		mp.putAll(cds.getRows(null)[0]);
		if (sLX == "PPB") {
			configKey = "MasterData.Pub_PP";
		}
		return result(new XmlDataSetWrapper(select(sLX, mp, 1), configKey)
				.convert());
	}

	@RequestMapping("/insert.do")
	public void insert(String sDMLX, Map<String, Object> mp) {
		DBCollection dbCollection = MongodbHandler.getDB().getCollection(sDMLX);
		BasicDBObject record = new BasicDBObject();
		record.putAll(mp);
		dbCollection.insert(record);
	}

	@RequestMapping("/update.do")
	public void update(String sDMLX, Map<String, Object> mpKey,
			Map<String, Object> mp) {
		DBCollection dbCollection = MongodbHandler.getDB().getCollection(sDMLX);
		BasicDBObject query = new BasicDBObject();
		query.putAll(mpKey);
		BasicDBObject record = new BasicDBObject();
		record.putAll(mp);
		if (query != null) {
			WriteResult wr = dbCollection.update(query, record);
			System.out.println(wr);
		} else {
			dbCollection.insert(record);
		}
	}
	
	@RequestMapping("/update_insert.do")
	public void update_insert(String sDMLX, Map<String, Object> mpKey,
			Map<String, Object> mp) {
		DBCollection dbCollection = MongodbHandler.getDB().getCollection(sDMLX);
		BasicDBObject query = new BasicDBObject();
		query.putAll(mpKey);
		BasicDBObject record = new BasicDBObject();
		record.putAll(mp);
		WriteResult wr = dbCollection.update(query, record,true,false);
		System.out.println(wr);
	}

	@RequestMapping("/delete.do")
	public void delete(String sDMLX, Map<String, Object> mp) {
		DBCollection dbCollection = MongodbHandler.getDB().getCollection(sDMLX);
		BasicDBObject query = new BasicDBObject();
		query.putAll(mp);
		if (query != null) {
			WriteResult wr = dbCollection.remove(query);
			System.out.println(wr);
		}
	}

	@RequestMapping("/insertFromCds.do")
	public void insertFromCds(String sDMLX, IDataSet cds1, String sFieldList,
			int irowNo) throws Exception {
		String[] sField = sFieldList.split(",");
		DBCollection dbCollection = MongodbHandler.getDB().getCollection(sDMLX);
		BasicDBObject record = new BasicDBObject();
		for (int i = 0; i < sField.length; i++) {
			record.put(sField[i], cds1.getField(sField[i], irowNo));
		}
		if (record != null) {
			WriteResult wr = dbCollection.insert(record);
			System.out.println(wr);
		}
	}

	@RequestMapping("/updateFromCds.do")
	public void updateFromCds(String sDMLX, IDataSet cds1, String sKeyList,
			String sFieldList, int irowNo) throws Exception {
		String[] sKey = sKeyList.split(",");
		String[] sField = sFieldList.split(",");

		DBCollection dbCollection = MongodbHandler.getDB().getCollection(sDMLX);
		BasicDBObject query = new BasicDBObject();
		for (int i = 0; i < sKey.length; i++) {
			query.put(sKey[i], cds1.getField(sKey[i], irowNo));
		}
		BasicDBObject record = new BasicDBObject();
		for (int i = 0; i < sField.length; i++) {
			record.put(sField[i], cds1.getField(sField[i], irowNo));
		}
		if (query != null) {
			WriteResult wr = dbCollection.update(query, record);
			System.out.println(wr);
		} else {
			dbCollection.insert(record);
		}
	}

	protected Map<String, Object> result(final String sJLBH) {
		Map<String, Object> rst = new HashMap<String, Object>();
		rst.put("DJBH", sJLBH);
		return rst;
	}

	public static void main(String[] args) {
		Map<String, Object> mp = new HashMap<String, Object>();
		Map<String, Object> mpKey = new HashMap<String, Object>();
		JLMongo jlm = new JLMongo();

		System.out.println("------- getOne -------");
		mp.put("SPXX01", 3);
		Map<String, Object> s = jlm.getOne("SPXX", mp);
		System.out.println(s);

		System.out.println("------- select -------");
		mp.clear();
		mp.put("SPXX01", 3);
		List<Map<String, Object>> l = jlm.select("SPXX", mp, 0);
		System.out.println(l);

		System.out.println("------- update -------");
		mp.clear();
		mp.put("SPNM", 3);
		mp.put("SPXX01", 3);
		mp.put("SPXX02", "000003");
		mp.put("SPXX04", "测试商品003号");
		mp.put("SPXX03", "CSSP12345678");
		mp.put("SPXX08", 0.17);

		mpKey.put("_id", "54d47090a89c945a1b4ed4da");
		jlm.update("SPXX", mpKey, mp);
		mp.clear();
		l = jlm.select("SPXX", mp, 0);
		System.out.println(l);

	}

}
