"use strict";

const numbers = document.querySelectorAll(".input_numbers");
const operations = document.querySelectorAll(".input_operations");
const equals = document.querySelector(".input-equals");
const clearBtn = document.querySelector(".cl");
const deleteBtn = document.querySelector(".dl");
const totalShow = document.querySelector(".total-show");
const inputShow = document.querySelector(".input-show");
let firstOperand = "";
let secondOperand = "";
let currentOperation = null;

//appending numbers
numbers.forEach((button) => {
	button.addEventListener("click", () => appendNumber(button.textContent));
});

//handling operators
operations.forEach((operatorButton) => {
	operatorButton.addEventListener("click", () =>
		handleOperation(operatorButton.textContent)
	);
});

const appendNumber = function (number) {
	if (inputShow.textContent === "0" || currentOperation === "=") {
		inputShow.textContent = number;
		currentOperation = null;
	} else {
		inputShow.textContent += number;
	}
};

const handleOperation = function (operator) {
	if (currentOperation === "=") {
		totalShow.textContent = "";
	}

	firstOperand = inputShow.textContent;
	currentOperation = operator;
	totalShow.textContent = firstOperand + "" + currentOperation;
	inputShow.textContent = "";
};

//rounding the resultant number to max 2 places after decimal
function roundResult(value, decimalPlaces) {
	return Math.round(value * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

function add(num1, num2) {
	return roundResult(parseFloat(num1) + parseFloat(num2), 2);
}

function minus(num1, num2) {
	return roundResult(num1 - num2, 2);
}

function multiply(num1, num2) {
	return roundResult(num1 * num2, 2);
}

function divide(num1, num2) {
	if (num2 === 0) {
		alert("Cannot divide by 0");
		clear();
		return 0;
	}
	return roundResult(num1 / num2, 2);
}

let result = "";

equals.addEventListener("click", () => equalsFunc());

const equalsFunc = function () {
	if (currentOperation === null) {
		return;
	}

	secondOperand = inputShow.textContent;

	if (currentOperation === "+") {
		result = add(firstOperand, secondOperand);
	}

	if (currentOperation === "-") {
		result = minus(firstOperand, secondOperand);
	}

	if (currentOperation === "×") {
		result = multiply(firstOperand, secondOperand);
	}

	if (currentOperation === "÷") {
		result = divide(firstOperand, secondOperand);
	}

	inputShow.textContent = result;
	totalShow.textContent = "";
	currentOperation = "=";
};

clearBtn.addEventListener("click", () => clear());
deleteBtn.addEventListener("click", () => deleteLast());

function clear() {
	inputShow.textContent = "0";
	totalShow.textContent = "";
	firstOperand = "";
	secondOperand = "";
	currentOperation = null;
}

function deleteLast() {
	inputShow.textContent = inputShow.textContent.slice(0, -1);
}
