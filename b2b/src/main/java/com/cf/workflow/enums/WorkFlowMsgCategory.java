/**
 * 
 * 上海易日升金融服务有限公司
 * 
 */
package com.cf.workflow.enums;


/**
 * 
 * @author syw
 * @version $Id: WorkFlowMsgType.java, v 0.1 2018年1月22日 下午5:40:50 syw Exp $
 */
public enum WorkFlowMsgCategory {
	A("通过"),
	B("驳回");
	private String workFlowMsgType;
	
	private WorkFlowMsgCategory(String workFlowMsgType)
	{
		this.workFlowMsgType = workFlowMsgType;
	}
	
	public String getWorkFlowMsgTypeDesc() {
		return workFlowMsgType;
	}
	
	public static WorkFlowMsgCategory getWorkFlowMsgCategory(String type) {
		WorkFlowMsgCategory [] workFlowMsgTypes=WorkFlowMsgCategory.values();
		for(WorkFlowMsgCategory workFlowMsgType:workFlowMsgTypes){
			if(workFlowMsgType.getWorkFlowMsgTypeDesc().equals(type)){
				return workFlowMsgType;
			}
		}
		return null;
	}
}
