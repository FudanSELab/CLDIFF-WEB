var row,col,rem;
var node_div_map = new Map();
var node_degree_set = new Set();
var res = [];
var node_map = new Map();
var outer_link = [];
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


function rankNodes(){
    var map = new Map();
    var map2 = new Map();
    var map3 = new Map();
    // 按文件做为key放到map
    for(let node of data.nodes){
        if (!map.has(node.file_name)) {
            map.set(node.file_name,[node]) ;
        } else {
            let temp = map.get(node.file_name);
            temp.push(node)
            map.set(node.file_name,temp)
        }
        map3.set(node.id,node.file_name);
    }

    // let arr = [];
    // // a1 ,a2 ,a3
    // // arr = [a1, a1, a2, a2 ...]
    // for(let edge of data.edges ){
    //
    //     arr.push(edge.source);
    //     arr.push(edge.target);
    // }
    for(let edge of data.edges){
        node_degree_set.add(edge.source);
        node_degree_set.add(edge.target);
        if(map3.get(edge.source) !== map3.get(edge.target)){
            //outer link
            if(!map3.has(map3.get(edge.source))){
                map3.set(map3.get(edge.source),1);
            }
            else {
                map3.set(map3.get(edge.source),map3.get(map3.get(edge.source))+1);
            }
            if(!map3.has(map3.get(edge.target))){
                map3.set(map3.get(edge.target),1);
            }
            else{
                map3.set(map3.get(edge.target),map3.get(map3.get(edge.target))+1);
            }
            outer_link.push([edge.source,edge.target]);

        }
    }
    // node_id
    // for(let id of arr){
    //
    //     if(!map2.has(id)){
    //
    //         map2.set(id,1);
    //     }
    //     else {
    //         map2.set(id,map2.get(id)+1)
    //     }
    // }
    //
    // for(let node of data.nodes){
    //     var flag = false;
    //     for(let key of map2.keys()){
    //         if(key == node.id){
    //             flag = true;
    //             break;
    //         }
    //
    //     }
    //     if(flag){
    //         map2.set(node.file_name,map2.has(node.file_name)?map2.get(node.id)+map2.get(node.file_name):map2.get(node.id));
    //     }
    // }
    // console.log(map2)

    for(let key of map.keys()){
        res.push({
            id: key,
            data: map.get(key),
            rank: map3.get(key),
        })
    }


    res.sort((a,b)=>{
            return b.rank-a.rank
        }
    );
    //console.log(res)

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
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
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

function windowDraggable(){
    $(".window").draggable({
        containment:$("#canvas"),
        start: function(e){
            var pz = $container.find(".panzoom");
            currentScale = pz.panzoom("getMatrix")[0];
            $(this).css("cursor","move");
            pz.panzoom("disable");
        },
        drag:function(e,ui){
            ui.position.left = ui.position.left/scal;
            ui.position.top = ui.position.top/scal;
            // $("#leftPanel").attr("style","overflow:hidden;position:relative")
            if($(this).hasClass("jsplumb-connected"))
            {
                instance.repaint($(this).attr('id'),ui.position);

                $(e.target).css("cursor","move");
            }
        },
        stop: function(e,ui){
            var nodeId = $(this).attr('id');
            if($(this).hasClass("jsplumb-connected"))
            {
                instance.repaint(nodeId,ui.position);
            }
            $(this).css("cursor","");
            $container.find(".panzoom").panzoom("enable");
            $("#leftPanel").attr("style","overflow:scroll;position:relative")
        }
    });
}

function reset(){
    instance = null;
    links.length=0;
    res.length=0;
    row=0,col=0,rem=0;
    node_div_map.clear();
    node_degree_set.clear();
    file_color_map = {};
    raw_nodes = [];
    $("#canvas").empty();
    $("#changed_files").empty();
    $("#rightEditor").empty();
    initRightEditor();
    layout();
    wrapNodes();
    calljsplumb();
    document.getElementById('canvas').style.transform = "scale("+scal+")";
    document.getElementById('canvas').style.transformOrigin = "" +0+ "px" + " " + "" + 0+ "px";
    addZoom();
    var matrix = $(".container").find(".panzoom").panzoom("getMatrix");
    matrix[4] = 0;
    matrix[5] = 0;
    $(".container").find(".panzoom").panzoom("setMatrix",matrix);
    windowDraggable();
    $("#leftPanel").attr("style", "overflow:scroll");

}

class Node {
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
        this.level = 1;
        this.x = 0;
        this.y = 0;

    }
}

