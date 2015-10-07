$(document).ready(function () {

var makes;
var models;
var years;
var styles;
var styleId;
var make_niceName;
var modle_niceName;
var year_niceName;
$('.model').hide();
$('.year').hide();

// Get a value for the first drop down

loadMake();
	
	$('.make').on("change", function(){
		$('.model-option').remove();
		if ($(this).find("option:selected").index() == 0){
			$('.model').hide();
		}else {
			var makeIndex = $(this).find("option:selected").index()-1;
			loadModels(makes[makeIndex]);
			make_niceName = makes[makeIndex].niceName;
			console.log(make_niceName);
			$('.model').show();	
		}
	});
// Hide second dropdown until first drop down selection made

function loadModels(makes) {
	console.log(makes);
	var option = '';
	if (makes.models.length>0) {
		models = makes.models;
		$.each(models, function (index, value) {
			option += '<option class="model-option" value="' + index + '">' + value.name + '</option>';
		});
		$('.model').append(option);
	}
}

function loadYears(model) {
	var option = '';
	if (model.years.length>0) {
		years = model.years;
		$.each(years, function (index, value) {
			option += '<option class="model-year" value="' + value.id + '">' + value.year + '</option>';
		});
		$('.year').append(option);
	}
}

// changes model

$('.model').on("change", function() {
	$('.model-year').remove();
	var modelIndex = $(this).find("option:selected").index()-1;
	loadYears(models[modelIndex]);
	model_niceName = models[modelIndex].niceName;
	$('.year').show();
	console.log(model_niceName);
});

// change year

$('.year').on("change", function() {
	$('.model-style').remove();
	var yearIndex = $(this).find("option:selected").index()-1;
	year_niceName = years[yearIndex].year;
	console.log(year_niceName);
	loadStyles();
});

// change style

$('.styles').on("change", function () {
	var styleIndex = $(this).find("option:selected").index()-1;
	styleId = styles[styleIndex].make.id;
	console.log(styleId);
	loadDetails();
});

// Run AJAX car information

function loadDetails() {
	var url = "https://api.edmunds.com/api/vehicle/v2/engines/" + styleId + "?fmt=json&api_key=chw6q5hh9fpbd36wjk9qk3cy";

	$.ajax({
		url: url
	}).done(function (results) {
		console.log(results);
	});
}

// Run AJAX for style

function loadStyles () {
	
	var url = "https://api.edmunds.com/api/vehicle/v2/" + make_niceName + "/" +model_niceName + "/" + year_niceName + "/styles?fmt=json&api_key=chw6q5hh9fpbd36wjk9qk3cy";

	$.ajax({
		url: url
	}).done(function (results) {
		console.log(results);
		var option ='';
		if(results.styles.length>0) {
			styles = results.styles;
			$.each(styles, function (index, value) {
				option += '<option class="model-style" value="' + index + '">' + value.name + '</option>';
			});
		}
		$('.styles').append(option);
	});
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