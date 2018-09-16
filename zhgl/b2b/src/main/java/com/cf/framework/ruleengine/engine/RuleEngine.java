package com.cf.framework.ruleengine.engine;

import com.cf.framework.ruleengine.IEngine;
import com.cf.framework.ruleengine.Result;
import com.cf.framework.ruleengine.StrategyModel;
import com.cf.framework.ruleengine.domain.Expression;
import com.cf.framework.ruleengine.domain.Rule;
import com.ql.util.express.IExpressContext;

public class RuleEngine implements IEngine<Rule, IExpressContext, Result> {

    private IEngine runner;

    public RuleEngine() {
        this.runner = new ExpressEngine();
    }

    public RuleEngine(IEngine runner) {
        this.runner = runner;
    }

    public void setRunner(IEngine runner) {
        this.runner = runner;
    }

    public Result execute(Rule rule, IExpressContext context) throws Exception {
        Result result = new Result();
        if (rule.getStrategy() == StrategyModel.and) {
            result = and(rule, context);
        } else if (rule.getStrategy() == StrategyModel.or) {
            result = or(rule, context);
        }

        System.out.println("规则执行结果：" + result.getSuccess().toString());
        printrule(rule, rule.getStrategy(), context);

        return result;
    }

    private Result and(Rule rule, IExpressContext context) throws Exception {
        Boolean issuccess = false;
        for (Expression expression : rule.getValues()) {
            Object result = runner.execute(expression.getExpres(), context);
            if (result.equals(false)) {
                issuccess = false;
                break;
            } else if (result.equals(true)) {
                issuccess = true;
            }
        }
        return new Result(issuccess);
    }

    private Result or(Rule rule, IExpressContext context) throws Exception {
        Boolean issuccess = false;
        for (Expression expression : rule.getValues()) {
            Object result = runner.execute(expression.getExpres(), context);
            if (result.equals(true)) {
                issuccess = true;
                break;
            }
        }
        return new Result(issuccess);
    }

    private void printrule(Rule rule, StrategyModel strategy, IExpressContext context) {
        StringBuilder sb = new StringBuilder();
        String model = null;
        if (strategy == StrategyModel.and) {
            model = "并且";
        } else if (strategy == StrategyModel.or) {
            model = "或者";
        }

        for (Expression expression : rule.getValues()) {
            if (sb.length() == 0) {
                sb.append("规则：").append("(").append(expression.getExpres()).append(")");
            } else {
                sb.append(" ").append(model).append(" ").append("(").append(expression.getExpres()).append(")");
            }
        }
        System.out.println(sb.toString());
        System.out.println("上下文环境：" + context + "\n");
    }
}
