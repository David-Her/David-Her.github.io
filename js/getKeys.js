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
  
  /// OK 
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
	addRowToTable(obj[i].lastUpdateTs, obj[i].key, obj[i].value);
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

// Globarl variable with the list of keys
var objectWithKeys = null;
var JWT_Token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpZGJvbm4xOEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzYTE3OThmMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6ImU0NDE4NTUxLTAzZTUtNDUxOS04ZTQ5LTkzZGUwYTgxMzZlZiIsImV4cCI6MTcyNjUzOTc5MiwiaXNzIjoidGhpbmdzYm9hcmQuY2xvdWQiLCJpYXQiOjE3MjY1MTA5OTIsImZpcnN0TmFtZSI6IkQiLCJsYXN0TmFtZSI6IkgiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsImlzQmlsbGluZ1NlcnZpY2UiOmZhbHNlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsInRlcm1zT2ZVc2VBY2NlcHRlZCI6dHJ1ZSwidGVuYW50SWQiOiIzOWMwMDMxMC03MTFkLTExZWYtYTQzNS1mNzA5NjRkZWQwZDciLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.XE94zH60BYvG_1uT5Ad_FpmUqbjrMvUbkNbLOZuQz88CjIMQ50XonNYE31P7Y4WqrkcQ037JbSyBE-QIMY51BA";
