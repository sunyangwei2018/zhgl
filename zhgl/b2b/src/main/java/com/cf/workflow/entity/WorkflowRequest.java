package com.cf.workflow.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import com.cf.workflow.enums.WorkFlowMsgCategory;
import com.google.common.collect.Lists;

/**
 * 
{
  "processDefinitionKey": "myProcess",
  "businessKey": "20160428000002",
  "variables": {
    "name": "admin",
    "idno": "3fff",
    "mobile": "13811122222"
  }
}	
 *
 */
public class WorkflowRequest implements Serializable{

	private static final long serialVersionUID = 1L;

	private String processDefinitionKey; //流程Key
	
	private String businessKey; //业务Key
	
	private List<String> businessKeyList; //业务keyList
	
	private Map<String, Object> variables; //传入变量

	private String taskId; //工作流的taskId

	private Map<String, Object> variablesLocal; //传入task自身的变量，如备注、拒绝原因等
	
	private boolean includeTaskLocalVariables; // 查询时历史时是否需要加载variablesLocal信息
	
	private boolean includeProcessVariables; //

	private List<String> taskNameIn;
	
	private String taskName;
	
	private String userId;
	
	private String digestCust; // 客户摘要
	
	private String digestMerchant; // 商户摘要
	
	private String digestOrder; // 订单摘要
	
	private String digestProduct; // 产品摘要
	
	private Date bizStartDate; // 业务开始日期
	
	private List<String> taskList;//任务ID数组
	
	private List<Map> returnFiles = null;//驳回文件
	
	private Integer step = 1; //流程步数,默认1步
	
	private WorkFlowMsgCategory msgType;//流程流转状态
	

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getProcessDefinitionKey() {
		return processDefinitionKey;
	}

	public void setProcessDefinitionKey(String processDefinitionKey) {
		this.processDefinitionKey = processDefinitionKey;
	}

	public String getBusinessKey() {
		return businessKey;
	}

	public void setBusinessKey(String businessKey) {
		this.businessKey = businessKey;
	}

	public Map<String, Object> getVariables() {
		return variables;
	}

	public void setVariables(Map<String, Object> variables) {
		this.variables = variables;
	}

	public Map<String, Object> getVariablesLocal() {
		return variablesLocal;
	}

	public void setVariablesLocal(Map<String, Object> variablesLocal) {
		this.variablesLocal = variablesLocal;
	}

	public boolean isIncludeTaskLocalVariables() {
		return includeTaskLocalVariables;
	}

	public void setIncludeTaskLocalVariables(boolean includeTaskLocalVariables) {
		this.includeTaskLocalVariables = includeTaskLocalVariables;
	}

	public List<String> getBusinessKeyList() {
		return businessKeyList;
	}

	public void setBusinessKeyList(List<String> businessKeyList) {
		this.businessKeyList = businessKeyList;
	}

	public List<String> getTaskNameIn() {
		return taskNameIn;
	}

	public void setTaskNameIn(List<String> taskNameIn) {
		this.taskNameIn = taskNameIn;
	}

	public boolean isIncludeProcessVariables() {
		return includeProcessVariables;
	}

	public void setIncludeProcessVariables(boolean includeProcessVariables) {
		this.includeProcessVariables = includeProcessVariables;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getDigestCust() {
		return digestCust;
	}

	public void setDigestCust(String digestCust) {
		this.digestCust = digestCust;
	}

	public String getDigestMerchant() {
		return digestMerchant;
	}

	public void setDigestMerchant(String digestMerchant) {
		this.digestMerchant = digestMerchant;
	}

	public String getDigestOrder() {
		return digestOrder;
	}

	public void setDigestOrder(String digestOrder) {
		this.digestOrder = digestOrder;
	}

	public String getDigestProduct() {
		return digestProduct;
	}

	public void setDigestProduct(String digestProduct) {
		this.digestProduct = digestProduct;
	}

	public Date getBizStartDate() {
		return bizStartDate;
	}

	public void setBizStartDate(Date bizStartDate) {
		this.bizStartDate = bizStartDate;
	}

	public List<String> getTaskList() {
		return taskList;
	}

	public void setTaskList(List<String> taskList) {
		this.taskList = taskList;
	}

	public List<Map> getReturnFiles() {
		return returnFiles;
	}

	public void setReturnFiles(List<Map> returnFiles) {
		this.returnFiles = returnFiles;
	}
	
	public Integer getStep() {
		return step;
	}

	public void setStep(Integer step) {
		this.step = step;
	}

	public WorkFlowMsgCategory getMsgType() {
		return msgType;
	}

	public void setMsgType(WorkFlowMsgCategory msgType) {
		this.msgType = msgType;
	}

	/** 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}
}
