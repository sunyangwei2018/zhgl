package com.cf.workflow.service;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

//import javax.annotation.Nullable;
import javax.servlet.http.HttpServletResponse;

import java.util.Set;



import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ActivitiObjectNotFoundException;
import org.activiti.engine.ActivitiTaskAlreadyClaimedException;
import org.activiti.engine.FormService;
import org.activiti.engine.HistoryService;
import org.activiti.engine.ManagementService;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.form.FormProperty;
import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricActivityInstanceQuery;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricProcessInstanceQuery;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricTaskInstanceQuery;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.history.HistoricVariableInstanceQuery;
import org.activiti.engine.history.NativeHistoricProcessInstanceQuery;
import org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.activiti.engine.impl.context.Context;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.runtime.ProcessInstanceBuilder;
import org.activiti.engine.runtime.ProcessInstanceQuery;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.activiti.image.ProcessDiagramGenerator;
import org.activiti.spring.ProcessEngineFactoryBean;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.workflow.entity.ActivitiProcessInstance;
import com.cf.workflow.entity.ActivitiTask;
import com.cf.workflow.entity.FetchResponse;
import com.cf.workflow.entity.HistoricTaskObject;
import com.cf.workflow.entity.Range;
import com.cf.workflow.entity.TaskQueryCriteria;
import com.cf.workflow.entity.WorkflowRequest;
import com.cf.workflow.exception.ProcessInstanceNotFoundException;
import com.cf.workflow.exception.TaskAlreadyClaimedException;
import com.cf.workflow.exception.TaskNotFoundException;
import com.cf.workflow.exception.WorkflowInfoMissException;
import com.cf.workflow.interfaces.WorkflowServiceInter;
import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;

import net.sf.json.JSONObject;



@Repository
public class WorkflowService implements WorkflowServiceInter {
	
	private Logger logger = LoggerFactory.getLogger(WorkflowService.class);

	@Autowired
	private FormService formService;

	@Autowired
	private RuntimeService runtimeService;

	@Autowired
	private TaskService taskService;

//	@Autowired
//	private CamelContext camelContext;
	
	@Autowired
	private HistoryService historyService;
	
	@Autowired
	private RepositoryService repositoryService;
	
    @Autowired
    ProcessEngineFactoryBean processEngine;

    @Autowired
    ProcessEngineConfiguration processEngineConfiguration;

    @Autowired
    ManagementService managementService;
 
    
	protected static Map<String, String> PROCESS_DEFINITION_CACHE = Maps.newHashMap();
	
	private final static String BIZ_KEY_KEY_NAME = "bizKey";//业务单号
	private final static String DIGEST_CUST_KEY_NAME = "digestCust";//客户摘要
	private final static String DIGEST_MERCHANT_KEY_NAME = "digestMerchant";
	private final static String DIGEST_ORDER_KEY_NAME = "digestOrder";
	private final static String DIGEST_PRODUCT_KEY_NAME = "digestProduct";
	private final static String BIZ_START_DATE_KEY_NAME = "bizStartDate";
	private final static String BIZ_TYPE_KEY_NAME = "bizType";
	private final static String BIZ_GCBH = "bizGcbh"; 
	private final static String BIZ_DQXX02 = "bizDqxx02";//工程资料地区
	private final static String BIZ_UPLOAD_FIRST_DATE = "bizUploadFirstDate";//初次上传日期
	private final static String BIZ_UPLOAD_UPLOAD_LAST_DATE = "bizUploadLastDate";//最新上传日期
	private final static String BIZ_GSID = "bizGsid";//操作人公司ID
	
	private SimpleDateFormat dateDf = new SimpleDateFormat("yyyy-MM-dd");
//	private SimpleDateFormat timeDf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");	
	private SimpleDateFormat timeDf = new SimpleDateFormat("yyyyMMdd HH:mm");	
	
	@Override
	public ActivitiProcessInstance startProcessInstanceByKey(WorkflowRequest req) {
		String key = req.getProcessDefinitionKey();
		String bizKey = req.getBusinessKey();
		logger.info("[startProcessInstanceByKey]key:{},bizKey:{}",key,bizKey);

		// add an extra variable to each process instance that wants to make use of the skip feature
//		vars.put("_ACTIVITI_SKIP_EXPRESSION_ENABLED", true); // 开启隐藏的SKIP功能
		ProcessInstanceBuilder builder = runtimeService.createProcessInstanceBuilder().processDefinitionKey(key).businessKey(bizKey).processInstanceName(key);
//		vars.put(BIZ_KEY_KEY_NAME, req.getBusinessKey());

		builder.addVariable(BIZ_KEY_KEY_NAME, req.getBusinessKey());
		Map<String, Object> vars = req.getVariables();
		if (vars != null) {
			for (Entry<String, Object> entry : vars.entrySet()) {
				builder.addVariable(entry.getKey(), entry.getValue());
			}
		}
		if (req.getDigestCust() != null) {
//			vars.put(DIGEST_CUST_KEY_NAME, req.getDigestCust());
			builder.addVariable(DIGEST_CUST_KEY_NAME, req.getDigestCust());
		}
		if (req.getDigestMerchant() != null) {
//			vars.put(DIGEST_MERCHANT_KEY_NAME, req.getDigestMerchant());
			builder.addVariable(DIGEST_MERCHANT_KEY_NAME, req.getDigestMerchant());
		}
		if (req.getDigestOrder() != null) {
//			vars.put(DIGEST_ORDER_KEY_NAME, req.getDigestOrder());
			builder.addVariable(DIGEST_ORDER_KEY_NAME, req.getDigestOrder());
		}
		if (req.getDigestProduct() != null) {
//			vars.put(DIGEST_PRODUCT_KEY_NAME, req.getDigestProduct());
			builder.addVariable(DIGEST_PRODUCT_KEY_NAME, req.getDigestProduct());
		}
		if (req.getBizStartDate() != null) {
//			vars.put(BIZ_START_DATE_KEY_NAME, req.getBizStartDate());
			builder.addVariable(BIZ_START_DATE_KEY_NAME, req.getBizStartDate());
		}
		ProcessInstance pi = builder.start(); // runtimeService.startProcessInstanceByKey(key, bizKey, vars);
		
		logger.info("[startProcessInstanceByKey]id:{},processInstanceId:{}",pi.getId(),pi.getProcessInstanceId());
		
		ActivitiProcessInstance result = new ActivitiProcessInstance();
		result.setProcessInstanceId(pi.getProcessInstanceId());
		return result;
	}
	
	
	/**
	 * 起流程 批量
	 * @param req
	 */
	@Override
	public void startProcessInstanceByKey(List<WorkflowRequest> reqList) {
		for (WorkflowRequest req : reqList) {
			startProcessInstanceByKey(req);
		}
	}
	
	/**
	 * @deprecated replaced by {@link #dealTask()}
	 */
	@Override
	public void claimTask(String taskId, String userId) {
		taskService.claim(taskId, userId);
	}
	
	@Override
	public void unclaimTask(WorkflowRequest wfReq) {
		Task task = null;
		String userId = wfReq.getUserId();
		task = getTask(wfReq);
		if (task == null) {
			throw new TaskNotFoundException();
		}
		// if need validate user
		String assignee = task.getAssignee();
		if (assignee != null) {
			if (userId != null && !userId.equals(assignee) ) { 
				throw new TaskAlreadyClaimedException();
			}
			taskService.unclaim(task.getId());
		}

	}

	@Override
	public void dealTask(String taskId, String userId) throws TaskAlreadyClaimedException,TaskNotFoundException {
		logger.info("[dealTask]taskId:{},userId:{}",taskId,userId);
		try {
			WorkflowRequest wfReq = new WorkflowRequest();
			taskService.claim(taskId, userId);
		} catch (ActivitiTaskAlreadyClaimedException e) {
			throw new TaskAlreadyClaimedException();
		} catch (ActivitiObjectNotFoundException e) {
			throw new TaskNotFoundException();
		}
	}
	
	@Override
	public List<ActivitiTask> getTaskList(WorkflowRequest requests) {
		String processDefinitionKey = requests.getProcessDefinitionKey();
		List<String> bizKeyList = requests.getBusinessKeyList();
		List<ActivitiTask> resultList = Lists.newArrayList();
		TaskQuery query = taskService.createTaskQuery();
		query.processDefinitionKey(processDefinitionKey);
		if (StringUtils.isNoneBlank(requests.getTaskName())) {
			query.taskNameLike("%" + requests.getTaskName() + "%");
		}
		if (requests.getTaskNameIn() != null && !requests.getTaskNameIn().isEmpty()) {
			query.taskNameIn(requests.getTaskNameIn());
		}
		query.or();
		for (String bizKey : bizKeyList) {
//			query.processInstanceBusinessKey(bizKey); // 该方式 测试无效
			query.processVariableValueEquals("bizKey", bizKey);
		}
		query.endOr();
		
		List<Task> taskList = query.list();
		for (Task one : taskList) {
			resultList.add(createAndCovert(one));
		}
		return resultList;	
	}
	
	
//	@Override
	public FetchResponse<ActivitiTask> fetchWorksByBizList(TaskQueryCriteria taskQueryCriteria) {
		List<ActivitiTask> result = doFetchWorksByBizList(taskQueryCriteria);
		return null;//new ListFetchRespoonseBuilder<ActivitiTask>(result).range(taskQueryCriteria.getRange()).build();
	}

