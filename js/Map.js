function PageMap() {
  this.name = "Home Control";
  this.running = false;
  this.WohzimmerLight = false;
  this.KucheLight = false;
  this.BadLight = false;
  this.Door = false;
  var realWidth;
  var realHeight;
  
  this.addDOMElements = function() {
    $('#dashboard-header').show();
	
    var html =	'<script>'+ 
                'function onMouseOverF(a,b,c,d, room){'+
                    'console.log("In function onMouseOverF: Not available in mobile " + event.clientX + " " + a + " " + c);'+
                    'var popup = document.getElementById("RoomId");'+ 
                    'popup.innerHTML = "Info: " + room;}'+
                '</script>' +
        
                 // Image size
                '<style>'+
                  'html, body {'+
                    'height: 100%;'+
                  '}'+

                  'img.one {'+
                    'height: 100%;'+
                    'width:  100%;'+
                  '}'+
                '</style>'+
        
                // Progess bar
                '<div class="form-group">'+
                    '<div id="new-remote-progress" class="progress progress-striped active">'+
                      '<div id="new-remote-progress-bar2" class="progress-bar" style="width: 0%;"></div>'+
                    '</div>'+
                '</div>'+

                // Alert
                '<div id="alert-error-div" class="form-group">' +
                  '<div class="col-sm-12">' +
                    '<div id="alert-error" class="alert alert-error">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
        
                // Image
                '<form class="form-horizontal" role="form">' +
                    '<div class="col-sm-12" id="div-img-wohnung">'+
                        '<img class = "one" id="img-wohnung" width="266" height="172" src="img/WohnBadKucheOff.jpg" usemap="#workmap" />'+ //width="266" height="172"
                    '</div>'+

                    // Div between image and buttons
                    '<div class="form-group">' +
                        '<div class="col-sm-12">' +
                        '</div>'+
                    '</div>'+

                    // Buttons
                    '<div class="form-group">' +
                        '<div class="col-sm-12" id="buttons_id">' +
                            '<button id="openDoorId"      type="button" class="btn btn-success btn-block btn-lg"><span class="glyphicon glyphicon-ok-circle"></span> Open Door</button>' +
                            '<button id="RoomId"          type="button" class="btn btn-primary btn-block       "><span class="glyphicon glyphicon-info-sign"></span> Info</button>' +
                            '<button id="exit_button_map" type="button" class="btn btn-danger  btn-block       "><span class="glyphicon glyphicon-log-out"></span> Exit</button>' +
                        '</div>' +
                    '</div>'+
                '</form>'+
                 // Map
                '<map name="workmap">'+
                    '<area shape="rect" coords=" 0, 0,600,400" alt="Lights"     id="LightsId"     hidefocus="false" href="javascript:void(0)" onMouseOver="onMouseOverF(157,123,532,345, title)" title="Lights" >'+
                    '<area shape="rect" coords=" 0, 0,  0,  0" alt="Wohnzimmer" id="WohnzimmerId" hidefocus="false" href="javascript:void(0)" onMouseOver="onMouseOverF(157,123,532,345, title)" title="Wohnzimmer" >'+
                    '<area shape="rect" coords=" 0, 0,  0,  0" alt="Kuche"      id="KucheId"      hidefocus="false" href="javascript:void(0)" onMouseOver="onMouseOverF(0,123,157,345, title)"   title="Küche">'+
                    '<area shape="rect" coords=" 0, 0,  0,  0" alt="Bad"        id="BadId"        hidefocus="false" href="javascript:void(0)" onMouseOver="onMouseOverF(157,0,282,123, title)"   title="Bad">'+
                '</map>';

    $('#dashboard').append(html);
    $('#div-img-wohnung').hide();
    $('#buttons_id').hide();
    $('#alert-error-div').hide();
  };

  this.getMapSize = function()
  {
    console.log("Window size: " + window.outerWidth+' x '+window.outerHeight);
    
    $('#img-wohnung').attr('src', 'img/WohnungClick4.jpg').load(function(){
      realWidth = this.width;
      realHeight = this.height;
      console.log("Image size: " + realWidth+' x '+realHeight);
    });
    // Can not be called here because its to soon
    //this.adaptMapSize(realWidth,realHeight);
  }
  
  this.adaptMapSize = function(imageSizeWidth, imageSizeHeight)
  {
    var scale = 1.0;
    //Lights
    $('#LightsId').attr('coords', "0,0,0,0");   
    
    // Wohnzimmer
    var a = 0.3*imageSizeWidth *scale;
    var b = 0.45*imageSizeHeight*scale;
    var c = 1.0 *imageSizeWidth *scale;
    var d = 1.0 *imageSizeHeight*scale;
    var coord = a+","+b+","+c+","+d;
    $('#WohnzimmerId').attr('coords', coord);
    console.log("New coords Wohnzimmer:" + coord);
   
    // Kuche
    a = 0.0*imageSizeWidth *scale;
    b = 0.5*imageSizeHeight*scale;
    c = 0.3 *imageSizeWidth *scale;
    d = 1.0 *imageSizeHeight*scale;
    coord = a+","+b+","+c+","+d;
    $('#KucheId').attr('coords', coord);
    console.log("New coords Kuche:" + coord);
    
    // Bad
    a = 0.3*imageSizeWidth *scale;
    b = 0.0*imageSizeHeight*scale;
    c = 0.55 *imageSizeWidth *scale;
    d = 0.45 *imageSizeHeight*scale;
    coord = a+","+b+","+c+","+d;
    $('#BadId').attr('coords', coord);
    console.log("New coords Bad:" + coord);
  }
  
  
  this.WohnzimmerF = function (){
    console.log("Wohnzimmer Pressed");
    this.WohzimmerLight = !(this.WohzimmerLight);
    var x = event.clientX;
    var y = event.clientY;
    console.log("x: " + x + "y: " + y);

    if(this.WohzimmerLight)
    {
        this.remoteBrickletSw1.setRepeats("8");
        this.remoteBrickletSw1.switchSocketA("31","8",Tinkerforge.BrickletRemoteSwitch.SWITCH_TO_ON);
    }
    else
    {
        this.remoteBrickletSw1.setRepeats("8");
        this.remoteBrickletSw1.switchSocketA("31","8", Tinkerforge.BrickletRemoteSwitch.SWITCH_TO_OFF);
    }
    this.setImage();
	};  
	
  this.KucheF = function (){
    console.log("Kuche Pressed");
    this.KucheLight = !(this.KucheLight);
    this.setImage();
  };  

  this.BadF = function (){
    console.log("Bad Pressed");
    this.BadLight = !(this.BadLight);
    this.setImage();
  };  
  
  this.LightsF = function (){
    console.log("Lights Pressed");
    this.setImage();
  };  
  
  
  this.setImage = function (){
	
    this.adaptMapSize(realWidth,realHeight);
    
    //this.WohzimmerLight && this.KucheLight && this.BadLight
    if(!this.WohzimmerLight && !this.KucheLight && !this.BadLight)
    {
      $('#img-wohnung').attr('src', 'img/WohnBadKucheOff.jpg');
    }
    else if(this.WohzimmerLight && !this.KucheLight && !this.BadLight){
      $('#img-wohnung').attr('src', 'img/BadKucheOff.jpg');
    }
    else if(!this.WohzimmerLight && this.KucheLight && !this.BadLight){
      $('#img-wohnung').attr('src', 'img/WohnBadOff.jpg');
    }
    else if(this.WohzimmerLight && this.KucheLight && !this.BadLight){
      $('#img-wohnung').attr('src', 'img/BadOff.jpg');
    }
    else if(!this.WohzimmerLight && !this.KucheLight && this.BadLight){
      $('#img-wohnung').attr('src', 'img/WohnKucheOff.jpg');
    }
    else if(this.WohzimmerLight && !this.KucheLight && this.BadLight){
      $('#img-wohnung').attr('src', 'img/KucheOff.jpg');
    }
    else if(!this.WohzimmerLight && this.KucheLight && this.BadLight){
      $('#img-wohnung').attr('src', 'img/WohnungLightOff.jpg');
    }
    else {
      $('#img-wohnung').attr('src', 'img/Wohnung.jpg');
    }
  };
  
  this.openDoorF = function(){
    console.log("Open door");
    this.remoteBricklet.beep(1000, 2000);
    //this.readTextFile("key1.txt");
    this.readTextFile2();
  }
  
  
  this.exit = function(){
	console.log("Exit pressed");
    
	this.stop();
	$('#dashboard-header').empty();
	//$('#dashboard-header').hide();
	var welcome = new PageWelcome();
	$('#dashboard-header').append(welcome.name);
	welcome.start();
  }
  
  this.start = function() {
    if(!this.running) {
      this.running = true;
      this.addDOMElements();
     
      this.connectTF();
      this.fullProgressBar();

      // this.adaptMapSize(realWidth,realHeight); // Can not be called here, its to soon
      $('#LightsId').click(this.LightsF.bind(this));
      $('#WohnzimmerId').click(this.WohnzimmerF.bind(this));
      $('#KucheId').click(this.KucheF.bind(this));
      $('#BadId').click(this.BadF.bind(this));
      $('#exit_button_map').click(this.exit.bind(this));
      $('#openDoorId').click(this.openDoorF.bind(this));
    }
  };

  
  this.connectTF = function(){
  
    var HOST = "192.168.178.52";
    var PORT = parseInt(4280);
    var SECRET;
    var ipcon = new Tinkerforge.IPConnection();
    var uids = [];
    ipcon.connect(HOST, PORT,
      function(ipcon, host, port, error) {
        ipcon.disconnect();
        clearTimeout(this.connectTimeout);
        var alert_msg = 'Could not connect to ' + host + ':' + port.toString() + ' (Error: ' + error.toString() + ')';
        console.log(alert_msg);
        $('#alert-error-div').show();
        $('#alert-error').text('Error: Could not connect to the control unit.');
        $('#new-remote-progress').hide();
        $('#buttons_id').show();
        $('#openDoorId').hide();
      }.bind(this, ipcon, HOST, PORT)
    );


    ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
      function(ipcon, SECRET, connectReason) {
        if(typeof SECRET === 'string' && SECRET.length > 0) {
          ipcon.authenticate(SECRET,
            function(ipcon) {
              ipcon.enumerate();
            }.bind(this, ipcon),
            function(ipcon, error) {
              ipcon.disconnect();
              clearTimeout(this.connectTimeout);
              var alert_msg = 'Authentication failed' + ' (Error: ' + error.toString() + ')';
              console.log(alert_msg);
              console.log(alert_msg)
            }.bind(this, ipcon)
          );
        } else {
          ipcon.enumerate();
        }
      }.bind(this, ipcon, SECRET)
    );

    ipcon.on(Tinkerforge.IPConnection.CALLBACK_ENUMERATE,
      function(uids, uid, connectedUid, position, hardwareVersion, firmwareVersion, deviceIdentifier, enumerationType) {
        if(enumerationType !== Tinkerforge.IPConnection.ENUMERATION_TYPE_DISCONNECTED) {
          console.log("uid: " + uid + " Identifier: "+ deviceIdentifier);
          if(deviceIdentifier === Tinkerforge.BrickletPiezoSpeaker.DEVICE_IDENTIFIER) {
               //console.log("uid: " + uid);
               //log("uid: " + uid);
               uids.push(uid);
               //this.fullProgressBar();
          }
        }
      }.bind(this, uids)
    );

    var switch_uid   = "ECi";
    var piezo_uid    = "C84";
    var distance_uid = "zqf";
    var led_uid      = "Bj4";

    this.remoteBricklet    = null;
    this.remoteBrickletSw1 = null;
    this.remoteDistance    = null;
    this.remoteLED         = null;

    this.remoteBricklet    = new Tinkerforge.BrickletPiezoSpeaker(piezo_uid, ipcon);
    this.remoteBrickletSw1 = new Tinkerforge.BrickletRemoteSwitchV2(switch_uid,ipcon);
    this.remoteDistance    = new Tinkerforge.BrickletDistanceUS(distance_uid,ipcon);
    this.remoteLED         = new Tinkerforge.BrickletOLED128x64(led_uid,ipcon);    
  };
  
  
  this.stop = function() {
    $('#dashboard-header').show();
    $('#dashboard').empty();
    this.running = false;
  };

  this.fullProgressBar = function() {
    
    var progress = function(width) {
      var bar = $('#new-remote-progress-bar2');
      var newWidth = width + 2.5;

      if(newWidth > 100)
      {
        newWidth = 100; 
      }

      bar.width(newWidth.toString() +'%');
      bar.text(Math.round(newWidth).toString() + "%");

      if(newWidth >= 100)
      {
        $('#new-remote-progress').hide();
        $('#div-img-wohnung').show();
        $('#buttons_id').show();
        // Adap the size of the map
        this.getMapSize();
        //$('#SendButtonId').prop('disabled', true);
        //$('#remote-switch-on').attr('disabled', false);
      } 
      else 
      {
        this.connectTimeout = setTimeout(progress.bind(this, newWidth), 100);
      }
    };

    var bar = $('#new-remote-progress-bar2');
    bar.width('0%');
    bar.text('');

    this.connectTimeout = setTimeout(progress.bind(this, 0), 25);

  };
  
	this.readTextFile = function (file)
	{
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, false);
		rawFile.onreadystatechange = function ()
		{
			if(rawFile.readyState === 4)
			{
				if(rawFile.status === 200 || rawFile.status == 0)
				{
					var allText = rawFile.responseText;
					alert(allText);
				}
			}
		}
		rawFile.send(null);
	}

	this.readTextFile2 = function()
	{
		var reader = new FileReader();

		reader.onload = function(e) {
			var text = reader.result;
			console.log(reader)
		}

		reader.readAsText(new File([], 'key1.txt'));
	}
}
