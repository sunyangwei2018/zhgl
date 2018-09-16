package com.cf.workflow.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;


public class HistoricTaskObject implements Serializable {
	
	private	String executionId;
	
	private String id;
	
	private  Date startTime;
	
	private  Date endTime;
	
	private	String name;
	 
	private	String assignee;
	
	private	String owner;
	
	private	String durationInMillis;
	
//	@PropertyInfo(name = "审批意见") 
//	private	String fullMessage;
//	
//	@PropertyInfo(name = "审批额度") 
//	private	String limit;
//	
//	@PropertyInfo(name = "审批期限") 
//	private	String expire;
//	
//	@PropertyInfo(name = "拒绝原因") 
//	private	String rejectReason;
	
	private Map<String, Object> taskVariables;
	
	/**
	 * 流程Id
	 * 
	 * @return
	 */
	public String getExecutionId() {
		return executionId;
	}

	/**
	 * 流程Id
	 * 
	 * @param executionId
	 */
	public void setExecutionId(String executionId) {
		this.executionId = executionId;
	}

	/**
	 * 处理人
	 * 
	 * @return
	 */
	public String getAssignee() {
		return assignee;
	}

	/**
	 * 处理人
	 * 
	 * @param assignee
	 */
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	/**
	 * 流程发起人
	 * 
	 * @return
	 */
	public String getOwner() {
		return owner;
	}

	/**
	 * 流程发起人
	 * 
	 * @param owner
	 */
	public void setOwner(String owner) {
		this.owner = owner;
	}
	
	/**
	 * 处理时长
	 * 
	 * @return
	 */
	public String getDurationInMillis() {
		return durationInMillis;
	}

	/**
	 * 处理时长
	 * 
	 * @param durationInMillis
	 */
	public void setDurationInMillis(String durationInMillis) {
		this.durationInMillis = durationInMillis;
	}

	/**
	 * 开始时间
	 * 
	 * @return
	 */
	public Date getStartTime() {
		return startTime;
	}

	/**
	 * 开始时间
	 * 
	 * @param startTime
	 */
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	/**
	 * 结束时间
	 * 
	 * @return
	 */
	public Date getEndTime() {
		return endTime;
	}

	/**
	 * 结束时间
	 * 
	 * @param endTime
	 */
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	/**
	 * 任务Id
	 * 
	 * @return
	 */
	public String getId() {
		return id;
	}

	/**
	 * 任务Id
	 * 
	 * @param id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 任务名称
	 * 
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * 任务名称
	 * 
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 流程变量
	 * 
	 * @return
	 */
	public Map<String, Object> getTaskVariables() {
		return taskVariables;
	}

	/**
	 * 流程变量
	 * 
	 * @param taskVariables
	 */
	public void setTaskVariables(Map<String, Object> taskVariables) {
		this.taskVariables = taskVariables;
	}

}
