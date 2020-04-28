function PageMap() {
  this.name = "Plano de la casa";
  this.running = false;

  this.addDOMElements = function() {
    $('#dashboard-header').show();
	
    var html =	'<script>'+ 
					'function bigImg(a,b,c,d){'+
						'console.log("In function bigImg " + event.clientX + " " + a + " " + c);'+
						'var popup = document.getElementById("exit_button_map");'+ 
						'popup.innerHTML ="POPUP";'+
						'var c = document.getElementById("myCanvas");'+
						'var ctx = c.getContext("2d");'+
						'ctx.moveTo(0,0);'+
						'ctx.lineTo(200,100);'+
						'ctx.stroke();'+
						
						'var img = document.getElementById("img-wohnung");'+
						'ctx.drawImage(img,0,0, 532, 345);'+

					'}'+
				'</script>' +
				'<form class="form-horizontal" role="form">' +
					'<div class="form-group" id="div-img-wohnung">'+
						'<img id="img-wohnung" width="532" height="345" src="Wohnung.jpg" usemap="#workmap" />'+
						'<canvas id="myCanvas" width="532" height="345" style="border:1px solid #000000;" width="532" height="345"> not canvas </canvas>'+
					'</div>'+
					'<div class="form-group">' +
						'<div class="col-sm-12">' +
							'<button id="exit_button_map" type="button" class="btn btn-primary btn-block btn-lg">Exit</button>' +
						'</div>' +
					'</div>'+
				'</form>'+
				'<map name="workmap">'+
					'<area shape="rect" coords="34,44,270,350" alt="Wohnzimmer" id="WohnzimmerId" hidefocus="false" href="javascript:void(0)" onMouseOver="bigImg(34,44,270,350)" title="This is some text I want to display." >'+
					'<area shape="rect" coords="290,172,333,250" alt="Kuche" id="KucheId">'+
					'<area shape="rect" coords="337,300,44" alt="Bad" id="BadId">'+
				'</map>'+
				
				
				'<script>'+ 
					'console.log("In script");'+
					'var popup = document.getElementById("exit_button_map");'+ 
					'popup.innerHTML ="POPUP";'+
					'var c = document.getElementById("myCanvas");'+
					'var ctx = c.getContext("2d");'+
					'ctx.moveTo(0,0);'+
					'ctx.lineTo(200,100);'+
					'ctx.stroke();'+					
					'var img = document.getElementById("img-wohnung");'+
					'ctx.drawImage(img,0,0, 532, 345);'+
					
				'</script>'
				
				;

    $('#dashboard').append(html);
  };
  
  this.WohnzimmerF = function (){
	console.log("Wohnzimmer Pressed");
	  var x = event.clientX;
	  var y = event.clientY;
	  console.log("x: " + x + "y: " + y);
	};  
	
  this.KucheF = function (){
	console.log("KucheF Pressed");
  };  

  this.BadF = function (){
	console.log("Bad Pressed");
  };  
  
  this.exit = function(){
	console.log("Exit pressed");  
  }
  
  this.start = function() {
    if(!this.running) {
      this.running = true;
      this.addDOMElements();
	  $('#WohnzimmerId').click(this.WohnzimmerF.bind(this));
	  $('#KucheId').click(this.KucheF.bind(this));
	  $('#BadId').click(this.BadF.bind(this));
	  $('#exit_button_map').click(this.exit.bind(this));	  
    }
  };

  this.stop = function() {
    $('#dashboard-header').show();
    $('#dashboard').empty();
    this.running = false;
  };
}
