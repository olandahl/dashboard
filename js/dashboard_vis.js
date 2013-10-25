var Vis = function(id) {

	var self = this,
		_height,
		_name = id, 
		_unit,
		_multiplier = 1,
		_icon,
		_dataRange,
		xScale,
		yScale,
		colorScale,
		data,
		margin = 40,
		valueWidth = 220;

	// Help functions
	var width = function(d) {return '1px'},
		height = function(d) {return yScale(d)+'px'},
		x = function(d,i) {return i+'px'},
		y = function(d) {return (_height-yScale(d))+'px'},
		color = function(d) {return colorScale(d)},
		text = function(d) {return (_multiplier*d).toFixed(1) + (_unit ? ' '+_unit : '')};

	var svg = d3.select('#'+id)
		.attr('class', 'vis')
		.attr('width', '100%')
		.append('svg');

	var iconGroup = svg.append('g')
		.attr('class', 'icon');

	var visGroup = svg.append('g');

	var valueGroup = visGroup.append('g')
		.attr('class', 'value');

	var barsGroup = visGroup.append('g')
		.attr('class', 'bars')
		.attr('transform', 'translate('+valueWidth+',0)');

	this.render = function() {

		var image = iconGroup.select('image');
		if (image.empty()) {
			iconGroup.append('image')
				.attr('width', _height)
				.attr('height', _height)
				.attr('xlink:href', _icon);
		}


		// Set latest data for value display
		var lastValue = [data[data.length-1]],
			value = valueGroup.selectAll('text')
				.data(lastValue);

		// Render new value
		var fontSize = 0.8*_height;
		value.enter()
			.append('text')
			.style('font-size', fontSize+'px')
			.style('line-height', fontSize+'px')
			.attr('fill', color)
			.attr('y', ((_height + fontSize) / 2) +'px')
			.text(text);

		// Render existing value
		value.attr('fill', color)
			.text(text);


		// Set latest data for bars
		var bars = barsGroup.selectAll('rect')
			.data(data);

		// Render new bars
		bars.enter()
			.append('rect')
			.attr('fill', color)
			// .attr('fill', '#ccc')
			// .attr('fill-temp', color)
			.attr('x', x)
			.attr('y', y)
			.attr('width', width)
			.attr('height', height);

		// Render existing bars
		bars.attr('y', y)
			.attr('fill', color)
			// .attr('fill-temp', color)
			.attr('height', height);

		return self;
	};

	// TODO Add argument validation
	this.height = function(h) {
		_height = h;
		svg.attr('height', h+'px');
		visGroup.attr('transform', 'translate('+(_height + margin)+',0)');
		self.pixelRange();
		return self;
	};

	this.name = function(d) { 
		_name = d;
		return self;
	};

	this.unit = function(u) { 
		_unit = u;
		return self;
	};

	this.multiplier = function(m) { 
		_multiplier = m || 1;
		return self;
	};

	this.icon = function(i) { 
		_icon = i;
		return self;
	};

	this.dataRange = function(d) {
		_dataRange = d;
		self.pixelRange();
		return self;
	};

	this.pixelRange = function() { 
		if (!_dataRange) { console.log.error('Set data range before pixel range.') }
		// xScale = d3.scale.linear()
		// 	.domain(_dataRange)
		// 	.range([0, _width]);
		yScale = d3.scale.linear()
			.domain(_dataRange)
			.range([0, _height]);

		return self;
	};

	this.colorRange = function(range) { 
		if (!_dataRange) { console.log.error('Set data range before pixel range.') }
		colorScale = d3.scale.linear()
			.domain(_dataRange)
			.range(range);
		return self;
	};

	this.data = function(d) {
		data = d;

		// TODO
		var min = d3.min(data),
			max = d3.max(data);
		if (max-min < 2) {
			min--;
			max++;
		}
		yScale.domain([min, max]);
		return self;
	};

	this.addData = function(d) {
		data.splice(0, 1, d);
		return self;
	};
};