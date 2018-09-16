package com.cf.workflow.server;


import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.HistoryService;
import org.activiti.engine.ManagementService;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricTaskInstanceQuery;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.runtime.ProcessInstanceBuilder;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.activiti.spring.ProcessEngineFactoryBean;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.cf.forms.FormTools;
import com.cf.workflow.entity.ActivitiProcessInstance;
import com.cf.workflow.entity.ActivitiTask;
import com.cf.workflow.entity.FetchResponse;
import com.cf.workflow.entity.Range;
import com.cf.workflow.entity.TaskQueryCriteria;
import com.cf.workflow.entity.WorkflowRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@Controller
@RequestMapping("/workserver")
public class WorkflowServer {
	private Logger logger = LoggerFactory.getLogger(WorkflowServer.class);
	private final static String BIZ_KEY_KEY_NAME = "bizKey";
	
	protected static Map<String, String> PROCESS_DEFINITION_CACHE = Maps.newHashMap();
	
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
    
    
    /**
	 * 起流程
	 * @param req
     * @throws Exception 
	 * @throws ProcessException
	 */
	@Transactional
	@RequestMapping("/start.do")
	@ResponseStatus(value = HttpStatus.OK)
	public Map startProcessInstanceByKey(String json) throws Exception {
		WorkflowRequest req= FormTools.mapperJsonToBean(json, WorkflowRequest.class);
		ActivitiProcessInstance instace = new ActivitiProcessInstance();
		String key = req.getProcessDefinitionKey();
		String bizKey = req.getBusinessKey();
		logger.info("[startProcessInstanceByKey]key:{},bizKey:{}",key,bizKey);

		// add an extra variable to each process instance that wants to make use of the skip feature
//		vars.put("_ACTIVITI_SKIP_EXPRESSION_ENABLED", true); // 开启隐藏的SKIP功能
		ProcessInstanceBuilder builder = runtimeService.createProcessInstanceBuilder().processDefinitionKey(key).businessKey(bizKey).processInstanceName(key);
//		vars.put(BIZ_KEY_KEY_NAME, req.getBusinessKey());

		builder.addVariable(BIZ_KEY_KEY_NAME, req.getBusinessKey());
		Map<String, Object> vars = req.getVariables();
		
		ProcessInstance pi = builder.start(); // runtimeService.startProcessInstanceByKey(key, bizKey, vars);
		
		logger.info("[startProcessInstanceByKey]id:{},processInstanceId:{}",pi.getId(),pi.getProcessInstanceId());
		
		ActivitiProcessInstance result = new ActivitiProcessInstance();
		result.setProcessInstanceId(pi.getProcessInstanceId());
		instace.setProcessInstanceId(req.getProcessDefinitionKey());
		return FormTools.mapperBeanToMap(instace);//workflowServiceInter.startProcessInstanceByKey(req);
	}
	
	
	/**
	 * 我的工作台
	 * @param taskQueryCriteria
	 * @return
	 * @throws Exception 
	 */
	@Transactional
	@RequestMapping("/workBench.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void fetchWorkBenchList(String json,HttpServletRequest reqs,HttpServletResponse reps) throws Exception {
		TaskQueryCriteria taskQueryCriteria= FormTools.mapperJsonToBean(json, TaskQueryCriteria.class);
		FetchResponse<ActivitiTask> fetch= null;
		logger.info("[workflow/workBench]");
		String name = "admin";//SecurityContextHolder.getContext().getAuthentication().getName();
		List<ActivitiTask> result = new ArrayList<ActivitiTask>();
		TaskQuery query = createFetchTaskForUserOrGroupQuery(taskQueryCriteria, null, null);
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
		    HistoricTaskInstance hist = hisQuery.finished().orderByHistoricTaskInstanceEndTime().desc().singleResult();
		    activitiTask.setLastAssignee(hist==null?null:hist.getAssignee());
		    result.add(activitiTask);
		}
		fetchResponse.setData(result);
		fetchResponse.setRowCount(rowCount);
		if ( taskQueryCriteria.getRange() != null) {
			fetchResponse.setStart(taskQueryCriteria.getRange().getStart());
		}
		reps.setContentType("text/html;charset=utf-8");
		PrintWriter out=reps.getWriter();
		out.println(new ObjectMapper().writeValueAsString(FormTools.mapperBeanToMap(fetchResponse)));
		out.flush();
		out.close();
		//return FormTools.mapperBeanToMap(fetchResponse);
	}
	
	private TaskQuery createFetchTaskForUserOrGroupQuery(TaskQueryCriteria taskQueryCriteria, String oprId,	Set<String> authSet) {
		TaskQuery query = taskService.createTaskQuery();
		addFilterToQuery(taskQueryCriteria, query);
		if (oprId != null && authSet != null) {
			List<String> authList = Lists.newArrayList(authSet);
			query.or()
				.taskAssignee(oprId)
				.taskCandidateGroupIn(authList)
			.endOr();
		}
//		query = query.orderByTaskId().desc();
//		query.orderByTaskCreateTime().desc();
		return query;
	}
	
	private void addFilterToQuery(TaskQueryCriteria taskQueryCriteria, TaskQuery query) {
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
		
	}
	
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
	
}
