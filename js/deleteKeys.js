function deleteKey(keyToDeleted){
  console.log("In delete request");
  console.log("Key to delete: " + keyToDeleted);
  var id_dev = getDevId(keyToDeleted);
  console.log("Stream to delete: " + id_dev);
  var urlDelete1 = "https://api.altairsmartcore.com/streams/"+id_dev+"/";
  var urlDelete2 = "https://api.altairsmartcore.com/devices/KeysDevice@davidnike18.davidnike18/streams/"+id_dev+"/";
  deleteRequest('DELETE', urlDelete1, id_dev);
//  deleteRequest('DELETE', "https://api.altairsmartcore.com/devices/KeysDevice@davidnike18.davidnike18/streams",id_dev);
}

function getDevId(keyToDeleted){
  console.log("Function to get the dev ID");
  console.log(this.objectWithKeys);
  for(var i=0; i<this.objectWithKeys.length; i++){
    console.log("Key #"+i+" " + this.objectWithKeys[i].data.key);
    
    if(this.objectWithKeys[i].data.key == keyToDeleted){
      console.log("KeyFounded");
      return this.objectWithKeys[i].id_developer;
      break;
    }
  }
}


function deleteRequest(method, url, id_dev){
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
  xhr.setRequestHeader('Apikey', apikey);
  xhr.setRequestHeader('Accept', '*/*');
  //xhr.setRequestHeader('User-Agent', 'Smartcore-client');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  //xhr.setRequestHeader('id_developer', id_dev);
  
  xhr.send();
  
}