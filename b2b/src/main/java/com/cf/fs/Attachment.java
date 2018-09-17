package com.cf.fs;



import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.fileserver.AttachmentUploader;

/**
 * 附件(归档)文件上传服务
 * @author XiongJian
 */
@Controller
@RequestMapping("/fileserver/attachments")
public class Attachment extends FsFile {

    private final String hostName = config.getProperty("FS_HOST_NAME");
    private final String homeDir = config.getProperty("FS_ATTACHMENTS_HOME");
    private final String type = "attachment";

    @RequestMapping("/putfile.do")
    public Map insertFile(InputStream is, String filename, long filesize, String filedesc)
            throws Exception {
        boolean result = true;
        Map map = queryAttachmentMap(filename, filesize);
        if (null == map) {
            map = saveStreamFile(is, filesize,filedesc);
            if (null != map) {
                map.put("FILE_DESC", filedesc);
                result = saveMapToFsFiles(map);
                if (result) {
                    Map vdir = queryAttachmentDirectoryMap();
                    if (null == vdir) {
                        throw new RuntimeException();
                    }
                    map.putAll(vdir);
                }
            }
        }
        if (null == map || !result) {
            throw new RuntimeException();
        }
        map.put("FILE_DESC", filedesc);
        map.put("FILE_URL", toUrl(map, false));
        return map;
    }

    @RequestMapping("/putbillfile.do")
    public Map insertBillFile(InputStream is, String filename, long filesize,
            String filedesc, String billid, String billtype,
            String billcompany, String billsysid)
            throws Exception {
        boolean result = true;
        Map map = insertFile(is, filename, filesize, filedesc);
        if (null != map) {
            map.put("BILL_ID", billid);
            map.put("BILL_TYPE", billtype);
            map.put("BILL_COMPANY", billcompany);
            map.put("BILL_SYSID", billsysid);
            result = saveMapToFsBills(map, true);
        }
        if (null == map || !result) {
            throw new RuntimeException();
        }
        return map;
    }

    public Map queryAttachmentDirectoryMap() {
        return queryDirectoryMap(hostName, type);
    }

    @RequestMapping("/getdir.do")
    public Map getAttachmentDirectoryUrlMap() {
        return getDirectoryUrlMap(hostName, type);
    }

    public Map queryAttachmentMap(String fileName, long fileSize) {
        Map map = null;
        if ((null != fileName && !"".equals(fileName)) && (0 < fileSize)) {
            String sql = "SELECT A.FILE_NAME, A.FILE_SIZE, A.FILE_DESC," +
                    " B.VD_HOST, B.VD_HOME, A.HD_DATE, A.HD_SIZE, A.HD_HOST" +
                    " FROM FS_FILES A, FS_HOSTS B" +
                    " WHERE A.FILE_NAME = :FILE_NAME" +
                    " AND A.FILE_SIZE = :FILE_SIZE" +
                    " AND B.TYPE = :TYPE" +
                    " AND A.HD_HOST = B.HOST";
            try {
                Map p = new HashMap();
                p.put("FILE_NAME", fileName);
                p.put("FILE_SIZE", fileSize);
                p.put("TYPE", type);
                map = queryForMap(tms, sql, p);
            } catch (IncorrectResultSizeDataAccessException ex) {
                // do nothing.
            }
        }
        return map;
    }

    @RequestMapping("/getfile.do")
    public Map getAttachmentUrlMap(String filename, long filesize) {
        Map map = queryAttachmentMap(filename, filesize);
        if (null != map) {
            map.put("FILE_URL", toUrl(map, false));
        }
        return map;
    }

    public List queryBillAttachmentList(String billId, String billType,
            String billCompany, String billSysid) {
        List result = null;
        if ((null != billId && !"".equals(billId)) &&
                (null != billType && !"".equals(billType)) &&
                (null != billCompany && !"".equals(billCompany)) &&
                (null != billSysid && !"".equals(billSysid))) {
            String sql = "SELECT A.FILE_NAME, A.FILE_SIZE, A.FILE_DESC," +
                    " C.VD_HOST, C.VD_HOME, B.HD_DATE, B.HD_SIZE, B.HD_HOST" +
                    " FROM FS_BILLS A, FS_FILES B, FS_HOSTS C" +
                    " WHERE A.BILL_ID = :BILL_ID" +
                    " AND A.BILL_TYPE = :BILL_TYPE" +
                    " AND A.BILL_COMPANY = :BILL_COMPANY" +
                    " AND A.BILL_SYSID = :BILL_SYSID" +
                    " AND A.FILE_NAME = B.FILE_NAME" +
                    " AND A.FILE_SIZE = B.FILE_SIZE" +
                    " AND C.TYPE = :TYPE" +
                    " AND B.HD_HOST = C.HOST";
            try {
                Map p = new HashMap();
                p.put("BILL_ID", billId);
                p.put("BILL_TYPE", billType);
                p.put("BILL_COMPANY", billCompany);
                p.put("BILL_SYSID", billSysid);
                p.put("TYPE", type);
                result = queryForList(tms, sql, p);
            } catch (IncorrectResultSizeDataAccessException ex) {
                // do nothing.
            }
        }
        return result;
    }

