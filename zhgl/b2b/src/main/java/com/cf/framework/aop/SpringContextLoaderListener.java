package com.cf.framework.aop;

import javax.servlet.ServletContext;

import org.springframework.beans.BeanUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextException;
import org.springframework.util.ObjectUtils;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;

import com.cf.utils.PropertiesReader;

/**
 * 以静态变量保存Spring ApplicationContext, 可在任何代码任何地方任何时候中取出ApplicaitonContext.
 *
 */
public class SpringContextLoaderListener extends ContextLoaderListener{
	public static final String PROJECT = PropertiesReader.getInstance().getProperty("pubJson.PROJECT");
	
	protected WebApplicationContext createWebApplicationContext(ServletContext sc, ApplicationContext parent){
		Class contextClass = determineContextClass(sc);
	    if (!ConfigurableWebApplicationContext.class.isAssignableFrom(contextClass)) {
	    	throw new ApplicationContextException("Custom context class [" + contextClass.getName() + 
	    			"] is not of type [" + ConfigurableWebApplicationContext.class.getName() + "]");
	    }
	    ConfigurableWebApplicationContext wac = (ConfigurableWebApplicationContext)BeanUtils.instantiateClass(contextClass);

	    String idParam = sc.getInitParameter("contextId");
	    if (idParam != null) {
	    	wac.setId(idParam);
	    } else if ((sc.getMajorVersion() == 2) && (sc.getMinorVersion() < 5)) {
	    	wac.setId(ConfigurableWebApplicationContext.APPLICATION_CONTEXT_ID_PREFIX + 
	    			ObjectUtils.getDisplayString(sc.getServletContextName()));
	    } else {
	    	wac.setId(ConfigurableWebApplicationContext.APPLICATION_CONTEXT_ID_PREFIX + 
	    			ObjectUtils.getDisplayString(sc.getContextPath()));
	    }

	    wac.setParent(parent);
	    wac.setServletContext(sc);
	    String ConfigLocation = sc.getInitParameter("contextConfigLocation") + ",/WEB-INF/classes/bean-"+PROJECT+".xml";
	    wac.setConfigLocation(ConfigLocation);
	    customizeContext(sc, wac);
	    wac.refresh();
	    return wac;
	  }
}
