const buttonElements = document.querySelectorAll("button");
const operatorElements = document.querySelectorAll(".operator");
const inputElement = document.querySelector(".input-text");
// const primitive
const pOperators = "%()√^";

let test = "hello";
let isEmpty = true;
function clickButton(button) {
  const buttonContent = button.innerText;
  if (
    buttonContent !== "DEL" &&
    buttonContent !== "AC" &&
    buttonContent !== "=" &&
    isEmpty === true
  ) {
    inputElement.value += buttonContent;
    console.log(inputElement.value);
  } else if (isEmpty === false) {
    inputElement.value = "";
    inputElement.value += buttonContent;
    isEmpty = true;
  }
}

//percent Must Varibles
let percentList = [];
let temp = "";
let result = 1;
let percentCount = 1;
function calculate() {
  //special operators
  if (haveCommonCharacter(pOperators, inputElement.value)) {
    for (let i = 0; i < inputElement.value.length; i++) {
      if (inputElement.value[i] === "%") {
        getPercent(inputElement, i);
      } else if (inputElement.value[i] === "^") {
        getExponent(inputElement, i);
      }
    }
  } else {
    //primitive operators
    //calculate using eval
    inputElement.value = eval(inputElement.value);
    isEmpty = false;
  }
}

function getExponent(inputElement, i) {}

function getPercent(inputElement, i) {
  //push the collected str to the array
  for (let j = 0; j < inputElement.value.length; j++) {
    if (inputElement.value[j] === "%") {
      if (temp !== "") {
        percentList.push(temp);
        temp = "";
      }
      percentCount *= 100;
    }
    //collecting numbers before percent
    if (inputElement.value[j] !== "%") {
      temp += inputElement.value[j];
    }
  }
  //pushing the last element to list
  if (temp !== "") {
    percentList.push(temp);
    temp = "";
  }

  //dealing with multiplication
  for (let j = 0; j < percentList.length; j++) {
    result = result * percentList[j];
  }
  result /= percentCount;
  inputElement.value = result;
  percentList = [];
  result = 1;
  percentCount = 1;
  isEmpty = false;
  return;
}

function haveCommonCharacter(str1, str2) {
  for (let i = 0; i < str1.length; i++) {
    if (str2.includes(str1[i])) {
      return true;
    }
  }
  return false;
}

function clearAll() {
  inputElement.value = "";
  percentList = [];
  temp = "";
}

function deleteChar() {}
if (expression[i] === "%") {
  if (expression[i + 1] !== undefined) {
    if (!percentDone) {
      result *= expression[i - 1] * expression[i + 1];
      percentDone = true;
    } else {
      result *= expression[i + 1];
    }
  } else if (i < 1) {
    result = expression[i - 1] / 100;
    inputElement.value = result;
    return;
  }
  result /= 100;
  inputElement.value = result;