
//Constants
var ROW0PROJECTS = 3;
var ROW1PROJECTS = 6;

//SECTION FOR MAIN PAGE LOADING
function pageLoad() {
    "use strict";
    var row0 = document.getElementById("row0");
    var row1 = document.getElementById("row1");

    var i = 0;
    for (; i < ROW0PROJECTS; i++) {
        var projectDiv = document.createElement("div");
        projectDiv.id = "prj" + i;
        projectDiv.className = "w3-cell w3-col projectCellLarge";
        row0.appendChild(projectDiv);
    }

    var j = 0;
    for(; j < ROW1PROJECTS; j++) {
        var subProjectDiv = document.createElement("div");
        subProjectDiv.id = "sPrj" + j;
        subProjectDiv.className = "w3-cell w3-col projectCellSmall";
        row1.appendChild(subProjectDiv);
    }
}