	private List<ActivitiTask> doFetchWorksByBizList(TaskQueryCriteria taskQueryCriteria) {
		List<ActivitiTask> result = new ArrayList<ActivitiTask>();
		List<Task> taskList = Lists.newArrayList();
		List<HistoricTaskInstance> hisTaskList = Lists.newArrayList();
		
		String pdKey = taskQueryCriteria.getProcessDefinitionKey();
		List<String> bizKeyList = taskQueryCriteria.getBizKeyList();
		List<String> bizKeyListRemain = Lists.newArrayList(bizKeyList);
		TaskQuery query = taskService.createTaskQuery();
		if (StringUtils.isNotBlank(pdKey)) {
			query.processDefinitionKey(pdKey);
		}
		if (StringUtils.isNoneBlank(taskQueryCriteria.getTaskName())) {
			query.taskNameLike("%" + taskQueryCriteria.getTaskName() + "%");
		}
		for (String bizKey : bizKeyList) {
			query.processInstanceBusinessKey(bizKey);
			Task task = query.singleResult();
			if (task != null) {
				taskList.add(task);
				bizKeyListRemain.remove(bizKey);
			}
		}
		
		for (Task task : taskList) {
			result.add(createAndCovert(task));
		}
		HistoricTaskInstanceQuery hisQuery = historyService.createHistoricTaskInstanceQuery();
		if (StringUtils.isNotBlank(pdKey)) {
			hisQuery = hisQuery.processDefinitionKey(pdKey);
		}
		
		for (String bizKey : bizKeyListRemain) {
			hisQuery = hisQuery.processInstanceBusinessKey(bizKey);
			HistoricTaskInstance hisTask = hisQuery.finished().orderByHistoricTaskInstanceEndTime().desc().singleResult();
			if (hisTask != null) {
				hisTaskList.add(hisTask);
			}
		}
		
		for (HistoricTaskInstance task : hisTaskList) {
			result.add(createAndCovertHis(task));
		}
		
		return result;
	}

	private ActivitiTask createAndCovertHis(HistoricTaskInstance task) {
//		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(task.getProcessInstanceId()).includeProcessVariables().singleResult();
		Map<String, Object> vars =  runtimeService.getVariables(task.getExecutionId()); 
//		Map<String, Object> map = processInstance.getProcessVariables();
		
		ActivitiTask activitiTask = new ActivitiTask();
		activitiTask.setTaskId(task.getId());
		activitiTask.setTaskName(task.getName());
		activitiTask.setAsignee(task.getAssignee());
		activitiTask.setProcInstId(task.getProcessInstanceId());
		activitiTask.setCreateTime(task.getCreateTime());
		activitiTask.setFormKey(task.getFormKey());
		
		if (task.getCreateTime() != null) {
			activitiTask.setCreateDateStr(dateDf.format(task.getCreateTime()));
			activitiTask.setCreateTimeStr(timeDf.format(task.getCreateTime()));
		}
		
		activitiTask.setDueDate(task.getDueDate());
//		if(vars.get("name")!= null)
//			activitiTask.setAppName(vars.get("name").toString());
		if(vars.get("bizKey")!= null)
			activitiTask.setBizKey(vars.get("bizKey").toString());


		String pdId = task.getProcessDefinitionId();
		String[] pdIdSplit = pdId.split(":");
		activitiTask.setProcessDefinitionKey(pdIdSplit[0]);
		return activitiTask;
	}

	@Override
	public FetchResponse<ActivitiTask> fetchTodoList(String oprId, Set<String> authList, Integer showNum) {
		TaskQueryCriteria criteria = new TaskQueryCriteria();
		criteria.setRange(new Range(0, showNum));
		FetchResponse<ActivitiTask> result = fetchWorkBenchList(criteria, oprId, authList);
		return result;
	}
	
	@Override
	public FetchResponse<ActivitiTask> fetchWorkList(TaskQueryCriteria taskQueryCriteria) {
		List<ActivitiTask> result = new ArrayList<ActivitiTask>();
		TaskQuery query = createFetchTaskForUserOrGroupQuery(taskQueryCriteria, null, null);
//		query.orderByProcessInstanceId().desc();
		query.orderByTaskCreateTime().desc();
		long rowCount = query.count();
		Range range = taskQueryCriteria.getRange();
		List<Task> taskList;
		if (range != null) {
			taskList = query.listPage(range.getStart(), range.getLength());
		} else {
			taskList = query.list();
		}
		FetchResponse<ActivitiTask> fetchResponse = new FetchResponse<>();
		for (Task task : taskList) {
			result.add(createAndCovert(task));
		}
		fetchResponse.setData(result);
		fetchResponse.setRowCount(rowCount);
		if ( taskQueryCriteria.getRange() != null) {
			fetchResponse.setStart(taskQueryCriteria.getRange().getStart());
		}
		return fetchResponse;
	}


	@Override
	public FetchResponse<ActivitiTask> fetchWorkHisList(TaskQueryCriteria taskQueryCriteria) {
		List<ActivitiTask> result = new ArrayList<ActivitiTask>();
		HistoricProcessInstanceQuery query = createFetchHistoryProcessQuery(taskQueryCriteria);
//		query.orderByProcessInstanceId().desc();
		long rowCount = query.count();
		List<HistoricProcessInstance> processList;
		Range range = taskQueryCriteria.getRange();
		if (range != null) {
			processList = query.listPage(range.getStart(), range.getLength());
		} else {
			processList = query.list();
		}
		FetchResponse<ActivitiTask> fetchResponse = new FetchResponse<>();
		for (HistoricProcessInstance processInstance : processList) {
			result.add(createAndCovertHistoricProcessInstance(processInstance));
		}
		fetchResponse.setData(result);
		fetchResponse.setRowCount(rowCount);
		if ( taskQueryCriteria.getRange() != null) {
			fetchResponse.setStart(taskQueryCriteria.getRange().getStart());
		}
		return fetchResponse;
	}
	
	private ActivitiTask createAndCovertHistoricProcessInstance(HistoricProcessInstance processInstance) {

		Map<String, Object> vars = processInstance.getProcessVariables();

		ActivitiTask activitiTask = new ActivitiTask();
		activitiTask.setTaskId(processInstance.getId());
		activitiTask.setTaskName(processInstance.getName());
//		activitiTask.setAsignee(processInstance.getAssignee());
		activitiTask.setProcInstId(processInstance.getId());
		activitiTask.setCreateTime(processInstance.getStartTime());
//		activitiTask.setFormKey(processInstance.getFormKey());

		if (processInstance.getStartTime() != null) {
			activitiTask.setCreateDateStr(dateDf.format(processInstance.getStartTime()));
			activitiTask.setCreateTimeStr(timeDf.format(processInstance.getStartTime()));
		}
		if (processInstance.getEndTime() != null) {
			activitiTask.setEndDateStr(dateDf.format(processInstance.getEndTime()));
			activitiTask.setEndTimeStr(timeDf.format(processInstance.getEndTime()));
		}
//		activitiTask.setDueDate(processInstance.getDueDate());
//		if(vars.get("name")!= null)
//			activitiTask.setAppName(vars.get("name").toString());
//		if(vars.get(BIZ_KEY_KEY_NAME)!= null)
//			activitiTask.setBizKey((String)vars.get(BIZ_KEY_KEY_NAME));
		activitiTask.setBizKey(processInstance.getBusinessKey());
		if(vars != null) {
			if(vars.get(DIGEST_CUST_KEY_NAME)!= null)
				activitiTask.setDigestCust((String)vars.get(DIGEST_CUST_KEY_NAME));
			if(vars.get(DIGEST_MERCHANT_KEY_NAME)!= null)
				activitiTask.setDigestMerchant((String)vars.get(DIGEST_MERCHANT_KEY_NAME));
			if(vars.get(DIGEST_ORDER_KEY_NAME)!= null)
				activitiTask.setDigestOrder((String)vars.get(DIGEST_ORDER_KEY_NAME));
			if(vars.get(DIGEST_PRODUCT_KEY_NAME)!= null)
				activitiTask.setDigestProduct((String)vars.get(DIGEST_PRODUCT_KEY_NAME));
		}
		String pdId = processInstance.getProcessDefinitionId();
		String[] pdIdSplit = pdId.split(":");
		activitiTask.setProcessDefinitionKey(pdIdSplit[0]);
//		if(processDefitionMap != null) {
//			String processDefinitionName = processDefitionMap.get(pdIdSplit[0]);
//			if (processDefinitionName == null) {
//				processDefinitionName = loadProcessDefinitionMap().get(pdIdSplit[0]);
//			}
//			activitiTask.setProcessDefinitionName(processDefitionMap.get(pdIdSplit[0]));
//		}
		activitiTask.setProcessDefinitionName(getProcessDefinitionName(pdId));
		activitiTask.setProcessVariables(processInstance.getProcessVariables());
		
		return activitiTask;
	}

