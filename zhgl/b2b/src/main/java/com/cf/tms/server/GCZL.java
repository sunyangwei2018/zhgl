package com.cf.tms.server;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.poi.ss.usermodel.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.tags.form.FormTag;

import com.cf.forms.FormTools;
import com.cf.framework.FinalValue;
import com.cf.framework.JLBill;
import com.cf.tms.entity.WfRes;
import com.cf.utils.JLTools;
import com.cf.utils.PubFun;
import com.cf.workflow.entity.ActivitiProcessInstance;
import com.cf.workflow.entity.ActivitiTask;
import com.cf.workflow.entity.HistoricTaskObject;
import com.cf.workflow.entity.WorkflowRequest;
import com.cf.workflow.exception.WorkflowInfoMissException;
import com.cf.workflow.interfaces.WorkflowServiceInter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.ibm.icu.text.SimpleDateFormat;
import com.mysema.query.jpa.impl.JPAQuery;



@Controller
@RequestMapping("/gczl")
public class GCZL extends JLBill{
	
	private Logger logger = LoggerFactory.getLogger(GCZL.class);
	
	private final String PROCESS_DEFINITION_KEY = "gczlAproveProcess";
	
	private final String[] REQUEIRED_FILE_TYPE = new String[]{"1","2","3","4","5"};
	
	private final static Map REQUEIRED_FILE_TYPE_Map;
	
	static{
		REQUEIRED_FILE_TYPE_Map = new HashMap<>();
		REQUEIRED_FILE_TYPE_Map.put("1", "表一");
		REQUEIRED_FILE_TYPE_Map.put("2", "表二");
		REQUEIRED_FILE_TYPE_Map.put("3", "合同");
		REQUEIRED_FILE_TYPE_Map.put("4", "发票");
		REQUEIRED_FILE_TYPE_Map.put("5", "条码");
		REQUEIRED_FILE_TYPE_Map.put("6", "照片");
		REQUEIRED_FILE_TYPE_Map.put("7", "证明");
	}
	
	@Autowired
	private WorkflowServiceInter workflowServiceInter;
	
	public boolean checkGczlExist(String gcbh) throws Exception{
		String sql = "select count(1) from gczl where GC_ID='"+gcbh+"'";
		int count =queryForInt(tms, sql);
		if(count>0){
			return true;
		}
		return false;
	}
	
