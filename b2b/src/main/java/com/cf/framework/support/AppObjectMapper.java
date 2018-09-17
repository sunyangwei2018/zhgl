package com.cf.framework.support;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class AppObjectMapper extends ObjectMapper{
	
	public AppObjectMapper(){
		super();
		setSerializationInclusion(JsonInclude.Include.NON_NULL);
		configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}
}
