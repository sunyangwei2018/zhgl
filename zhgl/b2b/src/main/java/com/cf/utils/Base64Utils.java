package com.cf.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * base64加密解密
 * @author sun
 *
 */
public class Base64Utils {

	// 将 s 进行 BASE64 编码 
	public static String getBASE64(String s) { 
		if (s == null) return null; 
		return (new sun.misc.BASE64Encoder()).encode( s.getBytes() ); 
	} 

	// 将 s 进行 BASE64 编码 
	public static String getBASE64(byte[] s) { 
		if (s == null) return null; 
		return (new sun.misc.BASE64Encoder()).encode( s ); 
	} 
	// 将 BASE64 编码的字符串 s 进行解码 
	public static String getFromBASE64(String s) { 
		if (s == null) return null; 
			BASE64Decoder decoder = new BASE64Decoder(); 
			try { 
				byte[] b = decoder.decodeBuffer(s); 
				return new String(b,"UTF-8"); 
			} catch (Exception e) { 
				return null; 
		} 
	}
	
    //图片转化成base64字符串  
    public static String GetImageStr(String path)  
    {//将图片文件转化为字节数组字符串，并对其进行Base64编码处理  
        String imgFile = path;//待处理的图片  
        InputStream in = null;  
        byte[] data = null;  
        //读取图片字节数组  
        try   
        {  
            in = new FileInputStream(imgFile);          
            data = new byte[in.available()];  
            in.read(data);  
            in.close();  
        }   
        catch (IOException e)   
        {  
            e.printStackTrace();  
        }  
        //对字节数组Base64编码  
        BASE64Encoder encoder = new BASE64Encoder();  
        return encoder.encode(data);//返回Base64编码过的字节数组字符串  
    }  
    
  //base64字符串转化成图片  
    public static byte[] GenerateImage(String imgStr)  
    {   //对字节数组字符串进行Base64解码并生成图片  
        BASE64Decoder decoder = new BASE64Decoder();  
            //Base64解码  
            byte[] b = null;
			try {
				b = decoder.decodeBuffer(imgStr);
            for(int i=0;i<b.length;++i)  
            {  
                if(b[i]<0)  
                {//调整异常数据  
                    b[i]+=256;  
                }  
            }  
            //生成jpeg图片  
            return b;  
   		}catch (IOException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
		}
			return b; 
    }  
}
