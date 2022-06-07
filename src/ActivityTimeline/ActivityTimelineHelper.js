({
    getAndParseField: function(component, fieldName) {
        let fieldString = component.get(fieldName);
        if ( fieldString == undefined || fieldString == null ) {
            fieldString = '';
        } else {
			fieldString = fieldString.replace(' ','');      
        }
        
        let fieldList = fieldString?fieldString.split(','):[];
        
        return fieldList;
    },
	getFormmattedDateHeader : function( inputDate ) {
        if ( inputDate === undefined || inputDate === null ) {
            return 'Upcoming & Overdue';
        }
        let date = new Date(inputDate);
        let options = { year: 'numeric', month: 'long' };
        let dateFormatted = date.toLocaleString('en-US', options);
        return dateFormatted;
	},
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