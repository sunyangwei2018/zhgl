package com.cf.workflow.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 

 *
 */
public class WfWorkLoadDaily implements Serializable{

	private static final long serialVersionUID = 1L;

	private Date workDate;
	
	private Integer number;

	public Date getWorkDate() {
		return workDate;
	}

	public void setWorkDate(Date workDate) {
		this.workDate = workDate;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	

}
