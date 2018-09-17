package com.cf.forms;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface FormPlugIn{
	public Boolean check(Map json, int bdbh, HttpServletRequest request) throws Exception;
	public Boolean insertBefore(Map json, int bdbh, HttpServletRequest request) throws Exception;
	public Boolean insertAfter(Map json, int bdbh, HttpServletRequest request) throws Exception;
	public Boolean updateBefore(Map json, int bdbh, HttpServletRequest request) throws Exception;
	public Boolean updateAfter(Map json, int bdbh, HttpServletRequest request) throws Exception;
	@Deprecated
	public Boolean saveBefore(Map json, int bdbh, HttpServletRequest request,HttpServletResponse response) throws Exception;
	@Deprecated
	public Boolean saveAfter(Map json, int bdbh, HttpServletRequest request) throws Exception;
	public Boolean queryBefore(Map json) throws Exception;
	


}
