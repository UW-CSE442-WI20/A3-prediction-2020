
// Time slider
// Values to change:
var start_year = 2000;
var default_year = 2016;
var step = 4;
var num_steps = 5;
var width_of_slider = 300; //pixels?

var default_index = (start_year - default_year)/step;



var dataTime = d3.range(0, num_steps).map(function(d) {
    // start
    return new Date(start_year + step * d, num_steps, default_index);
});

// make a slider
var sliderTime = d3
.sliderBottom()
.min(d3.min(dataTime))
.max(d3.max(dataTime))
.step(1000 * 60 * 60 * 24 * 365 * step)
.width(width_of_slider)
.tickFormat(d3.timeFormat('%Y'))
.tickValues(dataTime)
.default(new Date(default_year, num_steps, default_index))
.on('onchange', val => {
d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
});

// this apprears to be the size of the box it takes up?
var gTime = d3
.select('div#slider-time')
.append('svg')
.attr('width', width_of_slider + 200)
.attr('height', 100)
.append('g')
.attr('transform', 'translate(30,30)');

gTime.call(sliderTime);

d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));

