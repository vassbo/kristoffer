var squares = [];
var svg;
var cellSize = 14;
var xOffset = 5, yOffset = 5;
var viewWindow = 16;

var width = 15, height = 15;
var player = {x: width|1 , y: height|1};
var board = makeMaze(width, height);//.reduce(function(prev, cur) {return prev.concat(cur);});

function drawMap(){
    svg = d3.selectAll(".miniMap")
    .selectAll("svg")
    .data([0]);
    svgWidth = viewWindow * cellSize;
    svgHeight = viewWindow * cellSize;
    svg.enter()
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    svg.transition();

    var data = (function() {
        var firstCol = player.x-(viewWindow/2), lastCol = player.x+(viewWindow/2)+1;
        firstCol = (firstCol >= 0 ? firstCol : 0);
        lastCol = (lastCol >= board.length-1 ? lastCol : board.length-1);
        // lastCol-firstCol === viewWindow;
        // player.x === middleRow
        var firstRow = player.y-(viewWindow/2), lastRow = player.y+(viewWindow/2)+1;
        firstRow = (firstRow >= 0 ? firstRow : 0);
        lastRow = (lastRow >= board[0].length-1 ? lastRow : board[0].length-1);
        //console.log("Player:" + player.x + "|" + player.y, "firstCol: " + firstCol, "lastCol: " + lastCol, "firstRow: " + firstRow, "lastRow: " + lastRow);
        // var last = player.x+3; **************************************************Not Used?
        slicedBoard = board.slice(firstCol,lastCol).map(function(arr, c) {
            var col = c;
            return arr.slice(firstRow,lastRow).map(function(val, row) {
                return {value: val, position: [(firstCol+c),(firstRow+row)]}; //position == position on board
            });
        });
        return slicedBoard.reduce(function(prev, cur) {
            return prev.concat(cur);
        }, []);
    })();

    var spaces = svg.selectAll("rect").data(data, function(d) {return d.position[0]*100+d.position[1];});

    spaces.enter().append('rect');
    spaces.attr({
        y: function(d) {return (d.position[0] - player.x - 1) * cellSize + (svgWidth + cellSize)/2;},
        x: function(d) {return (d.position[1] - player.y - 1) * cellSize + (svgHeight + cellSize)/2;},
        width: cellSize,
        height: cellSize,
        class: function(d) {return (d.value=='_' ? "path" : "");},
        'data-pos': function(d) {return d.position;}
    });
    // spaces.transition().duration(50)
    //     .attr({
    //         x: function(d) {return (d.position[0] - player.x + 1) * cellSize;},
    //         y: function(d) {return (d.position[1] - player.y + 1) * cellSize;},
    //         'data-pos': function(d) {return d.position;}
    //     });
    spaces.exit().remove();

}

drawMap();

function update(){
    // if(svg){
    // svg.remove();
    drawMap();
    // console.log("redrawn");

    // }

}

window.onkeypress = function(e){
    var key = e.keyCode ? e.keyCode : e.which;
    switch (key) {
        case 119: //w
        player.x--;
        break;
        case 97: //a
        player.y--;
        break;
        case 115: //s
        player.x++;
        break;
        case 100: //d
        player.y++;
        break;
        default:
        console.log(key + " pressed");
        return;

    }
    update();
};
