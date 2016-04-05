
// DOM Ready =============================================================
$(document).ready(function() {


	// Populate the current config into the table
	loadConfig();
		
    // Create config button click
    $('#btnCreateConfig').on('click', createConfig);
	
    // Modify config button click
    $('#btnModifyConfig').on('click', updateConfig);
    
});

// Functions =============================================================

// TODO move to separate files
function loadConfig() {
	
    $('#currentConfig table tbody').html('');
    
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

/*
* createConfig 
*   Executes Configure.js to create config 
*/

function createConfig(event) {
	event.preventDefault();
	
    //Reset error messge
    $('#createConfigError').html("");
    
    var errorCount = 0;
    $('#createConfig :input').each(function(index, value) {
        
        if( $(this).val() == '' 
            && ! $(this).is(":button" )){
            
            errorCount++;
        }
    });
    

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var credentials = {
            'username': $('#createConfig fieldset input#inputUserName').val(),
            'pass': $('#createConfig fieldset input#inputUserPassword').val(),
            'siteId': $('#createConfig fieldset input#inputUserSiteId').val(),
        }
                
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: credentials,
            url: '/config/createConfig',
            dataType: 'JSON',
            success: function(){
                $('#createConfigError').html('Successfully created config');
             },
             error: function(){
                $('#createConfigError').html('Error creating config');
             },
        });
    }
    else {
        // If errorCount is more than 0, error out
        $('#createConfigError').html('Please fill in all fields');
        return false;
    }
    	
}


function updateConfig(event) {
	event.preventDefault();
	
    // Validate at least one field present
    var changed = 0;
    var changed_values = new Object();
    
    $('#modifyConfig input').each(function(index, val) {
       if($(this).val() != '' ){ changed++; } 
    });
    
    if(changed == 0){
        
        $('#modifyConfigError').html('No values found in form');
        return;
    }
     
    var newConfig = {
        connection: {
            host: $('#modifyConfig fieldset input#inputConfigHost').val(),
            port: $('#modifyConfig fieldset input#inputConfigPort').val(),
            username: $('#modifyConfig fieldset input#inputConfigUsername').val(),
            password: $('#modifyConfig fieldset input#inputConfigPassword').val(),
        },
        xpbm: {
            location: $('#modifyConfig fieldset input#inputConfigXpbmLocation').val(),
        },
        site: {
            id: $('#modifyConfig fieldset input#inputConfigSiteId').val(),
            interval: $('#modifyConfig fieldset input#inputConfigSiteInterval').val(),
        },   
     };

    
    //If an input field is present perform changed
    //load json config
    $.getJSON( '/config/config', function( jsonConfigData ) {

		if( typeof jsonConfigData == "object"){
            
			$.each(jsonConfigData, function(key, value) {
                
				if( typeof value == "object"){
            
                        $.each( value, function(key2, currentValue) {
					        
                            var newValue = String(newConfig[key][key2]);
                                                           
                            if( !(!newValue || !/\S/.test(newValue)) ){
                   
                               // alert( 'new' + newValue + 'old' + currentValue);
                                                                                                                                                     
                                if( !(newValue === String(currentValue)) ){
                                                                                                    
                                //    alert( "Value is different" );
                                
                                    jsonConfigData[key][key2] = newValue;
                                                                        
                                    //Value have changed
                                    //$('#modifyConfigError').html('Found changed value');
                                                        
                                    var jsonConfigString = JSON.stringify(jsonConfigData);
                                                       
                                                       
                                    // Use AJAX to post the object to our adduser service
                                    $.ajax({
                                        type: 'POST',
                                        data: jsonConfigString,
                                        url: '/config/modifyConfig',
                                        success: function(){
                                            
                                            $('#modifyConfigError').html('Successfully changed config');
                                        },
                                        
                                    });                                      
                                                                        
                                    loadConfig();
                                }
                            }						
                        });
                                   
                }else {
                            
                    //value isn't object
                }
			});
			
		}
    });
 
	//TODO load current config
	// if data sent is different then current data, update jsonObject
	// save json object
	// re display Config file
	   
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


