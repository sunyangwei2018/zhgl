package com.cf.paramconfig.entity;

import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;
import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class ParameterObjectKey implements Serializable {
    private String paramClass;

    private String paramKey;

    private Date effectiveDate;

    public ParameterObjectKey() {
        
    }

    public ParameterObjectKey(String paramClass, String paramKey, Date effectiveDate) {
        this.paramClass = paramClass;
        this.paramKey = paramKey;
        this.effectiveDate = effectiveDate;
    }

    /**
     * <p>参数类别</p>
     */
    public String getParamClass() {
        return paramClass;
    }

    /**
     * <p>参数类别</p>
     */
    public void setParamClass(String paramClass) {
        this.paramClass = paramClass;
    }

    /**
     * <p>参数主键</p>
     */
    public String getParamKey() {
        return paramKey;
    }

    /**
     * <p>参数主键</p>
     */
    public void setParamKey(String paramKey) {
        this.paramKey = paramKey;
    }

    /**
     * <p>生效日期</p>
     */
    public Date getEffectiveDate() {
        return effectiveDate;
    }

    /**
     * <p>生效日期</p>
     */
    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) { return false; }
        if (obj == this) { return true; }
        if (obj.getClass() != getClass()) {return false;}
        final ParameterObjectKey rhs = (ParameterObjectKey) obj;
        return
        	 Objects.equal(this.paramClass, rhs.paramClass)
        	&& Objects.equal(this.paramKey, rhs.paramKey)
        	&& Objects.equal(this.effectiveDate, rhs.effectiveDate)
        ;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(
        	this.paramClass
        	,this.paramKey
        	,this.effectiveDate
        	);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
        	.addValue(this.paramClass)
        	.addValue(this.paramKey)
        	.addValue(this.effectiveDate)
        	.toString();
    }
}