class RawNode{
    constructor(id,row,col){
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.row = row;
        this.col = col;
    }
}

class MultiwayTree {
    constructor() {
        this._root = null;
    }

    traverseDF(callback) {
        let stack = [], found = false;
        stack.unshift(this._root);
        let currentNode = stack.shift();
        while(!found && currentNode) {
            found = callback(currentNode) === true ? true : false;
            if (!found) {
                stack.unshift(...currentNode.children);
                currentNode = stack.shift();
            }
        }
    }

    traverseBF(callback) {
        let queue = [], found = false;
        queue.push(this._root);
        let currentNode = queue.shift();
        while(!found && currentNode) {
            found = callback(currentNode) === true ? true : false;
            if (!found) {
                queue.push(...currentNode.children)
                currentNode = queue.shift();
            }
        }
    }


    contains(callback, traversal) {
        traversal.call(this, callback);
    }
    add(data, toData, traversal) {
        let node = new Node(data)
        if (this._root === null) {
            this._root = node;
            return this;
        }
        let parent = null,
            callback = function(node) {
                if (node.data === toData) {
                    parent = node;
                    return true;
                }
            };
        this.contains(callback, traversal);
        if (parent) {
            parent.children.push(node);
            node.parent = parent;
            let pointer = node;
            let count = 0;
            while(pointer != null){
                pointer = pointer.parent;
                count++;
            }
            node.level = count;
            return this;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    }
    remove(data, fromData, traversal) {
        let parent = null,
            childToRemove = null,
            callback = function(node) {
                if (node.data === fromData) {
                    parent = node;
                    return true;
                }
            };
        this.contains(callback, traversal);
        if (parent) {
            let index = this._findIndex(parent.children, data);
            if (index < 0) {
                throw new Error('Node to remove does not exist.');
            } else {
                childToRemove = parent.children.splice(index, 1);
            }
        } else {
            throw new Error('Parent does not exist.');
        }
        return childToRemove;
    }
    _findIndex(arr, data) {
        let index = -1;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i].data === data) {
                index = i;
                break;
            }
        }
        return index;
    }

    findLevel(data,traversal){
        let target = null,
            callback = function(node) {
                if (node.data === data) {
                    target = node;
                    return true;
                }
            };
        this.contains(callback, traversal);
        if (target) {
            let level = 0;
            while(target != null){
                target = target.parent;
                level++;
            }
            return level;
        } else {
            throw new Error('Cannot find level');
        }
    }

    find(data,traversal){
        let target = null,
            callback = function(node) {
                if (node.data === data) {
                    target = node;
                    return true;
                }
            };
        this.contains(callback, traversal);
        if (target) {
            return target;
        } else {
            throw new Error('Cannot find node');
        }
    }

}
// let s = new MultiwayTree();
// s.add(0,s.traverseBF).
// add(1,0,s.traverseBF);
// s.add(2,0,s.traverseBF);
// s.add(3,0,s.traverseBF);
// s.add(4,1,s.traverseBF);
// s.add(5,1,s.traverseBF);
// s.add(6,1,s.traverseBF);
// s.add(7,2,s.traverseBF);
// s.add(8,2,s.traverseBF);

// let resss = s.findLevel(4,s.traverseBF);
// console.log(resss)
// let te = s.find(4,s.traverseBF);
//for(let s1 of te.children){
    //console.log(s1.data)
//}
//s.remove(1,0,s.traverseBF);

//console.log(te.level)
// let r = new Set()
// r.add({a:"a",b:"b"});
// r.add({a:1,b:2});
// r.add({a:"a",b:"b"});
// r.add("1");
// r.add(1);
// r.add("1")
// //console.log(r)
// s.contains(function (node){
//     //console.log(node.data);
//     return false;
// },s.traverseBF)

