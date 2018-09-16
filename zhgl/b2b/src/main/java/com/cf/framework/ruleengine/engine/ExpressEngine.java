package com.cf.framework.ruleengine.engine;

import com.cf.framework.ruleengine.IEngine;
import com.cf.framework.ruleengine.domain.Expression;
import com.ql.util.express.ExpressRunner;
import com.ql.util.express.IExpressContext;

public class ExpressEngine implements IEngine<Expression, IExpressContext, Object> {

    private Boolean isCache = true;
    private ExpressRunner runner;

    public ExpressEngine() {
        this.runner = new ExpressRunner();
    }

    public ExpressEngine(ExpressRunner runner) {
        this.runner = runner;
    }

    public ExpressRunner getRunner() {
        return runner;
    }

    public void setRunner(ExpressRunner runner) {
        this.runner = runner;
    }

    public Object execute(Expression express, IExpressContext context) throws Exception {
        return runner.execute(express.getExpres(), context, null, isCache, false);
    }
}
