package com.cf.framework.pi.transport;

import com.cf.framework.pi.api.IConnector;
import com.cf.framework.pi.connector.jdbc.JdbcWriterConnector;
import com.cf.framework.pi.connector.jdbc.writer.OperatType;


public class JdbcWriterTransportor extends SyncTransportor {

    public JdbcWriterTransportor(String jndiName, String source) {
        IConnector writerConnector = new JdbcWriterConnector(jndiName, source);
        setConnector(writerConnector);
    }

    public JdbcWriterTransportor(String jndiName, String tableName, OperatType operatType) {
        IConnector writerConnector = new JdbcWriterConnector(jndiName, tableName, operatType);
        setConnector(writerConnector);
    }
}
