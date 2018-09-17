package com.cf.forms;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;


public class SerializableDemo {
	public static void main(String[] args) throws Exception {
		File  f = new File("SerializedPerson");
		serialize(f);
		deserialize(f);
	}
	
	//序列化对象方法
	public static void serialize(File file) throws IOException{
		OutputStream outFile =  new FileOutputStream(file);
		ObjectOutputStream obj = new ObjectOutputStream(outFile);
		obj.writeObject(new Person("张三","18"));
		obj.close();
	}
	
	//反序列对象方法
	public static void deserialize(File file) throws IOException, ClassNotFoundException{
		InputStream inputFile = new FileInputStream(file);
		ObjectInputStream obj = new ObjectInputStream(inputFile);
		Object p =(Object) obj.readObject();
		System.out.println(p);
	}
}
