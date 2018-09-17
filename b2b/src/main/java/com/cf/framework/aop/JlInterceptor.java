package com.cf.framework.aop;

import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.cf.forms.FormTools;
import com.cf.framework.JLBill;
import com.cf.framework.SaveErrorLog;
import com.mongodb.DBCollection;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
public class JlInterceptor extends JLBill implements HandlerInterceptor {
	private Logger logger = LoggerFactory.getLogger(JlInterceptor.class);
    @Autowired
    private SaveErrorLog saveErrorLog;
    private static final int DEFAULT_BUFFER_SIZE = 1024 * 8;
    
	public static void copyLarge(InputStream input, OutputStream output)
			throws IOException {
		byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
		int n = 0;
		while (-1 != (n = input.read(buffer))) {
			output.write(buffer, 0, n);
		}
	}

	public static byte[] toByteArray(InputStream input) throws IOException {
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		copyLarge(input, output);
		output.close();
		input.close();
		return output.toByteArray();
	}
	
	private static String getRemoteHost(javax.servlet.http.HttpServletRequest request){
		String ip = request.getHeader("x-forwarded-for");
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
			ip = request.getHeader("Proxy-Client-IP");
		}
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
			ip = request.getRemoteAddr();
		}
		return ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;
	}
	
    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {
    	request.setCharacterEncoding("UTF-8");
        String m =request.getMethod();
    	String json = request.getParameter("json");
    	if(json==null) {
			DataInputStream dis = new DataInputStream(request.getInputStream());
			json = new String(toByteArray(dis), "UTF-8");
			request.setAttribute("json", json);
		}
	
        response.setContentType("text/html; charset=utf-8");
        response.setCharacterEncoding("utf-8");
        // 增加对非查询类XML数据的Schema校验(XSD)uri
        Validator.validateExternalSchema(request);
        String uri = request.getRequestURI();
        logger.info("REST Request-[HTTP METHOD:{}] "
        		+ "[PATH INFO:{}] "
        		+ "[CONTENTTYPE INFO:{}] "
        		+ "[REQUEST PARAMETERS:{}] "
        		+ "[REMOTE ADDRESS:{}]"
        		+ "[REMOTE URI:{}]", 
        		request.getMethod(),uri,request.getContentType(),json,request.getRemoteAddr(),uri);
        Boolean needLogin = true;
        if(uri.indexOf("/user/") != -1 || uri.indexOf("/InstantTradePay/") != -1 || uri.indexOf("/queryPROV.do") != -1 || uri.indexOf("/queryCITY.do")!=-1
        		|| uri.indexOf("/khgs/")!=-1 || uri.indexOf("/jlquery/select.do")!=-1){
        	needLogin = false;
        	logger.info("uri拦截不校验session");
        }
    	if(getRemoteHost(request).equals("127.0.0.1")){
    		needLogin = false;
    	} 
    	if(request.getParameter("isLogin")!=null && request.getParameter("isLogin").equals("true")){
    		needLogin = false;
    	} 
        
        if(needLogin && request.getSession().getAttribute("isLogin") == null){
        	PrintWriter pw = response.getWriter();
			pw.print("Exception: 未登录");
			pw.flush();	
			pw.close();
			return false;
        }
        //调用公用方法测试
        Boolean b = true;//jlPIManage.checkWorkflow(request, response);
        return b;
    }

    @SuppressWarnings("rawtypes")
	@Override
    public void postHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        //当前请求进行处理之后，也就是Controller 方法调用之后，DispatcherServlet 进行视图返回渲染之前被调用

        Map map = new HashMap();
        String viewName = "";
        if(modelAndView!=null){
        	map = modelAndView.getModel();
        	viewName = modelAndView.getViewName();
        	//if(map.isEmpty()){
        	//	modelAndView.addObject(viewName);
        	//} 
        	
        	//穿透业务系统syw_2016.2.19
        	//jlPIManage.sendPIResult(request, response, map);
        	String uri = request.getRequestURI();
        	if ((uri.indexOf("/jlquery/") != -1)
        			|| (uri.indexOf("/getJson/") != -1)
        			|| (uri.indexOf("/fileserver/") != -1)) {
        		if (uri.indexOf("/jlquery/") != -1) {
        			// 处理 Repuest 对象传入的查询结果集的字段过滤列表 syw_add
        			String[] fields = null;
        			String param = request.getParameter("fields");
        			if (null != param && !"".equals(param)) {
        				fields = param.split(",");
        			}
        			query(response, map, fields);
        		} else if (uri.indexOf("/getJson/") != -1) {
        			// 注意map对象封装的内容不要太多，否则容易导致JVM内存溢出错误
        			printMapJsonString(response, map);
        		} else if (uri.indexOf("/fileserver/") != -1) {
        			if (map.containsKey("linkedCaseInsensitiveMapList")) {
        				List list = (List) map.get("linkedCaseInsensitiveMapList");
        				printListMapJsonString(response, list);
        			} else {
        				printMapJsonString(response, map);
        			}
        		}
        		modelAndView.setViewName("JlNullView");
        	} else {
        		viewName = modelAndView.getViewName();
        		if (viewName.indexOf("\"forword\":") == -1) {
        			modelAndView.setViewName("JlView");
        		} else {
        			modelAndView.setViewName("a");//get forword value from json
        		}
        	}
        }
        logger.info("[RESPONSE:{}]",map.toString());
    }

    private void printMapJsonString(HttpServletResponse response, Map map) throws Exception {
        PrintWriter pw = response.getWriter();
        try {
            pw.print(JSONObject.fromObject(map));
            pw.close();
        } catch (Exception ex) {
            pw.print("Exception: " + ex);
            pw.close();
        }
    }

    private void printListMapJsonString(HttpServletResponse response, List list) throws Exception {
        PrintWriter pw = response.getWriter();
        try {
            pw.print(JSONArray.fromObject(list));
            pw.close();
        } catch (Exception ex) {
            pw.print("Exception: " + ex);
            pw.close();
        }
    }

    private void query(HttpServletResponse response, Map map,String[] fields) throws Exception {
        PrintWriter pw = response.getWriter();
        JlResultHandler resultHandler = null;
        boolean isJson = ("Json").equals((String) map.get("dataType"))? true: false;
        if (("Report").equals((String) map.get("QryType"))) {
            resultHandler = new ReportResultHandler(pw, (String) map.get("sqlid"), isJson , fields);
            //syw_add => 自定义分页条数
            if(!FormTools.isNull(map.get("pageSize"))&&new Integer(map.get("pageSize").toString())>0){
            	 resultHandler.setPagesize(new Integer(map.get("pageSize").toString()));
            }
           
        }else {
            resultHandler = new BillResultHandler(pw, (String) map.get("sqlid"), isJson , fields);
        }
        SqlSession session = null;
        DBCollection dbCollection = null;
    	try {
    		if (("Report").equals((String) map.get("QryType"))) {
                session = (SqlSession) map.get("session");
                logger.info(map.toString()+" "+map.get("sqlid"));
                session.select((String) map.get("sqlid"), map, resultHandler);
            }else{
            	session = (SqlSession) map.get("session");
            	logger.info(map.toString()+" "+map.get("sqlid"));
                session.select((String) map.get("sqlid"), map, resultHandler);
            }
    		resultHandler.Post();
    	} catch (Exception e) {
    		e.printStackTrace();
            pw.write(e.getMessage());
    	} finally {
    		if(session != null){
    			session.close();
    		}
    		pw.flush();	
    		pw.close();
    	}     
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
    	
		// 当有异常错误时，记录错误异常
		if (ex != null) {
			//saveErrorLog.saveErrorLog(request, response, ex);
			//在DispatcherServlet 渲染了对应的视图之后执行
			PrintWriter pw = response.getWriter();
			pw.print("Exception: " + ex);
			pw.flush();	
			pw.close();
			logger.error("After completion handle:"+ex);
		}
    }
    
    @Autowired
	public void setSaveErrorLog(SaveErrorLog saveErrorLog) {
		this.saveErrorLog = saveErrorLog;
	}

    public static boolean isQueryURI(HttpServletRequest request) {

        boolean result = false;
        String uri = request.getRequestURI();
        if (-1 != uri.indexOf("/jlquery/")
                || -1 != uri.indexOf("/getJson/")
                || -1 != uri.indexOf("/fileserver/")) {
            result = true;
        }
        return result;
    }
}
