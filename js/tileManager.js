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
        this.titleCardClassName = "tileTitleCard w3-container";
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

        this.Element.onmouseover = function(event) {
            var imgClassName = "tileImage w3-opacity w3-hover-opacity-off";
            var titleCardClassName = "tileTitleCard w3-container";

            if(isLarge){
                //show title card
               if(event.srcElement.className === imgClassName) {
                   var parent = event.srcElement.parentElement;
                   if(parent !== undefined){
                       var titleCard = parent.children[1];
                       if(titleCard !== undefined){
                           
                            var titleHeight = 0;
                            var targetHeight = parent.offsetHeight * .15;
                            var anim = setInterval(frame, 5);
                            function frame(){
                                if(titleHeight >= targetHeight){
                                    clearInterval(anim);
                                    var titleText = titleCard.children[0];
                                    if(titleText !== undefined){
                                        titleText.style.display = "block";
                                    }
                                }
                                else{
                                    titleHeight++;
                                    titleCard.style.height = titleHeight + "px";
                                }
                            }

                       }
                   }
               }
            }
            else{
                //border glow outline
            }
        }

        this.Element.onmouseout = function(event) {
            var imgClassName = "tileImage w3-opacity w3-hover-opacity-off";
            var titleCardClassName = "tileTitleCard w3-container w3-animate-bottom";
            if(isLarge){
                //remove title card
               if(event.srcElement.className === imgClassName 
                || event.srcElement.className === titleCardClassName){
                  var parent = event.srcElement.parentElement;
                  if(parent !== undefined){
                    var titleCard = parent.children[1];
                    if(titleCard !== undefined){
                       var currentHeight = titleCard.offsetHeight;
                       var anim = setInterval(frame, 5);
                       var titleText = titleCard.children[0];
                       if(titleText !== undefined){
                            titleText.style.display = "none";
                        }
                       function frame(){
                           if(currentHeight === 0){
                               clearInterval(anim);
                           }
                           else{
                               currentHeight--;
                               titleCard.style.height = currentHeight + "px";
                           }
                       }
                    }
                  }
               }
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

            //attach hover handlers for large tiles
            var tileArrayItem = new Tile(row0Tiles[i], true);
            this.tiles.push(tileArrayItem);
            //apply tile content (bgImg + overlay + name)
            tileArrayItem.attachImage("../projectInfo/mainprj"+i+"/tileImage.png");
            tileArrayItem.attachTitleCard();
            //tileArrayItem.attachOverlay();

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
