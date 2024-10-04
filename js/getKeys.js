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
  
  console.log("Read cookie JWT Token")
  $.cookie.json = true;
  var dikey = $.cookie("JWT_Token");
  if( dikey !== undefined ) 
  {
    if ((typeof dikey == 'string') && (dikey.length > 5))
    {
      console.log("JWT_Token valid")
      console.log(dikey)
      JWT_Token = dikey;
    }
    else
    {
      console.log("JWT_Token not valid")
    }    
  }
  else
  {
    console.log("no JWT_Token	")
  }
  
  
  
  // Make the CORS request to Altair SmartWorks to get all the streams between now and the limit (one natural day before).
  //getRequest("https://api.altairsmartcore.com/devices/KeysDevice@davidnike18.davidnike18/streams/?at_to="+now+"&at_from="+limit, "day");
  // From Thingsboard CURL
  // curl -v -X GET "https://thingsboard.cloud/api/v1/mvktomg51m6wwigo38fa/attributes?"
  // getRequest("https://thingsboard.cloud", "day");
  
  /// OK (SERVER_SCOPE, SHARED_SCOPE, CLIENT_SCOPE)
  // getRequest("https://thingsboard.cloud/api/plugins/telemetry/DEVICE/e11c4010-711d-11ef-9db3-51985cbac8e9/values/attributes/CLIENT_SCOPE", "day"); 
  // getRequest("https://thingsboard.cloud/api/plugins/telemetry/DEVICE/e11c4010-711d-11ef-9db3-51985cbac8e9/values/attributes/SERVER_SCOPE", "day");
  
  //curl -v -X GET "https://thingsboard.cloud/api/plugins/telemetry/DEVICE/e11c4010-711d-11ef-9db3-51985cbac8e9/values/attributes/CLIENT_SCOPE" \
  //  -H 'x-authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpZGJvbm4xOEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzYTE3OThmMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6ImRhNGEzZmIzLTE4ZjctNDhhMy05M2RhLTFhNTFkYzBmMDRjMiIsImV4cCI6MTcyNjQ0NDE5OCwiaXNzIjoidGhpbmdzYm9hcmQuY2xvdWQiLCJpYXQiOjE3MjY0MTUzOTgsImZpcnN0TmFtZSI6IkQiLCJsYXN0TmFtZSI6IkgiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsImlzQmlsbGluZ1NlcnZpY2UiOmZhbHNlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsInRlcm1zT2ZVc2VBY2NlcHRlZCI6dHJ1ZSwidGVuYW50SWQiOiIzOWMwMDMxMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.NKGPyPaxI1uuzpVn04ZZGnkVVKx0V2I5y4zLOk80F2Gb47nLuhecK-UrAuY0c34P2pDuqKbipD70H1mfKZ-JVg' \
 //   -H 'content-type: application/json' \
  
  
  // getRequest("https://thingsboard.cloud/api/v1/telemetry", "day");
  // getRequest("https://thingsboard.cloud/api/v1/mvktomg51m6wwigo38fa/telemetry", "day");
}

// Make the actual CORS request.
function makeRequest(url) {
  console.log("In makeRequest: URL: ");
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
  // var JWT_Token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpZGJvbm4xOEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzYTE3OThmMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6ImU0NDE4NTUxLTAzZTUtNDUxOS04ZTQ5LTkzZGUwYTgxMzZlZiIsImV4cCI6MTcyNjUzOTc5MiwiaXNzIjoidGhpbmdzYm9hcmQuY2xvdWQiLCJpYXQiOjE3MjY1MTA5OTIsImZpcnN0TmFtZSI6IkQiLCJsYXN0TmFtZSI6IkgiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsImlzQmlsbGluZ1NlcnZpY2UiOmZhbHNlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsInRlcm1zT2ZVc2VBY2NlcHRlZCI6dHJ1ZSwidGVuYW50SWQiOiIzOWMwMDMxMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.XE94zH60BYvG_1uT5Ad_FpmUqbjrMvUbkNbLOZuQz88CjIMQ50XonNYE31P7Y4WqrkcQ037JbSyBE-QIMY51BA"; 

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
    console.log("--- Call decode #1 ");       
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
       var text = xhr.responseText;
       console.log("--- Call decode #2 ");       
       //objectWithKeys = decode(text);
       console.log(objectWithKeys);
    }
  };
  
  xhr.send();
}

