var obj_lis = document.getElementById("dropdown-menu").getElementsByTagName("li");
for(i=0;i<obj_lis.length;i++){
    obj_lis[i].onclick = function(){
        // alert(this.innerText);
        $.getJSON("./"+this.innerText,function (d){
            data =d;
            instance = null;
            links.length=0;
            res.length=0;
            row=0,col=0,rem=0;
            $("#canvas").empty();
            test();
            calljsplumb();
            document.getElementById('canvas').style.transform = "scale(0.15)";
            document.getElementById('canvas').style.transformOrigin = "" +0+ "px" + " " + "" + 0+ "px";

        })
    }
}