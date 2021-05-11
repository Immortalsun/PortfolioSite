function scrollToSection(sectionTarget)
{
    let target = document.getElementById(sectionTarget);
    let scrollableWindow = document.getElementById("page-container");
    let headerBarOffset = document.getElementById("header-bar").clientHeight;
    
    /*TODO
    Implement smooth scrolling functionality
    */
    scrollableWindow.scrollTop = target.offsetTop - headerBarOffset;
}