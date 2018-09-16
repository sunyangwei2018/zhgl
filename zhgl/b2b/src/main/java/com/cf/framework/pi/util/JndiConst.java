package com.cf.framework.pi.util;

public class JndiConst {
    
    public static final String SCM = "scm";
    public static final String VIP = "vip";
    public static final String SH = "sh";
    public static final String WORKFLOW = "workflow";

    public String getJndiName(String key) throws Exception {
        String jndiName = null;
        if (SCM.equals(key)) {
            jndiName = "java:comp/env/jdbc/scm";
        } else if (VIP.equals(key)) {
            jndiName = "java:comp/env/jdbc/vip";
        } else if (SH.equals(key)) {
            jndiName = "java:comp/env/jdbc/sh";
        } else if (WORKFLOW.equals(key)) {
            jndiName = "java:comp/env/jdbc/workflow";
        }
        if (jndiName == null) {
            throw new Exception("jndiName not permitted.");
        }
        return jndiName;
    }
}
