/*
 * @Author: Wandayu 903298500@qq.com
 * @Date: 2023-11-23 13:47:11
 * @LastEditors: Wandayu 903298500@qq.com
 * @LastEditTime: 2023-12-12 14:58:00
 * @FilePath: \AR_Museum_Demo3\svgElements\area.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
function drawArea(svg, svgSize, data) {
  svg.attr("width", svgSize[0]).attr("height", 0);
  const defs = svg.append("defs");

  const background = svg
    .append("rect")
    .attr("class", "background")
    .attr("width", svgSize[0])
    .attr("height", svgSize[1])
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

  const margin = {
    top: 40,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const group = svg.append("g").attr("id", "area");

  // Declare the x (horizontal position) scale.
  const xAxis = d3.scaleUtc(
    d3.extent(data, (d) => d.date),
    [margin.left, svgSize[0] - margin.right]
  );

  // Declare the y (vertical position) scale.
  const yAxis = d3.scaleLinear(
    [0, d3.max(data, (d) => d.value)],
    [svgSize[1] - margin.bottom, margin.top]
  );

  group
    .append("rect")
    .attr("id", "area-background")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", svgSize[0] - margin.left - margin.right)
    .attr("height", svgSize[1] - margin.top - margin.bottom)
    .attr("fill", "#fff")
    .attr("opacity", 0.8);

  group
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0,${svgSize[1] - margin.bottom})`)
    .call(
      d3
        .axisBottom(xAxis)
        .ticks(svgSize[0] / 80)
        .tickSizeOuter(0)
    )
    .call((g) => {
      g.selectAll(".tick text")
        .attr("fill", "#fff")
        .attr("font-size", 10)
        .attr("font-weight", 700);
    });
  group
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(
      d3.axisLeft(yAxis).tickSize(-(svgSize[0] - margin.left - margin.right))
    )
    .call((g) => {
      g.selectAll(".tick line")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-dasharray", "4,4");

      g.selectAll(".tick text")
        .attr("fill", "#fff")
        .attr("font-size", 10)
        .attr("font-weight", 700);
    });

  // 添加area-chart的clip-path
  defs
    .append("clipPath")
    .attr("id", "area-clip")
    .append("rect")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", 0)
    .attr("height", svgSize[1] - margin.top - margin.bottom);

  // 添加area-chart
  const area = group
    .append("g")
    .attr("id", "area-chart")
    .attr("clip-path", "url(#area-clip)");

  area
    .append("path")
    .datum(data)
    .attr("fill", "#439028")
    .attr("fill-opacity", 0.4)
    .attr(
      "d",
      d3
        .area()
        .x((d) => xAxis(d.date))
        .y0(yAxis(0))
        .y1((d) => yAxis(d.value))
    );

  area
    .append("path")
    .datum(data)
    .attr("stroke", "#439028")
    .attr("stroke-width", 4)
    .attr(
      "d",
      d3
        .line()
        .x((d) => xAxis(d.date))
        .y((d) => yAxis(d.value))
    )
    .attr("fill", "none");

  return { title };
}

async function playArea(svg, svgSize) {
  await svg.transition().duration(500).attr("height", svgSize[1]).end();

  svg
    .select("#area-clip rect")
    .transition()
    .duration(1200)
    .attr("width", svgSize[0] - 40);
}
