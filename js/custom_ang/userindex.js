//Get all DOM elements
var userProfileName = document.getElementById('userProfileName');
var firstName = document.getElementById('firstName');
var middleName = document.getElementById('middleName');
var lastName = document.getElementById('lastName');
var panCard = document.getElementById('panCard');
var uid = document.getElementById('uid');
var datepickerDateOfBirth = document.getElementById('datepickerDateOfBirth');

//Profile Photo uploader and progress bar
var profilePhotoUploaderProgress = document.getElementById('profilePhotoUploaderProgress');
var profilePhoto = document.getElementById('profilePhoto');
//Pan Card Photo uploader and progress bar
var panCardPhotoUploaderProgress = document.getElementById('panCardPhotoUploaderProgress');
var panCardPhoto = document.getElementById('panCardPhoto');

var dropdownForResidence = document.getElementById('dropdownForResidence');
var dropdownForRelation = document.getElementById('dropdownForRelation');
var profilePhotoImage;
var profilePhotoDownloadURL;
var panCardPhotoImage;
var panCardPhotoDownloadURL;
var currentUserEmailID;

//Add a realtime listener for authentication
firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
        currentUserEmailID = firebase.auth().currentUser.email;
        userProfileName.innerText = "Hello " + currentUserEmailID;
        //        alert(currentUserEmailID);
        //window.location = 'userindex.html';
        //       console.log(firebaseUser);
        //       logoutButton.classList.remove('hide');
    } else {
        window.location = 'login.html';
        console.log('not logged in sorry');
    }
});


//Add a listener for profile photo file selection
profilePhoto.addEventListener('change', function (e) {
    //Get file of profile photo
    profilePhotoImage = e.target.files[0];
});

//Add a listener for pan card photo file selection
panCardPhoto.addEventListener('change', function (e) {
    //Get file
    panCardPhotoImage = e.target.files[0];
});


//on submit button click
submitData.addEventListener('click', function () {
    //Database reference
    var userFormDbRef = firebase.database().ref().child('userFormData');



    //Get values from form fields
    var firstNameValue = firstName.value;
    var middleNameValue = middleName.value;
    var lastNameValue = lastName.value;
    if (document.getElementById('maleRadio').checked) {
        var gender = document.getElementById('maleRadio').value;
    }
    if (document.getElementById('femaleRadio').checked) {
        var gender = document.getElementById('femaleRadio').value;
    }
    if (document.getElementById('marriedRadio').checked) {
        var maritalStatus = document.getElementById('marriedRadio').value;
    }
    if (document.getElementById('singleRadio').checked) {
        var maritalStatus = document.getElementById('singleRadio').value;
    }
    var panCardValue = panCard.value;
    var uidValue = uid.value;
    var datepickerDateOfBirthValue = datepickerDateOfBirth.value;
    //Get the image URL for storing in DB
    profilePhotoDownloadURL = 'gs://web-quickstart-8445c.appspot.com/formImages/' + uidValue + '/' + profilePhotoImage.name;
    //Get the image URL for storing in DB
    panCardPhotoDownloadURL = 'gs://web-quickstart-8445c.appspot.com/formImages/' + uidValue + '/' + panCardPhotoImage.name;

    var dropdownForResidenceValue = dropdownForResidence.value;
    var dropdownForRelationValue = dropdownForRelation.value;
    //Form submission date and time
    var formSubmitDate = Date().toString();

    //Browser details
    var browserDetails = "Browser: " + navigator.appCodeName + " , Version: " + navigator.userAgent;







    //push data in firebase userFormData 
    userFormDbRef.push().set({
        EmailId: currentUserEmailID,
        firstName: firstNameValue,
        middleName: middleNameValue,
        lastName: lastNameValue,
        gender: gender,
        maritalStatus: maritalStatus,
        panCard: panCardValue,
        uid: uidValue,
        dateOfBirth: datepickerDateOfBirthValue,
        profilePhotoDownloadURL: profilePhotoDownloadURL,
        panCardPhotoDownloadURL: panCardPhotoDownloadURL,
        residence: dropdownForResidenceValue,
        relationToApplicant: dropdownForRelationValue,
        formSubmissionDate: formSubmitDate,
        browserDetails: browserDetails
    });

    //-----------------------------------------------------------------------------------------
    //Uploading files on firebase storage
    //Create a storage ref
    var storageRef = firebase.storage().ref('formImages/' + uidValue + '/' + profilePhotoImage.name);

    //Upload file
    var task = storageRef.put(profilePhotoImage);

    //Update progress bar
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            profilePhotoUploaderProgress.value = percentage;
        },
        function error(err) {},
        function complete() {}
    );

    //Create a storage ref
    var storageRef = firebase.storage().ref('formImages/' + uidValue + '/' + panCardPhotoImage.name);

    //Upload file
    var task = storageRef.put(panCardPhotoImage);

    //Update progress bar
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            panCardPhotoUploaderProgress.value = percentage;
        },
        function error(err) {},
        function complete() {}
    );
    //-----------------------------------------------------------------------------------------
});

// on sign out button click
var signOutButton = document.getElementById('signOutButton');
signOutButton.addEventListener('click', function () {
    firebase.auth().signOut();
});
