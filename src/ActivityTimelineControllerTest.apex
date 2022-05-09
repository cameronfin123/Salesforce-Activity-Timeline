@isTest
public class ActivityTimelineControllerTest {

    // Assert that if an invalid field is passed in, null is returned
    @isTest static void testgetSObjectsBlankFields() {
        ActivityTimelineController.ActivityWrapperClass s = ActivityTimelineController.getSObjects('someId', 'AccountId', 'Case', '','','');
        ActivityTimelineController.ActivityWrapperClass exepectedResult = new ActivityTimelineController.ActivityWrapperClass('Case','',new List<SObject>());
        System.assertEquals(exepectedResult.iconName,s.iconName);
        System.assertEquals(exepectedResult.objectName,s.objectName);
        System.assertEquals(exepectedResult.records,s.records);
    }
    
    @isTest static void testgetSObjectsQueryException() {
        Account a = new Account(Name='Test Account');
        insert a;
        ActivityTimelineController.ActivityWrapperClass s = ActivityTimelineController.getSObjects('badId', 'AccountId', 'Case', 'ClosedDate','Subject','Description');
        ActivityTimelineController.ActivityWrapperClass exepectedResult = new ActivityTimelineController.ActivityWrapperClass('Case','standard:case',new List<SObject>());
        System.assertEquals(exepectedResult.iconName,s.iconName);
        System.assertEquals(exepectedResult.objectName,s.objectName);
        System.assertEquals(exepectedResult.records,s.records);
    }
    
    @isTest static void testGetSObjectsValidFields() {
        // Create test data
        Account a = new Account(Name='Test Account');
        insert a;
        Opportunity o = new Opportunity(Name='Sample Opp',AccountId=a.Id,CloseDate=Date.today(),StageName='Closed Won');
        insert o;
        Opportunity expectedOpp = [select Id, AccountId, CloseDate,Name,Description,CreatedById from Opportunity where Id=:o.Id];
        ActivityTimelineController.ActivityWrapperClass expectedOutput = new ActivityTimelineController.ActivityWrapperClass('Opportunity','standard:opportunity',new List<Opportunity>{expectedOpp});
        // Call method
        ActivityTimelineController.ActivityWrapperClass s = ActivityTimelineController.getSObjects(a.Id, 'AccountId', 'Opportunity', 'CloseDate','Name','Description');
        // Compare results
        System.assertEquals(expectedOutput.objectName, s.objectName);
        System.assertEquals(expectedOutput.iconName, s.iconName);
        System.assertEquals(expectedOutput.records.size(), s.records.size());
        for ( Integer i = 0; i < expectedOutput.records.size(); i++ ) {
            System.assertEquals(expectedOutput.records.get(i).Id,s.records.get(i).Id);
        }
        
    }
}