package com.cf.scm.masterdata;

import java.util.HashMap;
import java.util.Map;

import com.cf.utils.PropertiesReader;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.MongoClient;

public class MongodbHandler {
	static final PropertiesReader config = PropertiesReader.getInstance();
	static MongoClient mongoClient = null;
	static DB db = null;
	
	static MongoClient getClient() {
		
		if(mongoClient==null)
			try{
				//mongoClient = new MongoClient(JlAppResources.getProperty("MONGO_IP"),
				//		Integer.parseInt(JlAppResources.getProperty("MONGO_PORT")));
				mongoClient = new MongoClient(config.getProperty("MONGO_IP"),
						Integer.parseInt(config.getProperty("MONGO_PORT")));
				
				//mongoClient = new MongoClient("119.79.224.116", 27017);
			}catch(Exception e){
				e.printStackTrace();
			}
		return mongoClient;
	}

	static MongoClient getClient(String sIP, int iPort) {
		
		if(mongoClient==null)
			try{
				mongoClient = new MongoClient(sIP, iPort);
				//mongoClient = new MongoClient("119.79.224.116", 27017);
			}catch(Exception e){
				e.printStackTrace();
			}
		return mongoClient;
	}
	
	public static DB getDB() {
		//return getClient().getDB(JlAppResources.getProperty("MONGO_DB"));
		return getClient().getDB(config.getProperty("MONGO_DB"));
	}
	
	public static DB getDB(String name) {
		return getClient().getDB(name);
	}
	
	public static Map<String, Object> getStrCondition(String str1){
		Map<String, Object> temp = new HashMap<String, Object>();
		temp.put("$regex", str1+".*");
		return temp;
	}
	
	public static void prepareCondition(BasicDBObject queryMap, Map<String, Object> mp){
		Object[] sKeys = mp.keySet().toArray();
		String sKey = "";
		Object oValue = null;
        for (int i=0;i<sKeys.length;i++){
        	sKey = sKeys[i].toString();
        	oValue = mp.get(sKey);
        	if ("java.lang.String".equals(oValue.getClass().getName())){
        		queryMap.put(sKey, getStrCondition(oValue.toString()));
        	}else{
        		queryMap.put(sKey, oValue);
        	}
        }        	
	}

	
}
