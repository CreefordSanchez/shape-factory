'use strict';

function selector (selector) {
  return document.querySelector(selector);
}

function listener (selector, event, callBack) {
  return selector.addEventListener(event, callBack);
}

const selectTag = document.querySelectorAll('select');
class Shape {
  constructor(colorList, shapeList) {
    this.colorList = colorList;
    this.shapeList = shapeList;

    listener(window, 'load', () =>{
      this.updateValues();
    });

    selectTag.forEach(select => {
      listener(select, 'change', () => {
        this.updateValues();
      });
    });
  }

  updateValues() {
    this._value = this.colorList.value; 
    this._shapeName = this.shapeList.options[this.shapeList.selectedIndex].text;
    this._colorName = this.colorList.options[this.colorList.selectedIndex].text;
  }

  get value() {
    return this._value;
  }

  get shapeName() {
    return this._shapeName;
  }

  get colorName() {
    return this._colorName;
  }
}

const parentBox = selector('.box-grid');
const colorSelect = selector('.pick-color');
const shapeSelect = selector('.pick-shape');
const characteristic = new Shape(colorSelect, shapeSelect);
function createShape() {
  let arrayBox = Array.from(parentBox.children);
  if (arrayBox.length < 24) {
    let color = characteristic.value;
    let shape = characteristic.shapeName;
    assemble(color, shape, arrayBox);
  } 
}

function assemble(color, shape, arrayBox) {
  const newBox = document.createElement("div");
  giveStyle(color, shape, newBox);
  parentBox.appendChild(newBox);//add the box to the parent
  arrayBox = Array.from(parentBox.children);//update array length
  giveAttribute(newBox, shape)//give color and shape name to be print
  printBoxStyle(arrayBox, shape);
}

function giveAttribute(newBox, shape) {
  let color = characteristic.colorName;
  newBox.setAttribute("data-value", `${color} ${shape}`);
}

const textOutput = selector('.box-atribute');
function printBoxStyle(arrayBox) {
  arrayBox.forEach((box, index) => {
    listener(box, 'mouseover', () => {
      textOutput.innerText = `Unit ${index + 1} ${box.dataset.value}`;
    }); 
  });
}

function giveStyle(color, shape, newBox) {
  newBox.style.backgroundColor = color;
  if(shape === 'Circle') newBox.style.borderRadius= '50px';
}

function getValue(select) {
  return select.value;
}

function getName(select) {
  return  select.options[select.selectedIndex].text;
}