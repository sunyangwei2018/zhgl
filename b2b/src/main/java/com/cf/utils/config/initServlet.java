package com.cf.utils.config;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import com.cf.forms.User;
import com.cf.framework.JlAppSqlConfig;
import com.cf.utils.PropertiesReader;

public class initServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        try {
            new JKConfig().init();
            JlAppSqlConfig.initMybatis();
            PropertiesReader.getInstance();
            User.getConfig();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
