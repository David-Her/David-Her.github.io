function emptyKey() {
  var guest;
  var start;
  var end;
  var room;
  var valid;
  var active;
  var id_dev;
  var keyId;
	this.init = function(){
		this.guest  = null;
		this.start  = null;
		this.end    = null;
		this.room   = null;
		this.valid  = false;
		this.active = false;
    this.id_dev = null;
    this.keyId  = null;
	}
}

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
  //getRequest("https://api.altairsmartcore.com/devices/KeysDevice@davidnike18.davidnike18/streams/?at_to="+now+"&at_from="+limit, "day");
  // From Thingsboard CURL
  // curl -v -X GET "https://thingsboard.cloud/api/v1/mvktomg51m6wwigo38fa/attributes?"
  // getRequest("https://thingsboard.cloud", "day");
  getRequest("https://thingsboard.cloud/api/plugins/telemetry/DEVICE/e11c4010-711d-11ef-9db3-51985cbac8e9/values/attributes/CLIENT_SCOPE", "day");
  
  
  //curl -v -X GET "https://thingsboard.cloud/api/plugins/telemetry/DEVICE/e11c4010-711d-11ef-9db3-51985cbac8e9/values/attributes/CLIENT_SCOPE" \
  //  -H 'x-authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpZGJvbm4xOEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzYTE3OThmMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6ImRhNGEzZmIzLTE4ZjctNDhhMy05M2RhLTFhNTFkYzBmMDRjMiIsImV4cCI6MTcyNjQ0NDE5OCwiaXNzIjoidGhpbmdzYm9hcmQuY2xvdWQiLCJpYXQiOjE3MjY0MTUzOTgsImZpcnN0TmFtZSI6IkQiLCJsYXN0TmFtZSI6IkgiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsImlzQmlsbGluZ1NlcnZpY2UiOmZhbHNlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsInRlcm1zT2ZVc2VBY2NlcHRlZCI6dHJ1ZSwidGVuYW50SWQiOiIzOWMwMDMxMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.NKGPyPaxI1uuzpVn04ZZGnkVVKx0V2I5y4zLOk80F2Gb47nLuhecK-UrAuY0c34P2pDuqKbipD70H1mfKZ-JVg' \
 //   -H 'content-type: application/json' \
  
  
  // getRequest("https://thingsboard.cloud/api/v1/telemetry", "day");
  // getRequest("https://thingsboard.cloud/api/v1/mvktomg51m6wwigo38fa/telemetry", "day");
}

// Make the actual CORS request.
function getRequest(url, timePeriod) {
  console.log("In getRequest: URL: ");
  console.log(url);
  // Create the XHR object.
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
	 console.log("with credentials ");
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open('GET', url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
	console.log("No credentials ");
    xhr = new XDomainRequest();
    xhr.open('GET', url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  // Specify the Meteo apikey (when connecting CORS to your Altair SmartWorks account you must substitute your apikey here).
  // ThingBoard Credentials
  var token = "mvktomg51m6wwigo38fa";
  var entityId = "e11c4010-711d-11ef-9db3-51985cbac8e9";
  var JWT_Token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpZGJvbm4xOEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzYTE3OThmMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6ImRhNGEzZmIzLTE4ZjctNDhhMy05M2RhLTFhNTFkYzBmMDRjMiIsImV4cCI6MTcyNjQ0NDE5OCwiaXNzIjoidGhpbmdzYm9hcmQuY2xvdWQiLCJpYXQiOjE3MjY0MTUzOTgsImZpcnN0TmFtZSI6IkQiLCJsYXN0TmFtZSI6IkgiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsImlzQmlsbGluZ1NlcnZpY2UiOmZhbHNlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsInRlcm1zT2ZVc2VBY2NlcHRlZCI6dHJ1ZSwidGVuYW50SWQiOiIzOWMwMDMxMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.NKGPyPaxI1uuzpVn04ZZGnkVVKx0V2I5y4zLOk80F2Gb47nLuhecK-UrAuY0c34P2pDuqKbipD70H1mfKZ-JVg"; 

  if (!xhr) {
    //alert('CORS not supported');
    console.log("CORS not supported");
    return;
  }

  // Add the needed headers to make the CORS request to Altair SmartWorks.
  //xhr.setRequestHeader('Host', 'api.altairsmartcore.com');
  // xhr.setRequestHeader('Apikey', apikey);
  // xhr.setRequestHeader('Accept', 'application/json');
  //xhr.setRequestHeader('User-Agent', 'Smartcore-client');
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.setRequestHeader('Access-Control', 'Allow-Origin');
  //xhr.setRequestHeader('Access-Control', '*');

  xhr.setRequestHeader('Content-Type', 'application/json');
  //"X-Authorization"
  // xhr.setRequestHeader('X-Authorization', token);
  xhr.setRequestHeader('X-Authorization', JWT_Token)


  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    // Print the value returned by decode function in each input box.
    objectWithKeys = decode(text);
    console.log(objectWithKeys);    
  };

  xhr.onerror = function() {
	console.log('There was an error making the request.');
    //alert('Unable to connect to the server.');
  };

  xhr.onreadystatechange = function() {
    if (this.status != 200)
    {
      console.log("Status Not 200 ");
	  //alert("Error in the connection with the server.");
    }
    else
    {
      // var text = xhr.responseText;
      // objectWithKeys = decode(text);
      // console.log(objectWithKeys);
    }
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
  for(var i=0; i<obj.result.length; i++){
    console.log("Key #"+i);
    temp=obj.result[i].id_developer;
    console.log(temp)
    testAddRow(obj.result[i].data.key, obj.result[i].data.guest, obj.result[i].data.room, obj.result[i].data.start, obj.result[i].data.end)
    
  }
  // to change the table title:
  //document.getElementById('header_numOfKeys').innerHTML = "Active Keys: #"+obj.result.length;
  return obj.result;
}

// Globarl variable with the list of keys
var objectWithKeys = null;
