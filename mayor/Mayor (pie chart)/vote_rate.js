function vote_rate(city, year) {
    // set the dimensions and margins of the graph
    d3.select("#pie").selectAll("*").remove();
    var width = 450
    height = 450
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#pie")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var vote_rate = [];


    d3.csv("../mayor/Mayor (pie chart)/MayorElection.csv").then(data => {
        console.log(data);
        vote_rate['其他'] = 0;
        data.forEach(function (d) {
            d.voteNum = Number(d.voteNum);
            d.voteRate = Number(d.voteRate);

            if (d.year == year) { //////////////to be changed
                if (d.city == city) { /////////////////to be changed
                    if (d.party == '中國國民黨')
                        vote_rate[d.party] = d.voteRate;
                    else if (d.party == '民主進步黨')
                        vote_rate[d.party] = d.voteRate;
                    else {
                        vote_rate['其他'] = vote_rate['其他'] + d.voteRate;
                    }
                }
            }
        });
        console.log(vote_rate);

        var color = d3.scaleOrdinal()
            .domain(['中國國民黨', '民主進步黨', '其他'])
            .range(['blue', 'green', 'gray']);

        // Compute the position of each group on the pie:
        var pie = d3.pie()
            .value(function (d) { return d.value; })
        var data_ready = pie(d3.entries(vote_rate))
        console.log(data_ready);
        // Now I know that group A goes from 0 degrees to x degrees and so on.

        // shape helper to build arcs:
        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg.selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', function (d) { return (color(d.data.key)) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        // Now add the annotation. Use the centroid method to get the best coordinates
        svg.selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function (d) { return d.data.key + ":" + d.data.value + "%" })
            .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 17)
            .style("fill", "white")


    }
    ).catch(function (error) {
        console.log(error);
    });

    // set the color scale
}
