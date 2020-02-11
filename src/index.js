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
        //console.log(data[i]);
        var temp = parseFloat(data[i].percentage);
        if (temp > 0.5) {
            //console.log(parseInt(data[i].Fips));
            //console.log(temp);
            winner.push({id:parseInt(data[i].Fips),name:data[i].Candidate});
            //console.log(winner);
        }
    }

/** });*/
// #############################################################################################
// load geoJson data and merge with csvFile
d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json").then(function(json) {
    const counties = topo.feature(json, json.objects.counties);
    //console.log(counties.features[0].id);

    svg.selectAll('path')
       .data(counties.features)
       .enter().append('path')
       .attr("class", function (d) 
       {var temp = winner.find(x => parseInt(d.id) == x.id); if (temp) {return temp.name.split(" ")[0]};})
       .attr('d', pathGenerator);

    
});

});








