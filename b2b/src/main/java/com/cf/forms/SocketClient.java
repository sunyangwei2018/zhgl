package com.cf.forms;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.nio.channels.SocketChannel;
import java.util.Scanner;

import com.itextpdf.text.pdf.ByteBuffer;

public class SocketClient {
	public static void main(String[] args) throws IOException {
		SocketClient client = new SocketClient();
		System.out.println("请输入:");
        byte[] b = new byte[1024];  
        
        while (true) {
        	//读取数据  
            int n = System.in.read(b);  
            //转换为字符串  
            String msg = new String(b,0,n); 
            if(msg.equals("return\r\n")){
            	break;
            }
        	client.socketOpenBIO(msg);
		}
		
	}
	
	
	public void socketOpenBIO(String msg) throws IOException{
		//String msg ="hello";
		//初始化socket,建立socket与channel绑定关系
		SocketChannel  soketChannel = SocketChannel.open();
		//初始化远程连接地址
		SocketAddress remote = new InetSocketAddress("127.0.0.1",8080);
		//I/O处理设置阻塞,这也是默认方式,可不设置
		soketChannel.configureBlocking(true);
		//建立连接
		soketChannel.connect(remote);
		java.nio.ByteBuffer buf = java.nio.ByteBuffer.allocate(100);
		buf.clear();
		buf.put(msg.getBytes());
		
		//切换读模式
		buf.flip();
		while(buf.hasRemaining()){
			//System.out.println((char) buf.get());
			soketChannel.write(buf);
		}
		//清空缓存会覆盖
		buf.clear();
		//清空已读缓存
		//buf.compact();
		//System.out.println(soketChannel.isOpen());
	}
}
