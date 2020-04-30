$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	var randomKey = null;
	getKeysFunction();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
	    var randomNummer = Math.floor(Math.random()*(999-100+1)+100);
		var randomLetters = makeid(3);
		randomKey = randomLetters+randomNummer.toString();
		console.log(randomKey);
//		Key	Guest	Room	From	To
        var row = '<tr>' +
            '<td>'+randomKey+'</td>' +
            '<td><input type="text" class="form-control" name="guest" id="guest"></td>' +
            '<td><input type="text" class="form-control" name="room"  id="room"></td>' +
			'<td><input type="text" placeholder="dd.mm.yyyy" pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}" class="form-control" name="from"  id="phone"></td>' +
			'<td><input type="text" placeholder="dd.mm.yyyy" pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}" class="form-control" name="to"    id="to"></td>' +
			//'<td>' + actions + '</td>' +
			'<td>'+
            '<a class="add"    title="Add"    data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>'+
            '<a class="edit"   title="Edit"   data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>'+
            '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>'+
            '</td>'+
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			console.log("Key in add:" + randomKey);
			var newKeyArr = [randomKey];
			input.each(function(){
				console.log("INPUT: " + $(this).val());
				newKeyArr.push($(this).val());
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
			// Send keys
			console.log("Key to send: " + newKeyArr);
			sendKey(newKeyArr);
		}
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){
		$(this).parents("tr").find("td:not(:first-child):not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
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