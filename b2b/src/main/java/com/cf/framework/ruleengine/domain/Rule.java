package com.cf.framework.ruleengine.domain;

import java.util.List;

public class Rule extends Group<Expression> {

    public Rule() {
        super();
    }

    public Rule(List values) {
        super(values);
    }
}
