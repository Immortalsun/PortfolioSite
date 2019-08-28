function ContentManager() {
    //Content manager will handle AJAX resquests and
    //sending project data to tiles
    this.currentResponse = undefined;

    this.getFile = function(strUrl, callbackFunc) {
        if(strUrl === undefined || callbackFunc === undefined){
            return;
        }

        var httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = function() {
            if(this.readyState === 4
               && this.status === 200) {
                callbackFunc(this);
            }
        }
        httpReq.open("GET",strUrl,true);
        httpReq.send();
    }
}
