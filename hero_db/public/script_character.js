window.onload = function()
{
    document.getElementById('addCharacter').style.display='none';
    document.getElementById('addEquipment').style.display='none';
    document.getElementById('addCity').style.display='none';
}
//Reference for the following 3 functions is:
// https://stackoverflow.com/questions/28620819/how-to-change-button-text-on-click-using-javascript
// https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
function characterFunc(){
    document.getElementById('addCharacter').style.display='block';
    var change = document.getElementById('toggle1');
    if(change.innerHTML == "Add a Character to the Database")
    {
        change.innerHTML = "Hide Form";
    }
    else{
        change.innerHTML = "Add a Character to the Database";
        document.getElementById('addCharacter').style.display='none';
    }
}

function equipmentFunc(){
    document.getElementById('addEquipment').style.display='block';
    var change = document.getElementById('toggle2');
    if(change.innerHTML == "Add Equipment to the Database")
    {
        change.innerHTML = "Hide Form";
    }
    else{
        change.innerHTML = "Add Equipment to the Database";
        document.getElementById('addEquipment').style.display='none';
    }
}

function cityFunc(){
    document.getElementById('addCity').style.display='block';
    var change = document.getElementById('toggle3');
    if(change.innerHTML == "Add City to the Database")
    {
        change.innerHTML = "Hide Form";
    }
    else{
        change.innerHTML = "Add City to the Database";
        document.getElementById('addCity').style.display='none';
      }

}
function deleteCharacter(id){
	$.ajax({
		url: '/characters/deleteCharacter/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};

function deleteEquipment(id){
	$.ajax({
		url: '/characters/deleteEquipment/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};

function deleteCity(id){
	$.ajax({
		url: '/characters/deleteCity/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};

function selectCity(id){
	$("#city-selector").val(id);
}

function selectCityFilter(id){
  if(id){
    $("#city_filter").val(id);
  }
}

function updateCharacter(id){
	$.ajax({
		url: '/characters/' + id,
		type: 'PUT',
		data: $('#update-character').serialize(),
		success: function(result){
			window.location.replace("/characters");
		}
	})
};

function filterCharactersByCity(){
  // Get id of selected city from dropdown
  var city_filter = document.getElementById("city_filter");
  // Construct URL and redirect
  if(city_filter.value){
    window.location = "/characters/filter/" + city_filter.value;
  }else{
    window.location = "/characters";
  }

}


/*function selectRole(role){

  if(role){
    $("#role-selector").val("TRUE");
  }else{
    $("#role-selector").val("FALSE");
  }
}*/

//reference = https://www.w3schools.com/js/js_validation.asp
function validateCharacterName(){
	var name, text;
	text = "";
	document.getElementById("character_message").innerHTML = text;
	//Get value from input field
	name = document.forms["update_form"]["character_name"].value;
	if(name == null || name == '')
	{
		text = "The Character Name cannot be blank";
		document.getElementById("character_message").innerHTML = text;
		return false;
	}
	//set a message for the user in the form
	document.getElementById("character_message").innerHTML = text;
	return true;
}
