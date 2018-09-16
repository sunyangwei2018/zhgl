package com.cf.workflow.server;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.cf.forms.FormTools;
import com.cf.framework.JLBill;
import com.cf.workflow.entity.ActivitiProcessInstance;
import com.cf.workflow.entity.ActivitiTask;
import com.cf.workflow.entity.FetchResponse;
import com.cf.workflow.entity.TaskQueryCriteria;
import com.cf.workflow.entity.WfTaskVarStatRequest;
import com.cf.workflow.entity.WfWorkLoadRequest;
import com.cf.workflow.entity.WorkflowRequest;
import com.cf.workflow.exception.TaskAlreadyClaimedException;
import com.cf.workflow.exception.TaskNotFoundException;
import com.cf.workflow.interfaces.WorkflowServiceInter;
import com.cf.workflow.interfaces.WorkflowStatServiceInter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;

import net.sf.json.JSONArray;



@Controller
@RequestMapping("/workflow")
public class WorkflowController extends JLBill{

	@Autowired
	private WorkflowServiceInter workflowServiceInter;
	

	private static final Logger logger = LoggerFactory.getLogger(WorkflowController.class);

	private final static String TASK_NOT_FOUND = "TASK_NOT_FOUND";
	private final static String TASK_ALREADY_CLAIMED = "TASK_ALREADY_CLAIMED";
	private final static String SUCCESS = "SUCCESS";

	public final static String PROCESS_DEFINITION_KEY_PREFIX_PERSON_APPLY = "perApp-"; // 个人进件流程key的前缀
	public final static List<String> PROCESS_DEFINITION_KEY_PERSON_APPLY_LIST = Lists.newArrayList("perApp-cashLoan",
			"perApp-ordinaryFinProdSign","gczlAproveProcess"); // 个人进件流程key的list

	/**
	 * 起流程
	 * @param req
	 * @throws Exception 
	 * @throws ProcessException
	 */
	@Transactional
	@RequestMapping("/start.do")
	@ResponseStatus(value = HttpStatus.OK)
	public Map  startProcessInstanceByKey(String json) throws Exception {
		WorkflowRequest req= FormTools.mapperJsonToBean(json, WorkflowRequest.class);
		return FormTools.mapperBeanToMap(workflowServiceInter.startProcessInstanceByKey(req));
	}
	
	/**
	 * 起流程
	 * @param req
	 * @throws ProcessException
	 */
	@Transactional
	@RequestMapping("/startBatch.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void startProcessInstanceByKeyBatch(@RequestBody List<WorkflowRequest> reqList) {
		workflowServiceInter.startProcessInstanceByKey(reqList);
	}

	/**
	 * 领取任务
	 * @deprecated replaced by {@link #dealTask()}
	 * @param taskId
	 */
	@Transactional
	@RequestMapping("/claimTask.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void claimTask(String taskId,HttpServletRequest request) {
		Map userInfo = (Map) request.getSession().getAttribute("userInfo");
		String userId = userInfo.get("USERID").toString();
		logger.info("[workflow/claimTask]taskId:{}",taskId);
		workflowServiceInter.claimTask(taskId, userId);
	}
	
	/**
	 * 释放任务
	 * @param taskId
	 */
	@Transactional
	@RequestMapping("/unclaimTask.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void unclaimTaskByTaskId(String taskId,HttpServletRequest request) {
		logger.info("[workflow/unclaimTaskByTaskId]taskId:{}",taskId);
		Map userInfo = (Map) request.getSession().getAttribute("userInfo");
		String userId = userInfo.get("USERID").toString();
		WorkflowRequest wfReq = new WorkflowRequest();
		wfReq.setTaskId(taskId);
		wfReq.setUserId(userId);
		workflowServiceInter.unclaimTask(wfReq);
	}
	
