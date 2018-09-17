package com.cf.utils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

public class GetOracleSQLIn {		  
	    /** 
	     * 2014-8-4 上午10:39:28 
	     * @param args 
	     *  
	     */  

	    public static void main(String[] args) {  
	        // TODO Auto-generated method stub  
	    	List<Integer> subAryList = new ArrayList<Integer>();
//	    	subAryList.add(1);
//	    	subAryList.add(2);
	    	String parameter="a.billno";
	    	System.out.println(getOracleSQLIn(subAryList,100,parameter));    	
	    }  
	    
	    
//	    public static void main(String[] args) {  
//	        // TODO Auto-generated method stub  
//	  
//	          int[] ary = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20};//要分割的数组  
//	          int splitSize = 5;//分割的块大小  
//	          String str="";
//	          Object[] subAry = splitAry(ary, splitSize);//分割后的子块数组  
//	          String a = null;
//	          for(Object obj: subAry){//打印输出结果  
//	              int[] aryItem = (int[]) obj;  
//	               for(int i = 0; i < aryItem.length; i++){  
//	                  // System.out.print(aryItem[i]+",");  
//	                    a=aryItem[i]+",";
//	                   //a=a.substring(0,a.length()-1);
//	                   System.out.print("("+a+")");
//	               }
//	               System.out.println();  
//	          }  
//	  
//	    } 
//	  public static void main(String [] args) {
//		int splitSize1=5;
//		StringBuffer billno=new StringBuffer(" ");
//		for (int i = 0; i < splitSize1; i++) {
//			billno=billno.append("a.billno in ('"+("")+"') or ");
//		}
//		System.out.println(billno.toString().substring(0,billno.length()-3));
//	}
	    /** 
	     * splitAry方法<br> 
	     * 2014-8-4 上午10:45:36 
	     * @param ary 要分割的数组 
	     * @param subSize 分割的块大小 
	     * @return 
	     * 
	     */  
//	    public static Object[] splitAry(int[] ary, int subSize) {  
//	          int count = ary.length % subSize == 0 ? ary.length / subSize: ary.length / subSize + 1;  
//	  
//	          List<List<Integer>> subAryList = new ArrayList<List<Integer>>();  
//	  
//	          for (int i = 0; i < count; i++) {  
//	           int index = i * subSize;  
//	           List<Integer> list = new ArrayList<Integer>();  
//	           int j = 0;  
//	               while (j < subSize && index < ary.length) {  
//	                    list.add(ary[index++]);  
//	                    j++;  
//	               }  
//	           System.out.println(list);
//	           subAryList.add(list);  
//	          }  
//	            
//	          Object[] subAry = new Object[subAryList.size()];  
//	            
//	          for(int i = 0; i < subAryList.size(); i++){  
//	               List<Integer> subList = subAryList.get(i);  
//	               int[] subAryItem = new int[subList.size()];  
//	               for(int j = 0; j < subList.size(); j++){  
//	                   subAryItem[j] = subList.get(j).intValue();  
//	               }  
//	               subAry[i] = subAryItem;  
//	               
//	          }  
//	          return subAry;  
//	         }  
	    
	    
//	    public static String getInParameter(List list, String parameter) {  
//	        if (!list.isEmpty()) {  
//	            List<String> setList = new ArrayList<String>(0);  
//	            Set set = new HashSet();  
//	            StringBuffer stringBuffer = new StringBuffer();  
//	            for (int i = 1; i <= list.size(); i++) {  
//	                set.add("'" + list.get(i - 1) + "'");  
//	                if (i % 900 == 0) {//900为阈值  
//	                    setList.add(StringUtils.join(set.iterator(), ","));  
//	                    set.clear();  
//	                }  
//	            }  
//	            if (!set.isEmpty()) {  
//	                setList.add(StringUtils.join(set.iterator(), ","));  
//	            }  
//	            stringBuffer.append(setList.get(0));  
//	            for (int j = 1; j < setList.size(); j++) {  
//	                stringBuffer.append(") or " + parameter + " in (");  
//	                stringBuffer.append(setList.get(j));  
//	            }  
//	            return stringBuffer.toString();  
//	        } else {  
//	            return "''";  
//	        }  
//	  
//	    } 
//	} 
	    
	    public static String getOracleSQLIn(List<?> ids, int count, String field) {
	        count = Math.min(count, 1000);
	        int len = ids.size();
	        int size = len % count;
	        if (size == 0) {
	            size = len / count;
	        } else {
	            size = (len / count) + 1;
	        }
	        StringBuilder builder = new StringBuilder();
	        builder.append(" and (");
	        for (int i = 0; i < size; i++) {
	            int fromIndex = i * count;
	            int toIndex = Math.min(fromIndex + count, len);
	            //System.out.println(ids.subList(fromIndex, toIndex));
	            String productId = StringUtils.defaultIfEmpty(StringUtils.join(ids.subList(fromIndex, toIndex), "','"), "");
	            if (i != 0) {
	                builder.append(" or ");
	            }
	            builder.append(field).append(" in ('").append(productId).append("')");
	        }
	        builder.append(" )");
	        return StringUtils.defaultIfEmpty(builder.toString(), field + " in ('')");
	    }
}
