function drawInfos(svg, svgSize, rectSize, margin) {
  svg.attr("width", svgSize[0]).attr("height", svgSize[1]);

  let heightAcc = 0;
  const groups = svg
    .selectAll("g")
    .data(rectSize)
    .enter()
    .append("g")
    .attr("transform", (d) => {
      const y = heightAcc;
      heightAcc += d[1] + margin;
      return `translate(0, ${y})`;
    });

  const results = { rects: [], texts: [] };
  groups
    .append("rect")
    .attr("x", (d) => svgSize[0])
    .attr("y", 0)
    .attr("width", 0)
    .attr("height", (d) => d[1])
    .attr("fill", "#333")
    .attr("opacity", 0.4)
    .each(function (d) {
      results.rects.push(this);
    });

  groups
    .append("text")
    .attr("alignment-baseline", "hanging")
    .attr("text-anchor", "end")
    .attr("x", svgSize[0] - 10)
    .attr("y", 8)
    .attr("font-size", 10)
    .attr("font-weight", 700)
    .attr("fill", "#fff")
    .text("")
    .each(function (d) {
      results.texts.push(this);
    });

  return results;
}
