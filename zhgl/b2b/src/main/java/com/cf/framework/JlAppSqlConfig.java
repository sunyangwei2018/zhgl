											  package com.cf.framework;

import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;

public class JlAppSqlConfig {

    private static Logger logger = LoggerFactory.getLogger(JlAppSqlConfig.class);
    private static final HashMap DATA_SOURCES = new HashMap();

    public static void initMybatis() {

        InputStream inputStream = null;
        SqlSessionFactory sqlSessionFactory = null;
        SqlSession session = null;

        try {
            inputStream = Resources.getResourceAsStream("select-config-tms.xml");
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
            //session = sqlSessionFactory.openSession();
            DATA_SOURCES.put("tms", sqlSessionFactory);
            
            inputStream = Resources.getResourceAsStream("select-config-scm.xml");
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
            DATA_SOURCES.put("scm", sqlSessionFactory);
            
            inputStream.close();

            logger.info("加载数据源列表initMybatis：{}",DATA_SOURCES.keySet());
            //LogFactory.useSlf4jLogging();
        } catch (Exception ex) {
            logger.error("initMybatis err", ex);
        }
    }

    public static SqlSession getSqlMapInstance(String dataSourceName) {
    	SqlSessionFactory factory = null;
    	factory = (SqlSessionFactory) DATA_SOURCES.get(dataSourceName);
    	if (factory == null) {
    		InputStream is = null;
    		try {
	    		is = Resources.getResourceAsStream("select-config-" + dataSourceName + ".xml");
	    		if (is != null) {
	    			factory = new SqlSessionFactoryBuilder().build(is);
	    			DATA_SOURCES.put(dataSourceName, factory);
	    			is.close();
	    		}
	    	} catch (Exception ex) {
	            logger.error("The Mybatis Resource Stream Init Error", ex);
	        }
    	}
    	SqlSession session = null;
    	if (factory != null) {
    		session = factory.openSession();
    	}
        return session;
    }

    public static SqlSession getTMSSqlMapInstance() {
        return ((SqlSessionFactory) DATA_SOURCES.get("tms")).openSession();
    }

    public static SqlSession getSHSqlMapInstance() {
        return ((SqlSessionFactory) DATA_SOURCES.get("sh")).openSession();
    }

    public static SqlSession getVIPSqlMapInstance() {
        return ((SqlSessionFactory) DATA_SOURCES.get("vip")).openSession();
    }
    
    public static SqlSession getWorkflowSqlMapInstance() {
        return ((SqlSessionFactory) DATA_SOURCES.get("WORKFLOW")).openSession();
    }

}
