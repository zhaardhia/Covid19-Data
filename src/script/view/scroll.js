/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const smoothScroll = (targetClass, duration, axis) => {
  const target = document.querySelector(targetClass);
  const targetPosition = target.offsetTop-axis;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;


  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime;

    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  const easeInOutCubic = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
  };
  requestAnimationFrame(animation);
};
export default smoothScroll;
