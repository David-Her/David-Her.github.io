function ABC123() {
  var name;
  var start;
  var end;
  var room;
  var valid;
  var active;
  this.init = function(){
	this.name   = "David H";
	this.start  = Date.UTC(2020, 04, 01);
	this.end    = Date.UTC(2020, 04, 02);
	this.room   = 103;
	this.valid  = true;
	this.active = false;
  }
}

function K1418() {
  var name;
  var start;
  var end;
  var room;
  var valid;
  var active;
  this.init = function(){
	this.name   = "Anna";
	this.start  = Date.UTC(2010, 01, 28);
	this.end    = Date.UTC(2030, 02, 18);
	this.room   = 103;
	this.valid  = true;
	this.active = false;
  }
}

function emptyKey() {
  var name;
  var start;
  var end;
  var room;
  var valid;
  var active;
	this.init = function(){
		this.name  = "";
		this.start = "NO";
		this.end   = "NO";
		this.room  = "";
		this.valid = false;
		this.active = false;
	}
}

function CheckKey(inKey) {
	console.log("In CheckKey(): " + inKey);
	
	var key;
		
	this.keyList = {};
	this.keyList['ABC123']   = new ABC123();
	this.keyList['K1418']    = new K1418();
	this.keyList['settings'] = new PageSettings();

	if(this.keyList[inKey] === undefined) {
		this.key = new emptyKey();
		this.key.init();
		console.log(this.key.name);
	}
	else
	{
		this.key = this.keyList[inKey];
		this.key.init();
		console.log(this.key.name);
		//var d = Date.now();
		var today = Date.now();; //Date.UTC(y.getUTCDate(), m.getUTCDate(), d.getUTCDate());
		console.log("Current time:" + today);
		console.log("Start time:" + this.key.start);
		console.log("End time:" + this.key.end);
		if(  today > this.key.start
		  && today < this.key.end)
		  {
			  this.key.active = true;
		  }
		  else
		  {
			  this.key.active = false;
		  }
		
	}
}