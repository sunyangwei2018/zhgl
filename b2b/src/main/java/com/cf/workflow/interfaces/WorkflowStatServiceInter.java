package com.cf.workflow.interfaces;

import java.util.Map;

import com.cf.workflow.entity.WfTaskVarStatRequest;
import com.cf.workflow.entity.WfWorkLoadRequest;


public interface WorkflowStatServiceInter {

	Map<String, Integer> getTaskVarStatResult(WfTaskVarStatRequest request);

	Map<String, Integer> getWorkLoadResult(WfWorkLoadRequest request);


}