    @RequestMapping("/getbillfilelist.do")
    public List getBillAttachmentUrlList(String billid, String billtype,
            String billcompany, String billsysid) {
        List result = queryBillAttachmentList(billid, billtype, billcompany, billsysid);
        if (null != result) {
            if (!result.isEmpty()) {
                Map map = null;
                for (Object item : result) {
                    map = (Map) item;
                    map.put("FILE_URL", toUrl(map, false));
                }
            } else {
                result = null;
            }
        }
        return result;
    }

    private boolean saveMapToFsFiles(Map map) {
        boolean result = true;
        String sql = "INSERT INTO FS_FILES (FILE_NAME, FILE_SIZE, FILE_DESC," +
                " HD_HOST, HD_HOME, HD_DATE, HD_SIZE)" +
                " VALUES ('"+map.get("FILE_NAME").toString().split("\\.")[0]+"', FILE_SIZE?, FILE_DESC?," +
                " HD_HOST?, HD_HOME?, HD_DATE?, HD_SIZE?)";
        try {
            try {
                execSQL(tms, sql, map);
            } catch (DuplicateKeyException ex) {
                // 忽略主键冲突异常，什么也不处理
                // 不使用"update-insert"模式就是不想更新"FILE_DESC,HD_HOST,HD_HOME,HD_DATE"字段的值
            }
        }
        catch (Exception ex) {
            result = false;
            ex.printStackTrace();
        }
        return result;
    }

    private boolean saveMapToFsBills(Map map, boolean override) {
        String sql = null;
        int n = 0;
        boolean result = true;
        if (override) {
            sql = "UPDATE FS_BILLS" +
                    " SET" +
                    " FILE_DESC = FILE_DESC?," +
                    " HD_HOST = HD_HOST?" +
                    " WHERE" +
                    " FILE_NAME = FILE_NAME? AND FILE_SIZE = FILE_SIZE? AND" +
                    " BILL_ID = BILL_ID? AND BILL_TYPE = BILL_TYPE? AND" +
                    " BILL_COMPANY = BILL_COMPANY? AND BILL_SYSID = BILL_SYSID?";
            try {
                n = execSQL(tms, sql, map);
            } catch (Exception ex) {
                result = false;
                ex.printStackTrace();
            }
        }
        if (result && 0 == n) {
            sql = "INSERT INTO FS_BILLS (BILL_ID, BILL_TYPE, BILL_COMPANY," +
                    " BILL_SYSID, FILE_NAME, FILE_SIZE, FILE_DESC, HD_HOST)" +
                    " VALUES (BILL_ID?, BILL_TYPE?, BILL_COMPANY?," +
                    " BILL_SYSID?, FILE_NAME?, FILE_SIZE?, FILE_DESC?, HD_HOST?)";
            try {
                execSQL(tms, sql, map);
            } catch (Exception ex) {
                result = false;
                ex.printStackTrace();
            }
        }
        return result;
    }

    private Map saveStreamFile(InputStream is, long fileSize,String filedesc) throws Exception {
        if (null == is) {
            return null;
        }
        System.out.println(filedesc.substring(filedesc.lastIndexOf("."),filedesc.length()));
        AttachmentUploader au = new AttachmentUploader(is);
        au.setSuffix(filedesc.substring(filedesc.lastIndexOf("."),filedesc.length()));
        au.setHostName(hostName);
        au.setHomeDir(homeDir);
        au.setFileSize(fileSize);
        au.setRandomUniqueFileName();
        //上传前先删除
        au.delete();
        au.upload();
        Map map = new HashMap();
        map.put("FILE_NAME", au.getFileName());
        map.put("FILE_SIZE", au.getFileSize());
        map.put("HD_HOST", au.getHostName());
        map.put("HD_HOME", au.getHomeDir());
        map.put("HD_DATE", au.getDateDir());
        map.put("HD_SIZE", au.getSizeDir());
        return map;
    }
}
