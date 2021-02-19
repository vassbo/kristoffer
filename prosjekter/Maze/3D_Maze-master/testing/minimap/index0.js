var squares = [];
var svg;
var cellSize = 20;
var xOffset = 0, yOffset = 0;

makeMaze(22,22).forEach(function(line, i){
    line.forEach(function(square, j){
        squares.push({
            x: j,
            y: i,
            square: square
        });
    });
});

function drawMap(){
    svg = d3.selectAll("body")
            .append("svg")
            .attr("width", (d3.max(squares, function(d) { return d.x;})/4) * cellSize)
            .attr("height", (d3.max(squares, function(d) { return d.y;})/4) * cellSize);

    var width = svg.attr("width"),
    height = svg.attr("height");



var gridWidth = d3.max(squares, function(d) { return d.x; }) + 1,
    gridHeight = d3.max(squares, function(d) { return d.y; }) + 1;

var square = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .selectAll(".square")
    .data(squares)
  .enter().append("g")
  .attr("class", function(d) {return (d.square=='_' ? "path" : "");})
  .attr("transform", function(d) { return "translate(" + (d.x - gridWidth / 2 + xOffset) * cellSize + "," + (d.y - gridHeight / 2 + yOffset) * cellSize + ")"; });

square.append("rect")
    .attr("x", -cellSize / 2)
    .attr("y", -cellSize / 2)
    .attr("width", cellSize - 1)
    .attr("height", cellSize - 1);
}

drawMap();

function update(){
    if(svg){
        svg.remove();
        drawMap();
        console.log("redrawn");

    }

}

window.onkeypress = function(e){
    var key = e.keyCode ? e.keyCode : e.which;
    switch (key) {
        case 119: //w
            yOffset++;
            break;
        case 97: //a
            xOffset++;
            break;
        case 115: //s
            yOffset--;
            break;
        case 100: //d
            xOffset--;
            break;
        default:
        console.log(key + " pressed");
        return;

    }
    update();
};
