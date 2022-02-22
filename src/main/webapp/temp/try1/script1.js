var svg = d3.select("svg"),
	width = +svg.attr("width"),
	height = +svg.attr("height"),
	rec_width = 300,
	rec_height = 100;

var color = d3.scaleOrdinal(d3.schemeCategory20);



d3.json("graph.json", function (error, graph) {
	if (error) throw error;

	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function (d) {
			return d.id;
		}))
		.force("charge", d3.forceManyBody().strength(-100))
		.force('collide', d3.forceCollide(200).strength(1.5).iterations(3))
		.force("center", d3.forceCenter(600, 600));

	var link = svg.append("g")
		.selectAll("line")
		.data(graph.links)
		.enter().append("line")
		.attr("class", function (d) {
			return "link " + d.type;
		})
		//		.attr("marker-start", function (d) {
		//			return "url(#" + d.type + ")";
		//		})
		.attr("marker-end", function (d) {
			return "url(#" + d.type + ")";
		});

	var node = svg.selectAll("g")
		.attr("class", "nodes")
		.selectAll("g")
		.data(graph.nodes)
		.enter().append("rect")
		.attr("class", "rect")
		.attr("width", rec_width)
		.attr("height", rec_height)
		.style("opacity", "0.4")
		.attr("fill", "red")
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended)
		);
	//			.on("dblclick", connectedNodes);
	var node1 = svg.append("g")
		.attr("class", "nodes")
		.selectAll("g")
		.data(graph.nodes)
		.enter()
	.append("g")
	
//		.attr("class", "circle")
//		.attr("r", "100")
////		.attr("width", rec_width)
////		.attr("height", rec_height)
//		.style("opacity", "0.4")
//		.attr("fill", "blue")
//		.call(d3.drag()
//			.on("start", dragstarted)
//			.on("drag", dragged)
//			.on("end", dragended)
//		);

	simulation
		.nodes(graph.nodes)
		.on("tick", ticked);

	simulation.force("link")
		.links(graph.links)
		.distance([300]);

	function ticked() {
		link
			.attr("x1", function (d) {
				return d.source.x + 150;
			})
			.attr("y1", function (d) {
				return d.source.y + 50;
			})
			.attr("x2", function (d) {
				return d.target.x + 150;
			})
			.attr("y2", function (d) {
				return d.target.y + 50;
			});


		node
			.attr("x", function (d) {
				return d.x = Math.max(5, Math.min(width - 300, d.x));
			})
			.attr("y", function (d) {
				return d.y = Math.max(5, Math.min(height - 100, d.y));
			})
			
		

		node1
			.attr("x", function (d) {
				return d.x = Math.max(5, Math.min(width - 300, d.x));
			})
			.attr("y", function (d) {
				return d.y = Math.max(5, Math.min(height - 100, d.y));
			})
	}

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
		if (!d3.event.active) simulation.alphaTarget(0).stop();
		d.fx = null;
		d.fy = null;
	}
});
