package com.cf.framework.pi.connector.jdbc.writer;

public interface ISQLWriter {
    
    int[] write(Object row) throws Exception;
}
