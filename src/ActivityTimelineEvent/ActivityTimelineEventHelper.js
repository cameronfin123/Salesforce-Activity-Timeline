({  
    // fieldName: Account__r.Description
    getChildField: function(obj, fieldName) {
    	const periodIndex = fieldName.indexOf('.');
        const firstField = fieldName.substring(0,periodIndex);
        if ( periodIndex != -1 ) {
            const newObj = obj[firstField];
            const newField = fieldName.substring(periodIndex+1);
            return this.getChildField(newObj,newField);
        } else {
            return obj[fieldName];
        }
	}
})