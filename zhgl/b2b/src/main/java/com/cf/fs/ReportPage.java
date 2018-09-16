package com.cf.fs;


import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.fileserver.TemporaryFileUploader;

/**
 * 报表分页文件上传服务
 * 1.0  2014-06-16
 *
 * @author XiongJian
 */
@Controller
@RequestMapping("/fileserver/reportpages")
public class ReportPage extends FsFile {

    private final String hostName = config.getProperty("FS_HOST_NAME");
    private final String homeDir = config.getProperty("FS_REPORTPAGES_HOME");
    private final String type = "reportpage";

    @RequestMapping("/putfile.do")
    public Map insert(InputStream is, String filename, String extradir,
            boolean archivesbydate) throws Exception {
        Map map = saveStreamFile(is, filename, extradir, archivesbydate);
        return map;
    }

    public Map queryReportPageDirectoryMap() {
        return queryDirectoryMap(hostName, type);
    }

    @RequestMapping("/getdir.do")
    public Map getReportPageDirectoryUrlMap() {
        return getDirectoryUrlMap(hostName, type);
    }

    private Map saveStreamFile(InputStream is, String fileName, String extraDir,
            boolean archivesByDate) throws Exception {
        if (null == is) {
            return null;
        }
        TemporaryFileUploader fu = new TemporaryFileUploader(is, archivesByDate);
        fu.setHostName(hostName);
        fu.setHomeDir(homeDir);
        fu.setExtraDir(extraDir);
        fu.setFileName(fileName);
        fu.upload();
        Map map = new HashMap();
        map.put("FILE_NAME", fu.getFileName());
        map.put("FILE_SIZE", fu.getFileSize());
        map.put("HD_HOST", fu.getHostName());
        return map;
    }
}
