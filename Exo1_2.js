var svg = d3.select("svg");
var margin = 200;
var w = svg.attr("width") - margin;
var h = svg.attr("height") - margin;

var xScale = d3.scale.ordinal().rangeRoundBands([0, w], 0.4);
var yScale = d3.scale.linear().range([h, 0]);

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("assets/data/data.csv", (error, data) => {
    if (error) {
        console.error(error)
    } else {
        dataViz(data)
    }
});

function dataViz(incomingData) {
    xScale.domain(incomingData.map(function (d) {
        return d.group;
    }));
    incomingData.forEach(function (d) {
        d.var2 = +d.var2;
    });
    yScale.domain([0, d3.max(incomingData, function (d) {
        return d.var2;
    })]);

    g.append("g").attr("transform", "translate(0," + h + ")").attr("class", "x axis")
        .call(d3.svg.axis().scale(xScale).orient("bottom"))
    g.append("g").attr("class", "x axis")
        .call(d3.svg.axis().scale(yScale).orient("left").tickFormat(function (d) {
            return d;
        }).ticks(20));
    g.selectAll(".bar")
        .data(incomingData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return xScale(d.group);
        })
        .attr("y", function (d) {
            return yScale(d.var2);
        })
        .attr("width", xScale.rangeBand())
        .attr("height", function (d) {
            return h - yScale(d.var2);
        });
}

/*d3.csv("assets/data/data.csv").then(function(data){
    xScale.domain(data.map(function(d){ return d.group }));
    yScale.domain([0,d3.max(data,function(d){return d.var2;})]);

    g.append("g").attr("transform","translate(0,"+h+"0)")
            .call(d3.axisBottom(xScale))
    g.append("g").call(d3.axisLeft(yScale).tickFormat(function(d){
        return d;
    }).ticks(10));
    g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class","bar")
            .attr("x",function(d){return xScale(d.group);})
            .attr("y",function(d){return yScale(d.var2);})
            .attr("width",xScale.bandwidth())
            .attr("height",function(d){return h - yScale(d.var2);});
});*/