({
	doInit: function(component, event, helper) {
		var action = {};
		
		switch(component.get('v.sourceType')){
			case 'orderUnits':
				console.log('orderUnits');
				action = component.get('c.getOrdersOverNUnits');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				break;
			case 'orderValue':
				console.log('orderValue');
				action = component.get('c.getOrdersOverNValue');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				console.log(action);
				break;
			case 'productUnits':
				console.log('productUnits');
				action = component.get('c.getProductsOverNUnits');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				break;
			case 'productValue':
				console.log('productValue');
				action = component.get('c.getProductsOverNValue');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				break;
			default: 
				action = component.get('c.getProductsOverNValue');
				action.setParams({n:component.get('v.chartUnitsThreshold')});
				break;
				
		}
//		var num = component.get('v.chartUnitsThreshold');
//		action.setParams({n:num});
		action.setCallback(this,function(resp){
			var respData = resp.getReturnValue();
			console.log(respData);
			console.log(respData['item-count']);	
			console.log(respData['total-item-count']);

			component.set('v.total',respData['total-item-count']);
			component.set('v.chartValue',respData['item-count']);

			helper.total = respData['total-item-count'];
			helper.chartValue = respData['item-count']

			helper.chart(component);
		});
		$A.enqueueAction(action);
	},
	redrawChart: function(component, event, helper){
		helper.chart(component);
	}
})