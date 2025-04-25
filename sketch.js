let input;
let slider;
let button;
let dropdown;
let iframe;
let yOffsets = [];
let isJumping = false;

function setup() { //這是一個設定函數,只會執行一次
  //產生一個畫布,充滿整個視窗,背景顏色為#8d99ae(買回來的畫圖紙)
  createCanvas(windowWidth, windowHeight);
  background('#8d99ae');
  //createCanvas(400,400);

  // 產生一個寬為 300, 高為 80 的輸入文字框, 並顯示在座標 (10, 10)
  input = createInput();
  input.size(300, 80);
  input.position(10, 10);
  input.style('font-size', '30px');
  input.style('background-color', '#b298dc');
  input.value('🐈🍩🐶🐈‍⬛🐟☃️');

  // 產生一個滑桿物件, 並顯示在座標 (380, 10), 寬為 100
  slider = createSlider(12, 30, 24);
  slider.position(480, 25);
  slider.style('width', '200px');

  // 產生一個按鈕物件, 並顯示在座標 (700, 10)
  button = createButton('跳動');
  button.position(720, 10);
  button.style('background-color', '#b298dc');
  button.style('font-size', '24px');
  button.mousePressed(buttonPressed);

  // 產生一個下拉式選單, 並顯示在座標 (800, 10)
  dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(200);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('HackMD');
  dropdown.changed(dropdownChanged);
  dropdown.style('background-color', '#b298dc'); // 設置下拉式選單的背景顏色

  // 產生一個 iframe, 並顯示在視窗中間
  iframe = createElement('iframe');
  iframe.position(60, 60);
  iframe.style('border', 'none');
  iframe.style('background-color', '#b298dc');
  iframe.size(windowWidth - 120, windowHeight - 120);
  iframe.attribute('src', 'https://www.tku.edu.tw/');
}

function draw() {
  background('#8d99ae'); // 清除背景
  let textSizeValue = slider.value(); // 根據滑桿的值設置文字大小
  textSize(textSizeValue);
  textAlign(LEFT, TOP);
  fill(255);
  stroke(0);
  strokeWeight(1);

  let textString = input.value(); // 從輸入框中獲取文字
  let x = 0;
  let y = 100; // 從 y 座標 100 開始

  let lineIndex = 0;
  while (y < windowHeight) {
    x = 0;
    let yOffset = yOffsets[lineIndex] || 0;
    while (x < windowWidth) {
      text(textString, x, y + yOffset);
      x += textWidth(textString) + 10; // 每串文字中間空 10 像素
    }
    y += textAscent() + textDescent() + 20; // 行與行之間空 20 像素
    lineIndex++;
  }

  if (isJumping) {
    for (let i = 0; i < yOffsets.length; i++) {
      yOffsets[i] = random(-5, 5);
    }
  }
}

function buttonPressed() {
  isJumping = !isJumping;
  if (!isJumping) {
    yOffsets = [];
    let y = 100;
    while (y < windowHeight) {
      yOffsets.push(0);
      y += textAscent() + textDescent() + 20;
    }
  }
}

function dropdownChanged() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === 'HackMD') {
    iframe.attribute('src', 'https://hackmd.io/@elisaa/BkARcbWn1l');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 120, windowHeight - 120);
}