({
	doInit: function(component, event, helper) {
		var action = {};
		
		// okay...this is a bit of a trumped up example. There are four things this 'component'
		// can do. With such a dependency, it can hardly be called a reusable component. but this
		// was always a prototype to show getting canvas up and running in Lightning Components.
		// that the backend is Lightning Connect (OData) brings in some limitations for the time 
		// being. my ultimate goal would be to have this component invocable in such a way that
		// I could pass it a chart name and it returned the data in the form of a metric. So that
		// might be the next place I take this. 
		switch(component.get('v.sourceType')){
			case 'orderUnits':
				//console.log('orderUnits');
				action = component.get('c.getOrdersOverNUnits');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				break;
			case 'orderValue':
				//console.log('orderValue');
				action = component.get('c.getOrdersOverNValue');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				break;
			case 'productUnits':
				//console.log('productUnits');
				action = component.get('c.getProductsOverNUnits');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				break;
			case 'productValue':
				//console.log('productValue');
				action = component.get('c.getProductsOverNValue');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				break;
			default: 
				action = component.get('c.getProductsOverNValue');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				break;				
		}

		action.setCallback(this,function(resp){
			var respData = resp.getReturnValue();

			//owing to the event handler on change of chart value, assign to 
			//component attribs and this will call the chart functions
			component.set('v.total',respData['total-item-count']);
			component.set('v.chartValue',respData['item-count']);

		});
		$A.enqueueAction(action);
	},
	redrawChart: function(component, event, helper){
		helper.doChart(component);
	}
})