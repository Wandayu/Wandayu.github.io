function drawPie(svg, svgSize, radius, data) {
  svg.attr("width", svgSize[0]).attr("height", svgSize[1]);

  const background = svg
    .append("rect")
    .attr("class", "background")
    .attr("width", svgSize[0])
    .attr("height", 0)
    .attr("fill", "#333")
    .attr("opacity", 0.4);

  const title = svg
    .append("text")
    .attr("x", 10)
    .attr("y", 10)
    .attr("alignment-baseline", "hanging")
    .attr("text-anchor", "start")
    .attr("font-size", 10)
    .attr("font-weight", 700)
    .attr("fill", "#fff")
    .text("");

  const pieGenerator = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius)
    .cornerRadius(5);

  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.value)
    .padAngle(0.05);

  const pieData = pie(data);
  pieData.forEach((d) => {
    d.source = {};
    d.source.startAngle = 0;
    d.source.endAngle = 0;

    d.target = {};
    d.target.startAngle = d.startAngle;
    d.target.endAngle = d.endAngle;

    d.startAngle = 0;
    d.endAngle = 0;
  });
  console.log(pieData);

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(["#d1d646", "#84a521"]);

  const groups = svg
    .append("g")
    .attr("id", "pie")
    .attr("transform", `translate(${svgSize[0] / 2}, ${svgSize[1] / 2})`)
    .selectAll(".arc")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "arc");

  const arcs = groups
    .append("path")
    .attr("d", pieGenerator)
    .attr("fill", (d) => colorScale(d.data.name))
    .attr("stroke-width", 0)
    .attr("stroke", "#fff");

  const labels = groups
    .append("text")
    .text("")
    .attr("alignment-baseline", "middle")
    .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .attr("font-weight", 700)
    .attr("fill", "#333")
    .attr("transform", (d) => {
      const angle = (d.target.startAngle + d.target.endAngle - Math.PI) / 2;
      const x = Math.cos(angle) * (radius / 2 + 20);
      const y = Math.sin(angle) * (radius / 2 + 20);
      return `translate(${x}, ${y})`;
    });

  return { title, pieGenerator };
}

async function playPie(svg, svgSize, arcFunction) {
  const background = svg.select(".background");
  const arcs = svg.selectAll(".arc path");
  const labels = svg.selectAll(".arc text");

  await background.transition().duration(500).attr("height", svgSize[1]).end();
  await arcs
    .transition()
    .duration(800)
    .tween("data", (d) => {
      const startAngleInterpolate = d3.interpolate(
        d.source.startAngle,
        d.target.startAngle
      );
      const endAngleInterpolate = d3.interpolate(
        d.source.endAngle,
        d.target.endAngle
      );
      return (t) => {
        d.startAngle = startAngleInterpolate(t);
        d.endAngle = endAngleInterpolate(t);
      };
    })
    .attrTween("d", (d) => () => arcFunction(d))
    .attr("stroke-width", 4)
    .end();

  await labels
    .text((d) => `${d.data.name} - ${d.data.value}%`)
    .transition()
    .duration(800)
    .attr("font-size", 16)
    .end();
}
