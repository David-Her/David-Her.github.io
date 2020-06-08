  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyDZ5gjj9M4AIhURdUMwMa0ojYZquHc_UEs",
      authDomain: "kypro-59126.firebaseapp.com",
      databaseURL: "https://kypro-59126.firebaseio.com",
      projectId: "kypro-59126",
      storageBucket: "kypro-59126.appspot.com",
      messagingSenderId: "670064019690",
      appId: "1:670064019690:web:ede5166a61debfe6996f93"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);


  var db = firebase.firestore();

  db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          let user = doc.data();
          console.log(user.name);
          let $a = document.createElement("a");
          $a.innerHTML = '<span class="panel-icon"><i class="fas fa-book" aria-hidden="true"></i></span>' + user.name;
          $a.className = 'panel-block';
          $a.setAttribute("child-key", doc.id);
          $a.addEventListener("click", userClicked);
          //userListUI.append($a);
      });
      //progress1.style.display = 'none';
  });

  function userClicked(e) {
      var userID = e.target.getAttribute("child-key");

      e.target.parentElement.querySelectorAll(".is-active").forEach(e =>
          e.classList.remove("is-active"));
      e.target.classList.add("is-active");

      console.log(userID);
      const userRef = db.collection("users").doc(userID);
      const userDetailUI = document.getElementById("itemDetail");
      userDetailUI.innerHTML = ""
      userRef.get().then(function(doc) {
          var $p = document.createElement("p");
          console.log(doc.data());
          $p.innerHTML = "<li> Name: " + doc.data().name + "</li><li>" + "Age: " + doc.data().age + "</li><li>" + "Email: " + doc.data().email + "</li>";
          userDetailUI.append($p);
      });
  }

  const keyListUI = document.getElementById("keyList");
  const progress2 = document.getElementById("progress2");

  db.collection("secureKeys/core1/keys").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          let keyData = doc.data();
          console.log("KEY DATA firebase: ");
          console.log(keyData);
          let $a = document.createElement("a");
          $a.innerHTML = '<span class="panel-icon"><i class="fas fa-book" aria-hidden="true"></i></span>' + keyData.key;
          $a.className = 'panel-block';
          $a.setAttribute("child-key", doc.id);
          $a.addEventListener("click", keyClicked);
          console.log("Start Date");
          console.log(keyData.startDate.seconds);
          //keyData.guest: kypro-Firebase
          //keyData.endDate: Tue Dec 01 2020 00:00:00 GMT+0100 (Central European Standard Time)
          //keyData.room: testRoom
          //keyData.active: false
          //keyData.startDate: Mon Jun 01 2020 00:00:00 GMT+0200 (Central European Summer Time)
          //keyData.key: Rtj379
          //keyData.valid: true
          var startD = new Date(keyData.startDate.seconds*1000); // The 0 there is the key, which sets the date to the epoch
          var endD =   new Date(keyData.endDate.seconds*1000); // The 0 there is the key, which sets the date to the epoch
          testAddRow(keyData.key, keyData.guest, keyData.room, startD, endD)
          //keyListUI.append($a);
      });
      //progress2.style.display = 'none';
  });

  function keyClicked(e) {
      var userID = e.target.getAttribute("child-key");

      e.target.parentElement.querySelectorAll(".is-active").forEach(e =>
          e.classList.remove("is-active"));
      e.target.classList.add("is-active");

      console.log(userID);
      const userRef = db.collection("secureKeys/core1/keys").doc(userID);
      const userDetailUI = document.getElementById("keyDetail");
      userDetailUI.innerHTML = ""
      userRef.get().then(function(doc) {
          var $p = document.createElement("p");
          var innerPHtml = '';
          const keyDetails = doc.data();
          for (const key in keyDetails) {
              const value = keyDetails[key];
              if (key == "startDate" || key == "endDate") {
                  innerPHtml = innerPHtml + "<li>" + key + ": " + keyDetails[key].toDate() + "</li>";
              } else {
                  innerPHtml = innerPHtml + "<li>" + key + ": " + keyDetails[key] + "</li>";
              }
              // now key and value are the property name and value
          }
          $p.innerHTML = innerPHtml;
          userDetailUI.append($p);
      });
  }