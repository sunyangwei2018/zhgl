package com.cf.workflow.entity;

import java.io.Serializable;


@SuppressWarnings("serial")
public class ActivitiProcessInstance implements Serializable{
	
	private String processInstanceId;

	public String getProcessInstanceId() {
		return processInstanceId;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	

	
}
