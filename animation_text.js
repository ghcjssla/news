function saveOriginalText(node, storage) {
  if (node.nodeType === Node.TEXT_NODE) {
    storage.push({ node: node, text: node.textContent });
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      saveOriginalText(node.childNodes[i], storage);
    }
  }
}

let originalTexts = [];
saveOriginalText(document.body, originalTexts);

function randomizeText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent.replace(/\S/g, () => Math.round(Math.random()).toString());
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      randomizeText(node.childNodes[i]);
    }
  }
}

function animateMatrixEffect() {
  randomizeText(document.body);
}

function restoreText() {
  originalTexts.forEach(item => {
    let currentText = item.node.textContent;
    let originalText = item.text;

    if (currentText !== originalText) {
      let positions = [];
      for (let i = 0; i < currentText.length; i++) {
        if (currentText[i] === '0' || currentText[i] === '1') {
          positions.push(i);
        }
      }

      if (positions.length > 0) {
        let randomPosition = positions[Math.floor(Math.random() * positions.length)];
        let newText = currentText.split('');
        newText[randomPosition] = originalText[randomPosition];
        item.node.textContent = newText.join('');
      }
    }
  });
}

let animationInterval;

function startAnimation() {
  animationInterval = setInterval(animateMatrixEffect, 100);
  setTimeout(() => {
    clearInterval(animationInterval);
    animationInterval = setInterval(() => {
      restoreText();
      if (originalTexts.every(item => item.node.textContent === item.text)) {
        clearInterval(animationInterval);
      }
    }, 25);
  }, 1000);
}

startAnimation();