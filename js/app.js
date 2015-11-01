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
$('select.model').hide();
$('select.year').hide();
$('select.styles').hide();
$('select.second-model').hide();
$('select.second-year').hide();
$('select.second-style').hide();
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
					$('select.make').append(option);
					$('#loading-indicator').hide();
					$('.load-div').hide();
					$('.make').show();
				}else {
					$('select.second-make').append(option);
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
					$('select.model').append(option);
				}else{
					secondModels = makes.models;
					$.each(secondModels, function (index, value) {
						option += '<option class="model-option" value="' + index + '">' + value.name + '</option>';
					});
					$('select.second-model').append(option);
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
					$('select.year').append(option);
				}else{
					secondYears = model.years;
					$.each(secondYears, function (index, value) {
						option += '<option class="model-year" value="' + value.id + '">' + value.year + '</option>';
					});
					$('select.second-year').append(option);
				}
			}
		}

		// STYLE

		function loadStyles (styleDropDown) {
			console.log(styleDropDown);
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
				console.log(results);
				var option ='';
				if(results.styles.length>0) {
					$.each(results.styles, function (index, value) {
						option += '<option class="model-style" value="' + index + '">' + value.name + '</option>';
					});
					console.log(option);
					if (styleDropDown == 'first') {
						styles = results.styles;
						$('.styles').append(option);
					}else{
						secondStyles = results.styles;
						$('.second-style').append(option);
					}
				}
			});
		}	
		

		// VEHICLE INFORMATION

		function loadDetails(style, resultIdentifier) {

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

			result.addClass(resultIdentifier);

			if(resultIdentifier == 'first') {
				$('.tempContainer').append(result);
			}else{
				$('.second-tempContainer').append(result);
			}
		
		}


	// KEEPING TRACK OF USER CHANGES

		// MAKE

		$('.make').on("change", function(){
			$('select.model .model-option').remove();
			$('select.year .model-year').remove();
			$('.year').hide();
			$('select.style .model-style').remove();
			$('.styles').hide();
			$('.tempContainer .first').remove();
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
			$('select.year .model-year').remove();
			$('select.style .model-style').remove();
			$('.styles').hide();
			$('.tempContainer .first').remove();
			var modelIndex = $(this).find("option:selected").index()-1;
			loadYears(models[modelIndex], 'first');
			model_niceName = models[modelIndex].niceName;
			$('.year').show();
		});

		// YEAR

		$('.year').on("change", function() {
			$('select.style .model-style').remove();
			$('.tempContainer .first').remove();
			var yearIndex = $(this).find("option:selected").index()-1;
			year_niceName = years[yearIndex].year;
			loadStyles('first');
			$('.styles').show();
		});

		// STYLE

		$('.styles').on("change", function () {
			var styleIndex = $(this).find("option:selected").index()-1;
			style = styles[styleIndex], 'first';
			console.log(styles[styleIndex]);
			loadDetails(style, 'first');
		});



// SECOND VEHICLE

		$('.second-make').on("change", function(){
			$('select.second-model .model-option').remove();
			$('select.second-year .model-year').remove();
			$('.second-year').hide();
			$('select.second-style .model-style').remove();
			$('.second-style').hide();
			$('.second-tempContainer .second').remove();
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
			$('select.second-year .model-year').remove();
			$('select.second-style .model-style').remove();
			$('.second-style').hide();
			$('.second-tempContainer .second').remove();
			var modelIndex = $(this).find("option:selected").index()-1;
			loadYears(secondModels[modelIndex], 'second');
			second_model_niceName = secondModels[modelIndex].niceName;
			$('.second-year').show();
		});

		// YEAR

		$('.second-year').on("change", function() {
			$('select.second-style .model-style').remove();
			$('.second-tempContainer .second').remove();
			var yearIndex = $(this).find("option:selected").index()-1;
			second_year_niceName = secondYears[yearIndex].year;
			loadStyles('second');
			$('.second-style').show();
		});

		// STYLE

		$('.second-style').on("change", function () {
			var styleIndex = $(this).find("option:selected").index()-1;
			secondStyle = secondStyles[styleIndex], 'second';
			loadDetails(secondStyle, 'second');
		});

});