package com.cf.fs;
import com.cf.framework.JLBill;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.IncorrectResultSizeDataAccessException;


/**
 * URL Utilities
 * @author XiongJian
 */
public class FsFile extends JLBill {

    public List queryDirectoryList(String hostName) {
        List list = null;
        if (null != hostName && !"".equals(hostName)) {
            String sql = "SELECT A.TYPE, A.VD_HOST, A.VD_HOME" +
                    " FROM FS_HOSTS A" +
                    " WHERE A.HOST = :HOSTNAME";
            try {
                Map p = new HashMap();
                p.put("HOSTNAME", hostName);
                list = queryForList(tms, sql, p);
            } catch (IncorrectResultSizeDataAccessException ex) {
                // do nothing.
            }
        }
        return list;
    }

    public Map queryDirectoryMap(String hostName, String type) {
        Map map = null;
        if ((null != hostName && !"".equals(hostName)) &&
                (null != type && !"".equals(type))) {
            String sql = "SELECT A.VD_HOST, A.VD_HOME" +
                    " FROM FS_HOSTS A" +
                    " WHERE A.HOST = :HOSTNAME" +
                    " AND A.TYPE = :TYPE";
            try {
                Map p = new HashMap();
                p.put("HOSTNAME", hostName);
                p.put("TYPE", type);
                map = queryForMap(tms, sql, p);
            } catch (IncorrectResultSizeDataAccessException ex) {
                // do nothing.
            }
        }
        return map;
    }

    public Map getDirectoryUrlMap(String hostname, String type) {
        Map map = queryDirectoryMap(hostname, type);
        if (null != map) {
            map.put("DIR_URL", toUrl(map, false));
        }
        return map;
    }

    protected String toUrl(Map map, boolean https) {
        String url = null;
        if (null != map) {
            if (map.containsKey("VD_HOST")) {
                if (!"".equals(map.get("VD_HOST")) && !"/".equals(map.get("VD_HOST"))) {
                    url = "" + map.get("VD_HOST");
                } else {
                    throw new RuntimeException();
                }
            } else {
                throw new RuntimeException();
            }
            if (map.containsKey("VD_HOME")) {
                if (!"".equals(map.get("VD_HOME")) && !"/".equals(map.get("VD_HOME"))) {
                    url += "/" + map.get("VD_HOME");
                }
            }
            if (map.containsKey("HD_DATE")) {
                if (!"".equals(map.get("HD_DATE")) && !"/".equals(map.get("HD_DATE"))) {
                    url += "/" + map.get("HD_DATE");
                }
            }
            if (map.containsKey("HD_SIZE")) {
                if (!"".equals(map.get("HD_SIZE")) && !"/".equals(map.get("HD_SIZE"))) {
                    url += "/" + map.get("HD_SIZE");
                }
            }
            if (map.containsKey("FILE_NAME")) {
                if (!"".equals(map.get("FILE_NAME")) && !"/".equals(map.get("FILE_NAME"))) {
                    url += "/" + map.get("FILE_NAME");
                }
            }
            if (!https) {
                url = "http://" + url;
            } else {
                url = "https://" + url;
            }
        } else {
            throw new RuntimeException();
        }
        return url;
    }
}
