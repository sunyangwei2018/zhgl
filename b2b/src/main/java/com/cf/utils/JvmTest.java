package com.cf.utils;

public class JvmTest {
	private int stackLength=1;
	public void stackLeak(){
		stackLength++;
		stackLeak();
	};
	public static void main(String[] args) {
		/*JvmTest oom= new JvmTest();
		try{
			oom.stackLeak();
			}catch(Throwable e){
				System.out.println("stack length："+oom.stackLength);
				throw e;
			}*/
		String[] strs={"城市-ER1", "额度-ER2"};
		StringBuilder builder = new StringBuilder();
		for(String str:strs){
			String[] s1 = str.split("-");
			builder.append(s1[1]+",");
		}
		System.out.println(builder.toString().substring(0, builder.toString().length()-1));
	}
}
