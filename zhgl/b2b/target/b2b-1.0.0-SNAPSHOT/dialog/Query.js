var QueryForm = function(){
	this.json = {};
	this.sql = "";
	this.editIndex = 0;
	this.sqlField = $('#Dialog').dialog('options').sqlField;
	this.setDiagQuey = function(json){
		this.json = json;
		return this.json;
	}
	
	this.endEditing = function(){
		if (this.editIndex == undefined){return true}
		if ($('#queryYD').datagrid('validateRow', this.editIndex)){
			$('#queryYD').datagrid('endEdit', this.editIndex);
			this.editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}

	this.getDiagQuey = function(){
		return this.json;
	}

	this.windowDiaglog = function(sql){
		var strSql = {};
		strSql["sql"] = sql;
		var json = this.getDiagQuey();
		json["param"] = $.extend(ui.isNull(json.param)?{}:json.param,strSql);
		var uiID = eval(json["uiid"]);
		uiID = new uiID(json);
	}
	
	this.splitSql = function(rows){
		var plugin = this;
		var sql="";
		$.each(rows,function(i,row){
			sql += plugin.sqlcomper(row);
		});
		return sql;
	}
	
	this.sqlcomper = function (row){
		var sql = "";
		$.each(this.sqlField,function(i,field){
			if(field.name==row.paramName){
				sql += field.id;
			}
		})
		
		if(row.compareMark=="等于"){
			sql += " = '"+row.compareValue+"' "; 
		}
		if(row.compareMark=="不等于"){
			sql += " != '"+row.compareValue+"' "; 
		}
		if(row.compareMark=="大于"){
			sql += " &gt; '"+row.compareValue+"' "; 
		}
		if(row.compareMark=="大于等于"){
			sql += " &gt;= '"+row.compareValue+"' "; 
		}
		if(row.compareMark=="小于"){
			sql += " &lt; '"+row.compareValue+"' "; 
		}
		if(row.compareMark=="小于等于"){
			sql += " &lt;= '"+row.compareValue+"' "; 
		}
		if(row.compareMark=="包含"){
			sql += " like CONCAT(CONCAT('%', '"+row.compareValue+"'), '%') "; 
		}
		if(row.compareMark=="不包含"){
			sql += " not like CONCAT(CONCAT('%', '"+row.compareValue+"'), '%') "; 
		}
		if(row.relation=="并且"){
			sql += " And ";
		}
		if(row.relation=="或"){
			sql += " or ";
		}
		return sql;
		
		
	}
}

var Query = new QueryForm();
Query.setDiagQuey($("#Dialog").dialog("options").plugin);

