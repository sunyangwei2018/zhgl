package com.cf.fs;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.fileserver.TemporaryFileUploader;

/**
 * 资源文件下载
 * 1.0  2014-06-16
 *
 * @author XiongJian
 */
@Controller
@RequestMapping("/fileserver/download/resources")
public class ResourceFile extends FsFile {

    private final String hostName = config.getProperty("FS_HOST_NAME");
    private final String homeDir = config.getProperty("FS_RESOURCES_HOME");
    private final String type = "resource";

    @RequestMapping("/putfile.do")
    public Map insert(InputStream is, String filename, String extradir)
            throws Exception {
        Map map = saveStreamFile(is, filename, extradir);
        return map;
    }

    public Map queryResourceDirectoryMap() {
        return queryDirectoryMap(hostName, type);
    }

    @RequestMapping("/getdir.do")
    public Map getResourceDirectoryUrlMap() {
        return getDirectoryUrlMap(hostName, type);
    }

    private Map saveStreamFile(InputStream is, String fileName, String extraDir)
            throws Exception {
        if (null == is) {
            return null;
        }
        TemporaryFileUploader fu = new TemporaryFileUploader(is, false);
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
