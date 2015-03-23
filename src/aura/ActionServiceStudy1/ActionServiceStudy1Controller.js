({
	doInit : function(component, event, helper) {
        
        console.log('entered init');
        
		
        var action = component.get("c.getExpenses");
        
        var self = this;
        
        action.setCallback(this, function(actionResult){
            console.log('entered callback');
            
            var respData = actionResult.getReturnValue();
            
            component.set('v.expenses',respData);
            
        });
        
        $A.enqueueAction(action);
        
	}
})