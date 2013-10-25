(function() {

	var unicode = {
		degree: '\u00B0'
	};

	var VIS_HEIGHT = 50;
	var VIS_LENGTH = 500;

	var allData = {}; 
	var dates = []; // TODO Remove

	// TODO Remove
	var someData = {
		"temperature": [],
		"pressure": [],
		"humidity": [],
		"light": [],
		"sound": [],
		"gas": [],
		"dates": []
	};

	var dashboard = new Dashboard('dashboard', 'Sydney');

	dashboard.visualisation("temperature", {
			height: VIS_HEIGHT, 
			name: "Temperature", 
			unit: unicode.degree+'C',
			icon: 'img/temperature.png',
			dataRange: [10, 40], 
			colorRange: ['#00f', '#f00']});

	dashboard.visualisation("pressure", {
			height: VIS_HEIGHT, 
			name: "Pressure", 
			unit: 'kPa',
			multiplier: 1/1000,
			icon: 'img/pressure.png',
			dataRange: [100000, 110000], 
			colorRange: ['#333', '#00f']});

	dashboard.visualisation("humidity", {
			height: VIS_HEIGHT, 
			name: "Humidity", 
			unit: '%', 
			icon: 'img/humidity.png',
			dataRange: [15, 30], 
			colorRange: ['#333', '#00f']});

	dashboard.visualisation("light", {
			height: VIS_HEIGHT, 
			name: "Light", 
			icon: 'img/light.png',
			dataRange: [100, 200], 
			colorRange: ['#cc0', '#aa5']});

	dashboard.visualisation("sound", {
			height: VIS_HEIGHT, 
			name: "Sound", 
			unit: 'dB', 
			icon: 'img/sound.png',
			dataRange: [0, 50], 
			colorRange: ['#aaa', '#000']});

	dashboard.visualisation("gas", {
			height: VIS_HEIGHT, 
			name: "Gas", 
			icon: 'img/gas.png',
			dataRange: [10, 40], 
			colorRange: ['#ccc', '#000']});


	function getData(name) {
		$.ajax({
			url: "data/"+name+".js",
			type: "GET",
			dataType: "json",
			async: false
		})
		.done(function(d) {
			var collectDates = dates.length === 0;
			allData[name] = [];
			for (var date in d.values) {
				allData[name].push(d.values[date]);
				if (collectDates) {
					dates.push(date);
				}
			}
		});
	}

	getData('temperature');
	getData('pressure');
	getData('humidity');
	getData('light');
	getData('sound');
	getData('gas');

	var i = 0;
	$(document).keyup(function(e) {
		// TODO Remove
		if (e.which === 70) { // f
			i+=10;
		}
	});

	// For testing
	setInterval(function() {
		i = i >= allData.temperature.length - VIS_LENGTH ? 0 : i + 1;
		someData.temperature = allData.temperature.slice(i, i + VIS_LENGTH);
		someData.pressure = allData.pressure.slice(i, i + VIS_LENGTH);
		someData.humidity = allData.humidity.slice(i, i + VIS_LENGTH);
		someData.light = allData.light.slice(i, i + VIS_LENGTH);
		someData.sound = allData.sound.slice(i, i + VIS_LENGTH);
		someData.gas = allData.gas.slice(i, i + VIS_LENGTH);
		someData.dates = dates.slice(i, i + VIS_LENGTH);
		dashboard.data(someData).render();
	}, 1000);

}());