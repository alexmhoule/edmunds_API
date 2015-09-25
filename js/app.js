$(document).ready(function () {

var makes;
var models;
$('.model').hide();

// Get a value for the first drop down

loadMake();
	
	$('.make').on("change", function(){
		var makeIndex = $(this).find("option:selected").index();
		loadModels(makes[makeIndex]);
		$('.model').show();
	});
// Hide second dropdown until first drop down selection made

function loadModels(makes) {
	console.log(makes);
	//use line 34 thru 37
	var option = '';
	if (makes.models.length>0) {
		models = makes.models;
		$.each(models, function (index, value) {
			option += '<option value="' + index + '">' + value.name + '</option>';
		});
		$('.model').append(option);
	}
}

// Run AJAX (Make)

function loadMake() {
	var data = {
		part: 'snippet',
		maxResults: 61,
		key: 'chw6q5hh9fpbd36wjk9qk3cy'
	};

	$.ajax({
		url: "https://api.edmunds.com/api/vehicle/v2/makes?&view=basic&fmt=json&api_key=chw6q5hh9fpbd36wjk9qk3cy",
		data: data
	}).done(function (results) {
		var option = '';
		if(results.makes.length>0) {
			makes = results.makes;
			$.each(makes, function (index, value) {
					option += '<option value="' + index + '">' + value.name + '</option>';
					//option += '<option value="' + results.makes[index].name + '">' + results.makes[index].name + '</option>';
				});	 

		}
		$('.make').append(option);
		console.log(results);
	}).error(function (error) {
		console.log(error);
	});
}

});