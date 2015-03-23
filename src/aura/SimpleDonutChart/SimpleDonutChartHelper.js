({
	lineWidth: 40,
	isInit: true,
	chart: function(component) {
		this.canvas = component.find('chart').getElement();
		//var total = this.total;
		//var value = this.chartValue;
		this.ctx = this.canvas.getContext('2d');
		//dimensions
		var total = component.get('v.total');
		var value = component.get('v.chartValue');
		var W = this.canvas.height;
		var H = this.canvas.height;

		var degrees = this.convertToDegrees(total,value);
		var radians = this.convertToRadians(degrees);

		var color = component.get('v.chartColor');
		var text = '';
		
		this.ctx.clearRect(0, 0, W, H);

		this.drawBGDonut(H,W);

		//gauge will be a simple arc
		this.ctx.beginPath();
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = this.lineWidth;
		//this.ctx.arc(x, y, radius, start_angle, end_angle, clockwise?);
		this.ctx.arc(W/2, H/2, 100, this.startTop(0), this.startTop(radians), false);
		this.ctx.stroke();

		text = Math.floor(degrees/360*100) + "%";
		
		this.drawText(H,W,text,color);
		//this.ctx.fillStyle = color;
		//this.ctx.font = '50px ProximaNovaSoft-Regular,verdana,sans-serif';

		//text_width = this.ctx.measureText(text).width;
		//this.ctx.fillText(text, W/2 - text_width/2, H/2 + 15);
		
	},
	setup: function(){

	},
	startTop: function(rads){
		return rads  - 90*Math.PI/180;
	},
	setAndDrawData: function(H,W){

	},
	drawText: function(H,W,text,color){
		this.ctx.fillStyle = color;
		this.ctx.font = '50px ProximaNovaSoft-Regular,verdana,sans-serif';
		var text_width = this.ctx.measureText(text).width;
		this.ctx.fillText(text, W/2 - text_width/2, H/2 + 15);
	},
	drawBGDonut: function(H,W){
		this.ctx.beginPath();
		this.ctx.strokeStyle = '#333';
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.arc(W/2, H/2, 100, 0, 360, false);
		this.ctx.stroke();
	},
	convertToDegrees: function(total,num){
		return 360/total * num;
	},
	convertToRadians: function(num){
		return num * Math.PI / 180;
	}
})