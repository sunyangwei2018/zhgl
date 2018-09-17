package com.cf.forms;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.net.URL;
import java.net.URLClassLoader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang.time.DateUtils;
import org.joda.time.DateTime;

import com.cf.workflow.entity.WorkflowRequest;
import com.google.common.collect.Lists;
//import com.mysema.commons.lang.URLEncoder;

public class testForm implements testFace {

	@Override
	public void select(String s) {
		// TODO Auto-generated method stub
		System.out.println(s);
		select1(s);
	}
	
	public void select1(String s) {
		// TODO Auto-generated method stub
		System.out.println(s);
	}
	public void select2(String s) {
		// TODO Auto-generated method stub
		System.out.println(s);
	}
	
	/*public static void main(String[] args) throws ParseException, NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		WorkflowRequest work = new WorkflowRequest();
		work.setBusinessKey("123456");
		Method m = work.getClass().getMethod("getBusinessKey");
		String value = (String) m.invoke(work);
		System.out.println("BusinessKey值："+value);
		String date = DateFormatUtils.format(new Date(), "yyyy年MM月dd日");
		DateTime bizDate = new DateTime(new Date());
		System.out.println(DateFormatUtils.format(bizDate.toDate(), "yyyy年MM月dd日"));
		String name = URLEncoder.encodeURL("张三");
		String url = "http://yrsuatweb.tunnel.yirisheng.net/shortMesgTemp/contract.html?custName="+name+"&idNo=123456&assessFlag=Y";
		System.out.println(url);
		String livingDate = DateFormatUtils.format(date, "yyyy-MM-dd HH:mm:ss");
		System.out.println("刷脸时间:"+livingDate);
		String regex = "^(http|https|www|ftp|)?(://)?(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*((:\\d+)?)(/(\\w+(-\\w+)*))*(\\.?(\\w)*)(\\?)?(((\\w*%)*(\\w*\\?)*(\\w*:)*(\\w*\\+)*(\\w*\\.)*(\\w*&)*(\\w*-)*(\\w*=)*(\\w*%)*(\\w*\\?)*(\\w*:)*(\\w*\\+)*(\\w*\\.)*(\\w*&)*(\\w*-)*(\\w*=)*)*(\\w*)*)$";
		//http://test2:3002/merchantPCActivity/fitmentLoanPC.html
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		int a = 2;
		long date1 = sdf.parse("2017-12-20 14:50:00").getTime();
		long date2 = sdf.parse("2017-12-20 14:60:01").getTime();
		long date3 = date2-date1;
		System.out.println(date3);
		System.out.println(DateFormatUtils.format(new Date(), "MM-dd"));
		while(true){
			int randomNum = (int) (Math.random()*20+1)*1000;
			System.out.println(BigDecimal.valueOf(randomNum));
			if(randomNum==20000){
				break;
			}
		}
		System.out.println(System.getProperty("webapp.root"));
		String url ="http://192.168.19.228:3002/decorationPromote/decorationPromotion.html?eventId=1";
		System.out.println("活动页url格式不正确"+testForm.class.getName().substring(testForm.class.getName().lastIndexOf("."), testForm.class.getName().length()));
		if(!Pattern.matches(regex, url)){
			System.out.println("活动页url格式不正确");
		}else{
			System.out.println("活动正确");
		}
	}*/
	
	/**
	 * 分析BootstrapClassLoader/ExtClassLoader/AppClassLoader的加载路径 及"父委托机制"
	 * 
	 * @param args
	 * @throws ParseException 
	 */
	public static void main(String[] args) throws ParseException {
		/*String str = "";
		System.out.println("BootstrapClassLoader 的加载路径: ");  
         
	        URL[] urls = sun.misc.Launcher.getBootstrapClassPath().getURLs();  
	        for(URL url : urls)  
	            System.out.println(url);  
	        System.out.println("----------------------------");  
	                  
	        //取得扩展类加载器  
	        URLClassLoader extClassLoader = (URLClassLoader)ClassLoader.getSystemClassLoader().getParent();  
	  
	        System.out.println(extClassLoader);  
	        System.out.println("扩展类加载器 的加载路径: ");  
	          
	        urls = extClassLoader.getURLs();  
	        for(URL url : urls)  
	            System.out.println(url);  
	          
	        System.out.println("----------------------------");  
	                  
	          
	        //取得应用(系统)类加载器  
	        URLClassLoader appClassLoader = (URLClassLoader)ClassLoader.getSystemClassLoader();  
	          
	        System.out.println(appClassLoader);  
	        System.out.println("应用(系统)类加载器 的加载路径: ");  
	          
	        urls = appClassLoader.getURLs();  
	        for(URL url : urls)  
	            System.out.println(url);  
	                  
	        System.out.println("----------------------------");*/
		int[] arr = new int[]{3,1,4,2,6,5,-1};
		Date nowDate = new Date();
		DateTime jodTime= new DateTime(nowDate);
		DateTime jodTimeN =  new DateTime(nowDate);
		jodTime = jodTime.minusHours(28500).withSecondOfMinute(0);
		System.out.println(jodTime.toString());
		for(int i=0;i<arr.length;i++){
			int b = i+1;
			if(b>arr.length){
				continue;
			}
			if(arr[i]<arr[b]){
				arr[i] = arr[b]+arr[i];
				arr[b] = arr[i]-arr[b];
				arr[i] = arr[i] - arr[b];
				System.out.println(arr[i]);
			}
		}
		/*List<Integer> arr = Lists.newArrayList(3,1,4,2,6,5);
		List<Integer> darr = Lists.newArrayList();
		for(int i=0;i<arr.length;i++){
			System.out.print(arr[i]);
		}
		int i=0;
		int b = 0;
		System.out.println(arr);
		for(int a:arr){
			if(a==4||a==2){
				darr.add(a);
			}
			i++;
		}
		arr.removeAll(darr);
		System.out.println(arr);*/
	}
	
	/**
	 * 插入排序
	 * 
	 * @param array
	 * @return
	 */
	public static int[] sortInsert(int[] array) {
        for (int i = 1; i < array.length; i++) {
            int temp = array[i];
            int j;
            for (j = i - 1; j >= 0 && temp < array[j]; j--) {
                array[j + 1] = array[j];
            }
            array[j + 1] = temp;
        }
        return array;
    }
}
