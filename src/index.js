const d3 = require('d3');
const topo = require('topojson');

//var svg = d3.select("#map").append("svg").attr("width", 960).attr("height",600);

 const width = window.innerWidth;
 const height = window.innerHeight;
//projection
var projection = d3.geoAlbersUsa();/** .translate([width / 2, height / 2])
                 .scale((width - 1) / 2 / Math.PI);*/
var pathGenerator = d3.geoPath().projection(projection);

const zoom = d3.zoom()
             .scaleExtent([1, 8]).on('zoom', zoomed);

const svg = d3.select("#map").append("svg").attr("width", width).attr("height",height);
const g = svg.append('g');
svg.call(zoom);
// load the csv file
const csvFile = require('./us_counties2016.csv');
fillMap(csvFile);

//##############################################
 /**
   * function to fill the map with appropriate background
   */
  function fillMap(csvFile) {
    d3.csv(csvFile).then(function(data) {
        var winner = [];
        for (var i = 0; i < data.length; i++) {
            winner.push({id:parseInt(data[i].Fips),name:data[i].Winner.split(" ")[0]});
            
        }
    
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json").then(function(json) {
        const counties = topo.feature(json, json.objects.counties);
        g.selectAll('path')
           .data(counties.features)
           .enter().append('path')
           .attr("id", function (d) 
           {var temp = winner.find(x => parseInt(d.id) == x.id); if (temp) {return temp.name};})
           .attr("class","counties").attr('d', pathGenerator);/**.on("click",clicked);*/  
    });
    
    });

}

//################################################################################//

function zoomed() {
    g.selectAll('path').attr('transform', d3.event.transform);
}



