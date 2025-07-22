// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

gap = 50

// append the svg object to the body of the page
var main_svg = d3.select("body")
  .append("svg")
	.attr("id", "mainsvg")
    .attr("width", 2*(width + margin.left + margin.right) + gap) 
    .attr("height", height + margin.top + margin.bottom)



// append the svg object to the body of the page
var svg = d3.select("svg#mainsvg")
  .append("svg")
	.attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
 // .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// append the svg object to the body of the page
var svg2 = d3.select("svg#mainsvg")
  .append("svg")
	.attr("id", "svg2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
//  .append("g")
    .attr("transform",
          "translate(" + (margin.left + width + gap) + "," + margin.top + ")");

  // When reading the csv, I must format variables:
  function parse(data) {
    return { date : d3.timeParse("%Y-%m-%d")(data.date), value : data.value }
  }

  // Now I can use this dataset:
  function make_chart(data) {
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
	};

d3.request("http://127.0.0.1:8000/exp/")
.response(function(request) { return JSON.parse(request.responseText); })
.get(function(error, data) {
	if(error) {
		console.error("Error fetching data:", error);
	} else {
		formatted_data = []
		data.forEach(data_point =>
		{
			date = d3.timeParse("%Y-%m-%d")(data_point.date);
			value = data_point.value;
			formatted_data.push({"date": date, "value": value});	
		})
	}	
	make_chart(formatted_data);

});


  // When reading the csv, I must format variables:
  function parse(data) {
    return { date : d3.timeParse("%Y-%m-%d")(data.date), value : data.value }
  }

  // Now I can use this dataset:
  function make_chart2(data) {
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg2.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg2.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        //.x(function(d) {  return d.date })
        .y(function(d) { return y(d.value) })
        )
	};

d3.request("http://127.0.0.1:8000/hyp/")
.response(function(request) { return JSON.parse(request.responseText); })
.get(function(error, data) {
	if(error) {
		console.error("Error fetching data:", error);
	} else {
		formatted_data = []
		data.forEach(data_point =>
		{
			date = d3.timeParse("%Y-%m-%d")(data_point.date);
			value = data_point.value;
			formatted_data.push({"date": date, "value": value});	
		})
	}	
	make_chart2(formatted_data);

});
