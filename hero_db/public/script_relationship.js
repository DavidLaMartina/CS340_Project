window.onload = function()
{
			document.getElementById('addFriendship').style.display='none';
			document.getElementById('addRivalry').style.display='none';
}

function friendshipFunc(){
    document.getElementById('addFriendship').style.display='block';
    var change = document.getElementById('toggle1');
    if(change.innerHTML == "Add a Friendship between Characters")
    {
        change.innerHTML = "Hide Form";
    }
    else
    {
        change.innerHTML = "Add a Friendship between Characters";
        document.getElementById('addFriendship').style.display='none';
    }
}

function rivalFunc(){
    document.getElementById('addRivalry').style.display='block';
    var change = document.getElementById('toggle2');
    if(change.innerHTML == "Add a Rivalry between Characters")
    {
        change.innerHTML = "Hide Form";
    }
    else
    {
        change.innerHTML = "Add a Rivalry between Characters";
        document.getElementById('addRivalry').style.display='none';
    }
}

function deleteFriendship(id){
	$.ajax({
		url: '/character_relationships/deleteFriendship/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};

function deleteRivalry(id){
	$.ajax({
		url: '/character_relationships/deleteRivalry/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};

//reference = https://www.w3schools.com/js/js_validation.asp
function validateFriendship(){
    var friend1, friend2, text;
    text = "";
    document.getElementById("friendship_message").innerHTML = text;
    //Get value from input field
    friend1 = document.forms["friendship_form"]["friend1_id"].value;
    friend2 = document.forms["friendship_form"]["friend2_id"].value;
    if(friend1 == friend2)
    {
        text = "Characters cannot be friends with themselves";
        document.getElementById("friendship_message").innerHTML = text;
        return false;
    }
    else
    {
        return true;
    }
    //set a message for the user in the form
    document.getElementById("friendship_message").innerHTML = text;
}

function validateRivalry(){
    var rival1, rival2, text;
    text = "";
    document.getElementById("rivalry_message").innerHTML = text;
    //Get value from input field
    rival1 = document.forms["rivalry_form"]["rival1_id"].value;
    rival2 = document.forms["rivalry_form"]["rival2_id"].value;
    if(rival1 == rival2)
    {
        text = "Characters cannot be rivals with themselves";
        document.getElementById("rivalry_message").innerHTML = text;
        return false;
    }
    else
    {
        return true;
    }
    //set a message for the user in the form
    document.getElementById("rivalry_message").innerHTML = text;
}