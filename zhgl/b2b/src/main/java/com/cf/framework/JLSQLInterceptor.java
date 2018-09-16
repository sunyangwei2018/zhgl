package com.cf.framework;

import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;







//import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.DefaultReflectorFactory;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.ReflectorFactory;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.factory.ObjectFactory;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory;
//import org.apache.ibatis.scripting.defaults.DefaultParameterHandler;
import org.apache.ibatis.session.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cf.forms.FormTools;
import com.cf.framework.aop.JlInterceptor;
import com.cf.utils.JLTools;


@Component
@Intercepts({ @Signature(method = "prepare", type = StatementHandler.class, args = { Connection.class }) })
public class JLSQLInterceptor implements Interceptor {

	private Logger logger = LoggerFactory.getLogger(JlInterceptor.class);
	private static final ObjectFactory DEFAULT_OBJECT_FACTORY = new DefaultObjectFactory();
	private static final ObjectWrapperFactory DEFAULT_OBJECT_WRAPPER_FACTORY = new DefaultObjectWrapperFactory();
	private static final ReflectorFactory DEFAULT_OBJECT_REFLECTOR_FACTORY = new DefaultReflectorFactory();
	private static String DEFAULT_PAGE_SQL_ID = ".*_Page$";//".*$"; // 需要拦截的ID(正则匹配)
	
	@SuppressWarnings("rawtypes")
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
		MetaObject metaStatementHandler = MetaObject.forObject(
				statementHandler, DEFAULT_OBJECT_FACTORY,
				DEFAULT_OBJECT_WRAPPER_FACTORY,DEFAULT_OBJECT_REFLECTOR_FACTORY);
		
		 RowBounds rowBounds = (RowBounds)
		 metaStatementHandler.getValue("delegate.rowBounds");
		// 分离代理对象链(由于目标类可能被多个拦截器拦截，从而形成多次代理，通过下面的两次循环可以分离出最原始的的目标类)
		while (metaStatementHandler.hasGetter("h")) {
			Object object = metaStatementHandler.getValue("h");
			metaStatementHandler = MetaObject.forObject(object,
					DEFAULT_OBJECT_FACTORY, DEFAULT_OBJECT_WRAPPER_FACTORY,DEFAULT_OBJECT_REFLECTOR_FACTORY);
		}
		// 分离最后一个代理对象的目标类
		while (metaStatementHandler.hasGetter("target")) {
			Object object = metaStatementHandler.getValue("target");
			metaStatementHandler = MetaObject.forObject(object,
					DEFAULT_OBJECT_FACTORY, DEFAULT_OBJECT_WRAPPER_FACTORY,DEFAULT_OBJECT_REFLECTOR_FACTORY);
		}
		// property在mybatis settings文件内配置
		Configuration configuration = (Configuration) metaStatementHandler
				.getValue("delegate.configuration");

		// 设置pageSqlId
		Object x = configuration.getVariables();
		String pageSqlId = configuration.getVariables().getProperty("pageSqlId");
		 if (null == pageSqlId || "".equals(pageSqlId)) {
		 logger.warn("Property pageSqlId is not setted,use default '.*_Page$' ");
		 pageSqlId = DEFAULT_PAGE_SQL_ID;
		 }

		MappedStatement mappedStatement = (MappedStatement) metaStatementHandler
				.getValue("delegate.mappedStatement");
		// 只重写需要分页的sql语句。通过MappedStatement的ID匹配，默认重写以Page结尾的MappedStatement的sql
		 if (mappedStatement.getId().matches(pageSqlId)) {
		BoundSql boundSql = (BoundSql) metaStatementHandler
				.getValue("delegate.boundSql");
		Object parameterObject = boundSql.getParameterObject();
		String sql = boundSql.getSql();
		 if (parameterObject == null) {
		 throw new NullPointerException("parameterObject is null!");
		 } else {
			 	int start = new Integer(((Map)parameterObject).get("currentPage").toString());
			 	int length = new Integer(((Map)parameterObject).get("pageSize").toString());
			 	sql = sql.replaceFirst("SELECT", "SELECT ROWNUM RN,");//sql.replace("from", ",ROWNUM RN from");
			 	sql = sql.replaceFirst("select", "SELECT ROWNUM RN,");
				// 重写sql
				String pageSql = "select * from ("+sql + ")temp  where RN >"+(start-1)*length+" and RN <=  " + start*length;
				rowBounds.getLimit();
				metaStatementHandler.setValue("delegate.boundSql.sql", pageSql);
	
		
		// 采用物理分页后，就不需要mybatis的内存分页了，所以重置下面的两个参数
		// metaStatementHandler.setValue("delegate.rowBounds.offset",
		// RowBounds.NO_ROW_OFFSET);
		// metaStatementHandler.setValue("delegate.rowBounds.limit",
		// RowBounds.NO_ROW_LIMIT);
		 }
		/*String SqlId = ((Map)parameterObject).get("sqlid").toString();
		String sCZYID = ((Map)parameterObject).get("PI_USERNAME").toString();
		String sGSID;
		try{
			sGSID = ((Map)parameterObject).get("CompanyID").toString();
		}catch(Exception e){
			sGSID = sCZYID.substring(0,4);
		}

		String sPPSPFLQX;
		try {
			sPPSPFLQX = ((Map)parameterObject).get("bPPSPFLQX").toString();
		} catch (Exception e) {
			sPPSPFLQX = "1";
		}
		if ("1".equals(sPPSPFLQX)) {
			qxAide qxaide = new qxAide();
			sql = qxaide.setQXSql(sql, SqlId, sCZYID, sGSID); // 添加权限字串
		}
		System.out.println(sql);
		metaStatementHandler.setValue("delegate.boundSql.sql", sql);*/
		}
		// 将执行权交给下一个拦截器
		return invocation.proceed();
	}

	@Override
	public Object plugin(Object target) {
		// 当目标类是StatementHandler类型时，才包装目标类，否者直接返回目标本身,减少目标被代理的次数
		if (target instanceof StatementHandler) {
			return Plugin.wrap(target, this);
		} else {
			return target;
		}
	}

	@Override
	public void setProperties(Properties properties) {
		// To change body of implemented methods use File | Settings | File
		// Templates.
	}
	
	/*private String buildSql(String sql,Object page) {
		if (page != null) {  
            StringBuilder pageSql = new StringBuilder();  
            if ("mysql".equals(dialect)) {  
                pageSql = buildPageSqlForMysql(sql, page);  
            } else if ("oracle".equals(dialect)) {  
                pageSql = buildPageSqlForOracle(sql, page);  
            } else {  
                return sql;  
            }  
            return pageSql.toString();  
        } else {  
            return sql;  
        }  
	}*/
	
    /*private String buildPageSql(String sql, PageParameter page) {  
        if (page != null) {  
            StringBuilder pageSql = new StringBuilder();  
            if ("mysql".equals("dialect")) {  
                pageSql = buildPageSqlForMysql(sql, page);  
            } else if ("oracle".equals("dialect")) {  
                pageSql = buildPageSqlForOracle(sql, page);  
            } else {  
                return sql;  
            }  
            return pageSql.toString();  
        } else {  
            return sql;  
        }  
    }  
    
    public StringBuilder buildPageSqlForMysql(String sql, PageParameter page) {  
        StringBuilder pageSql = new StringBuilder(100);  
        String beginrow = String.valueOf((page.getCurrentPage() - 1) * page.getPageSize());  
        pageSql.append(sql);  
        pageSql.append(" limit " + beginrow + "," + page.getPageSize());  
        return pageSql;  
    }  */
}
