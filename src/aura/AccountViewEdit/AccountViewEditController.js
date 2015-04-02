({
	doInit: function(component, event, helper) {
		
		var action = component.get('c.getAnAccountId');
		action.setCallback(this,function(a){
			if (a.getState()==='SUCCESS'){
				component.set('v.acctId',a.getReturnValue());
				//component.find('acctId').set('v.recordId',a.getReturnValue());				
			} else {
				console.log('that did not work');
			}
		});
		$A.enqueueAction(action);
	}
})