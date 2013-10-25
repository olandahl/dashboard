var Dashboard = function(id, name) {

	var self = this,
		container = document.getElementById(id),
		data,
		visualisations = {};

	var titleDiv = document.createElement('div');
	titleDiv.className = 'title';
	container.appendChild(titleDiv);

	var title = document.createTextNode(name);
	titleDiv.appendChild(title);

	var dateDiv = document.createElement('div');
	dateDiv.className = 'date';
	container.appendChild(dateDiv);

	this.render = function() {
		var dateFloat = parseFloat(data.dates[data.dates.length-1]); // TODO
		dateDiv.innerHTML = moment(dateFloat*1000).format("dddd h:mm:ss A (D/MM/YYYY)");

		var id;
		for (id in visualisations) {
			var vis = visualisations[id],
				visData = data[id];
			vis.data(visData)
				.render();
		}
		return self;
	};

	this.data = function(d) {
		data = d;
		return self;
	};

	this.visualisation = function(visId, options) {
		var vis = document.createElement('div');
		vis.id = visId;
		vis.title = options.name || visId;
		container.appendChild(vis);
		visualisations[visId] = new Vis(visId)
			.name(options.name)
			.dataRange(options.dataRange)
			.colorRange(options.colorRange)
			.height(options.height)
			.unit(options.unit)
			.multiplier(options.multiplier)
			.icon(options.icon)
		return self;
	};
};