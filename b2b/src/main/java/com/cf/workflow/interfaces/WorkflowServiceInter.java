package com.cf.workflow.interfaces;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Controller;

import com.cf.workflow.entity.ActivitiProcessInstance;
import com.cf.workflow.entity.ActivitiTask;
import com.cf.workflow.entity.FetchResponse;
import com.cf.workflow.entity.HistoricTaskObject;
import com.cf.workflow.entity.TaskQueryCriteria;
import com.cf.workflow.entity.WorkflowRequest;
import com.cf.workflow.exception.TaskAlreadyClaimedException;
import com.cf.workflow.exception.TaskNotFoundException;

public interface WorkflowServiceInter {
	/**
	 * 启流程
	 * @param req
	 */
	public ActivitiProcessInstance startProcessInstanceByKey(WorkflowRequest req);
	
	/**
	 * 启流程 批量
	 * @param reqList
	 */
	public void startProcessInstanceByKey(List<WorkflowRequest> reqList);

	
	/**
	 * 任务领取
	 * @deprecated replaced by {@link #dealTask()}
	 * @param taskId
	 * @param userId
	 */
	public void claimTask(String taskId, String userId);

	//FIXME 记得删除
//	public String camelTest(String userId);
	
	/**
	 * 我的工作台
	 * @param taskQueryCriteria
	 * @param oprId
	 * @param authList
	 * @return
	 */
	public FetchResponse<ActivitiTask> fetchWorkBenchList(TaskQueryCriteria taskQueryCriteria, String oprId,
			Set<String> authList);

//	public void processInstanceByKey(WfProcessReq processReq);
	/**
	 * @deprecated
	 * @param bizKey
	 * @param username
	 */
	public void claimTaskByBizKey(String processDefinitionKey, String bizKey, String username);

	/**
	 * 推动工作流
	 * @deprecated
	 * @param wfReq
	 */
	public void completeByBizKey(WorkflowRequest wfReq);

	/**
	 * 
	 * @param taskId
	 * @return
	 */
	public ActivitiTask loadTask(WorkflowRequest wfReq);
	
	/**
	 * 根据bizKey获取一个任务，不包含上下文
	 * @param bizKey
	 * @return
	 */
	public ActivitiTask loadTaskByBizKey(String processDefinitionKey, String bizKey);

	/**
	 * 根据bizKey获取一个任务，包含上下文
	 * @param bizKey
	 * @return
	 */
	public ActivitiTask loadTaskByBizKeyIncludeProcVar(String processDefinitionKey, String bizKey);
	
	/**
	 * 根据bizKey获取所有任务（并行、包含网管会产生多个任务）
	 * @param bizKey
	 * @return
	 */
	public List<ActivitiTask> loadTaskListByBizKey(String processDefinitionKey, String bizKey);

	/**
	 * 推动工作流
	 * @param wfReq
	 */
	public void complete(WorkflowRequest wfReq);
	
	/**
	 * 更新流程变量
	 * @param wfReq
	 */
	public void updateTaskVariable(WorkflowRequest wfReq);
	
	/**
	 * 处理任务处理的请求
	 * @param taskId
	 * @param userId
	 * @return
	 */
	public void dealTask(String taskId, String userId) throws TaskAlreadyClaimedException,TaskNotFoundException;

	/**
	 * 任务分配，设值处理人
	 * @param taskId
	 * @param userId
	 * @throws TaskNotFoundException
	 */
	public void setAssignee(String taskId, String userId) throws TaskNotFoundException;

	/**
	 * 获取历史任务
	 * @param wfReq
	 * @return
	 */
	public List<HistoricTaskObject> loadHistory(WorkflowRequest wfReq);

	/**
	 * 获取历史任务
	 * @param wfReq
	 * @return
	 */
	public List<HistoricTaskObject> loadHistoryByBizKey(WorkflowRequest wfReq);

//	public FetchResponse<ActivitiTask> fetchTodoList(String name, Set<String> authList);

	/**
	 * 释放任务、取消领取
	 * @param wfReq
	 */
	public void unclaimTask(WorkflowRequest wfReq);

	/**
	 * 首页待办事项查询
	 * @param name
	 * @param authList
	 * @param showNum
	 * @return
	 */
	public FetchResponse<ActivitiTask> fetchTodoList(String name, Set<String> authList, Integer showNum);

	/**
	 * 生成流程图
	 * @param processInstanceId
	 * @return
	 * @throws IOException
	 */
	public byte[] generateDiagram(String processInstanceId) throws IOException;

	public List<ActivitiTask> getTaskList(WorkflowRequest requests);

	public List<ActivitiTask> loadAvailableTasks(String bizKey, String name, Set<String> authSet);

	/**
	 * 未结束任务查询
	 * @param taskQueryCriteria
	 * @return
	 */
	public FetchResponse<ActivitiTask> fetchWorkList(TaskQueryCriteria taskQueryCriteria);

	/**
	 * 历史查询
	 * @param taskQueryCriteria
	 * @return
	 */
	public FetchResponse<ActivitiTask> fetchWorkHisList(TaskQueryCriteria taskQueryCriteria);

	/**
	 * 历史查询优化版
	 * @param taskQueryCriteria
	 * @return
	 */
	public FetchResponse<ActivitiTask> fetchWorkHisListOpt(TaskQueryCriteria taskQueryCriteria);

	/**
	 * 结束流程
	 * @param processDefinitionKey
	 * @param bizKey
	 * @param reason
	 */
	public void deleteByBizKey(String processDefinitionKey, String bizKey, String reason);

	/**
	 * 根据流程ID列表获取所有未结束的任务信息
	 * @param processDefinitionKey
	 * @param procInstIds
	 * @return
	 */
	public Map<String, ActivitiTask> getTaskMapByProcInstIds(String processDefinitionKey, List<String> procInstIds);

	/**
	 * 根据任务名获取所有未结束的任务信息
	 * @param processDefinitionKey
	 * @param taskName
	 * @return
	 */
	public List<ActivitiTask> getTasksByTaskName(String processDefinitionKey, String taskName);

	
//	public Object loadVariable(String bizKey, String key, String className);
	/**
	 * 根据任务ID获取表单字段信息
	 * 
	 * @param taskId
	 * @return
	 * @throws Exception
	 */
	public List fetchWorkFormList(String taskId) throws Exception;
}
