var oDiv = document.getElementById('canvas');
var box = document.getElementById('box');
var scal = 0.15;
var offsetX = document.getElementById("canvas").offsetWidth;
var offsetY = document.getElementById("canvas").offsetHeight;
var win = document.getElementsByClassName("jtk-node");



function onMouseWheel(ev) {/*当鼠标滚轮事件发生时，执行一些操作*/
    var ev = ev || window.event;
    var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
    down = ev.wheelDelta ? ev.wheelDelta > 0 : ev.detail < 0;
    if (ev.preventDefault) {/*FF 和 Chrome*/
        ev.preventDefault();// 阻止默认事件
    }
    //console.log(document.getElementById("canvas").offsetWidth);
    var p = document.elementFromPoint(ev.clientX,ev.clientY);
    //console.log(p.className)
    var x ,y;
    var maxScale = 1.2,minScale = 0.1;

        var pos = {top: 0, left: 0};
        while(ev){

            pos.left += ev.offsetX;
            pos.top += ev.offsetY;
            ev=ev.offsetParent;
            console.log(pos)
        }



    // if(p.id ==="canvas"){
    //     x= ev.offsetX;
    //     y = ev.offsetY;
    //     console.log(1)
    // }
    // else if(p.className == "jtk-node"){
    //     x = ev.offsetX+ev.offsetLeft;
    //     y = ev.offsetY+ev.offsetHeight;
    //     console.log(2)
    // }
    // else{
    //     console.log(3)
    //     x= ev.clientX;
    //      y =ev.clientY;
    // }

     // console.log(pos);
     x= pos.left;
     y =pos.top;

    const preScale = scal;
    if (down) {
        scal = (parseFloat(scal) + 0.05).toFixed(2)<maxScale?(parseFloat(scal) + 0.05).toFixed(2):maxScale;

    } else {

            scal = (parseFloat(scal) - 0.05).toFixed(2)>minScale?(parseFloat(scal) - 0.05).toFixed(2):minScale;


    }
    oDiv.style.transform = "scale(" + scal + ")";
    // const disx = (offsetX - ev.clientX) * (scal / preScale - 1);
    // const disy = (offsetY - ev.clientY) * (scal / preScale - 1);
     oDiv.style.transformOrigin = "" + x + "px" + " " + "" + y + "px";
    // oDiv.style.transformOrigin = "50% 50%";

    // if (ev.preventDefault) {/*FF 和 Chrome*/
    //     ev.preventDefault();// 阻止默认事件
    // }


}

// addEvent(box, 'mousewheel', onMouseWheel);
// addEvent(box, 'DOMMouseScroll', onMouseWheel);



function addEvent(obj, xEvent, fn) {
    if (obj.attachEvent) {
        obj.attachEvent('on' + xEvent, fn);
    } else {
        obj.addEventListener(xEvent, fn, false);
    }
}

var $container =  $(".container");
var $panzoom = null;
_.defer(function(){
    $panzoom = $('.panzoom');
    $panzoom.panzoom({
        minScale: 0.4,
        maxScale: 2,
        increment: 0.1,
        cursor: "",
        ignoreChildrensEvents:true,
    }).on("panzoomstart",function(e,pz,ev){
        $panzoom.css("cursor","move");
    })
        .on("panzoomend",function(e,pz){
            $panzoom.css("cursor","");
        });
    $panzoom.parent()
        .on("mousedown touchstart",function(ev){
            var matrix = $container.find(".panzoom").panzoom("getMatrix");
            var offsetX = matrix[4];
            var offsetY = matrix[5];
            var dragstart = {x:ev.pageX,y:ev.pageY,dx:offsetX,dy:offsetY};
            $(ev.target).css("cursor","move");
            $(this).data('dragstart', dragstart);
            // $("html").removeClass("zoomTarget");
            // $("html").removeClass("selectedZoomTarget");
            // $("body").removeClass("zoomTarget");
            // $("body").removeClass("selectedZoomTarget");
            // $("#plug").remove();
            // console.log($("#plug"))
        })
        .on("mousemove touchmove", function(ev){
            var dragstart = $(this).data('dragstart');
            if(dragstart)
            {
                var deltaX = dragstart.x-ev.pageX;
                var deltaY = dragstart.y-ev.pageY;
                var matrix = $container.find(".panzoom").panzoom("getMatrix");
                matrix[4] = parseInt(dragstart.dx)-deltaX;
                matrix[5] = parseInt(dragstart.dy)-deltaY;
                $container.find(".panzoom").panzoom("setMatrix",matrix);

            }
        })
        .on("mouseup touchend touchcancel", function(ev){
            $(this).data('dragstart',null);
            $(ev.target).css("cursor","");
        });
});

