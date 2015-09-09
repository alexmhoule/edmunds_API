$(document).ready(function () {

// Get a value for the first drop down

// Hide second dropdown until first drop down selection made

// Run AJAX

function loadAjax() {
	var data = {
		part: 'snippet',
		key: 'chw6q5hh9fpbd36wjk9qk3cy'
	};

	$.ajax({
		url: "",
		data: data
	}).done(function (results) {
		console.log(results);
	}).error(function (error) {
		console.log(error);
	});
}

});