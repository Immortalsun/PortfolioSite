function ProjectTileManager(row0, row1) {
    "use strict";
    this.row0 = row0;
    this.row1 = row1;
    this.tiles = [];
    this.currentTile = undefined; //current tile will be used when a tile
    //is selected for full-width view

    //TILE OPERATIONAL OBJECT
    function Tile(tileElement,isLarge){
        this.Element = tileElement;
        this.height = tileElement.offsetHeight;
        this.width = tileElement.offsetWidth;
        this.isLarge = isLarge;
        this.isExpanded = false;

        this.Element.onmouseover = function() {
            if(isLarge){
                //remove overlay, show title card

            }
            else{
                //border glow outline
            }
        }

    }
    //END TILE DEFINITION

    this.arrangeRow0 = function () {
        var row0Tiles = this.row0.children;
        for (var i = 0; i < row0Tiles.length; i++) {
            if(i < row0Tiles.length-1){
                row0Tiles[i].style.marginRight = row0Tiles[i].offsetWidth/8 + "px";
            }
            //attach hover handlers for large tiles
            var tileArrayItem = new Tile(row0Tiles[i], true);
            this.tiles.push(tileArrayItem);
            //apply tile content (bgImg + overlay + name)

        }
    };

    this.arrangeRow1 = function () {
        var row1Tiles = this.row1.children;
        for(var j = 0; j < row1Tiles.length; j++){
            if(j < row1Tiles.length-1){
                row1Tiles[j].style.marginRight = row1Tiles[j].offsetWidth/10 + "px";
            }
            //attach hover handlers for small tiles (border highlight)
            //apply small tile content (text with .fileExtension based on project)
        }
    };

    this.ArrangeRows = function () {
        this.arrangeRow0();
        this.arrangeRow1();
    };




}
