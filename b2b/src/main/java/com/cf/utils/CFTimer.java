package com.cf.utils;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.cf.forms.FormTools;

public class CFTimer{
	public static void main(String[] args) {
		timer1();
	}
	
	public static void timer1(){
		Timer timer =new Timer();
		timer.schedule(new TimerTask() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				System.out.println("20000毫秒！！！！！");
			}
		}, 2000,1000);
	}
	
	public static void  a(){
		  String s1="["
		  		+ "{\"id\":\"2036499\",\"BillNo\":\"160326001C315\",\"BoxDetails\":\"SFXC3151000060939001,SFXC3151000060983001,SFXC3151000060983002\"},"
		  		+ "{\"id\":\"2036500\",\"BillNo\":\"160326001C317\",\"BoxDetails\":\"SFXC3171000060939001,SFXC3171000060983001,SFXC3171000060983002\"}"
		  		+ "]";
		  try {
			JSONArray jsonarry =JSONArray.fromObject(s1);
			for(int i=0;i<jsonarry.size();i++){
				JSONObject json =(JSONObject) jsonarry.get(i);
				String[] list = json.getString("BoxDetails").split(",");
				for(int j=0;j<list.length;j++){
					System.out.println("数组:"+i+"##"+json.toString()+"##"+json.getString("BillNo")+list[j]);
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}


