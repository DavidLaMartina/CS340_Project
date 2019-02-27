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
