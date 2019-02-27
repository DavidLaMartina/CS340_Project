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