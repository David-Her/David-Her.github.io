$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="name" id="name"></td>' +
            '<td><input type="text" class="form-control" name="department" id="department"></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
			'<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
			'<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
			//'<td>' + actions + '</td>' +
			'<td>'+
            '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>'+
            '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>'+
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
			var newKeyArr = [];
			input.each(function(){
				console.log("INPUT: " + $(this).val());
				newKeyArr.push($(this).val());
				console.log(newKeyArr);
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
			// Send keys
			sendKey(newKeyArr);
		}
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
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