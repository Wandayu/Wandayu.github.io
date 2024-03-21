/*
 * @Author: Wandayu 903298500@qq.com
 * @Date: 2023-11-21 11:11:59
 * @LastEditors: Wandayu 903298500@qq.com
 * @LastEditTime: 2023-11-21 16:40:28
 * @FilePath: \AR_Museum_Demo3\svgElements\svg.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
function drawSvg(body, id, debug = false) {
  const div = body
    .append("div")
    .style("position", "fixed")
    .style("top", "0")
    .style("left", "0")
    .style("z-index", debug ? "100" : "-100");

  const svg = div.append("svg").attr("id", id);

  return { svg };
}