function decode(text){
  // Parse the text returned from the request into a JSON object.
	/***** JSON EXAMPLE
	{lastUpdateTs: 1726157260610, key: "attribute2", value: true}
	{lastUpdateTs: 1726157260610, key: "attribute3", value: 43}
	{lastUpdateTs: 1726157260610, key: "attribute1", value: "value1"}
	*/
	
  console.log("In decode:: text:");
  console.log(text);
  obj = JSON.parse(text);
  console.log("In decode:: obj:");
  console.log(obj);
  console.log(obj.length);
  var temp=0;
  var avg=0;
  for(var i=0; i<obj.length; i++){
    console.log("Key #"+i);
    temp=obj[i].key;
    console.log(temp)
	// document.getElementById("fname").innerHTML = "New text!";
	var d = new Date(obj[1].lastUpdateTs);
	var dateTS = (d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() +' - ' + d.getHours() + ':' + d.getMinutes());
	addRowToTable(dateTS, obj[i].key, obj[i].value);
	//addRowToTable(obj[1].lastUpdateTs, obj[1].key, obj[1].value);
	//addRowToTable(obj[2].lastUpdateTs, obj[2].key, obj[2].value);   
  }
  // to change the table title:
  //document.getElementById('header_numOfKeys').innerHTML = "Active Keys: #"+obj.result.length;
  return obj;
}

function addRowToTable(inTS, inKey, inValue){
  console.log("Add Row to table");	
  
  $('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
  
  var index = $("table tbody tr:last-child").index();
  var row = '<tr>' +
            '<td>'+inTS+'</td>' +
            '<td>'+inKey+'</td>' +
            '<td>'+inValue+'</td>' +
//            '<td>'+ actions + '</td>' +    
            '<td>'+
            '<a class="add"    title="Add"    data-toggle="tooltip"><i class="glyphicon glyphicon-ok"></i></a>'+
            '<a class="edit"   title="Edit"   data-toggle="tooltip"><i class="glyphicon glyphicon-pencil"></i></a>'+
            '<a class="delete" title="Delete" data-toggle="tooltip"><i class="glyphicon glyphicon-trash"></i></a>'+
            '</td>'+
            '</tr>';
  $("table").append(row);		
  // Change the icon from .edit to .add
  //$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
  $('[data-toggle="tooltip"]').tooltip();
  
  var empty = false;
  var input = $(this).parents("tr").find('input[type="text"]');
  
  input.each(function(){
    if(!$(this).val())
    {
      $(this).addClass("error");
      empty = true;
    }
    else
    {
      $(this).removeClass("error");
    }
  });
  
  $(this).parents("tr").find(".error").first().focus();
  
  if(!empty)
  {
    input.each(function(){
      $(this).parent("td").html($(this).val());
    });			
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").removeAttr("disabled");
  }
}

function myJWT_Token(){
	console.log("In myJWT_Token");

	/* ORIGINAL CURL
			curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username":"xxxx@gmail.com", "password":"xxxx"}' 'http://thingsboard.cloud/api/auth/login'
	*/
		
 	var url = 'https://thingsboard.cloud/api/auth/login';
    const VarUsername = document.getElementById("Uname").value;
    const VarPassword = document.getElementById("Pname").value;
	
    // Create the XHR object.
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open('POST', url, true);
    } else if (typeof XDomainRequest != "undefined") {
      xhr = new XDomainRequest();
      xhr.open('POST', url);
    } else {
      xhr = null;
    }
	
    if (!xhr) {
      return;
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
	  console.log("on Load");
	  const obj = JSON.parse(text);
	  console.log("--- NEW KEY ---");
	  JWT_Token = "Bearer "+obj.token;
	  console.log(JWT_Token);
	  console.log("--- NEW refreshToken ---");
	  console.log(obj.refreshToken);
	  
	  console.log("Save JWT Token in the cookies´");
	  $.cookie("JWT_Token", JWT_Token, {expires : 2}); // Save cookie (2 days of validity)
	  
    };

    xhr.onerror = function() {
  		console.log('There was an error making the request.');
    };

    xhr.onreadystatechange = function() {
      if (this.status != 200)
      {
        console.log("Status Not 200 ");
		alert('Unable to get the JWT_Token.');
      }
      else
      {
         var text = xhr.responseText;
      }
    };
	let Data = '{"username":"'+VarUsername+'","password":"'+VarPassword+'" }';
	console.log(Data);
    xhr.send(Data);
    // xhr.send('{"username":"xxxx@gmail.com", "password":"xxxx"}');
}

