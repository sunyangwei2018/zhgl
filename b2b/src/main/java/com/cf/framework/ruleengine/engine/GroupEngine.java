
package com.cf.framework.ruleengine.engine;

import com.cf.framework.ruleengine.IEngine;
import com.cf.framework.ruleengine.Result;
import com.cf.framework.ruleengine.domain.Group;
import com.ql.util.express.IExpressContext;

import java.util.List;

public class GroupEngine implements IEngine<Group, List<IExpressContext>, Result> {

    public Result execute(Group express, List<IExpressContext> context) throws Exception {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}
