/*
 * @Author: Wandayu 903298500@qq.com
 * @Date: 2023-11-21 11:11:59
 * @LastEditors: Wandayu 903298500@qq.com
 * @LastEditTime: 2023-11-21 11:24:19
 * @FilePath: \AR_Museum_Demo3\svgElements\perimeter.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
function drawPerimeter(svg, svgSize, radius, arrowSize) {
  svg.attr("width", svgSize[0]).attr("height", svgSize[1]);

  const d = `
    M 0,5 A ${radius},${radius + 5} 0 0 0 ${2 * radius},5
    m -${arrowSize} ${arrowSize}
    l ${arrowSize} -${arrowSize}
    l ${arrowSize} ${arrowSize}`;

  const path = svg
    .append("path")
    .attr("d", d)
    .attr("stroke", "#fff")
    .attr("stroke-width", 4)
    .attr("fill", "none")
    .attr("stroke-dasharray", function () {
      return `${this.getTotalLength()} ${this.getTotalLength()}`;
    })
    .attr("stroke-dashoffset", function () {
      return this.getTotalLength();
    });

  const text = svg
    .append("text")
    .attr("alignment-baseline", "hanging")
    .attr("text-anchor", "middle")
    .attr("x", radius)
    .attr("y", radius + 10)
    .attr("font-size", 10)
    .attr("font-weight", 700)
    .attr("fill", "#fff")
    .text("");

  return { path, text };
}
