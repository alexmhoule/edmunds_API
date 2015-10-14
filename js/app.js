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
$('.model').hide();
$('.year').hide();
$('.styles').hide();
$('.second-model').hide();
$('.second-year').hide();
$('.second-style').hide();
loadMake();
loadSecondMake();



// LOADING GIF TEST

 $(document).bind("ajaxSend", function(){
   $("#loading-indicator").show();
   $('.load-div').show();
 }).bind("ajaxComplete", function(){
   $("#loading-indicator").hide();
   $('.load-div').hide();
 });

// FIRST VEHICLE

	// AJAX CALLS

		// MAKE

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
			}).error(function (error) {
				console.log(error);
			});
		}

		// MODEL

		function loadModels(makes) {
			var option = '';
			if (makes.models.length>0) {
				models = makes.models;
				$.each(models, function (index, value) {
					option += '<option class="model-option" value="' + index + '">' + value.name + '</option>';
				});
				$('.model').append(option);
			}
		}

		// YEAR

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

		// STYLE

		function loadStyles () {
		
			var url = "https://api.edmunds.com/api/vehicle/v2/" + make_niceName + "/" +model_niceName + "/" + year_niceName + "/styles?view=full&fmt=json&api_key=chw6q5hh9fpbd36wjk9qk3cy";

			$.ajax({
				url: url
			}).done(function (results) {
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

		// VEHICLE INFORMATION

		function loadDetails(style) {

			var result = $('.templates .information').clone();

			//Make display

			var makeDisplay = result.find('.make');
			makeDisplay.text(style.make.name);

			//Model Display

			var modelDisplay = result.find('.model');
			modelDisplay.text(style.model.name);

			//MPG Display

			var cityDisplay = result.find('.city');
			cityDisplay.text(style.MPG.city);
			if(style.MPG.city == null){
				cityDisplay.text("N / A");
			};

			var highwayDisplay = result.find('.highway');
			highwayDisplay.text(style.MPG.highway);
			if(style.MPG.highway == null){
				highwayDisplay.text("N / A");
			};

			//Engine Information Display

			var compressionDisplay = result.find('.compression');
			compressionDisplay.text(style.engine.compressionRatio);
			if(style.engine.compressionRatio == null){
				compressionDisplay.text("N / A");
			};

			var cylinderDisplay = result.find('.cylinder');
			cylinderDisplay.text(style.engine.cylinder);
			if(style.engine.cylinder == null){
				cylinderDisplay.text("N / A");
			};

			var fuelDisplay = result.find('.fuel');
			fuelDisplay.text(style.engine.fuelType);
			if(style.engine.fuelType == null){
				fuelDisplay.text("N / A");
			};

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
				loadModels(makes[makeIndex]);
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
			loadYears(models[modelIndex]);
			model_niceName = models[modelIndex].niceName;
			$('.year').show();
		});

		// YEAR

		$('.year').on("change", function() {
			$('.model-style').remove();
			$('.tempContainer .information').remove();
			var yearIndex = $(this).find("option:selected").index()-1;
			year_niceName = years[yearIndex].year;
			loadStyles();
			$('.styles').show();
		});

		// STYLE

		$('.styles').on("change", function () {
			var styleIndex = $(this).find("option:selected").index()-1;
			style = styles[styleIndex];
			loadDetails(style);
		});



// SECOND VEHICLE


	// AJAX CALLS

		// MAKE

		function loadSecondMake() {
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
				$('.second-make').append(option);
			}).error(function (error) {
				console.log(error);
			});
		}


		// MODEL

		function loadSecondModels(makes) {
			var option = '';
			if (makes.models.length>0) {
				models = makes.models;
				$.each(models, function (index, value) {
					option += '<option class="second-model-option" value="' + index + '">' + value.name + '</option>';
				});
				$('.second-model').append(option);
			}
		}

		// YEAR

		function loadSecondYears(model) {
			var option = '';
			if (model.years.length>0) {
				years = model.years;
				$.each(years, function (index, value) {
					option += '<option class="second-model-year" value="' + value.id + '">' + value.year + '</option>';
				});
				$('.second-year').append(option);
			}
		}

		// STYLE

		function loadSecondStyles () {
		
			var url = "https://api.edmunds.com/api/vehicle/v2/" + make_niceName + "/" +model_niceName + "/" + year_niceName + "/styles?view=full&fmt=json&api_key=chw6q5hh9fpbd36wjk9qk3cy";

			$.ajax({
				url: url
			}).done(function (results) {
				var option ='';
				if(results.styles.length>0) {
					styles = results.styles;
					$.each(styles, function (index, value) {
						option += '<option class="second-model-style" value="' + index + '">' + value.name + '</option>';
					});
				}
				$('.second-style').append(option);
			});
		}

		// DETAILS

		function loadSecondDetails(style) {

			var result = $('.templates .second-information').clone();

			//Make display

			var makeDisplay = result.find('.second-make');
			makeDisplay.text(style.make.name);

			//Model Display

			var modelDisplay = result.find('.second-model');
			modelDisplay.text(style.model.name);

			//MPG Display

			var cityDisplay = result.find('.second-city');
			cityDisplay.text(style.MPG.city);
			if(style.MPG.city == null){
				cityDisplay.text("N / A");
			};

			var highwayDisplay = result.find('.second-highway');
			highwayDisplay.text(style.MPG.highway);
			if(style.MPG.highway == null){
				highwayDisplay.text("N / A");
			};

			//Engine Information Display

			var compressionDisplay = result.find('.second-compression');
			compressionDisplay.text(style.engine.compressionRatio);
			if(style.engine.compressionRatio == null){
				compressionDisplay.text("N / A");
			};

			var cylinderDisplay = result.find('.second-cylinder');
			cylinderDisplay.text(style.engine.cylinder);
			if(style.engine.cylinder == null){
				cylinderDisplay.text("N / A");
			};

			var fuelDisplay = result.find('.second-fuel');
			fuelDisplay.text(style.engine.fuelType);
			if(style.engine.fuelType == null){
				fuelDisplay.text("N / A");
			};

			$('.second-tempContainer').append(result);
		}


	// KEEPING TRACK OF USER CHOICE

		// MAKE

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
				loadSecondModels(makes[makeIndex]);
				make_niceName = makes[makeIndex].niceName;
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
			loadSecondYears(models[modelIndex]);
			model_niceName = models[modelIndex].niceName;
			$('.second-year').show();
		});

		// YEAR

		$('.second-year').on("change", function() {
			$('.second-model-style').remove();
			$('.second-tempContainer .second-information').remove();
			var yearIndex = $(this).find("option:selected").index()-1;
			year_niceName = years[yearIndex].year;
			loadSecondStyles();
			$('.second-style').show();
		});

		// STYLE

		$('.second-style').on("change", function () {
			var styleIndex = $(this).find("option:selected").index()-1;
			style = styles[styleIndex];
			loadSecondDetails(style);
		});

});