	@Transactional("tms")
	@RequestMapping("/gczlStart")
	public Map gczlFlow(String json,HttpServletRequest request) throws Exception{
		String code = FormTools.getrandomUUID();
		logger.info("code[{}]工程资料提交,入口参数{}",code,json);
		Map resultMap = Maps.newHashMap(); 
		Map row = FormTools.mapperToMap(json);
		if(Strings.isNullOrEmpty(row.get("GC_ID").toString())){
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "工程编号必填项");
			return resultMap;
		}
		try {
			if(checkGczlExist(row.get("GC_ID").toString())){
				resultMap.put("respCode", "000001");
				resultMap.put("respMsg", "工程编号已存在");
				return resultMap;
			}
			String dqSql = "select d.DQXX02 from khgs t,DQ d where t.dq = d.dqxx01 and t.khgsid='"+row.get("KHGSID").toString()+"'";
			Map dqMap = queryForMap(tms, dqSql);
			if(FormTools.isNull(dqMap)||FormTools.isNull(dqMap.get("DQXX02"))){
				resultMap.put("respCode", "000001");
				resultMap.put("respMsg", "地区获取失败");
				logger.info("code[{}]工程资料提交,地区获取失败",code);
				return resultMap;
			}
			String dqxx02 = dqMap.get("DQXX02").toString();
			logger.info("code");
			long id = PubFun.updateGCZLID(row.get("GSID").toString(),row.get("KHGSID").toString(), tms);
			String sql ="insert into gczl(GCZLID,GSID,KHGSID,SAVE_DATE,SAVE_USERID,SAVE_USERNAME,"
					+ "GC_ID,GC_NAME,STORES_ID,STORES_NAME,SELLER_ID,SELLER_NAME,CUSTOMER_NAME,CUSTOMER_LXR,"
					+ "CUSTOMER_TEL,CUSTOMER_PHONE_AREACODE,CUSTOMER_PHONE,CUSTOMER_ADDRESS,CUSTOMER_POSTCODE,"
					+ "BUY_DATE,INSTALL_DATE,SELL_TYPE,SELL_ONE,SELL_TWO,YEAR,BUY_NUMBER,DQXX02,SJKHGSID,SJKHGSNAME) values("
					+ "'"+id+"',GSID?,KHGSID?,sysdate,userId?,SELLER_NAME?,GC_ID?,GC_NAME?,"
					+ "STORES_ID?,STORES_NAME?,SELLER_ID?,SELLER_NAME?,CUSTOMER_NAME?,CUSTOMER_LXR?,"
					+ "CUSTOMER_TEL?,CUSTOMER_PHONE_AREACODE?,CUSTOMER_PHONE?,CUSTOMER_ADDRESS?,CUSTOMER_POSTCODE?,"
					+ "to_date(BUY_DATE?,'yyyy-MM-dd hh24:mi:ss'),to_date(INSTALL_DATE?,'yyyy-MM-dd'),SELL_TYPE?,SELL_ONE?,SELL_TWO?,YEAR?,BUY_NUMBER?,'"+dqxx02+"',SJKHGSID?,SJKHGSNAME?)";
			int i = execSQL(tms, sql, row);
			
			logger.info("code[{}]工程资料提交,查询工程资料开始",code);
				   sql ="select 外机条码 SPWJ_TM,机型 SPWJ_ID,机型描述 SPWJ_NAME,内机条码1 SPNJ_TM,内机型 SPNJ_ID,"
				   		+ "内机型描述  SPNJ_NAME,联系人 CUSTOMER_LXR,移动电话 CUSTOMER_TEL,用户地址 CUSTOMER_ADDRESS from tbsqlinst where 工程编号='"+row.get("GC_ID").toString()+"'";
		    List<Map> list = queryForList(scm, sql);
		    logger.info("code[{}]工程资料提交,查询工程资料结束",code);
		    
		    logger.info("code[{}]工程资料提交,插入gczlitem开始",code);
		    for(Map item : list){
		    	 sql = "insert into gczlitem name(GCZLID,SPWJ_TM,SPWJ_ID,SPWJ_NAME,SPNJ_TM,SPNJ_ID,SPNJ_NAME,"
					   		+ "CUSTOMER_LXR,CUSTOMER_TEL,CUSTOMER_ADDRESS)"
					   		+ "VALUES('"+id+"',SPWJ_TM?,SPWJ_ID?,SPWJ_NAME?,SPNJ_TM?,SPNJ_ID?,SPNJ_NAME?,"
					   		+ "CUSTOMER_LXR?,CUSTOMER_TEL?,CUSTOMER_ADDRESS?)";
		    	int j = execSQL(tms, sql, item);
		    }
		    logger.info("code[{}]工程资料提交,插入gczlitem结束",code);
		    
			WorkflowRequest wfReq= new WorkflowRequest();
			wfReq.setProcessDefinitionKey(PROCESS_DEFINITION_KEY);
			wfReq.setBusinessKey(String.valueOf(id));
			wfReq.setBizStartDate(new Date());
			Map<String,String> userInfo = (Map<String,String>) request.getSession().getAttribute("userInfo");
			Map<String,Object> variables = Maps.newHashMap();
			variables = (Map<String, Object>) row.get("variables"); //参数
			variables.put("bizDqxx02",dqxx02);
			variables.put("khgsid", userInfo.get("KHGSID").toString());
			variables.put("bizUser", userInfo.get("USERID").toString());
			if(!FormTools.isNull(userInfo.get("SJKHGSID"))){
				variables.put("gsid",userInfo.get("SJKHGSID").toString());
			}
			wfReq.setVariables(variables);
			/*TODO:
			 * Map gczl = getGczl(String.valueOf(id));
			Map<String, Object> vars = (Map<String, Object>) row.get("variables"); //参数
			vars.put("bizDqxx02",dqxx02);
			vars.put("bizSaveDate",DateUtils.parseDate(gczl.get("SAVE_DATE").toString(), new String[]{"yyyy-MM-dd hh24:mi:ss"}));
			wfReq.setVariables(vars);*/
			//启动流程
			ActivitiProcessInstance info =workflowServiceInter.startProcessInstanceByKey(wfReq);
			sql = "update gczl set PROCESS_INSTANCE_ID='"+info.getProcessInstanceId()+"' where GCZLID='"+wfReq.getBusinessKey()+"'";
			int j=execSQL(tms, sql, row);
			resultMap.put("respCode", "000000");
			resultMap.put("respMsg", "添加成功");
			return resultMap;
		}catch(Exception e){
			throw new Exception("启动流程失败");
		}
	}
	
	@Transactional("tms")
	@RequestMapping("/updateGczl")
	public Map updateGczl(String json) throws Exception{
		logger.info("工程资料提交{}",json);
		Map resultMap = Maps.newHashMap(); 
		Map row = FormTools.mapperToMap(json);
		if(Strings.isNullOrEmpty(row.get("GC_ID").toString())){
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "工程编号必填项");
			return resultMap;
		}
		try {
			String sql = "update gczl set GC_NAME=GC_NAME?,CUSTOMER_NAME=CUSTOMER_NAME?,INSTALL_DATE=to_date(INSTALL_DATE?,'yyyy-MM-dd'),CUSTOMER_LXR=CUSTOMER_LXR?,"
					+ "CUSTOMER_TEL=CUSTOMER_TEL?,CUSTOMER_PHONE_AREACODE=CUSTOMER_PHONE_AREACODE?,"
					+ "CUSTOMER_PHONE=CUSTOMER_PHONE?,CUSTOMER_ADDRESS=CUSTOMER_ADDRESS?,"
					+ "CUSTOMER_POSTCODE=CUSTOMER_POSTCODE? where GCZLID=GCZLID? and GSID=GSID?";
			int i = execSQL(tms, sql, row);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "保存草稿失败");
			return resultMap;
		}
		resultMap.put("respCode", "000000");
		resultMap.put("respMsg", "保存草稿成功");
		return resultMap;
	}
	
	/**
	 * 工程资料提交
	 * @param json
	 * @return
	 * @throws Exception
	 */
	@Transactional("tms")
	@RequestMapping("/addGczl.do")
	public Map addGczl(String json,HttpServletRequest request)throws Exception{
		logger.info("工程资料提交{}",json);
		Map resultMap = Maps.newHashMap(); 
		Map row = FormTools.mapperToMap(json);
		if(Strings.isNullOrEmpty(row.get("GC_ID").toString())){
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "工程编号必填项");
			return resultMap;
		}
		try {
			if(checkGczlExist(row.get("GC_ID").toString())){
				resultMap.put("respCode", "000001");
				resultMap.put("respMsg", "工程编号已存在");
				return resultMap;
			}
			String dqSql = "select d.DQXX02 from khgs t,DQ d where t.dq = d.dqxx01 and t.khgsid='"+row.get("KHGSID").toString()+"'";
			Map dqMap = queryForMap(tms, dqSql);
			if(FormTools.isNull(dqMap)||FormTools.isNull(dqMap.get("DQXX02"))){
				resultMap.put("respCode", "000001");
				resultMap.put("respMsg", "地区获取失败");
				logger.info("code[{}]工程资料提交,地区获取失败");
				return resultMap;
			}
			String dqxx02 = dqMap.get("DQXX02").toString();
			long id = PubFun.updateGCZLID(row.get("GSID").toString(),row.get("KHGSID").toString(), tms);
			String sql ="insert into gczl(GCZLID,GSID,KHGSID,SAVE_DATE,SAVE_USERID,SAVE_USERNAME,"
					+ "GC_ID,GC_NAME,STORES_ID,STORES_NAME,SELLER_ID,SELLER_NAME,CUSTOMER_NAME,CUSTOMER_LXR,"
					+ "CUSTOMER_TEL,CUSTOMER_PHONE_AREACODE,CUSTOMER_PHONE,CUSTOMER_ADDRESS,CUSTOMER_POSTCODE,"
					+ "BUY_DATE,INSTALL_DATE,SELL_TYPE,SELL_ONE,SELL_TWO,YEAR,BUY_NUMBER,SJKHGSID,SJKHGSNAME) values("
					+ "'"+id+"',GSID?,KHGSID?,sysdate,userId?,SELLER_NAME?,GC_ID?,GC_NAME?,"
					+ "STORES_ID?,STORES_NAME?,SELLER_ID?,SELLER_NAME?,CUSTOMER_NAME?,CUSTOMER_LXR?,"
					+ "CUSTOMER_TEL?,CUSTOMER_PHONE_AREACODE?,CUSTOMER_PHONE?,CUSTOMER_ADDRESS?,CUSTOMER_POSTCODE?,"
					+ "to_date(BUY_DATE?,'yyyy-MM-dd hh24:mi:ss'),to_date(INSTALL_DATE?,'yyyy-MM-dd'),SELL_TYPE?,SELL_ONE?,SELL_TWO?,YEAR?,BUY_NUMBER?,SJKHGSID?,SJKHGSNAME?)";
			int i = execSQL(tms, sql, row);
			
			logger.info("查询工程资料开始");
				   sql ="select 外机条码 SPWJ_TM,机型 SPWJ_ID,机型描述 SPWJ_NAME,内机条码1 SPNJ_TM,内机型 SPNJ_ID,"
				   		+ "内机型描述  SPNJ_NAME,联系人 CUSTOMER_LXR,移动电话 CUSTOMER_TEL,用户地址 CUSTOMER_ADDRESS from tbsqlinst where 工程编号='"+row.get("GC_ID").toString()+"'";
		    List<Map> list = queryForList(scm, sql);
		    logger.info("查询工程资料结束");
		    
		    logger.info("插入gczlitem开始");
		    for(Map item : list){
		    	 sql = "insert into gczlitem name(GCZLID,SPWJ_TM,SPWJ_ID,SPWJ_NAME,SPNJ_TM,SPNJ_ID,SPNJ_NAME,"
					   		+ "CUSTOMER_LXR,CUSTOMER_TEL,CUSTOMER_ADDRESS)"
					   		+ "VALUES('"+id+"',SPWJ_TM?,SPWJ_ID?,SPWJ_NAME?,SPNJ_TM?,SPNJ_ID?,SPNJ_NAME?,"
					   		+ "CUSTOMER_LXR?,CUSTOMER_TEL?,CUSTOMER_ADDRESS?)";
		    	int j = execSQL(tms, sql, item);
		    }
		    logger.info("插入gczlitem结束");
			WorkflowRequest wfReq= new WorkflowRequest();
			wfReq.setProcessDefinitionKey(PROCESS_DEFINITION_KEY);
			wfReq.setBusinessKey(String.valueOf(id));
			wfReq.setBizStartDate(new Date());
			Map<String,String> userInfo = (Map<String,String>) request.getSession().getAttribute("userInfo");
			Map<String, Object> vars = (Map<String, Object>) row.get("variables"); //参数
			vars.put("bizDqxx02",dqxx02);
			vars.put("khgsid", userInfo.get("KHGSID").toString());
			vars.put("bizUser", userInfo.get("USERID").toString());
			if(!FormTools.isNull(userInfo.get("SJKHGSID"))){
				vars.put("gsid",userInfo.get("SJKHGSID").toString());
			}
			wfReq.setVariables(vars);
			//启动流程
			ActivitiProcessInstance info =workflowServiceInter.startProcessInstanceByKey(wfReq);
			sql = "update gczl set PROCESS_INSTANCE_ID='"+info.getProcessInstanceId()+"' where GCZLID='"+wfReq.getBusinessKey()+"'";
			int j=execSQL(tms, sql, row);
			
			List<ActivitiTask> activitiTasks = workflowServiceInter.loadTaskListByBizKey(null, wfReq.getBusinessKey());
			
			if(activitiTasks == null || activitiTasks.size() == 0){
				logger.info(String.format("未查询到对应任务，工程资料号:%d", id));
				
			}else{
				WorkflowRequest workflowRequest = new WorkflowRequest();
				workflowRequest.setUserId(row.get("userId").toString());
				workflowRequest.setVariables(wfReq.getVariables());
				workflowRequest.setVariablesLocal(workflowRequest.getVariables());
				workflowRequest.setTaskId(activitiTasks.get(0).getTaskId());
				resultMap.put("data", FormTools.mapperBeanToMap(workflowRequest));
				//推动工作流
				workflowServiceInter.complete(workflowRequest);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw e;
		}
		resultMap.put("respCode", "000000");
		resultMap.put("respMsg", "添加成功");
		logger.info("工程资料提交完成[{}]",resultMap);
		return resultMap;
	}
	
	@RequestMapping("/insertTask.do")
	public Map insertTask(String json) throws Exception{
		WorkflowRequest wfReq = FormTools.mapperJsonToBean(json, WorkflowRequest.class);
		List<ActivitiTask> activitiTasks = workflowServiceInter.loadTaskListByBizKey(null, wfReq.getBusinessKey());
		Map resultMap = Maps.newHashMap(); 
		if(activitiTasks == null || activitiTasks.size() == 0){
			logger.info(String.format("未查询到对应任务，任务号:%d", wfReq.getTaskId()));
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", String.format("未查询到对应任务，任务号:%d", wfReq.getTaskId()));
		}else{
			workflowServiceInter.claimTask(wfReq.getTaskId(), wfReq.getUserId());
			resultMap.put("respCode", "000000");
			resultMap.put("respMsg", "领取任务成功");
		}
		return resultMap;
	}
	
	@Transactional("tms")
	@RequestMapping("/auditApprove.do")
	public Map auditApprove (String json,HttpServletRequest request)throws Exception{
		String code = FormTools.getrandomUUID();
		WorkflowRequest wfReq = FormTools.mapperJsonToBean(json, WorkflowRequest.class);
		logger.info("code[{}],gczl/auditApprove入口参数[{}]",code,wfReq.toString());
		Map resultMap = Maps.newHashMap(); 
		//推动工作流
		try {
			Map<String,String> userInfo = (Map<String,String>) request.getSession().getAttribute("userInfo");
			Map<String,Object> variables1 = wfReq.getVariables();
			variables1.put("bizUser",userInfo.get("USERID").toString());
			if(!FormTools.isNull(userInfo.get("KHGSID"))){
				variables1.put("khgsid", userInfo.get("KHGSID").toString());
			}			
			if(!FormTools.isNull(userInfo.get("SJKHGSID"))){
				variables1.put("gsid",userInfo.get("SJKHGSID").toString());
			}
			wfReq.setVariables(variables1);
			wfReq.setVariablesLocal(variables1);
			WorkflowRequest tempWork = new WorkflowRequest();
			tempWork.setTaskId(wfReq.getTaskId());
			ActivitiTask task = workflowServiceInter.loadTask(wfReq);
			String processDefinitionKey = task.getProcessDefinitionKey();
			String bizKey = task.getBizKey();
			//单个文件驳回
			Map row = null;
			if(FormTools.isNull(wfReq.getReturnFiles())){
				String sql ="update gczl_file set return_flag=0 where gczlid='"+bizKey+"'";
				execSQL(tms, sql, row);
				if(wfReq.getTaskName().equals("资料审核")){
					sql ="update gczl set qd_date=sysdate where gczlid='"+bizKey+"'";
					execSQL(tms, sql, row);
				}

			}else{
				for(Map file : wfReq.getReturnFiles()){
					String sql ="update gczl_file set return_flag=1 where gczlid='"+bizKey+"' and type='"+file.get("TYPE").toString()+"'";
					execSQL(tms, sql, row);
				}	
			}
			workflowServiceInter.complete(wfReq);
			for(int i = 2; i<= wfReq.getStep(); i++){
				ActivitiTask activitiTask = workflowServiceInter.loadTaskByBizKey(processDefinitionKey, bizKey);
				WorkflowRequest workflowRequest = new WorkflowRequest();
				Map<String,Object> variables = Maps.newHashMap();
				variables.putAll(activitiTask.getTaskVariables());
				variables.putAll(wfReq.getVariables());
				workflowRequest.setUserId(wfReq.getUserId());
				workflowRequest.setVariables(variables);
				workflowRequest.setVariablesLocal(variables);
				workflowRequest.setTaskId(activitiTask.getTaskId());
				//推动工作流
				workflowServiceInter.complete(workflowRequest);
				logger.info("code[{}],流程[{}]流转成功,推进[{}]步",code,wfReq.getVariables().get("msg"),i);				
			}
			resultMap.put("respCode", "000000");
			resultMap.put("respMsg", "审批成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("code[{}]审批，推动工作流过程出错 : {}",code,e);
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "推动工作流过程出错");
			
		}
		return resultMap;
	}
	
	/**
	 * 线性流转流程
	 * 
	 * @param wfReq
	 * @param code
	 * @return
	 */
	public Runnable batchAuditApproveBatch(final WorkflowRequest wfReq,final String code){
		Runnable thread = new Runnable() {
			public void run() {
				workflowServiceInter.complete(wfReq);
			}
		};
		return thread;
	}
	
	@Transactional
	@RequestMapping("/auditApproveBatch.do")
	public Map auditApproveBatch (String json,HttpServletRequest request)throws Exception{
		WorkflowRequest wfReq = FormTools.mapperJsonToBean(json, WorkflowRequest.class);
		Map resultMap = Maps.newHashMap(); 
		Map<String,String> userInfo = (Map<String,String>) request.getSession().getAttribute("userInfo");
		Map<String,Object> variables = wfReq.getVariables();
		variables.put("khgsid", userInfo.get("KHGSID").toString());
		variables.put("bizUser",userInfo.get("USERID").toString());
		if(!FormTools.isNull(userInfo.get("SJKHGSID"))){
			variables.put("gsid",userInfo.get("SJKHGSID").toString());
		}
		wfReq.setVariables(variables);
		wfReq.setVariablesLocal(wfReq.getVariables());
		//推动工作流
		try {
			int i = 1;
			for(String taskId: wfReq.getTaskList()){
				WorkflowRequest wfReq2 = new WorkflowRequest();
				wfReq2.setTaskId(taskId);
				ActivitiTask activitiTask = workflowServiceInter.loadTask(wfReq2);
				Map<String,Object> vars = Maps.newHashMap();
				vars.putAll(activitiTask.getTaskVariables());
				vars.putAll(wfReq.getVariables());
				wfReq2.setVariables(vars);
				Thread thread = new Thread(batchAuditApproveBatch(wfReq2, ""), Thread.currentThread().getName()+"-线程任务["+taskId+"]");
				thread.start();
				
			    i++;
			}
			resultMap.put("respCode", "000000");
			resultMap.put("respMsg", "批量提交成功");
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("审批，推动工作流过程出错 : {}", e);
			throw e;
			
		}
		return resultMap;
	}
	
	@Transactional("tms")
	@RequestMapping("/gczlUpload.do")
	public Map gczlUpload (String json,HttpServletRequest request)throws Exception{
		String code = FormTools.getrandomUUID();
		WorkflowRequest wfReq = FormTools.mapperJsonToBean(json, WorkflowRequest.class);
		Map<String,String> userInfo = (Map<String,String>) request.getSession().getAttribute("userInfo");
		Map<String,Object> variables = wfReq.getVariables();
		variables.put("khgsid", userInfo.get("KHGSID").toString());
		variables.put("bizUser",userInfo.get("USERID").toString());
		if(!FormTools.isNull(userInfo.get("SJKHGSID"))){
			variables.put("gsid",userInfo.get("SJKHGSID").toString());
		}
		wfReq.setVariables(variables);
		Map resultMap = Maps.newHashMap();
		boolean flag = false;
		logger.info("code[{}]工程资料上传,入口参数[{}]",wfReq.toString());
		//推动工作流
		try {
			Map row = FormTools.mapperToMap(json);
			if(FormTools.isNull(row.get("fileMap"))){
				resultMap.put("respCode", "000001");
				resultMap.put("respMsg", "必须上传一种资料");
				return resultMap;
			}
			Map<String,String> fileMap= (Map) row.get("fileMap");
			for(String index : REQUEIRED_FILE_TYPE){
				if(FormTools.isNull(fileMap.get(index))){
					flag = true;
					break;
				}
			}
			String updateGczlCreate_date = "update gczl set CREATE_DATE = sysdate where gczlid= '"+row.get("GCZLID").toString()+"' and CREATE_DATE is null";
			String updateGczl = "update gczl set UPDATE_DATE = sysdate where gczlid= '"+row.get("GCZLID").toString()+"'";
			for(Map.Entry<String, String> entry: fileMap.entrySet()){
				//先删除
				String sql = "delete from gczl_file where gczlid='"+row.get("GCZLID").toString()+"' and type='"+entry.getKey()+"'";
				execSQL(tms, sql, row);
				//后插入
				sql = "insert into gczl_file(GCZLID,TYPE,FILEID,CREATE_DATE,CREATE_TIME)VALUES(GCZLID?,'"+entry.getKey()+"','"+entry.getValue()+"',"+FinalValue.Date+",systimestamp)";
				execSQL(tms, sql, row);
			}
			resultMap.put("respCode", "000000");
			resultMap.put("respMsg", "上传成功,请继续上传其他必填资料");
			ActivitiTask activitiTask = workflowServiceInter.loadTask(wfReq);
			Map<String, Object> vars = activitiTask.getTaskVariables();
			vars.putAll(activitiTask.getTaskVariables());
			vars.putAll(wfReq.getVariables());;
			//更新资料最新上传时间
			int a = execSQL(tms, updateGczlCreate_date, row);
			//第一次上传时间已经更新，更新最新上传时间
			
			if(0 == a){
				execSQL(tms, updateGczl, row);
				Map gczl = getGczl(row.get("GCZLID").toString().trim(),code);
				//最新上传日期
				vars.put("bizUploadLastDate",DateUtils.parseDate(gczl.get("UPDATE_DATE").toString(), new String[]{"yyyy-MM-dd HH:mm:ss"}));
			}
			Map gczl = getGczl(row.get("GCZLID").toString().trim(),code);
			//初次上传日期
			vars.put("bizUploadFirstDate",DateUtils.parseDate(gczl.get("CREATE_DATE").toString(), new String[]{"yyyy-MM-dd HH:mm:ss"}));
			logger.info("code[{}],流程变量[{}]",code,vars.toString());
			wfReq.setVariables(vars);
			wfReq.setVariablesLocal(vars);
			if(flag){
				//workflowServiceInter.updateTaskVariable(wfReq);
				return resultMap;
			}
			logger.info("code[{}]工程资料上传,流程参数[{}]",wfReq.toString());
			workflowServiceInter.complete(wfReq);
			resultMap.put("respCode", "000000");
			resultMap.put("respMsg", "上传成功");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("审批，推动工作流过程出错 : {}", e);
			throw e;
			
		}
		return resultMap;
	}
	
	//初审审核推动工作流
	private void enterWorkFlow(Integer seq, String value1, String value2, String value3, String taskId, String patchCodeReason, String refuseCodeReason) {
		WorkflowRequest wfReq = new WorkflowRequest();
			Map<String, Object> map = new HashMap<String, Object>();
			// wfReq.setProcessDefinitionKey("ordinaryFinProdSign"); //流程定义Key
			wfReq.setTaskId(taskId);
			wfReq.setTaskName("初审"); // 当前任务名称
			wfReq.setBusinessKey(seq.toString()); // 业务编号
			/*map.put("approve", value1);
			map.put("remark", value2);
			map.put("getResult", value3);
			map.put("patchCodeReason", patchCodeReason);
			map.put("refuseCodeReason", refuseCodeReason);*/
			wfReq.setVariables(map);
			wfReq.setVariablesLocal(map);
			
	}
	
	@RequestMapping("/getGczlFiles.do")
	public List getGczlFiles(String json){
		List gczlFiles = Lists.newArrayList();
		try {
			Map row = FormTools.mapperToMap(json);
			String sql = "select GCZLID,TYPE as \"TYPE\",FILEID,FILE_SIZE,FILE_DESC,HD_HOME,HD_DATE,HD_SIZE,HD_HOST"
					+ " from gczl_file a,fs_files b where a.fileid=b.file_name and a.GCZLID='"+row.get("GCZLID").toString()+"'";
			//gczlFiles = queryForList(tms, sql,row);
			gczlFiles = queryForList(tms, sql);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return gczlFiles;
	}
	
	@RequestMapping(value = "/loadHistory.do", method = RequestMethod.POST)
	@Transactional
	public void loadHistory(String json,HttpServletResponse reps) throws Exception {
		Map respMap = Maps.newHashMap();
		WorkflowRequest wfReq = FormTools.mapperJsonToBean(json,WorkflowRequest.class);
		SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		List<Map> wfRes = new ArrayList<Map>();
		List<HistoricTaskObject> hist = new ArrayList<HistoricTaskObject>();
		if (!Strings.isNullOrEmpty(wfReq.getTaskId())) {
			hist = workflowServiceInter.loadHistory(wfReq);
		}else{
			if (!Strings.isNullOrEmpty(wfReq.getBusinessKey())) {
				/*String processDefinitionKey = workflowServiceInter
						.getProcessDefinitionKey(Integer.valueOf(wfReq.getBusinessKey()));
				wfReq.setProcessDefinitionKey(processDefinitionKey);*/
				wfReq.setBusinessKey(wfReq.getBusinessKey());
				hist = workflowServiceInter.loadHistoryByBizKey(wfReq);
			}
		}
		if (hist != null && hist.size() > 0) {
			for (HistoricTaskObject object : hist) {
				WfRes res = new WfRes();
				//res.setCheckTime(object.getEndTime());
				res.setCheckTime(df.format(object.getStartTime())+"-"+df.format(object.getEndTime()));
				res.setStartTime(object.getStartTime());
				res.setEndTime(object.getEndTime());
				Map<String, Object> map = object.getTaskVariables();
				res.setCheckStatus(object.getName());
				res.setCheckRemark(FormTools.isNull(map.get("digestCust"))?"":map.get("digestCust").toString());
				res.setCheckPerson(object.getAssignee());
				res.setRefuseCodeReason(FormTools.isNull(map.get("msg"))?"":map.get("msg").toString());
				if (!Strings.isNullOrEmpty(res.getCheckStatus())) {
					wfRes.add(FormTools.mapperBeanToMap(res));
				}
			}
		}
		respMap.put("code", "000000");
		respMap.put("msg", "查询成功");
		respMap.put("count", 100);
		respMap.put("data",wfRes);
		PrintWriter pw = reps.getWriter();
		pw.print(new ObjectMapper().writeValueAsString(FormTools.mapperBeanToMap(respMap)));
		pw.flush();
		pw.close();
	}
	
	@RequestMapping("/updateGczlReturn.do")
	public Map updateGczlReturn (String json)throws Exception{
		WorkflowRequest wfReq = FormTools.mapperJsonToBean(json, WorkflowRequest.class);
		Map resultMap = Maps.newHashMap(); 
		ActivitiTask activitiTask = workflowServiceInter.loadTask(wfReq);
		Map<String,Object> vars = Maps.newHashMap();
		vars.putAll(activitiTask.getTaskVariables());
		vars.putAll(wfReq.getVariables());
		wfReq.setVariables(vars);
		wfReq.setVariablesLocal(vars);
		//推动工作流
		try {
			if(FormTools.isNull(wfReq.getReturnFiles())){
				resultMap.put("respCode", "000001");
				resultMap.put("respMsg", "请至少勾选一个资料驳回");
				return resultMap;
			}
			Map row = null;
			for(Map file : wfReq.getReturnFiles()){
				String sql ="update gczl_file set return_flag=1 where gczlid='"+file.get("GCZLID").toString()+"' and type='"+file.get("TYPE").toString()+"'";
				execSQL(tms, sql, row);
			}
			workflowServiceInter.complete(wfReq);
			resultMap.put("respCode", "000000");
			resultMap.put("respMsg", "驳回成功");
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("审批，推动工作流过程出错 : {}", e);
			throw e;
			
		}
		return resultMap;
	}
	
	
	/**
	 * 工程资料收单
	 * 
	 * @param json
	 * @return
	 * @throws Exception
	 */
	@Transactional("tms")
	@RequestMapping("/updateGCZLSD.do")
	public Map updateGCZLSD(String json) throws Exception{
		String code = FormTools.getrandomUUID();
		logger.info("code[{}]工程资料收单,入口参数{}",code,json.toString());
		Map resultMap = Maps.newHashMap(); 
		Map row = FormTools.mapperToMap(json);
		if(Strings.isNullOrEmpty(row.get("GCZLID").toString())){
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "工程资料必填项");
			return resultMap;
		}
		try {
			String sql = "update gczl set SDRQ=to_date(SDRQ?,'yyyy-MM-dd'),FENSHU=FENSHU?"
					+ "where GCZLID=GCZLID?";
			int i = execSQL(tms, sql, row);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "资料收单失败");
			return resultMap;
		}
		resultMap.put("respCode", "000000");
		resultMap.put("respMsg", "资料收单成功");
		return resultMap;
	}
	
	@RequestMapping(value = "/downGczlFileData.do", method = RequestMethod.POST)
	public void downGczlFileData (String json,HttpServletRequest request,HttpServletResponse response) throws Exception{
		String code = FormTools.getrandomUUID();
		logger.info("code[{}]gczl/auditApprove入口参数[{}]",code,json);
		Map row = FormTools.mapperToMap(json);
		InputStream inStream = null;
		OutputStream outStream = null;
		ByteArrayOutputStream buff = new ByteArrayOutputStream();
		ZipOutputStream zipOut = new ZipOutputStream(buff,Charset.forName("UTF-8"));
		String zipName = "工程资料"+row.get("GCBH").toString()+"-"+DateFormatUtils.format(new Date(), "yyyyMMddHHMMSS");
		try {
			List<Map> gczlFiles =  queryForListByXML("tms", "GCZL.selectGCZLFILES", row);
			int i=1;
			for(Map gczl : gczlFiles){
				logger.info("code[{}]type[{}]name[{}]desc[{}]",code,gczl.get("TYPE").toString(),REQUEIRED_FILE_TYPE_Map.get(gczl.get("TYPE").toString()).toString(),gczl.get("FILE_DESC").toString());
				String zipEntryName = REQUEIRED_FILE_TYPE_Map.get(gczl.get("TYPE").toString()).toString();
				zipOut.putNextEntry(new ZipEntry("文件["+zipEntryName+"]"+gczl.get("FILE_DESC").toString()));
				String path = gczl.get("FILE_URL").toString();
			    URL url = new URL(path);
			    URLConnection conn = url.openConnection();
			    inStream = conn.getInputStream();
			    outStream = response.getOutputStream();
			    byte[] data = new byte[1204];
			    
			    int byteread = 0;
			    while ((byteread = inStream.read(data)) != -1) {
			    	zipOut.write(data, 0, byteread);
			    }
			    inStream.close();
			    //zipOut.write(data);
			    i++;
			}
			zipOut.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("code[],异常信息[{}]",code,e);
		}
		logger.info("工程资料附件[{}]压缩活体图片视频完成输出：{}",row.get("GCZLID").toString(),zipName+".zip");
		zipName = URLEncoder.encode(zipName, "UTF-8");		
		zipName = new String((zipName).getBytes(Charset.forName("GBK")), "ISO8859-1");
		response.setCharacterEncoding("GBK");
		response.setContentType("multipart/form-data;charset=GBK");
		response.setHeader("Content-Disposition", "attachment;fileName="+zipName+".zip");
		response.getOutputStream().write(buff.toByteArray());
	}
	
	public Map getGczl (String gczlid,String code) throws Exception{
		logger.info("code[{}],查询工程资料,入口参数{GCZLID={}}",code,gczlid);
		Map reuslt = null;
		Map paraMap = Maps.newHashMap();
		paraMap.put("GCZLID", gczlid);
		//reuslt = (Map) queryForObjectByXML("tms", "GCZL.selectGCZLHIT_Page", paraMap);
		String sql = "select GCZLID,GSID,KHGSID,TO_CHAR(SAVE_DATE,'yyyy-MM-dd HH:mi:ss')SAVE_DATE,"+
		"TO_CHAR(UPDATE_DATE,'yyyy-MM-dd HH:mi:ss')UPDATE_DATE,"+
		"TO_CHAR(CREATE_DATE,'yyyy-MM-dd HH:mi:ss')CREATE_DATE from gczl where GCZLID='"+gczlid+"'";	
		reuslt = queryForMap(tms, sql);
		logger.info("code[{}],查询工程资料,处理完成[{}]",reuslt);
		return reuslt;
	}
	
	/*
	@RequestMapping(value = "/downBatchGczlZip.do", method = RequestMethod.POST)
	public void downBatchGczlZip (String json,HttpServletRequest request,HttpServletResponse response) throws Exception{
		String code = FormTools.getrandomUUID();
		logger.info("code[{}]gczl/auditApprove入口参数[{}]",code,json);
		List<Map> rows = FormTools.mapperToMapList(json);
		InputStream inStream = null;
		OutputStream outStream = null;
		ByteArrayOutputStream buff = new ByteArrayOutputStream();
		ZipOutputStream zipOut = new ZipOutputStream(buff,Charset.forName("UTF-8"));
		String zipName = "批量工程资料"+DateFormatUtils.format(new Date(), "yyyyMMddHHMMSS");
		try {
			for(Map row : rows){
				List<Map> gczlFiles =  queryForListByXML("tms", "GCZL.selectGCZLFILES", row);
				//创建文件夹
				File zipDir = new File(row.get("GCZLID").toString());
				zipDir.createNewFile();
				zipDir.p
			}
			
			int i=1;
			for(Map gczl : gczlFiles){
				logger.info("code[{}]type[{}]name[{}]desc[{}]",code,gczl.get("TYPE").toString(),REQUEIRED_FILE_TYPE_Map.get(gczl.get("TYPE").toString()).toString(),gczl.get("FILE_DESC").toString());
				String zipEntryName = REQUEIRED_FILE_TYPE_Map.get(gczl.get("TYPE").toString()).toString();
				zipOut.putNextEntry(new ZipEntry("文件["+zipEntryName+"]"+gczl.get("FILE_DESC").toString()));
				String path = gczl.get("FILE_URL").toString();
			    URL url = new URL(path);
			    URLConnection conn = url.openConnection();
			    inStream = conn.getInputStream();
			    outStream = response.getOutputStream();
			    byte[] data = new byte[1204];
			    
			    int byteread = 0;
			    while ((byteread = inStream.read(data)) != -1) {
			    	zipOut.write(data, 0, byteread);
			    }
			    inStream.close();
			    //zipOut.write(data);
			    i++;
			}
			zipOut.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("code[],异常信息[{}]",code,e);
		}
		logger.info("工程资料附件[{}]压缩活体图片视频完成输出：{}",row.get("GCZLID").toString(),zipName+".zip");
		zipName = URLEncoder.encode(zipName, "UTF-8");		
		zipName = new String((zipName).getBytes(Charset.forName("GBK")), "ISO8859-1");
		response.setCharacterEncoding("GBK");
		response.setContentType("multipart/form-data;charset=GBK");
		response.setHeader("Content-Disposition", "attachment;fileName="+zipName+".zip");
		response.getOutputStream().write(buff.toByteArray());
	}*/
}
