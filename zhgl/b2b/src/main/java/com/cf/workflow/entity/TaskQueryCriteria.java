package com.cf.workflow.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@SuppressWarnings("serial")
public class TaskQueryCriteria implements Serializable{
	
	private String processDefinitionKey;
	
	private String processDefinitionKeyLike;
	
	private List<String> processDefinitionKeyIn;

	private String bizKey;

	private List<String> bizKeyList;
	
	private String taskName;
	
	private String taskNameLike;
	
	private List<String> taskNameIn;
	
	private String digestCust; // 客户摘要
	
	private String digestMerchant; // 商户摘要
	
	private String digestOrder; // 订单摘要
	
	private String digestProduct; // 产品摘要
	
	private Date bizStartDateBegin;
	
	private Date bizStartDateEnd;

	private Range range;
	
	private String candidateGroup;//组
	
	private String userId;//用户
	
	private String bizType;//任务类型
	
	private String bizGcbh;//工程编号
	
	private String bizDqxx02;//工程资料地区
	
	private String bizUploadFirstDateBegin;//初次上传日期
	
	private String bizUploadFirstDateEnd;
	
	private String bizUploadLastDateBegin;//最新上传日期
	
	private String bizUploadLastDateEnd;
	
	private String khgsid;//客户公司id
	private String gsid;//上级公司id
	private String bizUser;
	public String getBizUser() {
		return bizUser;
	}

	public void setBizUser(String bizUser) {
		this.bizUser = bizUser;
	}

	public String getBizType() {
		return bizType;
	}

	public void setBizType(String bizType) {
		this.bizType = bizType;
	}

	public String getCandidateGroup() {
		return candidateGroup;
	}

	public void setCandidateGroup(String candidateGroup) {
		this.candidateGroup = candidateGroup;
	}
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getProcessDefinitionKey() {
		return processDefinitionKey;
	}

	public void setProcessDefinitionKey(String processDefinitionKey) {
		this.processDefinitionKey = processDefinitionKey;
	}
	
	public List<String> getProcessDefinitionKeyIn() {
		return processDefinitionKeyIn;
	}

	public void setProcessDefinitionKeyIn(List<String> processDefinitionKeyIn) {
		this.processDefinitionKeyIn = processDefinitionKeyIn;
	}

	public String getProcessDefinitionKeyLike() {
		return processDefinitionKeyLike;
	}

	public void setProcessDefinitionKeyLike(String processDefinitionKeyLike) {
		this.processDefinitionKeyLike = processDefinitionKeyLike;
	}

	public Range getRange() {
		return range;
	}

	public void setRange(Range range) {
		this.range = range;
	}

	public String getBizKey() {
		return bizKey;
	}

	public void setBizKey(String bizKey) {
		this.bizKey = bizKey;
	}

	public List<String> getBizKeyList() {
		return bizKeyList;
	}

	public void setBizKeyList(List<String> bizKeyList) {
		this.bizKeyList = bizKeyList;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getTaskNameLike() {
		return taskNameLike;
	}

	public void setTaskNameLike(String taskNameLike) {
		this.taskNameLike = taskNameLike;
	}

	public List<String> getTaskNameIn() {
		return taskNameIn;
	}

	public void setTaskNameIn(List<String> taskNameIn) {
		this.taskNameIn = taskNameIn;
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

	public Date getBizStartDateBegin() {
		return bizStartDateBegin;
	}

	public void setBizStartDateBegin(Date bizStartDateBegin) {
		this.bizStartDateBegin = bizStartDateBegin;
	}

	public Date getBizStartDateEnd() {
		return bizStartDateEnd;
	}

	public void setBizStartDateEnd(Date bizStartDateEnd) {
		this.bizStartDateEnd = bizStartDateEnd;
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

	public String getBizUploadFirstDateBegin() {
		return bizUploadFirstDateBegin;
	}

	public void setBizUploadFirstDateBegin(String bizUploadFirstDateBegin) {
		this.bizUploadFirstDateBegin = bizUploadFirstDateBegin;
	}

	public String getBizUploadFirstDateEnd() {
		return bizUploadFirstDateEnd;
	}

	public void setBizUploadFirstDateEnd(String bizUploadFirstDateEnd) {
		this.bizUploadFirstDateEnd = bizUploadFirstDateEnd;
	}

	public String getBizUploadLastDateBegin() {
		return bizUploadLastDateBegin;
	}

	public void setBizUploadLastDateBegin(String bizUploadLastDateBegin) {
		this.bizUploadLastDateBegin = bizUploadLastDateBegin;
	}

	public String getBizUploadLastDateEnd() {
		return bizUploadLastDateEnd;
	}

	public void setBizUploadLastDateEnd(String bizUploadLastDateEnd) {
		this.bizUploadLastDateEnd = bizUploadLastDateEnd;
	}

	public String getKhgsid() {
		return khgsid;
	}

	public void setKhgsid(String khgsid) {
		this.khgsid = khgsid;
	}

	public String getGsid() {
		return gsid;
	}

	public void setGsid(String gsid) {
		this.gsid = gsid;
	}

	

}
