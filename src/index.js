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
    d3.select("#Enter").on("click", displayCountyInfo);
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
           .attr("id", function (d) { 
               //console.log(d);
               let select = document.querySelector("select");
               let opt = document.createElement("Option");
               opt.setAttribute("id",'o' + d.id);
               opt.innerText = d.properties.name; 
               select.appendChild(opt);
            
            return  "c" + d.id;})
           .attr("class",function (d) 
           {
             var temp = winner.find(x => x.id === d.id);
             if (temp) {
                 var ret = "counties";
                 for (var i = 0; i < 4; i++) {
                     ret +=  " " + temp.winner_name[i];
                 }
                return ret;
             };
             })
           .attr('d', pathGenerator);
  });

}

//##############################################

function fillMap(year) {

    if (year == 1) {
        d3.selectAll(".republican2000").style("fill", "grey").transition().delay(750).style("fill", "red");
        d3.selectAll(".democrat2000").style("fill", "grey").transition().delay(750).style("fill", "blue");
    }
    else if (year == 2) {
        d3.selectAll(".republican2004").style("fill", "grey").transition().delay(750).style("fill", "red");
        d3.selectAll(".democrat2004").style("fill", "grey").transition().delay(750).style("fill", "blue");
    }
    else if (year == 3) {
        d3.selectAll(".republican2008").style("fill", "grey").transition().delay(750).style("fill", "red");
        d3.selectAll(".democrat2008").transition().delay(750).style("fill", "blue");
    }
    else if (year == 4) {
        d3.selectAll(".republican2012").style("fill", "grey").transition().delay(750).style("fill", "red");
        d3.selectAll(".democrat2012").style("fill", "grey").transition().delay(750).style("fill", "blue");
    }
    else if (year == 5) {
        d3.selectAll(".republican2016").style("fill", "grey").transition().delay(750).style("fill", "red");
        d3.selectAll(".democrat2016").style("fill", "grey").transition().delay(750).style("fill", "blue");
    }
        
}

/**
* function to get the name of the chosen country from the drop box create and add an infromation
* card about the chosen country to the html
*/
function displayCountyInfo() {
// get the name chosen in the drop box
let id = "";
let options = document.querySelectorAll("option");
//console.log(options[0]);
for (let i=0; i<options.length; i++) {
  //console.log(options[i]);
  if(!options[i].selected) {
    continue;
  }
  else  {
    // get the name
    id = options[i];
    break;
  }
}
id = id.id.substring(1);
// i want to dim every thing except the chosen county
d3.selectAll(".counties").style("fill", "grey");
var classes = d3.select("#c" + id).attr('class');
classes = classes.split(" ");
var palete = [];
for (var i = 1; i < classes.length; i++) {
   if (classes[i][0] === 'r') {
        palete.push("red");
   }
   else {
       palete.push("blue");
   }
}
//console.log(palete);
d3.select("#c" + id + "." + classes[0]).style("fill", palete[0])
.transition().delay(750).style("fill", "grey")
.transition().delay(750).style("fill", palete[1])
.transition().delay(750).style("fill", "grey")
.transition().delay(750).style("fill", palete[2])
.transition().delay(750).style("fill", "grey")
.transition().delay(750).style("fill", palete[3])
.transition().delay(750).style("fill", "grey")
.transition().delay(750).style("fill", palete[4]);
}

