package com.cf.utils;

import java.sql.DriverManager;
import java.sql.SQLException;

public class GetTasknoProcedure {

	
	public String GetTaskno(String Taskno,String dd_flag){
        //变量  
        java.sql.Connection conn = null;  
        java.sql.CallableStatement cs = null;  
        try {  
            //声明驱动  
            Class.forName("oracle.jdbc.driver.OracleDriver");  
            //得到链接  
            conn = DriverManager.getConnection("jdbc:oracle:thin:@192.168.0.102:1521:orcl","tms","tms");  
            //创建CallableStatement,调用过程必须使用  
            //cs = conn.prepareCall("{call MYPROC1(?,?)}");  
            cs = conn.prepareCall("{call p_gettaskno(?,?)}");  
            //给？赋值   
            cs.setString(1, dd_flag);
            cs.registerOutParameter(2,java.sql.Types.VARCHAR);  
            //执行  
            cs.execute();
            //取出返回值  
            Taskno = cs.getString(2);   
            
        } catch (Exception e) {  
            e.printStackTrace();  
        }
		return Taskno;		
	}
}
