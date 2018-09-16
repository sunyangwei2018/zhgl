package com.cf.workflow.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;


@SuppressWarnings("serial")
public class ActivitiTask implements Serializable{
	
	private String processDefinitionKey;
	
	private String processDefinitionName;

	private String procInstId;
	
	private String taskId;

	private String taskName;
	
	private String asignee;

	private Date createTime;
	
	private String createTimeStr;
	
	private String createDateStr;
	
	private Date endTime;
	
	private String endTimeStr;
	
	private String endDateStr;
	
	private Date dueDate;
	
	private String bizKey;
	
	private String formKey;
	
	private String digestCust; // 客户摘要
	
	private String digestMerchant; // 商户摘要
	
	private String digestOrder; // 订单摘要
	
	private String digestProduct; // 产品摘要
	
	private String lastAssignee; //上次处理人
	
	private String bizType;//业务类型
	
	private String bizGcbh;//工程编号
	
	private String bizDqxx02;//地区信息
	
	private String bizUploadFirstDate;//初次上传日期
	
	private String bizUploadLastDate;//最新上传日期
	
	private Map<String, Object> processVariables;
	
	private Map<String, Object> taskVariables;
	
	private String bizGsid;//操作人公司id
	
	
	public String getBizGsid() {
		return bizGsid;
	}

	public void setBizGsid(String bizGsid) {
		this.bizGsid = bizGsid;
	}

	public String getLastAssignee() {
		return lastAssignee;
	}

	public void setLastAssignee(String lastAssignee) {
		this.lastAssignee = lastAssignee;
	}

	public Map<String, Object> getProcessVariables() {
		return processVariables;
	}

	public void setProcessVariables(Map<String, Object> processVariables) {
		this.processVariables = processVariables;
	}

	public String getProcessDefinitionKey() {
		return processDefinitionKey;
	}

	public void setProcessDefinitionKey(String processDefinitionKey) {
		this.processDefinitionKey = processDefinitionKey;
	}

	public String getProcessDefinitionName() {
		return processDefinitionName;
	}

	public void setProcessDefinitionName(String processDefinitionName) {
		this.processDefinitionName = processDefinitionName;
	}

	public String getProcInstId() {
		return procInstId;
	}

	public void setProcInstId(String procInstId) {
		this.procInstId = procInstId;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getAsignee() {
		return asignee;
	}

	public void setAsignee(String asignee) {
		this.asignee = asignee;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public String getBizKey() {
		return bizKey;
	}

	public void setBizKey(String bizKey) {
		this.bizKey = bizKey;
	}

	public String getCreateTimeStr() {
		return createTimeStr;
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}

	public String getCreateDateStr() {
		return createDateStr;
	}

	public void setCreateDateStr(String createDateStr) {
		this.createDateStr = createDateStr;
	}

	public String getFormKey() {
		return formKey;
	}

	public void setFormKey(String formKey) {
		this.formKey = formKey;
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

	public Map<String, Object> getTaskVariables() {
		return taskVariables;
	}

	public void setTaskVariables(Map<String, Object> taskVariables) {
		this.taskVariables = taskVariables;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getEndTimeStr() {
		return endTimeStr;
	}

	public void setEndTimeStr(String endTimeStr) {
		this.endTimeStr = endTimeStr;
	}

	public String getEndDateStr() {
		return endDateStr;
	}

	public void setEndDateStr(String endDateStr) {
		this.endDateStr = endDateStr;
	}

	public String getBizType() {
		return bizType;
	}

	public void setBizType(String bizType) {
		this.bizType = bizType;
	}

	public String getBizGcbh() {
		return bizGcbh;
	}

	public void setBizGcbh(String bizGcbh) {
		this.bizGcbh = bizGcbh;
	}

	public String getBizDqxx02() {
		return bizDqxx02;
	}

	public void setBizDqxx02(String bizDqxx02) {
		this.bizDqxx02 = bizDqxx02;
	}

	public String getBizUploadFirstDate() {
		return bizUploadFirstDate;
	}

	public void setBizUploadFirstDate(String bizUploadFirstDate) {
		this.bizUploadFirstDate = bizUploadFirstDate;
	}

	public String getBizUploadLastDate() {
		return bizUploadLastDate;
	}

	public void setBizUploadLastDate(String bizUploadLastDate) {
		this.bizUploadLastDate = bizUploadLastDate;
	}

	
}