	private HistoricProcessInstanceQuery createFetchHistoryProcessQuery(TaskQueryCriteria taskQueryCriteria) {
		HistoricProcessInstanceQuery query = historyService.createHistoricProcessInstanceQuery();
		addFilterToHistoricProcessInstanceQuery(taskQueryCriteria, query);

		query.orderByProcessInstanceEndTime().desc();
		return query;
	}


	private void addFilterToHistoricProcessInstanceQuery(TaskQueryCriteria taskQueryCriteria, HistoricProcessInstanceQuery query) {
		String pdKey = taskQueryCriteria.getProcessDefinitionKey();
		List<String> pdKeyList = taskQueryCriteria.getProcessDefinitionKeyIn();
		if (StringUtils.isNotBlank(pdKey)) {
			query.processDefinitionKey(pdKey);
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getBizKey())) {
//			query.processVariableValueEquals("bizKey" , taskQueryCriteria.getBizKey());
			query.processInstanceBusinessKey(taskQueryCriteria.getBizKey());
		}
		if (pdKeyList != null && !pdKeyList.isEmpty()) {
			query.processDefinitionKeyIn(pdKeyList);
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getProcessDefinitionKeyLike())) {
			query.processInstanceNameLike(taskQueryCriteria.getProcessDefinitionKeyLike());
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestCust())) {
			query.variableValueLike(DIGEST_CUST_KEY_NAME , "%" + taskQueryCriteria.getDigestCust() + "%");
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestMerchant())) {
			query.variableValueLike(DIGEST_MERCHANT_KEY_NAME , "%" + taskQueryCriteria.getDigestMerchant() + "%");
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestOrder())) {
			query.variableValueLike(DIGEST_ORDER_KEY_NAME , "%" + taskQueryCriteria.getDigestOrder() + "%");
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestProduct())) {
			query.variableValueLike(DIGEST_PRODUCT_KEY_NAME , "%" + taskQueryCriteria.getDigestProduct() + "%");
		}
		if (taskQueryCriteria.getBizStartDateBegin() != null) {
			query.variableValueGreaterThanOrEqual(BIZ_START_DATE_KEY_NAME , taskQueryCriteria.getBizStartDateBegin());
		}
		if (taskQueryCriteria.getBizStartDateEnd() != null) {
			query.variableValueLessThanOrEqual(BIZ_START_DATE_KEY_NAME , taskQueryCriteria.getBizStartDateEnd());
		}
		query.includeProcessVariables();
	}


	@Override
	public FetchResponse<ActivitiTask> fetchWorkBenchList(TaskQueryCriteria taskQueryCriteria, String oprId, Set<String> authSet) {
//		List<ActivitiTask> result = doFetchWorkBenchList(taskQueryCriteria,oprId,authList);
		List<ActivitiTask> result = new ArrayList<ActivitiTask>();
		TaskQuery query = createFetchTaskForUserOrGroupQuery(taskQueryCriteria, oprId, authSet);
		query.orderByTaskCreateTime().desc();
		long rowCount = query.count();
		Range range = taskQueryCriteria.getRange();
		if (range != null) {
			query.listPage(range.getStart(), range.getLength());
		}
		List<Task> taskList = query.list();
		FetchResponse<ActivitiTask> fetchResponse = new FetchResponse<>();
//		Map<String, String> processDefitionMap = getProcessDefinitionMap();
		/*for (Task task : taskList) {
			result.add(createAndCovert(task));
		}*/
		for (Task task : taskList) {
		    ActivitiTask activitiTask = createAndCovert(task);
		    HistoricTaskInstanceQuery hisQuery = historyService.createHistoricTaskInstanceQuery().processInstanceId(activitiTask.getProcInstId());
		    List<HistoricTaskInstance> hists = hisQuery.finished().orderByHistoricTaskInstanceEndTime().desc().list();
		    activitiTask.setLastAssignee(hists.size()==0?null:hists.get(0).getAssignee());
		    result.add(activitiTask);
		}
		fetchResponse.setData(result);
		fetchResponse.setRowCount(rowCount);
		if (taskQueryCriteria.getRange() != null) {
			fetchResponse.setStart(taskQueryCriteria.getRange().getStart());
		}
		return fetchResponse;
	}
	

	public List<ActivitiTask> doFetchWorkBenchList(TaskQueryCriteria taskQueryCriteria, String oprId, Set<String> authList) {
//		Map<String, String> processDefitionMap = getProcessDefinitionMap();
		List<ActivitiTask> result = new ArrayList<ActivitiTask>();
		List<Task> taskList = Lists.newArrayList();
//		taskList.addAll(fetchTaskForUser(taskQueryCriteria,oprId));
//		taskList.addAll(fetchTaskForUserGroup(taskQueryCriteria,authList));
		taskList = fetchTaskForUserOrGroup(taskQueryCriteria, oprId, authList);
		for (Task task : taskList) {
			result.add(createAndCovert(task));
		}
		return result;
	}
	
	private List<Task> fetchTaskForUserOrGroup(TaskQueryCriteria taskQueryCriteria, String oprId, Set<String> authSet) {
		TaskQuery query = createFetchTaskForUserOrGroupQuery(taskQueryCriteria, oprId, authSet);
		Range range = taskQueryCriteria.getRange();
		if (range != null) {
			query.listPage(range.getStart(), range.getLength());
		}
		List<Task> tasks = query.list();
		return tasks;
	}


	
	private TaskQuery createFetchTaskForUserOrGroupQuery(TaskQueryCriteria taskQueryCriteria, String oprId,	Set<String> authSet) {
		TaskQuery query = taskService.createTaskQuery();
		addFilterToQuery(taskQueryCriteria, query);
		if (oprId != null && authSet != null) {
			List<String> authList = Lists.newArrayList(authSet);
			query.or()
				.taskAssignee(oprId)
				.taskCandidateGroupIn(authList)
				//.processVariableValueEquals("dlshr", oprId)
			.endOr();
		}
//		query = query.orderByTaskId().desc();
//		query.orderByTaskCreateTime().desc();
		//query.taskAssignee(oprId);
		return query;
	}


//	@Override
//	public String camelTest(String userId) {
//		ProducerTemplate producerTemplate = camelContext.createProducerTemplate();
//		String result = producerTemplate.requestBody("direct:start", userId, String.class);
//		System.out.println("result"+result);
//		return result;
//	}
	
//	public List<String> camelTest2(String productId) {
//		ProducerTemplate producerTemplate = camelContext.createProducerTemplate();
//		List result = producerTemplate.requestBody("direct:attachmentCheck", productId, List.class);
//		System.out.println(result);
//		return result;
//	}
	
	private List<Task> fetchTaskForUser(TaskQueryCriteria taskQueryCriteria, String oprId) {
		TaskQuery query = taskService.createTaskQuery();
		query = query.taskAssignee(oprId);
		addFilterToQuery(taskQueryCriteria, query);
		List<Task> tasks = query.list();
		return tasks;
	}
	
	private List<Task> fetchTaskForUserGroup(TaskQueryCriteria taskQueryCriteria, Set<String> authSet) {
		TaskQuery query = taskService.createTaskQuery();
		List<String> authList = Lists.newArrayList(authSet);
		query = query.taskCandidateGroupIn(authList);
		addFilterToQuery(taskQueryCriteria, query);
		List<Task> tasks = query.list();
		return tasks;
	}

