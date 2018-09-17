package com.cf.framework.pi.transport;

import com.cf.framework.pi.connector.jdbc.JdbcReaderConnector;

public class JdbcReaderTransportor extends SyncTransportor {

    private JdbcReaderConnector readerConnector;

    public JdbcReaderTransportor(String jndiName) {
        readerConnector = new JdbcReaderConnector(jndiName);
        setConnector(readerConnector);
    }

    public void setSql(String sql) {
        readerConnector.setSql(sql);
    }
}
