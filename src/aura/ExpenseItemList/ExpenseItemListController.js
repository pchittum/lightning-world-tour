({
    //Initialize the view and fetch the list of expenses on load
    doInit : function(component, event, helper) {
       
        console.log("ExpenseItemListController.doInit: entered");
        
		//Fetch the expense list from the Apex controller   
        helper.getExpenseList(component);

        console.log("ExpenseItemListController.doInit: exit");
    },
   
        //This is the event handler to select an expense
    onExpenseSelectedEvent : function(component, event, helper) {
       
        console.log("ExpenseItemListController.onExpenseSelectedEvent: entered");
                
        //Display an alert indicating the event has been handled
        alert("Handled the Expense Selected Event!");
        
        console.log("ExpenseItemListController.onExpenseSelectedEvent: exit");
    },
    
})