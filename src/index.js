(function() {
    "use strict";
      
    // module global variables
    const d3 = require('d3');
    const topo = require('topojson');
    //projection
    const projection = d3.geoAlbersUsa();
    const pathGenerator = d3.geoPath().projection(projection);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3.select("#map").append("svg").attr("width", width).attr("height",height);
    var winner;
    // load the csv file
    //const csvFile_2000 = require('./us_counties2000.csv');
    //const csvFile_2004 = require('./us_counties2008.csv');
    //const csvFile_2008 = require('./us_counties2012.csv');
    //const csvFile_2012 = require('./us_counties2016.csv');
    var csvFile_2016 = require('./us_counties2016.csv');
    //
    window.addEventListener("load",init);
    function init() {
        // do this for each year
        drawStartupScreen();
        d3.select("#five").on("click", function() {fillMap(csvFile_2016);},false);
        
    }
    
    /**
     * show the start up screen
     */
    function drawStartupScreen() {
        // display the map
        d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json").then(function(json) {
            const counties = topo.feature(json, json.objects.counties);
            svg.selectAll('path')
               .data(counties.features)
               .enter().append('path')
               .attr("id", function (d) {return parseInt(d.id);})
               .attr("class","counties").attr('d', pathGenerator);
      });
    
    }
    
    
    /**const zoom = d3.zoom()
                 .scaleExtent([1, 8]).on('zoom', zoomed);
    
    
    const g = svg.append('g');
    svg.call(zoom);
    
    //fillMap(csvFile); */
    
    //##############################################
    
    function fillMap(csvFile) {
        // not efficient to reconstruct map on every click
        d3.csv(csvFile).then(function(data) {
            winner = [];
            for (var i = 0; i < data.length; i++) {
                winner.push({id:parseInt(data[i].Fips),name:data[i].Winner.split(" ")[0]});
                    
        }
        colorMap(winner);});
        
               
    }
    
    
    function colorMap(map) {
        //console.log(map);
        for (var i = 0; i < map.length; i++) {
            console.log(map[i].id);
            //d3.select("#" + map[i].id).classList.add(map[i].name);
                
        }
    }
    //################################################################################//
    function zoomed() {
        g.selectAll('path').attr('transform', d3.event.transform);
    }
    
    
    })();
    