({
	afterRender: function(component, helper) {
		this.superAfterRender();
		helper.chart(component);
	}
})