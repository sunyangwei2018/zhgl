package com.cf.workflow.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 
 *
 */
public class WfWorkLoadRequest implements Serializable{

	private static final long serialVersionUID = 1L;

	private String processDefinitionKey; //流程Key
	
	private List<String> taskNames; //业务Key
	
	private String username;

	private Date startDate;
	
	private Date endDate;

	public String getProcessDefinitionKey() {
		return processDefinitionKey;
	}

	public void setProcessDefinitionKey(String processDefinitionKey) {
		this.processDefinitionKey = processDefinitionKey;
	}

	public List<String> getTaskNames() {
		return taskNames;
	}

	public void setTaskNames(List<String> taskNames) {
		this.taskNames = taskNames;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	


}
