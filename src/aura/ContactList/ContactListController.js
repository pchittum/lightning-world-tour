({
    doInit : function(component, event) {
        var action = component.get("c.findAll");
        action.setCallback(this, function(a) {
            component.set("v.contacts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
	searchKeyChange: function(component, event) {
	    var searchKey = event.getParam("searchKey");
	    var action = component.get("c.findByName");
	    action.setParams({
	      "searchTerm": searchKey
	    });
	    action.setCallback(this, function(a) {
	        component.set("v.contacts", a.getReturnValue());
	    });
	    $A.enqueueAction(action);
	},
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