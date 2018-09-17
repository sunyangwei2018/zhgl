package com.cf.utils;

import java.util.HashMap;
import java.util.Map;

public class WeChatMessage {

	private String touser;
	private String toparty;
	private String totag;
	private String msgtype;
	private int agentid;
	private Map<String, String> text;
	private int safe;
	
	public WeChatMessage() {
		// TODO 自动生成的构造函数存根
	}
	public WeChatMessage(String touser, String toparty, String totag,
			String msgtype, int agentid, String content, int safe) {
		super();
		this.touser = touser;
		this.toparty = toparty;
		this.totag = totag;
		this.msgtype = msgtype;
		this.agentid = agentid;
		Map<String, String> text=new HashMap<String, String>();
		text.put("content", content);
		this.text = text;
		this.safe = safe;
	}
	public String getTouser() {
		return touser;
	}
	public void setTouser(String touser) {
		this.touser = touser;
	}
	public String getToparty() {
		return toparty;
	}
	public void setToparty(String toparty) {
		this.toparty = toparty;
	}
	public String getTotag() {
		return totag;
	}
	public void setTotag(String totag) {
		this.totag = totag;
	}
	public String getMsgtype() {
		return msgtype;
	}
	public void setMsgtype(String msgtype) {
		this.msgtype = msgtype;
	}
	public int getAgentid() {
		return agentid;
	}
	public void setAgentid(int agentid) {
		this.agentid = agentid;
	}
	public int getSafe() {
		return safe;
	}
	public void setSafe(int safe) {
		this.safe = safe;
	}
	
	public Map<String, String> getText() {
		return text;
	}
	public void setText(String content) {
		Map<String, String> map=new HashMap<String, String>();
		map.put("content", content);
		this.text = map;
	}
}
