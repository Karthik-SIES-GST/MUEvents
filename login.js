var firebaseConfig = {
  apiKey: "AIzaSyBd2Upu67mJYwEFfwxnT5s6Il1DW37r340",
  authDomain: "mu-events-3bd6d.firebaseapp.com",
  databaseURL: "https://mu-events-3bd6d.firebaseio.com",
  projectId: "mu-events-3bd6d",
  storageBucket: "mu-events-3bd6d.appspot.com",
  messagingSenderId: "274089921064",
  appId: "1:274089921064:web:c2cedd386d9ad74e43431d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//--------------------------------------------------------------------------//

const auth = firebase.auth();
var uid = null;
var uid1 = null;
// if (user) {
//   // User is signed in.
//   uid = user.uid;
//   // document.getElementById("data_email").innerHTML = user.email;
// }else{
//   window.location.replace("login.html");
// }
function signup(){
  var email = document.getElementById("emailR").value;
  var password = document.getElementById("passwordR").value;
  var nameR = document.getElementById("nameR").value;
  var contactR = document.getElementById("contactR").value;

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    uid = cred.user.uid;
    firebase.database().ref('User/' + uid).set({
      UID: uid,
      displayName: nameR,
      EmailOfUser: email,
      ContactOfUser: contactR
    });
  });
  alert("Successfully Registered");
}

function signin(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const promise = auth.signInWithEmailAndPassword(email, password).then(function(){
    window.location.replace("Index.html");
    if (!auth.currentUser.emailVerified) {
      auth.currentUser.sendEmailVerification().then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
    }
  });
  promise.catch(e => alert(e.message));
  // if (firebase.auth().currentUser != null) {
  //   window.location.replace("Index.html");
  // }
}
// if (auth.currentUser) {
//   // User is signed in.
//   if (!auth.currentUser.emailVerified) {
//     auth.currentUser.sendEmailVerification().then(function() {
//       // Email sent.
//     }).catch(function(error) {
//       // An error happened.
//     });
//   }
// }
firebase.auth().onAuthStateChanged(function (user){
  if (user) {
    // User is signed in.
    // if (!auth.currentUser.emailVerified) {
    //   auth.currentUser.sendEmailVerification().then(function() {
    //     // Email sent.
    //   }).catch(function(error) {
    //     // An error happened.
    //   });
    // }
    document.getElementById("LR").style.display = "none";
    uid = user.uid;
    getdataS();
    getdataC();
    getdataT();
    getdataO();
    // document.getElementById("data_email").innerHTML = user.email;
    var data_contact = document.getElementById("data");
    firebase.database().ref('User/' + uid).on('value', function (snapshot) {
      data_contact.innerHTML = "<h2>Profile</h2><h3>Name : " + snapshot.val().displayName + "</h3><h3>Email : " + snapshot.val().EmailOfUser + "</h3><h3>Contact : " + snapshot.val().ContactOfUser +"</h3><h3>Account Verified : "+auth.currentUser.emailVerified+"</h3><br><br>";
    });
  }
  else{
    var data_contact = document.getElementById("data");
    data_contact.innerHTML = "<h2>Profile</h2><h3>Name : None </h3><h3>Email : None</h3><h3>Contact : None</h3><h3>Account Verified : None</h3><br><br>";

    document.getElementById("SO").style.display = "none";
    document.getElementById("LR").style.display = "block";
  }

});


function signOut(){
  auth.signOut().then(function(){
    // Sign-out successful.
    window.location.replace("Index.html");
    document.getElementById("SO").style.display = "none";
    document.getElementById("LR").style.display = "block";
    alert("DONE");
  }).catch((error) => {
    // An error happened.
    alert("Error-Could not sign out!!");
  });
}

// window.onload = function (){
// 	this.getdata();
// }

