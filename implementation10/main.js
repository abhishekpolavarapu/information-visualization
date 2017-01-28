var fullwidth = 900;
var fullheight = 600;
         
var margin = { top: 20, right: 100, bottom: 40, left: 100};

var width = fullwidth - margin.right - margin.left;
var height = fullheight - margin.top - margin.bottom;


var xScale = d3.scale.linear()
    .range([ 0, width]);
	
var buttons = d3.selectAll("button")
                .classed("button", true);

var yScale = d3.scale.linear()
    .range([0, height]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
	.innerTickSize([0])
    .outerTickSize([0]);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .outerTickSize([0]);

var line = d3.svg.line()
    .x(function(d) {return xScale(+d.PassingTD);
				})
    .y(function(d) {return yScale(+d.RushingTD);
				});

var svg = d3.select("#svg")
    .append("svg")
    .attr("width", fullwidth)
    .attr("height", fullheight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body")
                            .append("div")
                            .attr("class", "mytooltip");

queue()
    .defer(d3.csv,"stats.csv")
    .await(Linechart);

function Linechart(error, stats){
 if(error) { console.log(error); }
    
    console.log(stats);
 
    d3.select("#stats").on("click", function(d, i) {
            d3.selectAll("button").classed("selected", false);
            d3.select(this).classed("selected", true);
            redraw(stats,20);
    });
        
    
    
    d3.select("#stats").classed("selected", true);
    
    yScale.domain([d3.max(stats, function(d) {
                    return +d.RushingTD;
                }),
               0]);
	xScale.domain([d3.max(stats, function(d) {
                    return +d.PassingTD;
                }),
               0]);

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis); 

    redraw(stats, 20);
} 
   
function redraw(data, cutoff) {
yScale.domain([d3.max(data, function(d) {
            return +d.RushingTD;
    		}), 0]);
xScale.domain([d3.max(data, function(d) {
            return +d.PassingTD;
    		}), 0]);

var dataset =  d3.nest().key(function(d) {return d.Conf;
    						})
        .entries(data);

    console.log("nested data", dataset);
    
var groups = svg.selectAll("g.lines")
					.data(dataset, function(d){return d.key;});
    
groups
        .enter()
        .append("g")
        .attr("class", "lines")
           
groups.exit()
    .remove();


    
var lines = groups.selectAll("path.line")
    					.data(function(d) {return [d.values]; 
    					});

lines.enter()
         .append("path")
         .attr("d", line)
         .attr("class", "line")
         .classed("unfocused", true);

lines.exit()
        .transition()
        .duration(1000)
        .remove();

lines
        .transition()
        .duration(1000)
        .attr("d",line); 
        
var circles = groups.selectAll("circle")
        .data(function(d) {
            return d.values;
        });

circles.enter()
            .append("circle")
            .attr("r", 2)
            .classed("circle", true)
            .style("opacity", 0);

circles.exit()
           .remove();
    
circles.transition()
        .attr("cx",function(d){return xScale(+d.PassingTD);})
        .attr("cy", function(d) {return yScale(+d.RushingTD);});

    circles.on("mouseover", mouseoverFunc)
           .on("mousemove", mousemoveFunc)
           .on("mouseout", mouseoutFunc);
    
   

var labels = groups.selectAll("text.label")
   .data(function(d){
       return [d.values];});

labels.enter()
    .append("text")
    .classed("label", true)
    .text(function(d) {
        return d[d.length-1].Conf;
});

labels.exit()
    .remove();

labels.transition()
    .duration(2000)
    .attr("y",function(d){
        var lastNumber = d[d.length - 1].RushingTD;
        return yScale(+lastNumber);})
    .attr("x", function(d){
        var lastYear = d[d.length - 1].PassingTD;
        return xScale(+lastYear);})
    .attr("dx", ".35em")
    .attr("dy", ".35em");

    
labels.classed("textshow", function(d,i){
    if (d && +d[d.length - 1].RushingTD > cutoff) {
return true;
}
    else {return false; };
});
    

labels.classed("texthide", function(d, i) {
    if (d && +d[d.length - 1].RushingTD < cutoff) {
return true;
}
    else {return false; };
}); 


groups
.on("mouseover", TIn)
.on("mouseout", TOut);
    
d3.select(".y.axis").transition().call(yAxis);
}


function mouseoverFunc(d){
    d3.select(this)
        .transition()
        .style("opacity", 1)
        .attr("r", 4);

    tooltip
        .style("display", null)
        .html("<p>Name: <span style='color:#b35900'>" + d.Player +"</span>" + "<br>Passing TD: <span style='color:#b35900'>" + d.PassingTD +"</span>" + "<br>RushingTD:<span style='color:#b35900'> " +d.RushingTD + "</span>" + "</p>");
}

function mousemoveFunc(d) {
    console.log(d3.event.pageX, d3.event.pageY);
    tooltip
        .style("top", (d3.event.pageY - 5) + "px" )
        .style("left", (d3.event.pageX + 5) + "px");
}

function mouseoutFunc(d) {
      d3.select(this)
        .transition()
        .style("opacity", 0)
        .attr("r", 2);
      tooltip.style("display", "none");}
    
function TIn(d) {
d3.select(this).select("path")
    .classed("unfocused", false)
    .classed("focused", true);
d3.select(this).select("text.label")
    .attr("id", "highlight");
    
}
    
function TOut(d) {
d3.select(this).select("path")
    .classed("unfocused", true)
    .classed("focused", false);
d3.select(this).select("text.label")
    .attr("id",null);
}