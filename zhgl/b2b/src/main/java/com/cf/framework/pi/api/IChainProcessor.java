package com.cf.framework.pi.api;

public interface IChainProcessor extends IDataProcessor {

    IChainProcessor setProcessor(IChainProcessor convertor);

    IChainProcessor getProcessor();
}