function getdataS(){
	// var name = window.name;
  uid = auth.currentUser.uid;
	firebase.database().ref('Participate/sports/'+uid).once('value').then(function (snapshot) {
    console.log(uid);
		var partiS = document.getElementById('partiS');
		partiS.innerHTML = "";
		var data = snapshot.val();
		console.log(data);
    if(data!=null){
		for (let [key, value] of Object.entries(data)){
				partiS.innerHTML = "<div class='col-sm-6 col-md-3 col-lg-2 col-xl-2 col-12 mt-2 mb-1'>" +
        "<div class='card'>" +
        "<div class='card-body'><p class='card-header text-center'>" + value.parname + "</p>" + "<p class='card-title text-center'>" + value.parevname + "</p>" + "<a href='"+value.parlink+"' class='card-text text-center'>" + value.parlink + "</a>" +
        "<div class='card-footer text-center'>" + "<button class='btn toHide btn-outline-danger' id='" + key + "' onclick='delete_postS(this.id)'>Remove</button>" + "</div></div></div></div>" + partiS.innerHTML;
		}
  }else{
    partiS.innerHTML = "<h4 class=\"text-centre\">No Events Added To The List</h4>" + partiS.innerHTML;
  }
	});
}
function getdataC(){
	// var name = window.name;
  uid = auth.currentUser.uid;
	firebase.database().ref('Participate/cultural/'+uid).once('value').then(function (snapshot) {
    console.log(uid);
		var partiC = document.getElementById('partiC');
		partiC.innerHTML = "";
		var data = snapshot.val();
		console.log(data);
    if(data!=null){
		for (let [key, value] of Object.entries(data)){
				partiC.innerHTML = "<div class='col-sm-6 col-md-3 col-lg-2 col-xl-2 col-12 mt-2 mb-1'>" +
        "<div class='card'>" +
        "<div class='card-body'><p class='card-header text-center'>" + value.parname + "</p>" + "<p class='card-title text-center'>" + value.parevname + "</p>" + "<a href='"+value.parlink+"' class='card-text text-center'>" + value.parlink + "</a>" +
        "<div class='card-footer text-center'>" + "<button class='btn toHide btn-outline-danger' id='" + key + "' onclick='delete_postC(this.id)'>Remove</button>" + "</div></div></div></div>" + partiC.innerHTML;
		}
  }else{
    partiC.innerHTML = "<h4 class=\"text-centre\">No Events Added To The List</h4>" + partiC.innerHTML;
  }
	});
}
function getdataT(){
	// var name = window.name;
  uid = auth.currentUser.uid;
	firebase.database().ref('Participate/technical/'+uid).once('value').then(function (snapshot) {
    console.log(uid);
		var partiT = document.getElementById('partiT');
		partiT.innerHTML = "";
		var data = snapshot.val();
		console.log(data);
    if(data!=null){
		for (let [key, value] of Object.entries(data)){
				partiT.innerHTML = "<div class='col-sm-6 col-md-3 col-lg-2 col-xl-2 col-12 mt-2 mb-1'>" +
        "<div class='card'>" +
        "<div class='card-body'><p class='card-header text-center'>" + value.parname + "</p>" + "<p class='card-title text-center'>" + value.parevname + "</p>" + "<a href='"+value.parlink+"' class='card-text text-center'>" + value.parlink + "</a>" +
        "<div class='card-footer text-center'>" + "<button class='btn toHide btn-outline-danger' id='" + key + "' onclick='delete_postT(this.id)'>Remove</button>" + "</div></div></div></div>" + partiT.innerHTML;
		}
  }else{
    partiT.innerHTML = "<h4 class=\"text-centre\">No Events Added To The List</h4>" + partiT.innerHTML;
  }
	});
}
function getdataO(){
	// var name = window.name;
  uid = auth.currentUser.uid;
	firebase.database().ref('Participate/other/'+uid).once('value').then(function (snapshot) {
    console.log(uid);
		var partiO = document.getElementById('partiO');
		partiO.innerHTML = "";
		var data = snapshot.val();
		console.log(data);
    if(data!=null){
		for (let [key, value] of Object.entries(data)){
				partiO.innerHTML = "<div class='col-sm-6 col-md-3 col-lg-2 col-xl-2 col-12 mt-2 mb-1'>" +
        "<div class='card'>" +
        "<div class='card-body'><p class='card-header text-center'>" + value.parname + "</p>" + "<p class='card-title text-center'>" + value.parevname + "</p>" + "<a href='"+value.parlink+"' class='card-text text-center'>" + value.parlink + "</a>" +
        "<div class='card-footer text-center'>" + "<button class='btn toHide btn-outline-danger' id='" + key + "' onclick='delete_postO(this.id)'>Remove</button>" + "</div></div></div></div>" + partiO.innerHTML;
		}
  }else{
    partiO.innerHTML = "<h4 class=\"text-centre\">No Events Added To The List</h4>" + partiO.innerHTML;
  }
	});
}

function delete_postS(key) {
  uid = auth.currentUser.uid;
	firebase.database().ref('Participate/sports/'+uid+'/' + key).remove();
	getdataS();
}
function delete_postC(key) {
  uid = auth.currentUser.uid;
	firebase.database().ref('Participate/cultural/'+uid+'/' + key).remove();
	getdataC();
}
function delete_postT(key) {
  uid = auth.currentUser.uid;
	firebase.database().ref('Participate/technical/'+uid+'/' + key).remove();
	getdataT();
}
function delete_postO(key) {
  uid = auth.currentUser.uid;
	firebase.database().ref('Participate/other/'+uid+'/' + key).remove();
	getdataO();
}