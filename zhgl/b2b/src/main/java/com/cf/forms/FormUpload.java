package com.cf.forms;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.PicturesManager;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.hwpf.usermodel.Picture;
import org.apache.poi.hwpf.usermodel.PictureType;
import org.apache.poi.poifs.filesystem.OfficeXmlFileException;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;
import org.w3c.dom.Document;

import com.cf.framework.JLBill;
import com.cf.fs.Attachment;
import com.cf.utils.JLTools;
import com.sun.org.apache.xml.internal.serialize.XHTMLSerializer;

import java.net.URLEncoder;

@Controller
@RequestMapping("/FormUpload")
public class FormUpload extends JLBill{
	@Autowired
	private Attachment attachment;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/upload.do")
	public Map upload(HttpServletRequest request,HttpServletResponse response,String XmlData) throws Exception{	
		Map map = new HashMap();
		InputStream in=null;
		try {
			Map<String, MultipartFile> fileMap = ((MultipartHttpServletRequest)request).getFileMap();
			Object[] key = fileMap.keySet().toArray();
			JSONArray ja = new JSONArray();
			for(int i=0;i<key.length;i++){
				MultipartFile file = (MultipartFile) fileMap.get(key[i].toString());
				if(!file.isEmpty()){
					//每一个item就代表一个表单输出项
					in=null;	
					in=file.getInputStream();
			        
					String filename = URLEncoder.encode(file.getOriginalFilename().toString(),"UTF-8");
			        long filesize = file.getSize();
					byte[] aryZlib = JLTools.toByteArray(in);
					
					String url = FormTools.FILE_URL + "/fileserver/attachments/putfile.do?"
							   + "filename="+filename+"&filesize="+filesize+"&filedesc="+filename;
					String resultString = FormTools.sendToSync(aryZlib, url);
					
					JSONObject resultData=new JSONObject();
					if(resultString.startsWith("{") && resultString.indexOf("Exception")==-1){
						resultData.put("FILEID", key[i].toString());
						resultData.put("STATE", 1);
						resultData.putAll(JSONObject.fromObject(resultString));
					}else{
						resultData.put("FILEID", key[i].toString());
						resultData.put("STATE", 0);
					}
					ja.add(resultData);
				}
			}
			map.put("resultData", ja);
			map.put("STATE", 1);
		} catch (Exception e) {
			map.put("STATE", 0);
			e.printStackTrace();
		} finally {
			if(in != null){
				in.close();
			}
		}	
		return map;			
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/multiUpload.do")
	public Map multiUpload(HttpServletRequest request,HttpServletResponse response,String XmlData) throws Exception{	
		Map map = new HashMap();
		InputStream in = null;
		JSONArray ja=new JSONArray();
		try {
			MultiValueMap<String, MultipartFile> multiFileMap = ((MultipartRequest)request).getMultiFileMap();
			Iterator ite = multiFileMap.keySet().iterator();
			
			while (ite.hasNext()) {
				String key = ite.next().toString();
				List<MultipartFile> files = multiFileMap.get(key);
				for(int i=0;i<files.size();i++){
					MultipartFile file = files.get(i);
					if(!file.isEmpty()){
						//每一个item就代表一个表单输出项
						in=null;	
						in=file.getInputStream();
						String filename = URLEncoder.encode(file.getOriginalFilename().toString(),"UTF-8");
						long filesize=file.getSize();
						byte[] aryZlib = JLTools.toByteArray(in);
						String url = FormTools.FILE_URL + "/fileserver/attachments/putfile.do?"
								   + "filename="+filename+"&filesize="+filesize+"&filedesc="+filename;
						String resultString = FormTools.sendToSync(aryZlib, url);
//						String resultString = attachment.insertFile(in, filename, filesize, filename).toString();
						JSONObject resultData=new JSONObject();
						if(resultString.startsWith("{")&&resultString.indexOf("Exception")==-1){
							resultData.put("FILEID", key);
							resultData.put("STATE", 1);
							resultData.putAll(JSONObject.fromObject(resultString));
						}else{
							resultData.put("FILEID", key);
							resultData.put("STATE", 0);
						}
						ja.add(resultData);
					}
				}				
			}
			map.put("resultData", ja);
		} catch (Exception e) {
			map.put("STATE", 0);
			e.printStackTrace();
			throw new Exception(e.getMessage());
		} finally {
			if(in != null ){
				in.close();
			}
		}	
		return map;			
	}
	
	/**
	 * 图片预览
	 * @param attchId
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("/img.do")
	public void imgPreview(String attchId,Integer width,Integer height, HttpServletRequest request,HttpServletResponse response) throws IOException{
		//lo.info("查看ID为{}的图片", attchId);
		InputStream inStream = null;
	    OutputStream outStream = null;
		response.reset();
        //response.setContentType("application/octet-stream; charset=utf-8");
		//String filename = URLEncoder.encode(request.getParameter("filename").toString(),"UTF-8");

        //response.setHeader("Content-disposition", "attachment; filename="+filename);
                           //java.net.URLEncoder.encode(request.getParameter("filename"), "utf-8"));
        String sql =  "select  'http://'||a.vd_host||'/'||a.vd_home||'/'||b.hd_date||'/'||b.hd_size||'/'||b.file_name||substr(b.file_desc,instr(b.file_desc ,'.')) as \"FILE_URL\""
        		+ "	   from fs_hosts a,fs_files b where a.host=b.hd_host and b.file_name='"+attchId+"'";
        Map map = queryForMap(tms, sql);
        String path = FormTools.isNull(map)?"":map.get("FILE_URL").toString();
        URL url = new URL(path);
        URLConnection conn = url.openConnection();
        inStream = conn.getInputStream();
        outStream = response.getOutputStream();
//        final HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.IMAGE_JPEG);
//        return new ResponseEntity<byte[]>(data, headers, HttpStatus.OK);
		
		/*binaryStream = bsmTumbnail.getImageContent().getBinaryStream();
		
		BufferedImage src = ImageIO.read(binaryStream);
		BufferedImage resizeImg = resizeByWidAndHei(src, width, height);
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		ImageIO.write(resizeImg, "jpg", out);
		return out.toByteArray();*/
        
        byte[] buffer = new byte[1204];
    	
        int byteread = 0;
        while ((byteread = inStream.read(buffer)) != -1) {
        	outStream.write(buffer, 0, byteread);
        }
        InputStream imageStream = new ByteArrayInputStream(buffer); 
    	response.setContentType(MediaType.IMAGE_JPEG_VALUE);
    	response.setContentLength(buffer.length);
        final BufferedInputStream in = new BufferedInputStream(imageStream);
        FileCopyUtils.copy(in, response.getOutputStream());
        response.flushBuffer();

	}	
	
