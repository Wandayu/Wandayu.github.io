/*
 * @Author: Wandayu 903298500@qq.com
 * @Date: 2023-11-21 11:11:59
 * @LastEditors: Wandayu 903298500@qq.com
 * @LastEditTime: 2023-11-21 11:59:52
 * @FilePath: \AR_Museum_Demo3\svgElements\height.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
function drawHeight(svg, svgSize, arrowSize) {
  svg.attr("width", svgSize[0]).attr("height", svgSize[1]);

  const d = `
    M ${svgSize[0] / 2 - arrowSize} ${svgSize[1] - arrowSize - 5}
    l ${arrowSize} ${arrowSize}
    l ${arrowSize} -${arrowSize}
    M ${svgSize[0] / 2} ${svgSize[1] - 5}
    l 0 -${svgSize[1] - 10}
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
    .attr("text-anchor", "end")
    .attr("x", svgSize[0] / 2 - 10)
    .attr("y", svgSize[1] / 2)
    .attr("font-size", 10)
    .attr("font-weight", 700)
    .attr("fill", "#fff")
    .text("");

  return { path, text };
}