function sym(...args) {
    console.log(...args)
    return args.reduce((total, current)=>{
        let diff = total.filter(x=>!current.includes(x)).concat(current.filter(x=>!total.includes(x)));
        let intersection = total.filter(function (val) { return current.indexOf(val) > -1 })
        // return Array.from(new Set([...diff]));
        return Array.from(new Set(intersection))
    });
}


/*
*nodeProps:属性节点的相关配置属性
*node：当前节点信息
*parentNode：父节点信息
*
*/
const
    generatePonint = (nodeProps, node, parentNode) => {
        let nodeWidth = nodeProps.nodeWidth;            //节点宽度
        let nodeHeight = nodeProps.nodeHeight;          //节点高度
        let levelHeight = nodeProps.levelHeight;        //节点与父节点间的间距
        let distance = nodeProps.distance;              //节点与兄弟节点间的间距
        let parentX = nodeProps.width / 2;              //父节点横坐标
        let parentY = -levelHeight - nodeHeight / 2;    //父节点纵坐标
        let nodeIndex = 0;                              //节点位于兄弟节点间的位置
        let nodeNum = 1;                                //兄弟节点个数
        if (parentNode) {
            nodeIndex = parentNode.children.findIndex(item => item.data == node.data);
            nodeNum = parentNode.children.length;
            parentX = parentNode.x;
            parentY = parentNode.y;
        }
        node.y = parentY + nodeHeight + levelHeight;
        node.x = parentX - (nodeNum * nodeWidth + (nodeNum - 1) * distance) / 2 + nodeIndex * (nodeWidth + distance) + nodeWidth / 2;
        //nodeProps.width = node.x;
        if (node.children && node.children.length > 0) {
            let childLength = node.children.length;
            for (let i = 0; i < childLength; i++) {
                generatePonint(nodeProps, node.children[i], node);
            }
        }
        return node;
    }

//获取当前节点的父节点
const
    getParentNode = (node, root) => {
        //如果当前节点为根节点直接返回null
        if (node.data === root.data) {
            return null;
        }
        if (root.children && root.children.length > 0) {
            for (let child of root.children) {
                if (child.data === node.data) {
                    return root;
                } else {
                    let parentNode = getParentNode(node, child);
                    if (parentNode) {
                        return parentNode;
                    }
                }
            }
        }
        return null;
        //return node.parent;
    }

//获取相同深度的节点列表
const
    getlevelNode = (level, root, list) => {
        if (root.level === level) {
            list.push(root);
            return list;
        }
        if (root.children && root.children.length > 0) {
            for (let node of root.children) {
                getlevelNode(level, node, list)
            }
        }
        return list
    }

//获取直系二代祖先节点
const
    getSameAncestorsNode = (node, nextNode, root) => {
        let parentNode = getParentNode(node, root);
        let nextParentNode = getParentNode(nextNode, root);
        if (parentNode.data == nextParentNode.data) {
            return node;
        } else {
            return getSameAncestorsNode(parentNode, nextParentNode, root);
        }
    }

//获取祖宗节点
const
    getAncestorsNode = (node, root) => {
        let parentNode = getParentNode(node, root);
        if (parentNode) {
            if (parentNode.data == root.data) {
                return node;
            } else {
                let ancestorsNode = getAncestorsNode(parentNode, root);
                if (ancestorsNode) {
                    return ancestorsNode;
                }
            }
        }
    }

//获取兄弟节点
const
    getBrotherNode = (node, root) => {
        let parentNode = getParentNode(node, root);
        if (parentNode) {
            return parentNode.children;
        }
    }

