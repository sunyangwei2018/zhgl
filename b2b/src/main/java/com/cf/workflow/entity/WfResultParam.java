package com.cf.workflow.entity;

import java.io.Serializable;

/**
 * 

 *
 */
public class WfResultParam implements Serializable{

	private static final long serialVersionUID = 1L;

	private String action; // 非必填
	
	private String variableName; //

	private Object variableValue; //

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getVariableName() {
		return variableName;
	}

	public void setVariableName(String variableName) {
		this.variableName = variableName;
	}

	public Object getVariableValue() {
		return variableValue;
	}

	public void setVariableValue(Object variableValue) {
		this.variableValue = variableValue;
	}


	
}
