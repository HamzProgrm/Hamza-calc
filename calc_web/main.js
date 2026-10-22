let buttons = document.querySelectorAll(".calc-button");
let display = document.querySelector("#display");
let themeButton = document.querySelector("#themeButton");

let justCalculated = false;

// =========================
// BUTTONS
// =========================

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    pressButton(button.textContent);
  });
});

// =========================
// MAIN CALCULATOR
// =========================

function pressButton(value) {
  // CLEAR
  if (value == "C") {
    display.textContent = "0";
    justCalculated = false;

    return;
  }

  // DELETE ONE CHARACTER
  if (value == "⌫") {
    if (display.textContent == "Error" || display.textContent.length <= 1) {
      display.textContent = "0";
    } else {
      display.textContent = display.textContent.slice(0, -1);
    }

    justCalculated = false;

    return;
  }

  // EQUAL
  if (value == "=") {
    if (display.textContent == "0" || display.textContent == "Error") {
      return;
    }

    try {
      let result = eval(display.textContent);

      if (!Number.isFinite(result) || Number.isNaN(result)) {
        display.textContent = "Error";
      } else {
        display.textContent = result;
      }

      justCalculated = true;
    } catch {
      display.textContent = "Error";
      justCalculated = true;
    }

    return;
  }

  // NEW NUMBER AFTER RESULT
  if (justCalculated) {
    if ((value >= "0" && value <= "9") || value == "00" || value == ".") {
      display.textContent = value;
    } else {
      display.textContent += value;
    }

    justCalculated = false;

    return;
  }

  // FIRST NUMBER
  if (display.textContent == "0") {
    if ((value >= "0" && value <= "9") || value == ".") {
      display.textContent = value;
    } else {
      display.textContent += value;
    }

    return;
  }

  // DON'T ADD TWO OPERATORS TOGETHER
  let lastCharacter = display.textContent.slice(-1);

  let operators = "+-*/";

  if (operators.includes(value) && operators.includes(lastCharacter)) {
    return;
  }

  // DON'T ADD TWO DECIMAL POINTS TO ONE NUMBER

  if (value == ".") {
    let parts = display.textContent.split(/[+\-*/]/);

    let currentNumber = parts[parts.length - 1];

    if (currentNumber.includes(".")) {
      return;
    }
  }

  // NORMAL INPUT
  display.textContent += value;
}

// =========================
// KEYBOARD
// =========================

document.addEventListener("keydown", function (event) {
  let key = event.key;

  let button = null;

  // NUMBER
  if (key >= "0" && key <= "9") {
    button = [...buttons].find(function (button) {
      return button.textContent == key;
    });
  }

  // OPERATOR
  else if (key == "+" || key == "-" || key == "*" || key == "/") {
    button = [...buttons].find(function (button) {
      return button.textContent == key;
    });
  }

  // DECIMAL
  else if (key == ".") {
    button = [...buttons].find(function (button) {
      return button.textContent == ".";
    });
  }

  // EQUAL
  else if (key == "Enter" || key == "=") {
    button = [...buttons].find(function (button) {
      return button.textContent == "=";
    });
  }

  // DELETE
  else if (key == "Backspace") {
    button = [...buttons].find(function (button) {
      return button.textContent == "⌫";
    });
  }

  // CLEAR
  else if (key == "Escape") {
    button = [...buttons].find(function (button) {
      return button.textContent == "C";
    });
  }

  // MAKE REAL BUTTON CLICK
  if (button) {
    button.click();

    button.classList.add("keyboard-press");

    setTimeout(function () {
      button.classList.remove("keyboard-press");
    }, 100);
  }
});

// =========================
// LIGHT / DARK
// =========================

themeButton.addEventListener("click", function () {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");

    themeButton.textContent = "🌙 Dark";
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");

    themeButton.textContent = "☀️ Light";
  }
});
