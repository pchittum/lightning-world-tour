({  
    save : function(component, event, helper) {
        //this.waiting(component);
        helper.save(component);
    },
    
    waiting: function(component, event, helper) {
        
        //var spinner = component.find('spinner');
        //var evt = spinner.get(e.toggle);
        //evt.setParams({isVisible : true});
        //evt.fire();
        
        //below code was to use the old div-based spinner
    	$A.util.addClass(component.find("uploading").getElement(), "uploading");
    	$A.util.removeClass(component.find("uploading").getElement(), "notUploading");
    },
    
    doneWaiting: function(component, event, helper) {

        //var spinner = component.find('spinner');
        //var evt = spinner.get(e.toggle);
        //evt.setParams({isVisible : false});
        //evt.fire();
		        
        $A.util.removeClass(component.find("uploading").getElement(), "uploading");
    	$A.util.addClass(component.find("uploading").getElement(), "notUploading");
    },
    
    setFocus: function(component, event, helper) {
    	//take input from event focusAppId and set recordId.
    	var parId = event.getParam('recordId');
    	component.set('v.parentId',parId);
	}
})