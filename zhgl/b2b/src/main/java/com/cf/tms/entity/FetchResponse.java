/**
 * 
 * 上海易日升金融服务有限公司
 * 
 */
package com.cf.tms.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * @author syw
 * @version $Id: FetchResponse.java, v 0.1 2017年11月27日 下午2:35:56 syw Exp $
 */
@SuppressWarnings("serial")
public class FetchResponse<T> implements Serializable {
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
