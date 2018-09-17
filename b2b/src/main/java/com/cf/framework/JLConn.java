package com.cf.framework;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.cf.framework.aop.SpringContextHolder;

public class JLConn {
	
	@Autowired
    public JdbcTemplate tms;
	@Autowired
    public JdbcTemplate scm;
    
    public JdbcTemplate getJdbcTemplate(String ds) {
	  return (JdbcTemplate)SpringContextHolder.getApplicationContext().getBean(ds);
    }
 
}
