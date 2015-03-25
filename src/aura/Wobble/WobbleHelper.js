({
	getOrientFunc: function(component, event) {
			/*
			in order to have an identifiable 

			the whole purpose of this function is to create a closure around the component. 
			this works great and runs fine, until you refresh the component...then this instance
			of the c:Wobble component goes away, so we must re invoke and get the latest instance each init. 
			*/
		return function(eventData){

			/*
				There is a brief period during refreshes where the component is being rebuilt, but the event handler
				continues to be fired due to frequency of the ondeviceorientation event. To prevent errors
				being bubbled to the UI, by checking for a valid global id...this is the LCF unique component
				identifier assigned to each component instance. 
			*/
			if (component.getGlobalId()){
				component.set('v.doTiltLR',Math.round(eventData.gamma));
				component.set('v.doTiltFB',Math.round(eventData.beta));
				component.set('v.doDirection',Math.round(eventData.alpha));
			}
		}
	},
	doOrientation: null,
	intervalId: null
})