//节点偏移
const
    offsetPoint = (nodeProps, node, root) => {
        //console.log("ggg")
        let brotherList = getlevelNode(node.level, root, []);
        let nodeDiffer = nodeProps.nodeWidth + nodeProps.distance;
        let nodeIndex = brotherList.findIndex(item => item.data === node.data);
        let nextNode = brotherList[nodeIndex + 1];
        if (nextNode) {
            let nextParentNode = getParentNode(nextNode, root);
            let parentNode = getParentNode(node, root);
            //判断重叠，只需判断不同父节点的相邻2个节点是否在固定节点宽度内
            if (nextParentNode && parentNode && nextParentNode.data != parentNode.data && nextNode.x - node.x < nodeDiffer) {

                let offsetValue = node.x - nextNode.x + nodeDiffer;//相邻2个节点需要的偏移量
                //查找2重复节点的共同祖先,并在共同祖先下查找当前节点共同祖先的第二代节点
                let sameAncestorsNode = getSameAncestorsNode(node, nextNode, root);
                if (sameAncestorsNode) {
                    //将当前节点共同祖先的第二代节点层次偏移，第二代节点及其左边的节点向左偏移，其他的向右偏移
                    //例如当前节点的第二代祖先层级为3，同层坐标为1，那么层级为3的0,1节点左移,其他节点右移
                    offsetNodeAndChildPoint(sameAncestorsNode, root, offsetValue);
                    //因为上面已经把底层节点全部移动了，而当前祖先节点位置居中，所以，当前节点的所有父级暂时不动其他父节点对应移动
                    offsetParentPoint(sameAncestorsNode, root, offsetValue);
                    //因为右边的节点全部右移了,导致位置不居中，所以当前节点及其左边的节点向左移动(包含子节点)
                    offsetParenAndChildtPoint(sameAncestorsNode, root, offsetValue);
                }
            }
        }
        // return root;
    }

//子节点偏移
const
    offsetChildPoint = (node, root, offsetValue, pos) => {
        if (node.children && node.children.length > 0) {
            for (let child of node.children) {
                if (pos == "left") {
                    child.x = child.x - offsetValue / 2;
                    offsetChildPoint(child, root, offsetValue, pos)
                } else {
                    child.x = child.x + offsetValue / 2;
                    offsetChildPoint(child, root, offsetValue, pos)
                }
            }
        }
    }


const
    offsetNodeAndChildPoint = (node, root, offsetValue) => {
        let brotherList = getlevelNode(node.level, root, []);
        let nodeIndex = brotherList.findIndex(item => item.data === node.data);
        for (let i = 0; i < brotherList.length; i++) {
            if (nodeIndex == brotherList.length - 1) {
                if (i < nodeIndex) {
                    brotherList[i].x = brotherList[i].x - offsetValue / 2;
                    offsetChildPoint(brotherList[i], root, offsetValue, 'left');
                } else {
                    brotherList[i].x = brotherList[i].x + offsetValue / 2;
                    offsetChildPoint(brotherList[i], root, offsetValue, 'right');
                }
            } else {
                if (i <= nodeIndex) {
                    brotherList[i].x = brotherList[i].x - offsetValue / 2;
                    offsetChildPoint(brotherList[i], root, offsetValue, 'left');
                } else {
                    brotherList[i].x = brotherList[i].x + offsetValue / 2;
                    offsetChildPoint(brotherList[i], root, offsetValue, 'right');
                }
            }
        }
    }

//节点父节点偏移
const
    offsetParentPoint = (node, root, offsetValue) => {
        let parentNode = getParentNode(node, root);
        let brotherList = getlevelNode(parentNode.level, root, []);
        let nodeIndex = brotherList.findIndex(item => item.data === parentNode.data);
        for (let i = 0; i < brotherList.length; i++) {
            if (i < nodeIndex) {
                brotherList[i].x = brotherList[i].x - offsetValue / 2;
            } else if (i > nodeIndex) {
                brotherList[i].x = brotherList[i].x + offsetValue / 2;
            }
        }
        let grandfather = getParentNode(parentNode, root);
        if (grandfather) {
            offsetParentPoint(parentNode, root, offsetValue)
        }
    }


const
    offsetParenAndChildtPoint = (node, root, offsetValue) => {
        let parentNode = getParentNode(node, root);
        if (parentNode.data == root.data) {
            return;
        }
        let brotherList = getlevelNode(parentNode.level, root, []);
        let nodeIndex = brotherList.findIndex(item => item.data === parentNode.data);
        if (nodeIndex != 0) {
            return;
        }
        for (let i = 0; i < brotherList.length; i++) {
            if (nodeIndex == brotherList.length - 1) {
                if (i < nodeIndex) {
                    brotherList[i].x = brotherList[i].x - offsetValue / 2;
                    offsetChildPoint(brotherList[i], root, offsetValue, 'left');
                } else {
                    brotherList[i].x = brotherList[i].x + offsetValue / 2;
                    offsetChildPoint(brotherList[i], root, offsetValue, 'right');
                }
            } else {
                if (i <= nodeIndex) {
                    brotherList[i].x = brotherList[i].x - offsetValue / 2;
                    offsetChildPoint(brotherList[i], root, offsetValue, 'left');
                }
            }
        }
        let grandfather = getParentNode(parentNode, root);
        if (grandfather) {
            offsetParenAndChildtPoint(parentNode, root, offsetValue)
        }
    }

