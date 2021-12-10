var obj_lis = document.getElementById("dropdown-menu").getElementsByTagName("li");
for(i=0;i<obj_lis.length;i++){
    obj_lis[i].onclick = function(){
        // alert(this.innerText);
        $.getJSON("./"+this.innerText,function (d){
            data =d;
            reset();


            // $(".window").draggable({
            //     start: function(e){
            //         var pz = $container.find(".panzoom");
            //         currentScale = pz.panzoom("getMatrix")[0];
            //         console.log(currentScale)
            //         $(this).css("cursor","move");
            //         pz.panzoom("disable");
            //     },
            //     drag:function(e,ui){
            //         ui.position.left = ui.position.left/scal;
            //         ui.position.top = ui.position.top/scal;
            //         if($(this).hasClass("jsplumb-connected"))
            //         {
            //             instance.repaint($(this).attr('id'),ui.position);
            //             console.log(scal)
            //         }
            //     },
            //     stop: function(e,ui){
            //         var nodeId = $(this).attr('id');
            //         if($(this).hasClass("jsplumb-connected"))
            //         {
            //             instance.repaint(nodeId,ui.position);
            //         }
            //         $(this).css("cursor","");
            //         $container.find(".panzoom").panzoom("enable");
            //     }
            // });
        })
    }
}