({
	lineWidth: 40,
	ctx: {},
	W: 0,
	H: 0,
	degrees: 0,
	new_degrees: 0,
	difference: 0,
	animation_loop: {},
	total: 0,
	value: 0,
//	fontSize: '50px',
//	fontFam: 'ProximaNovaSoft-Regular,verdana,sans-serif',//does not seem to like strings! 
//	color: 'lightgreen',
//	bgcolor: '#222',
	doChart: function(component){
		//start here. replaces window.onload event handler from original example
		//get handle to canvas and conext
		var canvas = component.find('chart').getElement();
		this.ctx = canvas.getContext('2d');

		//get properties and values we will use in downstream features
		this.W = canvas.width;
		this.H = canvas.height;
		this.color = component.get('v.chartColor');//color of chart from attribute...maps to App Builder Design
		this.total = component.get('v.total');//get total count
		this.value = component.get('v.chartValue');//get number over the threshold -- watched by change event

		//this.draw();//not ready for prime time. 
		this.init();

	},
	init: function(){
		//Clear the canvas everytime a chart is drawn
		this.ctx.clearRect(0, 0, this.W, this.H);
		
		//draw background circle
		this.drawBGDonut(this.H,this.W);

		//get relative degrees of drawn arc from the total and value 
		this.degrees = this.convertToDegrees(this.total,this.value);
		//canvas uses radians, apparently. yeah radians!
		var radians = this.convertToRadians(this.degrees);

		//gauge will be a simple arc
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.color;
		this.ctx.lineWidth = this.lineWidth;
		//this.ctx.arc(x, y, radius, start_angle, end_angle, clockwise?);
		this.ctx.arc(this.W/2, this.H/2, 100, this.startTop(0), this.startTop(radians), false);
		this.ctx.stroke();

		var text = Math.floor(this.degrees/360*100) + "%";
		
		this.drawText(this.H,this.W,text,this.color);


	},
	draw: function(){
		/*
		The draw() and animate_to() functions are intended to work to animate the gauge so that it
		steps up to the value when retrieved. need to work out a way so that one use of setInterval
		doesn't step on the others of each component. 

		my current thinking is something along the lines of this: 
		- have a function that returns a function with a closure around the new values
		- invoke that locally in draw() as : this.myFunc = this.funcThatReturnsFunc()
		- assign myFunc to setInterval...and see how it goes. 
		*/
		if (typeof this.animation_loop != undefined) {
			$A.run(function(){
				console.log('clearing interval');
				clearInterval(this.animation_loop);
			});
		}

		this.new_degrees = this.convertToDegrees(this.total,this.value);
		console.log('new degrees is: ' + this.new_degrees.toString());
		this.difference = this.new_degrees - this.degrees;

		$A.run(function(){
			console.log('setting interval');
			this.animation_loop = setInterval(this.animate_to,1000/this.difference);
			console.log(this.animation_loop);
		});
	},
	animate_to: function(){
		console.log('animate_to');

		if (this.degrees === this.new_degrees) {
			console.log('equal');
			$A.run(function(){
				clearInterval(this.animation_loop);
			});
		}

		if (this.degrees < this.new_degrees){
			console.log('degrees is less');
			this.degrees = this.degrees + 1;
		} else {
			console.log('degrees is more');
			this.degrees = this.degrees - 1;
		}

		this.init();

	},
	startTop: function(rads){
		//rotate by -90 degrees so that it starts at 12 o'clock
		return rads  - 90*Math.PI/180;
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