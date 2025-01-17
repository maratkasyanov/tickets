document.addEventListener('DOMContentLoaded', () => {
  const upperWrapper = document.querySelector('.wrapper-upper');
  const upperImage = upperWrapper.querySelector('.interactive-image');
  const upperGlare = upperWrapper.querySelector('.glare');

  const lowerWrapper = document.querySelector('.wrapper-lower');
  const lowerImage = lowerWrapper.querySelector('.interactive-image');
  const lowerGlare = lowerWrapper.querySelector('.glare');

  const friction = 1 / 60;
  const maxAngle = 15;
  let x = 0, y = 0;
  let targetX = 0, targetY = 0;

  let mouseX = 0, mouseY = 0;

  // Функция обновления позиций glare и transform
  const applyTransforms = (wrapper, glare, xFactor, yFactor, rotateFactorX, rotateFactorY, translateZ = 0) => {
    wrapper.style.transform = `
      perspective(600px)
      rotateY(${y * yFactor}deg)
      rotateX(${x * xFactor}deg)
      translateZ(${translateZ}px)
    `;
    glare.style.left = `${50 + y * rotateFactorY}%`;
    glare.style.top = `${50 - x * rotateFactorX}%`;
  };

  const updateAnimation = () => {
    x += (targetX - x) * friction;
    y += (targetY - y) * friction;

    // Применяем трансформации для верхней и нижней карточки
    applyTransforms(upperWrapper, upperGlare, 0.5, 0.8, 1.1, 1.1);
    applyTransforms(lowerWrapper, lowerGlare, 0.2, 0.2, 0.7, 0.7, 150);

    requestAnimationFrame(updateAnimation);
  };

  const onMouseMove = (e) => {
    const followX = (window.innerWidth / 2 - e.clientX) / 70;
    const followY = (window.innerHeight / 2 - e.clientY) / 30;

    targetY = Math.max(-maxAngle, Math.min(maxAngle, -followX));
    targetX = Math.max(-maxAngle, Math.min(maxAngle, followY));
  };

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    onMouseMove(e);
  });

  updateAnimation();
});
