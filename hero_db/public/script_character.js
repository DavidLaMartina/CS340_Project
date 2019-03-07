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

function updateCharacter(id){
	alert("Hello World");
	$.ajax({
		url: '/characters/' + id,
		type: 'PUT',
		data: $('#update-character').serialize(),
		success: function(result){
			window.location.replace("/characters");
		}
	})
};
