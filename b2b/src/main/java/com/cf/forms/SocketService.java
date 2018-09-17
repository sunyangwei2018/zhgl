package com.cf.forms;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.nio.ByteBuffer;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;

public class SocketService {
	public static void main(String[] args) throws IOException {
		ServerSocketChannel server = ServerSocketChannel.open();
		ServerSocket socket =  server.socket();
		server.socket().bind(new InetSocketAddress(8080));
		server.configureBlocking(true);
		ByteBuffer buf = ByteBuffer.allocate(100);
		while (true) {
			SocketChannel channel = server.accept();
			if(channel!=null){
				channel.read(buf);
				buf.flip();
				while(buf.hasRemaining()){
					System.out.print((char) buf.get());
				}
				buf.clear();
				//System.out.println("11111");
			}
		}
		
	}
}
