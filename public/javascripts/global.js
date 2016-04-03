
// DOM Ready =============================================================
$(document).ready(function() {


	// Populate the current config into the table
	populateConfig();
		
    // Add User button click
    $('#btnAddUser').on('click', addUser);
	
});

// Functions =============================================================

// TODO move to separate files
function populateConfig() {
	
	//Empty content string
	var configContent = [];
	
	$.getJSON( '/config/config', function( data ) {
		
		var count = -1;
		
		for(var key in data){

			configContent[count++] = '<tr>';
			configContent[count++] = '<th>' + key + '</th>';
			configContent[count++] = '</tr>';
			
			for(var i = 0, size=data.key.length;  i < size; i++){
					
				configContent[count++] = '<tr>';
				configContent[count++] = '<th>' + pkey + '</th>';
				configContent[count++] = '<td>' + pkey.toString + '</td>';
				configContent[count++] = '</tr>';
			}
			
			
		}
						
		$('#currentConfig table tbody').html(configContent);
		
	});
};



// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};


