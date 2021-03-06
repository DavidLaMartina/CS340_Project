window.onload = function(){
    document.getElementById('addPowerToCharacter').style.display='none';
    document.getElementById('addPower').style.display='none';
    document.getElementById('addWeaknessToCharacter').style.display='none';
    document.getElementById('addWeakness').style.display='none';
}
//Reference for the following 3 functions is:
// https://stackoverflow.com/questions/28620819/how-to-change-button-text-on-click-using-javascript
// https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp

function powerFunc(){
    document.getElementById('addPower').style.display='block';
    var change = document.getElementById('toggle1');
    if(change.innerHTML == "Add a Power")
    {
		document.getElementById('power_type').value = "";
		document.getElementById('power_message').innerHTML = "";
        change.innerHTML = "Hide Form";
    }
    else{
        change.innerHTML = "Add a Power";
        document.getElementById('addPower').style.display='none';
    }
}

function powerToCharacterFunc(){
    document.getElementById('addPowerToCharacter').style.display='block';
    var change = document.getElementById('toggle2');
    if(change.innerHTML == "Add a Power to a Character")
    {
        change.innerHTML = "Hide Form";
    }
    else{
        change.innerHTML = "Add a Power to a Character";
        document.getElementById('addPowerToCharacter').style.display='none';
    }
}

function weaknessFunc(){
    document.getElementById('addWeakness').style.display='block';
    var change = document.getElementById('toggle3');
    if(change.innerHTML == "Add a Weakness")
    {
		document.getElementById('weakness_type').value = "";
		document.getElementById('message').innerHTML = "";
        change.innerHTML = "Hide Form";
    }
    else{
        change.innerHTML = "Add a Weakness";
        document.getElementById('addWeakness').style.display='none';

    }
}

function weaknessToCharacterFunc(){
    document.getElementById('addWeaknessToCharacter').style.display='block';
    var change = document.getElementById('toggle4');
    if(change.innerHTML == "Add a Weakness to a Character")
    {
        change.innerHTML = "Hide Form";
    }
    else{
        change.innerHTML = "Add a Weakness to a Character";
        document.getElementById('addWeaknessToCharacter').style.display='none';
    }
}
//reference = https://www.w3schools.com/js/js_validation.asp
function validateNumber(){
	var num, text;
	text = "";
	//document.getElementById("weakness_message").innerHTML = text;
	//Get value from input field
	num = document.forms["weakness_form"]["weakness_magnitude"].value;
	if(num == null || num == '')
	{
		text = "The Weakness magnitude cannot be blank";
		document.getElementById("message").innerHTML = text;
		return false;
	}
	//set a message for the user in the form
	document.getElementById("message").innerHTML = text;
}

//reference = https://www.w3schools.com/js/js_validation.asp
function validatePowerNumber(){
	var num, text;
	text = "";
	document.getElementById("power_message").innerHTML = text;
	//Get value from input field
	num = document.forms["power_form"]["power_magnitude"].value;
	if(num == null || num == '')
	{
		text = "The Power magnitude cannot be blank";
		document.getElementById("power_message").innerHTML = text;
		return false;
	}
	//set a message for the user in the form
	document.getElementById("power_message").innerHTML = text;
}

function deletePower(id){
  $.ajax({
    url: '/powers_weaknesses/deletePower/' + id,
    type: 'DELETE',
    success: function(result){
      window.location.reload(true);
    }
  })
};

function deleteWeakness(id){
  $.ajax({
    url: '/powers_weaknesses/deleteWeakness/' + id,
    type: 'DELETE',
    success: function(result){
      window.location.reload(true);
    }
  })
};

function deleteCharacterPower(id){
	$.ajax({
		url: '/powers_weaknesses/deleteCharacterPower/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};

function deleteCharacterWeakness(id){
	$.ajax({
		url: '/powers_weaknesses/deleteCharacterWeakness/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
