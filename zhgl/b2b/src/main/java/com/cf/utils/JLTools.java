package com.cf.utils;

/*import org.apache.lucene.analysis.*;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
*/

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import org.dom4j.Element;
import org.dom4j.DocumentHelper;

import java.util.Iterator;

import org.dom4j.Document;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;




import java.sql.*;
import java.io.*;
import java.util.List;
import java.lang.reflect.Method;
import java.net.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
//import org.apache.log4j.*;
import java.util.*;
import java.util.zip.ZipInputStream;

/**
 *
 * <p>Title: 系统小工具</p>
 *
 * <p>Description: 此类是一个小工具的集合体。所谓小工具，即是在系统操作中时常会用到的一些辅助工具，
 * 如屏幕信息显示、X文件删除、XML数据集解析、特殊符号转换、操作系统信息取得 </p>
 *
 * @author WuKeQing
 * @version V7.0.0.0
 */
public class JLTools {
//  public static Logger Log = Logger.getLogger("V7");

    /*public static String chineseFC(String sCZ) throws Exception {
        String sSplit = "";
        boolean hasCZ = false;
        Reader r = null;
        try {
            Analyzer analyzer = new MIK_CAnalyzer();
            r = new StringReader(sCZ);
            TokenStream ts = (TokenStream) analyzer.tokenStream("", r);
            CharTermAttribute cta=ts.addAttribute(CharTermAttribute.class);  
            Token t = null;
            hasCZ = false;
            ts.reset();
            while(ts.incrementToken()){
            	cta = ts.getAttribute(CharTermAttribute.class);
            	if(cta.equals("sCZ")){
            		 hasCZ = true;
            	}
            }
            ts.end();
            ts.close();
            while ((t = ts.next()) != null) {
                sSplit += t.termText() + ",";
                if (t.termText().equals("sCZ")) {
                    hasCZ = true;
                }
            }
            r.close();
            if (sSplit.equals("") || (hasCZ == false)) {
                sSplit = sCZ + "," + sSplit;
            }
            return sSplit.substring(0, sSplit.length() - 1);
        } catch (Exception e) {
            throw e;
        } finally {
            r.close();
        }
    }*/

    /**
     * 此处将本类的实例初始化方法设为内部调用。这样处理的用意在于: 此类中的常量和方法全部都是static形式的，
     * 当外部调用类中常量或方法的时候，没有必要创建实例，于是干脆不允许其创建实例，而是直接从类名调用。
     */
    //得到本地计算机IP地址
    public static String getLocalHostIP() throws Exception {
        String sAddress = "";
        try {
            sAddress = InetAddress.getLocalHost().getHostAddress();
            return sAddress;
        } catch (Exception e) {
            throw e;
        }
    }

    //得到本地计算机名称
    public static String getLocalHostName() throws Exception {
        String sName = "";
        try {
            sName = InetAddress.getLocalHost().getHostName();
            return sName;
        } catch (Exception e) {
            throw e;
        }
    }

    //时间前移或后移,最小单位天
    public static java.sql.Timestamp chanDay(java.sql.Timestamp souDateTime,
            int day) {
        return new java.sql.Timestamp(souDateTime.getTime() + day * 0X5265C00L);
    }

    //日期前移或后移,最小单位天
    public static java.sql.Date chanDay(java.sql.Date souDate, int day) {
        return new java.sql.Date(souDate.getTime() + day * 0X5265C00L);
    }

    //两个日期比较，返回日期大的那个
    public static java.sql.Date compareDay(java.sql.Date date1,
            java.sql.Date date2) {
        return (date1.getTime() > date2.getTime()) ? date1 : date2;
    }

    //两个日期带时间比较，返回日期及时间大的那个
    public static java.sql.Timestamp compareDay(java.sql.Timestamp time1,
            java.sql.Timestamp time2) {
        return (time1.getTime() > time2.getTime()) ? time1 : time2;
    }

    //格式化数字
    public static double format(double d, int i) {
        String sFormat = "#.";
        for (int n = 0; n < i; n++) {
            sFormat += "0";
        }
        java.text.DecimalFormat df = new java.text.DecimalFormat(sFormat);
        return Double.parseDouble(df.format(d));
    }

    /*
     * public static void main(String[] args) { System.out.print(format(
     * -3.33456, 3));
     }
     */
    /**
     * 此方法将系统运行中尚未使用的内存资源时时显示在屏幕上。
     */
    public static void writeFreeMemoryToScreen() {
        System.out.println(Runtime.getRuntime().freeMemory() / (1024 * 1024) + "MB");
    }

