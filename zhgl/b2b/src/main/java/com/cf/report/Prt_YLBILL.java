package com.cf.report;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import oracle.net.ano.SupervisorService;

@Controller
@RequestMapping("/reportYLBILL")
public class Prt_YLBILL extends BaseReport {

	@Override
	protected void printBefore(Map para) {
		// TODO Auto-generated method stub
	}

	@Override
	protected void printAfter(Map para) {
		// TODO Auto-generated method stub
		
	}
	
	@RequestMapping("getJson.do")
	public void getJson(String json, HttpServletRequest request,
            HttpServletResponse response,HttpServletResponse response2,String billno,String tbbj){
		try {
			long a=System.currentTimeMillis();
			//downPdf(json, request, response2, billno, tbbj);
			long b=System.currentTimeMillis();
			System.out.println(b-a);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
		}
	}
}