//	private ActivitiTask createAndCovert(Task task) {
//		return createAndCovert(task, null);
//	}
	
	private ActivitiTask createAndCovert(Task task) {
//		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(task.getProcessInstanceId()).includeProcessVariables().singleResult();
		Map<String, Object> vars =  runtimeService.getVariables(task.getExecutionId()); 
//		Map<String, Object> map = processInstance.getProcessVariables();
		
		ActivitiTask activitiTask = new ActivitiTask();
		activitiTask.setTaskId(task.getId());
		activitiTask.setTaskName(task.getName());
		activitiTask.setAsignee(task.getAssignee());
		activitiTask.setProcInstId(task.getProcessInstanceId());
		activitiTask.setCreateTime(task.getCreateTime());
		activitiTask.setFormKey(task.getFormKey());
		
		if (task.getCreateTime() != null) {
			SimpleDateFormat dateDf = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat timeDf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");	
			activitiTask.setCreateDateStr(dateDf.format(task.getCreateTime()));
			activitiTask.setCreateTimeStr(timeDf.format(task.getCreateTime()));
		}
		
		activitiTask.setDueDate(task.getDueDate());
//		if(vars.get("name")!= null)
//			activitiTask.setAppName(vars.get("name").toString());
		if(vars.get(BIZ_KEY_KEY_NAME)!= null)
			activitiTask.setBizKey((String)vars.get(BIZ_KEY_KEY_NAME));
		if(vars.get(DIGEST_CUST_KEY_NAME)!= null)
			activitiTask.setDigestCust((String)vars.get(DIGEST_CUST_KEY_NAME));
		if(vars.get(DIGEST_MERCHANT_KEY_NAME)!= null)
			activitiTask.setDigestMerchant((String)vars.get(DIGEST_MERCHANT_KEY_NAME));
		if(vars.get(DIGEST_ORDER_KEY_NAME)!= null)
			activitiTask.setDigestOrder((String)vars.get(DIGEST_ORDER_KEY_NAME));
		if(vars.get(DIGEST_PRODUCT_KEY_NAME)!= null)
			activitiTask.setDigestProduct((String)vars.get(DIGEST_PRODUCT_KEY_NAME));
		if(vars.get(BIZ_TYPE_KEY_NAME)!= null)
			activitiTask.setBizType((String)vars.get(BIZ_TYPE_KEY_NAME));
		if(vars.get(BIZ_TYPE_KEY_NAME)!=null)
			activitiTask.setBizType((String)vars.get(BIZ_TYPE_KEY_NAME));
		if(vars.get(BIZ_GCBH)!=null)
			activitiTask.setBizGcbh((String)vars.get(BIZ_GCBH));
		if(vars.get(BIZ_DQXX02)!=null)
			activitiTask.setBizDqxx02((String)vars.get(BIZ_DQXX02));
		if(vars.get(BIZ_UPLOAD_FIRST_DATE)!=null)
			activitiTask.setBizUploadFirstDate(DateFormatUtils.format((Date)vars.get(BIZ_UPLOAD_FIRST_DATE), "yyyy-MM-dd HH:mm:ss"));
		if(vars.get(BIZ_UPLOAD_UPLOAD_LAST_DATE)!=null)
			activitiTask.setBizUploadLastDate(DateFormatUtils.format((Date)vars.get(BIZ_UPLOAD_UPLOAD_LAST_DATE),"yyyy-MM-dd HH:mm:ss"));
		String pdId = task.getProcessDefinitionId();
		String[] pdIdSplit = pdId.split(":");
		activitiTask.setProcessDefinitionKey(pdIdSplit[0]);
//		if(processDefitionMap != null) {
//			String processDefinitionName = processDefitionMap.get(pdIdSplit[0]);
//			if (processDefinitionName == null) {
//				processDefinitionName = loadProcessDefinitionMap().get(pdIdSplit[0]);
//			}
//			activitiTask.setProcessDefinitionName(processDefitionMap.get(pdIdSplit[0]));
//		}
		activitiTask.setProcessDefinitionName(getProcessDefinitionName(pdId));
		activitiTask.setProcessVariables(task.getProcessVariables());
		activitiTask.setTaskVariables(task.getTaskLocalVariables());
		
		return activitiTask;
	}

    private String getProcessDefinitionName(String processDefinitionId) {
        String processDefinitionName = PROCESS_DEFINITION_CACHE.get(processDefinitionId);
		if (processDefinitionName == null) {
            ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().processDefinitionId(processDefinitionId).singleResult();
            processDefinitionName = processDefinition.getName();
            PROCESS_DEFINITION_CACHE.put(processDefinitionId, processDefinitionName);
        }
        return processDefinitionName;
    }
    
	private void addFilterToQuery(TaskQueryCriteria taskQueryCriteria, TaskQuery query) {
		String pdKey = taskQueryCriteria.getProcessDefinitionKey();
		List<String> pdKeyList = taskQueryCriteria.getProcessDefinitionKeyIn();
		if (StringUtils.isNotBlank(pdKey)) {
			query.processDefinitionKey(pdKey);
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getBizKey())) {
			query.processVariableValueEquals("bizKey" , taskQueryCriteria.getBizKey());
			//query.processInstanceBusinessKey(taskQueryCriteria.getBizKey());
			//query.processVariableValueEquals("dlshr",taskQueryCriteria.getUserId());
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getGsid())){
			query.processVariableValueEquals("gsid", taskQueryCriteria.getGsid());
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getBizUser())){
			query.processVariableValueEquals("bizUser" , taskQueryCriteria.getBizUser());
		}
		if (pdKeyList != null && !pdKeyList.isEmpty()) {
			query.processDefinitionKeyIn(pdKeyList);
		}
		if (StringUtils.isNoneBlank(taskQueryCriteria.getTaskNameLike())) {
			query.taskNameLike("%" + taskQueryCriteria.getTaskNameLike() + "%");
		}
		if (StringUtils.isNoneBlank(taskQueryCriteria.getTaskName())) {
			query.taskName(taskQueryCriteria.getTaskName());
		}
		if (taskQueryCriteria.getTaskNameIn() != null && !taskQueryCriteria.getTaskNameIn().isEmpty()) {
			query.taskNameIn(taskQueryCriteria.getTaskNameIn());
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getProcessDefinitionKeyLike())) {
			query.processDefinitionKeyLike(taskQueryCriteria.getProcessDefinitionKeyLike());
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestCust())) {
			query.processVariableValueLike(DIGEST_CUST_KEY_NAME , "%" + taskQueryCriteria.getDigestCust() + "%");
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestMerchant())) {
			query.processVariableValueLike(DIGEST_MERCHANT_KEY_NAME , "%" + taskQueryCriteria.getDigestMerchant() + "%");
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestOrder())) {
			query.processVariableValueLike(DIGEST_ORDER_KEY_NAME , "%" + taskQueryCriteria.getDigestOrder() + "%");
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestProduct())) {
			query.processVariableValueLike(DIGEST_PRODUCT_KEY_NAME , "%" + taskQueryCriteria.getDigestProduct() + "%");
		}
		if (taskQueryCriteria.getBizStartDateBegin() != null) {
			query.processVariableValueGreaterThanOrEqual(BIZ_START_DATE_KEY_NAME , taskQueryCriteria.getBizStartDateBegin());
		}
		if (taskQueryCriteria.getBizStartDateEnd() != null) {
			query.processVariableValueLessThanOrEqual(BIZ_START_DATE_KEY_NAME , taskQueryCriteria.getBizStartDateEnd());
		}
		if(StringUtils.isNotBlank(taskQueryCriteria.getBizType())){
			query.processVariableValueEquals(BIZ_TYPE_KEY_NAME, taskQueryCriteria.getBizType());
		}
		if(StringUtils.isNotBlank(taskQueryCriteria.getBizGcbh())){
			query.processVariableValueEquals(BIZ_GCBH,taskQueryCriteria.getBizGcbh());
		}if(StringUtils.isNotBlank(taskQueryCriteria.getBizDqxx02())){
			query.processVariableValueLike(BIZ_DQXX02 , "%" + taskQueryCriteria.getBizDqxx02() + "%");
		}
		try {
			if(StringUtils.isNotBlank(taskQueryCriteria.getBizUploadFirstDateBegin())){
				query.processVariableValueGreaterThanOrEqual(BIZ_UPLOAD_FIRST_DATE, DateUtils.parseDate(taskQueryCriteria.getBizUploadFirstDateBegin()+" 00:00:00", new String[]{"yyyy-MM-dd HH:mm:ss"}));
			}if(StringUtils.isNotBlank(taskQueryCriteria.getBizUploadFirstDateEnd())){
				query.processVariableValueLessThanOrEqual(BIZ_UPLOAD_FIRST_DATE, DateUtils.parseDate(taskQueryCriteria.getBizUploadFirstDateEnd()+" 23:23:59",new String[]{"yyyy-MM-dd HH:mm:ss"}));
			}if(StringUtils.isNotBlank(taskQueryCriteria.getBizUploadLastDateBegin())){
				query.processVariableValueGreaterThanOrEqual(BIZ_UPLOAD_UPLOAD_LAST_DATE,  DateUtils.parseDate(taskQueryCriteria.getBizUploadLastDateBegin()+" 00:00:00",new String[]{"yyyy-MM-dd HH:mm:ss"}));
			}if(StringUtils.isNotBlank(taskQueryCriteria.getBizUploadLastDateEnd())){
				query.processVariableValueLessThanOrEqual(BIZ_UPLOAD_UPLOAD_LAST_DATE, DateUtils.parseDate(taskQueryCriteria.getBizUploadLastDateEnd()+" 23:23:59",new String[]{"yyyy-MM-dd HH:mm:ss"}));
			}
		} catch (ParseException e) {
			logger.info("我的工作台查询上传日期格式转换错误",e);
			e.printStackTrace();
			
		}
	}

	@Override
	public void claimTaskByBizKey(String processDefinitionKey, String bizKey, String userId) {
		Task task = getTaskByBizKey(processDefinitionKey, bizKey);
		if (task != null) {
			taskService.claim(task.getId(), userId);
		}
	}


	@Override
	public void complete(WorkflowRequest wfReq) {
		Task task = null;
		String userId = wfReq.getUserId();
		task = getTask(wfReq);
		if (task == null) {
			throw new TaskNotFoundException();
		}
		// if need validate user
		String assignee = task.getAssignee();
		if (userId != null && assignee != null && !userId.equals(assignee) ) { 
			throw new TaskAlreadyClaimedException();
		} else if (userId != null && assignee == null) {
			taskService.claim(task.getId(), userId);
		}
		
		Map<String, Object> variablesLocal = wfReq.getVariablesLocal();
		if (variablesLocal != null && !variablesLocal.isEmpty()) {
			taskService.setVariablesLocal(task.getId(), variablesLocal);
		}
		
		Map<String, Object> variables = wfReq.getVariables();
		if (variables == null) {
			variables = Maps.newHashMap();
		}
		if (wfReq.getDigestCust() != null) {
			variables.put(DIGEST_CUST_KEY_NAME, wfReq.getDigestCust());
		}
		if (wfReq.getDigestMerchant() != null) {
			variables.put(DIGEST_MERCHANT_KEY_NAME, wfReq.getDigestMerchant());
		}
		if (wfReq.getDigestOrder() != null) {
			variables.put(DIGEST_ORDER_KEY_NAME, wfReq.getDigestOrder());
		}
		if (wfReq.getDigestProduct() != null) {
			variables.put(DIGEST_PRODUCT_KEY_NAME, wfReq.getDigestProduct());
		}
		if (wfReq.getBizStartDate() != null) {
			variables.put(BIZ_START_DATE_KEY_NAME, wfReq.getBizStartDate());
		}
		
		if (variables == null || variables.isEmpty()) {
			taskService.complete(task.getId());
		} else {
			taskService.complete(task.getId(), variables);
		}
	}
	
	/**
	 * 
	 * @see com.cf.workflow.interfaces.WorkflowServiceInter#updateTaskVariable(com.cf.workflow.entity.WorkflowRequest)
	 */
	@Override
	public void updateTaskVariable(WorkflowRequest wfReq) {
		// TODO Auto-generated method stub
		Task task = null;
		String userId = wfReq.getUserId();
		task = getTask(wfReq);
		if (task == null) {
			throw new TaskNotFoundException();
		}
		// if need validate use
		Map<String, Object> variablesLocal = wfReq.getVariablesLocal();
		if (variablesLocal != null && !variablesLocal.isEmpty()) {
			taskService.setVariablesLocal(task.getId(), variablesLocal);
		}
		
		Map<String, Object> variables = wfReq.getVariables();
		if (variables == null) {
			variables = Maps.newHashMap();
		}
		if (wfReq.getDigestCust() != null) {
			variables.put(DIGEST_CUST_KEY_NAME, wfReq.getDigestCust());
		}
		if (wfReq.getDigestMerchant() != null) {
			variables.put(DIGEST_MERCHANT_KEY_NAME, wfReq.getDigestMerchant());
		}
		if (wfReq.getDigestOrder() != null) {
			variables.put(DIGEST_ORDER_KEY_NAME, wfReq.getDigestOrder());
		}
		if (wfReq.getDigestProduct() != null) {
			variables.put(DIGEST_PRODUCT_KEY_NAME, wfReq.getDigestProduct());
		}
		if (wfReq.getBizStartDate() != null) {
			variables.put(BIZ_START_DATE_KEY_NAME, wfReq.getBizStartDate());
		}
		
		if (variables == null || variables.isEmpty()) {
			taskService.setVariables(task.getId(), variables);
		} 
		
	}


	@Override
	public void deleteByBizKey(String processDefinitionKey, String bizKey, String reason) {
		logger.info("[deleteByBizKey]pdKey:{},bizKey:{},reason:{}",processDefinitionKey, bizKey, reason);
		ProcessInstanceQuery piQuery = runtimeService.createProcessInstanceQuery();
		if (bizKey == null) {
			throw new WorkflowInfoMissException(); 
		}
		if (processDefinitionKey != null) {
			piQuery.processDefinitionKey(processDefinitionKey);
		}
		
		piQuery.processInstanceBusinessKey(bizKey);
		ProcessInstance pi = piQuery.singleResult();
		if (pi == null) {
			logger.error("流程不存在！bizKey:{}",bizKey);
			return;
		}
		reason = (reason == null ? "NO_REASON" : reason);
		runtimeService.deleteProcessInstance(pi.getId(), reason);
	}
	
	@Override
	public void completeByBizKey(WorkflowRequest wfReq) {
		logger.info("[completeByBizKey]bizKey:{}",wfReq.getBusinessKey());
		String bizKey = wfReq.getBusinessKey();
		List<Task> tasks = getTaskListByBizKey(wfReq.getProcessDefinitionKey(), bizKey);
		if (tasks != null && !tasks.isEmpty()) {
			Map<String, Object> variables = wfReq.getVariables();
			for (Task task : tasks) {
				if (variables == null || variables.isEmpty()) {
					taskService.complete(task.getId());
				} else {
					Map<String, Object> pVariables = task.getProcessVariables();
					pVariables.putAll(variables);
					taskService.complete(task.getId(), pVariables);
				}
			}
		} else {
			logger.error("tasks not found!");
		}
	}
	
	private Task getTaskByBizKey(String processDefinitionKey, String bizKey) {
		Task task = null;
//		TaskQuery query = taskService.createTaskQuery().processVariableValueEquals("bizKey", bizKey);
		TaskQuery query = taskService.createTaskQuery().processDefinitionKey(processDefinitionKey).processInstanceBusinessKey(bizKey);
		List<Task> tasks = query.list();
		if (tasks == null || tasks.isEmpty()) {
			query = taskService.createTaskQuery().processVariableValueEquals("bizKey", bizKey);
			tasks = query.list();
			if (tasks == null || tasks.isEmpty()) {
				logger.error("task not found!");
				return task;
			}
		}
		if (tasks.size() > 1){
			logger.error("task more than one");
		} else {
			task = tasks.get(0);
		}
		return task;
	}


	@Override
	public ActivitiTask loadTaskByBizKey(String processDefinitionKey, String bizKey) {
//		logger.info("[workflow/loadTaskByBizKey]bizKey:{}",bizKey);
		ActivitiTask activitiTask = null;
		Task task = getTaskByBizKey(processDefinitionKey, bizKey);
		if (task == null) {
			logger.error("task not found!");
		} else {
			activitiTask = createAndCovert(task);
		}
		return activitiTask;
	}

	@Override
	public ActivitiTask loadTaskByBizKeyIncludeProcVar(String processDefinitionKey,String bizKey) {
//		logger.info("[workflow/loadTaskByBizKeyIncludeProcVar]bizKey:{}",bizKey);
		ActivitiTask activitiTask = null;
		Task task = getTaskByBizKey(processDefinitionKey, bizKey);
		
		if (task == null) {
			logger.error("task not found!");
		} else {

			activitiTask = createAndCovert(task);
			ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(task.getProcessInstanceId()).includeProcessVariables().singleResult();
			if (processInstance == null) {
				throw new RuntimeException("流程不存在");
			}
			Map<String, Object> vars = processInstance.getProcessVariables();
			activitiTask.setProcessVariables(vars);
		}
		return activitiTask;
	}

	/**
	 * 根据bizKey查询可能存在多条task的数据
	 */
	@Override
	public List<ActivitiTask> loadTaskListByBizKey(String processDefinitionKey, String bizKey) {
//		logger.info("[workflow/loadTaskListByBizKey]bizKey:{}",bizKey);
		List<ActivitiTask> activitiTaskList = Lists.newArrayList();
		List<Task> tasks = getTaskListByBizKey(processDefinitionKey, bizKey);
		if (tasks == null || tasks.isEmpty()) {
			logger.error("task not found!");
			return activitiTaskList;
		}
		for (Task one : tasks) {
			ActivitiTask activitiTask = createAndCovert(one);
			activitiTaskList.add(activitiTask);
		}
		return activitiTaskList;
	}


	private List<Task> getTaskListByBizKey(String processDefinitionKey, String bizKey) {
//		TaskQuery query = taskService.createTaskQuery().processVariableValueEquals("bizKey", bizKey);
		TaskQuery query = taskService.createTaskQuery().processInstanceBusinessKey(bizKey);
		List<Task> tasks = query.list();
		return tasks;
	}
	
	/**
	 * 任务分配，设置处理人
	 * @param taskId
	 * @param userId
	 * @throws TaskNotFoundException
	 */
	@Override
	public void setAssignee (String taskId, String userId) throws TaskNotFoundException{
		try {
			taskService.setAssignee(taskId, userId);
		} catch (ActivitiObjectNotFoundException ex) {
			throw new TaskNotFoundException();
		}
		
	}
	
	@Override
	public List<HistoricTaskObject> loadHistory(WorkflowRequest wfReq){
		//String taskId = wfReq.getTaskId();
		Task task = getTask(wfReq);
		boolean isIncludeTaskLocalVariables = wfReq.isIncludeTaskLocalVariables();
//		List<Comment> comments = taskService.getProcessInstanceComments(task.getProcessInstanceId());
		HistoricTaskInstanceQuery hisQuery = historyService.createHistoricTaskInstanceQuery().processInstanceId(task.getProcessInstanceId());
		if (isIncludeTaskLocalVariables) {
			hisQuery = hisQuery.includeTaskLocalVariables();
		}
			
	    List<HistoricTaskInstance> hist =	hisQuery.list();
	    List<HistoricTaskObject> hisList = new ArrayList<>();
	    HistoricTaskObject historicTaskObject = null ;
	    for(HistoricTaskInstance his :hist){
	    	
	    	historicTaskObject = new HistoricTaskObject();
	    	historicTaskObject.setEndTime(his.getEndTime());
	    	historicTaskObject.setId(his.getId());
	    	historicTaskObject.setName(his.getName());
	    	historicTaskObject.setStartTime(his.getStartTime());
	    	historicTaskObject.setAssignee(his.getAssignee());
	    
	    	//将毫秒转换成天 时 分 秒
//	    	historicTaskObject.setDurationInMillis(his.getDurationInMillis()==null ? "":formatDateString(his.getDurationInMillis()));
	    	historicTaskObject.setExecutionId(his.getExecutionId());
	    	historicTaskObject.setOwner(his.getOwner());
	    	his.getTaskLocalVariables();
//			for (Comment cmt : comments) {
//				if (his.getId().equals(cmt.getTaskId())) {
//					historicTaskObject.setFullMessage(cmt.getFullMessage());
//				}
//			}
	    	
			if (isIncludeTaskLocalVariables) {
				historicTaskObject.setTaskVariables(his.getTaskLocalVariables());
			}
			
	    	hisList.add(historicTaskObject);
	    }
	    return hisList;
	}


	@Override
	public ActivitiTask loadTask(WorkflowRequest wfReq) {
		String taskId = wfReq.getTaskId();
		ActivitiTask activitiTask = null;
		TaskQuery query = createGetTaskQuery(wfReq);
		if (wfReq.isIncludeTaskLocalVariables()) {
			query = query.includeTaskLocalVariables();
		}
		if (wfReq.isIncludeProcessVariables()) {
			query = query.includeProcessVariables();
		}
		Task task = query.singleResult();
		if (task == null) {
			logger.error("task not found!");
		} else {
			activitiTask = createAndCovert(task);
		}
		return activitiTask;
	}

	private TaskQuery createGetTaskQuery(WorkflowRequest wfReq) {
		TaskQuery query = null;
		String taskId = wfReq.getTaskId();
		String processDefinitionKey = wfReq.getProcessDefinitionKey();
		String businessKey = wfReq.getBusinessKey();
		String taskName = wfReq.getTaskName();
		if (taskId != null) {
			query = taskService.createTaskQuery().taskId(taskId);
		} else if (processDefinitionKey != null && businessKey != null && taskName != null){		
			query = taskService.createTaskQuery()
					.processDefinitionKey(processDefinitionKey)
					.processInstanceBusinessKey(businessKey)
					.taskName(taskName);
		} else {
			throw new WorkflowInfoMissException();
		}
		return query;
	}
	
	@Override
	public List<HistoricTaskObject> loadHistoryByBizKey(WorkflowRequest wfReq){
		String processDefinitionKey = wfReq.getProcessDefinitionKey();
		String bizKey = wfReq.getBusinessKey();
		HistoricProcessInstanceQuery hisProcQuery = historyService.createHistoricProcessInstanceQuery();
		//hisProcQuery = hisProcQuery.processDefinitionKey(processDefinitionKey);
		HistoricProcessInstance hisProc = hisProcQuery.processInstanceBusinessKey(bizKey).singleResult();
		HistoricTaskInstanceQuery hisTaskQuery = historyService.createHistoricTaskInstanceQuery();
		
		String processInstanceId = hisProc.getId(); // The process instance id
		
		hisTaskQuery = hisTaskQuery.processInstanceId(processInstanceId);
//		List<HistoricTaskInstance> tasks = hisTaskQuery.finished().orderByHistoricTaskInstanceEndTime().desc().list();
		boolean isIncludeTaskLocalVariables = wfReq.isIncludeTaskLocalVariables();
//		List<Comment> comments = taskService.getProcessInstanceComments(processInstanceId);
		HistoricTaskInstanceQuery hisQuery = historyService.createHistoricTaskInstanceQuery().processInstanceId(processInstanceId);
		hisQuery.finished().orderByHistoricTaskInstanceEndTime().desc();
		if (isIncludeTaskLocalVariables) {
			hisQuery.includeTaskLocalVariables();
		}
		if (wfReq.getTaskNameIn() != null && !wfReq.getTaskNameIn().isEmpty()) {
			hisQuery.taskNameIn(wfReq.getTaskNameIn());
		}
		//查历史行为活动节点
		/*HistoricActivityInstanceQuery histsQ =historyService.createHistoricActivityInstanceQuery().processInstanceId(processInstanceId);
		histsQ.finished().orderByHistoricActivityInstanceEndTime().desc();
		List<HistoricActivityInstance> hists = histsQ.list();
		List<String> subActInstance = Lists.newArrayList();
		for(HistoricActivityInstance his :hists){
			//查子流程
			if(!FormTools.isNull(his.getCalledProcessInstanceId())){
				subActInstance.add(his.getCalledProcessInstanceId());
				break;
			}
		}
		Iterator<String> subList = subActInstance.iterator();
		HistoricTaskInstance maxsubhis = historyService.createHistoricTaskInstanceQuery().processInstanceId(subActInstance.get(0))
				   .finished().orderByHistoricTaskInstanceEndTime().desc()
				   .list().get(0);*/
	    List<HistoricTaskInstance> hist =	hisQuery.list();
	    List<HistoricTaskObject> hisList = new ArrayList<>();
	    HistoricTaskObject historicTaskObject = null ;
	    for(HistoricTaskInstance his :hist){
	    	historicTaskObject = new HistoricTaskObject();
	    	historicTaskObject.setEndTime(his.getEndTime());
	    	historicTaskObject.setId(his.getId());
	    	historicTaskObject.setName(his.getName());
	    	historicTaskObject.setStartTime(his.getStartTime());
	    	historicTaskObject.setAssignee(his.getAssignee());
	    
	    	//将毫秒转换成天 时 分 秒
//	    	historicTaskObject.setDurationInMillis(his.getDurationInMillis()==null ? "":formatDateString(his.getDurationInMillis()));
	    	historicTaskObject.setExecutionId(his.getExecutionId());
	    	historicTaskObject.setOwner(his.getOwner());
	    	his.getTaskLocalVariables();
//			for (Comment cmt : comments) {
//				if (his.getId().equals(cmt.getTaskId())) {
//					historicTaskObject.setFullMessage(cmt.getFullMessage());
//				}
//			}
	    	
			if (isIncludeTaskLocalVariables) {
				historicTaskObject.setTaskVariables(his.getTaskLocalVariables());
			}
			hisList.add(historicTaskObject);
	    }
	    return hisList;
	}
	
	/**
	 * 
	 * @param processDefinitionId
	 * @return
	 */