	@RequestMapping("/download.do")
	public void download(HttpServletRequest request,HttpServletResponse response) throws Exception{
	    InputStream inStream = null;
	    OutputStream outStream = null;
	    try {
	    	response.reset();
	        response.setContentType("application/octet-stream; charset=utf-8");
			String filename = URLEncoder.encode(request.getParameter("filename").toString(),"UTF-8");

	        response.setHeader("Content-disposition", "attachment; filename="+filename);
	                           //java.net.URLEncoder.encode(request.getParameter("filename"), "utf-8"));
	        
	        String path = request.getParameter("url");
	        URL url = new URL(path);
	        URLConnection conn = url.openConnection();
	        inStream = conn.getInputStream();
	        outStream = response.getOutputStream();
	        byte[] buffer = new byte[1204];
	
	        int byteread = 0;
	        while ((byteread = inStream.read(buffer)) != -1) {
	        	outStream.write(buffer, 0, byteread);
	        }
	    }catch (Exception e) {
	        throw e;
	    }finally{
	    	if (inStream != null){
	    		inStream.close();
	    	}
	    	if (outStream != null) {
	    		outStream.flush();
	    		outStream.close();
	    	}
	    }
	}

	@RequestMapping("/previewWord.do")
	public void previewWord(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
	    InputStream inStream = null;

		String path = request.getParameter("url");
		//String path = "http://localhost:8080/form4_/aa.doc";
		URL url = new URL(path);
	    URLConnection conn = url.openConnection();
	    inStream = conn.getInputStream();
		
	    //XWPFDocument wordDocument = new XWPFDocument(inStream);//WordToHtmlUtils.loadDoc(new FileInputStream(inputFile));
	    HWPFDocument wordDocument = null;
	    try {  
            wordDocument = new HWPFDocument(inStream);//WordToHtmlUtils.loadDoc(new FileInputStream(inputFile));  
        } catch (OfficeXmlFileException e) {  
            throw new Exception("仅支持Office2003");
        }  
        WordToHtmlConverter wordToHtmlConverter = new WordToHtmlConverter(  
                DocumentBuilderFactory.newInstance().newDocumentBuilder()  
                        .newDocument());  
        wordToHtmlConverter.setPicturesManager(new PicturesManager(){  
             public String savePicture( byte[] content,  
                     PictureType pictureType, String suggestedName,  
                     float widthInches, float heightInches ){  
                 return "../temp/"+suggestedName;  
             }  
        });  
        wordToHtmlConverter.processDocument(wordDocument);
        //save pictures  
        List pics=wordDocument.getPicturesTable().getAllPictures();  
        
        if(pics!=null){  
            for(int i=0;i<pics.size();i++){  
                Picture pic = (Picture)pics.get(i);  
                System.out.println();  
                try {  
                	String p = FormUpload.class.getResource("").getPath();
                	p = p.split("WEB-INF/")[0] +"temp/";
                    pic.writeImageContent(
                    	new FileOutputStream(p + pic.suggestFullFileName())
                    );  
                } catch (FileNotFoundException e) {  
                    e.printStackTrace();  
                }    
            }  
        }  
        
        Document htmlDocument = wordToHtmlConverter.getDocument();  
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        DOMSource domSource = new DOMSource(htmlDocument);  
        StreamResult streamResult = new StreamResult(out);  
  
        Transformer serializer = TransformerFactory.newInstance().newTransformer();  
        serializer.setOutputProperty(OutputKeys.ENCODING, "GB2312");  
        serializer.setOutputProperty(OutputKeys.INDENT, "yes");  
        serializer.setOutputProperty(OutputKeys.METHOD, "html");  
        serializer.transform(domSource, streamResult);  
        out.close();  
        
        //response.setContentType("text/html;charset=UTF-8"); 
        PrintWriter pw = response.getWriter();
        String aa = new String(out.toByteArray());
        pw.write(aa);  
        
		
	}
	
}