package com.cf.framework.pi.api;

public interface IConnector extends IDataProcessor {

    void connect()  throws Exception;

    void disconnect()  throws Exception;
}
