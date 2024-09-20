$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	var randomKey = null;
	var newKeyArr = [false, false, false, false, false];
	var indexFalse = [1,2,3,4];
	var fromEdit = false;
	getKeysFunction();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
	    var randomNummer = Math.floor(Math.random()*(999-100+1)+100);
		var randomLetters = makeid(3);
		randomKey = randomLetters+randomNummer.toString();
		console.log(randomKey);
		newKeyArr[0] = randomKey;
		indexFalse = [1,2,3,4];
		fromEdit = false;
//		Key	Guest	Room	From	To
        var row = '<tr>' +
            '<td>'+randomKey+'</td>' +
            '<td><input type="text" class="form-control" name="guest" id="guest"></td>' +
            '<td><input type="text" class="form-control" name="room"  id="room"></td>' +
			'<td><input type="text" placeholder="dd.mm.yyyy" pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}" class="form-control" name="from"  id="phone"></td>' +
			'<td><input type="text" placeholder="dd.mm.yyyy" pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}" class="form-control" name="to"    id="to"></td>' +
			//'<td>' + actions + '</td>' +
			'<td>'+
            '<a class="add"    title="Add"    data-toggle="tooltip"><i class="glyphicon glyphicon-ok"></i></a>'+
            '<a class="edit"   title="Edit"   data-toggle="tooltip"><i class="glyphicon glyphicon-pencil"></i></a>'+
            '<a class="delete" title="Delete" data-toggle="tooltip"><i class="glyphicon glyphicon-trash"></i></a>'+
            '</td>'+
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		console.log("On Click ADD");
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
	    //var input = $(this).parents("tr").find("td:not(:first-child):not(:last-child)");
		
        input.each(function(){
			console.log($(this).val());
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
				//newKeyArr.push(false);
				indexFalse.push(indexFalse[0]);
			}
			else
			{
				if( (indexFalse[0]>2) && (isValidDate($(this).val())))
				{ // Check-in/out
					console.log("CHECK-In value: index "+indexFalse[0]);
					newKeyArr[indexFalse[0]] = $(this).val();
					if(parseDate(newKeyArr[3], $(this).val()))
					{
						$(this).parent("td").html($(this).val());
						$(this).removeClass("error");
					}
					else
					{	// If the date does not mach
						$(this).addClass("error");
						empty = true;
						//newKeyArr.push(false);
						indexFalse.push(indexFalse[0]);						
					}
				}
				else if ((indexFalse[0] < 3))
				{ // Guest or Room
					newKeyArr[indexFalse[0]] = $(this).val();
					$(this).parent("td").html($(this).val());
					$(this).removeClass("error");
				}
				else
				{
					$(this).addClass("error");
					empty = true;
					//newKeyArr.push(false);
					indexFalse.push(indexFalse[0]);
				}
            }
			indexFalse.shift();
		});
		console.log("False index = "+ indexFalse + "[0] = " + indexFalse[0]);
		console.log("Current Array: " + newKeyArr)
		$(this).parents("tr").find(".error").first().focus();
		if(!empty)
		{
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
			// Send keys
			console.log("Key to send: " + newKeyArr);
			if(fromEdit)
			{
				//deleteKey(newKeyArr[0]);
			}
			sendKey(newKeyArr);
		}
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){
		fromEdit = true;
		$(this).parents("tr").find("td:not(:first-child):not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});
		$(this).parents("tr").find("td:first").each(function(){	
			console.log("Key to edit = " + $(this).text());
			randomKey = $(this).text(); // Keep the same key value when editing
			newKeyArr[0] = randomKey;
			indexFalse = [1,2,3,4];
			//newKeyArr.push(randomKey);
		});	
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
		console.log("On DELETE");
		//console.log($(this).parents("tr").text());
		//$(this).parents("tr").find("td:not(:last-child)").each(function(){
		$(this).parents("tr").find("td:first").each(function(){	
			console.log($(this).text());
			var keyToDeleted = $(this).text();
			deleteKey(keyToDeleted);
		});	
//		console.log($(this).html("td"));
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function isValidDate(inDate) 
{
   var result           = false;
   // console.log(inDate + " length= "+inDate.length);
	if( (inDate.length == 10)
		&& (inDate.charCodeAt(0) > 47) // d at least 0
        && (inDate.charCodeAt(0) < 52) // d smaller that 4
		&& (inDate.charCodeAt(1) > 47) // d at least 0
		&& (inDate.charCodeAt(1) < 58) // d maximun 9
	   
		&& (inDate.charCodeAt(2) == 46)// . equlas point

	    && (inDate.charCodeAt(3) > 47) // m at least 0
		&& (inDate.charCodeAt(3) < 50) // m smaller than 2
		&& (inDate.charCodeAt(4) > 47) // m
		&& (inDate.charCodeAt(4) < 58) // m 

		&& (inDate.charCodeAt(5) == 46) // .

	    && (inDate.charCodeAt(6) > 47) // y
	    && (inDate.charCodeAt(6) < 58) // y
		&& (inDate.charCodeAt(7) > 47) // y
		&& (inDate.charCodeAt(7) < 58) // y
		&& (inDate.charCodeAt(8) > 47) // y
		&& (inDate.charCodeAt(8) < 58) // y
		&& (inDate.charCodeAt(9) > 47) // y
		&& (inDate.charCodeAt(9) < 58) ) // y
	{
		result = true;
	}
	
   return result;
}


function parseDate(inDate1, inDate2) 
{
	var result = false;
	
	var tag1    = parseInt(inDate1.charAt(0)+inDate1.charAt(1));
	var monate1 = parseInt(inDate1.charAt(3)+inDate1.charAt(4));
	var jahr1   = parseInt(inDate1.charAt(6)+inDate1.charAt(7)+inDate1.charAt(8)+inDate1.charAt(9));
	
	var tag2    = parseInt(inDate2.charAt(0)+inDate2.charAt(1));
	var monate2 = parseInt(inDate2.charAt(3)+inDate2.charAt(4));
	var jahr2   = parseInt(inDate2.charAt(6)+inDate2.charAt(7)+inDate2.charAt(8)+inDate2.charAt(9));
	
	// console.log(Date.now());
	// console.log(Date.UTC(jahr1, monate1-1, tag1, 0, 0, 0));
	
	if(  (Date.UTC(jahr2, monate2-1, tag2, 0, 0, 0) >= Date.UTC(jahr1, monate1-1, tag1, 0, 0, 0))
	  && (Date.UTC(jahr1, monate1-1, tag1+1, 0, 0, 0) >= Date.now() ) )
	{
		result = true;
	}
	return result;
}