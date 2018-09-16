package com.cf.framework.ruleengine;

public interface IEngine<T, K, R> {

    public R execute(T express, K context) throws Exception;
}