function makePostRequestBT2(keyToSend, valueToSend){
    console.log("makePostRequestBT2");
	// var url = "https://thingsboard.cloud/api/plugins/telemetry/DEVICE/e11c4010-711d-11ef-9db3-51985cbac8e9/values/attributes/CLIENT_SCOPE";
	
	/*
	curl -v 'https://thingsboard.cloud/api/plugins/telemetry/DEVICE/ad17c410-914c-11eb-af0c-d5862211a5f6/SERVER_SCOPE' \
	-H 'x-authorization: Bearer $YOUR_JWT_TOKEN_HERE' \
	-H 'content-type: application/json' \
	--data-raw '{"newAttributeName":"newAttributeValue"}'
	*/
	
	// OK (SERVER_SCOPE, SHARED_SCOPE, CLIENT_SCOPE)
	
  	console.log("in get_DeviceInfo");
  	const devID = document.getElementById("devID").value;
  	console.log(devID);
  	const devScope = document.getElementById("devScope").value;
  	console.log(devScope);
  
  	prepareRequest(devID, devScope);
	
	var url = TB_URL+ DEV_ID + CON_PUB + SCOPE;

	console.log(url);
	console.log("keyToSend: " + keyToSend);
	console.log("valueToSend: " + valueToSend);
	
    // Create the XHR object.
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  	 console.log("with credentials ");
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open('POST', url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
  	console.log("No credentials ");
      xhr = new XDomainRequest();
      xhr.open('POST', url);
    } else {
      // CORS not supported.
      xhr = null;
    }

    if (!xhr) {
      //alert('CORS not supported');
      console.log("CORS not supported");
      return;
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Authorization', JWT_Token)

    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
      // Print the value returned by decode function in each input box.
      console.log("--- Call decode #1 ");       
  	  //objectWithKeys = decode(text);
      console.log(text);    
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
         var text = xhr.responseText;
         console.log("--- Call decode #2 ");       
         //objectWithKeys = decode(text);
         console.log(text);
      }
    };
	
    var timeNow = Math.floor(Date.now()/1000); // Decrease precision.
    var d = new Date();
    var dataJ = 
    {
      // "protocol":"v2",
	  "stringKey":"FromHTML_Script",
      // "device":"KeysDevice@davidnike18.davidnike18",
      "jsonKey":{
        //"attribute1":timeNow,
        // "guest" :newKeyArr[1],
        // "room"  :newKeyArr[2],
        // "start" :newKeyArr[3], // Date.UTC(2030, 02, 18)
        // "end"   :newKeyArr[4], // Date.UTC(2030, 02, 18)
        "valid" :"true",
        "SomeNumber":timeNow
      }
    };

	var dataJ2 ={
		keyFromHTTML:valueToSend
	};
	
	let dataJ3 = '{"' + keyToSend.toString() + '":"' + valueToSend.toString() + '"}"';
	console.log(dataJ3);
    // xhr.send(JSON.stringify(dataJ2));
	// xhr.send(JSON.stringify(dataJ3));
	xhr.send(dataJ3);
}

