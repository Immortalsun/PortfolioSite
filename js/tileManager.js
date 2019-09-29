function ProjectTileManager(row0, row1) {
    "use strict";
    this.row0 = row0;
    this.row1 = row1;
    this.tiles = [];
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
    //BEGIN FUNCTIONAL DOM INTERACTION
    function selectProjectFromTile(tileIdx,folderDir){
        $("#showPrjPanel").find("#prjPanelImg").attr("src","../projectInfo/"+folderDir+tileIdx+"/tileImage.png");
        $.getJSON("../projectInfo/mainPrj"+tileIdx+"/text.json", function(data){
            $("#prjTextTitle").text(data.title);
            $("#prjTextInfo").text(data.info);
            $("#prjTextLink").attr("href",data.link);
        });
        var circleId = folderDir.substring(0,1) + tileIdx;
        setCircleSelected(circleId);
    }

    function selectProjectFromCircle(circleId){
        var folderDir = "mainPrj";
        var tileIdx = circleId.substring(1);
        if(circleId.substring(0,1)==="s"){
            folderDir ="subPrj";
        }
        $("#showPrjPanel").find("#prjPanelImg").attr("src","../projectInfo/"+folderDir+tileIdx+"/tileImage.png");
        $.getJSON("../projectInfo/mainPrj"+tileIdx+"/text.json", function(data){
            $("#prjTextTitle").text(data.title);
            $("#prjTextInfo").text(data.info);
            $("#prjTextLink").attr("href",data.link);
        });
    }

    function setCircleSelected(circleId){
        $(".projCircleSelector").each(function(idx){
            this.style.backgroundColor = "transparent";
        });
        var circle = document.getElementById(circleId);
        circle.style.backgroundColor = "#f6c42b";
    }

    function showProjectPanel(){
        $("#prjList").fadeOut();
        $("#showPrjPanel").fadeIn();
    }

    function getCircleIdx(next){
        var thisCircleIdx = 0;
        var nextCircleIdx = 0;

        var elements = $(".projCircleSelector");
        for (var i = 0; i < elements.length; i++) {
            if(elements[i].style.backgroundColor !== "transparent"){
                thisCircleIdx = i;
            }
        }

        if(next){
            if(thisCircleIdx < $(".projCircleSelector").length-1){
                nextCircleIdx = thisCircleIdx + 1;
            }
        }
        else{
            if(thisCircleIdx > 0){
                nextCircleIdx = thisCircleIdx - 1;
             }
             else {
                nextCircleIdx = $(".projCircleSelector").length-1;
             }
        }

        return nextCircleIdx;
    }
    //END FUNCTIONAL DOM INTERACTION SECTION
    //BEGIN EVENT HANDLING SECTION
   $("#projPrev").click(function(event){
        var circIdx = getCircleIdx(false);
        var id = $(".projCircleSelector")[circIdx].id;
        selectProjectFromCircle(id);
        setCircleSelected(id);
   });

   $("#projNext").click(function(event){
        var circIdx = getCircleIdx(true);
        var id = $(".projCircleSelector")[circIdx].id;
        selectProjectFromCircle(id);
        setCircleSelected(id);
   });

    $(".projCircleSelector").click(function(event){
        var selector = event.currentTarget;
        $(".projCircleSelector").each(function(idx){
            this.style.backgroundColor = "transparent";
        });
        selector.style.backgroundColor = "#f6c42b";
        selectProjectFromCircle(selector.id);
    })
    //END EVENT HANDLING SECTION

    //Arrange Row Section
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
                var tileCard = event.currentTarget;
                var folderDir = "mainPrj";
                if(tileCard.id.substring(0,1) === "s"){
                    folderDir = "subPrj"
                }
                showProjectPanel();
                selectProjectFromTile(tileCard.id.substring(3),folderDir);
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
//END ARRANGE ROWS



}
