// module global variables
    const d3 = require('d3');
    const topo = require('topojson');
    //projection
    const projection = d3.geoAlbersUsa();
    const pathGenerator = d3.geoPath().projection(projection);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3.select("#map").append("svg").attr("width", width).attr("height",height);
    
    
    var csvFile = require('./winners_years_switch.csv');
    let myData;
    window.addEventListener("load",init);
    function init() {
        extractData();
        d3.select("#one").on("click", function() {fillMap(1);},false);
        d3.select("#two").on("click", function() {fillMap(2);},false);
        d3.select("#three").on("click", function() {fillMap(3);},false);
        d3.select("#four").on("click", function() {fillMap(4);},false);
        d3.select("#five").on("click", function() {fillMap(5);},false);
        
    }
    function extractData() {
        d3.csv(csvFile).then(function(data) {
            //myData = data;
            var winner = [];
            for (var i = 0; i < data.length; i++) {
                var temp_id = Math.trunc(data[i].FIPS).toString(); 
                if (temp_id.length == 4) {
                  temp_id = "0".concat(temp_id);
                }
                winner.push({id:temp_id,winner_name:[data[i]["party2000"] + "2000",data[i]["party2004"] + "2004",
                    data[i]["party2008"] + "2008",data[i]["party2016"] + "2016"]});  
            }
            drawScreen(winner);         
        });}
    
    /**
     * show the start up screen
     */
    function drawScreen(winner) {
        // display the map
        d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json").then(function(json) {
            const counties = topo.feature(json, json.objects.counties);
            svg.selectAll('path')
               .data(counties.features)
               .enter().append('path')
               .attr("id", function (d) { return  "county" + d.id;})
               .attr("class",function (d) 
               {
                 var temp = winner.find(x => x.id === d.id);
                 if (temp) {
                     var ret = "counties";
                     for (var i = 0; i < 4; i++) {
                         ret +=  " " + temp.winner_name[i];
                     }
                    return ret;
                 };})
               .attr('d', pathGenerator);
      });
    
    }
    
    //##############################################
    
    function fillMap(year) {

        if (year == 1) {
            d3.selectAll(".republican2000").style("fill", "red");
            d3.selectAll(".democrat2000").style("fill", "lightblue");
        }
        else if (year == 2) {
            d3.selectAll(".republican2004").style("fill", "lightred");
            d3.selectAll(".democrat2004").style("fill", "lightblue");
        }
        else if (year == 3) {
            d3.selectAll(".republican2008").style("fill", "lightred");
            d3.selectAll(".democrat2008").style("fill", "lightblue");
        }
        else if (year == 4) {
            d3.selectAll(".republican2012").style("fill", "lightred");
            d3.selectAll(".democrat2012").style("fill", "lightblue");
        }
        else if (year == 5) {
            d3.selectAll(".republican2016").style("fill", "lightred");
            d3.selectAll(".democrat2016").style("fill", "lightblue");
        }
            
    }
    
    