document.addEventListener('DOMContentLoaded', function() {

  const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
  }
  
  const getKeyType = key => {
    const { action } = key.dataset
    if (!action) return 'number'
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) return 'operator'
    // For everything else, return the action
    return action
  }
  
  const createResultString = (key, displayedNum, state) => {
    const keyContent = key.textContent
    const keyType = getKeyType(key)
    const {
      firstValue,
      operator,
      modValue,
      previousKeyType
    } = state
  
    if (keyType === 'number') {
      return displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
        ? keyContent
        : displayedNum + keyContent
    }
  
    if (keyType === 'decimal') {
      if (!displayedNum.includes('.')) return displayedNum + '.'
      if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
      return displayedNum
    }
  
    if (keyType === 'operator') {
      return firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        ? calculate(firstValue, operator, displayedNum)
        : displayedNum
    }
  
    if (keyType === 'clear') return 0
  
    if (keyType === 'calculate') {
      return firstValue
        ? previousKeyType === 'calculate'
          ? calculate(displayedNum, operator, modValue)
          : calculate(firstValue, operator, displayedNum)
        : displayedNum
    }
  }
  
  const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
    const keyType = getKeyType(key)
    const {
      firstValue,
      operator,
      modValue,
      previousKeyType
    } = calculator.dataset
  
    calculator.dataset.previousKeyType = keyType
  
    if (keyType === 'operator') {
      calculator.dataset.operator = key.dataset.action
      calculator.dataset.firstValue = firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        ? calculatedValue
        : displayedNum
    }
  
    if (keyType === 'calculate') {
      calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
        ? modValue
        : displayedNum
    }
  
    if (keyType === 'clear' && key.textContent === 'AC') {
      calculator.dataset.firstValue = ''
      calculator.dataset.modValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.previousKeyType = ''
    }
  }
  
  const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
  
    if (keyType === 'operator') key.classList.add('is-depressed')
    if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
    if (keyType !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }
  }
  
  const calculator = document.querySelector('.calculator')
  const display = calculator.querySelector('.calculator__display')
  const keys = calculator.querySelector('.calculator__keys')
  
  keys.addEventListener('click', e => {
    if (!e.target.matches('div')) return
    const key = e.target
    const displayedNum = display.textContent
    const resultString = createResultString(key, displayedNum, calculator.dataset)
  
    display.textContent = resultString
    updateCalculatorState(key, calculator, resultString, displayedNum)
    updateVisualState(key, calculator)
  })

  /* Switch between various stylesheets */
  document.getElementById('switch-style-button').addEventListener('click', function() {
    let themeLink = document.getElementById('current-theme');
    let themeSpan = document.getElementById('theme-name');
    let currentTheme = themeLink.getAttribute('href');

    if (currentTheme.includes('style.css')) {
      themeLink.setAttribute('href', './retro.css');
      themeSpan.textContent = 'Retro';
      themeSpan.style.color = '#39ff14';
    } else {
      themeLink.setAttribute('href', './style.css'); 
      themeSpan.textContent = 'Modern';
      themeSpan.style.color = '#babbf1';
    }
  });

  /* Copy results button logic */
  const copyButton = document.getElementById('copy-result-btn');
  copyButton.addEventListener("click", async () => {
    let textToCopy = display.textContent;
    try {
      // Try the modern Clipboard API first (if supported)
      await navigator.clipboard.writeText(textToCopy);
      console.log("Text copied successfully using Clipboard API");
      alert("Result copied successfully!");
    } catch (err) {
      // If Clipboard API fails, use the legacy approach
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed"; // Hide element off-screen
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      console.log("Text copied successfully using legacy approach");
      alert("Result copied successfully!");
    }
  });

  /* Hyperlinks */
  const githubBtn = document.getElementById('github-btn');
  const twitterBtn = document.getElementById('twitter-btn');
  const mailBtn = document.getElementById('mail-btn');
  githubBtn.addEventListener('click', function() {
    window.open('https://github.com/swyzsh', '_self');
  });
  twitterBtn.addEventListener('click', function() {
    window.open('https://twitter.com/swyzsh', '_self');
  });
  mailBtn.addEventListener('click', function() {
   let mail = document.createElement("a");
   mail.href = "mailto:swyzsh@protonmail.com";
   mail.click();
  });
});
