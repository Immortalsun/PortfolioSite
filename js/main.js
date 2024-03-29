
//SECTION FOR MAIN PAGE EVENTS
$(document).ready( function(){
    "use strict";
    var ROW0PROJECTS = 3;
    var ROW1PROJECTS = 6;

    var row0 = [];
    var row1 = [];
    var section1 = $("#prjSect1");
    var section2 = $("#prjSect2");
    var section3 = $("#prjSect3");

    function buildSection(section,mainIdx,subIdx0,subIdx1){
        var projectDiv = document.createElement("div");
        projectDiv.id = "prj" + mainIdx;
        projectDiv.className = "projectCellLarge w3-col";
        //projectDiv.addEventListener();
        $(section).find("div.mainPanelRow").append(projectDiv);
        row0.push(projectDiv);

        var subProjectDiv0 = document.createElement("div");
        var subProjectDiv1 = document.createElement("div");
        subProjectDiv0.id = "sPrj" + subIdx0;
        subProjectDiv1.id = "sPrj" + subIdx1;
        subProjectDiv1.className = "w3-col projectCellSmall";
        subProjectDiv0.className = "w3-col projectCellSmall";
        var subPanelRow = $(section).find("div.subPanelRow");
        $(subProjectDiv0).appendTo($(subPanelRow));
        $(subProjectDiv1).appendTo($(subPanelRow));
        row1.push(subProjectDiv0);
        row1.push(subProjectDiv1);
    }

    function scrollToElement(elementId){
        $('html, body').animate({
            scrollTop: $(elementId).offset().top-50,
        }, 1500);
    }

    
    buildSection(section1,0,0,1);
    buildSection(section2,1,2,3)
    buildSection(section3,2,4,5);

    $("#proj").click(function () {
       scrollToElement("#topPrjRule");
    });

    $("#abt").click(function () {
      scrollToElement("#abtContentDiv");
    });

    $("#cntct").click(function () {
        scrollToElement("#contactMainDiv");
    });

    $("#closeIcon").click(function(){
        $("#showPrjPanel").fadeOut();
        $("#prjList").fadeIn();
    });

    $("#contactForm").submit(function(event){
        var formData = $("#contactForm").serializeArray(); 
        
        var handler =  $.post("/php/contact.php",formData,
        function(response){
            alert("ZUCC");
        });
        
    })

    var tileManager = new ProjectTileManager(row0, row1);
    tileManager.ArrangeRows();
});

