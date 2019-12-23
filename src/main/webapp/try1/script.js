var svg = d3.select("svg"),
	width = +svg.attr("width"),
	height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

d3.json("data.json", function (error, graph) {
	if (error) throw error;

	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function (d) {
			return d.id;
		}))
		.force('charge', d3.forceManyBody().strength([-2000]))
		.force("center", d3.forceCenter(width / 2.5, 800));

		var link = svg.append("g")
			.selectAll("line")
			.data(graph.links)
			.enter().append("line")
			.attr("class", "links");

	var node = svg.selectAll("g")
		.attr("class", "nodes")
		.selectAll("g")
		.data(graph.nodes)
		.enter().append("circle")
		.attr("class", "circle")
		//		.attr("x", -100)
		//		.attr("y", -25)
		//		.attr("width", 200)
		//		.attr("height", 50)
		.attr("r", 60)
		.style("fill", function (d) {
			return color(d.group);
		})
		.style("opacity", "0.2")
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			//			.on("end", dragended)
		)
		.on("dblclick", connectedNodes);

	node.append("title")
		.attr("class", "title")
		.text(function (d) {
			return d.id;
		});

	//	var node1 = svg.selectAll("g")
	//		.attr("class", "nodes")
	//		.selectAll("g")
	//		.data(graph.nodes)
	//		.enter().append("g");

	//		node1.append("rect")
	//			.attr("class", "rect")
	//			.attr("width", 300)
	//			.attr("height", 100)
	//			.style("fill", "red")
	//			.call(d3.drag()
	//				.on("start", dragstarted)
	//				.on("drag", dragged)
	//				//			.on("end", dragended)
	//			)
	//			.on("dblclick", connectedNodes);
	//	var content = "var ol = \"aaa\"\nvar b;\n\nvar c;";
	//	var inp = node1.append('g').append("foreignObject")
	//		.attr("width", 340)
	//		.attr("height", 120)
	//		.attr("id", "test")		
	//		.attr("x", -100)
	//		.attr("y", -25)
	//		.append("xhtml:body")
	//		.append('textarea')
	//		.attr("id", function (d) {
	//			return d.nodeid;
	//		})
	//		.text(content);
	//
	//	for (i = 1; i < 12; i++) {
	//		var bik = (i);
	//		console.dir(bik);
	//		  var myTextArea = document.getElementById("node" + i);
	//				var editor = CodeMirror.fromTextArea(myTextArea, {
	//					lineNumbers: true,
	//					mode: 'javascript',
	//					theme: 'material'
	//				});
	//	}
	//	node1.append("text")
	//		.text(document.getElementById("test").textContent)
	//		.attr("id", "nodetext");
	//		.attr("x", 50)
	//		.attr("y", 100)
	//		.style("stroke", "blue");
	//	
	//var bik = (nodetext[0]);
	//	console.log(document.getElementById("test").textContent);
	//	
	//	var myTextArea = document.getElementById("texts");
	//	var editor = CodeMirror.fromTextArea(myTextArea, {
	//		lineNumbers: true,
	//		mode: 'javascript',
	//		theme: 'material'
	//	});
	//	

	simulation
		.nodes(graph.nodes)
		.on("tick", ticked);

	simulation.force("link")
		.links(graph.links)
		//		.gravity(0.3)
		.distance([280]);



	//	var statusbox = svg.selectAll(".node")
	//		.data(graph.nodes)
	//		.enter().append("rect")
	//		.attr("class", "node")
	//		.attr("width", 20)
	//		.attr("height", 35)
	//		.style("fill", "red")


	function ticked() {

		link
			.attr("x1", function (d) {
				return d.source.x;
			})
			.attr("y1", function (d) {
				return d.source.y;
			})
			.attr("x2", function (d) {
				return d.target.x;
			})
			.attr("y2", function (d) {
				return d.target.y;
			});

		node.attr("cx", function (d) {
				return d.x = Math.max(60, Math.min(width - 60, d.x));
			})
			.attr("cy", function (d) {
				return d.y = Math.max(60, Math.min(height - 60, d.y));
			});
		//		node1.attr("transform", function (d) {
		//			return "translate(" + d.x + "," + d.y + ")";
		//		})

	};




	//---Insert-------
	svg.append("defs").selectAll("marker")
		.data(["Type1", "Type2", "Type3"])
		.enter().append("marker")
		.attr("id", function (d) {
			return d;
		})
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", -55)
		.attr("refY", 0)
		.attr("markerWidth", 10)
		.attr("markerHeight", 10)
		.attr("orient", "auto")
		.append("path")
		.attr("d", "M0,-5L10,0L0,5")
		//		.attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
		.style("opacity", "0.6");

	//	svg.append("defs").selectAll("marker")	
	//	.data(["Type1", "licensing", "resolved"])
	//		.enter().append("marker")
	//		.attr("id", function (d) {
	//			return d;
	//		})
	//		.attr("viewBox", "0 -5 10 10")
	//		.attr("refX", 40)
	//		.attr("refY", 0)
	//		.attr("markerWidth", 10)
	//		.attr("markerHeight", 10)
	//		.attr("orient", "auto")
	//		.append("path")
	//		.attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
	//		.style("stroke", "red")
	//		.style("opacity", "1");
	//	
	//---Insert-------

	//Toggle stores whether the highlighting is on
	var toggle = 0;

	//Create an array logging what is connected to what
	var linkedByIndex = {};
	for (i = 0; i < graph.nodes.length; i++) {
		linkedByIndex[i + "," + i] = 1;
	};
	graph.links.forEach(function (d) {
		linkedByIndex[d.source.index + "," + d.target.index] = 1;
	});

	//This function looks up whether a pair are neighbours  
	function neighboring(a, b) {
		return linkedByIndex[a.index + "," + b.index];
	}

	function connectedNodes() {

		if (toggle == 0) {
			//Reduce the opacity of all but the neighbouring nodes
			d = d3.select(this).node().__data__;
			node.style("opacity", function (o) {
				return neighboring(d, o) | neighboring(o, d) ? 1 : 0.2;
			});

			link.style("opacity", function (o) {
				return d.index == o.source.index | d.index == o.target.index ? 1 : 0.1;
			});

			//			edgelabels.style("opacity", function (o) {
			//				return d.index == o.source.index | d.index == o.target.index ? 1 : 0.1;
			//			});

			//Reduce the op

			toggle = 1;
		} else {
			//Put them back to opacity=1
			node.style("opacity", 1);
			link.style("opacity", 1);
			//			edgelabels.style("opacity", 1);
			toggle = 0;
		}

	}
	//---End Insert---

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}
});
