$(document).ready(function(){
	$("#testAPI").on("click", function(){
		console.log("It's working!");
	});
	var test = $.ajax({
		type: "GET",
		url: "http://localhost:3000/api/test"
	});
	test.done(function(data){
		console.log(data);
	});

	test.fail(function(){
		console.log("Oh no, test failed in client/app.js!");
	});
});

(function() {
	var app = angular.module('workoutlog', [
		'ui.router'
		]);
	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/signin');
	}
	config.$inject = [ '$urlRouterProvider' ];
	app.config(config);
	app.constant('API_BASE', '//localhost:3000/api/');
})();