	/**
	 * 处理任务请求
	 * @param taskId
	 */
	@Transactional
	@RequestMapping("/dealTask.do")
	public  Map<String,String> dealTask(String taskId,HttpServletRequest request) {
		logger.info("[workflow/dealTask]taskId:{}", taskId);
		Map<String,String> resultMap = new HashMap<String,String>();
		Map userInfo = (Map) request.getSession().getAttribute("userInfo");
		String currName = userInfo.get("USERID").toString();
		logger.info("[workflow/dealTask]currName:{}", currName);
		try {
			workflowServiceInter.dealTask(taskId, currName);
			resultMap.put("respCode", "000000");
			resultMap.put("respMsg", "任务领取成功");
		} catch (TaskAlreadyClaimedException ex){
			logger.info("任务已被其他人领取");
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "任务已被其他人领取");
		} catch (TaskNotFoundException ex) {
			logger.info("任务已经不存在");
			resultMap.put("respCode", "000001");
			resultMap.put("respMsg", "任务已经不存在");
		}finally {
			return resultMap;
		}
		
		 
	}
	
	@Transactional
	@RequestMapping("/dealTaskTest.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void dealTaskTest(@RequestBody String taskId) {
		logger.info("[workflow/dealTaskTest]taskId:{}",taskId);
		workflowServiceInter.dealTask(taskId, "notAdmin");
	}
	
	/**
	 * 任务完成
	 * @param taskId
	 */
	@Transactional
	@RequestMapping("/completeTask.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void completeTask(@RequestBody WorkflowRequest req) {
		logger.info("[workflow/dealTask]taskId:{}",req.getTaskId());
		workflowServiceInter.complete(req);
	}
	
	/**
	 * 我的工作台
	 * @param taskQueryCriteria
	 * @return
	 * @throws Exception 
	 */
	@Transactional
	@RequestMapping("/workBench.do")
	public void fetchWorkBenchList(String json,HttpServletRequest reqs,HttpServletResponse reps) throws Exception {
		Map userInfo = (Map) reqs.getSession().getAttribute("userInfo");
		String reqJson = json.replaceFirst("^\\[", "").replaceFirst("\\]$", "");
		TaskQueryCriteria taskQueryCriteria= FormTools.mapperJsonToBean(reqJson, TaskQueryCriteria.class);
		FetchResponse<ActivitiTask> fetch= null;
		logger.info("[workflow/workBench]");

		Set<String> authList = Sets.newHashSet((List)userInfo.get("GROUP"));

		//Set<String> authList = null;// userInfo.getAuthorities();
		FetchResponse<ActivitiTask> result = workflowServiceInter.fetchWorkBenchList(taskQueryCriteria,userInfo.get("USERID").toString(),authList);

		PrintWriter pw = reps.getWriter();
		pw.print(new ObjectMapper().writeValueAsString(FormTools.mapperBeanToMap(result)));
		pw.flush();
		pw.close();
		//return FormTools.mapperBeanToMap(result);
	}
	
	/**
	 * runtime订单查询
	 * @param taskQueryCriteria
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/workApplyList.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void fetchWorkApplyList(String json,HttpServletRequest reqs,HttpServletResponse reps) throws Exception {
		logger.info("[workflow/workApplyList]");
//		taskQueryCriteria.setProcessDefinitionKeyLike(PROCESS_DEFINITION_KEY_PREFIX_PERSON_APPLY + "%");
		String reqJson = json.replace("[", "").replace("]", "");
		TaskQueryCriteria taskQueryCriteria= FormTools.mapperJsonToBean(reqJson, TaskQueryCriteria.class);
		taskQueryCriteria.setProcessDefinitionKeyIn(PROCESS_DEFINITION_KEY_PERSON_APPLY_LIST);
		FetchResponse<ActivitiTask> result = workflowServiceInter.fetchWorkList(taskQueryCriteria);
		
		PrintWriter pw = reps.getWriter();
		pw.print(new ObjectMapper().writeValueAsString(FormTools.mapperBeanToMap(result)));
		pw.flush();
		pw.close();
	}

	/**
	 * 历史订单查询
	 * @param taskQueryCriteria
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/workApplyHisList.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void fetchWorkApplyHisList(String json,HttpServletRequest reqs,HttpServletResponse reps) throws Exception {
		logger.info("[workflow/workApplyHisList]");
		String reqJson = json.replace("[", "").replace("]", "");
		TaskQueryCriteria taskQueryCriteria= FormTools.mapperJsonToBean(reqJson, TaskQueryCriteria.class);
//		taskQueryCriteria.setProcessDefinitionKeyLike(PROCESS_DEFINITION_KEY_PREFIX_PERSON_APPLY + "%");
		taskQueryCriteria.setProcessDefinitionKeyIn(PROCESS_DEFINITION_KEY_PERSON_APPLY_LIST);
//		FetchResponse<ActivitiTask> result = workflowServiceInter.fetchWorkHisList(taskQueryCriteria);
		FetchResponse<ActivitiTask> result = workflowServiceInter.fetchWorkHisListOpt(taskQueryCriteria);
		
		PrintWriter pw = reps.getWriter();
		pw.print(new ObjectMapper().writeValueAsString(FormTools.mapperBeanToMap(result)));
		pw.flush();
		pw.close();
	}
	
	/**
	 * 初审
	 * @param taskQueryCriteria
	 * @return
	 * @throws Exception 
	
	@Transactional
	@ResponseStatus(value = HttpStatus.OK)
	public Map fetchWorkBenchFirstReview(String json) throws Exception {
		TaskQueryCriteria taskQueryCriteria= FormTools.mapperJsonToBean(json, TaskQueryCriteria.class);
		FetchResponse<ActivitiTask> fetch= null;
		logger.info("[workflow/workBenchFirstReview]");
		taskQueryCriteria.setTaskNameIn(Lists.newArrayList("初审","初审授信"));
		
		return fetchWorkBenchList(FormTools.mapperBeanToMap(taskQueryCriteria).toString());
	} */
	
	/**
	 * 终审（复核）
	 * @param taskQueryCriteria
	 * @return
	 */
	@Transactional
	@ResponseStatus(value = HttpStatus.OK)
	public @ResponseBody FetchResponse<ActivitiTask> fetchWorkBenchFinalJudgment(@RequestBody TaskQueryCriteria taskQueryCriteria) {
		logger.info("[workflow/workBenchFinalJudgment]");
		
		return null;
	}
	
	/**
	 * 待办任务查询
	 * @param showNum
	 * @return
	 */
	@Transactional
	@RequestMapping("/todoList.do")
	@ResponseStatus(value = HttpStatus.OK)
	public @ResponseBody FetchResponse<ActivitiTask> fetchTodoList(@RequestBody Integer showNum) {
		logger.info("[workflow/todoList]showNum:{}", showNum);

		return null;
	}
	
	/**
	 * 审批通过、审批拒绝、打回 图饼数据获取
	 * @param request
	 * @return
	 */
	@RequestMapping("/taskVarStat.do")
	@ResponseStatus(value = HttpStatus.OK)
	public @ResponseBody List<Integer> taskVarStat(@RequestBody WfTaskVarStatRequest request) {
		logger.info("[workflow/taskVarStat]pdkey:{},taskName:{}",request.getProcessDefinitionKey(),request.getTaskName());
		
		return null;
	}
	
	/**
	 * 每日工作流数据获取
	 * @param request
	 * @return
	 */
	@RequestMapping("/workLoad.do")
	@ResponseStatus(value = HttpStatus.OK)
	public @ResponseBody Map<String, Integer> workLoad(@RequestBody WfWorkLoadRequest request) {
		logger.info("[workflow/workLoad]pdkey:{},taskName:{}",request.getProcessDefinitionKey(),request.getTaskNames());
		
		return null;
	}
	
    /**
     * 读取带跟踪的图片
     * @throws IOException 
     */
