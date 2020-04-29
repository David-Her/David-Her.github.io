function testAddRow(){
  console.log("Add Row");	
  
  $('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
  
  var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td>A</td>' +
            '<td>B</td>' +
            '<td>C</td>' +
			      '<td>D</td>' +
			      '<td>' + actions + '</td>' +
            '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
  
  
  
  
}



function sendKey(){
  console.log("In send request");
  makePostRequest('POST', "https://api.altairsmartcore.com/streams/");
	
}

function makePostRequest(method, url){
  var xhr = new XMLHttpRequest();
  var timeNow = Math.floor(Date.now()/1000); // Decrease precision.
  var d = new Date();
  var randomNummer = Math.floor(Math.random()*(999-100+1)+100);
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
      "room"  :randomNummer,
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