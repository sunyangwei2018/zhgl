package com.cf.framework.ruleengine.engine;

import com.cf.framework.ruleengine.IEngine;
import com.cf.framework.ruleengine.Result;
import com.cf.framework.ruleengine.StrategyModel;
import com.cf.framework.ruleengine.domain.Rule;
import com.cf.framework.ruleengine.domain.RuleGroup;
import com.ql.util.express.IExpressContext;

import java.util.List;

public class RuleGroupEngine implements IEngine<RuleGroup, List<IExpressContext>, Result> {

    private IEngine runner;

    public RuleGroupEngine() {
        runner = new ExpressEngine();
    }

    public RuleGroupEngine(IEngine runner) {
        this.runner = runner;
    }

    public void setRunner(IEngine runner) {
        this.runner = runner;
    }

    public Result execute(RuleGroup rules, List<IExpressContext> contexts) throws Exception {
        System.out.println("\n" + "规则组策略模式：" + rules.getStrategy().toString() + "\n");

        if (rules.getStrategy() == StrategyModel.and) {
            return and(rules, contexts);
        } else if (rules.getStrategy() == StrategyModel.or) {
            return or(rules, contexts);
        } else if (rules.getStrategy() == StrategyModel.exclude) {
            return exclude(rules, contexts);
        }
        return new Result();
    }

    private Result and(RuleGroup rules, List<IExpressContext> contexts) throws Exception {
        Result result = new Result();
        IEngine<Rule, IExpressContext, Result> engine = new RuleEngine(runner);
        for (Rule rule : rules.getValues()) {
            Result ruleResult = null;
            for (IExpressContext context : contexts) {
                ruleResult = engine.execute(rule, context);
                if (ruleResult.getSuccess()) {
                    result.addContext(context);
                    break;
                }
            }
            if ((ruleResult == null) || (!ruleResult.getSuccess())) {
                return new Result(false);
            }
        }
        result.setSuccess(true);
        return result;
    }

    private Result or(RuleGroup rules, List<IExpressContext> contexts) throws Exception {
        Result result = new Result();
        IEngine<Rule, IExpressContext, Result> engine = new RuleEngine(runner);
        for (Rule rule : rules.getValues()) {
            Result ruleResult = null;
            for (IExpressContext context : contexts) {
                ruleResult = engine.execute(rule, context);
                if (ruleResult.getSuccess()) {
                    result.addContext(context);
                    result.setSuccess(true);
                    return result;
                }
            }
        }
        return result;
    }

    private Result exclude(RuleGroup rules, List<IExpressContext> contexts) throws Exception {
        Result result = new Result();
        IEngine<Rule, IExpressContext, Result> engine = new RuleEngine(runner);
        for (IExpressContext context : contexts) {
            Result ruleResult = new Result();
            for (Rule rule : rules.getValues()) {
                ruleResult = engine.execute(rule, context);
                if (ruleResult.getSuccess()) {
                    break;
                }
            }
            if (!ruleResult.getSuccess()) {
                result.setSuccess(true);
                result.addContext(context);
            }
        }
        return result;
    }
}
