function testAddRow(inGuest, inRoom, inFrom, inTo, inKey){
  console.log("Add Row");	
  
  $('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
  
  var index = $("table tbody tr:last-child").index();
  var row = '<tr>' +
            '<td>'+inGuest+'</td>' +
            '<td>'+inRoom+'</td>' +
            '<td>'+inFrom+'</td>' +
            '<td>'+inTo+'</td>' +
            '<td>'+inKey+'</td>' +
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



function sendKey(newKeyArr){
  console.log("In send request");
  // makePostRequest('POST', "https://api.altairsmartcore.com/streams/", newKeyArr);
  // makePostRequest('POST', "https://thingsboard.cloud/api/v1/mvktomg51m6wwigo38fa/attributes", newKeyArr);
  // makePostRequestBT2('POST', "https://thingsboard.cloud/api/v1/mvktomg51m6wwigo38fa/attributes", newKeyArr);
  makePostRequestBT2();
}

function makePostRequest(method, url, newKeyArr){
  
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
  var apikey= '996367ee330a4ed903e2253780215dba3e72d24556bcc9917dcb6960da207441';
   // Add the needed headers to make the CORS request to Altair SmartWorks.
  //xhr.setRequestHeader('Host', 'api.altairsmartcore.com');
  // xhr.setRequestHeader('Apikey', apikey);
  //xhr.setRequestHeader('Accept', 'application/json');
  //xhr.setRequestHeader('User-Agent', 'Smartcore-client');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  //xhr.setRequestHeader('Data', data);
 
  console.log(data);
  xhr.send(JSON.stringify(data));
  
}