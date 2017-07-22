var app = angular.module("fireBaseApp", ['ngFileUpload']);

app.controller("userinfo", function ($scope) {
    $scope.user = {};
    $scope.showErrors = false;

    function validate(form) {

        if (form.$invalid) {
            console.log("Errors!");
            $scope.showErrors = true;
            return false;
        } else {
            return true;
        }

    }


    $scope.submit = function (form) {
        var currentUserEmailID = firebase.auth().currentUser.email;
        if (!validate(form)) {
            return;
        }

        //Database reference
        var userFormDbRef = firebase.database().ref().child('userFormData');

        //Get the image URL for storing in DB
        profilePhotoDownloadURL = 'gs://web-quickstart-8445c.appspot.com/formImages/' + $scope.user.uid + '/' + $scope.user.profilePhoto.name;
        //Get the image URL for storing in DB
        panCardPhotoDownloadURL = 'gs://web-quickstart-8445c.appspot.com/formImages/' + $scope.user.uid + '/' + $scope.user.panCardPhoto.name;

        //Form submission date and time
        var formSubmitDate = Date().toString();

        //Browser details
        var browserDetails = "Browser: " + navigator.appCodeName + " , Version: " + navigator.userAgent;


        //push data in firebase userFormData 
        userFormDbRef.push().set({
            EmailId: currentUserEmailID,
            firstName: $scope.user.first_name,
            middleName: $scope.user.middle_name,
            lastName: $scope.user.last_name,
            gender: $scope.user.gender_optradio,
            maritalStatus: $scope.user.marital_optradio,
            panCard: $scope.user.pan_card,
            uid: $scope.user.uid,
            dateOfBirth: $scope.user.dob,
            profilePhotoDownloadURL: profilePhotoDownloadURL,
            panCardPhotoDownloadURL: panCardPhotoDownloadURL,
            residence: $scope.user.dropdownForResidence,
            relationToApplicant: $scope.user.dropdownForRelation,
            formSubmissionDate: formSubmitDate,
            browserDetails: browserDetails

        });


        //Create a storage ref
        var storageRef = firebase.storage().ref('formImages/' + $scope.user.uid + '/' + $scope.user.profilePhoto.name);
        //Upload file
        var task = storageRef.put($scope.user.profilePhoto);
        //Create a storage ref
        var storageRef = firebase.storage().ref('formImages/' + $scope.user.uid + '/' + $scope.user.panCardPhoto.name);
        //Upload file
        var task = storageRef.put($scope.user.panCardPhoto);

        alert("Sign up successful!");

    };







});



//Add a realtime listener for authentication
firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
//                var currentUserEmailID = firebase.auth().currentUser.email;
        //        alert(currentUserEmailID);
        //window.location = 'userindex.html';
        //       console.log(firebaseUser);
        //       logoutButton.classList.remove('hide');
    } else {
        window.location = 'login.html';
        console.log('not logged in sorry');
    }
});


// on sign out button click
var signOutButton = document.getElementById('signOutButton');
signOutButton.addEventListener('click', function () {
    firebase.auth().signOut();
});
