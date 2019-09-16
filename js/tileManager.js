function ProjectTileManager(row0, row1) {
    "use strict";
    this.row0 = row0;
    this.row1 = row1;
    this.tiles = [];
    this.currentTile = undefined; //current tile will be used when a tile
    //is selected for full-width view
    this.contentManger = new ContentManager();
    //TILE OPERATIONAL OBJECT
    function Tile(tileElement,isLarge){
        this.Element = tileElement;
        this.height = tileElement.offsetHeight;
        this.width = tileElement.offsetWidth;
        this.imgClassName = "tileImage w3-opacity w3-hover-opacity-off";
        this.titleCardClassName = "tileTitleCard";
        this.isLarge = isLarge;
        this.isExpanded = false;

        this.attachImage = function (imgSrc) {
            var tileImg = document.createElement("img");
            tileImg.setAttribute("src", imgSrc);
            tileImg.className = this.imgClassName;
            this.Element.appendChild(tileImg);
        }


        this.attachTitleCard = function() {
            var titleCard = document.createElement("div");
            titleCard.className = this.titleCardClassName;
            var titleText = document.createElement("p");
            titleText.className = "tileTitle"
            titleText.innerHTML = "TEST";
            titleCard.appendChild(titleText);
            this.Element.appendChild(titleCard);
        }
    }
    //END TILE DEFINITION

    this.arrangeRow0 = function () {
        var row0Tiles = this.row0;
        for (var i = 0; i < row0Tiles.length; i++) {

            //attach hover handlers for large tiles
            var tileArrayItem = new Tile(row0Tiles[i], true);
            this.tiles.push(tileArrayItem);
            //apply tile content (bgImg + overlay + name)
            tileArrayItem.attachImage("../projectInfo/mainprj"+i+"/tileImage.png");
            tileArrayItem.attachTitleCard();
            var elem = $(row0Tiles[i]);
            elem.hover(
                //mouseEnter and mouseLeave
                function (event) {
                  var tileCard = event.currentTarget;
                  var options = {
                      duration: 350,
                      queue: false
                  };
                  $(tileCard).find("div.tileTitleCard").stop().slideToggle(options);
                  $(tileCard).find("p.tileTitle").fadeIn(options);
                }
                );
            elem.click(function (event) {

            });
        }
    };

    this.arrangeRow1 = function () {
        var row1Tiles = this.row1;
        for(var j = 0; j < row1Tiles.length; j++){

            //attach hover handlers for small tiles (border highlight)
            //apply small tile content (text with .fileExtension based on project)
            var smallElem = $(row1Tiles[j]);
            smallElem.hover(
                function (event) {
                    var tile = event.currentTarget;
                    $(tile).toggleClass('glowItem');
                }
            )

            smallElem.click(
                function (event){

                }
            );
        }
    };

    this.ArrangeRows = function () {
        this.arrangeRow0();
        this.arrangeRow1();
    };




}
