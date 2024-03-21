/*
 * @Author: Wandayu 903298500@qq.com
 * @Date: 2023-11-16 11:29:41
 * @LastEditors: Wandayu 903298500@qq.com
 * @LastEditTime: 2023-11-16 11:34:37
 * @FilePath: \AR_Museum_Demo2\embedScene.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
window.onload = () => {
  // adjust the embedded scene
  document.querySelector("a-scene").style.width = "100vw";
  document.querySelector("a-scene").style.height = "100vh";

  // Web2VR withA-frame 1.2.0 embedded scene setting dynamic style size (not in the css file) doesnt render canvas scene.
  // We have to manuly trigger enterVR and exitVR to enable canvas scene rednering.
  document.querySelector("a-scene").enterVR();
  // because these are promise functions need to have small delay so they run in order
  setTimeout(() => {
    document.querySelector("a-scene").exitVR();
  }, 1);
};
