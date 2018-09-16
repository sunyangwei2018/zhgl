package com.cf.utils;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cf.forms.FormTools;

public class MessageUtil {
	public static Map users= new HashMap();
	public static HashMap<String,String> getMessage(CharBuffer msg) {
        HashMap<String,String> map = new HashMap<String,String>();
        String msgString  = msg.toString();
        String m[] = msgString.split(",");
        map.put("fromName", m[0]);
        map.put("toName", m[1]);
        map.put("content", m[2]);
        return map;
    }
	
	public static void addUserSession(Map sessionuser){
//		if(FormTools.isNull(users.get(sessionid))){
//			users.put(sessionid, "在线");
//		}
		users.put(sessionuser.get("sessionid"),sessionuser);
		//return users;
	}
}
