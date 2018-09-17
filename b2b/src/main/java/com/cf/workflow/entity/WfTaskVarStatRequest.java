package com.cf.workflow.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 

 *
 */
public class WfTaskVarStatRequest implements Serializable{

	private static final long serialVersionUID = 1L;

	private String processDefinitionKey; //流程Key
	
	private String taskName; //任务名
	
	private String username;

	private Date startDate;
	
	private Date endDate;
	
	private List<WfResultParam> wfResultParam;

	public String getProcessDefinitionKey() {
		return processDefinitionKey;
	}

	public void setProcessDefinitionKey(String processDefinitionKey) {
		this.processDefinitionKey = processDefinitionKey;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public List<WfResultParam> getWfResultParam() {
		return wfResultParam;
	}

	public void setWfResultParam(List<WfResultParam> wfResultParam) {
		this.wfResultParam = wfResultParam;
	}

	

}
