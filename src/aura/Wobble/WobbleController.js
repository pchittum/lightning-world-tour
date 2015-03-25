({ 
	doInit: function(component, event, helper) {

		if (window.DeviceOrientationEvent){
			
			component.set('v.doEvent','DeviceOrientation');
			
			//assigning a window-level or global event handler is not normally supported by Lightning Components
			//It is risky, to say the least, especially when destined for someone else's app (S1 Mobile!)
			//You must ensure that you perform cleanup so that any global handlers that might reference
			//your component's context are not in operation when the LCF app state cleans up your 
			//component. 

			//to have an identifiable event handler to remove, assigning it to the helper
			helper.doOrientation = helper.getOrientFunc(component,event);

			//capture start context and set in component...probably don't need this
			var start = new Date();
			component.set('v.start',start);

			console.log(start);

			//get server action to perform, set params and callback
			var startWobble = component.get('c.createWobble');
			startWobble.setParams({start:component.get('v.start'),startMS: start.valueOf()});
			startWobble.setCallback(this, function(a){
				if (a.getState()==='SUCCESS'){
					var wob = a.getReturnValue();
					//will need id of parent record when we record the measurements later
					component.set('v.wobbleId',wob.Id);
					console.log('wobbleId is: ' + component.get('v.wobbleId'));
				} else{
					console.log('failed saving wobble');
				}
			},'ALL');

			$A.enqueueAction(startWobble);

			//run function sticks arbitrary JS into LCF queue
			$A.run(function(){
				//set event handler for device orientation data
				window.addEventListener('deviceorientation',helper.doOrientation);

				//set measurements of device orientation data
				helper.intervalId = setInterval(function(){

					var measure = component.get('c.recordMeasurements');
					measure.setParams(
						{
							lr: component.get('v.doTiltLR'),
							fb: component.get('v.doTiltFB'), 
							dir: component.get('v.doDirection'),
							wobId: component.get('v.wobbleId')
						});
					//defer until something else gets enqueued and sent to server
					measure.setCaboose();

					//doesn't appear to be called...must ask about this
					measure.setCallback(this, function(a){
						if (a.getState()==='SUCCESS'){
							console.log('it worked!');
						} else {
							console.log('you failed!');
						}
					}, 'ALL');
					$A.enqueueAction(measure);

				},1000);
			});

		}

	},
	changeLocation: function(component, event, helper){	
		console.log('in locationChange event handler')
		
		//get end context
		var stopNow = new Date();
		var wobId = component.get('v.wobbleId');
		
		console.log(stopNow);

		//get server action, set params to update parent record, set callback
		var endWobble = component.get('c.finishWobble');
		
		endWobble.setParams(
			{
				recId: wobId,
				stop: stopNow,
				stopMS: stopNow.valueOf()
			});
		
		endWobble.setCallback(this, function(a){
			if (a.getState()==='SUCCESS'){
				var wob = a.getReturnValue();
				console.log('finished wobble, bye!');
			} else{
				console.log('failed saving wobble');
			}
		},'ALL');
		
		$A.enqueueAction(endWobble);
		
		//clean up the window event listener when we go somewhere else in app. 
		$A.run(function(){
			window.removeEventListener('deviceorientation',helper.doOrientation);
			clearInterval(helper.intervalId);
		});
	} 
})