    /**
     * 此方法用以删除一个文件。操作过程出错时，系统会报错，将报错信息写入报错日志，并终止操作。 <p>
     *
     * @param FileName String: 方法参数是以字符串形式代表的一个文件名。
     */
    public static void deleteFile(String FileName) throws Exception { //删除文件
        File fdelFile = null;
        try {
            fdelFile = new File(FileName);
            fdelFile.delete();
        } catch (Exception e) {
            throw e;
        } finally {
            fdelFile = null;
        }
    }

    public static void makeDirectory(String folderPath) throws Exception { //创建目录
        try {
            String filePath = folderPath;
            filePath = filePath.toString();
            java.io.File myFilePath = new java.io.File(filePath);
            if (!myFilePath.exists()) {
                myFilePath.mkdir();
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public static boolean deleteAllFile(String folderFullPath) { //删除指定文件夹下所有文件
        boolean ret = false;
        File file = new File(folderFullPath);
        if (file.exists()) {
            if (file.isDirectory()) {
                File[] fileList = file.listFiles();
                for (int i = 0; i < fileList.length; i++) {
                    String filePath = fileList[i].getPath();
                    deleteAllFile(filePath);
                }
            }
            if (file.isFile()) {
                file.delete();
            }
        }
        return ret;
    }

    /**
     * 此方法多用于通过解析XML格式的数据集得到某一指定列的所有值。操作过程出错时，系统会报错，将报错信息写入报错日志，并终止操作。
     *
     * @param XmlData String - 一个XML格式封装的文件。此文件的内容多为数据库查询结果，即数据集，由一条条纪录组成，
     * 每条记录的列数据格式相同。<p>
     * @param ParamName String - XMLData 数据集中的某一列之列名。<p>
     * @return Vector - 每条记录中，同列数据的集合。
     */
    public static Vector getParameterValue(String ParamName, String XmlData) throws
            Exception { //通过解析XML得到参数值
        Vector vec = null;
        Document doc = null;
        Element root = null;
        Iterator it = null;
        try {
            vec = new Vector();
            vec.clear();
            doc = DocumentHelper.parseText(XmlData);
            root = doc.getRootElement(); //得到XML根
            it = root.elementIterator(); //增加一个迭代器
            while (it.hasNext()) {
                Element item = (Element) it.next();
                if (item.getName().equals("PARAMDATA")) { //迭代查找PARAMDATA节点
                    if (item.attribute("parameter_name").getValue().equals(ParamName)) {
                        vec.add(item.attribute("parameter_value").getValue());
                    }
                }
            }
            return vec;
        } catch (Exception e) {
            throw e;
        } finally {
            if (vec == null) {
                vec.add("");
            }
            it = null;
            root = null;
            doc = null;
        }
    }

    /**
     *
     * @param ParamName String
     * @param XmlData String
     * @return Vector
     * @throws Exception
     * @deprecated
     */
    public static Vector getParameterValueEx(String ParamName, String XmlData) throws
            Exception { //通过解析XML得到参数值
        Document doc = null;
        Element root = null;
        List ls = null;
        Vector vec = null;
        int i = 0;
        try {
            doc = DocumentHelper.parseText(XmlData);
            ls = doc.selectNodes("//ROW");
            vec = new Vector();
            for (i = 0; i <= ls.size() - 1; i++) {
                root = (Element) ls.get(i);
                vec.add(root.attribute(ParamName).getValue());
            }
            if (vec.isEmpty()) {
                vec.add("");
            }
            return vec;
        } catch (Exception e) {
            throw e;
        } finally {
            root = null;
            doc = null;
        }
    }

    /**
     * 此方法用于写操作日志。操作过程出错时，系统会报错，将报错信息写入报错日志，并终止操作。 <p>
     *
     * @param msg String - 操作日志的内容。<p>
     * @param FileName String - 一个字符串格式的文件名，即记录操作日志的文件。
     */
    public static void writeTimerLog(String msg, String FileName) throws
            Exception { //写操作日志
        String tmp_s = "";
        java.text.SimpleDateFormat sdf = null;
        String date = "";
        FileWriter fw = null;
        try {
            sdf = new java.text.SimpleDateFormat(
                    "yyyy-MM-dd HH:mm:ss    ");
            date = sdf.format(new java.sql.Timestamp(System.currentTimeMillis()));
            fw = new FileWriter(FileName, true);
            switch (JLDefsys.CURRENT_OSLX) {
                case 0:
                    ;
                case 1:
                    tmp_s = date + msg; //+JLDefsys.CHAR_RETURN;
                    break;
                case 2:
                    tmp_s = date + msg;
                case 5:
                    tmp_s = date + msg;
                default:
                    break;
            }
            fw.write(tmp_s + "\n");
        } catch (Exception e) {
            throw e;
        } finally {
            fw.close();
            sdf = null;
            fw = null;
        }

    }

    public static java.sql.Timestamp cTimeToTimeStamp(String x) {
        String year = x.substring(0, 4); //1-4
        String month = x.substring(4, 6); //5-6
        String day = x.substring(6, 8); //7-8
        String hour = x.substring(9, 11); //10-11
        String min = x.substring(12, 14); //13-14
        String sec = x.substring(15, 17); //16-17
        String msec = x.substring(17, 20); //18-20
        return java.sql.Timestamp.valueOf(year + "-" + month + "-" + day + " "
                + hour + ":" + min + ":" + sec + "." + msec);
    }

    /**
     * 此方法将操作日志显示到屏幕。操作过程出错时，系统会报错，将报错信息写入报错日志，并终止操作。 <p>
     *
     * @param msg String - 操作日志的内容。
     * @deprecated
     */
    public static void writeTimerToScreen(String msg) throws Exception { //写操作日志
        java.text.SimpleDateFormat sdf = null;
        String date = "";
        try {
            sdf = new java.text.SimpleDateFormat(
                    "yyyy-MM-dd HH:mm:ss");
            date = sdf.format(new java.sql.Timestamp(System.currentTimeMillis()));
            System.out.println(Thread.currentThread().getName() + " is Operate");
            System.out.println(date + msg);
        } catch (Exception e) {
            throw e;
        } finally {
            sdf = null;
        }
    }

    /**
     * 此方法将操作日志显示到屏幕。操作过程出错时，系统会报错，将报错信息写入报错日志，并终止操作。 <p>
     *
     * @param msg String - 操作日志的内容。
     * @deprecated
     */
    public static void executeUpdate(String msg, Statement stmt) throws Exception { //屏幕输出调试信息
        try {
            if (JLDefsys.DEBUG_ENABLED) {
                System.out.println(msg);
            }
            stmt.executeUpdate(msg);
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * 此方法从部门或仓库代码中分离出公司代码。 <p>
     *
     * @param SouStr String - 部门或仓库代码。<p>
     * @return String - 公司代码。
     */
    public static String getGSID(String SouStr) throws Exception {
        if (JLDefsys.IGSJB == -1) {
            throw new Exception("取公司级别错误！" + JLTools.intToStr(JLDefsys.IGSJB));
        }
        return SouStr.substring(0, JLDefsys.IGSJB * 2);
    }

    /**
     * 此方法给字符串前后各加一个双引号。 <p>
     *
     * @param SouStr String - 需要加双引号的字符串。<p>
     * @return String - 加上了一对双引号的字符串。
     * @deprecated
     */
    public static String getQuot(String SouStr) {
        return JLDefsys.CHAR_QUOT + SouStr + JLDefsys.CHAR_QUOT;
    }

    /**
     * 此方法给字符串前后各加一个双引号。 <p>
     *
     * @param SouStr String - 需要加单引号的字符串。<p>
     * @return String - 加上了一对单引号的字符串。
     */
    public static String getStrQuot(String SouStr) { //字符串加单引号
        return JLDefsys.STR_QUOT + SouStr + JLDefsys.STR_QUOT;
    }

    /**
     * 此方法检查一个字符串是否为空。 <p>
     *
     * @param SouStr String - 检查的对象字符串。<p>
     * @return boolean - 如果是空串，则返回true，否则返回false。
     */
    public static boolean isNull(String SouStr) { //检查传入字符串是否为空
        return ((SouStr == null) || SouStr.trim().equals("")) ? true : false;

    }

    /**
     * 此方法将一个字符串内的所有(\\)括号内部分替换成(/)括号内部分。 <p>
     *
     * @param SouStr String - 替换的对象字符串。<p>
     * @return String - 替换后的字符串。
     */
    public static String replaceStrBackSlash(String SouStr) { //替换转义字符
        if (isNull(SouStr)) {
            SouStr = "";
        }
        return SouStr.replace('\\', '/');
    }

    /**
     * 此方法将一个字符串内的所有双引号替换成单引号。 <p>
     *
     * @param SouStr String - 替换的对象字符串。<p>
     * @return String - 替换后的字符串。
     */
    public static String replaceStrQuote(String SouStr) { //将双引号替换成单引号
        return SouStr.replace('"', '\'');
    }

    /**
     * 此方法用以得到当前操作系统类型。 <p>
     *
     * @return int - 返回操作系统类型的数字代表。返回值分别为是: <p> 0: WINDOWS 9X <p> 1: 微软操作系统 <p>
     * 2: IBM UNIX操作系统 <p> 3: 微系统 Solaris 操作系统 <p> 4: HP Unix 操作系统 <p> 5: 红帽子，红旗
     * LINUX <p> 6: SCO UNIX <p> 100: 其它操作系统
     */
    public static int getOsLx() { //得到操作系统类型
        int OSLX = 100; //其它操作系统
        if (getOSName().indexOf("WINDOWS 9") != -1) { //WINDOWS 9X
            OSLX = 0;
        } else if (getOSName().indexOf("WIN") != -1) { // 微软操作系统
            OSLX = 1;
        } else if (getOSName().indexOf("AIX") != -1) { //IBM UNIX操作系统
            OSLX = 2;
        } else if (getOSName().indexOf("SUNOS") != -1) { //微系统 Solaris 操作系统
            OSLX = 3;
        } else if (getOSName().indexOf("HP") != -1) { //HP Unix 操作系统
            OSLX = 4;
        } else if (getOSName().indexOf("LINUX") != -1) { //红帽子，红旗 LINUX
            OSLX = 5;
        } else if (getOSName().indexOf("SCO") != -1) { //SCO UNIX
            OSLX = 6;
        }
        return OSLX;
    }

    /**
     * 此方法用于得到当前操作系统名称。<p>
     *
     * @return String - 返回字符串类型的操作系统名称。
     */
    private static String getOSName() { //得到操作系统名称
        return System.getProperty("os.name").toString().toUpperCase().trim();
    }

    /**
     * 此方法将一个文本信息写入文件。操作过程出错时，系统会报错，将报错信息写入报错日志，并终止操作。<p>
     *
     * @param XmlStr String - 文本信息 <p>
     * @param XmlFileName String - 文件名
     */
    public static void writeXmlFile(String XmlStr, String XmlFileName) throws
            Exception { //将文本信息写入文件
        try {
            writeTimerLog(XmlStr, XmlFileName);
        } catch (Exception e) {
            throw e;
        }

    }

    /**
     * 此方法将String变量转换未Int变量
     *
     * @param sou String
     * @return int
     */
    public static int strToInt(String sou) {
        return Integer.parseInt(sou);
    }

    public static long strToLong(String sou) {
        return Long.parseLong(sou);
    }

    /**
     * 此方法将String变量转换未Float变量
     *
     * @param sou String
     * @return float
     * @deprecated
     */
    public static float strToFloat(String sou) {
        return Float.parseFloat(sou);
    }

    /**
     * 此方法将String变量转换未Date变量
     *
     * @param sou String
     * @return Date
     */
    public static java.sql.Date strToDate(String sou) {
        return java.sql.Date.valueOf(sou);
    }

    /**
     * 此方法将String变量转换未Timestamp变量
     *
     * @param sou String
     * @return Timestamp
     */
    public static java.sql.Timestamp strToDateTime(String sou) {
        return java.sql.Timestamp.valueOf(sou);
    }

    /**
     * 此方法将String变量转换未Double变量
     *
     * @param sou String
     * @return double
     */
    public static double strToDouble(String sou) {
        return Double.parseDouble(sou);
    }

    public static String dateToStr(java.sql.Date sou) {
        return sou.toString();
    }

    public static String dateTimeToStr(java.sql.Timestamp sou) {
        return sou.toString();
    }

    public static String doubleToStr(double sou) {
        return String.valueOf(sou);
    }

    /**
     *
     * @param sou float
     * @return String
     * @deprecated
     */
    public static String floatToStr(float sou) {
        return String.valueOf(sou);
    }

    public static String intToStr(int sou) {
        return String.valueOf(sou);
    }

    public static String intToStr(long sou) { //yc alter重载方法
        return String.valueOf(sou);
    }

    public static String byteTohexStr(byte[] bytes) {
        StringBuilder buf = new StringBuilder(bytes.length * 2);
        for (int i = 0; i < bytes.length; i++) {
            if (((int) bytes[i] & 0xff) < 0x10) {
                buf.append("0");
            }
            buf.append(Long.toString((int) bytes[i] & 0xff, 16));
        }
        return buf.toString();
    }

    public static byte[] hexStrTobyte(String hexString) {
        if (hexString == null || hexString.length() % 2 != 0) {
            return null;
        }
        byte[] hanzi = new byte[hexString.length() / 2];
        for (int i = 0; i < hexString.length(); i += 2) {
            hanzi[i
                    / 2] = (byte) (Integer.parseInt(hexString.substring(i, i + 2), 16)
                    & 0xff);
        }
        return hanzi;
    }

    public static String formatStr(String ch, String s, int count) {
        while ((count - s.length()) > 0) {
            s = ch + s;
        }
        return s;
    }

    public static String getCurTimestamp() {
        String sjc_sql = "";
        try {
            if (JLDefsys.getDBName().trim().equals("ORACLE")) {
                sjc_sql = "to_char(systimestamp,'YYYYMMDDHH24MISSFF2')";
            } else if (JLDefsys.getDBName().trim().equals("DB2")) {
                sjc_sql = "to_char(current timestamp,'YYYYMMDDHH24MISSFF2')";
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return sjc_sql;
    }

    public static int testCountCode(int iCount, String cStr) {
        int iOdd = 0; // 奇
        int iEven = 0; // 偶
        int iTestCode = 0;
        int iTmp = 0;
        String sCodeStr = "";

        sCodeStr = cStr;
        if (iCount == 12) {
            for (iTmp = 0; iTmp < iCount; iTmp = iTmp + 2) {
                iOdd += strToInt(String.valueOf(sCodeStr.charAt(iTmp)));
                iEven += strToInt(String.valueOf(sCodeStr.charAt(iTmp + 1)));
            }
            iTestCode = 10 - (iOdd + iEven * 3) % 10;
        } else if (iCount == 7) {
            for (iTmp = 0; iTmp < iCount; iTmp = iTmp + 2) {
                iOdd += strToInt(String.valueOf(sCodeStr.charAt(iTmp)));
                if (iTmp != 6) {
                    iEven += strToInt(String.valueOf(sCodeStr.charAt(iTmp + 1)));
                }
            }
            iTestCode = 10 - (iOdd * 3 + iEven) % 10;
        }
        if (iTestCode == 10) {
            iTestCode = 0;
        }
        sCodeStr = sCodeStr + JLTools.intToStr(iTestCode);
        return iTestCode;
    }

    public static String getConfigDir() throws Exception { //返回JL里面配置文件目录位置
        String TempDirStr = "";
        try {
            Properties p = getEnvVars();
            TempDirStr = p.getProperty(JLDefsys.JL_CONFIG_HOME);
            TempDirStr = replaceStrBackSlash(TempDirStr);
            if (!JLTools.isNull(TempDirStr)) {
                if (!TempDirStr.substring(TempDirStr.length() - 1).equals("/")) {
                    TempDirStr += "/";
                }
            }
            return TempDirStr;
        } catch (Exception e) {
            throw e;
        }

    }

    private static Properties getEnvVars() throws Exception {
        Process p = null;
        Properties envVars = new Properties();
        Runtime r = Runtime.getRuntime();
        try {
            if (getOsLx() == 0) {
                p = r.exec("command.com /c set");
            } else if (getOsLx() == 1) {
                p = r.exec("cmd.exe /c set");
            } else {
                p = r.exec("env");
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line;
            while ((line = br.readLine()) != null) {
                int idx = line.indexOf("=");
                String key = line.substring(0, idx);
                String value = line.substring(idx + 1);
                envVars.setProperty(key, value);
            }
            br.close();
        } catch (Exception e) {
            throw e;
        }
        return envVars;
    }

    /**
     *
     * @param str String
     * @return String 将字符串转换为半角字符串
     */
    public static String strToBJZF(String str) {
        int i = 0;
        String tmp = "";
        for (i = 0; i <= str.length() - 1; i++) {
            if ((int) str.charAt(i) >= 65281 && (int) str.charAt(i) <= 65373) {
                tmp += (char) ((int) str.charAt(i) - 65248);
            } else if ((int) str.charAt(i) == 12288) {
                tmp += (char) 32;
            } else {
                tmp += str.charAt(i);
            }
        }
        return tmp;
    }
    private static final int DEFAULT_BUFFER_SIZE = 1024 * 8;

    public static void copyLarge(InputStream input, OutputStream output) throws
            IOException {
        byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
        int n = 0;
        while (-1 != (n = input.read(buffer))) {
            output.write(buffer, 0, n);
        }
    }

    public static byte[] toByteArray(InputStream input) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        copyLarge(input, output);
        output.close();
        input.close();
        return output.toByteArray();
    }

    /**
     *
     * @param str String
     * @return String 将字符串转换为全角字符串
     */
    public static String strToQJZF(String str) {
        int i = 0;
        String tmp = "";
        for (i = 0; i <= str.length() - 1; i++) {
            if ((int) str.charAt(i) >= 33 && (int) str.charAt(i) <= 125) {
                tmp += (char) ((int) str.charAt(i) + 65248);
            } else if ((int) str.charAt(i) == 32) {
                tmp += (char) 12288;
            } else {
                tmp += str.charAt(i);
            }
        }
        return tmp;
    }

    /**
     *
     * @param str String
     * @return boolean 判断是否存在半角字符
     */
    public static boolean existsBJZF(String str) {
        int i = 0;
        boolean result = false;
        for (i = 0; i <= str.length() - 1; i++) {
            if ((int) str.charAt(i) >= 32 && (int) str.charAt(i) <= 125) {
                result = true;
                break;
            }
        }
        return result;
    }

    /**
     *
     * @param str String
     * @return boolean 判断是否存在全角字符
     */
    public static boolean existsQJZF(String str) {
        int i = 0;
        boolean result = false;
        for (i = 0; i <= str.length() - 1; i++) {
            if ((int) str.charAt(i) >= 65281 && (int) str.charAt(i) <= 65373
                    || (int) str.charAt(i) == 12288) {
                result = true;
                break;
            }
        }
        return result;
    }

    /**
     *
     * @param str String
     * @return boolean 判断是否存在需要转换字符
     */
    public static boolean existsXMLTransfer(String str) {
        int i = 0;
        boolean result = false;
        for (i = 0; i <= str.length() - 1; i++) {
            if (str.charAt(i) == '<' || str.charAt(i) == '>' || str.charAt(i) == '\''
                    || str.charAt(i) == '"' || str.charAt(i) == '&') {
                result = true;
                break;
            }
        }
        return result;
    }

    /**
     *
     * @param str String
     * @return String 替换XML中存在的转意字符
     */
    public static String xmlTransfer(String str) {
        int i = 0;
        String tmp = "";
        for (i = 0; i <= str.length() - 1; i++) {
            if (str.charAt(i) == '<') {
                tmp += "&lt;";
            } else if (str.charAt(i) == '>') {
                tmp += "&gt;";
            } else if (str.charAt(i) == '\'') {
                tmp += "&apos;";
            } else if (str.charAt(i) == '&') {
                tmp += "&amp;";
            } else if (str.charAt(i) == '"') {
                tmp += "&quot;";
            } else {
                tmp += str.charAt(i);
            }
        }
        return tmp;
    }

    public static boolean existsKXJS(String str) {
        //return str.matches("[-|+]{0,1}[\\d]{1}[.][\\d]*[E|e]{1}[+|-]{0,1}[\\d]*");
        if (str == null) {
            return false;
        }
        if (str.length() >= 2) {
            return ((str.indexOf("E") != -1) || (str.indexOf("e") != -1)) ? true : false;
        } else {
            return false;
        }
    }

    /**
     *
     * @param str String
     * @return boolean 判断是否字符串是否包含某个字符
     */
    public static boolean jl_contains(String str1, String str2) {
        boolean b_result = false;
        char[] stra_1 = str1.toCharArray();
        char[] stra_2 = str2.toCharArray();
        int i_index = 0;
        int i_length = stra_2.length;
        int i_end = stra_1.length - i_length;
        while (i_index <= i_end) {
            int i_temp = i_index;
            int i_TrueFlag = 0;
            for (int i = 0; i < i_length; i++) {
                if (stra_2[i] == stra_1[i_temp]) {
                    i_TrueFlag++;
                } else {
                    break;
                }
                if (i_TrueFlag == i_length) {
                    return true;
                }
                i_temp++;
            }
            i_index++;
        }
        return b_result;
    }

    /**
     *
     * @param str String
     * @param i int
     * @return String 将科学计数法转换为普通数值
     */
    public static String kxjsTransfer(String d, int i) {
        String sFormat = "#.";
        for (int n = 0; n < i; n++) {
            sFormat += "0";
        }
        java.text.DecimalFormat df = new java.text.DecimalFormat(sFormat);
        return df.format(Double.parseDouble(d));
    }
    //解密ZIP文件流,解压缩ZIP文件得到数据 weiqiao20091030 add
/*
    public static String getXML_UnZip(String content) throws Exception {
        FileOutputStream onf = null;
        FileInputStream fin = null;
        ZipInputStream zip = null;
        String ZipFileName = "jltemp/"
                + Math.abs(new java.util.Random().nextInt())
                + ".zip";
        String XmlFileName = "jltemp/"
                + Math.abs(new java.util.Random().nextInt())
                + ".xml";
        try {
            if (content == null || content.length() == 0
                    || content.indexOf("DATAPACKET") != -1) {
                return content;
            }
            String sTmp = "";
            byte[] data = new sun.misc.BASE64Decoder().decodeBuffer(content);
            onf = new FileOutputStream(ZipFileName, true);
            onf.write(data);
            onf.flush();
            onf.close();
            File inFile = new File(ZipFileName);
            fin = new FileInputStream(inFile);
            zip = new ZipInputStream(fin);
            byte[] bBuf = new byte[(int) zip.getNextEntry().getSize()];
            int len;
            onf = new FileOutputStream(XmlFileName);
            while ((len = zip.read(bBuf)) != -1) {
                onf.write(bBuf, 0, len);
            }
            zip.closeEntry();
            zip.close();
            fin.close();
            onf.flush();
            onf.close();
            inFile = new File(XmlFileName);
            fin = new FileInputStream(inFile);
            bBuf = new byte[(int) inFile.length()];
            while (fin.read(bBuf) != -1) {
                sTmp += new String(bBuf);
            }
            fin.close();
            return sTmp;
        } catch (Exception e) {
            throw e;
        } finally {
            onf = null;
            fin = null;
            zip = null;
            JLTools.deleteFile(ZipFileName);
            JLTools.deleteFile(XmlFileName);
        }
    }
*/
    public static String sendToSync(String data, String sendurl) throws Exception {
        DataOutputStream wr = null;
        DataInputStream rd = null;
        HttpURLConnection conn = null;
        String sValue = "";
        DBObject insert = new BasicDBObject();
        try {
            URL url = new URL(sendurl);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoInput(true);
            conn.setDoOutput(true);
            //String BOUNDARY = "------------------------7dc2fd5c0894";
            //conn.setRequestProperty("Content-Type", "application/octet-stream");//multipart/form-data; boundary=---------------------------7d33a816d302b6");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            conn.setRequestMethod("POST");
            conn.connect();
            wr = new DataOutputStream(conn.getOutputStream());
//          logger.info(data);
            if (data != null) {
                wr.write(data.getBytes("UTF-8"));
            }
            wr.flush();
            int returnCode = conn.getResponseCode();

            DataInputStream dis = new DataInputStream(conn.getInputStream());
            byte[] aryZlib = JLTools.toByteArray(dis);
            if (dis != null) {
                dis.close();
                dis = null;
            }
            sValue = new String(aryZlib, "UTF-8");
            insert.put("status", 1);
            return sValue;
        } catch (Exception e) {
//          logger.error("sendToSync err",e);
        	sValue = e.toString();
        	insert.put("status", 0);
            throw e;
        } finally {
            if (rd != null) {
                rd.close();
                rd = null;
            }
            if (wr != null) {
                wr.close();
                wr = null;
            }
            if (conn != null) {
                conn.disconnect();
                conn = null;
            }
            /*if(sendurl.indexOf("?filename=") == -1 
            		&& sendurl.indexOf(".xml") == -1
            		&& sendurl.indexOf("streamDocument") == -1){
	            DBCollection dbCollection = MongodbHandler.getDB().getCollection("interfaceLog");
	            insert.put("url", sendurl);
	            insert.put("data", data);
	            insert.put("result", sValue);
	            insert.put("date", FormTools.getSysTime());
	            dbCollection.insert(insert);
        	}*/
        }
    }
    private static Map XML_KEY = new HashMap(4);
    private static String REG_XML = ".*[<>&\"].*";

    static {
        XML_KEY.put('<', "&lt;");
        XML_KEY.put('>', "&gt;");
        XML_KEY.put('&', "&amp;");
        XML_KEY.put('"', "&quot;");
    }

    public static String getXmlString(String colvalue) {
        if (colvalue != null && !colvalue.equals("") && colvalue.matches(REG_XML)) {
            StringBuilder xmlStr = new StringBuilder();
            for (int j = 0; (colvalue != null && j < colvalue.length()); j++) {
                if (XML_KEY.containsKey(colvalue.charAt(j))) {
                    xmlStr.append(XML_KEY.get(colvalue.charAt(j)).toString());
                } else {
                    xmlStr.append(colvalue.charAt(j));
                }
            }
            return xmlStr.toString();
        } else {
            return colvalue;
        }
    }
    
    public static boolean isEmpty(String value) {
        return (value == null || value.equals(null) || value.equals("") || value
    				.equals("null"));
    }  
    
    public static java.sql.Date parseDate(String sdate) {
    	
    	Calendar calendar = Calendar.getInstance();
  	  try {
				sdate = JLSql.strToDateStr(sdate);
				calendar.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(sdate));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return new java.sql.Date(calendar.getTimeInMillis());

//        GregorianCalendar gc = null;
//
//        if (sdate.indexOf("-") == -1) {
//
//            gc = new GregorianCalendar(Integer.parseInt(sdate.substring(0, 4)),
//                    Integer.parseInt(sdate.substring(4, 6)) - 1,
//                    Integer.parseInt(sdate.substring(6, 8)));
//        } else {
//            gc = new GregorianCalendar(Integer.parseInt(sdate.substring(0, 4)),
//                    Integer.parseInt(sdate.substring(5, 7)) - 1,
//                    Integer.parseInt(sdate.substring(8, 10)));
//        }
//
//        return new java.sql.Date(gc.getTimeInMillis());

    }

    public static java.sql.Timestamp parseTimestamp(String sdate) {

    	  Calendar calendar = Calendar.getInstance();
    	  try {
					sdate = JLSql.strToDateStr(sdate);
					calendar.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(sdate));
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return new java.sql.Timestamp(calendar.getTimeInMillis());
    	
//        GregorianCalendar gc = null;
//
//        if (sdate.indexOf("-") == -1) {
//
//            gc = new GregorianCalendar(Integer.parseInt(sdate.substring(0, 4)),
//                    Integer.parseInt(sdate.substring(4, 6)) - 1,
//                    Integer.parseInt(sdate.substring(6, 8)),
//                    Integer.parseInt(sdate.substring(9, 11)),
//                    Integer.parseInt(sdate.substring(12, 14)),
//                    Integer.parseInt(sdate.substring(15, 20)));
//        } else {
//            gc = new GregorianCalendar(Integer.parseInt(sdate.substring(0, 4)),
//                    Integer.parseInt(sdate.substring(5, 7)) - 1,
//                    Integer.parseInt(sdate.substring(8, 10)),
//                    Integer.parseInt(sdate.substring(11, 13)),
//                    Integer.parseInt(sdate.substring(14, 16)),
//                    Integer.parseInt(sdate.substring(17, 22)));
//        }
//
//        return new java.sql.Timestamp(gc.getTimeInMillis());

    }    
    
    public static String toStr(Object value) {
        if (value == null) {
            return "";
        }
        String type = value.getClass().getName();
        if ("java.lang.Integer".equals(type)) {
            return String.valueOf(value);
        } else if ("java.lang.String".equals(type)) {
            return (String) value;
        } else if ("java.lang.Double".equals(type)) {
            return String.valueOf(value);
        } else if ("java.lang.Float".equals(type)) {
            return String.valueOf(value);
        } else if ("java.lang.Character".equals(type)) {
            return String.valueOf(value);
        } else if ("java.util.Date".equals(type)) {
            return String.valueOf(value);
        } else if ("java.sql.Date".equals(type)) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            return sdf.format(value);
        } else if ("java.sql.Timestamp".equals(type)) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            return sdf.format(value);
        } else if ("java.math.BigDecimal".equals(type)) {
            return value.toString();
        } else {
            return String.valueOf(value);
        }
    }

    public static double toDouble(String sou) {
        return Double.parseDouble(sou);
    }    
    
    /**
	 * @todo 将一个 JavaBean 对象转化为一个 Map
	 * @param bean
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map convertBean(Object bean) throws RuntimeException,
			Exception {
		Class type = bean.getClass();
		Map returnMap = new HashMap();
		BeanInfo beanInfo = Introspector.getBeanInfo(type);
		Object obj = null;

		PropertyDescriptor[] propertyDescriptors = beanInfo
				.getPropertyDescriptors();

		for (int i = 0; i < propertyDescriptors.length; i++) {
			PropertyDescriptor descriptor = propertyDescriptors[i];
			String propertyName = descriptor.getName().toUpperCase();
			if ((!propertyName.equals("class"))
					&& (propertyDescriptors[i].getPropertyType() != null)) {
				Method readMethod = descriptor.getReadMethod();
				Object result = readMethod.invoke(bean, new Object[0]);
				if (result != null) {
					returnMap.put(propertyName, result);
				} else {
					returnMap.put(propertyName, "");
				}
			}
		}
		return returnMap;
	}
}
