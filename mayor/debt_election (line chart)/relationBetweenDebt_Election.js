const FWith = 600, FHeight = 400;
const FLeftTopX = 50, FLeftTopY = 80;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT)
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM)

const svg = d3.select("#chart-area").append("svg")
            .attr("width", 2000)
            .attr("height", 1000)

const g = svg.append("g")
            .attr("transform", `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`)



//Read the data
var debt = [];

d3.csv("DebtData.csv").then(data=>{
    console.log(data);
    data.forEach(function(d){
        d.debtInOneYear = Number(d.debtInOneYear);
        d.debtOverOneYear = Number(d.debtOverOneYear);

          if(d.city == '桃園市'){ /////////////////to be changed
              var elec = 0;
              if((d.year - 103)%8 > 3)
                elec = 1;
              debt.push({name: "inOneYear", year: d.year, value: d.debtInOneYear, elec_section: elec});
              debt.push({name: "overOneYear", year: d.year, value: d.debtOverOneYear, elec_section: elec});
          }
  });
  console.log(debt);

  var sumstat = d3.group(debt, d => d.name);
  console.log(sumstat);

    // Add X axis
    var x = d3.scaleLinear()
                .domain([d3.min(data, d=>d.year)-1, 111])
                .range([0, 500])
                
    svg.append("g")
        .attr("transform", "translate(100,400)")
        .call(d3.axisBottom(x).ticks(8))
    svg.append("text")
        .attr("x", 300) 
        .attr("y", 450)
        .text("Year");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.debtInOneYear; })])
      .range([ 400, 0 ]);
    svg.append("g")
      .attr("transform", "translate(100,0)")
      .call(d3.axisLeft(y).ticks(10));
    svg.append("text")
      .attr("transform", "translate(20,150) rotate(80)")
      .text("Debt (NT$)");

    //add rect
    var rect_color = d3.scaleOrdinal()
      .domain([0, 1])
      .range(['yellow', 'orange']);

    tickArr = x.ticks(10),
    tickDistance = x(tickArr[tickArr.length - 1]) - x(tickArr[tickArr.length - 2]);
    console.log(tickDistance)

    svg.selectAll("rect")
        .data(debt)
        .enter()
        .append("rect")
        .attr("width", tickDistance)
        .attr("height", 400)
        .attr("x", d => x(d.year))
        .attr("y", 0)
        .attr("transform", "translate(100, 0)")
        .style("fill", d => rect_color(d.elec_section))
        .attr("opacity", 0.1)

    svg.append("rect")
        .attr("width", tickDistance)
        .attr("height", 400)
        .attr("transform", "translate(100, 0)")
        .style("fill", "orange")
        .attr("opacity", 0.1)
    svg.append('line')
        .attr('x1', x(103))
        .attr('y1', 400)
        .attr('x2', x(103))
        .attr('y2', 0)
        .attr("transform", "translate(100, 0)")
        .style('stroke', 'gray')
        .style('stroke-width', 5);
      svg.append('line')
        .attr('x1', x(107))
        .attr('y1', 400)
        .attr('x2', x(107))
        .attr('y2', 0)
        .attr("transform", "translate(100, 0)")
        .style('stroke', 'gray')
        .style('stroke-width', 5);
      svg.append("text")
        .attr("x", x(107))
        .attr("y", 30)
        .attr("transform", "translate(50, 0)")
        .text("Election held!")
      svg.append("text")
        .attr("x", x(103))
        .attr("y", 30)
        .attr("transform", "translate(50, 0)")
        .text("Election held!")

    // // Add the line
    var color = d3.scaleOrdinal()
        .domain(['inOneYear', 'overOneYear'])
        .range(['blue', 'red']);

    svg.selectAll(".line")
         .data(sumstat)
         .join("path")
         .attr("transform", "translate(100,0)")
           .attr("fill", "none")
           .attr("stroke", function(d){ return color(d[0]) })
           .attr("stroke-width", 3.0)
           .attr("d", function(d){
             return d3.line()
               .x(function(d) { return x(d.year); })
               .y(function(d) { return y(d.value); })
               (d[1])
           })

    //append circle 
    svg.selectAll("circle")
        .data(debt)
        .enter()
        .append("circle")
        .attr("transform", "translate(100,0)")
        .attr("r", 6)
        .attr("cx", d => x(d.year))
        .attr("cy", d => y(d.value))
        .style("fill", d => color(d.name))

    //append legends
    var legend = svg.selectAll('g.legend')
    .data(sumstat)
    .enter()
    .append("g")
    .attr("class", "legend");

    legend.append("circle")
    .attr("cx", 700)
    .attr('cy', (d, i) => i * 30 + 350)
    .attr("r", 6)
    .style("fill", d => color(d[0]))

    legend.append("text")
    .attr("x", 720)
    .attr("y", (d, i) => i * 30 + 355)
    .text(d => d[0])

    
   
}
).catch(function(error){
console.log(error);
});