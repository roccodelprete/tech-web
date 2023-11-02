const display = document.getElementById("display");
const keys = document.querySelector(".calculator-design");

let previousKeyType = "";
let firstNumber = 0;
let operator = "";
let shouldResetDisplay = false;

display.value = "0";

// ... (codice precedente)

keys.addEventListener("click", (event) => {
  const key = event.target;

  if (key.matches("button")) {
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.value;

    // Handling number keys
    if (!action) {
      if (displayedNum === "0" || shouldResetDisplay) {
        display.value = keyContent;
        shouldResetDisplay = false;
      } else {
        display.value = displayedNum + keyContent;
      }
    }

    // Handling operators
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      shouldResetDisplay = true;
      if (previousKeyType === "operator") {
        operator = action;
        return;
      }

      if (previousKeyType !== "operator" && firstNumber && operator) {
        const result = operate(operator, firstNumber, parseFloat(displayedNum));
        display.value = result;
        firstNumber = result;
      } else {
        firstNumber = parseFloat(displayedNum);
      }
      operator = action;
    }

    // Handling equal key
    if (action === "equal") {
      if (previousKeyType === "equal") {
        firstNumber = parseFloat(displayedNum);
        operator = previousOperator;
        secondNumber = parseFloat(displayedNum);
      }
      if (previousKeyType !== "equal") {
        secondNumber = parseFloat(displayedNum);
      }
      const result = operate(operator, firstNumber, secondNumber);
      display.value = result;
      firstNumber = result;
      previousOperator = operator;
      previousKeyType = "equal";
      shouldResetDisplay = true;
    }

    // Handling decimal point
    if (action === "point") {
      if (!displayedNum.includes("point")) {
        display.value = displayedNum + ",";
      }
    }

    if (action === "clear") {
      display.value = "0";
      firstNumber = 0;
      operator = "";
      shouldResetDisplay = false;
    }

    // Highlight the pressed key
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );
    key.classList.add("is-depressed");

    previousKeyType = action;
  }
});

// Function to perform basic operations
function operate(operator, a, b) {
  switch (operator) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
    default:
      return b;
  }
}
