@isTest
public class ExpController_test {
    
    @isTest
    public static void testGetExpenses(){
        List<Expense__c> exps = new List<Expense__c>();
        exps.add(new Expense__c(name='lunch',Amount__c=1,Date__c=System.now()));
        exps.add(new Expense__c(name='breakfast',Amount__c=1,Date__c=System.now()));
        exps.add(new Expense__c(name='dinner',Amount__c=1,Date__c=System.now()));
        insert exps;
        
        Boolean foundLunch = false;
        Boolean foundBreakfast = false;
        Boolean foundDinner = false;
        
        List<Expense__c> expReturn = ExpController.getExpenses();
        for (Expense__c exp : expReturn){
            if (exp.name == 'lunch') foundLunch = true;            
            if (exp.name == 'breakfast') foundBreakfast = true;            
            if (exp.name == 'dinner') foundDinner = true;            
        }
        
        System.assert(foundLunch && foundBreakfast && foundDinner, 'did not find expense items expected');
               
    }
    
    @isTest
    public static void testSaveExpense(){
        Expense__c exp = new Expense__c(name='lunch',Amount__c=1,Date__c=System.now());
        Expense__c expSaved = ExpController.saveExpense(exp);
        
        System.assertEquals(exp.Name, expSaved.Name, 'The name was incorrectly saved');
        System.assert(expSaved.Id != null, 'We got an Id from the DB a save occurred.');    
    }
    

}