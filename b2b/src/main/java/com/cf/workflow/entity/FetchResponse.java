package com.cf.workflow.entity;

import java.io.Serializable;
import java.util.List;

public class FetchResponse<T> implements Serializable
{
	private int rowCount;
	
	private List<T> data;
	
	private int start;
	
	private boolean exact = true;

	public int getRowCount() {
		return rowCount;
	}

	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}
	public void setRowCount(long rowCount) {
		this.rowCount = (int)rowCount;
	}

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public boolean isExact() {
		return exact;
	}

	public void setExact(boolean exact) {
		this.exact = exact;
	}
}
