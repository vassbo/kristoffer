miniMap = function(_cellSize, _xOffset, _yOffset, _viewWindow) {
    var cellSize = (_cellSize) ? _cellSize : 14;
    var xOffset = (_xOffset) ? _xOffset : 5,
        yOffset = (_yOffset) ? _yOffset : 5;
    var viewWindow = (_viewWindow) ? _viewWindow : 16;

    var board = [];


    function getPos(){
        camPos = camera.position;
        return{z: -Math.floor((camPos.x - 200)/size +xOffset), x: -Math.floor((camPos.z - 190)/size+yOffset)};
        // return{z: Math.floor((camPos.x + 100)/size +xOffset), x: Math.floor((camPos.z + 420)/size+yOffset)};

        // -(x-xOffset) * size
    }




    var output = {};
    output.board = function(_) {
        if (!arguments.length) {
            return board;
        }
        _a = _.slice();
        _a.forEach(function(l){
            l.reverse();
        });
        _a.reverse();
        board = _a;
        return output;
    };
    // output.player = function(_) {
    //     if (!arguments.length) {
    //         return player;
    //     }
    //     player = _;
    //     return this;
    // };
    output.drawMap = function() {
        var svg;
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
            var firstCol = getPos().x-(viewWindow/2), lastCol = getPos().x+(viewWindow/2)+1;
            firstCol = (firstCol >= 0 ? firstCol : 0);
            lastCol = (lastCol >= board.length-1 ? lastCol : board.length-1);
            var firstRow = getPos().z-(viewWindow/2), lastRow = getPos().z+(viewWindow/2)+1;
            firstRow = (firstRow >= 0 ? firstRow : 0);
            lastRow = (lastRow >= board[0].length-1 ? lastRow : board[0].length-1);
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
            y: function(d) {return (d.position[0] - getPos().x - 1) * cellSize + (svgWidth + cellSize)/2;},
            x: function(d) {return (d.position[1] - getPos().z - 1) * cellSize + (svgHeight + cellSize)/2;},
            width: cellSize,
            height: cellSize,
            class: function(d) {
                cName = "";
                if(d.value=='_'){
                    cName += "path";
                }
                return cName;
            },
            'data-pos': function(d) {return d.position;}
        });
        spaces.exit().remove();
    };

    return output;
};
