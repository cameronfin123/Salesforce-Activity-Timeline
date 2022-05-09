public class ActivityTimelineController {
    
    @AuraEnabled
    public static ActivityWrapperClass getSObjects(
        String relatedToId, 
        String relatedToFieldName, 
        String sObjectName, 
        String dateFieldName, 
        String subjectFieldName, 
        String descriptionFieldName) 
    {
        if ( relatedToId == null || relatedToId == '' || relatedToFieldName == null || relatedToFieldName == '' || sObjectName == null || sObjectName == '' || dateFieldName == null || dateFieldName == '') {
            return new ActivityWrapperClass(sObjectName,'',new List<SObject>());
        }
        // Creates string of all the field names
        List<String> fieldNames = new List<String>();
        fieldNames.add('Id');
        fieldNames.add(relatedToFieldName);
        fieldNames.add(dateFieldName);
        if ( subjectFieldName != null && subjectFieldName != '' ) {
            fieldNames.add(subjectFieldName);
        }
        if ( descriptionFieldName != null & descriptionFieldName != '' ) {
            fieldNames.add(descriptionFieldName);
        }
        /**for( String s : Schema.getGlobalDescribe().get(sObjectName).getDescribe().fields.getMap().keySet() ){
            fieldNames.add(s);
        }*/
        String fieldsForQuery = '';
        for( String s : fieldNames) {
            fieldsForQuery+=  s + ',' ;
        }
        fieldsForQuery += 'CreatedBy.Name';
        //fieldsForQuery = fieldsForQuery.left(fieldsForQuery.length()-1);
        
        // constructs the query
        String s = ' select ' + fieldsForQuery + ' from '+ sObjectName;
        s += ' where ' + relatedToFieldName + '=\''+relatedToId +'\'';
        s += 'ORDER BY '+dateFieldName + ' DESC';
        List<SObject> recordList = new List<SObject>();
        try {
            recordList = Database.query(s);
        } catch(QueryException e2) {
            System.debug('The following QueryException has occurred: ' + e2.getMessage());
        }
        String obLabel = Schema.getGlobalDescribe().get(sObjectName).getDescribe().getLabel();
        STRING iconName = ActivityTimelineController.getIconName(sObjectName);
        System.debug('DEBUG------------');
        System.debug(iconName);
        ActivityWrapperClass awc = new ActivityWrapperClass(obLabel,iconName,recordList);
        return awc;
    }
    
    public Class ActivityWrapperClass {
        @AuraEnabled
        public String objectName{get;set;}
        @AuraEnabled
        public List<SObject> records{get;set;}
        @AuraEnabled
        public String iconName{get;set;}
        
        public ActivityWrapperClass(String name, String icon, List<SObject> l) {
            this.objectName = name;
            this.iconName = icon;
            this.records = l;
        }
    }
    
    public static String getIconName(String sObjectName){
        String u;
        List<Schema.DescribeTabSetResult> tabSetDesc = Schema.describeTabs();
        List<Schema.DescribeTabResult> tabDesc = new List<Schema.DescribeTabResult>();
        List<Schema.DescribeIconResult> iconDesc = new List<Schema.DescribeIconResult>();

        for(Schema.DescribeTabSetResult tsr : tabSetDesc) { tabDesc.addAll(tsr.getTabs()); }

        for(Schema.DescribeTabResult tr : tabDesc) {
            if( sObjectName == tr.getSobjectName() ) {
                if( tr.isCustom() == true ) {
                    iconDesc.addAll(tr.getIcons());
                } else {
                    u = 'standard:' + sObjectName.toLowerCase();
                }
            }
        }
        for (Schema.DescribeIconResult ir : iconDesc) {
            if (ir.getContentType() == 'image/svg+xml'){
                u = 'custom:' + ir.getUrl().substringBetween('custom/','.svg').substringBefore('_');
                break;
            }
        }
        return u;
    }
}