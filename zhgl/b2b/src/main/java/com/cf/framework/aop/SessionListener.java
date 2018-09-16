package com.cf.framework.aop;

import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class SessionListener implements HttpSessionListener {
	private Logger logger = LoggerFactory.getLogger(SessionListener.class);
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		// TODO Auto-generated method stub
		event.getSession().setMaxInactiveInterval(10*60);//秒10*60;
		logger.info("!!!!!!!!!!!!!!!!!!!!"+new Date(event.getSession().getCreationTime()));
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		// TODO Auto-generated method stub
		ServletContext application = event.getSession().getServletContext(); 
		logger.info("销毁session开始#######："+((Map)application.getAttribute("sessionUser")).toString()+"创建时间"+new Date(event.getSession().getCreationTime()));
		((Map)application.getAttribute("sessionUser")).remove(event.getSession().getAttribute("ip").toString());
		logger.info("销毁session结束#######："+((Map)application.getAttribute("sessionUser")).toString()+"销毁时间"+new Date(event.getSession().getLastAccessedTime()));
	}

}
