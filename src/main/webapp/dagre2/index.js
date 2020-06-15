// import G6 from '@antv/g6';
// const G6 = require('@antv/g6');
// node data
var Util = G6.Util;

//
//'tool.minimap' 缩略图
//
const plugin = new G6.Plugins['layout.dagre']({
    align: 'DL',
    rankdir: 'LR',
    nodesep: 50,
    ranksep: 150,
});
const minimap = new G6.Plugins['tool.minimap']({});


G6.registerNode('customNode', {
    cssSize: true, // 不使用内部 size 作为节点尺寸
    getHtml: function(cfg) {
        const model = cfg.model;
        const node_container = Util.createDOM('<div class="node-conatiner"></div>');
        const title = Util.createDOM(`<div class="node-conatiner-title node-conatiner-${model.group}">${model.desc}</div>`);
        node_container.appendChild(title);
        require(['vs/editor/editor.main'], function() {
            // const node_container = document.getElementById('container');
            var item_id = model.id;
            var item_code = model.code;
            const item_dom = Util.createDOM(`<div class="bikesh_node" id="node_` + item_id + `"></div>`);
            node_container.appendChild(item_dom);
            var editor = monaco.editor.create(item_dom, {
                value: item_code,
                language: 'java',
            });
        });
        return node_container;

    }
}, 'html');
//
//

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 1500;
const graph = new G6.Net({
    id: 'container',
    grid: null,
    width: width, // 画布宽
    height: height, // 画布高
    plugins: [plugin],
    //	 mode: 'analysis',

});
const graphContainer = graph.get('graphContainer'); //获取图表内部容器
//		graphContainer.oncontextmenu = function(e) {
//			return false;
//		} //阻止默认右键菜单
graph.on('contextmenu', ev => { // 鼠标右键点击事件
    console.log("type:", ev.itemType);
    console.log(ev);
});
// graph.on('node:mousedown', ev => { //单击显示

//     console.log("type:", ev.itemType);
//     console.log(ev);

//     const item = ev.item;
//     editor1.getDoc().setValue(item._attrs.model.code);
//     var d = item._attrs.model.file_name.split("__CLDIFF__");

//     document.getElementById('alert1').textContent = d[1];

// });

//
//
//
//
// //
graph.removeBehaviour(['wheelZoom', 'resizeNode']);
//
graph.source(data.nodes, data.edges);
graph.node()
    .shape('customNode')
    .style({
        stroke: null, // 去除默认边框
        fillOpacity: 1
    });
graph.edge()
    .shape('arrow')
    .style({
        lineWidth: 5
    })
    .color('rgb(97, 183, 207)');
//
graph.tooltip({
    title: 'Node Info', // @type {String} 标题
    split: ': ', // @type {String} 分割符号
    dx: 10, // @type {Number} 水平偏移
    dy: 10 // @type {Number} 竖直偏移
});
graph.node().tooltip(['id', 'group']);
//
graph.render();
//
// // graph.changeData(data.nodes, data.edges);
//
//
//



//
// // $("g6-html-node-container").unbind("resize");