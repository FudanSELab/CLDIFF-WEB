var row,col,rem;
var node_div_map = new Map();
var node_degree_set = new Set();
function clipDiv(n,divId){
    if(n <=0 ){
        console.log("invalid input");
        return;
    }
    var div =document.getElementById(divId);
    var length = Math.floor(Math.sqrt(n));
    var stand = length * (length + 1);

    if(n <= stand){
        row = length;
    }
    else{
        row = length +1;

    }
    col = Math.floor(n/row);
    rem = n- row*col;
    //n = 3 is exception
    if(n == 3){
        row =1;
        col =2;
        rem =1;
    }

    for(let i=0;i<row;i++){
        var t = document.createElement('div');
        t.setAttribute("id",div.id+"row"+i);
        var divLen = div.offsetWidth;
        var divHei = rem > 0?div.offsetHeight/(row+1):div.offsetHeight/row;
        t.style.height = ""+divHei+"px";
        t.style.width = ""+divLen+"px";

        div.appendChild(t);
        for(let j=0;j<col;j++){
            var p = document.createElement('div');
            p.style.height = ""+divHei+"px";
            p.style.width = ""+(divLen/col)  +"px";
            p.style.float = "left";
            p.style.position = "relative";
            p.setAttribute("id",t.id+"col"+j);
            t.appendChild(p);
        }
    }

    if(rem > 0){
        var t = document.createElement('div');

        t.setAttribute("id",div.id+"row"+row);
        var divLen = div.offsetWidth;
        var divHei = div.offsetHeight/(row+1);
        t.style.height = ""+divHei+"px";
        t.style.width = ""+divLen+"px";
        div.appendChild(t);
        for(let k=0;k<rem;k++){
            var p = document.createElement('div');
            p.setAttribute("id",t.id+"col"+k);
            p.style.height = ""+divHei+"px";
            p.style.width = ""+(divLen/rem)+"px";
            p.style.float = "left";
            p.style.position = "relative";
            t.appendChild(p);

        }
    }
}

var res = [];

function rankNodes(){
    var map = new Map();
    var map2 = new Map();
    // 按文件做为key放到map
    for(let node of data.nodes){
        if (!map.has(node.file_name)) {
            map.set(node.file_name,[node]) ;
        } else {
            let temp = map.get(node.file_name);
            temp.push(node)
            map.set(node.file_name,temp)
        }
    }

    let arr = [];
    // a1 ,a2 ,a3
    // arr = [a1, a1, a2, a2 ...]
    for(let edge of data.edges ){
        node_degree_set.add(edge.source);
        node_degree_set.add(edge.target);
        arr.push(edge.source);
        arr.push(edge.target);
    }
    // node_id
    for(let id of arr){
        if(!map2.has(id)){
            map2.set(id,1);
        }
        else {
            map2.set(id,map2.get(id)+1)
        }
    }

    for(let node of data.nodes){
        var flag = false;
        for(let key of map2.keys()){
            if(key == node.id){
                flag = true;
            }

        }
        if(flag){
            map2.set(node.file_name,map2.has(node.file_name)?map2.get(node.id)+map2.get(node.file_name):map2.get(node.id));
        }
    }

    for(let key of map.keys()){
        res.push({
            id: key,
            data: map.get(key),
            rank: map2.get(key),
        })
    }


    res.sort((a,b)=>{
            return b.rank-a.rank
        }
    );



}


function layout() {
    let c =0;
    rankNodes();
    clipDiv(res.length, "canvas");
    var m = Math.floor(rem > 0 ? (row + 1) / 2 : row / 2);
    var n = Math.floor(col / 2);
    if (res.length === 3) {
        m = 1;
        n = 0;
    }
    var r = rem;
    var arr = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1]
    ];



    for (let resData of res[0].data) {
        var center = document.createElement("div");
        center.setAttribute("class", "window jtk-node ");
        center.setAttribute("id",resData.id);
        center.setAttribute("path",resData.file_name);
        document.getElementById("canvas" + "row" + m + "col" + n).appendChild(center);
        initNode(center,resData,0);
        node_div_map.set(resData.id,"canvas" + "row" + m + "col" + n);

    }

    var step = 1;
    var i = 0;
    var count = 0;
    while(true) {
        if (i % 8 === 0 && i !== 0) {
            step++;
        }
        if (count == res.length - 1) {
            break;
        }

        var x = m + arr[i % 8][0] * step;
        var y = n + arr[i % 8][1] * step;
        i++;


        if (x >= 0 && x < row && y >= 0 && y < col) {
            var loc = document.getElementById("canvas" + "row" + x + "col" + y);
            for (let resData of res[count + 1].data) {
                var d = document.createElement("div");
                d.setAttribute("class", "window jtk-node " + resData.file_name.substring(resData.file_name.lastIndexOf("/")+1,resData.file_name.lastIndexOf(".")));
                d.setAttribute("id", resData.id);
                d.setAttribute("path",resData.file_name);
                loc.appendChild(d);
                initNode(d,resData,count+1);
                node_div_map.set(resData.id,"canvas" + "row" + x + "col" + y);

            }
            count++;

        }


    }
}

// function rankNodeAndAddAttribute(){
//     rankNodes();
//     for(let i=0;i<res.length;i++){
//         for (let resData of res[i].data) {
//             var center = document.createElement("div");
//             center.setAttribute("class", "zoomTarget window jtk-node ");
//             center.setAttribute("id",resData.id);
//             center.setAttribute("path",resData.file_name);
//             // center.setAttribute("data-closeclick",true);
//             document.getElementById("canvas" ).appendChild(center);
//             initNode(center,resData,i);
//         }
//     }
//
// }

function reset(){
    instance = null;
    links.length=0;
    res.length=0;
    row=0,col=0,rem=0;
    $("#canvas").empty();
    $("#changed_files").empty();
    layout();
    calljsplumb();
    document.getElementById('canvas').style.transform = "scale("+scal+")";
    document.getElementById('canvas').style.transformOrigin = "" +0+ "px" + " " + "" + 0+ "px";
    addZoom();
    var matrix = $(".container").find(".panzoom").panzoom("getMatrix");
    matrix[4] = 0;
    matrix[5] = 0;
    $(".container").find(".panzoom").panzoom("setMatrix",matrix);
    $("#leftPanel").attr("style", "overflow:scroll");

}

