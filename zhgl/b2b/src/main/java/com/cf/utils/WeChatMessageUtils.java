package com.cf.utils;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

public class WeChatMessageUtils {

	public static final String wx_CorpID="wx7797e0403f8142ef";//微信企业ID
	public static final String wx_Secret="YuzjeghEpM9K8sEiqSv3Y_zcYxYoyhpZR__ttHBEF7SiJdXeAjXggRIDV6s0_wSG";//微信企业管理组凭证密钥
	public static final String url="https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid="+wx_CorpID+"&corpsecret=secrect";//获得AccessToken请求地址
	
	//发送消息url
	private static final String send_message_url="https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=ACCESS_TOKEN";
	//获得企业用户列表
	private static final String qy_user_url="https://qyapi.weixin.qq.com/cgi-bin/user/list";
	/**
	 * 
	 * 功能描述: 获得AccessToken
	 * @author sun
	 * @date 2016年11月18日
	 * @return
	 */
	public static String getAccessToken(){
		try {
			String jsonData=ConnectionUtils.getData("POST",url.replace("secrect", wx_Secret),null);
			JSONObject object=JSONObject.fromObject(jsonData);
			return object.getString("access_token");
		} catch (Exception e) {
			return null;
		}
	}
	public static final String access_token="35dnK39n5aFNXRPExpiiQg4HkJbsQsKKzq1NXysASgqCxwHdShQtwiEYcB8kwjWf";
	
	/**
	 * 
	 * 功能描述: 微信企业号发送消息
	 * @author sun
	 * @date 2016年11月18日
	 * @param access_token
	 * @param message
	 */
	public static void sendWeChatMessage(String access_token,WeChatMessage message){
		ConnectionUtils.getData("POST",send_message_url.replace("ACCESS_TOKEN", access_token),JSONObject.fromObject(message).toString());
	}
	
	/**
	 * 
	 * 功能描述: 根据员工工号获得企业用户ID
	 * @author sun
	 * @date 2016年11月18日
	 * @param access_token
	 * @param departmentId
	 * @param fetch_child
	 * @param status
	 * @param peop_code
	 * @return
	 */
	public static String getUserId(String access_token,String departmentId,int fetch_child,int status,String peop_code){
		String result=ConnectionUtils.getData("GET",qy_user_url+"?access_token="+access_token+"&department_id="+departmentId+"&fetch_child="+fetch_child+"&status="+status,null);
		List<Map> list=JSONObject.fromObject(result).getJSONArray("userlist");
		for (Map map : list) {
			Object o=map.get("extattr");
			if(EmptyUtils.isNotEmpty(o)){
				List<Map> list2=JSONObject.fromObject(o).getJSONArray("attrs");
				for (Map map2 : list2) {
					if(map2.get("name").equals("工号") && map2.get("value").equals(peop_code)){
						System.out.println(String.valueOf(map2.get("value")));
						return String.valueOf(map.get("userid"));
					}
				}
			}
		}
		return "";
	}
	public static void main(String[] args) {
//		String access_token=getAccessToken();
//		System.out.println(getAccessToken());
//		WeChatMessage message=new WeChatMessage();
//		message.setAgentid(4);
//		message.setMsgtype("text");
//		message.setSafe(0);
//		message.setText("测试数据");
//		message.setTouser("sunxiaoqiang");
//		message.setToparty("2");
//		String resuString=ConnectionUtils.getData("POST",send_message_url.replace("ACCESS_TOKEN", access_token),JSONObject.fromObject(message).toString());
//		System.out.println(resuString);
//		String result=ConnectionUtils.getData("GET", "https://qyapi.weixin.qq.com/cgi-bin/user/simplelist?access_token=ACCESS_TOKEN&department_id=DEPARTMENT_ID&fetch_child=FETCH_CHILD&status=STATUS", null);
//		System.out.println(result);
		//		message=new WeChatMessage(null, "200", null, "text", 4, "你有一个订单消息，订单号为：", 0);
//		System.out.println(JSONObject.fromObject(message));
		System.out.println("https://qyapi.weixin.qq.com/cgi-bin/user/simplelist?access_token=35dnK39n5aFNXRPExpiiQg4HkJbsQsKKzq1NXysASgqCxwHdShQtwiEYcB8kwjWf&department_id=2&fetch_child=1&status=0");
		String resuString=getUserId(access_token, "2", 1, 0,"310100002");
		System.out.println(resuString);
	}
}
