
// DOM Ready =============================================================
$(document).ready(function() {


	// Populate the current config into the table
	loadConfig();
		
    // Create config button click
    $('#btnCreateConfig').on('click', createConfig);
	
});

// Functions =============================================================

// TODO move to separate files
function loadConfig() {
	
	//Empty content string
	var configContent;
	
	$.getJSON( '/config/config', function( jsonData ) {

		if( typeof jsonData == "object"){
			$.each(jsonData, function(key, value) {
				
				configContent += '<tr><th colspan=3 >' + key + '</th></tr>'; 
				
				if( typeof value == "object"){
										
					$.each( value, function(key2, value2) {
					
						configContent += '<tr>';
						configContent += '<th></th><th>' + key2 + '</th>';
						
						configContent += '<td>' + value2 + '</td>'
						configContent += '</tr>';
						
					});				
		
				}
				
			});
			
		}
					
		$('#currentConfig table tbody').html(configContent);
		
	});
};



function createConfig(event) {
	event.preventDefault();
	
    var errorCount = 0;
    $('#inputUserName.input').each(function(index, val) {
        if($(this).val() == '') { errorCount++; }
    });
    
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var credentials = {
            'username': $('#createConfig fieldset input#inputUserName').val(),
            'pass': $('#createConfig fieldset input#inputUserPassword').val(),
            'site_id': $('#createConfig fieldset input#inputUserSiteId').val(),
        }
            
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: credentials,
            url: '/config/createConfig',
            dataType: 'JSON'
        }).done(function( response ) {

            if(response.statusCode == '500'){
                
                console.error("Error in request: ".util.inspect(response));
            }
            
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
    
	//TODO call rest service for config/createConfig
	//Confirm success, display success message
	// Call display config
		
}


function updateConfig(event) {
	event.preventDefault();
	
	//TODO load current config
	// if data sent is different then current data, update jsonObject
	// save json object
	// re display Config file
	
    
    
}

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


