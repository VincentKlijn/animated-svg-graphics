window.onload = function() {

	// Select a random circuit
	var numberOfCircuits = 9;
	var selectedCircuit = Math.floor((Math.random() * numberOfCircuits) + 1);
	// Set the default animation time
	var animationTime = 2000;
	// get circuitDiv from DOM
	var circuitDiv = document.getElementById("circuit");
	
	// get random SVG
	d3.xml("SVG_Circuits/circuit" + selectedCircuit + ".svg", function(xml){
	
		// Create svg element from d3 XML
		var circuitImage = xml.documentElement;
	
		// Append circuit to container
		circuitDiv.appendChild(circuitImage);
	
		// Get all Paths from the SVG
		var svgPaths = circuitImage.getElementsByTagName("path");

		// For each SVG set of 2 paths, animate the Dash Array and Dash Offset Properties
		// As we have a black line with a color segment line on top, we need to do pairs of them
		for(var pathIndex = 0; pathIndex < svgPaths.length; pathIndex += 2) {
	
			// Get segmentLength for this svgPaths[pathIndex]
			// As the pair of them have equal length, we can simply use the index
			var segmentLength = parseInt(svgPaths[pathIndex].getTotalLength());
	
			// Animate length for the pair of them
			for(var setIndex = 0; setIndex <= 1; setIndex++) {
				d3.select(svgPaths[pathIndex + setIndex])
				  .style("stroke-dasharray", segmentLength)
				  .style("stroke-dashoffset", segmentLength)
				  .transition()
				  .delay(pathIndex*(animationTime/2))
				  .duration(animationTime)
				  .ease('linear')
				  .style("stroke-dashoffset", 0);
			}
		} 
	});
};