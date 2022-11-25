const dimensions = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
};
window.addEventListener('resize', () => {
  dimensions.width = document.documentElement.clientWidth;
  dimensions.height = document.documentElement.clientHeight;
});

function calculateYears() {
  const starting = new Date('2019');
  const now = new Date();
  const diff = now.getFullYear() - starting.getFullYear();
  const spanElement = document.getElementById('years');
  spanElement.innerText = diff;
}

function floatImagesMovement() {
  const imgs = document.getElementsByTagName('img');
  for (let img of imgs) {
    img.movement = generateRandomMovementDirections(3);
    img.directions = {
      up: Boolean(randomNumber(1)),
      left: Boolean(randomNumber(1)),
    };
    generateRandomStartPositions(img);
    setInterval(() => controlMovement(img), 1000);
  }
}

function getElementNumericPixels(el) {
  return Number(el.slice(0, el.length - 2));
}

function controlMovement(el) {
  if (el.directions.up) {
    el.style.top = `${getElementNumericPixels(el.style.top) - el.movement.top}px`;
    if (getElementNumericPixels(el.style.top) <= 0) {
      el.directions.up = false
      el.movement = generateRandomMovementDirections(3);
    }
  } else {
    el.style.top = `${getElementNumericPixels(el.style.top) + el.movement.top}px`;
    if (getElementNumericPixels(el.style.top) + 100 >= dimensions.height) {
      el.directions.up = true
      el.movement = generateRandomMovementDirections(3);
    }
  }

  if (el.directions.left) {
    el.style.left = `${getElementNumericPixels(el.style.left) - el.movement.left}px`;
    if (getElementNumericPixels(el.style.left) <= 0) {
      el.directions.left = false
      el.movement = generateRandomMovementDirections(3);
    }
  } else {
    el.style.left = `${getElementNumericPixels(el.style.left) + el.movement.left}px`;
    if (getElementNumericPixels(el.style.left) >= dimensions.width) {
      el.movement = generateRandomMovementDirections(3);
      el.directions.left = true
    }
  }
}

function generateRandomStartPositions(el) {
  el.style.top = `${randomNumber(dimensions.height)}px`;
  el.style.left = `${randomNumber(dimensions.width)}px`;
}

function generateRandomMovementDirections(range) {
  return { top: randomNumber(range), left: randomNumber(range) };
}

function randomNumber(range) {
  return Math.round(Math.random() * range + 1);
}

calculateYears();
floatImagesMovement();
