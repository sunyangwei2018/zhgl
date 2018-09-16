package com.cf.forms;

import java.io.Serializable;

import com.cf.annotation.Test;
@Test(value="测试")
public class Person implements Serializable {
	//属性值不序列化
	private transient String name="";
	private String age="";
	
	public Person(String name,String age){
		this.name=name;
		this.age=age;
	}
	
	public String toString(){
		return "姓名:"+this.name+"年龄:"+this.age;
	}
}
