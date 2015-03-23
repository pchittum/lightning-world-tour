({

    
       //This is the event handler to select an expense
    onExpenseSelectedEvent : function(component, event, helper) {
        console.log("ExpenseCardController.onExpenseSelectedEvent: entered");
        var expense = event.getParams().expense;
        console.log ("ExpenseCardController received msg = "+event.getParams().msg+" acct= "+expense.Name);
        console.log ("ExpenseCardController component = "+component);
        
        component.set("v.expense", expense);
        component.set("v.id",expense.Id);
        var link = "javascript:sforce.one.navigateToSObject("+expense.Id+")";
        console.log ("ExpenseCardController id link = "+link);
        component.set("v.id-link", link);
        component.set("v.expenseName",expense.Name);
        component.set("v.expenseAmount",expense.Amount__c);
        component.set("v.expenseClient", expense.Client__c);
        component.set("v.expenseDate", expense.Date__c);
        component.set("v.expenseReimbursed", String(expense.Reimbursed__c));
        
        //console.log ("ExpenseCardController expense.Name = "+component.get("v.expense").Name);
        //var attrs = component.getAttributes();
        //attrs.setValue("expense",expense);
        //Display an alert indicating the event has been handled
        //alert("Handled the Expense Selected Event!");

        console.log("ExpenseCardController.onExpenseSelectedEvent: setting count");

        console.log("ExpenseCardController.onExpenseSelectedEvent: exit");
    },
    
    
	//Handle linking to the record
    linkToRecord: function(component, event) {
        console.log("ExpenseCardController.linktToRecord: enter");
        var id = component.get("v.id");
        console.log("ExpenseCardController.linkToRecord: expense= "+id);
        
        var appEvent= $A.get("e.force:navigateToSObject");
        appEvent.setParams({
            "recordId": id,
            "slideDevName": "related"
        });
        appEvent.fire();
        
}
})