function makePostRequestBT(method, url, newKeyArr){
  
	/* ThingsBoard */
	/*  -v -X POST 
		https://thingsboard.cloud/api/v1/mvktomg51m6wwigo38fa/attributes 
		--header Content-Type:application/json 
		--data "{"attribute1": "value1", "attribute2":true, "attribute3": 43.0}"
    */
  	
  var xhr = new XMLHttpRequest();
  var timeNow = Math.floor(Date.now()/1000); // Decrease precision.
  var d = new Date();
  var data = 
  {
    // "protocol":"v2",
    "at":timeNow,
    // "device":"KeysDevice@davidnike18.davidnike18",
    "data":{
      //"attribute1":timeNow,
      // "guest" :newKeyArr[1],
      // "room"  :newKeyArr[2],
      // "start" :newKeyArr[3], // Date.UTC(2030, 02, 18)
      // "end"   :newKeyArr[4], // Date.UTC(2030, 02, 18)
      // "valid" :"true",
      "attribute1":timeNow
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
    //alert('CORS not supported');
    console.log("CORS not supported");
    return;
  }
  
  xhr.onreadystatechange = function() {
    if (this.status != 200)
    {
      alert("Error in the connection with the server.");
    }
  };
   // Add the needed headers to make the CORS request to Altair SmartWorks.
  //xhr.setRequestHeader('Host', 'api.altairsmartcore.com');
  // xhr.setRequestHeader('Apikey', apikey);
  //xhr.setRequestHeader('Accept', 'application/json');
  //xhr.setRequestHeader('User-Agent', 'Smartcore-client');
  
  xhr.setRequestHeader('Content-Type', 'application/json');
  //"X-Authorization"
  // xhr.setRequestHeader('X-Authorization', token);
  xhr.setRequestHeader('X-Authorization', JWT_Token)
 
  console.log(data);
  xhr.send(JSON.stringify(data));
  
}

function prepareRequest (devID, scope){
	
	console.log("in prepareRequest");
		
	if(devID == ""){
		return;
	}else if(devID == "empty"){
		return;
	}else if(devID == "Dev_Test1"){
		console.log("in prepareRequest");
		DEV_ID = "e11c4010-711d-11ef-9db3-51985cbac8e9";
	}else if(devID == "ESP32_Faca"){
		DEV_ID = "";
	}else if(devID == "Gate1_Dav"){
		DEV_ID = "8beeb200-7e59-11ef-92ef-05ff0bb08a5f";
	}else if(devID == "Gate1_Faca"){
		DEV_ID = "";
	}else {
		
	}	
    // OK (SERVER_SCOPE, SHARED_SCOPE, CLIENT_SCOPE)
	if(scope == ""){
		return;
	}else if(scope == "empty"){
		return;
	}else if(scope == "opt_Client_Att"){
		SCOPE = "CLIENT_SCOPE";
	}else if(scope == "opt_Server_Att"){
		SCOPE = "SERVER_SCOPE";
	}else if(scope == "opt_Shared_Att"){
		SCOPE = "SHARED_SCOPE";
	}else if(scope == "opt_Telemetry"){
		SCOPE = "ANY";
		CONTEXT = "/timeseries/";
	}else {
		
	}
} 

function get_DeviceInfo(){
	  console.log("in get_DeviceInfo");
	  const devID = document.getElementById("devID").value;
	  console.log(devID);
	  const devScope = document.getElementById("devScope").value;
	  console.log(devScope);
	  
	  prepareRequest(devID, devScope);
	  makeRequest(TB_URL+DEV_ID+CONTEXT+SCOPE); 
}


// Globarl variable with the list of keys
var TB_URL  = "https://thingsboard.cloud/api/plugins/telemetry/DEVICE/"; 
var TB2URL  = "https://thingsboard.cloud/api/plugins/telemetry/";
var TB4URL  = "https://thingsboard.cloud/api/v1/mvktomg51m6wwigo38fa/telemetry";
var TB5URL  = "https://thingsboard.cloud/api/v1/mvktomg51m6wwigo38fa/attributes";
var CONTEXT = "/values/attributes/";
var CON_PUB = "/attributes/";
var SCOPE   = "empty";
var DEV_ID  = "empty";

// FROM ThingsBoard.h
//char constexpr HTTP_TELEMETRY_TOPIC[] PROGMEM = "/api/v1/%s/telemetry";
// char constexpr HTTP_ATTRIBUTES_TOPIC[] PROGMEM = "/api/v1/%s/attributes";


var objectWithKeys = null;
//var JWT_Token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpZGJvbm4xOEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzYTE3OThmMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6ImJkNzE0ZTEyLTZiM2UtNGY1OC05Yzc5LWM0MDQ1Y2RkMzZmZiIsImV4cCI6MTcyNzk4NTY5NiwiaXNzIjoidGhpbmdzYm9hcmQuY2xvdWQiLCJpYXQiOjE3Mjc5NTY4OTYsImZpcnN0TmFtZSI6IkQiLCJsYXN0TmFtZSI6IkgiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsImlzQmlsbGluZ1NlcnZpY2UiOmZhbHNlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsInRlcm1zT2ZVc2VBY2NlcHRlZCI6dHJ1ZSwidGVuYW50SWQiOiIzOWMwMDMxMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.B-4TSEmW97K_tMPvw44qg8fWSQZmeY6bdqqIRXGvxL4m-tfl3PzzRWDdI1gNHlA_FRkdfMv80zgB1iKe61jxTQ";
//var JWT_Token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpZGJvbm4xOEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzYTE3OThmMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6ImQ3MjMwZDFlLWUyNWEtNGVjZC04M2NiLWE0YmI1NThkYjg1MSIsImV4cCI6MTcyODAxNDcxMiwiaXNzIjoidGhpbmdzYm9hcmQuY2xvdWQiLCJpYXQiOjE3Mjc5ODU5MTIsImZpcnN0TmFtZSI6IkQiLCJsYXN0TmFtZSI6IkgiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsImlzQmlsbGluZ1NlcnZpY2UiOmZhbHNlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsInRlcm1zT2ZVc2VBY2NlcHRlZCI6dHJ1ZSwidGVuYW50SWQiOiIzOWMwMDMxMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.ZII5L-zkJBcDNS1NHTEHUhE054xUqg0tGIgmUk4UjVotQGy_hycPtUmxUdnJsIwzWZ1dRrNqSmx05VJ8N7poqg";
var JWT_Token = "";