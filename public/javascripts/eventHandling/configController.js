
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
	
    var spinner = new Spinner().spin();
        
    $('#currentConfig table tbody').html(spinner.el);
    
	$.getJSON( '/config/config', function( jsonData ) {

		if( typeof jsonData == "object"){
            
            if(jsonData.error != undefined ){
                
                $('#currentConfig table tbody').html(jsonData.error);
                return false;
            }
            
            
			$.each(jsonData, function(key, value) {
				
				configContent += '<tr><th colspan=3 >' + key + '</th></tr>'; 
				
				if( typeof value == "object"){

										
					$.each( value, function(key2, value2) {
					
                        if( typeof value2 == "object"){
                        
                            configContent += '<tr><td></td><th>' + key2 + '</th></tr>'; 
                        
                            $.each( value2, function(key3, value3){
                                configContent += '<tr>';
                                configContent += '<td></td><td></td><th>' + key3 + '</th>';						
                                configContent += '<td>' + value3 + '</td>'
                                configContent += '</tr>'; 
                            });
                            
                        }else {
                    
                            configContent += '<tr>';
                            configContent += '<th></th><th>' + key2 + '</th>';						
                            configContent += '<td colspan=2>' + value2 + '</td>'
                            configContent += '</tr>';
						}
					});				
		
				}else {
                    configContent += '<tr>';
                    configContent += '<th>' + key + '</th>';						
                    configContent += '<td>' + value + '</td>'
                    configContent += '</tr>';
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

        var spinner = new Spinner().spin();
        
        $('#createConfigError').html(spinner.el);
    
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
            success: function(response){
                     
                //responseString = JSON.stringify(response.success, null, 2);
                if(typeof(response) == 'object' ){
                                    
                    var responseString = response.msg;
                                                  
                    $('#createConfigError').html('<pre>' + responseString + '</pre>');
                
                }else {
                 
                    $('#createConfigError').html('Failed to get result from createConfig resource');
                }
            },
            error: function(response){
                $('#createConfigError').html("ERROR");
            }
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
     
    var spinner = new Spinner().spin();
        
    $('#modifyConfigError').html(spinner.el); 
     
     
    var newConfig = {
        connection: {
            host: $('#modifyConfig fieldset input#inputConfigHost').val(),
            port: $('#modifyConfig fieldset input#inputConfigPort').val(),
            username: $('#modifyConfig fieldset input#inputConfigUsername').val(),
            password: $('#modifyConfig fieldset input#inputConfigPassword').val(),
        },
        api: {
            port: $('#modifyConfig fieldset input#inputConfigApiPort').val(),  
        },
        xpbm: {
            location: $('#modifyConfig fieldset input#inputConfigXpbmLocation').val(),
        },
        site: {
            id: $('#modifyConfig fieldset input#inputConfigSiteId').val(),
            interval: $('#modifyConfig fieldset input#inputConfigSiteInterval').val(),
            client_id: $('#modifyConfig fieldset input#inputConfigSiteClientId').val(),
            external_id: $('#modifyConfig fieldset input#inputConfigSiteExternalId').val(),
            pos: $('#modifyConfig fieldset input#inputConfigSitePos').val(),
        },  
        transfer: {
            source: $('#modifyConfig fieldset input#inputConfigTransferSource').val(),
            matcher: {
                fgm: $('#modifyConfig div fieldset input#inputConfigMatcherFgm').val(),
                mcm: $('#modifyConfig div fieldset input#inputConfigMatcherMcm').val(),
                msm: $('#modifyConfig div fieldset input#inputConfigMatcherMsm').val(),
                ism: $('#modifyConfig div fieldset input#inputConfigMatcherIsm').val(),
                tpm: $('#modifyConfig div fieldset input#inputConfigMatcherTpm').val(),
                tlm: $('#modifyConfig div fieldset input#inputConfigMatcherTlm').val(),
                vcd: $('#modifyConfig div fieldset input#inputConfigMatcherVcd').val(),
                pjr: $('#modifyConfig div fieldset input#inputConfigMatcherFgm').val(),
            },
        },
    };
    
   
    var hasChanged = 0;
    
    //If an input field is present perform changed
    //load json config
    $.getJSON( '/config/config', function( jsonConfigData ) {
    
		if( typeof jsonConfigData == "object"){
            
			$.each(jsonConfigData, function(key, value) {
                
				if( typeof value == "object"){
            
                        $.each( value, function(key2, currentValue) {
					        
                            if( typeof currentValue == "object" ){
                                
                                $.each( currentValue, function(key3 , currentValue2){

                                    if(newConfig[key][key2][key3] == undefined){
                                        
                                        $('#modifyConfigError').html("Key 3 is undefined: " + key3);
                                        return false;                                        
                                    }
                                
                                    var newValue2 = String(newConfig[key][key2][key3]);
                                                                   
                                    if( !(!newValue2 || !/\S/.test(newValue2)) ){
                           
                                       // alert( 'new' + newValue + 'old' + currentValue2);
                                                                                                                                                             
                                        if( !(newValue2 === String(currentValue2)) ){
                                                                                                            
                                        //    alert( "Value is different" );
                           
                                            hasChanged = 1;
                           
                                            jsonConfigData[key][key2][key3] = newValue2;
                                                                                
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
                                                error: function(){
                                                    $('#modifyConfigError').html('Error modifying config file');
                                                }
                                            });                                      
                                                                                
                                            loadConfig();
                                        }
                                    }     
                                    
                                    
                                    
                                });
                                                                
                                
                            }else {
                            
                                var newValue;
                                
                                if(newConfig[key] == undefined){
                                    
                                    $('#modifyConfigError').html("New config key undefined: " + key);
                                    return false;
                                    
                                }else if(newConfig[key][key2] == undefined){
                                    
                                    $('#modifyConfigError').html("New config key2 undefined: " + key + 'key2' + key2);
                                    return false;
                                }
                                                                
                                var newValue = String(newConfig[key][key2]);
                                                               
                                if( !(!newValue || !/\S/.test(newValue)) ){
                       
                                   // alert( 'new' + newValue + 'old' + currentValue);
                                                                                                                                                         
                                    if( !(newValue === String(currentValue)) ){
                                                           
                                        hasChanged = 1;                                                                
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
                                            error: function(){
                                                $('#modifyConfigError').html('Error modifying config file');
                                            }
                                        });                                      
                                                                            
                                        loadConfig();
                                    }
                                }	
                            }
                        });
                                   
                }else {
                            
                    //value isn't object
                }
			});
			
		}
    });
 
    
    if(hasChanged == 0){
        
        $('#modifyConfigError').html("No Values have been changed");
    }
};




