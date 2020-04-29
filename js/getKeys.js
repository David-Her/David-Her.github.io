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

//key: "UYZ"
//guest: "Anna"
//start: 1267315200000
//end: 1900022400000
//room: "103"
//valid: "true"
//active: "false" 

// Calculate the amount of time for each query.
function getKeysFunction(){
  var since = 365;
  console.log("get keys funtion");
  var currentDate= new Date;
  // Save the current time in the now variable.
  var now = parseInt(currentDate.getTime()/1000);
  // Instantiate the variable limit and set its value to one day before the now variable.
  var limit = currentDate.setDate(currentDate.getDate() - since);
  limit = parseInt(currentDate.getTime()/1000);
  // Make the CORS request to Altair SmartWorks to get all the streams between now and the limit (one natural day before).
  getRequest("https://api.altairsmartcore.com/devices/KeysDevice@davidnike18.davidnike18/streams/?at_to="+now+"&at_from="+limit, "day"); 
}

// Make the actual CORS request.
function getRequest(url, timePeriod) {
  console.log("In getRequest");
  // Create the XHR object.
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open('GET', url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open('GET', url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  // Specify the Meteo apikey (when connecting CORS to your Altair SmartWorks account you must substitute your apikey here).
  var apikey= '996367ee330a4ed903e2253780215dba3e72d24556bcc9917dcb6960da207441';

  if (!xhr) {
    alert('CORS not supported');
    console.log("CORS not supported");
    return;
  }

  // Add the needed headers to make the CORS request to Altair SmartWorks.
  //xhr.setRequestHeader('Host', 'api.altairsmartcore.com');
  xhr.setRequestHeader('Apikey', apikey);
  xhr.setRequestHeader('Accept', 'application/json');
  //xhr.setRequestHeader('User-Agent', 'Smartcore-client');
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    // Print the value returned by decode function in each input box.
    switch(timePeriod){
      case 'day': document.getElementById('numOfKeys').value=decode(text); break;
      case 'week': document.getElementById('week').value=decode(text); break;
      case 'month': document.getElementById('month').value=decode(text); break;
    }
  };

  xhr.onerror = function() {
    alert('There was an error making the request.');
    console.log('There was an error making the request.');
  };

  xhr.send();
}

 
function decode(text){
  // Parse the text returned from the request into a JSON object.
  console.log("In decode");
  console.log(text);
  obj = JSON.parse(text);
  console.log(obj);
  var temp=0;
  var avg=0;
  // Get the temperature for each data set returned in the request (one for every hour).
  for(var i=0; i<obj.result.length; i++){
    console.log("Obj #"+i);
    temp=obj.result[i].data.temp;
    console.log(obj.result[i].data.temp)
    avg+=parseFloat(temp);
  }
  // return avg=(parseFloat(avg)/i).toFixed(2);
  return obj.result.length;
}
    