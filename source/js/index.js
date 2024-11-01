'use strict';

function selector (selector) {
  return document.querySelector(selector);
}

function listener (selector, event, callBack) {
  return selector.addEventListener(event, callBack);
}

class ColorPicker {
  constructor(colorList) {
    this.colorList = colorList;
    listener(window, 'load', () =>{
      this._value = this.colorList.value; 
      this._name = this.colorList.options[this.colorList.selectedIndex].text;
    });
    listener(this.colorList, 'change', () => {
      this._name = this.colorList.options[this.colorList.selectedIndex].text;
      this._value = this.colorList.value; 
    });
  }

  get value() {
      return this._value; 
  }

  get name() {
      return this._name;
  }
}

class ShapePicker {
  constructor(shapeList) {
    this.shapeList = shapeList;
    
    listener(window, 'load', () =>{
      this._value = this.shapeList.value; 
      this._name = this.shapeList.options[this.shapeList.selectedIndex].text;
    });

    listener(this.shapeList, 'change', () =>{
      this._value = this.shapeList.value; 
      this._name = this.shapeList.options[this.shapeList.selectedIndex].text;
    });
  }

  get value() {
      return this._value; 
  }

  get name() {
    return this._name;
  }
}

const parentBox = selector('.box-grid');
const colorSelect = selector('.pick-color');
const colorPicker = new ColorPicker(colorSelect);
const shapeSelect = selector('.pick-shape');
const shapePicker = new ShapePicker(shapeSelect);
function createShape() {
  let arrayBox = Array.from(parentBox.children);
  if (arrayBox.length < 24) {
    let color = colorPicker.value;
    let colorName = colorPicker.name;
    let shape = shapePicker.value;
    assemble(color, shape, colorName, arrayBox);
  } 
}

function assemble(color, shape, arrayBox) {
  const newBox = document.createElement("div");
  giveStyle(color, shape, newBox);
  parentBox.appendChild(newBox);//add the box to the parent
  arrayBox = Array.from(parentBox.children);//update array length
  printBoxStyle(arrayBox);
}

const textOutput = selector('.box-atribute');
function printBoxStyle(arrayBox) {
  arrayBox.forEach((box, index) => {
    listener(box, 'mouseover', () => {
      let color = colorPicker.name;
      let shape = shapePicker.name;
      textOutput.innerText = `Unit ${index + 1} ${shape} ${color}`;
    }); 
  });
}

function giveStyle(color, shape, newBox) {
  newBox.style.backgroundColor = color;
  if(shape === 'circle') newBox.style.borderRadius= '50px';
}

function getValue(select) {
  return select.value;
}

function getName(select) {
  return  select.options[select.selectedIndex].text;
}