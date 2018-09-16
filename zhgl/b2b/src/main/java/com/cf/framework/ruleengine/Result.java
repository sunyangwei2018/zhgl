package com.cf.framework.ruleengine;

import com.ql.util.express.IExpressContext;
import java.util.ArrayList;
import java.util.List;

public class Result {

    private Boolean success = false;
    private List<IExpressContext> contexts = null;

    public Result() {
    }

    public Result(Boolean success) {
        this.success = success;
    }

    public void addContext(IExpressContext context) {
        if (contexts == null) {
            contexts = new ArrayList<IExpressContext>();
        }
        contexts.add(context);
    }

    public void cleanContexts() {
        if (contexts != null) {
            contexts.clear();
        }
    }

    public List<IExpressContext> getContexts() {
        if (contexts == null) {
            contexts = new ArrayList<IExpressContext>();
        }
        return contexts;
    }

    public void setContexts(List<IExpressContext> contexts) {
        this.contexts = contexts;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean issuccess) {
        this.success = issuccess;
    }
}