//    @RequestMapping(value = "/process/trace/auto/{processInstanceId}", method = RequestMethod.GET)
//    public ResponseEntity<InputStreamResource> readResource(@PathVariable("processInstanceId") String processInstanceId) throws IOException {
////        InputStream imageStream = workflowServiceInter.generateDiagram(processInstanceId);
//    	byte[] imageBytes = workflowServiceInter.generateDiagram(processInstanceId);
//    	InputStream imageStream = new ByteArrayInputStream(imageBytes); 
//        return ResponseEntity.ok()
////                .contentLength(xxx.getLength())
//                .contentType(MediaType.IMAGE_PNG)
//                .body(new InputStreamResource(imageStream));
//    }
    
	/**
	 * 读取带跟踪的图片
	 * @param processInstanceId
	 * @param resp
	 * @throws IOException
	 */
    @RequestMapping(value = "/process/trace/auto.do", method = RequestMethod.GET)
    public void  readResource(String processInstanceId, HttpServletResponse resp) throws IOException {
    	byte[] imageBytes = workflowServiceInter.generateDiagram(processInstanceId);
    	InputStream imageStream = new ByteArrayInputStream(imageBytes); 
    	
        resp.setContentType(MediaType.IMAGE_JPEG_VALUE);
        resp.setContentLength(imageBytes.length);
        final BufferedInputStream in = new BufferedInputStream(imageStream);
       
        FileCopyUtils.copy(in, resp.getOutputStream());
        resp.flushBuffer();

    }
    /**
     * 根据bizKey获取有权限的task
     * @param bizKey
     * @return
     */
    @RequestMapping(value = "/loadAvailableTasks.do", method = RequestMethod.GET)
	public @ResponseBody List<ActivitiTask> loadAvailableTasks(@RequestParam("bizKey") String bizKey) {
		return null;
	}
    
	@RequestMapping("/workApplyFormList.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void workApplyFormList(String json,HttpServletRequest reqs,HttpServletResponse reps) throws Exception {
		logger.info("[workflow/workApplyFormList]");
//		taskQueryCriteria.setProcessDefinitionKeyLike(PROCESS_DEFINITION_KEY_PREFIX_PERSON_APPLY + "%");
	    Map map = FormTools.mapperToMap(json);
		List result = workflowServiceInter.fetchWorkFormList(map.get("taskId").toString());

		PrintWriter pw = reps.getWriter();
		pw.print(new ObjectMapper().writeValueAsString(result));
		pw.flush();
		pw.close();
	}
}
