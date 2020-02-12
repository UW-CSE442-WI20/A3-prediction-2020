const d3 = require('d3');
const topo = require('topojson');

var svg = d3.select("#map").append("svg").attr("width", 960).attr("height",600);
 
//projection
var projection = d3.geoAlbersUsa();
var pathGenerator = d3.geoPath().projection(projection);

// load the csv file
const csvFile = require('./us_counties2016.csv');
d3.csv(csvFile).then(function(data) {
    var winner = [];
    for (var i = 0; i < data.length; i++) {
        winner.push({id:parseInt(data[i].Fips),name:data[i].Winner.split(" ")[0]});
        
    }

d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json").then(function(json) {
    const counties = topo.feature(json, json.objects.counties);
    svg.selectAll('path')
       .data(counties.features)
       .enter().append('path')
       .attr("class", function (d) 
       {var temp = winner.find(x => parseInt(d.id) == x.id); if (temp) {return temp.name};})
       .attr('d', pathGenerator);  
});

});








