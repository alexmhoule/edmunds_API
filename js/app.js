$(document).ready(function () {


// GLOBAL VARIABLES

var makes;
var models;
var years;
var styles;
var style;
var make_niceName;
var modle_niceName;
var year_niceName;
var secondModels;
var secondYears;
var secondStyles;
var secondStyle;
var second_make_niceName;
var second_model_niceName;
var second_year_niceName;
$('.model').hide();
$('.year').hide();
$('.styles').hide();
$('.second-model').hide();
$('.second-year').hide();
$('.second-style').hide();
loadMake('first');
loadMake('second');


// FIRST VEHICLE

	// AJAX CALLS

		// MAKE

		function loadMake(modelInidcator) {
			var data = {
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
				if (modelInidcator == 'first'){
					$('.make').append(option);
					$('#loading-indicator').hide();
					$('.load-div').hide();
					$('.make').show();
				}else {
					$('.second-make').append(option);
					$('#loading-indicator').hide();
					$('.load-div').hide();
					$('.second-make').show();
				}
			}).error(function (error) {
				console.log(error);
			});
		}

		// MODEL

		function loadModels(makes, dropDownIndicator) {
			var option = '';
			if (makes.models.length>0) {
				if (dropDownIndicator == 'first'){
					models = makes.models;
					$.each(models, function (index, value) {
						option += '<option class="model-option" value="' + index + '">' + value.name + '</option>';
					});
					$('.model').append(option);
				}else{
					secondModels = makes.models;
					$.each(secondModels, function (index, value) {
						option += '<option class="model-option" value="' + index + '">' + value.name + '</option>';
					});
					$('.second-model').append(option);
				}
			}
		}

		// YEAR

		function loadYears(model, yearDropDown) {
			var option = '';
			if (model.years.length>0) {
				if (yearDropDown == 'first'){
					years = model.years;
					$.each(years, function (index, value) {
						option += '<option class="model-year" value="' + value.id + '">' + value.year + '</option>';
					});
					$('.year').append(option);
				}else{
					secondYears = model.years;
					$.each(secondYears, function (index, value) {
						option += '<option class="model-year" value="' + value.id + '">' + value.year + '</option>';
					});
					$('.second-year').append(option);
				}
			}
		}

		// STYLE

		function loadStyles (styleDropDown) {

		var url;
		
		if (styleDropDown == 'first'){
			url = "https://api.edmunds.com/api/vehicle/v2/" + make_niceName + "/" + model_niceName + "/" + year_niceName + "/styles?view=full&fmt=json&api_key=chw6q5hh9fpbd36wjk9qk3cy";
		}else{
			url = "https://api.edmunds.com/api/vehicle/v2/" + second_make_niceName + "/" + second_model_niceName + "/" + second_year_niceName + "/styles?view=full&fmt=json&api_key=chw6q5hh9fpbd36wjk9qk3cy";
		}

		console.log(url);

			$.ajax({
				url: url
			}).done(function (results) {
				var option ='';
				if(results.styles.length>0) {
					if (styleDropDown == 'first'){
						styles = results.styles;
						$.each(styles, function (index, value) {
							option += '<option class="model-style" value="' + index + '">' + value.name + '</option>';
						});
						$('.styles').append(option);
					}else{
						console.log(results);
						secondStyles = results.styles;
						$.each(secondStyles, function (index, value) {
						option += '<option class="second-model-style" value="' + index + '">' + value.name + '</option>';
						});
				}
					$('.second-style').append(option);
					}
				})
			};
		

		// VEHICLE INFORMATION

		function loadDetails(style) {

			var result = $('.templates .information').clone();
			var makeDisplay;
			var modelDisplay;
			var cityDisplay;
			var highwayDisplay;
			var compressionDisplay;
			var cylinderDisplay;
			var fuelDisplay;

				makeDisplay = result.find('.make');
				modelDisplay = result.find('.model');
				console.log(style);
				cityDisplay = result.find('.city');
				highwayDisplay = result.find('.highway');
				compressionDisplay = result.find('.compression');
				cylinderDisplay = result.find('.cylinder');
				fuelDisplay = result.find('.fuel');

			//Make display

			makeDisplay.text(style.make.name);

			//Model Display

			modelDisplay.text(style.model.name);

			//MPG Display

			if(typeof style.MPG === 'undefined'){
				cityDisplay.text("N / A");
			}else {
				if(typeof style.MPG.city === 'undefined') {
					cityDisplay.text('N / A');
				}else{
					cityDisplay.text(style.MPG.city);
				}
			}

			if(typeof style.MPG === 'undefined'){
				highwayDisplay.text("N / A");
			}else{
				if(typeof style.MPG.highway === 'undefined') {
					highwayDisplay.text('N / A');
				}else{
					highwayDisplay.text(style.MPG.highway);
				}
			}

			//Engine Information Display

			if(style.engine.compressionRatio == null){
				compressionDisplay.text("N / A");
			}else {
				compressionDisplay.text(style.engine.compressionRatio);
			}

			if(style.engine.cylinder == null){
				cylinderDisplay.text("N / A");
			}else {
				cylinderDisplay.text(style.engine.cylinder);
			}

			if(style.engine.fuelType == null){
				fuelDisplay.text("N / A");
			}else{
				fuelDisplay.text(style.engine.fuelType);
			}

			$('.tempContainer').append(result);
		}


	// KEEPING TRACK OF USER CHANGES

		// MAKE

		$('.make').on("change", function(){
			$('.model-option').remove();
			$('.model-year').remove();
			$('.year').hide();
			$('.model-style').remove();
			$('.styles').hide();
			$('.tempContainer .information').remove();
			if ($(this).find("option:selected").index() == 0){
				$('.model').hide();
			}else {
				var makeIndex = $(this).find("option:selected").index()-1;
				loadModels(makes[makeIndex], 'first');
				make_niceName = makes[makeIndex].niceName;
				$('.model').show();	
			}
		});

		// MODEL

		$('.model').on("change", function() {
			$('.model-year').remove();
			$('.model-style').remove();
			$('.styles').hide();
			$('.tempContainer .information').remove();
			var modelIndex = $(this).find("option:selected").index()-1;
			loadYears(models[modelIndex], 'first');
			model_niceName = models[modelIndex].niceName;
			$('.year').show();
		});

		// YEAR

		$('.year').on("change", function() {
			$('.model-style').remove();
			$('.tempContainer .information').remove();
			var yearIndex = $(this).find("option:selected").index()-1;
			year_niceName = years[yearIndex].year;
			loadStyles('first');
			$('.styles').show();
		});

		// STYLE

		$('.styles').on("change", function () {
			var styleIndex = $(this).find("option:selected").index()-1;
			style = styles[styleIndex], 'first';
			loadDetails(style);
		});



// SECOND VEHICLE

		$('.second-make').on("change", function(){
			$('.second-model-option').remove();
			$('.second-model-year').remove();
			$('.second-year').hide();
			$('.second-model-style').remove();
			$('.second-style').hide();
			$('.second-tempContainer .second-information').remove();
			if ($(this).find("option:selected").index() == 0){
				$('.second-model').hide();
			}else {
				var makeIndex = $(this).find("option:selected").index()-1;
				loadModels(makes[makeIndex], 'second');
				second_make_niceName = makes[makeIndex].niceName;
				$('.second-model').show();	
			}
		});

		// MODEL

		$('.second-model').on("change", function() {
			$('.second-model-year').remove();
			$('.second-model-style').remove();
			$('.second-style').hide();
			$('.second-tempContainer .second-information').remove();
			var modelIndex = $(this).find("option:selected").index()-1;
			loadYears(secondModels[modelIndex], 'second');
			second_model_niceName = secondModels[modelIndex].niceName;
			$('.second-year').show();
		});

		// YEAR

		$('.second-year').on("change", function() {
			$('.second-model-style').remove();
			$('.second-tempContainer .second-information').remove();
			var yearIndex = $(this).find("option:selected").index()-1;
			second_year_niceName = secondYears[yearIndex].year;
			loadStyles('second');
			$('.second-style').show();
		});

		// STYLE

		$('.second-style').on("change", function () {
			var styleIndex = $(this).find("option:selected").index()-1;
			secondStyle = secondStyles[styleIndex], 'second';
			loadDetails(secondStyle);
		});

});