package com.cf.framework.pi.api;

public interface ITransaction {

    void begin() throws Exception;

    void commit() throws Exception;

    void rollback() throws Exception;
}
