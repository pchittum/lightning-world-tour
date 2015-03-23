({
     //Fetch the accounts from the Apex controller
    getExpenseList: function(component) {

        console.log("ExpenseItemListHelper.getExpenseList: entered");

        //Set the action to invoke the Apex controller method
        var action = component.get("c.getExpenses");

        //Set up the callback
        var self = this;
        //action.setCallback(this, setExpensesAttribute);
        
        action.setCallback(this, function(actionResult) {
            //console.log("Got accts: ", actionResult.getReturnValue());
            
            component.set("v.expenses", actionResult.getReturnValue());
            
        });
		
        //Enque the action
        $A.enqueueAction(action);

        console.log("ExpenseItemListHelper.getAccountList: exit");

    },  
    setExpensesAttribute: function(actionResult){
        //Reset the value of the component list attribute with the records returned 
        component.set("v.expenses", actionResult.getReturnValue());
    }
})