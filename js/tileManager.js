function ProjectTileManager(row0, row1) {
    "use strict";
    this.row0 = row0;
    this.row1 = row1;


    this.arrangeRow0 = function () {
        var row0Tiles = this.row0.children;
        for (var i = 0; i < row0Tiles.length; i++) {
            if(i < row0Tiles.length-1){
                row0Tiles[i].style.marginRight = row0Tiles[i].offsetWidth/8 + "px";
            }
        }
    };

    this.arrangeRow1 = function () {
        var row1Tiles = this.row1.children;
        for(var j = 0; j < row1Tiles.length; j++){
            if(j < row1Tiles.length-1){
                row1Tiles[j].style.marginRight = row1Tiles[j].offsetWidth/10 + "px";
            }
        }
    };

    this.ArrangeRows = function () {
        this.arrangeRow0();
        this.arrangeRow1();
    };

}
