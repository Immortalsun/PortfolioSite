
//SECTION FOR MAIN PAGE EVENTS
$(document).ready( function(){
    "use strict";
    var ROW0PROJECTS = 3;
    var ROW1PROJECTS = 6;

    var row0 = document.getElementById("row0");
    var row1 = document.getElementById("row1");

    var i = 0;
    for (; i < ROW0PROJECTS; i++) {
        var projectDiv = document.createElement("div");
        projectDiv.id = "prj" + i;
        projectDiv.className = "projectCellLarge w3-col";
        row0.appendChild(projectDiv);
        
    }

    var j = 0;
    for(; j < ROW1PROJECTS; j++) {
        var subProjectDiv = document.createElement("div");
        subProjectDiv.id = "sPrj" + j;
        subProjectDiv.className = "w3-col w3-hide-small projectCellSmall";
        if(j > 0 && j%2===1){
            subProjectDiv.style.marginRight = "2%";
        }
        row1.appendChild(subProjectDiv);
    }

    var tileManager = new ProjectTileManager(row0, row1);
    tileManager.ArrangeRows();
});