//    public Map<String, String> getProcessDefinitionMap() {
//        if (PROCESS_DEFINITION_CACHE == null || PROCESS_DEFINITION_CACHE.isEmpty()) {
//    		loadProcessDefinitionMap();
//        }
//        return PROCESS_DEFINITION_CACHE;
//    }
//
//
//	private Map<String, String> loadProcessDefinitionMap() {
//		PROCESS_DEFINITION_CACHE = Maps.newHashMap();
//		ProcessDefinitionQuery procDefQuery = repositoryService.createProcessDefinitionQuery().orderByDeploymentId().asc();
//		List<ProcessDefinition> procDefList = procDefQuery.list();
//		for (ProcessDefinition pd : procDefList) {
//			logger.debug("pdid:{}",pd.getId());
//			String[] pdIdSplit = pd.getId().split(":");
//			PROCESS_DEFINITION_CACHE.put(pdIdSplit[0], pd.getName());  // key:custEarlyRepay,value:客户提前还款流程
//		}
//		return PROCESS_DEFINITION_CACHE;
//	}

	/**
	 * 根据taskId 或者 bizKey 获取 工作流任务
	 * @param wfReq
	 * @return
	 */
	private Task getTask(WorkflowRequest wfReq) {
		TaskQuery query = createGetTaskQuery(wfReq);
		return query.singleResult();
	}


	@Override
	public byte[] generateDiagram(String processInstanceId) throws IOException {
		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
		String processDefinitionId = null;
		boolean isRuntime = true;
		if (processInstance != null) { // 先从runtime找
			processDefinitionId = processInstance.getProcessDefinitionId();
		} else { // 找不到从historic找
			isRuntime = false;
			HistoricProcessInstance hisProcessInstance = historyService.createHistoricProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
			if (hisProcessInstance != null) {
				processDefinitionId = hisProcessInstance.getProcessDefinitionId();
			} else { // 再找不到抛异常
				throw new ProcessInstanceNotFoundException();
			}
		}

		BpmnModel bpmnModel = repositoryService.getBpmnModel(processDefinitionId);
		List<String> activeActivityIds = Lists.newArrayList();;
		if (processInstance != null) { // runtime
			activeActivityIds = runtimeService.getActiveActivityIds(processInstanceId);
		}
		
		processEngineConfiguration = processEngine.getProcessEngineConfiguration();
		Context.setProcessEngineConfiguration((ProcessEngineConfigurationImpl) processEngineConfiguration);

		ProcessDiagramGenerator diagramGenerator = processEngineConfiguration.getProcessDiagramGenerator();
		ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) repositoryService.getProcessDefinition(processDefinitionId);

		List<String> highLightedFlows = getHighLightedFlows(processInstanceId, processDefinition, isRuntime);
		InputStream imageStream = diagramGenerator.generateDiagram(
				bpmnModel,
				"png",
				activeActivityIds,
				highLightedFlows, //Collections.<String>emptyList(),
				processEngine.getProcessEngineConfiguration().getActivityFontName(), 
				processEngine.getProcessEngineConfiguration().getLabelFontName(),
				processEngine.getProcessEngineConfiguration().getLabelFontName(),
				null,
				1.0);
		
		byte[] bytes = IOUtils.toByteArray(imageStream);
		return bytes;
	}


	private List<String> getHighLightedFlows(String processInstanceId, ProcessDefinitionEntity processDefinition, boolean isRuntime) {

		List<String> highLightedFlows = Lists.newArrayList();
		List<HistoricActivityInstance> historicActivityInstances = historyService.createHistoricActivityInstanceQuery()
				.processInstanceId(processInstanceId).orderByHistoricActivityInstanceStartTime().asc().list();

		List<String> historicActivityInstanceList =  Lists.newArrayList();
		for (HistoricActivityInstance hai : historicActivityInstances) {
			historicActivityInstanceList.add(hai.getActivityId());
		}

		// add current activities to list
		if (isRuntime) {
			List<String> highLightedActivities = runtimeService.getActiveActivityIds(processInstanceId);
			historicActivityInstanceList.addAll(highLightedActivities);
		}

		// activities and their sequence-flows
		for (ActivityImpl activity : processDefinition.getActivities()) {
			// int index = historicActivityInstanceList.indexOf(activity.getId());
			// 修复流程有循环时，重复的gateway后的flow缺失高亮的问题
			List<Integer> indexList = findAllInList(historicActivityInstanceList, activity.getId());
			for (Integer index : indexList) {
				if (index >= 0 && index + 1 < historicActivityInstanceList.size()) {
					List<PvmTransition> pvmTransitionList = activity.getOutgoingTransitions();
					for (PvmTransition pvmTransition : pvmTransitionList) {
						String destinationFlowId = pvmTransition.getDestination().getId();
						if (destinationFlowId.equals(historicActivityInstanceList.get(index + 1))) {
							highLightedFlows.add(pvmTransition.getId());
						}
					}
				}
			}
		}
		return highLightedFlows;
	}

	private List<Integer> findAllInList(List<String> list, String search) {
		List<Integer> results = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
		    if (search.equals(list.get(i)) ) {
		        // found value at index i
		        results.add(i);
		    }
		}
		return results;
	}

	@Override
	public List<ActivitiTask> loadAvailableTasks(String bizKey, String name, Set<String> authSet) {
		List<ActivitiTask> resultList = Lists.newArrayList();
		TaskQueryCriteria criteria = new TaskQueryCriteria();
		criteria.setBizKey(bizKey);
		List<Task> taskList = fetchTaskForUserOrGroup(criteria, name, authSet);
		for (Task task : taskList) {
			resultList.add(createAndCovert(task));
		}
		return resultList;
	}
	
	@Override
	public Map<String, ActivitiTask> getTaskMapByProcInstIds(String processDefinitionKey, List<String> procInstIds) {
		List<ActivitiTask> resultList = Lists.newArrayList();
		Map<String, ActivitiTask> resultMap = Maps.newLinkedHashMap();
		TaskQuery query = taskService.createTaskQuery().processDefinitionKey(processDefinitionKey).processInstanceIdIn(procInstIds);
		query.orderByTaskCreateTime().desc();
		List<Task> taskList = query.list();
		
		for (Task one : taskList) {
			resultList.add(createAndCovert(one));
		}
		
		for (ActivitiTask one : resultList) {
			resultMap.put(one.getProcInstId(), one);
		}
		return resultMap;
	}
	
	@Override
	public List<ActivitiTask> getTasksByTaskName(String processDefinitionKey, String taskName) {
		List<ActivitiTask> resultList = Lists.newArrayList();
		TaskQuery query = taskService.createTaskQuery().processDefinitionKey(processDefinitionKey).taskName(taskName);
		query.orderByTaskCreateTime().desc();
		List<Task> taskList = query.list();
		
		for (Task one : taskList) {
			resultList.add(createAndCovert(one));
		}
		
		return resultList;
	}
	
	/**
	select distinct RES.*, 
		DEF.KEY_ as PROC_DEF_KEY_, DEF.NAME_ as PROC_DEF_NAME_, DEF.VERSION_ as PROC_DEF_VERSION_, DEF.DEPLOYMENT_ID_ as DEPLOYMENT_ID_ 
	from ACT_HI_PROCINST RES 
		left outer join ACT_RE_PROCDEF DEF on RES.PROC_DEF_ID_ = DEF.ID_ 
		inner join ACT_HI_VARINST A0 on RES.PROC_INST_ID_ = A0.PROC_INST_ID_ 
		inner join ACT_HI_VARINST A1 on RES.PROC_INST_ID_ = A1.PROC_INST_ID_ 
		inner join ACT_HI_VARINST A2 on RES.PROC_INST_ID_ = A2.PROC_INST_ID_ 
		inner join ACT_HI_VARINST A3 on RES.PROC_INST_ID_ = A3.PROC_INST_ID_ 
		inner join ACT_HI_VARINST A4 on RES.PROC_INST_ID_ = A4.PROC_INST_ID_ 
	WHERE DEF.KEY_ IN ( 'perApp-cashLoan', 'perApp-ordinaryFinProdSign', 'perApp-secondHandCar' ) 
	and RES.BUSINESS_KEY_ = ? 
	and DEF.KEY_ = ? 
	and A0.NAME_= 'digestCust' and A0.VAR_TYPE_ = 'string' and A0.TEXT_ LIKE ? 
	and A1.NAME_= 'digestMerchant' and A1.VAR_TYPE_ = 'string' and A1.TEXT_ LIKE ? 
	and A2.NAME_= 'digestOrder' and A2.VAR_TYPE_ = 'string' and A2.TEXT_ LIKE ? 
	and A3.NAME_= 'bizStartDate' and A3.VAR_TYPE_ = 'date' and A3.LONG_ >= ? 
	and A4.NAME_= 'bizStartDate' and A4.VAR_TYPE_ = 'date' and A4.LONG_ <= ? 
	order by RES.END_TIME_ desc 
	LIMIT ? OFFSET ?
 */
	
	/*@Override
	public FetchResponse<ActivitiTask> fetchWorkHisListOpt(TaskQueryCriteria taskQueryCriteria) {
		FetchResponse<ActivitiTask> fetchResponse = new FetchResponse<>();
		List<ActivitiTask> result = new ArrayList<ActivitiTask>();
		
		NativeHistoricProcessInstanceQuery queryCount = historyService.createNativeHistoricProcessInstanceQuery();
		
		String innerJoinAll = "";

		String nativeSqlSelect = "";
		String nativeSqlCount = "";
		String sqlCount = "select count(*) ";
		String sqlSelect = "select distinct RES.*, "
				+ "DEF.KEY_ as PROC_DEF_KEY_, DEF.NAME_ as PROC_DEF_NAME_, DEF.VERSION_ as PROC_DEF_VERSION_, DEF.DEPLOYMENT_ID_ as DEPLOYMENT_ID_  ";
	
		String sqlFromFix = "from " +  managementService.getTableName(HistoricProcessInstance.class) + " RES " // ACT_HI_PROCINST
				+ "left outer join " + managementService.getTableName(ProcessDefinition.class) + " DEF on RES.PROC_DEF_ID_ = DEF.ID_ "; // ACT_RE_PROCDEF
		
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestCust())) {
			innerJoinAll += generateHistoricProcessInnerJoinSql("A0"); // inner join ACT_HI_VARINST A0 on RES.PROC_INST_ID_ = A0.PROC_INST_ID_ 
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestMerchant())) {
			innerJoinAll += generateHistoricProcessInnerJoinSql("A1"); // inner join ACT_HI_VARINST A1 on RES.PROC_INST_ID_ = A1.PROC_INST_ID_ 
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestOrder())) {
			innerJoinAll += generateHistoricProcessInnerJoinSql("A2"); // inner join ACT_HI_VARINST A2 on RES.PROC_INST_ID_ = A2.PROC_INST_ID_ 
		}
		if (taskQueryCriteria.getBizStartDateBegin() != null) {
			innerJoinAll += generateHistoricProcessInnerJoinSql("A3"); // inner join ACT_HI_VARINST A3 on RES.PROC_INST_ID_ = A3.PROC_INST_ID_ 
		}
		if (taskQueryCriteria.getBizStartDateEnd() != null) {
			innerJoinAll += generateHistoricProcessInnerJoinSql("A4"); // inner join ACT_HI_VARINST A4 on RES.PROC_INST_ID_ = A4.PROC_INST_ID_ 
		}
		
		String sqlWhere = "WHERE DEF.KEY_ IN ( 'myProcess','process_pool1' ) ";
		
		if (StringUtils.isNotBlank(taskQueryCriteria.getBizKey())) {
			sqlWhere += "and RES.BUSINESS_KEY_ = #{businessKey} ";
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getProcessDefinitionKey())) {
			sqlWhere += "and DEF.KEY_ = #{processDefinitionKey} ";
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestCust())) {
			sqlWhere += "and A0.NAME_= '" + DIGEST_CUST_KEY_NAME + "' and A0.VAR_TYPE_ = 'string' and A0.TEXT_ LIKE #{" + DIGEST_CUST_KEY_NAME + "} ";
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestMerchant())) {
			sqlWhere += "and A1.NAME_= '" + DIGEST_MERCHANT_KEY_NAME + "' and A1.VAR_TYPE_ = 'string' and A1.TEXT_ LIKE #{" + DIGEST_MERCHANT_KEY_NAME + "} ";
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestOrder())) {
			sqlWhere += "and A2.NAME_= '" + DIGEST_ORDER_KEY_NAME + "' and A2.VAR_TYPE_ = 'string' and A2.TEXT_ LIKE #{" + DIGEST_ORDER_KEY_NAME + "} ";
		}
		if (taskQueryCriteria.getBizStartDateBegin() != null) {
			sqlWhere += "and A3.NAME_= '" + BIZ_START_DATE_KEY_NAME + "' and A3.VAR_TYPE_ = 'date' and A3.LONG_ >= #{" + "bizStartDateBegin" + "} ";
		}
		if (taskQueryCriteria.getBizStartDateEnd() != null) {
			sqlWhere += "and A4.NAME_= '" + BIZ_START_DATE_KEY_NAME + "' and A4.VAR_TYPE_ = 'date' and A4.LONG_ <= #{" + "bizStartDateEnd" + "} ";
		}
		String sqlOrderBy = "order by RES.END_TIME_ desc";
		
		nativeSqlCount = sqlCount + sqlFromFix + innerJoinAll + sqlWhere;
		
		queryCount.sql(nativeSqlCount);
		
		setParameterHistoricProcess(taskQueryCriteria, queryCount);
	
		long rowCount = queryCount.sql(nativeSqlCount).count();
		if (rowCount != 0) {
			NativeHistoricProcessInstanceQuery query = historyService.createNativeHistoricProcessInstanceQuery();
			nativeSqlSelect = sqlSelect + sqlFromFix + innerJoinAll + sqlWhere + sqlOrderBy;
			query.sql(nativeSqlSelect);
			setParameterHistoricProcess(taskQueryCriteria, query);
			
			List<HistoricProcessInstance> processList;
			Range range = taskQueryCriteria.getRange();
			if (range != null) {
				processList = query.listPage(range.getStart(), range.getLength());
			} else {
				processList = query.list();
			}
			
			Set<String> procIds = Sets.newHashSet(Collections2.transform(processList, new Function<HistoricProcessInstance, String>() {
				@Override
				@Nullable
				public String apply(@Nullable HistoricProcessInstance input) {
					return input.getId();
				}
			}));
			HistoricVariableInstanceQuery vQuery = historyService.createHistoricVariableInstanceQuery();
			vQuery.excludeTaskVariables();
			vQuery.executionIds(procIds);
			vQuery.variableName(DIGEST_CUST_KEY_NAME);
			List<HistoricVariableInstance> vListDigestCust = vQuery.list();
			vQuery.variableName(DIGEST_MERCHANT_KEY_NAME);
			List<HistoricVariableInstance> vListDigestMerchant = vQuery.list();
			vQuery.variableName(DIGEST_ORDER_KEY_NAME);
			List<HistoricVariableInstance> vListDigestOrder = vQuery.list();
			Function<HistoricVariableInstance, String> mapFunction = new Function<HistoricVariableInstance, String>() {
				public String apply(HistoricVariableInstance from) {
					return from.getProcessInstanceId();
				}
			};
			Map<String, HistoricVariableInstance> mapDigestCust = Maps.uniqueIndex(vListDigestCust, mapFunction);
			Map<String, HistoricVariableInstance> mapDigestMerchant = Maps.uniqueIndex(vListDigestMerchant, mapFunction);
			Map<String, HistoricVariableInstance> mapDigestOrder = Maps.uniqueIndex(vListDigestOrder, mapFunction);
						
			for (HistoricProcessInstance processInstance : processList) {
				result.add(createAndCovertHistoricProcessInstance(processInstance));	
			}
			covertHistoricProcessInstanceVars(result, mapDigestCust, mapDigestMerchant, mapDigestOrder);
		}
	
		fetchResponse.setData(result);
		fetchResponse.setRowCount(rowCount);
		if ( taskQueryCriteria.getRange() != null) {
			fetchResponse.setStart(taskQueryCriteria.getRange().getStart());
		}
		return fetchResponse;

	}TODO:SYW*/
	
	private void setParameterHistoricProcess(TaskQueryCriteria taskQueryCriteria, NativeHistoricProcessInstanceQuery query) {
		if (StringUtils.isNotBlank(taskQueryCriteria.getBizKey())) {
			query.parameter("businessKey", taskQueryCriteria.getBizKey());
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getProcessDefinitionKey())) {
			query.parameter("processDefinitionKey", taskQueryCriteria.getProcessDefinitionKey());
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestCust())) {
			query.parameter(DIGEST_CUST_KEY_NAME, '%' + taskQueryCriteria.getDigestCust() + '%');
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestMerchant())) {
			query.parameter(DIGEST_MERCHANT_KEY_NAME, '%' + taskQueryCriteria.getDigestMerchant() + '%');
		}
		if (StringUtils.isNotBlank(taskQueryCriteria.getDigestOrder())) {
			query.parameter(DIGEST_ORDER_KEY_NAME, '%' + taskQueryCriteria.getDigestOrder() + '%');
		}
		if (taskQueryCriteria.getBizStartDateBegin() != null) {
			query.parameter("bizStartDateBegin", taskQueryCriteria.getBizStartDateBegin().getTime());
		}
		if (taskQueryCriteria.getBizStartDateEnd() != null) {
			query.parameter("bizStartDateEnd", taskQueryCriteria.getBizStartDateEnd().getTime());
		}
	}
	
	@Override
	public FetchResponse<ActivitiTask> fetchWorkHisListOpt(TaskQueryCriteria taskQueryCriteria) {
		// TODO Auto-generated method stub
		return null;
	}


	private String generateHistoricProcessInnerJoinSql(String alias) {
		return "inner join ACT_HI_VARINST " + alias + " on RES.PROC_INST_ID_ = " + alias + ".PROC_INST_ID_ ";
	}
	
	
	private void covertHistoricProcessInstanceVars(List<ActivitiTask> processInstance,
			Map<String, HistoricVariableInstance> mapDigestCust,
			Map<String, HistoricVariableInstance> mapDigestMerchant,
			Map<String, HistoricVariableInstance> mapDigestOrder) {
	
		for (ActivitiTask one : processInstance) {
			HistoricVariableInstance custVar = mapDigestCust.get(one.getProcInstId());
			HistoricVariableInstance merVar = mapDigestMerchant.get(one.getProcInstId());
			HistoricVariableInstance orderVar = mapDigestOrder.get(one.getProcInstId());
			if (custVar != null){
				one.setDigestCust((String)custVar.getValue());
			}
			if (merVar != null){
				one.setDigestMerchant((String)merVar.getValue());
			}
			if (custVar != null){
				one.setDigestOrder((String)orderVar.getValue());
			}
		}
	}
	
	@Override
	public List fetchWorkFormList(String taskId) throws Exception{
		TaskFormData formData=formService.getTaskFormData(taskId);
		List<FormProperty>  forms = formData.getFormProperties();
		List result = Lists.newArrayList();
		for(FormProperty form : forms){
			Map temp = FormTools.mapperBeanToMap(form);
			result.add(temp);
		}
		return forms;
	}

}
