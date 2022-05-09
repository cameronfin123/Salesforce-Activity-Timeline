({
    doInit : function(component, event, helper) {
        let rec = component.get("v.object");
        let subjectFieldName = component.get("v.subjectFieldName");
        let descriptionFieldName = component.get("v.descriptionFieldName");
        let dateFieldName = component.get("v.dateFieldName");
        
        if (subjectFieldName !== undefined && subjectFieldName !== '' && subjectFieldName !== null) {
            // recursively extract the value of the subject field
            const subjVal = helper.getChildField(rec,subjectFieldName);
            component.set('v.subject',subjVal);
        } else {
            component.set('v.subject',component.get('v.objectLabel'));
        }
        if (descriptionFieldName !== undefined && descriptionFieldName !== '' && descriptionFieldName !== null) {
            // recursively extract the value of the description field
            const desVal = helper.getChildField(rec,descriptionFieldName);
            component.set('v.description',desVal);
        } else {
            component.set('v.showDescription',false);
        }
        // recursively extract the value of the date field
        component.set('v.date',helper.getChildField(rec,dateFieldName));
        component.set('v.createdByName', rec['CreatedById']);
    },
    
    toggleAcitivity : function(component, event, helper) {
        $A.util.toggleClass(component.find('expId'), 'slds-is-open');
    },
    
    edit : function(component, event, helper) {
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": component.get("v.object").Id
        });
        
        editRecordEvent.fire();
        
    }
})