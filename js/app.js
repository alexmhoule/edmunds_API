$(document).ready(function () {

// Get a value for the first drop down

loadAjax();
// Hide second dropdown until first drop down selection made

// Run AJAX

function loadAjax() {
	var data = {
		part: 'snippet',
		key: 'chw6q5hh9fpbd36wjk9qk3cy'
	};

	$.ajax({
		url: "https://api.edmunds.com/api/vehicle/v2/makes?&view=basic&fmt=json&api_key=chw6q5hh9fpbd36wjk9qk3cy",
		data: data
	}).done(function (results) {
		console.log(results);
	}).error(function (error) {
		console.log(error);
	});
}

});