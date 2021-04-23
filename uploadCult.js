var uid = null;
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		uid = user.uid;
	} else {
		uid = null;
	}
});

firebase.auth().onAuthStateChanged(function (user){
	if (user) {
	  // User is signed in.
	  uid = user.uid;
	  // document.getElementById("data_email").innerHTML = user.email;
	  if(!firebase.auth().currentUser.emailVerified){
		document.getElementById("uploadC").style.display = "none";
	}
	document.getElementById("LR").style.display = "none";
	}else{
		document.getElementById("uploadC").style.display = "none";
		document.getElementById("SO").style.display = "none";
    	document.getElementById("LR").style.display = "block";
	}
  
  });
function upSport1() {
	var image = document.getElementById('post1-img').files[0];
	var postName = document.getElementById('post1-name').value;
	var postEvName = document.getElementById('post1-evName').value;
	var postInfo = document.getElementById('post1-info').value;
	var postDate = document.getElementById('post1-date').value;
	//var imageName = image.name;
	var files = [];

	var storageRef = firebase.storage().ref('images/' + postEvName + ".png");
	var uploadTask = storageRef.put(image);

	uploadTask.on('state_changed', function (snapshot) {
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log("upload is " + progress + " done");

	}, function (error) {
		console.log(error.message);

	}, function () {
		uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
			firebase.database().ref('MUEVENTS/cultural/' + postEvName).set({
				text: postName,
				title: postEvName,
				body: postInfo,
				imageURL: downloadURL,
				date:postDate,
				UID: uid

			}, function (error) {
				if (error) {
					alert("Error while uploading");
				} else {
					alert("Successfully uploaded");
					document.getElementById('post1-form').reset();
					getdata1();
				}
			});
		});
	});
}

window.onload = function () {
	this.getdata1();
}

function getdata1() {
	var postEvName = document.getElementById('post1-evName').value;
	firebase.database().ref('MUEVENTS/cultural/' + postEvName).once('value').then(function (snapshot) {
		var posts1_div = document.getElementById('posts1');
		posts1_div.innerHTML = "";
		var data = snapshot.val();
		console.log(data);

		for (let [key, value] of Object.entries(data)) {
			if (value.UID == uid) {
				posts1_div.innerHTML = "<div class='col-sm-6 col-md-3 col-lg-2 col-xl-2 col-12 mt-2 mb-1'>" +
					"<div class='card'>" +
					"<img src='" + value.imageURL + "' style='height:250px;'>" +
					"<div class='card-body'><p class='card-header text-center'>" + value.title + "</p>" + "<div class='card-title text-center'><p>" + value.text + "</p><p>"+value.date+"</p></div>" + "<a href='"+value.body+"' class='card-text text-center'>" + value.body + "</a>" +
					"<div class='card-footer text-center'>" + "<button class='btn toHide btn-outline-danger' id='" + key + "' onclick='delete_post1(this.id)'>Delete</button>" + "</div></div></div></div>" + posts1_div.innerHTML;
			}
			else {
				posts1_div.innerHTML = "<div class='col-sm-6 col-md-3 col-lg-2 col-xl-2 col-12 mt-2 mb-1'>" +
					"<div class='card'>" +
					"<img src='" + value.imageURL + "' style='height:250px;'>" +
					"<div class='card-body'><p class='card-header text-center'>" + value.title + "</p>" + "<div class='card-title text-center'><p>" + value.text + "</p><p>"+value.date+"</p></div>" + "<a href='"+value.body+"' class='card-text text-center'>" + value.body + "</a>" +
					"<div class='card-footer text-center'>" + "<button class='btn toHide btn-outline-info' onclick='participateC(\""+value.text+"\",\""+value.title+"\",\""+value.body+"\",\""+value.date+"\",\""+value.UID+"\",\""+uid+"\")'>Add to list</button>" +
					"</div></div></div></div>" + posts1_div.innerHTML;
			}
		}
	
	});
}

function delete_post1(key) {
	firebase.database().ref('MUEVENTS/cultural/' + key).remove();
	getdata1();
}

function participateC(name,evname,link,date,ecUID,parUID){
	if (firebase.auth().currentUser) {
		if(firebase.auth().currentUser.emailVerified){
		console.log(name,evname,link,date,ecUID,parUID);
	    firebase.database().ref('Participate/cultural/'+parUID+"/"+name).set({
		UID: parUID,
		ECUID: ecUID,
		parname: name,
		parevname: evname,
		parlink: link,
		evdate: date
	  });
	  alert("Added to your list!!");
	}else{
		alert("Verify your account to access this feature");
	}

	  }else{
		  alert("You have to Log-in to access this feature");
	  }
}