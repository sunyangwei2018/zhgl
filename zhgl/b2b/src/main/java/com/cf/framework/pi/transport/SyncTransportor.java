package com.cf.framework.pi.transport;

import com.cf.framework.pi.api.AbstractDataProcessor;
import com.cf.framework.pi.api.IConnector;

public class SyncTransportor extends AbstractDataProcessor {

    private IConnector connector;

    public SyncTransportor() {
    }

    public SyncTransportor(IConnector connector) {
        this.connector = connector;
    }

    public void setConnector(IConnector connector) {
        this.connector = connector;
    }

    public Object doProcess(Object data) throws Exception {
        if (connector == null) {
            throw new Exception("Null connector not permitted.");
        }
        try {
            connector.connect();
            return connector.process(data);
        } catch (Exception e) {
            throw e;
        } finally {
            connector.disconnect();
        }
    }
}
