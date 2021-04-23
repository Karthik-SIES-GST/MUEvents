var uid = null;
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
uid = user.uid;
}else{
  uid = null;
}
});	

window.onload=function(){
	this.pro();
}

function pro(){
    var greet = document.getElementById("greet");
    greet.innerHTML = "hey there"+value.uid+"!!"+greet.innerHTML;
}