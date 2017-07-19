var app = angular.module("fireBaseApp", []);
app.controller("loginCtrl", function($scope) {
   $scope.login = function(){
        console.log("Into the Login");
        const auth = firebase.auth();
        var promise = auth.signInWithEmailAndPassword($scope.userName, $scope.userPassword);
        promise.catch(e => console.log(e.message));
            
   }
   
   firebase.auth().onAuthStateChanged(function(firebaseUser){
   if(firebaseUser) {
       window.location = 'userindex.html';
//       console.log(firebaseUser);
//       logoutButton.classList.remove('hide');
   }else {
       console.log('not logged in sorry');
   }
});
});

app.controller("registerCtrl",function($scope){
 $scope.signUp = function(){
        console.log("Into the Register");
        const auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword($scope.userName, $scope.userPassword);
    promise.catch(e => console.log(e.message));
            
   }
firebase.auth().onAuthStateChanged(function(firebaseUser){
   if(firebaseUser) {
       window.location = 'userindex.html';
//       console.log(firebaseUser);
//       logoutButton.classList.remove('hide');
   }else {
       console.log('not logged in sorry');
   }
});

});