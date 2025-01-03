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

  const updateAnimation = () => {
    x += (targetX - x) * friction;
    y += (targetY - y) * friction;

    // Анимация верхней картинки
    upperWrapper.style.transform = `
      perspective(600px)
      rotateY(${y * 0.8}deg)
      rotateX(${x * 0.5}deg)
    `;
    const upperGlareX = 50 + y * 1.1;
    const upperGlareY = 50 - x * 1.1;
    upperGlare.style.left = `${upperGlareX}%`;
    upperGlare.style.top = `${upperGlareY}%`;

    // Анимация нижней картинки
    lowerWrapper.style.transform = `
      perspective(600px)
      rotateY(${y * 0.2}deg)
      rotateX(${x * 0.2}deg)
      translateZ(150px) /* Смещаем назад */
    `;
    const lowerGlareX = 50 + y * 0.7;
    const lowerGlareY = 50 - x * 0.7;
    lowerGlare.style.left = `${lowerGlareX}%`;
    lowerGlare.style.top = `${lowerGlareY}%`;

    requestAnimationFrame(updateAnimation);
  };

  document.addEventListener('mousemove', (e) => {
    const followX = (window.innerWidth / 2 - e.clientX) / 20;
    const followY = (window.innerHeight / 2 - e.clientY) / 20;

    targetY = Math.max(-maxAngle, Math.min(maxAngle, -followX));
    targetX = Math.max(-maxAngle, Math.min(maxAngle, followY));
  });

  updateAnimation();
});
