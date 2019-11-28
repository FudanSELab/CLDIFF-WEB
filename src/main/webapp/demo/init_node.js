

function initNode(){
    $("#canvas").append("<div class=\"window jtk-node\" id=\"flowchartWindow1\"><strong>1</strong><br/><br/></div>")
    $("#canvas").append("<div class=\"window jtk-node\" id=\"flowchartWindow2\"><strong>2</strong><br/><br/></div>")
    $("#canvas").append("<div class=\"window jtk-node\" id=\"flowchartWindow3\"><strong>3</strong><br/><br/></div>")
    $("#canvas").append("<div class=\"window jtk-node\" id=\"flowchartWindow4\"><strong>4</strong><br/><br/></div>")

}




window.onload=function(){
    initNode();
    initEdge();
    calljsplumb();
}