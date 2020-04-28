function PageWelcome() {
  this.name = "Welcome";
  this.running = false;
  this.enterKey = "";

  this.addDOMElements = function() {
    //$('#dashboard-header').hide();
    var html = '<form class="form-horizontal" role="form">' +
                 '<div class="form-group">' +
                   '<label for="key-value" class="col-sm-2 control-label">Digital Key</label>' +
                   '<div id="key-value-div" class="col-sm-12">' +
                     '<input type="text" class="form-control" id="key-value" placeholder="Enter your key: (Ex. ABC123) " value="">' +
                   '</div>' +
                 '</div>' +
                 '<div class="form-group">' +
                   '<div id="div-remote-settings-load" class="col-sm-12">' +
                     '<button id="remote-settings-load" type="button" class="btn btn-primary btn-block btn-lg"><span class="glyphicon glyphicon-log-in"></span> Log-in</button>' +
                   '</div>' +
                 '</div>' +
                 '<div id="div-remote-settings-error" class="form-group">' +
                   '<div class="col-sm-12">' +
                     '<div id="remote-settings-error" class="alert alert-error">' +
                     '</div>' +
                   '</div>' +
                 '</div>' +
               '</form>';
    $('#dashboard').append(html);
	$('#div-remote-settings-error').hide();
  };

  this.showMap = function() {
	
	// Check the key

	console.log(this.enterKey);
	
	var tempKey = this.enterKey;
	var checkkey = new CheckKey(tempKey);
  //var checkkey = new CheckKey("K1418"); // Temporal, to debug faster with the right key
	
	console.log("key value in MainControl: " + checkkey.key.name)
	
	if(checkkey.key.valid == true)
	{
		if(checkkey.key.active == true)
		{
			console.log("valid key");
			$.cookie("dikey", tempKey, {expires : 2}); // Save cookie (2 days of validity)
			this.stop();
			$('#dashboard-header').empty();
			$('#dashboard-header').hide();
			var map = new PageMap()
			$('#dashboard-header').append(map.name);
			map.start();	
		}
		else
		{
			var alertText = "Error: " + tempKey + " is not active. Check your check-in and check-out time.";
			console.log("Key not active");
			$('#remote-settings-error').text(alertText);
			$('#div-remote-settings-error').show();	
		}
	}
	else{
		console.log("no valid key: " + tempKey);
		var alertText = "Error: "+ tempKey + " is not valid." ;
		$('#remote-settings-error').text(alertText);
		$('#div-remote-settings-error').show();
		//alert(alertText);
	}
	
	};

  this.start = function() {
    if(!this.running) {
      this.running = true;
      this.addDOMElements();
      if(this.enterKey !== undefined)
      {
        if ((typeof this.enterKey == 'string') && (this.enterKey.length == 5))
        {
          this.showMap();
        }
        else
        {
          this.enterKey = ""; 
        }
      }
      else
      {
        this.enterKey = "";
      }
      $('#remote-settings-load').click(this.showMap.bind(this));
    }
	
	$('#key-value').keyup(function() {
		this.enterKey = $('#key-value').val();
		$('#div-remote-settings-error').hide();
		//console.log(this.enterKey);
	}.bind(this));
	
	
	$('#key-value').keypress(function(e) {
		if(e.keyCode === 13) {
			this.enterKey = $('#key-value').val();
			e.preventDefault();
			//this.showMap();
		}
	}.bind(this));
	
  };

  this.stop = function() {
    $('#dashboard-header').show();
    $('#dashboard').empty();
    this.running = false;
  };
  
}
