package com.cf.tms.entity;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class WfRes implements Serializable{
	
	/**
	 * 查询审批结果和备注
	 */
	private String checkTime;
	
	private String checkStatus;
	
	private String checkRemark;
	
	private String checkPerson;
	
	private String patchCodeReason;
	
	private String refuseCodeReason;
	
	private Date startTime;
	
	private Date endTime;
	
	

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}

	public String getCheckStatus() {
		return checkStatus;
	}

	public void setCheckStatus(String checkStatus) {
		this.checkStatus = checkStatus;
	}

	public String getCheckRemark() {
		return checkRemark;
	}

	public void setCheckRemark(String checkRemark) {
		this.checkRemark = checkRemark;
	}

	public String getCheckPerson() {
		return checkPerson;
	}

	public void setCheckPerson(String checkPerson) {
		this.checkPerson = checkPerson;
	}

	public String getPatchCodeReason() {
		return patchCodeReason;
	}

	public void setPatchCodeReason(String patchCodeReason) {
		this.patchCodeReason = patchCodeReason;
	}

	public String getRefuseCodeReason() {
		return refuseCodeReason;
	}

	public void setRefuseCodeReason(String refuseCodeReason) {
		this.refuseCodeReason = refuseCodeReason;
	}
	
}
