'use strict';

(function() {

	var app = angular.module('app', []);

	app.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function (event) {
				if(event.which === 13) {
					scope.$apply(function () {
						scope.$eval(attrs.ngEnter);
					});
					event.preventDefault();
				}
			});
		};
	});

	app.controller('MainController', function($scope, $http) {

		$scope.ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		$scope.currentState = {
			currentIndex: 0,
			photoQueue: []
		};
		$scope.currentPhoto = '';

		// $scope.visible = false; 
		$scope.key = function($event) {
	    	alert($event.keyCode);
	    // if ($event.keyCode == 38)
	    //     alert("up arrow");
	    // else if ($event.keyCode == 39)
	    //     alert("right arrow");
	    // else if ($event.keyCode == 40)
	    //     alert("down arrow");
	    // else if ($event.keyCode == 37)
	    //     alert("left arrow");	
		}

		function update() {
			setCookie('currentState', JSON.stringify($scope.currentState), 30);
		}	

		function getCookie(cname) {
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for (var i = 0; i < ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0) == ' ') c = c.substring(1);
		        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		    }
		    return "";
		}

		function setCookie(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+d.toUTCString();
		    document.cookie = cname + "=" + cvalue + "; " + expires;
		}

		function checkCookie() {
		    var currentState = getCookie("currentState");
		    if (currentState != "") { // already have a cookie
		        $scope.currentState = JSON.parse(currentState);
		        $scope.currentPhoto = $scope.currentState.photoQueue[$scope.currentState.currentIndex];
		    } else { // first time user
		    	$http.get('/getphotos')
    			.success(function(res) {
    				$scope.currentState.photoQueue = res;
    				$scope.currentPhoto = $scope.currentState.photoQueue[0];
    				update();
    			});
		    	update();
		    }
		}

		checkCookie();
	

		// $scope.currentState[currentPhoto] = $scope.currentState.photoQueue[$scope.currentState.currentIndex];

		

		$scope.ratePhoto = function(rating, photoID) {
			alert(rating);
			if (++$scope.currentState.currentIndex === $scope.currentState.photoQueue.length) finish();
			else {
				$scope.currentPhoto = $scope.currentState.photoQueue[$scope.currentState.currentIndex];
				update();
			}
		}

		function finish() {
			alert('finished!');
		}


		// interface with MONGO
		
	});

// document.cookie = 'currentState=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'


})();
