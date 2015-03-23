public class ComponentController {
    
    public Id myId {get;set;}
    
    public Expense__c exp {
        get {
            if (exp == null) {
                exp = [select Id,Name,Amount__c from Expense__c where id =: myId];
            }
            return exp;
        }
        set;
    }

}