function sendRequests(){
  console.log("In send request");
  var currentDate= new Date;
  // Save the current time in the now variable.
  var now= parseInt(currentDate.getTime()/1000);
  // Instantiate the variable limit and set its value to one day before the now variable.
  var limit=currentDate.setDate(currentDate.getDate() - 365);
  limit=parseInt(currentDate.getTime()/1000);
  // Make the CORS request to Altair SmartWorks to get all the streams between now and the limit (one natural day before).
  makePostRequest('POST', "http://api.altairsmartcore.com/streams/");
	
}

function makePostRequest(method, url){
  var xhr = new XMLHttpRequest();
  var timeNow = Math.floor(Date.now()/1000); // Decrease precision.
  var d = new Date();
  var data = 
  {
    "protocol":"v2",
    "at":timeNow,
    "device":"KeysDevice@davidnike18.davidnike18",
    "data":{
      "key"   :"UYZ890",
      "guest" :"Anna",
      "start" :Date.UTC(2010, 01, 28),
      "end"   :Date.UTC(2030, 02, 18),
      "room"  :"103",
      "valid" :"true",
      "active":"false"
    }
  };
  
  
  
  
  
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
		
  if (!xhr) {
    alert('CORS not supported');
    console.log("CORS not supported");
    return;
  }
  
  var apikey= '996367ee330a4ed903e2253780215dba3e72d24556bcc9917dcb6960da207441';
   // Add the needed headers to make the CORS request to Altair SmartWorks.
  //xhr.setRequestHeader('Host', 'api.altairsmartcore.com');
  xhr.setRequestHeader('Apikey', apikey);
  //xhr.setRequestHeader('Accept', 'application/json');
  //xhr.setRequestHeader('User-Agent', 'Smartcore-client');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  //xhr.setRequestHeader('Data', data);
 
  console.log(data);
  xhr.send(JSON.stringify(data));
  
}


// Calculate the amount of time for each query.
function calculateRequests(){
  console.log("In calculate request");
  var currentDate= new Date;
  // Save the current time in the now variable.
  var now= parseInt(currentDate.getTime()/1000);
  // Instantiate the variable limit and set its value to one day before the now variable.
  var limit=currentDate.setDate(currentDate.getDate() - 365);
  limit=parseInt(currentDate.getTime()/1000);
  // Make the CORS request to Altair SmartWorks to get all the streams between now and the limit (one natural day before).
  makeCorsRequest('GET', "http://api.altairsmartcore.com/devices/distanceSensor@davidnike18.davidnike18/streams/?at_to="+now+"&at_from="+limit, "day");
 
}

// Create the XHR object.
function createCORSRequest(method, url) {
	 console.log("In createCORSRequest");
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(meth, url, timePeriod) {
	 console.log("In makeCorsRequest");
  // Create the XHR object.
  var xhr = createCORSRequest(meth, url);
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
    if(meth!='POST'){ 
      // Print the value returned by decode function in each input box.
      switch(timePeriod){
        case 'day': document.getElementById('day').value=decode(text); break;
        case 'week': document.getElementById('week').value=decode(text); break;
        case 'month': document.getElementById('month').value=decode(text); break;
      }
    }
    
  };

  xhr.onerror = function() {
    alert('There was an error making the request.');
	console.log('There was an error making the request.');
  };

  xhr.send();
}

 
function decode(text){
  console.log("In decode");
  // Parse the text returned from the request into a JSON object.
  console.log(text);
  obj = JSON.parse(text);
  console.log(obj);
  var temp=0;
  var avg=0;
  // Get the temperature for each data set returned in the request (one for every hour).
  for(var i=0; i<obj.result.length; i++){
    console.log("Obj #"+i);
    temp=obj.result[i].data.temp;
    //console.log("In the for");
    console.log(obj.result[i].data.temp)
    // Add the temperature to the sum of temperatures.
    avg+=parseFloat(temp);
  }
  // Return the average temperature for the amount of hours (which will be the value of i when it leaves the for loop).
  return avg=(parseFloat(avg)/i).toFixed(2);
  }
    