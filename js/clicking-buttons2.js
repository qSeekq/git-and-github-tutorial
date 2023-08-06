const inputElement = document.querySelector(".input-text");
let expression = {
  expression: [],
  expressionIndex: -1,
  temp: "",

  negative: false,
  exponent: false,
};

let lastAnswer = "";

let terms = {
  numbersIndex: [],
  percentIndex: [],
  exponentIndex: [],
};

function clickButton(button) {
  const buttonContent = button.innerText;
  const allowed = "%(-)";
  if (!isNaN(buttonContent)) {
    inputElement.value += buttonContent;
    expression.temp += buttonContent;
    expression.negative = false;
    expression.exponent = false;
  } else {
    if (expression.temp !== "") {
      expression.expression.push(expression.temp);
      expression.expressionIndex++;
      terms.numbersIndex.push(expression.expressionIndex);
    }
    //if the character before this click is a number or is in allowed
    const lastElement = expression.expression[expression.expression.length - 1];
    if (
      allowed.includes(lastElement) ||
      !isNaN(lastElement) ||
      allowed.includes(buttonContent)
    ) {
      if (buttonContent === "-") {
        expression.expressionIndex++;
        if (expression.negative === false) {
          expressionUpdate(buttonContent);
          expression.negative = true;
        }
      } else if (buttonContent === "^") {
        if (expression.exponent === false) {
          expressionUpdate(buttonContent);
          inputElement.value += "(";
          expression.temp = "(";
          expression.expression.push(expression.temp);
          expression.temp = "";
          expression.expressionIndex += 2;
          expression.negative = false;
          expression.exponent = true;
          terms.exponentIndex.push(expression.expressionIndex);
        }
      } else {
        expression.expressionIndex++;
        expressionUpdate(buttonContent);
        expression.negative = false;
      }

      if (buttonContent === "%") {
        terms.percentIndex.push(expression.expressionIndex);
      }
    }
  }
  console.log(expression);
  console.log(terms);
}

function getResult() {
  let expressionStr = "";
  terms.exponentIndex.reverse();

  if (expression.temp !== "") {
    expression.expression.push(expression.temp);
    expression.expressionIndex++;
    terms.numbersIndex.push(expression.expressionIndex);
  }
  getPercent();
  getExponent();
  //making the expression list into string to eval it
  for (let i = 0; i < expression.expression.length; i++) {
    if (expression.expression[i] !== "%") {
      expressionStr += expression.expression[i];
    } else if (!isNaN(expression.expression[i + 1])) {
      expressionStr += "*";
    }
  }
  console.log(expression);
  console.log(expressionStr);
  resetExpression();
  inputElement.value = eval(expressionStr);
  expression.temp += eval(expressionStr);
  expression.expressionIndex++;
  lastAnswer = expression.temp;
}

function clearAll() {
  inputElement.value = "";
  resetExpression();
}

function resetExpression() {
  expression = {
    expression: [],
    expressionIndex: -1,
    temp: "",
    parenthesisExpression: "",

    negative: false,
  };

  terms = {
    numbersIndex: [],
    percentIndex: [],
    exponentIndex: [],
  };
}

function getLastAnswer() {
  inputElement.value = lastAnswer;
  expression.expressionIndex = 0;
  expression.expression = [lastAnswer];
  console.log(expression);
}

function deleteChar() {
  if (expression.temp !== "") {
    expression.expression.push(expression.temp);
    expression.temp = "";
  }
  if (expression.expression[expression.expression.length - 1] === "%") {
    terms.percentIndex.pop();
  }
  expression.expression.pop();
  expression.expressionIndex--;
  inputElement.value = expression.expression.join("");
  console.log(expression);
}

function getExponent() {
  let expressionStr = "";
  let a = 1;
  for (let z = 0; z < terms.exponentIndex.length; z++) {
    expression.expression[terms.exponentIndex[z] + a - 1] = "%";
    while (
      expression.expression[terms.exponentIndex[z] + a] !== ")" &&
      expression.expression[terms.exponentIndex[z] + a] !== undefined
    ) {
      expressionStr += expression.expression[terms.exponentIndex[z] + a];
      expression.expression[terms.exponentIndex[z] + a] = "%";
      console.log(expressionStr);
      a++;
    }
    expression.expression[terms.exponentIndex[z] + a] = "%";
    expressionStr = eval(expressionStr);
    expression.expression[terms.exponentIndex[z]] = expressionStr;
  }
  for (let i = 0; i < expression.expression.length; i++) {
    if (expression.expression[i] === "^") {
      let b = expression.expression[i - 1];
      for (let z = 1; z < expression.expression[i + 1]; z++) {
        expression.expression[i - 1] *= b;
        console.log(expression.expression[i - 1]);
      }
      expression.expression[i + 1] = "%";
      expression.expression[i] = "%";
    }
  }
}

function getPercent() {
  let firstPercent;
  for (let i = 0; i < terms.percentIndex.length; i++) {
    if (!isNaN(expression.expression[terms.percentIndex[i] - 1])) {
      firstPercent = terms.percentIndex[i];
    }
    if (
      terms.percentIndex[i + 1] - terms.percentIndex[i] !== 1 &&
      terms.percentIndex[i + 1] !== undefined
    ) {
      firstPercent = terms.percentIndex[i + 1];
    }
    expression.expression[firstPercent - 1] =
      expression.expression[firstPercent - 1] / 100;
  }
}

function expressionUpdate(buttonContent) {
  inputElement.value += buttonContent;
  expression.temp = buttonContent;
  expression.expression.push(expression.temp);
  expression.temp = "";
}
