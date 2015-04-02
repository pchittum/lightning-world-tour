({
	afterRender: function(component, helper) {
		this.superAfterRender();
		helper.doChart(component);
	}
})