//获取最大深度
const
    getMaxlevel = (root) => {
        if (root) {
            let maxlevel = 1;
            if (root.children && root.children.length > 0) {
                for (let node of root.children) {
                    maxlevel = Math.max(maxlevel, getMaxlevel(node) + 1);
                    let nodeIndex = root.children.findIndex(item => item.data == node.data);
                    if (root.children[nodeIndex + 1]) {
                        maxlevel = Math.max(maxlevel, getMaxlevel(root.children[nodeIndex + 1]) + 1);
                    }
                }
            }
            return maxlevel;
        }
    }

//获取最大横坐标节点
const
    getMaxPointX = (root, maxPointX = 0) => {
        if (root) {
            maxPointX = Math.max(maxPointX, root.x);
            if (root.children && root.children.length > 0) {
                for (let node of root.children) {
                    maxPointX = getMaxPointX(node, maxPointX)
                }
            }
        }
        return maxPointX;
    }

//获取最小横坐标节点
const
    getMinPointX = (root, minPointX = 0) => {
        if (root) {
            minPointX = Math.min(minPointX, root.x);
            if (root.children && root.children.length > 0) {
                for (let node of root.children) {
                    minPointX = getMinPointX(node, minPointX)
                }
            }
        }
        return minPointX;
    }

//获取画布最大宽度
const
    getMaxCanvasWidth = (root, nodeProps) => {
        let rootX = root.x;
        let maxPointX = getMaxPointX(root, rootX);
        let minPointX = getMinPointX(root, rootX);
        let minX = Math.abs(minPointX - rootX - nodeProps.nodeWidth / 2);
        let maxCanvasWidth = Math.max(minX, maxPointX - rootX + nodeProps.nodeWidth / 2);
        return Math.ceil(maxCanvasWidth * 2);
    }

const
    getMaxCanvasHeight = (root, nodeProps) => {
        let maxlevel = getMaxlevel(root);
        let maxHeight = nodeProps.nodeHeight * maxlevel + nodeProps.levelHeight * (maxlevel - 1);
        return Math.ceil(maxHeight);
    }

//为节点添加x，y坐标
function dealData(canvas, treeData, nodeSetting, scale) {
    const width = canvas.width;
    const height = canvas.height;
    let nodeProps = {
        width: width,
        nodeWidth: nodeSetting.nodeWidth * scale,
        nodeHeight: nodeSetting.nodeHeight * scale,
        levelHeight: nodeSetting.levelHeight * scale,
        distance: nodeSetting.distance * scale
    }

    generatePonint(nodeProps, treeData._root, null);
    offsetRoot(nodeProps, treeData);
    let maxCanvasWidth = getMaxCanvasWidth(treeData, nodeProps);
    if (maxCanvasWidth > width) {
        canvas.width = maxCanvasWidth;
        this.dealData(canvas, treeData, nodeSetting, scale);
    }

    let maxCanvasHeight = getMaxCanvasHeight(treeData, nodeProps);
    if (maxCanvasHeight > height) {
        canvas.height = maxCanvasHeight;
        this.dealData(canvas, treeData, nodeSetting, scale);
    }
}

function offsetRoot(nodeProps,tree){

    tree.contains(function (node){
        offsetPoint(nodeProps,node,tree._root);

        return false;
    },s.traverseBF)
}
let canvas = {
    width : 1000,
    height: 1000
}
let setting = {
    nodeWidth: 2,
    nodeHeight: 1,
    levelHeight:1,
    distance:1,
}

// dealData(canvas,s,setting,1);
// s.contains(function (node){
//     //console.log("x+"+node.x);
//     //console.log("y+"+node.y)
//     //console.log(node.level)
//     return false;
// },s.traverseBF)
