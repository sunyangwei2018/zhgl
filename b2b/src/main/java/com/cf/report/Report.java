package com.cf.report;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/report")
public class Report extends BaseReport {

	@Override
	protected void printBefore(Map para) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void printAfter(Map para) {
		// TODO Auto-generated method stub
		
	}

}
